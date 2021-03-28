<template>
  <Modal :layout="'is-big'">
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
      <div class="px-4 py-4 border-bottom">
        <div class="container override-desktop-limit">
          <div class="row">
            <div class="col-md-6 mb-4">
              <label
                v-if="selectedWorker"
                for="id-calendar-create-slot-staff"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Radnik</span>
              </label>
              <select
                v-if="services"
                id="id-calendar-create-slot-staff"
                class="form-control responsive-form-control"
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
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Usluga</span>
              </label>
              <select
                v-if="services"
                id="id-calendar-create-slot-service"
                v-model="creationService"
                class="form-control responsive-form-control"
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
        </div>
      </div>

      <div class="px-4 py-4">
        <div class="container override-desktop-limit">
          <div class="row">
            <div class="col-md-12">
              <ul
                class="nav nav-tabs mb-4 mt-2"
                role="tablist"
              >
                <li>
                  <button
                    :class="{
                      'responsive-btn' : true,
                      'btn-is-tab' : true,
                      'selected' : !isCreateCustomer,
                    }"
                    role="tab"
                    aria-selected="true"
                    @click="changeIsCreateCustomer(false)"
                  >
                    Postojeći klijent
                  </button>
                </li>
                <li>
                  <button
                    :class="{
                      'responsive-btn' : true,
                      'btn-is-tab' : true,
                      'selected' : isCreateCustomer,
                    }"
                    role="tab"
                    aria-selected="false"
                    @click="changeIsCreateCustomer(true)"
                  >
                    Novi klijent
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="isCreateCustomer"
            class="novi-klijent"
          >
            <h5 class="modal-title h4 mb-4">
              Dodavanje novog klijenta
            </h5>
            <div class="row">
              <div class="col-md-4 mb-4">
                <label
                  class="responsive-form-label"
                  for="id-calendar-create-customer-name"
                >
                  <span class="responsive-form-label__bolder">Ime</span>
                </label>
                <input
                  id="id-calendar-create-customer-name"
                  v-model="creationCustomer.name"
                  type="text"
                  class="form-control responsive-form-control"
                >
              </div>
              <div class="col-md-4 mb-4">
                <label
                  class="responsive-form-label"
                  for="id-calendar-create-customer-email"
                >
                  <span class="responsive-form-label__bolder">E-mail</span>
                </label>
                <input
                  id="id-calendar-create-customer-email"
                  v-model="creationCustomer.email"
                  type="text"
                  class="form-control responsive-form-control"
                >
              </div>
              <div class="col-md-4 mb-4">
                <label
                  class="responsive-form-label"
                  for="id-calendar-create-customer-phone"
                >
                  <span class="responsive-form-label__bolder">Mobitel</span>
                </label>
                <input
                  id="id-calendar-create-customer-phone"
                  v-model="creationCustomer.phone"
                  type="text"
                  class="form-control responsive-form-control"
                >
              </div>
              <div class="col-md-12 mb-4">
                <label
                  class="responsive-form-label"
                  for="id-calendar-create-customer-notice"
                >
                  <span class="responsive-form-label__bolder">Bilješke o klijentu</span>
                </label>
                <textarea
                  id="id-calendar-create-customer-notice"
                  v-model="creationCustomer.notes"
                  class="form-control responsive-form-control"
                  rows="4"
                />
                <label
                  class="responsive-form-label"
                  for="id-calendar-create-appointment-notice"
                >
                  <span class="responsive-form-label__bolder">Napomena o terminu</span>
                </label>
                <textarea
                  id="id-calendar-create-appointment-notice"
                  v-model="creationNotice"
                  class="form-control responsive-form-control"
                  rows="4"
                />
              </div>
            </div>
          </div>
          <div
            v-else
            class="postojeci-klijent"
          >
            <h5 class="modal-title h4 mb-4">
              Odabir postojećeg klijenta
            </h5>
            <div class="row">
              <div class="col-md-12 mb-4">
                <label
                  class="responsive-form-label"
                  for="id-calendar-create-customer-name"
                >
                  <span class="responsive-form-label__bolder">Ime klijenta</span>
                </label>
                <input
                  id="oldCustomerName"
                  v-model="oldCustomerName"
                  placeholder="Počnite upisivati ime klijenta"
                  type="text"
                  name="oldCustomerName"
                  autocomplete="off"
                  class="form-control responsive-form-control"
                  @input="oldCustomerInputChange()"
                >
                <div class="search-results__items">
                  <div v-if="!oldCustomerCandidates.length && oldCustomerName">
                    Nema pronađenih klijenata kojima ime počinje sa "{{ oldCustomerName }}"
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
                      Odabrani klijent: <span class="responsive-form-label__bolder">{{ creationCustomer.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p
                v-if="requestSent && !status"
                class="text-danger"
              >
                Rezervacija nije uspjela. Pokušajte ponovno. Ako ste sigurni da su uneseni podaci ispravni, javite se korisničkoj podršci.
              </p>
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
          'responsive-btn': true,
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

    // Close modal on Escape press
    document.onkeydown = (evt) => {
      // eslint-disable-next-line no-param-reassign
      evt = evt || window.event;
      if (evt.code === 'Escape') {
        closeCalendarModal();
      }
    };

    async function createAppointment() {
      try {
        if (selectedWorker.value && creationService.value) {
          let customerObject = {};

          customerObject = {
            name: creationCustomer.value.name,
            email: creationCustomer.value.email,
            phone: creationCustomer.value.phone,
            notes: creationCustomer.value.notes,
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

// override tab styles
.btn-is-tab {
  margin-bottom: -1px;
  border: 1px solid transparent;
  border-top-left-radius: .5em;
  border-top-right-radius: .5em;
  &:focus, &:hover {
    background-color: #84aef2;
    color: white;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0, 1), color 0.2s cubic-bezier(0.4, 0, 0, 1);
  }
  &.selected {
    background-color: #3f80ea;
    color: white;
  }
}
</style>
