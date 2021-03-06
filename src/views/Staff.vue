<template>
  <Dashboard>
    <main class="content">
      <div
        v-if="staff.length"
        class="container-fluid p-0"
      >
        <div class="row">
          <div class="col-2">
            <div class="tab">
              <ul
                class="nav nav-tabs flex-column"
                role="tablist"
              >
                <li
                  v-for="(worker, index) in staff"
                  :key="index"
                  :class="{'nav-item': true, 'active': selectedWorker === worker.id}"
                  @click="selectedWorker = worker.id"
                >
                  <a
                    :class="{'nav-link': true, 'd-inline-block': true, 'active': selectedWorker === worker.id}"
                    :href="'#tab-' + worker.id"
                    data-bs-toggle="tab"
                    role="tab"
                  >{{ worker.name }}</a>
                  <button
                    class="btn btn-danger"
                    @click="deleteWorker(worker)"
                  >
                    -
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-10">
            <div class="tab">
              <div class="tab-content">
                <div
                  v-for="worker in staff"
                  :id="'tab-' + worker.id"
                  :key="worker.id"
                  :class="{'tab-pane': true, 'active': selectedWorker === worker.id}"
                  role="tabpanel"
                >
                  <StaffEdit
                    v-if="selectedWorker === worker.id"
                    :worker="worker"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import Dashboard from '@/components/layout/Dashboard.vue';
import StaffEdit from '@/components/staff/StaffEdit.vue';
import ActionTypes from '@/store/action-types';
import Staff from '@/types/staff';

export default defineComponent({
  components: {
    Dashboard,
    StaffEdit,
  },
  setup() {
    const store = useStore();
    const staff = computed(() => store.state.staff.allStaff);
    const selectedWorker = ref(staff.value[0].id);

    function deleteWorker(worker: Staff) {
      store.dispatch(ActionTypes.DELETE_STAFF, worker);
    }

    return {
      staff,
      selectedWorker,
      deleteWorker,
    };
  },
});
</script>
