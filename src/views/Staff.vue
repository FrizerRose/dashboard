<template>
  <Dashboard>
    <main class="content">
      <div
        v-if="staff.length"
        class="container-fluid p-0"
      >
        <div class="row">
          <div class="col-2">
            <h3>Radnici</h3>
            <button @click="isCreateDropdownOpen = !isCreateDropdownOpen">
              +
            </button>
            <div v-if="isCreateDropdownOpen">
              <label for="create-name">
                Ime
              </label>
              <input
                id="create-name"
                v-model="newStaff.name"
                type="text"
                name="name"
              >
              <label for="create-name">
                Email
              </label>
              <input
                id="create-email"
                v-model="newStaff.email"
                type="email"
                name="email"
              >
              <button
                :class="{
                  btn: true,
                  'btn-primary': !requestSent,
                  'btn-success': requestSent && status,
                  'btn-danger': requestSent && !status,
                }"
                @click="createStaff()"
              >
                Spremi
              </button>
            </div>
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
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import { useStore } from '@/store';
import Dashboard from '@/components/layout/Dashboard.vue';
import StaffEdit from '@/components/staff/StaffEdit.vue';
import ActionTypes from '@/store/action-types';
import Staff from '@/types/staff';
import { WorkingHours } from '@/types/workingHours';

export default defineComponent({
  components: {
    Dashboard,
    StaffEdit,
  },
  setup() {
    const store = useStore();
    const staff = computed(() => store.state.staff.allStaff);
    const selectedWorker = ref(staff.value[0]?.id);
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const isCreateDropdownOpen = ref(false);
    const requestSent = ref(false);
    const status = ref(false);
    const newStaff = reactive({
      name: '',
      email: '',
      company: selectedCompany.value?.id,
      hours: {
        monday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        tuesday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        wednesday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        thursday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        friday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        saturday: { active: false, shifts: [] },
        sunday: { active: false, shifts: [] },
      } as WorkingHours,
    });

    function deleteWorker(worker: Staff) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Jeste li sigurni da želite obrisati ovog radnika? Svi povezani termini također će biti izbrisani.')) {
        store.dispatch(ActionTypes.DELETE_STAFF, worker);
      }
    }

    async function createStaff() {
      try {
        await store.dispatch(ActionTypes.CREATE_STAFF, newStaff as Staff);
        requestSent.value = true;
        status.value = true;
        isCreateDropdownOpen.value = false;
        newStaff.name = '';
        newStaff.email = '';
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      staff,
      selectedWorker,
      deleteWorker,
      isCreateDropdownOpen,
      newStaff,
      requestSent,
      status,
      createStaff,
    };
  },
});
</script>
