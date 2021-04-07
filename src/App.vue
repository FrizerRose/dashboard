<template>
  <router-view v-if="selectedCompany" />

  <InitialFlow v-if="!isMobile && !isTutorialFinished && selectedCompany !== null && !isOnAuthPages" />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import InitialFlow from '@/components/initialFlow/InitialFlowWrapper.vue';
import * as punycode from 'punycode';

export default defineComponent({
  components: {
    InitialFlow,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const isMobile = computed(() => store.state.shared.isMobile);
    const isTutorialFinished = computed(() => store.getters.isTutorialFinished);
    const authPages = ['/prijava', '/zaboravljena-lozinka'];
    const route = computed(() => window.location.pathname);
    const isOnAuthPages = computed(() => authPages.includes(route.value));

    const mq = window.matchMedia('(min-width: 992px)');
    mq.addEventListener('change', () => {
      store.commit(MutationTypes.CHANGE_IS_MOBILE, window.innerWidth <= 1024);
    });
    store.commit(MutationTypes.CHANGE_IS_MOBILE, window.innerWidth <= 1024);

    watch(() => isTutorialFinished.value, (newState: boolean | undefined, oldState: boolean | undefined) => {
      if (!newState) {
        document.body.classList.add('modal-open');
      }

      if (newState && !oldState) {
        document.body.classList.remove('modal-open');
      }
    });

    // Parse the company ID from the url
    let companyID: string | number = 1;
    if (process.env.NODE_ENV === 'production') {
      const urlFragments = window.location.hostname.split('.');
      [companyID] = urlFragments;
      if (companyID.slice(0, 4) === 'xn--') {
        companyID = punycode.decode(companyID.slice(4));
      }
    } else if (process.env.VUE_APP_COMPANY_ID) {
      companyID = parseInt(process.env.VUE_APP_COMPANY_ID, 10);
    }

    async function fetchState() {
      await store.dispatch(ActionTypes.FETCH_COMPANY, companyID);
      if (selectedCompany.value) {
        store.dispatch(ActionTypes.FETCH_STAFF, selectedCompany.value.id);
        store.dispatch(ActionTypes.FETCH_SERVICES, selectedCompany.value.id);
      }

      // Check if user has a valid jwt token
      if (!isOnAuthPages.value) {
        try {
          await store.dispatch(ActionTypes.FETCH_USER, localStorage.getItem('accessToken') || '');
        } catch {
          store.commit(MutationTypes.LOGOUT, true);
          router.push('/prijava');
        }
      }
    }

    fetchState();

    return {
      selectedCompany,
      isTutorialFinished,
      isOnAuthPages,
      isMobile,
    };
  },
});
</script>
