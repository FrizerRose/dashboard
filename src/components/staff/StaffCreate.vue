<template>
  <Modal :layout="'is-big'">
    <template #header>
      <h5 class="modal-title h4">
        Dodavanje radnika
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Zatvori"
        @click="closeStaffCreateModal()"
      />
    </template>
    <template #body>
      <div
        v-if="requestSent && !status"
        class="p-4 alert alert-danger"
      >
        <div class="container override-desktop-limit">
          {{ errorMsg }}
        </div>
      </div>

      <div class="radnik-identifikacija p-4 border-bottom">
        <div class="container px-0 override-desktop-limit">
          <div class="row">
            <div class="col-md-12">
              <label class="responsive-form-label w-100 mb-5 mt-2">
                Radnik će na e-mail adresu primiti podatke za pristup adminskom sučelju, te će na njega primate notifikacije o terminima.
                <br>
                Ne možete koristiti istu e-mail adresu za više radnika, tj. svaki radnik treba koristiti jedinstvenu e-mail adresu.
              </label>
            </div>
            <div class="col-md-6 mb-4">
              <label
                class="responsive-form-label"
                for="id-add-worker-name"
              >
                <span class="responsive-form-label__bolder">Ime</span>
              </label>
              <input
                id="id-add-worker-name"
                v-model="newStaff.name"
                type="text"
                class="form-control responsive-form-control"
              >
            </div>
            <div class="col-md-6 mb-4">
              <label
                class="responsive-form-label"
                for="id-add-worker-email"
              >
                <span class="responsive-form-label__bolder">E-mail</span>
              </label>
              <input
                id="id-add-worker-email"
                v-model="newStaff.email"
                type="email"
                class="form-control responsive-form-control"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="radnik-javno-prikazan">
        <div class="mt-4 border-bottom">
          <div class="my-4">
            <div class="row flex-row-reverse">
              <div class="col-12 col-sm-6">
                <label class="form-check m-0">
                  <input
                    v-model="newStaff.isPublic"
                    type="checkbox"
                    class="form-check-input"
                  >
                  <span class="form-check-label">Javno prikazan</span>
                </label>
              </div>

              <div class="col-12 col-sm-6">
                <label
                  class="responsive-form-label w-100 mb-0 mt-2"
                  for="id-rules"
                >
                  Označite da je radnik javno prikazan ako želite da bude dostupan za rezervaciju termina.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="radnik-radni-dani p-4 border-bottom">
        <div class="container px-0 override-desktop-limit">
          <div class="row">
            <div class="col-md-12 mb-4">
              <label class="responsive-form-label w-100 mb-5 mt-2">
                <span class="responsive-form-label__bolder">Radni dani</span>
                <br>
                Označite radne dane ovog radnika
              </label>
              <div
                v-for="(day, dayName) in newStaff.hours"
                :key="dayName"
                class="striped-row p-1"
              >
                <div class="row">
                  <div class="col-12 col-md-2">
                    <label
                      class="form-check m-0"
                      :class="{ 'mb-2' : day.active }"
                    >
                      <input
                        v-model="day.active"
                        type="checkbox"
                        class="form-check-input"
                        @change="toggleDayActive(day)"
                      >
                      <span class="form-check-label lead">{{ getDayTranslation(dayName.toString()) }}</span>
                    </label>
                  </div>
                  <div
                    v-if="day.active"
                    class="col-12 col-md-10 mb-4 section-reveal"
                  >
                    <div class="section-reveal">
                      <div
                        v-for="(shift, shiftIndex) in day.shifts"
                        :key="shiftIndex"
                      >
                        <div class="row">
                          <div class="col-md-12">
                            <div
                              class="section-reveal"
                              :class="{ 'mt-4' : shiftIndex !== 0 }"
                            >
                              <div class="row d-flex align-items-end">
                                <div class="col-6 col-md-2">
                                  <label
                                    class="responsive-form-label w-100"
                                    for="id-monday-shift-start"
                                  >
                                    <span class="responsive-form-label__bolder">Od</span>
                                  </label>
                                  <select
                                    id="id-monday-shift-start"
                                    v-model="shift.start"
                                    class="form-control responsive-form-control"
                                    name="monday-shift-start"
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
                                <div class="col-6 col-md-2">
                                  <label
                                    class="responsive-form-label w-100"
                                    for="id-monday-shift-end"
                                  >
                                    <span class="responsive-form-label__bolder">Do</span>
                                  </label>
                                  <select
                                    id="id-monday-shift-end"
                                    v-model="shift.end"
                                    class="form-control responsive-form-control"
                                    name="monday-shift-end"
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
                                <div class="col-12 col-md-8">
                                  <div class="row">
                                    <div class="col-12 col-md-6">
                                      <div v-if="shiftIndex !== 0">
                                        <button
                                          class="btn responsive-btn btn-danger w-100 mt-4 section-reveal__item is-red"
                                          @click="removeShift(day.shifts, shiftIndex)"
                                        >
                                          Makni smjenu
                                        </button>
                                      </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                      <div v-if="shiftIndex === day.shifts.length - 1">
                                        <button
                                          class="btn responsive-btn btn-primary w-100 mt-4"
                                          @click="addShift(day.shifts)"
                                        >
                                          Dodaj smjenu
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-8" />
                          <div
                            v-if="shiftIndex === day.shifts.length - 1"
                            class="col-md-4"
                          >
                            <button
                              v-if="dayName.toString() === 'monday'"
                              class="btn responsive-btn btn-secondary w-100 mt-4 section-reveal__item"
                              @click="copyShiftsToOtherDays(day)"
                            >
                              Kopiraj u označene dane
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="allServices.length"
        class="radnik-djelatnosti p-4 border-bottom"
      >
        <div class="container px-0 override-desktop-limit">
          <div class="row">
            <div class="col-md-12 mb-4">
              <label class="responsive-form-label w-100 mb-5 mt-2">
                <span class="responsive-form-label__bolder">Usluge i odgovornosti</span>
                <br>
                Označite usluge koje ovaj radnik pruža
              </label>
              <div class="striped-row p-1">
                <div class="row">
                  <div class="col-6 col-sm-8">
                    <label class="form-check m-0">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :checked="newStaff.services.length === allServices.length"
                        @change="toggleAllServices()"
                      >
                      <span class="form-check-label lead">Označi sve</span>
                    </label>
                  </div>
                </div>
              </div>
              <div
                v-for="service in allServices"
                :key="service.id"
                class="striped-row p-1"
              >
                <div class="row">
                  <div class="col-6 col-sm-8">
                    <label class="form-check m-0">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :checked="isAssigned(service)"
                        @change="toggleService(service)"
                      >
                      <span class="form-check-label lead">{{ service.name }}</span>
                    </label>
                  </div>
                  <div class="col-6 col-sm-4">
                    <div class="row">
                      <div class="col-6 col-sm-6">
                        <span class="responsive-form-label__bolder">{{ service.price }}</span> kn
                      </div>
                      <div class="col-6 col-sm-6">
                        <span class="responsive-form-label__bolder">{{ service.duration }}</span> min
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        :class="{
          btn: true,
          'responsive-btn': true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="createStaff()"
      >
        Spremi
      </button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import {
  defineComponent, reactive, ref, computed,
} from 'vue';
import Modal from '@/components/layout/Modal.vue';
import { Day, StartEnd, WorkingHours } from '@/types/workingHours';
import Staff from '@/types/staff';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Service from '@/types/service';
import { getTimeOptions, getDayTranslation } from '@/helpers/time';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const allServices = computed(() => store.state.service.services);
    const requestSent = ref(false);
    const status = ref(false);
    const errorMsg = ref('Promjena radnika nije uspjela. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.');
    const timeOptions = getTimeOptions();

    const newStaff = reactive({
      name: '',
      isPublic: true,
      email: '',
      company: selectedCompany.value?.id,
      hours: {
        monday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        tuesday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        wednesday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        thursday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        friday: { active: true, shifts: [{ start: '08:00', end: '16:00' }] },
        saturday: { active: false, shifts: [] },
        sunday: { active: false, shifts: [] },
      } as WorkingHours,
      services: [] as Service[],
    });

    function closeStaffCreateModal() {
      store.commit(MutationTypes.CHANGE_OPEN_STAFF_CREATE_MODAL, false);
      document.body.classList.remove('modal-open');
      const modal = document.getElementById('exampleModalFullscreen');
      if (modal) {
        modal.classList.remove('show');
      }
    }

    // Close modal on Escape press
    document.onkeydown = (evt) => {
      // eslint-disable-next-line no-param-reassign
      evt = evt || window.event;
      if (evt.code === 'Escape') {
        closeStaffCreateModal();
      }
    };

    function addShift(shifts: StartEnd[]) {
      shifts.push(({ start: '08:00', end: '16:00' }));
    }

    function removeShift(shifts: StartEnd[], index: number) {
      shifts.splice(index, 1);
    }

    function toggleDayActive(day: Day) {
      if (day.active) {
        addShift(day.shifts);
      } else {
        // Remove all shifts
        day.shifts.splice(0, day.shifts.length);
      }
    }

    function copyShiftsToOtherDays(selectedDay: Day) {
      Object.entries(newStaff.hours).forEach(([key]) => {
        if (newStaff.hours[key].active) {
          newStaff.hours[key].shifts = JSON.parse(JSON.stringify(selectedDay.shifts));
        }
      });
    }

    function isAssigned(service: Service) {
      return newStaff.services.findIndex((assignedService: Service) => assignedService.id === service.id) !== -1;
    }

    function toggleService(service: Service) {
      if (isAssigned(service)) {
        const serviceIndex = newStaff.services.findIndex((assignedService: Service) => assignedService.id === service.id);
        newStaff.services.splice(serviceIndex, 1);
      } else {
        newStaff.services.push(service);
      }
    }

    function toggleAllServices() {
      const alreadySelected = newStaff.services.length === allServices.value.length;
      if (alreadySelected) {
        newStaff.services = [];
      } else {
        newStaff.services = JSON.parse(JSON.stringify(allServices.value));
      }
    }

    async function createStaff() {
      if (newStaff.name && newStaff.email) {
        try {
          const user = await store.dispatch(ActionTypes.CREATE_STAFF_USER, newStaff as Staff);
          await store.dispatch(ActionTypes.CREATE_STAFF, { ...newStaff, user: { id: user.id } } as Staff);
          requestSent.value = true;
          status.value = true;
          newStaff.name = '';
          newStaff.email = '';
          closeStaffCreateModal();
        } catch {
          requestSent.value = true;
          status.value = false;
          errorMsg.value = 'Promjena radnika nije uspjela. Ako ste sigurni da su uneseni podaci ispravni, javite se korisničkoj podršci.';
        }
      } else {
        requestSent.value = true;
        status.value = false;
        errorMsg.value = 'Ime i e-mail moraju biti upisani.';
      }
    }

    return {
      requestSent,
      status,
      errorMsg,
      newStaff,
      createStaff,
      closeStaffCreateModal,
      isAssigned,
      toggleService,
      toggleAllServices,
      addShift,
      removeShift,
      toggleDayActive,
      copyShiftsToOtherDays,
      allServices,
      getDayTranslation,
      timeOptions,
    };
  },
});
</script>
