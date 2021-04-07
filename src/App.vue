<template>
  <div v-if="isCompanyFetched">
    <router-view
      v-if="selectedCompany"
    />
    <div v-else>
      <main :class="{'is-loaded': isMounted, 'c-site-main': true}">
        <section class="c-section">
          <div class="o-container">
            <div class="o-orphan">
              <div class="o-background-wrap">
                <div class="o-background -has-shadow -overflow" />
                <div class="o-background -has-bg -overflow" />
                <div class="o-background -has-border -overflow -theme-color" />
                <div class="o-orphan_inner">
                  <div class="o-row">
                    <div class="o-row_inner">
                      <h1 class="c-heading">
                        Poslovni subjekt nije dostupan.
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

  <main
    v-else
    class="
      c-site-main"
  >
    <section class="c-section">
      <div class="o-container">
        <div class="o-orphan">
          <span class="o-icon o-loader">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2a.91.91 0 01.91.91v3.635a.91.91 0 11-1.82 0V2.91A.91.91
              0 0112 2zM12 16.546a.91.91 0 01.91.909v3.636a.91.91 0 11-1.82 0v-3.636a.91.91 0 01.91-.91zM4.93 4.93a.91.91 0
              011.286 0l2.572 2.573a.91.91 0 01-1.285 1.285L4.93 6.216a.91.91 0 010-1.286zM15.212 15.212a.91.91 0 011.285
              0l2.573 2.572a.91.91 0 01-1.286 1.286l-2.572-2.573a.91.91 0 010-1.285zM2 12a.91.91 0 01.91-.91h3.635a.91.91
              0 110 1.82H2.91A.91.91 0 012 12zM16.545 12a.91.91 0 01.91-.91h3.636a.91.91 0 010 1.82h-3.637a.91.91 0
              01-.909-.91zM8.788 15.212a.909.909 0 010 1.285L6.216 19.07a.91.91 0 01-1.286-1.286l2.573-2.572a.91.91 0
              011.285 0zM19.07 4.93a.91.91 0 010 1.286l-2.573 2.572a.909.909 0 11-1.285-1.285l2.572-2.573a.91.91 0 011.286 0z"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  </main>

  <InitialFlow v-if="!isMobile && !isTutorialFinished && selectedCompany !== null && !isOnAuthPages" />
</template>

<script lang="ts">
import {
  defineComponent, computed, watch, ref, onMounted,
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

    const authPages = ['/prijava', '/zaboravljena-lozinka'];
    const route = computed(() => routeObject.path);
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
    };
  },
});
</script>
