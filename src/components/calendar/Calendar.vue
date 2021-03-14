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
        <select
          id="selectedWorker"
          v-model="selectedWorker"
          name="selectedWorker"
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
      </h5>
    </div>
    <div class="card-body">
      <!-- EDIT/CANCEL -->
      <div v-if="isAppointmentModalOpen && isEventSelected">
        <CalendarEditModal />
      </div>

      <!-- CREATE -->
      <div v-if="isAppointmentModalOpen && !isEventSelected">
        <CalendarCreateModal />
      </div>
    </div>

    <div id="fullcalendar" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, computed, watch, ref,
} from 'vue';
import CalendarCreateModal from '@/components/calendar/CalendarCreateModal.vue';
import CalendarEditModal from '@/components/calendar/CalendarEditModal.vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourcePlugin from '@fullcalendar/resource-common';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import hrLocale from '@fullcalendar/core/locales/hr';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { getFormattedBusinessHours } from '@/helpers/calendar';
import Customer from '@/types/customer';
import Service from '@/types/service';
import { getDateStringFromDate } from '@/helpers/time';

export default defineComponent({
  components: {
    CalendarCreateModal,
    CalendarEditModal,
  },
  setup() {
    const store = useStore();

    const allStaff = computed(() => store.state.staff.allStaff);
    const allServices = computed(() => store.state.service.services);
    const selectedWorker = ref(JSON.parse(JSON.stringify(allStaff.value[0])));
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);

    const isEventSelected = ref(false);
    const isAppointmentModalOpen = computed(() => store.state.shared.isCalendarModalOpen);

    const selectedService = computed(() => store.state.shared.selectedService);

    function openModal() {
      store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, true);
      document.body.classList.add('modal-open');
    }

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
      const endDate = new Date(startDate.getTime() + (selectedService.value?.duration || 45) * 60000);
      return {
        id: appointment.id?.toString(),
        title: 'Novi termin',
        start: startDate,
        end: endDate,
        backgroundColor: 'green',
        extendedProps: { isNewAppointment: true, ...appointment },
      };
    }));

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
            store.commit(MutationTypes.CHANGE_SELECTED_DATETIME, {
              date: getDateStringFromDate(info.start),
              time: `${info.start.getHours()}:${info.start.getMinutes()}`,
            });
            isEventSelected.value = false;
            openModal();
          },

          eventClick(info) {
            console.log('🚀 ~ file: Calendar.vue ~ line 238 ~ onMounted ~ info', info);
            // eslint-disable-next-line no-underscore-dangle
            store.commit(MutationTypes.CHANGE_CALENDAR_SELECTED_APPOINTMENT, parseInt(info.event._def.publicId, 10));

            // eslint-disable-next-line no-underscore-dangle
            const appointmentData = info.event._def.extendedProps;

            if (appointmentData.isNewAppointment) {
              // eslint-disable-next-line no-alert
              window.alert('Refreshajte stranicu prije nego otkazujete novo dodani termin.');
            } else {
              const staffId = appointmentData.staff.id;
              const eventStaff = allStaff.value.find((worker) => worker.id === staffId);
              if (eventStaff) {
                store.commit(MutationTypes.CHANGE_SELECTED_STAFF, eventStaff);
              }

              const serviceId = appointmentData.service.id;
              const eventService = allServices.value.find((service: Service) => service.id === serviceId);
              if (eventService) {
                store.commit(MutationTypes.CHANGE_SELECTED_SERVICE, eventService);
              }

              store.commit(MutationTypes.CHANGE_SELECTED_DATETIME, { date: appointmentData.date, time: appointmentData.time });

              const rescheduledCustomer = {
                name: appointmentData.customer.name,
                email: appointmentData.customer.email,
                phone: '',
              } as Customer;

              if (appointmentData.customer.phone !== undefined) {
                rescheduledCustomer.phone = appointmentData.customer.phone;
              }
              store.commit(MutationTypes.CHANGE_SELECTED_CUSTOMER, rescheduledCustomer);

              if (appointmentData.message !== undefined) {
                store.commit(MutationTypes.CHANGE_SELECTED_NOTICE, appointmentData.message);
              }

              isEventSelected.value = true;
              openModal();
            }
          },
          // Sa auto heightom se prikaže cijeli calendar bez scrollabara, ali ne radi scrollanje to odredjenog vremena
          // height: 'auto',
          themeSystem: 'bootstrap',
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

    return {
      allStaff,
      selectWorker,
      selectedWorker,
      isAppointmentModalOpen,
      isEventSelected,
    };
  },
});
</script>
