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
      <div class="container px-0 override-desktop-limit">
        <div class="radnik-identifikacija">
          <div class="row">
            <div class="col-md-6 mb-4">
              <label
                class="form-label"
                for="id-add-worker-name"
              >
                <strong>Ime</strong>
              </label>
              <input
                id="id-add-worker-name"
                v-model="newStaff.name"
                type="text"
                class="form-control"
              >
            </div>
            <div class="col-md-6 mb-4">
              <label
                class="form-label"
                for="id-add-worker-email"
              >
                <strong>E-mail</strong>
              </label>
              <input
                id="id-add-worker-email"
                v-model="newStaff.email"
                type="email"
                class="form-control"
              >
            </div>
          </div>
        </div>

        <div class="radnik-radni-dani">
          <div class="row">
            <div class="col-md-12 mb-4">
              <label class="form-label w-100">
                <strong>Radni dani</strong>
                <br>
                Označite na koje dane ste otvoreni
              </label>
              <div
                v-for="(day, dayName) in newStaff.hours"
                :key="dayName"
                class="striped-row p-1"
              >
                <div class="row">
                  <div class="col-12 col-md-3">
                    <label class="form-check m-0">
                      <input
                        v-model="day.active"
                        type="checkbox"
                        class="form-check-input"
                        @change="toggleDayActive(day)"
                      >
                      <span class="form-check-label lead">{{ capitalize(dayName.toString()) }}</span>
                    </label>
                  </div>
                  <div
                    v-if="day.active"
                    class="col-12 col-md-9 mb-4 section-reveal"
                  >
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
                                  class="form-label w-100"
                                  for="id-monday-shift-start"
                                >
                                  <strong>Od</strong>
                                </label>
                                <input
                                  v-model="shift.start"
                                  type="text"
                                  name="id-monday-shift-start"
                                  class="form-control"
                                >
                              </div>
                              <div class="col-6 col-md-2">
                                <label
                                  class="form-label w-100"
                                  for="id-monday-shift-end"
                                >
                                  <strong>Do</strong>
                                </label>
                                <input
                                  v-model="shift.end"
                                  type="text"
                                  name="id-monday-shift-end"
                                  class="form-control"
                                >
                              </div>
                              <div class="col-12 col-md-8">
                                <div class="row">
                                  <div class="col-12 col-md-6">
                                    <div v-if="shiftIndex !== 0">
                                      <button
                                        class="btn btn-danger w-100 mt-4 section-reveal__item is-red"
                                        @click="removeShift(day.shifts, shiftIndex)"
                                      >
                                        Makni smjenu
                                      </button>
                                    </div>
                                  </div>
                                  <div class="col-12 col-md-6">
                                    <div v-if="shiftIndex === day.shifts.length - 1">
                                      <button
                                        class="btn btn-primary w-100 mt-4"
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
                        <div
                          v-if="shiftIndex === day.shifts.length - 1"
                          class="col-12"
                        >
                          <button
                            v-if="dayName.toString() === 'monday'"
                            class="btn btn-secondary w-100 mt-4 section-reveal__item"
                            @click="copyShiftsToOtherDays(day)"
                          >
                            Kopiraj u sve označene dane
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

        <div class="radnik-djelatnosti">
          <div class="row">
            <div class="col-md-12 mb-4">
              <label class="form-label w-100">
                <strong>Usluge i odgovornosti</strong>
                <br>
                Označite usluge koje ovaj radnik pruža
              </label>
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
                        <strong>{{ service.price }}</strong> kn
                      </div>
                      <div class="col-6 col-sm-6">
                        <strong>{{ service.duration }}</strong> min
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
  defineComponent, reactive, ref, computed, capitalize,
} from 'vue';
import Modal from '@/components/layout/Modal.vue';
import { Day, StartEnd, WorkingHours } from '@/types/workingHours';
import Staff from '@/types/staff';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Service from '@/types/service';

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
    const newStaff = reactive({
      name: '',
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

    async function createStaff() {
      try {
        await store.dispatch(ActionTypes.CREATE_STAFF, newStaff as Staff);
        requestSent.value = true;
        status.value = true;
        newStaff.name = '';
        newStaff.email = '';
        closeStaffCreateModal();
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      requestSent,
      status,
      newStaff,
      createStaff,
      closeStaffCreateModal,
      isAssigned,
      toggleService,
      addShift,
      removeShift,
      toggleDayActive,
      copyShiftsToOtherDays,
      allServices,
      capitalize,
    };
  },
});
</script>

<style lang="scss" scoped>

.section-reveal {
  position: relative;
  z-index: 0;
}

.section-reveal__item {
  position: static;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bs-secondary);
    z-index: -1;
    margin: -0.25rem;
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0, 1), transform 0.1s cubic-bezier(0.4, 0, 0, 1);
  }

  &:hover {
    &:before {
      opacity: .1;
      transform: none;
    }
  }

  &.is-red {
    &:before {
      background-color: var(--bs-danger);
    }
    &:hover {
      &:before {
        opacity: .2;
        transform: none;
      }
    }
  }
}

.striped-row {
  border: 0 solid;
  border-bottom-width: 1px;
  border-color: #dee6ed;

  &:nth-child(odd) {
    background-color: #f4f7f9;
  }
}
</style>
