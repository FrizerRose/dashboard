<template>
  <div>
    <div class="working-hours-interaktivno mb-4 text-end">
      <button
        :class="{
          btn: true,
          'responsive-btn': true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="save()"
      >
        Spremi
      </button>
    </div>

    <div
      v-if="requestSent && !status"
      class="p-4 mt-4 alert alert-danger"
    >
      <div class="container override-desktop-limit">
        Spremanje nije uspjelo. Pokušajte ponovno. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.
      </div>
    </div>

    <div class="working-hours-info">
      <div class="mt-4 border-top border-bottom">
        <div class="my-4 h4">
          <div class="container override-desktop-limit">
            Ovdje trebate podesiti radno vrijeme tokom kojeg je vaš poslovni subjekt otvoren za rad s klijentima.
            <br><br>Svaki dan u tjednu se može posebno podesiti.
            <br><br>Radnici mogu individualno podesiti svoje vrijeme, ali to se nalazi na stranici "Radnici".
          </div>
        </div>
      </div>
    </div>

    <div class="working-hours-day-list">
      <div class="container px-0 x-override-desktop-limit">
        <div class="mt-4 mb-6">
          <div
            v-for="(day, dayName) in formData.hours"
            :key="dayName"
            class="striped-row p-1"
          >
            <div class="row">
              <div class="col-12">
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
                  <span class="form-check-label |-lead responsive-form-label__bolder">{{ getDayTranslation(dayName.toString()) }}</span>
                </label>
              </div>
            </div>
            <div class="row">
              <div
                v-if="day.active"
                class="col-12 mt-4 mb-4"
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
                    <div
                      v-if="dayName.toString() === 'monday'"
                      class="row"
                    >
                      <div class="col-md-8" />
                      <div
                        v-if="shiftIndex === day.shifts.length - 1"
                        class="col-md-4"
                      >
                        <button
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

    <div class="postavke-neradni-dani |-p-4">
      <div class="container px-0 override-desktop-limit">
        <div class="border-top">
          <div class="row">
            <div class="col-md-12 mt-4">
              <!-- <label class="responsive-form-label w-100 mb-5 mt-2"> -->
              <label class="responsive-form-label w-100 mb-3 mt-0">
                <span class="responsive-form-label__bolder">Neradni dani</span>
                <br>
                Ovdje možete dodati razdoblje kad poslovni subjekt ne prima nove rezervacije.
                Stranica će za odabrane datume ispisati da nema dostupnih termina.
              </label>

              <div v-if="!dayOffPairs.length">
                <div class="p-4 alert alert-info">
                  Nema unesenih razdoblja
                </div>
                <div class="mt-4">
                  <div class="row">
                    <div class="col-12 col-md-3">
                      <button
                        class="btn responsive-btn btn-primary w-100"
                        @click="addDayOffPair()"
                      >
                        Dodaj razdoblje
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-for="(breakDate, index) in dayOffPairs"
                :key="index"
                class="striped-row p-1"
              >
                <div class="row d-flex align-items-end">
                  <div class="col-12 col-md-9 mb-4">
                    <div class="section-reveal">
                      <div class="row d-flex align-items-end">
                        <div class="col-6 col-md-4">
                          <label class="responsive-form-label w-100">
                            <span class="responsive-form-label__bolder">Od</span>
                          </label>
                          <input
                            id="date-start"
                            v-model="breakDate.start"
                            class="form-control responsive-form-control"
                            type="date"
                            name="data-start"
                          >
                        </div>
                        <div class="col-6 col-md-4">
                          <label class="responsive-form-label w-100">
                            <span class="responsive-form-label__bolder">Do</span>
                          </label>
                          <input
                            id="date-end"
                            v-model="breakDate.end"
                            class="form-control responsive-form-control"
                            type="date"
                            name="data-end"
                          >
                        </div>
                        <div class="col-12 col-md-4">
                          <button
                            class="btn responsive-btn btn-danger w-100 mt-4 section-reveal__item is-red"
                            @click="removeDayOffPair(index)"
                          >
                            Ukloni razdoblje
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-3">
                    <div v-if="index === dayOffPairs.length - 1">
                      <button
                        class="btn responsive-btn btn-primary w-100 mb-4"
                        @click="addDayOffPair()"
                      >
                        Dodaj razdoblje
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

    <div class="working-hours-interaktivno mt-4 text-end">
      <button
        :class="{
          btn: true,
          'responsive-btn': true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="save()"
      >
        Spremi
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, computed, ref, reactive,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import { Day, StartEnd } from '@/types/workingHours';
import { getTimeOptions, formatDateString, getDayTranslation } from '@/helpers/time';

export default defineComponent({
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const formData = reactive(JSON.parse(JSON.stringify(selectedCompany.value)));
    const requestSent = ref(false);
    const status = ref(false);

    const timeOptions = getTimeOptions();

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
      Object.entries(formData.hours).forEach(([key]) => {
        if (formData.hours[key].active) {
          formData.hours[key].shifts = JSON.parse(JSON.stringify(selectedDay.shifts));
        }
      });
    }

    // Neradni dani
    let dayOffPairs: { start: string; end: string }[] = reactive([]);
    if (formData.daysOff.length) {
      dayOffPairs = reactive(formData.daysOff);
    }

    function addDayOffPair() {
      dayOffPairs.push({ start: '', end: '' });
    }

    function removeDayOffPair(index: number) {
      dayOffPairs.splice(index, 1);
    }

    async function save() {
      try {
        const dateStrings: { start: string; end: string }[] = [];

        dayOffPairs.forEach((dayOffObject) => {
          if (dayOffObject.start && dayOffObject.end) {
            dateStrings.push({
              start: formatDateString(dayOffObject.start),
              end: formatDateString(dayOffObject.end),
            });
          }
        });
        formData.daysOff = dateStrings;

        await store.dispatch(ActionTypes.UPDATE_COMPANY, formData);
        requestSent.value = true;
        status.value = true;
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      save,
      addShift,
      removeShift,
      toggleDayActive,
      copyShiftsToOtherDays,
      formData,
      status,
      requestSent,
      timeOptions,
      getDayTranslation,
      addDayOffPair,
      removeDayOffPair,
      dayOffPairs,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
