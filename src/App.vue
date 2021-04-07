<template>
  <div
    v-if="isCompanyFetched"
    :class="{'modal-open': anyModalOpen}"
  >
    <router-view
      v-if="selectedCompany"
    />
    <div
      v-else
      class="main d-flex justify-content-center w-100"
    >
      <main
        :class="{'is-loaded': isMounted, 'c-site-main': true}"
        class="content d-flex p-0 w-100"
      >
        <div class="container d-flex flex-column">
          <div class="row h-100">
            <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
              <div class="d-table-cell align-middle">
                <div class="card py-6">
                  <div class="card-body text-center">
                    <h1>Poslovni subjekt nije dostupan.</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <div
    v-else
    class="main d-flex justify-content-center w-100"
  >
    <main class="content d-flex p-0 w-100">
      <div class="container d-flex flex-column">
        <div class="row h-100">
          <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div class="d-table-cell align-middle">
              <div class="card py-6">
                <div class="card-body text-center">
                  <div
                    class="spinner-border text-primary me-2"
                    role="status"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <InitialFlow v-if="!isMobile && !isTutorialFinished && selectedCompany !== null && !isOnAuthPages" />
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, onMounted,
} from 'vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import InitialFlow from '@/components/initialFlow/InitialFlowWrapper.vue';
import * as punycode from 'punycode';

export default defineComponent({
  components: {
    InitialFlow,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const routeObject = useRoute();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const isCompanyFetched = computed(() => store.state.shared.isCompanyFetched);
    const isMobile = computed(() => store.state.shared.isMobile);
    const isTutorialFinished = computed(() => store.getters.isTutorialFinished);
    const anyModalOpen = computed(() => store.getters.anyModalOpen);

    const authPages = ['/prijava', '/zaboravljena-lozinka'];
    const route = computed(() => routeObject.path);
    const isOnAuthPages = computed(() => authPages.includes(route.value));

    const mq = window.matchMedia('(min-width: 992px)');
    mq.addEventListener('change', () => {
      store.commit(MutationTypes.CHANGE_IS_MOBILE, window.innerWidth <= 1024);
    });
    store.commit(MutationTypes.CHANGE_IS_MOBILE, window.innerWidth <= 1024);

    // watch(() => isTutorialFinished.value, (newState: boolean | undefined, oldState: boolean | undefined) => {
    //   if (!newState) {
    //     document.body.classList.add('modal-open');
    //   }

    //   if (newState && !oldState) {
    //     document.body.classList.remove('modal-open');
    //   }
    // });

    const isMounted = ref(false);

    onMounted(async () => {
      setTimeout(() => {
        isMounted.value = true;
      }, 50);
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
      isCompanyFetched,
      isTutorialFinished,
      isOnAuthPages,
      isMobile,
      isMounted,
      anyModalOpen,
    };
  },
});
</script>
