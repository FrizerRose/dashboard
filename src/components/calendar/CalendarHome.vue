<template>
  <div class="card flex-fill">
    <div class="card-body py-4">
      <div class="d-flex align-items-start">
        <div class="flex-grow-1">
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

export default defineComponent({
  setup() {
    const store = useStore();

    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);

    const isMobile = computed(() => store.state.shared.isMobile);

    const calendar = ref({} as Calendar);

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

    onMounted(() => {
      const calendarEl = document.getElementById('fullcalendar');
      if (calendarEl) {
        calendar.value = new Calendar(calendarEl, {
          plugins: [listPlugin, bootstrapPlugin],
          initialView: 'listWeek',
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

        // // Updates business hours
        // watch(
        //   () => selectedWorker.value,
        //   (worker) => {
        //     console.log('🚀 ~ file: Calendar.vue ~ line 454 ~ onMounted ~ worker', worker);
        //     calendar.value.scrollToTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
        //     if (worker) {
        //       calendar.value.setOption('businessHours', getFormattedBusinessHours(worker));
        //     }
        //   },
        // );

        calendar.value.render();

        // Scroll to current time of day
        // calendar.scrollToTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
      }
    });

    return {
      formattedAppointments, reservedAppointments,
    };
  },
});
</script>