<template>
  <Modal>
    <template #header>
      <h5
        class="modal-title h4"
      >
        Uređivanje radnika
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Zatvori"
        @click="closeStaffEditModal()"
      />
    </template>
    <template #body>
      <div class="radnik-podatci">
        <label
          class="form-label w-100"
        >
          <strong>Slika radnika</strong>
          <br>
          Za najbolje rezultate koristite kvadratnu ili vertikalnu (portrait) sliku
        </label>
        <div class="row">
          <div class="col-md-3 mb-4">
            <div class="row d-flex align-items-center">
              <div class="col-6 col-md-12">
                <div class="override-upload-image-wrap">
                  <div class="override-upload-image">
                    <div class="override-upload-image-square">
                      <img
                        v-if="imageLocation"
                        :src="imageLocation"
                        alt="logo"
                      >
                      <span
                        v-if="!imageLocation"
                        class="override-upload-image-layer override-upload-image-missing"
                      >
                        <span class="override-upload-image-layer override-upload-image-missing-placeholder">
                          <span class="fa fa-user" />
                        <!-- <i class="align-middle" data-feather="user"></i> -->
                        </span>
                      </span>
                    </div>
                    <span class="override-upload-image-layer override-upload-image-input-wrap">
                      <input
                        id="id-file-over-img"
                        class="override-input-file"
                        type="file"
                        name="id-file-over-img"
                        accept="image/svg, image/png, image/jpeg"
                        @change="upload"
                      >
                      <label
                        for="id-file-over-img"
                        class="override-upload-image-layer override-upload-image-input-wrap-label"
                      >
                        <span class="override-upload-image-layer override-upload-image-input-wrap-label-icon">
                          <span class="fa fa-camera" />
                        </span>
                      </label>
                    </span>
                  </div>
                  <button class="override-upload-image-remove override-upload-image-square">
                    <span class="override-upload-image-layer override-upload-image-remove-center">
                      <span class="fa fa-trash" />
                    </span>
                  </button>
                </div>
              </div>
              <div class="col-6 col-md-12 mt-4">
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
                <div
                  v-if="imageUploadSent && imageUploadStatus"
                  class="mt-2"
                >
                  Slika uspješno promjenjena!
                </div>
                <div
                  v-if="imageUploadSent && !imageUploadStatus"
                  class="mt-2"
                >
                  Došlo je do greške, molimo probajte kasnije!
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="mb-4">
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
            <div class="mb-4">
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
        </div>
      </div>
      <div class="radnik-radni-dani">
        <div class="row">
          <div class="col-md-3 mb-4" />
          <div class="col-md-9 mb-4 add-staff-section">
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
                        <input
                          v-model="shift.start"
                          type="text"
                          name="id-monday-shift-start"
                          class="form-control"
                        >
                      </div>
                      <div class="col-4 col-md-4">
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
                      <div
                        v-if="shiftIndex === day.shifts.length - 1"
                        class="col-4 col-md-4"
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
      <div class="radnik-djelatnosti">
        <div class="row">
          <div class="col-md-3 mb-4" />
          <div class="col-md-9 mb-4 add-staff-section">
            <label class="form-label w-100">
              <strong>Usluge i odgovornosti</strong>
              <br>
              Označite usluge koje ovaj radnik pruža
            </label>
            <div
              v-for="service in allServices"
              :key="service.id"
              class="row"
            >
              <div class="col-md-9">
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
              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-6">
                    <strong>{{ service.price }}</strong> kn
                  </div>
                  <div class="col-md-6">
                    <strong>{{ service.duration }}</strong> min
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="radnik-godisnji">
        <div class="row">
          <div class="col-md-3 mb-4" />
          <div class="col-md-9 mb-4 add-staff-section">
            <div class="row">
              <div class="col-12">
                <label class="form-label w-100">
                  <strong>Godišnji</strong>
                </label>
              </div>
              <div class="col-12">
                <div
                  v-for="(breakDate, index) in breakDates"
                  :key="index"
                  class="row d-flex align-items-end"
                >
                  <div class="col-12 col-md-3" />
                  <div class="col-12 col-md-3 mt-4">
                    <label class="form-label w-100">
                      <strong>Od</strong>
                    </label>
                    <input
                      id="date-start"
                      v-model="breakDate.start"
                      class="form-control"
                      type="date"
                      name="data-start"
                    >
                  </div>
                  <div class="col-12 col-md-3 mt-4">
                    <label class="form-label w-100">
                      <strong>Do</strong>
                    </label>
                    <input
                      id="date-end"
                      v-model="breakDate.end"
                      class="form-control"
                      type="date"
                      name="data-end"
                    >
                  </div>
                  <div class="col-12 col-md-3 mt-4">
                    <button
                      class="btn btn-danger"
                      @click="removeBreak(index)"
                    >
                      Ukloni razdoblje
                    </button>
                  </div>
                </div>
                <div class="row d-flex align-items-end">
                  <div class="col-md-3" />
                  <div class="col-md-9 mt-4">
                    <button
                      class="btn btn-primary"
                      @click="addBreak()"
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
    </template>
    <template #footer>
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
      <button
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeStaffEditModal()"
      >
        Zatvori
      </button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import {
  defineComponent, ref, reactive, computed, capitalize,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { Day, StartEnd } from '@/types/workingHours';
import Service from '@/types/service';
import Modal from '@/components/layout/Modal.vue';

export default defineComponent({
  components: {
    Modal,
  },
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

    let breakDates: { start: string; end: string }[] = reactive([]);
    if (formData.breaks.length) {
      breakDates = reactive(formData.breaks);
    }

    function formatDateString(oldFormat: string): string {
      const date = new Date(oldFormat);
      const dd = String(date.getDate());
      let mm = String(date.getMonth() + 1); // January is 0!
      const yyyy = date.getFullYear();

      if (mm.length < 2) {
        mm = `0${mm}`;
      }

      return `${yyyy}-${mm}-${dd}`;
    }

    function addBreak() {
      breakDates.push({ start: '', end: '' });
    }

    function removeBreak(index: number) {
      breakDates.splice(index, 1);
    }

    function closeStaffEditModal() {
      store.commit(MutationTypes.CHANGE_OPEN_STAFF_EDIT_MODAL, false);
      document.body.classList.remove('modal-open');
      const modal = document.getElementById('exampleModalFullscreen');
      if (modal) {
        modal.classList.remove('show');
      }
    }

    async function save() {
      try {
        const dateStrings: { start: string; end: string }[] = [];

        breakDates.forEach((breakObject) => {
          if (breakObject.start && breakObject.end) {
            dateStrings.push({
              start: formatDateString(breakObject.start),
              end: formatDateString(breakObject.end),
            });
          }
        });
        formData.breaks = dateStrings;

        await store.dispatch(ActionTypes.UPDATE_STAFF, formData);
        requestSent.value = true;
        status.value = true;
        closeStaffEditModal();
      } catch {
        requestSent.value = true;
        status.value = false;
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
      breakDates,
      addBreak,
      removeBreak,
      closeStaffEditModal,
    };
  },
});
</script>
