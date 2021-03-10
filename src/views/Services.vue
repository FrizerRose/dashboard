<template>
  <Dashboard>
    <main class="content">
      <div
        v-if="services.length"
        class="container-fluid p-0"
      >
        <div class="row">
          <div class="col-xl-12">
            <button
              class="btn btn-primary float-end mt-n1"
              aria-label="Dodaj uslugu"
              @click="openServiceCreateModal()"
            >
              <span class="fa fa-plus" /> Dodaj uslugu
            </button>

            <h1 class="h3 mb-3">
              Usluge
            </h1>

            <div v-if="isServicesCreateOpen">
              <ServiceCreate />
            </div>
            <div class="tab">
              <ul
                class="nav nav-tabs flex-column"
                role="tablist"
              >
                <li
                  v-for="(service, index) in services"
                  :key="index"
                  :class="{'nav-item': true, 'active': selectedService === service.id}"
                  @click="selectedService = service.id"
                >
                  <a
                    :class="{'nav-link': true, 'd-inline-block': true, 'active': selectedService === service.id}"
                    :href="'#tab-' + service.id"
                    data-bs-toggle="tab"
                    role="tab"
                  >{{ service.name }}</a>
                  <button
                    class="btn btn-danger"
                    @click="deleteService(service)"
                  >
                    -
                  </button>
                  <button
                    class="btn btn-info"
                    @click="openServiceEditModal(service)"
                  >
                    EDIT
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-10">
            <div class="tab">
              <div class="tab-content">
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
    const selectedService = ref(services.value[0]?.id);
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
