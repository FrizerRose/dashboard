<template>
  <router-view v-if="selectedCompany" />

  <InitialFlow v-if="!isTutorialFinished && selectedCompany !== null && !isOnAuthPages" />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import InitialFlow from '@/components/initialFlow/InitialFlowWrapper.vue';

export default defineComponent({
  components: {
    InitialFlow,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const isTutorialFinished = computed(() => store.getters.isTutorialFinished);
    const authPages = ['/prijava', '/zaboravljena-lozinka'];
    const isOnAuthPages = computed(() => authPages.includes(route.path));

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

    let companyID: string | number = 1;
    console.log('🚀 ~ file: helpers.ts ~ line 23 ~ fetchCompanyFromURL ~ process.env.NODE_ENV', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      const urlFragments = window.location.hostname.split('.');
      [companyID] = urlFragments;
      console.log('🚀 ~ file: helpers.ts ~ line 25 ~ fetchCompanyFromURL ~ companyID', companyID);
    } else if (process.env.VUE_APP_COMPANY_ID) {
      companyID = parseInt(process.env.VUE_APP_COMPANY_ID, 10);
    }

    async function fetchState() {
      await store.dispatch(ActionTypes.FETCH_COMPANY, companyID);
      if (selectedCompany.value) {
        store.dispatch(ActionTypes.FETCH_STAFF, selectedCompany.value.id);
        store.dispatch(ActionTypes.FETCH_SERVICES, selectedCompany.value.id);
      }
    }

    fetchState();

    return {
      selectedCompany,
      isTutorialFinished,
      isOnAuthPages,
    };
  },
});
</script>
