<template>
  <Dashboard>
    <template #header>
      Radnici
    </template>
    <template #body>
      <main
        id="staffContainer"
        class="content"
      >
        <div class="container-fluid p-0">
          <div class="text-end mb-3">
            <button
              class="btn responsive-btn btn-primary"
              @click="openStaffCreateModal()"
            >
              <span class="fa fa-plus" />
              <span class="responsive-btn__label ms-2">Dodaj radnika</span>
            </button>
          </div>

          <div v-if="isStaffCreateOpen">
            <StaffCreate />
          </div>

          <div v-if="staff">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table responsive-font-size table-striped">
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
                          style="width:10%; text-align: center;"
                        >
                          Promjeni
                        </th>
                        <th
                          scope="col"
                          style="width:10%; text-align: center;"
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
                      >
                        <td>
                          <div
                            class="override-upload-image-square"
                            style="width: 48px;"
                          >
                            <img
                              v-if="worker.image && worker.image.link"
                              :src="worker.image.link"
                              alt="slika"
                              class="fit-cover"
                            >
                          </div>
                        </td>
                        <td> {{ worker.name }}</td>
                        <td style="text-align: center;">
                          <a
                            :class="{
                              'btn': true,
                              'responsive-btn': true,
                              'btn-outline-secondary': true,
                              'active': selectedWorker === worker.id
                            }"
                            :href="'#tab-' + worker.id"
                            @click="openStaffEditModal(worker);"
                          >
                            <span class="fa fa-pen" />
                          </a>
                        </td>
                        <td style="text-align: center;">
                          <button
                            class="btn responsive-btn btn-danger"
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

          <div v-else>
            Nema unešenih radnika.
          </div>

          <div
            v-for="worker in staff"
            :id="'tab-' + worker.id"
            :key="worker.id"
            :class="{'tab-pane': true, 'active': selectedWorker === worker.id}"
            role="tabpanel"
          >
            <StaffEdit
              v-if="isStaffEditOpen && selectedWorker === worker.id"
              :worker="worker"
            />
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref,
} from 'vue';
import { useStore } from '@/store';
import Dashboard from '@/components/layout/Dashboard.vue';
import StaffEdit from '@/components/staff/StaffEdit.vue';
import StaffCreate from '@/components/staff/StaffCreate.vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Staff from '@/types/staff';

export default defineComponent({
  components: {
    Dashboard,
    StaffEdit,
    StaffCreate,
  },
  setup() {
    const store = useStore();
    const staff = computed(() => store.state.staff.allStaff);
    const isStaffCreateOpen = computed(() => store.state.shared.isStaffCreateOpen);
    const isStaffEditOpen = computed(() => store.state.shared.isStaffEditOpen);
    const selectedWorker = ref(staff.value[0]?.id);

    function deleteWorker(worker: Staff) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Jeste li sigurni da želite obrisati ovog radnika? Svi povezani termini također će biti izbrisani.')) {
        store.dispatch(ActionTypes.DELETE_STAFF, worker);
      }
    }

    function openStaffCreateModal() {
      store.commit(MutationTypes.CHANGE_OPEN_STAFF_CREATE_MODAL, true);
      document.body.classList.add('modal-open');
    }

    function openStaffEditModal(worker: Staff) {
      selectedWorker.value = worker.id;
      store.commit(MutationTypes.CHANGE_OPEN_STAFF_EDIT_MODAL, true);
      document.body.classList.add('modal-open');
    }

    return {
      staff,
      selectedWorker,
      deleteWorker,
      isStaffCreateOpen,
      isStaffEditOpen,
      openStaffCreateModal,
      openStaffEditModal,
    };
  },
});
</script>
