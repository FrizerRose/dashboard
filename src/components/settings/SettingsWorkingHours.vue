<template>
  <div>
    <div class="working-hours-aaaaaaaaaaaaa">
      <div class="row">
        <div class="col-md-12 mb-4">
          <label class="form-label w-100">
            <strong>Radni dani</strong>
            <br>
            Označite na koje dane ste otvoreni
          </label>
          <div
            v-for="(day, dayName) in formData.hours"
            :key="dayName"
            class="row"
          >
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
              class="col-12 col-md-9"
            >
              <div
                v-for="(shift, shiftIndex) in day.shifts"
                :key="shiftIndex"
                class="row"
              >
                <div class="col-12">
                  <div class="row mb-4 d-flex align-items-end">
                    <div class="col-4 col-md-4">
                      <label
                        class="form-label w-100"
                        for="id-monday-shift-start"
                      >
                        <strong>Od</strong>
                      </label>
                      <select
                        id="id-monday-shift-start"
                        v-model="shift.start"
                        class="form-control mb-3"
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
                    <div class="col-4 col-md-4">
                      <label
                        class="form-label w-100"
                        for="id-monday-shift-end"
                      >
                        <strong>Do</strong>
                      </label>
                      <select
                        id="id-monday-shift-end"
                        v-model="shift.end"
                        class="form-control mb-3"
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
                    <div
                      v-if="shiftIndex !== 0"
                      class="col-2 col-md-2"
                    >
                      <button
                        class="btn btn-danger"
                        @click="removeShift(day.shifts, shiftIndex)"
                      >
                        Makni smjenu
                      </button>
                    </div>
                    <div
                      v-if="shiftIndex === day.shifts.length - 1"
                      class="col-2 col-md-2"
                    >
                      <button
                        class="btn btn-primary"
                        @click="addShift(day.shifts)"
                      >
                        Dodaj smjenu
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  v-if="shiftIndex === day.shifts.length - 1"
                  class="col-12"
                >
                  <div class="row mb-4 d-flex align-items-end">
                    <div class="col-12 col-md-12">
                      <button
                        v-if="dayName.toString() === 'monday'"
                        class="btn btn-primary"
                        @click="copyShiftsToOtherDays(day)"
                      >
                        Kopiraj u sve označene dane
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr v-if="day.shifts.length">
          </div>
        </div>
      </div>
    </div>

    <div class="working-hours-interaktivno">
      <button
        :class="{
          btn: true,
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
  defineComponent, computed, ref, reactive, capitalize,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import { Day, StartEnd } from '@/types/workingHours';
import { getTimeOptions } from '@/helpers/time';

export default defineComponent({
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const formData = reactive(JSON.parse(JSON.stringify(selectedCompany.value)));
    const requestSent = ref(false);
    const status = ref(false);

    const timeOptions = getTimeOptions();

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_COMPANY, formData);
        requestSent.value = true;
        status.value = true;
      } catch {
        requestSent.value = true;
        status.value = false;
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
      Object.entries(formData.hours).forEach(([key]) => {
        if (formData.hours[key].active) {
          formData.hours[key].shifts = JSON.parse(JSON.stringify(selectedDay.shifts));
        }
      });
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
      capitalize,
      timeOptions,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
