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
      <div v-if="isAppointmentModalOpen && selectedDateTime">
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
          id="id-service"
          v-model="selectedService"
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
          v-model="selectedCustomer.name"
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
          v-model="selectedCustomer.email"
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
          v-model="selectedCustomer.phone"
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
          v-model="selectedNotice"
          class="c-form_textarea"
        />
      </div>
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
import { Day } from '@/types/workingHours';
import Customer from '@/types/customer';
import Service from '@/types/service';

export default defineComponent({
  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);
    const allStaff = computed(() => store.state.staff.allStaff);
    const selectedWorker = computed(() => store.state.shared.selectedWorker);
    const isAppointmentModalOpen = ref(false);
    const selectedDateTime = ref(new Date());
    const services = reactive({ data: selectedWorker.value?.services });
    const selectedService = reactive({} as Service);
    const selectedCustomer = reactive({
      name: '', email: '', phone: '', company: selectedCompany.value,
    } as Customer);
    const selectedNotice = ref('');
    const requestSent = ref(false);
    const status = ref(false);

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

    const formattedAppointments = computed(() => reservedAppointments.value.map((appointment) => {
      if (appointment?.service?.duration) {
        const startDate = new Date(`${appointment.date}T${appointment.time}`);
        const endDate = new Date(startDate.getTime() + appointment.service.duration * 60000);
        return {
          id: appointment.id?.toString(),
          title: appointment.customer.name,
          start: startDate,
          end: endDate,
          // ...appointment,
        };
      }
      const startDate = new Date(`${appointment.date}T${appointment.time}`);
      const endDate = new Date(startDate.getTime() + selectedService.duration * 60000);
      return {
        id: appointment.id?.toString(),
        title: selectedCustomer.name,
        start: startDate,
        end: endDate,
        // ...appointment,
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
          locale: hrLocale,
          slotDuration: '00:15:00',
          slotLabelInterval: '01:00',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          businessHours: getFormattedBusinessHours(selectedWorker.value),
          events: formattedAppointments.value,
          selectable: true,
          select(info) {
            console.log('🚀 ~ file: Calendar.vue ~ line 118 ~ select ~ info', info);
            selectedDateTime.value = info.start;
            isAppointmentModalOpen.value = true;
          },
          unselect(info) {
            console.log('🚀 ~ file: Calendar.vue ~ line 121 ~ unselect ~ info', info);
            // isAppointmentModalOpen.value = false;
          },
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

    function getDateStringFromDate(date: Date): string {
      const dd = String(date.getDate());
      let mm = String(date.getMonth() + 1); // January is 0!
      const yyyy = date.getFullYear();

      if (mm.length < 2) {
        mm = `0${mm}`;
      }

      return `${yyyy}-${mm}-${dd}`;
    }

    async function createAppointment() {
      try {
        if (selectedWorker.value && selectedService) {
          const createdCustomer: Customer = await store.dispatch(ActionTypes.CREATE_CUSTOMER, {
            name: selectedCustomer.name,
            email: selectedCustomer.email,
            phone: selectedCustomer.phone,
            company: selectedCompany.value?.id,
          } as Customer);
          console.log('🚀 ~ file: Calendar.vue ~ line 306 ~ createAppointment ~ createdCustomer', createdCustomer);

          const appointmentObject = {
            date: getDateStringFromDate(selectedDateTime.value),
            time: `${selectedDateTime.value.getHours()}:${selectedDateTime.value.getMinutes()}0`,
            company: selectedCompany.value?.id,
            staff: selectedWorker.value.id,
            service: selectedService.id,
            customer: createdCustomer.id,
            message: selectedNotice.value,
          };
          console.log('🚀 ~ file: Calendar.vue ~ line 202 ~ createAppointment ~ appointmentObject', appointmentObject);
          await store.dispatch(ActionTypes.CREATE_APPOINTMENT, appointmentObject);
          requestSent.value = true;
          status.value = true;
        }
      } catch {
        requestSent.value = true;
        status.value = false;
      }
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

    function changeServices(newServices: Service[]) {
      services.data = newServices;
    }

    return {
      selectedCompany,
      allStaff,
      selectWorker,
      selectedWorker,
      reservedAppointments,
      formattedAppointments,
      isAppointmentModalOpen,
      selectedDateTime,
      createAppointment,
      services,
      selectedService,
      selectedCustomer,
      selectedNotice,
      requestSent,
      status,
      changeServices,
    };
  },
});
</script>
