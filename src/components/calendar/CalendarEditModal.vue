<template>
  <Modal :layout="'is-big'">
    <template #header>
      <h5 class="modal-title h4">
        Uređivanje/brisanje termina
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Zatvori"
        @click="closeCalendarModal()"
      />
    </template>
    <template #body>
      <div
        v-if="isInThePast"
        class="alert alert-success mb-0"
      >
        <div class="alert-message py-5">
          <p><strong>{{ rescheduledCustomer.name }}</strong> se pojavio u dogovoreno vrijeme.</p>
        </div>
      </div>
      <div
        v-if="isInThePast"
        class="container"
      >
        <div class="row">
          <div class="col-12">
            <label class="form-check m-0">
              <input
                v-model="hasCustomerArrived"
                type="checkbox"
                class="form-check-input"
              >
              <span class="form-check-label lead">Klijent se pojavio u dogovoreno vrijeme.</span>
            </label>
          </div>
        </div>
      </div>

      <div
        v-else
        class="container override-desktop-limit"
      >
        <div class="row">
          <div class="col-md-6 mb-4">
            <label
              for="id-calendar-edit-slot-staff"
              class="form-label w-100"
            >
              <strong>Radnik</strong>
            </label>
            <select
              id="id-calendar-edit-slot-staff"
              v-model="rescheduledStaff"
              class="form-control form-control-lg mb-3"
              name="id-calendar-edit-slot-staff"
            >
              <option
                v-for="staff in allStaff"
                :key="staff.id"
                :value="staff"
              >
                {{ staff.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6 mb-4">
            <label
              for="id-calendar-edit-slot-service"
              class="form-label w-100"
            >
              <strong>Usluga</strong>
            </label>
            <select
              id="id-calendar-edit-slot-service"
              v-model="rescheduledService"
              class="form-control form-control-lg mb-3"
              name="id-calendar-edit-slot-service"
            >
              <option
                v-for="service in rescheduledStaffServices"
                :key="service.id"
                :value="service"
              >
                {{ service.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-4">
            <label class="form-label w-100">
              <strong>Dan</strong>
            </label>
            <input
              id="id-calendar-edit-slot-day"
              v-model="rescheduledDateTime.date"
              class="form-control form-control-lg mb-3"
              type="date"
              name="id-calendar-edit-slot-day"
              :min="startLimitDatepicker"
              :max="endLimitDatepicker"
            >
          </div>
          <div class="col-md-6 mb-4">
            <label class="form-label w-100">
              <strong>Vrijeme</strong>
            </label>
            <select
              id="id-calendar-edit-slot-day-time"
              v-model="rescheduledDateTime.time"
              class="form-control form-control-lg mb-3"
              name="id-calendar-edit-slot-day-time"
            >
              <option
                v-for="time in timeOptions"
                :key="time"
                :value="time"
              >
                {{ time }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <label
              class="form-label"
              for="id-calendar-edit-slot-customer-name"
            >
              <strong>Ime klijenta</strong>
            </label>
            <input
              id="id-calendar-edit-slot-customer-name"
              v-model="rescheduledCustomer.name"
              type="text"
              class="form-control form-control-lg mb-3"
            >
          </div>
          <div class="col-md-4 mb-4">
            <label
              class="form-label"
              for="id-calendar-edit-slot-customer-email"
            >
              <strong>E-mail klijenta</strong>
            </label>
            <input
              id="id-calendar-edit-slot-customer-email"
              v-model="rescheduledCustomer.email"
              type="text"
              class="form-control form-control-lg mb-3"
            >
          </div>
          <div class="col-md-4 mb-4">
            <label
              class="form-label"
              for="id-calendar-edit-slot-customer-phone"
            >
              <strong>Mobitel klijenta</strong>
            </label>
            <input
              id="id-calendar-edit-slot-customer-phone"
              v-model="rescheduledCustomer.phone"
              type="text"
              class="form-control form-control-lg mb-3"
            >
          </div>
          <div class="col-md-12 mb-4">
            <label
              class="form-label"
              for="id-calendar-edit-slot-customer-notice"
            >
              <strong>Napomena</strong>
            </label>
            <textarea
              id="id-calendar-edit-slot-customer-notice"
              v-model="rescheduledNotice"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        v-if="isInThePast"
        class="btn btn-lg btn-primary"
        @click="updateAppointment()"
      >
        Spremi
      </button>
      <button
        v-if="!isInThePast"
        :class="{
          btn: true,
          'btn-lg': true,
          'btn-primary': !rescheduleRequestSent,
          'btn-success': rescheduleRequestSent && rescheduleStatus,
          'btn-danger': rescheduleRequestSent && !rescheduleStatus,
        }"
        @click="reschedule()"
      >
        Spremi
      </button>
      <button
        v-if="!isInThePast"
        class="btn btn-lg btn-danger"
        @click="cancel()"
      >
        Otkaži
      </button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import {
  defineComponent, computed, ref,
} from 'vue';
import Modal from '@/components/layout/Modal.vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Customer from '@/types/customer';
import { getTimeOptions, formatDateString, getDateStringFromDate } from '@/helpers/time';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    const allStaff = computed(() => store.state.staff.allStaff);
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const selectedAppointment = computed(() => store.state.shared.selectedAppointment);

    const rescheduledService = ref(JSON.parse(JSON.stringify(selectedAppointment.value?.service)));
    const rescheduledStaff = ref(JSON.parse(JSON.stringify(selectedAppointment.value?.staff)));
    const rescheduledDateTime = ref(JSON.parse(JSON.stringify({
      date: selectedAppointment.value?.date,
      time: selectedAppointment.value?.time,
    })));
    const rescheduledNotice = ref(JSON.parse(JSON.stringify(selectedAppointment.value?.message)));
    const rescheduledCustomer = ref(JSON.parse(JSON.stringify(selectedAppointment.value?.customer || {} as Customer)));
    const rescheduledStaffServices = computed(() => rescheduledStaff.value.services);
    const hasCustomerArrived = ref(JSON.parse(JSON.stringify(selectedAppointment.value?.hasCustomerArrived)));
    const rescheduleStatus = ref(false);
    const rescheduleRequestSent = ref(false);

    const isInThePast = new Date(`${selectedAppointment.value?.date}T${selectedAppointment.value?.time}`) < new Date();
    const timeOptions = getTimeOptions();

    const endLimitDate = new Date();
    endLimitDate.setDate(endLimitDate.getDate() + (selectedCompany.value?.preferences.schedulingWindow || 30));
    const startLimitDatepicker = getDateStringFromDate(new Date());
    const endLimitDatepicker = getDateStringFromDate(endLimitDate);

    function closeCalendarModal() {
      store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, false);
      document.body.classList.remove('modal-open');
    }

    async function updateAppointment() {
      try {
        await store.dispatch(ActionTypes.UPDATE_APPOINTMENT, {
          ...selectedAppointment.value,
          hasCustomerArrived: hasCustomerArrived.value,
        });
      } catch {
        // TODO:
      }
    }

    async function cancel(isReschedule = false) {
      try {
        await store.dispatch(ActionTypes.CANCEL_APPOINTMENT, { id: selectedAppointment.value?.id, isReschedule });

        if (!isReschedule) {
          store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, false);
          document.body.classList.remove('modal-open');
        }
      } catch {
        // eslint-disable-next-line no-alert
        window.alert('Nismo uspijeli otkazati termin, molimo probajte kasnije ili kontaktirajte korisničku podršku.');
      }
    }

    async function createAppointment() {
      try {
        let customerObject = {};
        customerObject = {
          name: rescheduledCustomer.value.name,
          email: rescheduledCustomer.value.email,
          phone: rescheduledCustomer.value.phone,
          company: selectedCompany.value?.id,
        };

        const createdCustomer: Customer = await store.dispatch(ActionTypes.CREATE_CUSTOMER, customerObject as Customer);

        let appointmentObject = {};
        appointmentObject = {
          date: formatDateString(rescheduledDateTime.value.date),
          time: rescheduledDateTime.value.time,
          company: selectedCompany.value?.id,
          staff: rescheduledStaff.value.id,
          service: rescheduledService.value.id,
          customer: createdCustomer.id,
          message: rescheduledNotice.value,
        };

        await store.dispatch(ActionTypes.CREATE_APPOINTMENT, appointmentObject);
        store.commit(MutationTypes.CHANGE_SELECTED_SERVICE, rescheduledService.value);

        rescheduleRequestSent.value = true;
        rescheduleStatus.value = true;

        closeCalendarModal();
      } catch {
        rescheduleRequestSent.value = true;
        rescheduleStatus.value = true;
      }
    }

    function reschedule() {
      cancel(true);
      createAppointment();
    }

    return {
      allStaff,
      closeCalendarModal,
      rescheduledService,
      rescheduledStaff,
      rescheduledDateTime,
      rescheduledStaffServices,
      rescheduledCustomer,
      rescheduleRequestSent,
      rescheduleStatus,
      rescheduledNotice,
      hasCustomerArrived,
      reschedule,
      cancel,
      timeOptions,
      isInThePast,
      updateAppointment,
      startLimitDatepicker,
      endLimitDatepicker,
    };
  },
});
</script>
