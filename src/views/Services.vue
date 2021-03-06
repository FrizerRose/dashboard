<template>
  <Dashboard>
    <main class="content">
      <div
        v-if="services.length"
        class="container-fluid p-0"
      >
        <div class="row">
          <div class="col-2">
            <h3>Usluge</h3>
            <button @click="isCreateDropdownOpen = !isCreateDropdownOpen">
              +
            </button>
            <div v-if="isCreateDropdownOpen">
              <label for="create-name">
                Ime
              </label>
              <input
                id="create-name"
                v-model="newService.name"
                type="text"
                name="name"
              >
              <label for="create-price">
                Cijena
              </label>
              <input
                id="create-price"
                v-model="newService.price"
                type="number"
                name="price"
              >
              <label for="create-duration">
                Trajanje
              </label>
              <input
                id="create-duration"
                v-model="newService.duration"
                type="number"
                name="duration"
              >
              <button
                :class="{
                  btn: true,
                  'btn-primary': !requestSent,
                  'btn-success': requestSent && status,
                  'btn-danger': requestSent && !status,
                }"
                @click="createService()"
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
                    v-if="selectedService === service.id"
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
import ActionTypes from '@/store/action-types';
import Service from '@/types/service';

export default defineComponent({
  components: {
    Dashboard,
    ServiceEdit,
  },
  setup() {
    const store = useStore();
    const services = computed(() => store.state.service.services);
    const selectedService = ref(services.value[0]?.id);
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const isCreateDropdownOpen = ref(false);
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

    async function createService() {
      try {
        await store.dispatch(ActionTypes.CREATE_SERVICE, newService as Service);
        requestSent.value = true;
        status.value = true;
        newService.name = '';
        newService.price = 0;
        newService.duration = 0;
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      services,
      selectedService,
      deleteService,
      isCreateDropdownOpen,
      newService,
      requestSent,
      status,
      createService,
    };
  },
});
</script>
