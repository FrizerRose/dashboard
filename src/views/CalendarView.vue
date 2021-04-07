<template>
  <Dashboard>
    <template #header>
      Kalendar
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <CalendarComponent v-if="selectedWorker && dataFetched" />
          <div v-else>
            Spinner
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref,
} from 'vue';

import Dashboard from '@/components/layout/Dashboard.vue';
import CalendarComponent from '@/components/calendar/Calendar.vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  components: {
    Dashboard,
    CalendarComponent,
  },

  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const selectedWorker = computed(() => store.state.shared.selectedWorker);
    const dataFetched = ref(false);

    if (selectedCompany.value) {
      Promise.all([
        store.dispatch(ActionTypes.FETCH_STAFF, selectedCompany.value.id),
        store.dispatch(ActionTypes.FETCH_SERVICES, selectedCompany.value.id),
      ]).then(() => {
        dataFetched.value = true;
      });
    }

    return {
      selectedWorker,
      dataFetched,
    };
  },
});
</script>
