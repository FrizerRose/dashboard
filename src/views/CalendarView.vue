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
            <div class="main d-flex justify-content-center w-100">
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
