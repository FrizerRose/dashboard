<template>
  <Modal>
    <template #header>
      <h5 class="modal-title h4">
        Popunjavanje termina
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Zatvori"
        @click="closeCalendarModal()"
      />
    </template>
    <template #body>
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-4">
            <label
              v-if="selectedWorker"
              for="id-calendar-create-slot-staff"
              class="form-label w-100"
            >
              <strong>Radnik</strong>
            </label>
            <select
              v-if="services"
              id="id-calendar-create-slot-staff"
              class="form-control"
              name="id-calendar-create-slot-staff"
              disabled
            >
              <option>
                {{ selectedWorker.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6 mb-4">
            <label
              for="id-calendar-create-slot-service"
              class="form-label w-100"
            >
              <strong>Usluga</strong>
            </label>
            <select
              v-if="services"
              id="id-calendar-create-slot-service"
              v-model="creationService"
              class="form-control"
              name="id-calendar-create-slot-service"
            >
              <option
                v-for="service in services"
                :key="service.id"
                :value="service"
              >
                {{ service.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <button
              class="btn btn-primary me-4"
              @click="changeIsCreateCustomer(false)"
            >
              Stari klijent
            </button>
            <button
              class="btn btn-secondary"
              @click="changeIsCreateCustomer(true)"
            >
              Novi klijent
            </button>
          </div>
        </div>

        <hr class="mt-4 mb-4">

        <div
          v-if="isCreateCustomer"
          class="novi-klijent"
        >
          <h5 class="modal-title h4 mb-3">
            Dodavanje novog klijenta
          </h5>
          <div class="row">
            <div class="col-md-4 mb-4">
              <label
                class="form-label"
                for="id-calendar-create-customer-name"
              >
                <strong>Ime klijenta</strong>
              </label>
              <input
                id="id-calendar-create-customer-name"
                v-model="creationCustomer.name"
                type="text"
                class="form-control"
              >
            </div>
            <div class="col-md-4 mb-4">
              <label
                class="form-label"
                for="id-calendar-create-customer-email"
              >
                <strong>E-mail klijenta</strong>
              </label>
              <input
                id="id-calendar-create-customer-email"
                v-model="creationCustomer.email"
                type="text"
                class="form-control"
              >
            </div>
            <div class="col-md-4 mb-4">
              <label
                class="form-label"
                for="id-calendar-create-customer-phone"
              >
                <strong>Mobitel klijenta</strong>
              </label>
              <input
                id="id-calendar-create-customer-phone"
                v-model="creationCustomer.phone"
                type="text"
                class="form-control"
              >
            </div>
            <div class="col-md-12 mb-4">
              <label
                class="form-label"
                for="id-calendar-create-customer-notice"
              >
                <strong>Napomena</strong>
              </label>
              <textarea
                id="id-calendar-create-customer-notice"
                v-model="creationNotice"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div
          v-else
          class="postojeci-klijent"
        >
          <h5 class="modal-title h4 mb-3">
            Odabir postojećeg klijenta
          </h5>
          <div class="row">
            <div class="col-md-12 mb-4">
              <label
                class="form-label"
                for="id-calendar-create-customer-name"
              >
                <strong>Ime klijenta</strong>
              </label>
              <input
                id="oldCustomerName"
                v-model="oldCustomerName"
                placeholder="Počnite upisivati ime klijenta"
                type="text"
                name="oldCustomerName"
                autocomplete="off"
                class="form-control"
                @input="oldCustomerInputChange()"
              >
              <div class="search-results__items">
                <div v-if="!oldCustomerCandidates.length && oldCustomerName">
                  Nema pronadjenih klijenata kojima ime počinje sa "{{ oldCustomerName }}"
                </div>
                <button
                  v-for="candidate in oldCustomerCandidates"
                  :key="candidate.id"
                  class="btn search-results__match"
                  :value="candidate"
                  @click="selectOldCustomer(candidate)"
                >
                  {{ candidate.name }}
                </button>
                <div v-if="oldCustomerCandidates.length === 10">
                  Prikazano 10 klijenata kojima ime počinje sa "{{ oldCustomerName }}"
                </div>
              </div>
              <div v-if="creationCustomer.name">
                <div class="alert alert-success">
                  <div class="alert-message">
                    Odabrani klijent: <strong>{{ creationCustomer.name }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        :disabled="!creationCustomer?.name"
        :class="{
          btn: true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="createAppointment()"
      >
        Spremi
      </button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';
import Modal from '@/components/layout/Modal.vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Customer from '@/types/customer';
import Service from '@/types/service';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    const selectedWorker = computed(() => store.state.shared.selectedWorker);
    const selectedCompany = computed(() => store.state.shared.selectedCompany);

    const services = ref(selectedWorker.value?.services);
    const creationDatetime = computed(() => store.state.shared.selectedDateTime);
    const creationService = ref(services.value ? services.value[0] as Service : {} as Service);
    const creationNotice = ref('');
    const creationCustomer = ref({} as Customer);
    const oldCustomerName = ref('');
    const oldCustomerCandidates = ref([] as Customer[]);

    const status = ref(false);
    const requestSent = ref(false);
    const isCreateCustomer = ref(false);

    function closeCalendarModal() {
      store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, false);
      document.body.classList.remove('modal-open');
    }

    async function createAppointment() {
      try {
        if (selectedWorker.value && creationService.value) {
          let customerObject = {};

          customerObject = {
            name: creationCustomer.value.name,
            email: creationCustomer.value.email,
            phone: creationCustomer.value.phone,
            company: selectedCompany.value?.id,
          };
          const createdCustomer: Customer = await store.dispatch(ActionTypes.CREATE_CUSTOMER, customerObject as Customer);

          let appointmentObject = {};

          appointmentObject = {
            date: creationDatetime.value.date,
            time: creationDatetime.value.time,
            company: selectedCompany.value?.id,
            staff: selectedWorker.value.id,
            service: creationService.value.id,
            customer: createdCustomer.id,
            message: creationNotice.value,
          };
          await store.dispatch(ActionTypes.CREATE_APPOINTMENT, appointmentObject);
          store.commit(MutationTypes.CHANGE_SELECTED_SERVICE, creationService.value);

          requestSent.value = true;
          status.value = true;

          creationCustomer.value = {} as Customer;

          closeCalendarModal();
        } else {
          throw new Error();
        }
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    function selectOldCustomer(customer: Customer) {
      creationCustomer.value = customer;
      oldCustomerCandidates.value = [];
    }

    function changeIsCreateCustomer(value: boolean) {
      isCreateCustomer.value = value;
      creationCustomer.value = {} as Customer;
      oldCustomerName.value = '';
    }

    async function fetchCustomersByName() {
      try {
        const response = await store.dispatch(ActionTypes.FETCH_CUSTOMERS_BY_NAME, {
          name: oldCustomerName.value,
          company: selectedCompany.value?.id,
        });

        oldCustomerCandidates.value = response;
      } catch {
        oldCustomerCandidates.value = [];
      }
    }

    const debounce = (func: Function, timeout = 300) => {
      let timer: number;
      return (...args: unknown[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    };

    const oldCustomerInputChange = debounce(() => fetchCustomersByName());

    return {
      closeCalendarModal,
      selectedWorker,
      createAppointment,
      services,
      creationService,
      creationCustomer,
      creationNotice,
      requestSent,
      status,
      isCreateCustomer,
      oldCustomerName,
      oldCustomerCandidates,
      oldCustomerInputChange,
      selectOldCustomer,
      changeIsCreateCustomer,
    };
  },
});
</script>

<style lang="scss">
.search-results__items {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.search-results__match {
  display: block;
  background-color: var(--bs-light);
  border: 2px solid white;
  color: black;
}
</style>
