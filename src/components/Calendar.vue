<template>
  <!--
    # Calendar
    - 7 dana prikazano - back & foreward buttoni - DONE
    - odabir Radnika, nema combined prikaza - DONE
    - u kalendaru se nalaze slotovi za sva 24h. U jednom viewpointu na desktopu se vide - DONE
      8h sa scroll positionom na najranije vrijeme što imaju dodano u business hours.
    - inkrementi od 15min - DONE
    - appointment boja slotove. Upcoming termini recimo zelena boja, past termini žuta boja. - TODO: past
    - Klik na prazan slot otvara modal sa Kreiranjem termina, klik na zauzet slot otvara modal sa Editiranjem termina. Kopirati setmore.
    - Quick actions button - linkovi na dodavanje servica/ranika, etc. TODO:
  -->
  <div>
    <div class="card">
      <div class="card-body">
        <header class="page-calendar-header">
          <label
            for="id-calendar-select-staff"
            class="form-label w-100"
          >
            <strong>Odaberite radnika</strong>
          </label>
          <select
            id="id-calendar-select-staff"
            v-model="selectedWorker"
            name="id-calendar-select-staff"
            class="form-control mb-3"
            @change="selectWorker()"
          >
            <option
              v-for="worker in allStaff"
              :key="worker.id"
              :value="worker"
            >
              <a>{{ worker.name }}</a>
            </option>
          </select>
        </header>

        <div class="page-calendar-main">
          <div id="fullcalendar" />
        </div>
      </div>
    </div>

    <!-- EDIT/CANCEL -->
    <div v-if="isAppointmentModalOpen && creationDatetime && isEventSelected">
      <Modal>
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
          <div class="container">
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
                  class="form-control mb-3"
                  name="id-calendar-edit-slot-staff"
                  @change="changeRescheduleSelectedStaffServices()"
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
                  class="form-control mb-3"
                  name="id-calendar-edit-slot-service"
                >
                  <option
                    v-for="service in rescheduledStaffServices.data"
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
                  class="form-control mb-3"
                  type="date"
                  name="id-calendar-edit-slot-day"
                >
              </div>
              <div class="col-md-6 mb-4">
                <label class="form-label w-100">
                  <strong>Vrijeme</strong>
                </label>
                <select
                  id="id-calendar-edit-slot-day-time"
                  v-model="rescheduledDateTime.time"
                  class="form-control mb-3"
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
                  class="form-control mb-3"
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
                  class="form-control mb-3"
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
                  class="form-control mb-3"
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
            :class="{
              btn: true,
              'btn-primary': !rescheduleRequestSent,
              'btn-success': rescheduleRequestSent && rescheduleStatus,
              'btn-danger': rescheduleRequestSent && !rescheduleStatus,
            }"
            @click="reschedule()"
          >
            Spremi
          </button>
          <button
            class="btn btn-danger"
            @click="cancel()"
          >
            Otkaži
          </button>
        </template>
      </Modal>
    </div>

    <!-- CREATE -->
    <div v-if="isAppointmentModalOpen && creationDatetime && !isEventSelected">
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
                  v-if="services.data"
                  id="id-calendar-create-slot-staff"
                  class="form-control mb-3"
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
                  v-if="services.data"
                  id="id-calendar-create-slot-service"
                  v-model="creationService"
                  class="form-control mb-3"
                  name="id-calendar-create-slot-service"
                >
                  <option
                    v-for="service in services.data"
                    :key="service.id"
                    :value="service"
                  >
                    {{ service.name }}
                  </option>
                </select>
              </div>
            </div>
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
        </template>
        <template #footer>
          <button
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
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, computed, watch, ref, reactive,
} from 'vue';
import Modal from '@/components/layout/Modal.vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourcePlugin from '@fullcalendar/resource-common';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import hrLocale from '@fullcalendar/core/locales/hr';
import { useStore } from '@/store';
import Staff from '@/types/staff';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Customer from '@/types/customer';
import Service from '@/types/service';
import { formatDateString, getDateStringFromDate, getTimeOptions } from '@/helpers/time';
import { getFormattedBusinessHours } from '@/helpers/calendar';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    const allStaff = computed(() => store.state.staff.allStaff);
    const selectedWorker = ref(JSON.parse(JSON.stringify(allStaff.value[0])));
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);

    const isEventSelected = ref(false);
    // const isAppointmentModalOpen = ref(false);
    const isAppointmentModalOpen = computed(() => store.state.shared.isCalendarModalOpen);
    const status = ref(false);
    const requestSent = ref(false);
    const rescheduleStatus = ref(false);
    const rescheduleRequestSent = ref(false);

    const services = ref({ data: selectedWorker.value?.services });
    const creationDatetime = ref(new Date());
    const createdAppointmentID = ref(-1);
    const creationService = ref({} as Service);
    const creationNotice = ref('');
    const creationCustomer = reactive({
      name: '', email: '', phone: '', company: selectedCompany.value,
    } as Customer);

    const rescheduledService = ref({} as Service);
    const rescheduledStaff = ref({} as Staff);
    const rescheduledDateTime = ref({ date: '', time: '00:00' });
    const rescheduledStaffServices = reactive({ data: rescheduledStaff.value.services });
    const rescheduledNotice = ref('');
    const rescheduledCustomer = reactive({
      name: '', email: '', phone: '', company: selectedCompany.value,
    } as Customer);

    const timeOptions = getTimeOptions();

    const formattedAppointments = computed(() => reservedAppointments.value.map((appointment) => {
      let timeString = `${appointment.date}T${appointment.time}`;
      if (timeString.slice(-2) === ':0') {
        timeString += '0';
      }
      const startDate = new Date(timeString);
      if (typeof appointment.service !== 'number' && appointment.service) {
        const endDate = new Date(startDate.getTime() + appointment.service.duration * 60000);
        return {
          id: appointment.id?.toString(),
          title: `${appointment.customer.name} - ${appointment.service.name}`,
          start: startDate,
          end: endDate,
          extendedProps: { isNewAppointment: false, ...appointment },
        };
      }
      const endDate = new Date(startDate.getTime() + creationService.value.duration * 60000);
      return {
        id: appointment.id?.toString(),
        title: creationCustomer.name,
        start: startDate,
        end: endDate,
        extendedProps: { isNewAppointment: true, ...appointment },
      };
    }));

    function changeRescheduleSelectedStaffServices() {
      rescheduledStaffServices.data = rescheduledStaff.value.services;
    }

    onMounted(() => {
      const calendarEl = document.getElementById('fullcalendar');
      if (calendarEl && selectedWorker.value) {
        const calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, resourcePlugin, interactionPlugin, bootstrapPlugin],
          // contentHeight: 600,
          // height: '100vh',
          // expandRows: true,
          initialView: 'timeGridWeek',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,listWeek',
          },
          footerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,listWeek',
          },
          titleFormat: {
            month: 'numeric',
            day: 'numeric',
          },
          views: {
            timeGridWeek: {
            },
          },
          allDaySlot: false,
          locale: hrLocale,
          slotDuration: '00:15:00',
          slotLabelInterval: '01:00',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          businessHours: getFormattedBusinessHours(selectedWorker.value),
          events: formattedAppointments.value,
          selectable: true,
          select(info) {
            creationDatetime.value = info.start;
            isEventSelected.value = false;
            // isAppointmentModalOpen.value = true;
            store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, true);
            document.body.classList.add('modal-open');
          },

          eventClick(info) {
            console.log('🚀 ~ file: Calendar.vue ~ line 238 ~ onMounted ~ info', info);
            // eslint-disable-next-line no-underscore-dangle
            createdAppointmentID.value = parseInt(info.event._def.publicId, 10);

            // eslint-disable-next-line no-underscore-dangle
            const appointmentData = info.event._def.extendedProps;

            if (appointmentData.isNewAppointment) {
              // eslint-disable-next-line no-alert
              window.alert('Refreshajte stranicu prije nego otkazujete novo dodani termin.');
            } else {
              const staffId = appointmentData.staff.id;
              const eventStaff = allStaff.value.find((worker) => worker.id === staffId);
              if (eventStaff) {
                rescheduledStaff.value = eventStaff;
                changeRescheduleSelectedStaffServices();
              }

              const serviceId = appointmentData.service.id;
              const eventService = rescheduledStaffServices.data.find((service) => service.id === serviceId);
              if (eventService) {
                rescheduledService.value = eventService;
              }

              rescheduledDateTime.value.date = appointmentData.date;
              rescheduledDateTime.value.time = appointmentData.time;

              rescheduledCustomer.name = appointmentData.customer.name;
              rescheduledCustomer.email = appointmentData.customer.email;
              if (appointmentData.customer.phone !== undefined) {
                rescheduledCustomer.phone = appointmentData.customer.phone;
              }
              if (appointmentData.message !== undefined) {
                rescheduledNotice.value = appointmentData.message;
              }

              isEventSelected.value = true;
              // isAppointmentModalOpen.value = true;
              store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, true);
              document.body.classList.add('modal-open');
            }
          },
          // Sa auto heightom se prikaže cijeli calendar bez scrollabara, ali ne radi scrollanje to odredjenog vremena
          // height: 'auto',
          themeSystem: 'bootstrap',
          // events: [
          //   {
          //     end: '2021-03-09T14:45:00.000Z',
          //     id: '57',
          //     start: '2021-03-09T14:00:00.000Z',
          //     title: 'juraj purac',
          //   },
          // ],
        });

        // Updates calendar events
        watch(
          () => formattedAppointments.value,
          (appointments, prevAppointments) => {
            prevAppointments.forEach((appointment) => {
              if (appointment.id) {
                const event = calendar.getEventById(appointment.id);
                if (event) {
                  event.remove();
                }
              }
            });
            appointments.forEach((appointment) => {
              calendar.addEvent(appointment);
            });
          },
        );

        // Updates business hours
        watch(
          () => selectedWorker.value,
          (worker) => {
            console.log('🚀 ~ file: Calendar.vue ~ line 454 ~ onMounted ~ worker', worker);
            calendar.scrollToTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
            if (worker) {
              calendar.setOption('businessHours', getFormattedBusinessHours(worker));
            }
          },
        );

        calendar.render();

        // Scroll to current time of day
        // calendar.scrollToTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
      }
    });

    async function createAppointment(isRescheduling = false) {
      try {
        if (selectedWorker.value) {
          let customerObject = {};
          if (isRescheduling) {
            customerObject = {
              name: rescheduledCustomer.name,
              email: rescheduledCustomer.email,
              phone: rescheduledCustomer.phone,
              company: selectedCompany.value?.id,
            };
          } else {
            customerObject = {
              name: creationCustomer.name,
              email: creationCustomer.email,
              phone: creationCustomer.phone,
              company: selectedCompany.value?.id,
            };
          }
          const createdCustomer: Customer = await store.dispatch(ActionTypes.CREATE_CUSTOMER, customerObject as Customer);

          let appointmentObject = {};
          if (isRescheduling) {
            creationCustomer.name = createdCustomer.name;

            appointmentObject = {
              date: formatDateString(rescheduledDateTime.value.date),
              time: rescheduledDateTime.value.time,
              company: selectedCompany.value?.id,
              staff: rescheduledStaff.value.id,
              service: rescheduledService.value.id,
              customer: createdCustomer.id,
              message: creationNotice.value,
            };
          } else {
            appointmentObject = {
              date: getDateStringFromDate(creationDatetime.value),
              time: `${creationDatetime.value.getHours()}:${creationDatetime.value.getMinutes()}`,
              company: selectedCompany.value?.id,
              staff: selectedWorker.value.id,
              service: creationService.value.id,
              customer: createdCustomer.id,
              message: creationNotice.value,
            };
          }
          await store.dispatch(ActionTypes.CREATE_APPOINTMENT, appointmentObject);

          if (isRescheduling) {
            rescheduleRequestSent.value = true;
            rescheduleStatus.value = true;
          } else {
            requestSent.value = true;
            status.value = true;
          }

          // isAppointmentModalOpen.value = false;
          store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, false);
          document.body.classList.remove('modal-open');
        }
      } catch {
        if (isRescheduling) {
          rescheduleRequestSent.value = true;
          rescheduleStatus.value = true;
        } else {
          requestSent.value = true;
          status.value = true;
        }
      }
    }

    async function cancel(isRescheduling = false) {
      try {
        if (createdAppointmentID.value > 0) {
          await store.dispatch(ActionTypes.CANCEL_APPOINTMENT, createdAppointmentID.value);

          if (!isRescheduling) {
            // isAppointmentModalOpen.value = false;
            store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, false);
            document.body.classList.remove('modal-open');
          }
        }
      } catch {
        // eslint-disable-next-line no-alert
        window.alert('Nismo uspijeli otkazati termin, molimo probajte kasnije ili kontaktirajte korisničku podršku.');
      }
    }

    function reschedule() {
      cancel(true);
      createAppointment(true);
    }

    function fetchSelectedWorkerAppointments() {
      if (selectedWorker.value) {
        store.dispatch(ActionTypes.FETCH_STAFF_BY_ID, [selectedWorker.value.id]);
      }
    }

    function selectWorker() {
      store.commit(MutationTypes.CHANGE_SELECTED_WORKER, selectedWorker.value);
      fetchSelectedWorkerAppointments();
    }

    fetchSelectedWorkerAppointments();

    function closeCalendarModal() {
      console.log('closeCalendarModal');
      store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, false);
      document.body.classList.remove('modal-open');
    }

    return {
      selectedCompany,
      allStaff,
      selectWorker,
      selectedWorker,
      reservedAppointments,
      formattedAppointments,
      isAppointmentModalOpen,
      closeCalendarModal,
      creationDatetime,
      createAppointment,
      timeOptions,
      services,
      creationService,
      creationCustomer,
      creationNotice,
      requestSent,
      status,
      isEventSelected,
      reschedule,
      cancel,
      rescheduledService,
      rescheduledStaff,
      rescheduledDateTime,
      rescheduledStaffServices,
      rescheduledCustomer,
      changeRescheduleSelectedStaffServices,
      rescheduleRequestSent,
      rescheduleStatus,
      rescheduledNotice,
    };
  },
});
</script>

<style lang="scss">
.fc .fc-toolbar {
  @media (max-width: 1199px) {
    flex-direction: column;
  }
}
.fc-toolbar-chunk {
  @media (max-width: 1199px) {
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
