<template>
  <router-view />

  <InitialFlow v-if="!isTutorialFinished && selectedCompany !== null" />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import ActionTypes from '@/store/action-types';
import { useStore } from '@/store';
import InitialFlow from '@/components/initialFlow/InitialFlowWrapper.vue';

export default defineComponent({
  components: {
    InitialFlow,
  },
  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const isTutorialFinished = computed(() => store.getters.isTutorialFinished);

    watch(
      () => isTutorialFinished.value,
      (newState: boolean | undefined, oldState: boolean | undefined) => {
        if (newState) {
          document.body.classList.add('modal-open');
        }

        if (!newState && oldState) {
          document.body.classList.remove('modal-open');
        }
      },
    );

    let companyID: string | number = 6;
    console.log('🚀 ~ file: helpers.ts ~ line 23 ~ fetchCompanyFromURL ~ process.env.NODE_ENV', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      const urlFragments = window.location.hostname.split('.');
      [companyID] = urlFragments;
      console.log('🚀 ~ file: helpers.ts ~ line 25 ~ fetchCompanyFromURL ~ companyID', companyID);
    }

    async function fetchState() {
      await store.dispatch(ActionTypes.FETCH_COMPANY, companyID);
      if (selectedCompany.value) {
        store.dispatch(ActionTypes.FETCH_STAFF, selectedCompany.value.id);
        store.dispatch(ActionTypes.FETCH_SERVICES, selectedCompany.value.id);
        store.dispatch(ActionTypes.FETCH_CUSTOMERS, { id: selectedCompany.value.id, limit: 10 });
      }
    }

    fetchState();

    return {
      selectedCompany,
      isTutorialFinished,
    };
  },
});
</script>
