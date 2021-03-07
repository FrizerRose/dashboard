<template>
  <div>
    <div class="card">
      <div class="card-body">
        <label
          class="form-label w-100"
        >
          <strong>Slika Radnika</strong>
          <br>
          Ovdje možete promijeniti radnikovu sliku koja će biti prikazan na stranici
        </label>
        <img
          v-if="imageLocation"
          :src="imageLocation"
          alt="logo"
          style="max-width: 200px; max-height: 200px;"
        >
        <input
          id="id-file"
          class="override-input-file"
          type="file"
          name="id-file"
          accept="image/svg, image/png, image/jpeg"
          @change="upload"
        >
        <label
          for="id-file"
          class="btn btn-primary"
        >
          {{ inputFileText }}
        </label>
        <span v-if="imageUploadSent && imageUploadStatus">Slika uspješno promjenjena!</span>
        <span v-if="imageUploadSent && !imageUploadStatus">Došlo je do greške, molimo probajte kasnije!</span>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
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
    <div class="card">
      <div class="card-body">
        <label
          for="id-name"
          class="form-label w-100"
        >
          <strong>Ime Radnika</strong>
          <br>
          Ovdje možete promijeniti ime koje će pisati na stranici
        </label>
        <input
          v-model="formData.name"
          type="text"
          class="form-control"
          placeholder="Ime firme"
          for="id-name"
        >
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <label
          class="form-label"
          for="id-email"
        >
          <strong>E-mail adresa</strong>
          <br>
          Ovdje možete promijeniti e-mail adresu koja će se koristiti za kontaktiranje radnika
        </label>
        <input
          id="id-email"
          v-model="formData.email"
          type="email"
          class="form-control"
          placeholder="adresa@firma.hr"
        >
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div
          v-for="(day, dayName) in formData.hours"
          :key="dayName"
          class="row"
        >
          <div class="col-2 pt-4">
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
            class="col-10"
          >
            <div
              v-for="(shift, shiftIndex) in day.shifts"
              :key="shiftIndex"
              class="row"
            >
              <div class="col-1">
                <label
                  class="form-label w-100"
                  for="id-working-hour-from"
                >
                  <strong>Od</strong>
                </label>
              </div>
              <div class="col-3">
                <input
                  v-model="shift.start"
                  type="text"
                  name="shift-end"
                >
              </div>
              <div class="col-1">
                <label
                  class="form-label w-100"
                  for="id-working-hour-to"
                >
                  <strong>Do</strong>
                </label>
              </div>
              <div class="col-3">
                <input
                  v-model="shift.end"
                  type="text"
                  name="shift-end"
                >
              </div>
              <div
                v-if="shiftIndex === day.shifts.length - 1"
                class="col-3"
              >
                <button
                  class="btn btn-info"
                  @click="addShift(day.shifts)"
                >
                  +
                </button>
                <button
                  v-if="dayName.toString() === 'monday'"
                  class="btn btn-secondary"
                  @click="copyShiftsToOtherDays(day)"
                >
                  Copy to other days
                </button>
              </div>
            </div>
          </div>
          <hr v-if="day.shifts.length">
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div
          v-for="service in allServices"
          :key="service.id"
          class="row"
        >
          <div class="col-3">
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
          <div class="col-3">
            {{ service.price }}kn
          </div>
          <div class="col-3">
            {{ service.duration }}min
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, ref, reactive, computed, capitalize,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import { Day, StartEnd } from '@/types/workingHours';
import Service from '@/types/service';

export default defineComponent({
  props: {
    worker: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const formData = reactive(JSON.parse(JSON.stringify(props.worker)));
    const allServices = computed(() => store.state.service.services);
    const requestSent = ref(false);
    const status = ref(false);
    const imageUploadSent = ref(false);
    const imageUploadStatus = ref(false);
    const imageLocation = ref(formData?.image?.link);
    const inputFileText = ref('Odaberi sliku...');

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_STAFF, formData);
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

    function isAssigned(service: Service) {
      return formData.services.findIndex((assignedService: Service) => assignedService.id === service.id) !== -1;
    }

    function toggleService(service: Service) {
      if (isAssigned(service)) {
        const serviceIndex = formData.services.findIndex((assignedService: Service) => assignedService.id === service.id);
        formData.services.splice(serviceIndex, 1);
      } else {
        formData.services.push(service);
      }
    }

    async function upload(event: { target: EventTarget & { files: FileList } }) {
      try {
        const imageData = new FormData();
        const image = event.target.files[0];

        inputFileText.value = image.name;
        imageData.append('image', image);
        imageData.append('staff', formData.id.toString());

        const newImageLocation = await store.dispatch(ActionTypes.UPLOAD_IMAGE, imageData);
        imageLocation.value = newImageLocation;
        imageUploadSent.value = true;
        imageUploadStatus.value = true;
      } catch {
        imageUploadSent.value = true;
        imageUploadStatus.value = false;
      }
    }

    return {
      save,
      addShift,
      toggleDayActive,
      copyShiftsToOtherDays,
      formData,
      status,
      requestSent,
      capitalize,
      allServices,
      isAssigned,
      toggleService,
      inputFileText,
      upload,
      imageUploadSent,
      imageUploadStatus,
      imageLocation,
    };
  },
});
</script>
