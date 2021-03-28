<template>
  <Dashboard>
    <template #header>
      Usluge
    </template>
    <template #body>
      <main
        id="serviceContainer"
        class="content"
      >
        <div class="container-fluid p-0">
          <div class="text-end mb-3">
            <button
              class="btn responsive-btn btn-primary"
              @click="openServiceCreateModal()"
            >
              <span class="fa fa-plus" />
              <span class="responsive-btn__label ms-2">Dodaj uslugu</span>
            </button>
          </div>

          <div v-if="isServicesCreateOpen">
            <ServiceCreate />
          </div>

          <div v-if="services">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table responsive-font-size table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style="width:80%"
                        >
                          Ime
                        </th>
                        <th
                          scope="col"
                          style="width:10%; text-align: center;"
                        >
                          Promijeni
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
                        v-for="(service, index) in services"
                        :key="index"
                        :class="{'nav-item': true, 'active': selectedService === service.id}"
                        @click="selectedService = service.id"
                      >
                        <td>{{ service.name }}</td>
                        <td style="text-align: center;">
                          <a
                            :class="{
                              'btn': true,
                              'responsive-btn': true,
                              'btn-outline-secondary': true,
                              'active': selectedService === service.id
                            }"
                            :href="'#tab-' + service.id"
                            @click="openServiceEditModal(service)"
                          >
                            <span class="fa fa-pen" />
                          </a>
                        </td>
                        <td style="text-align: center;">
                          <button
                            class="btn responsive-btn btn-outline-danger"
                            @click="deleteService(service)"
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
            Nema unešenih usluga.
          </div>

          <div
            v-for="service in services"
            :id="'tab-' + service.id"
            :key="service.id"
            :class="{'tab-pane': true, 'active': selectedService === service.id}"
            role="tabpanel"
          >
            <ServiceEdit
              v-if="isServiceEditOpen && selectedService === service.id"
              :service="service"
            />
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import { useStore } from '@/store';
import Dashboard from '@/components/layout/Dashboard.vue';
import ServiceEdit from '@/components/services/ServiceEdit.vue';
import ServiceCreate from '@/components/services/ServiceCreate.vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Service from '@/types/service';

export default defineComponent({
  components: {
    Dashboard,
    ServiceEdit,
    ServiceCreate,
  },
  setup() {
    const store = useStore();
    const services = computed(() => store.state.service.services);
    const isServicesCreateOpen = computed(() => store.state.shared.isServicesCreateOpen);
    const isServiceEditOpen = computed(() => store.state.shared.isServicesEditOpen);
    const selectedService = ref(-1);
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const requestSent = ref(false);
    const status = ref(false);
    const newService = reactive({
      name: '',
      price: 0,
      duration: 0,
      company: selectedCompany.value?.id,
    });

    function deleteService(service: Service) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Jeste li sigurni da želite obrisati ovu uslugu? Svi povezani termini također će biti izbrisani.')) {
        store.dispatch(ActionTypes.DELETE_SERVICE, service);
      }
    }

    function openServiceCreateModal() {
      store.commit(MutationTypes.CHANGE_OPEN_SERVICE_CREATE_MODAL, true);
      document.body.classList.add('modal-open');
    }

    function openServiceEditModal(service: Service) {
      selectedService.value = service.id;
      store.commit(MutationTypes.CHANGE_OPEN_SERVICE_EDIT_MODAL, true);
      document.body.classList.add('modal-open');
    }

    return {
      services,
      selectedService,
      deleteService,
      isServicesCreateOpen,
      isServiceEditOpen,
      openServiceCreateModal,
      openServiceEditModal,
      newService,
      requestSent,
      status,
    };
  },
});
</script>
