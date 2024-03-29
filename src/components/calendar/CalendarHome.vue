<template>
  <div class="card flex-fill">
    <div class="card-body py-4">
      <div class="d-flex align-items-start">
        <div class="flex-grow-1">
          <div
            id="fullcalendar-custom"
            class="fc fc-media-screen fc-direction-ltr fc-theme-bootstrap"
          >
            <div class="fc-header-toolbar fc-toolbar ">
              <div class="fc-toolbar-chunk">
                <h2 class="fc-toolbar-title">
                  {{ headerTitle }}
                </h2>
              </div>
              <div class="fc-toolbar-chunk" />
              <div class="fc-toolbar-chunk">
                <button
                  class="fc-today-button btn btn-primary"
                  type="button"
                  :disabled="today.getTime() === selectedDate.getTime()"
                  @click="fetchToday()"
                >
                  Danas
                </button>
                <div class="btn-group">
                  <button
                    class="fc-prev-button btn btn-primary"
                    @click="fetchPrev()"
                  >
                    <span class="fa fa-chevron-left" />
                  </button>
                  <button
                    class="fc-next-button btn btn-primary"
                    @click="fetchNext()"
                  >
                    <span class="fa fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="fullcalendar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, computed, ref, watch,
} from 'vue';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import hrLocale from '@fullcalendar/core/locales/hr';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import { getDateStringFromDate } from '@/helpers/time';

export default defineComponent({
  setup() {
    const store = useStore();

    const user = computed(() => store.getters.getUser);
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);
    const shownReservedAppointments = computed(() => reservedAppointments.value.filter((appointment) => {
      if (user.value?.isAdminAccount || !user.value) {
        return true;
      }

      return appointment.staff.user?.id === user.value.id;
    }));
    const isMobile = computed(() => store.state.shared.isMobile);
    const headerTitle = ref('');

    const selectedDate = ref(new Date());
    const today = new Date();

    const calendar = ref({} as Calendar);

    const formattedAppointments = computed(() => shownReservedAppointments.value.map((appointment) => {
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
      const endDate = new Date(startDate.getTime() + appointment.service.duration * 60000);

      let backgroundColor = '#3788d8';
      let textColor = 'white';
      if (startDate.getTime() < (new Date()).getTime()) {
        backgroundColor = 'lightgray';
        textColor = 'black';
      }

      return {
        id: appointment.id?.toString(),
        title: `${appointment.staff.name} - ${appointment.service.name} za ${appointment.customer.name}`,
        start: startDate,
        end: endDate,
        backgroundColor,
        textColor,
        extendedProps: { isNewAppointment: false, ...appointment },
      };
    }));

    function setTitle(dateString: string) {
      if (user.value?.isAdminAccount || !user.value) {
        headerTitle.value = `Svi termini ${dateString}`;
      } else {
        headerTitle.value = `${user.value?.name} - termini ${dateString}`;
      }
    }

    onMounted(() => {
      const calendarEl = document.getElementById('fullcalendar');
      if (calendarEl) {
        calendar.value = new Calendar(calendarEl, {
          plugins: [listPlugin, bootstrapPlugin],
          initialView: 'listDay',
          selectable: !isMobile.value,
          contentHeight: isMobile.value ? (window.innerHeight * 0.7) : 800,
          headerToolbar: false,
          nowIndicator: true,
          stickyHeaderDates: true,
          locale: hrLocale,
          slotDuration: '00:15:00',
          slotLabelInterval: '01:00',
          events: formattedAppointments.value,
          // Sa auto heightom se prikaže cijeli calendar bez scrollabara, ali ne radi scrollanje to odredjenog vremena
          // height: 'auto',
          themeSystem: 'bootstrap',
        });

        setTitle(calendar.value.view.title);

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

        calendar.value.render();
      }
    });

    function fetchNewAppointments() {
      if (selectedCompany.value) {
        store.dispatch(ActionTypes.FETCH_APPOINTMENTS_ON_DATE, {
          companyID: selectedCompany.value.id,
          dateString: getDateStringFromDate(selectedDate.value),
        });
      }
    }

    function fetchPrev() {
      calendar.value.prev();
      setTitle(calendar.value.view.title);
      selectedDate.value.setDate(selectedDate.value.getDate() - 1);
      fetchNewAppointments();
    }

    function fetchNext() {
      calendar.value.next();
      setTitle(calendar.value.view.title);
      selectedDate.value.setDate(selectedDate.value.getDate() + 1);
      fetchNewAppointments();
    }

    function fetchToday() {
      calendar.value.today();
      setTitle(calendar.value.view.title);
      selectedDate.value.setDate(new Date().getDate());
      fetchNewAppointments();
    }

    return {
      formattedAppointments,
      fetchPrev,
      fetchNext,
      fetchToday,
      selectedDate,
      today,
      headerTitle,
    };
  },
});
</script>
