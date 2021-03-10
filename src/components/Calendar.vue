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
      <div v-if="isAppointmentModalOpen && selectedDateTime && isEventSelected">
        <label
          for="id-service"
          class="form-label w-100"
        >
          <strong>Radnik</strong>
        </label>
        <select
          id="id-service"
          v-model="rescheduleSelectedStaff"
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
          v-model="rescheduleSelectedService"
          class="form-control mb-3"
          name="id-service-reschedule"
        >
          <option
            v-for="service in rescheduleSelectedStaffServices.data"
            :key="service.id"
            :value="service"
          >
            {{ service.name }}
          </option>
        </select>
        <button
          class="btn btn-primary"
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
      <div v-if="isAppointmentModalOpen && selectedDateTime && !isEventSelected">
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
    const isEventSelected = ref(false);
    const selectedDateTime = ref(new Date());
    const selectedAppointmentID = ref(-1);
    const services = ref({ data: selectedWorker.value?.services });
    const selectedService = ref({} as Service);
    const rescheduleSelectedService = ref({} as Service);
    const rescheduleSelectedStaff = ref({} as Staff);
    const rescheduleSelectedStaffServices = reactive({ data: rescheduleSelectedStaff.value.services });
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
      let timeString = `${appointment.date}T${appointment.time}`;
      if (timeString.slice(-2) === ':0') {
        timeString += '0';
      }
      const startDate = new Date(timeString);
      if (typeof appointment.service !== 'number' && appointment.service) {
        const endDate = new Date(startDate.getTime() + appointment.service.duration * 60000);
        return {
          id: appointment.id?.toString(),
          title: appointment.customer.name,
          start: startDate,
          end: endDate,
          // ...appointment,
        };
      }
      const endDate = new Date(startDate.getTime() + selectedService.value.duration * 60000);
      const aa = {
        id: appointment.id?.toString(),
        title: selectedCustomer.name,
        start: startDate,
        end: endDate,
        // ...appointment,
      };
      return aa;
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
            selectedDateTime.value = info.start;
            isEventSelected.value = false;
            isAppointmentModalOpen.value = true;
          },
          unselect(info) {
            console.log('🚀 ~ file: Calendar.vue ~ line 121 ~ unselect ~ info', info);
            // isAppointmentModalOpen.value = false;
          },
          eventClick(info) {
            console.log('🚀 ~ file: Calendar.vue ~ line 238 ~ onMounted ~ info', info);
            // eslint-disable-next-line no-underscore-dangle
            selectedAppointmentID.value = parseInt(info.event._def.publicId, 10);
            isEventSelected.value = true;
            isAppointmentModalOpen.value = true;
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

          const appointmentObject = {
            date: getDateStringFromDate(selectedDateTime.value),
            time: `${selectedDateTime.value.getHours()}:${selectedDateTime.value.getMinutes()}`,
            company: selectedCompany.value?.id,
            staff: selectedWorker.value.id,
            service: selectedService.value.id,
            customer: createdCustomer.id,
            message: selectedNotice.value,
          };

          await store.dispatch(ActionTypes.CREATE_APPOINTMENT, appointmentObject);
          requestSent.value = true;
          status.value = true;
          isAppointmentModalOpen.value = false;
        }
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    async function cancel() {
      if (selectedAppointmentID.value > 0) {
        await store.dispatch(ActionTypes.CANCEL_APPOINTMENT, selectedAppointmentID.value);
      }
    }

    async function reschedule() {
      try {
        cancel();
      } catch {
        console.log('aa');
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
      services.value.data = newServices;
    }

    function changeRescheduleSelectedStaffServices() {
      rescheduleSelectedStaffServices.data = rescheduleSelectedStaff.value.services;
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
      isEventSelected,
      reschedule,
      cancel,
      rescheduleSelectedService,
      rescheduleSelectedStaff,
      rescheduleSelectedStaffServices,
      changeRescheduleSelectedStaffServices,
    };
  },
});
</script>
