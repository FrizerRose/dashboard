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
              id="staffCreateButton"
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
                  <table class="table responsive-font-size table-striped table-row-expandable">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="hide-on-mobile"
                        >
                          Slika
                        </th>
                        <th
                          scope="col"
                          class="hide-on-mobile"
                        >
                          Ime
                        </th>
                        <th
                          scope="col"
                          style="text-align: center;"
                          class="hide-on-mobile"
                        >
                          Javno prikazan
                        </th>
                        <th
                          id="staffTableEdit"
                          scope="col"
                          style="text-align: center;"
                          class="hide-on-mobile"
                        >
                          Promijeni
                        </th>
                        <th
                          scope="col"
                          style="text-align: center;"
                          class="hide-on-mobile"
                        >
                          Izbriši
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(worker, index) in staff"
                        :key="index"
                        :class="{ 'nav-item': true, 'is-expanded': isExpanded, active: selectedWorker === worker.id }"
                      >
                        <td class="always-expanded position-relative">
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
                          <div class="toggle-expand hide-on-mobile">
                            <button
                              class="btn btn-primary"
                              @click="toggleExpand()"
                            >
                              prikaži više
                            </button>
                          </div>
                        </td>
                        <td class="always-expanded position-relative">
                          <span class="hide-on-desktop">Ime</span>
                          <span class="align-right-on-mobile">
                            {{ worker.name }}
                          </span>
                        </td>
                        <td class="always-expanded align-center-on-desktop">
                          <span class="hide-on-desktop">Javno prikazan</span>
                          <span
                            v-if="worker.isPublic"
                            class="text-success fw-bolder align-right-on-mobile"
                          >
                            <span>Da</span>
                          </span>
                          <span
                            v-else
                            class="text-danger fw-bolder align-right-on-mobile"
                          >
                            <span>Ne</span>
                          </span>
                        </td>
                        <td class="always-expanded align-center-on-desktop">
                          <span class="hide-on-desktop">Promijeni</span>
                          <span class="align-right-on-mobile">
                            <a
                              :class="{
                                btn: true,
                                'responsive-btn': true,
                                'btn-outline-secondary': true,
                                'align-right-on-mobile': true,
                                'align-center-on-desktop': true,
                                active: selectedWorker === worker.id,
                              }"
                              :href="'#tab-' + worker.id"
                              @click="openStaffEditModal(worker)"
                            >
                              <span class="fa fa-pen" />
                            </a>
                          </span>
                        </td>
                        <td class="always-expanded align-center-on-desktop">
                          <span class="hide-on-desktop">Izbriši</span>
                          <span class="align-right-on-mobile align-center-on-desktop">
                            <button
                              class="btn responsive-btn btn-outline-danger"
                              @click="deleteWorker(worker)"
                            >
                              <span class="fa fa-trash" />
                            </button>
                          </span>
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
            :class="{ 'tab-pane': true, active: selectedWorker === worker.id }"
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
import { computed, defineComponent, ref } from 'vue';
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
    const selectedWorker = ref(-1);
    const isExpanded = ref(false);

    function deleteWorker(worker: Staff) {
      if (worker.user?.isAdminAccount) {
        // eslint-disable-next-line no-alert
        window.alert(`Nije moguće obrisati radnika koji je povezan sa adminskim računom.
         Ako ne želite da se prikazuje na stranici, odaberite da nije Javno Prikazan.`);
        // eslint-disable-next-line no-alert
      } else if (window.confirm('Jeste li sigurni da želite obrisati ovog radnika? Svi povezani termini također će biti izbrisani.')) {
        store.dispatch(ActionTypes.DELETE_STAFF, worker);
      }
    }

    function openStaffCreateModal() {
      store.commit(MutationTypes.CHANGE_OPEN_STAFF_CREATE_MODAL, true);
      // document.body.classList.add('modal-open');
    }

    function openStaffEditModal(worker: Staff) {
      selectedWorker.value = worker.id;
      store.commit(MutationTypes.CHANGE_OPEN_STAFF_EDIT_MODAL, true);
      // document.body.classList.add('modal-open');
    }

    function toggleExpand() {
      isExpanded.value = !isExpanded.value;
    }

    return {
      staff,
      selectedWorker,
      deleteWorker,
      isStaffCreateOpen,
      isStaffEditOpen,
      openStaffCreateModal,
      openStaffEditModal,
      toggleExpand,
      isExpanded,
    };
  },
});
</script>
