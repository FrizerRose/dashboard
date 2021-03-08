<template>
  <Dashboard>
    <main class="content">
      <div
        v-if="staff.length"
        class="container-fluid p-0"
      >
        <div class="row">
          <div class="col-xl-8">
            <button
              class="btn btn-primary float-end mt-n1"
              aria-label="Dodaj radnika"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalFullscreen"
              @click="isCreateDropdownOpen = !isCreateDropdownOpen"
            >
              <span class="fa fa-plus" /> Dodaj radnika
            </button>
            <h1 class="h3 mb-3">
              Radnici
            </h1>
            <!-- Full screen modal -->
            <div
              id="exampleModalFullscreen"
              class="modal fade show"
              tabindex="-1"
              aria-labelledby="exampleModalFullscreenLabel"
              style="display: block; padding-right: 17px;"
              aria-modal="true"
              role="dialog"
            >
              <div v-if="isCreateDropdownOpen">
                <div class="modal-dialog modal-fullscreen-sm-down">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        id="exampleModalFullscreenLabel"
                        class="modal-title h4"
                      >
                        Dodavanje radnika
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div class="modal-body">
                      <div class="container">
                        <div class="row">
                          <div class="col-md-6">
                            <label
                              class="form-label"
                              for="id-add-worker-name"
                            >
                              <strong>Ime</strong>
                            </label>
                            <input
                              id="id-add-worker-name"
                              v-model="newStaff.name"
                              type="text"
                              class="form-control"
                            >
                          </div>
                          <div class="col-md-6">
                            <label
                              class="form-label"
                              for="id-add-worker-email"
                            >
                              <strong>E-mail</strong>
                            </label>
                            <input
                              id="id-add-worker-email"
                              v-model="newStaff.email"
                              type="email"
                              class="form-control"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
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
                      <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        @click="isCreateDropdownOpen = !isCreateDropdownOpen"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-8">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style="width:30%"
                        >
                          Slika
                        </th>
                        <th
                          scope="col"
                          style="width:50%"
                        >
                          Ime
                        </th>
                        <th
                          scope="col"
                          style="width:10%"
                        >
                          Promjeni
                        </th>
                        <th
                          scope="col"
                          style="width:10%"
                        >
                          Izbriši
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(worker, index) in staff"
                        :key="index"
                        :class="{'nav-item': true, 'active': selectedWorker === worker.id}"
                        @click="selectedWorker = worker.id"
                      >
                        <td>
                          <img
                            src="img/avatars/avatar-5.jpg"
                            width="48"
                            height="48"
                            class="rounded-circle me-2"
                            alt="slika"
                          >
                        </td>
                        <td> {{ worker.name }}</td>
                        <td>
                          <a
                            :class="{'btn': true, 'btn-outline-secondary': true, 'active': selectedWorker === worker.id}"
                            :href="'#tab-' + worker.id"
                          >
                            <span class="fa fa-pen" />
                          </a>
                        </td>
                        <td>
                          <button
                            class="btn btn-danger"
                            @click="deleteWorker(worker)"
                          >
                            <span class="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

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

<style scoped>
  .add-new-row-wrap {
    position: relative;
  }
  .add-new-row {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1;
    width: 100%;
  }
  .modal {
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0, 1);
  }
  .modal-open .modal {
    transform: none;
  }
</style>
