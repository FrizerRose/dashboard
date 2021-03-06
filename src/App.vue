<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import ActionTypes from '@/store/action-types';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);

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
      }
    }

    fetchState();
  },
});
</script>
