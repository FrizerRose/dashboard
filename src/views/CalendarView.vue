<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        <h1 class="h3 mb-3">
          Kalendar
        </h1>
        <CalendarComponent v-if="selectedWorker" />
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import {
  defineComponent, computed,
} from 'vue';

import Dashboard from '@/components/layout/Dashboard.vue';
import CalendarComponent from '@/components/Calendar.vue';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    Dashboard,
    CalendarComponent,
  },

  setup() {
    const store = useStore();
    const selectedWorker = computed(() => store.state.shared.selectedWorker);

    return {
      selectedWorker,
    };
  },
});
</script>
