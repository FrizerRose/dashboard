<template>
  <!--
    # Calendar
    - 7 dana prikazano - back & foreward buttoni - DONE
    - odabir Radnika, nema combined prikaza - DONE
    - u kalendaru se nalaze slotovi za sva 24h. U jednom viewpointu na desktopu se vide - DONE
      8h sa scroll positionom na najranije vrijeme što imaju dodano u business hours.
    - inkrementi od 15min - DONE
    - appointment boja slotove. Upcoming termini recimo zelena boja, past termini žuta boja. - TODO past
    - Klik na prazan slot otvara modal sa Kreiranjem termina, klik na zauzet slot otvara modal sa Editiranjem termina. Kopirati setmore.
    - Quick actions button - linkovi na dodavanje servica/ranika, etc.
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
      <div id="fullcalendar" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, computed, watch,
} from 'vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourcePlugin from '@fullcalendar/resource-common';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import hrLocale from '@fullcalendar/core/locales/hr';
import { useStore } from '@/store';
import Staff from '@/types/staff';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { Day } from '@/types/workingHours';

export default defineComponent({
  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);
    const allStaff = computed(() => store.state.staff.allStaff);
    const selectedWorker = computed(() => store.state.shared.selectedWorker);

    const formattedAppointments = computed(() => reservedAppointments.value.map((appointment) => {
      const startDate = new Date(`${appointment.date}T${appointment.time}`);
      const endDate = new Date(startDate.getTime() + appointment.service.duration * 60000);
      return {
        id: appointment.id?.toString(),
        title: appointment.customer.name,
        start: startDate,
        end: endDate,
        // ...appointment,
      };
    }));

    function getDayNumber(day: string): number {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      return days.findIndex((dayName) => dayName === day) + 1;
    }

    function getFormattedBusinessHours(worker: Staff) {
      const formattedBusinessHours: {daysOfWeek: number[]; start: string; end: string}[] = [];
      Object.entries(worker.hours).forEach(([index, day]: [string, Day]) => {
        const dayNumber = getDayNumber(index);
        if (day.active && day.shifts.length) {
          const firstShiftStart = day.shifts[0].start;
          const lastShiftEnd = day.shifts[day.shifts.length - 1].end;
          formattedBusinessHours.push({
            daysOfWeek: [dayNumber],
            start: firstShiftStart,
            end: lastShiftEnd,
          });
        }
      });

      return formattedBusinessHours;
    }

    onMounted(() => {
      const calendarEl = document.getElementById('fullcalendar');
      if (calendarEl && selectedWorker.value) {
        const calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, resourcePlugin, bootstrapPlugin],
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
          locale: hrLocale,
          slotDuration: '00:15:00',
          slotLabelInterval: '01:00',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          businessHours: getFormattedBusinessHours(selectedWorker.value),
          events: formattedAppointments.value,
          // Sa auto heightom se prikaže cijeli calendar bez scrollabara, ali ne radi scrollanje to odredjenog vremena
          // height: 'auto',
          // themeSystem: 'bootstrap',
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
        calendar.scrollToTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
      }
    });

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
    };
  },
});
</script>
