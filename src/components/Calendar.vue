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
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">
        <div
          v-for="worker in allStaff"
          :key="worker.id"
        >
          <span
            v-if="selectedWorker && selectedWorker.id === worker.id"
            class="mr-3"
          >-----></span>
          <a @click.prevent="selectWorker(worker)">{{ worker.name }}</a>
        </div>
      </h5>
    </div>
    <div class="card-body">
      <!-- EDIT/CANCEL -->
      <div v-if="isAppointmentModalOpen && creationDatetime && isEventSelected">
        <label
          for="id-service"
          class="form-label w-100"
        >
          <strong>Radnik</strong>
        </label>
        <select
          id="id-service"
          v-model="rescheduledStaff"
          class="form-control mb-3"
          name="id-service"
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
        <label
          for="id-service-reschedule"
          class="form-label w-100"
        >
          <strong>Usluga</strong>
        </label>
        <select
          id="id-service-reschedule"
          v-model="rescheduledService"
          class="form-control mb-3"
          name="id-service-reschedule"
        >
          <option
            v-for="service in rescheduledStaffServices.data"
            :key="service.id"
            :value="service"
          >
            {{ service.name }}
          </option>
        </select>

        <label class="form-label w-100">
          <strong>Dan</strong>
        </label>
        <input
          id="date-start"
          v-model="rescheduledDateTime.date"
          class="form-control"
          type="date"
          name="data-start"
        >
        <label class="form-label w-100">
          <strong>Vrijeme</strong>
        </label>
        <select
          id="id-service-reschedule"
          v-model="rescheduledDateTime.time"
          class="form-control mb-3"
          name="id-service-reschedule"
        >
          <option
            v-for="time in timeOptions"
            :key="time"
            :value="time"
          >
            {{ time }}
          </option>
        </select>
        <label
          class="form-label"
          for="id-client-name"
        >
          <strong>Ime klijenta</strong>
        </label>
        <input
          id="id-client-name"
          v-model="rescheduledCustomer.name"
          type="text"
          class="form-control"
        >
        <label
          class="form-label"
          for="id-client-email"
        >
          <strong>Email klijenta</strong>
        </label>
        <input
          id="id-client-email"
          v-model="rescheduledCustomer.email"
          type="text"
          class="form-control"
        >
        <label
          class="form-label"
          for="id-client-phone"
        >
          <strong>Mobitel klijenta</strong>
        </label>
        <input
          id="id-client-phone"
          v-model="rescheduledCustomer.phone"
          type="text"
          class="form-control"
        >
        <label
          class="form-label"
          for="id-client-notice"
        >
          <strong>Napomena</strong>
        </label>
        <textarea
          id="id-client-notice"
          v-model="rescheduledNotice"
          class="c-form_textarea"
        />
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
      </div>

      <!-- CREATE -->
      <div v-if="isAppointmentModalOpen && creationDatetime && !isEventSelected">
        <label
          v-if="selectedWorker"
          for="id-staff"
          class="form-label w-100"
        >
          <strong>Radnik: {{ selectedWorker.name }} </strong>
        </label>
        <label
          for="id-service"
          class="form-label w-100"
        >
          <strong>Usluga</strong>
        </label>
        <select
          v-if="services.data"
          id="id-service"
          v-model="creationService"
          class="form-control mb-3"
          name="id-service"
        >
          <option
            v-for="service in services.data"
            :key="service.id"
            :value="service"
          >
            {{ service.name }}
          </option>
        </select>
        <label
          class="form-label"
          for="id-client-name"
        >
          <strong>Ime klijenta</strong>
        </label>
        <input
          id="id-client-name"
          v-model="creationCustomer.name"
          type="text"
          class="form-control"
        >
        <label
          class="form-label"
          for="id-client-email"
        >
          <strong>Email klijenta</strong>
        </label>
        <input
          id="id-client-email"
          v-model="creationCustomer.email"
          type="text"
          class="form-control"
        >
        <label
          class="form-label"
          for="id-client-phone"
        >
          <strong>Mobitel klijenta</strong>
        </label>
        <input
          id="id-client-phone"
          v-model="creationCustomer.phone"
          type="text"
          class="form-control"
        >
        <label
          class="form-label"
          for="id-client-notice"
        >
          <strong>Napomena</strong>
        </label>
        <textarea
          id="id-client-notice"
          v-model="creationNotice"
          class="c-form_textarea"
        />
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
      </div>
    </div>

    <div id="fullcalendar" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, computed, watch, ref, reactive,
} from 'vue';
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
  setup() {
    const store = useStore();

    const allStaff = computed(() => store.state.staff.allStaff);
    const selectedWorker = computed(() => store.state.shared.selectedWorker);
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);

    const isEventSelected = ref(false);
    const isAppointmentModalOpen = ref(false);
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
          initialView: 'timeGridWeek',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,listWeek',
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
            isAppointmentModalOpen.value = true;
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
              isAppointmentModalOpen.value = true;
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

          isAppointmentModalOpen.value = false;
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
            isAppointmentModalOpen.value = false;
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

    function selectWorker(worker: Staff) {
      store.commit(MutationTypes.CHANGE_SELECTED_WORKER, worker);
      fetchSelectedWorkerAppointments();
    }

    fetchSelectedWorkerAppointments();

    return {
      selectedCompany,
      allStaff,
      selectWorker,
      selectedWorker,
      reservedAppointments,
      formattedAppointments,
      isAppointmentModalOpen,
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
