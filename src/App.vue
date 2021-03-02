<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ActionTypes from '@/store/action-types';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();

    let companyID: string | number = 6;
    console.log('🚀 ~ file: helpers.ts ~ line 23 ~ fetchCompanyFromURL ~ process.env.NODE_ENV', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      const urlFragments = window.location.hostname.split('.');
      [companyID] = urlFragments;
      console.log('🚀 ~ file: helpers.ts ~ line 25 ~ fetchCompanyFromURL ~ companyID', companyID);
    }

    store.dispatch(ActionTypes.FETCH_COMPANY, companyID);
  },
});
</script>
