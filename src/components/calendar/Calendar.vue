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
            for="selectedWorker"
            class="form-label w-100"
          >
            <strong>Odaberite radnika</strong>
          </label>
          <select
            id="selectedWorker"
            v-model="selectedWorker"
            name="selectedWorker"
            class="form-control mb-3"
            @change="selectWorker()"
          >
            <option
              v-for="worker in allStaff"
              :key="worker.id"
              :value="worker"
            >
              {{ worker.name }}
            </option>
          </select>
        </header>

        <div class="page-calendar-main">
          <div class="page-calendar-toolbar">
            <div class="page-calendar-toolbar__item">
              <button
                class="btn btn-primary me-2"
                @click="prevWeek()"
              >
                <i class="fas fa-angle-left" />
              </button>
              <button
                class="btn btn-primary me-2"
                @click="nextWeek()"
              >
                <i class="fas fa-angle-right" />
              </button>
              <button
                class="btn btn-primary"
                @click="goToToday()"
              >
                Danas
              </button>
            </div>

            <div class="page-calendar-toolbar__item">
              <h3 class="h3 mb-0">
                {{ headerTitle }}
              </h3>
            </div>

            <div class="page-calendar-toolbar__item">
              <button
                class="btn btn-primary me-2"
                @click="changeViewGrid()"
              >
                Tjedan
              </button>
              <button
                class="btn btn-secondary"
                @click="changeViewList()"
              >
                Raspored
              </button>
            </div>
          </div>

          <div class="row">
            <div id="fullcalendar" />
          </div>
        </div>

        <!-- EDIT/CANCEL -->
        <div v-if="isAppointmentModalOpen && isEventSelected">
          <CalendarEditModal />
        </div>

        <!-- CREATE -->
        <div v-if="isAppointmentModalOpen && !isEventSelected">
          <CalendarCreateModal />
        </div>
      </div>
    </div>
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
import Appointment from '@/types/appointment';

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

    const calendar = ref({} as Calendar);
    const headerTitle = ref('');

    function openModal() {
      store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, true);
      document.body.classList.add('modal-open');
    }

    const formattedAppointments = computed(() => reservedAppointments.value.map((appointment) => {
      let time: string;
      if (appointment.time.charAt(1) === ':') {
        time = `0${appointment.time}`;
      } else {
        time = appointment.time;
      }

      let timeString = `${appointment.date}T${time}`;
      if (timeString.slice(-2) === ':0') {
        timeString += '0';
      }

      const startDate = new Date(timeString);
      if (typeof appointment.service !== 'number' && appointment.service) {
        const endDate = new Date(startDate.getTime() + appointment.service.duration * 60000);

        let backgroundColor = '#3788d8';
        let textColor = 'white';
        if (startDate.getTime() < (new Date()).getTime()) {
          backgroundColor = 'lightgray';
          textColor = 'black';
        }

        return {
          id: appointment.id?.toString(),
          title: `${appointment.customer.name} - ${appointment.service.name}`,
          start: startDate,
          end: endDate,
          backgroundColor,
          textColor,
          extendedProps: { isNewAppointment: false, ...appointment },
        };
      }

      const endDate = new Date(startDate.getTime() + (selectedService.value?.duration || 45) * 60000);
      return {
        id: appointment.id?.toString(),
        title: 'Novi termin',
        start: startDate,
        end: endDate,
        backgroundColor: '#37d866',
        color: 'black',
        extendedProps: { isNewAppointment: true, ...appointment },
      };
    }));

    onMounted(() => {
      const calendarEl = document.getElementById('fullcalendar');
      if (calendarEl && selectedWorker.value) {
        calendar.value = new Calendar(calendarEl, {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, resourcePlugin, interactionPlugin, bootstrapPlugin],
          initialView: 'timeGridWeek',
          headerToolbar: false,
          // headerToolbar: {
          //   left: 'prev,next today',
          //   center: 'title',
          //   right: 'timeGridWeek,listWeek',
          // },
          views: {
            timeGridWeek: {
            },
          },
          nowIndicator: true,
          stickyHeaderDates: true,
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
            const appointmentData = info.event._def.extendedProps;

            if (appointmentData.isNewAppointment) {
              // eslint-disable-next-line no-alert
              window.alert('Refreshajte stranicu prije nego otkazujete novo dodani termin.');
            } else {
              const selectedAppointment = {
                // eslint-disable-next-line no-underscore-dangle
                id: parseInt(info.event._def.publicId, 10),
                date: appointmentData.date,
                time: appointmentData.time,
                hasCustomerArrived: appointmentData.hasCustomerArrived,
              } as Appointment;

              const staffId = appointmentData.staff.id;
              const eventStaff = allStaff.value.find((worker) => worker.id === staffId);
              if (eventStaff) {
                selectedAppointment.staff = eventStaff;
              }

              const serviceId = appointmentData.service.id;
              const eventService = allServices.value.find((service: Service) => service.id === serviceId);
              if (eventService) {
                selectedAppointment.service = eventService;
              }

              const rescheduledCustomer = {
                name: appointmentData.customer.name,
                email: appointmentData.customer.email,
                phone: '',
              } as Customer;

              if (appointmentData.customer.phone !== undefined) {
                rescheduledCustomer.phone = appointmentData.customer.phone;
              }
              selectedAppointment.customer = rescheduledCustomer;

              if (appointmentData.message !== undefined) {
                selectedAppointment.message = appointmentData.message;
              }

              store.commit(MutationTypes.CHANGE_SELECTED_APPOINTMENT, selectedAppointment);

              isEventSelected.value = true;
              openModal();
            }
          },
          // Sa auto heightom se prikaže cijeli calendar bez scrollabara, ali ne radi scrollanje to odredjenog vremena
          // height: 'auto',
          themeSystem: 'bootstrap',
        });

        headerTitle.value = calendar.value.view.title;

        // Updates calendar events
        watch(
          () => formattedAppointments.value,
          (appointments, prevAppointments) => {
            prevAppointments.forEach((appointment) => {
              if (appointment.id) {
                const event = calendar.value.getEventById(appointment.id);
                if (event) {
                  event.remove();
                }
              }
            });
            appointments.forEach((appointment) => {
              calendar.value.addEvent(appointment);
            });
          },
        );

        // Updates business hours
        watch(
          () => selectedWorker.value,
          (worker) => {
            console.log('🚀 ~ file: Calendar.vue ~ line 454 ~ onMounted ~ worker', worker);
            calendar.value.scrollToTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
            if (worker) {
              calendar.value.setOption('businessHours', getFormattedBusinessHours(worker));
            }
          },
        );

        calendar.value.render();

        // Scroll to current time of day
        // calendar.scrollToTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
      }
    });

    function fetchSelectedWorkerAppointments(customDates: {start: string; end: string}) {
      if (selectedWorker.value) {
        store.dispatch(ActionTypes.FETCH_STAFF_BY_ID, {
          id: selectedWorker.value.id,
          customDates,
        });
      }
    }

    function fetchAppointmentsWithCalendarDates() {
      fetchSelectedWorkerAppointments({
        start: getDateStringFromDate(calendar.value.view.activeStart),
        end: getDateStringFromDate(calendar.value.view.activeEnd),
      });
    }

    function selectWorker() {
      store.commit(MutationTypes.CHANGE_SELECTED_WORKER, selectedWorker.value);
      fetchAppointmentsWithCalendarDates();
    }

    function prevWeek() {
      calendar.value.prev();
      headerTitle.value = calendar.value.view.title;
      fetchAppointmentsWithCalendarDates();
    }

    function nextWeek() {
      calendar.value.next();
      headerTitle.value = calendar.value.view.title;
      fetchAppointmentsWithCalendarDates();
    }

    function goToToday() {
      calendar.value.today();
      headerTitle.value = calendar.value.view.title;
      fetchAppointmentsWithCalendarDates();
    }

    function changeViewGrid() {
      calendar.value.changeView('timeGridWeek');
    }

    function changeViewList() {
      calendar.value.changeView('listWeek');
    }

    const today = new Date(); // get current date
    const firstDayOfWeek = today.getDate() - today.getDay() + 1; // First day is the day of the month - the day of the week
    const lastDayOfWeek = firstDayOfWeek + 6; // last day is the first day + 6

    fetchSelectedWorkerAppointments({
      start: getDateStringFromDate(new Date(today.setDate(firstDayOfWeek))),
      end: getDateStringFromDate(new Date(today.setDate(lastDayOfWeek))),
    });

    return {
      allStaff,
      selectWorker,
      selectedWorker,
      isAppointmentModalOpen,
      isEventSelected,
      headerTitle,
      prevWeek,
      nextWeek,
      goToToday,
      changeViewGrid,
      changeViewList,
      formattedAppointments,
      reservedAppointments,
    };
  },
});
</script>

<style lang="scss">
.page-calendar-toolbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  @media (max-width: 1199px) {
    flex-direction: column;
  }
  @media (min-width: 1200px) {
  }
}
.page-calendar-toolbar__item {
  @media (max-width: 1199px) {
    margin-bottom: 1rem;
  }
  @media (min-width: 1200px) {
  }
}
.fc .fc-timegrid-slot {
  height: 2rem;
}
.fc-event-main {
  line-height: 1.25;
  font-size: 1rem;
  transition: font-size 0.3s cubic-bezier(0.4, 0, 0, 1);
}
.fc-theme-bootstrap a:not([href]) {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0, 1);

  &:hover {
    transform: scale(2);

    .fc-event-main {
      font-size: 0.5rem;
    }
  }
}
</style>