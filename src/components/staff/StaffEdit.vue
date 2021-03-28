<template>
  <Modal :layout="'is-big'">
    <template #header>
      <h5 class="modal-title h4">
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
      <div
        v-if="requestSent && !status"
        class="p-4 alert alert-danger"
      >
        <div class="container override-desktop-limit">
          {{ errorMsg }}
        </div>
      </div>

      <div class="p-4 border-bottom">
        <div class="container override-desktop-limit">
          <div class="radnik-podatci">
            <div>
              <label class="responsive-form-label w-100 mb-5 mt-2">
                <span class="responsive-form-label__bolder">Slika radnika</span>
                <br>
                Podržavamo formate: JPG, PNG
              </label>
              <div class="row">
                <div class="col-md-3 mb-4">
                  <div class="row d-flex align-items-center">
                    <div class="col-6 col-md-12">
                      <div class="text-center">
                        <div class="override-upload-image-wrap">
                          <div class="override-upload-image">
                            <div class="override-upload-image-square">
                              <img
                                v-if="image?.link"
                                :src="image.link"
                                alt="logo"
                                class="fit-cover"
                              >
                              <span
                                v-if="!image?.link"
                                class="override-upload-image-layer override-upload-image-missing"
                              >
                                <span class="override-upload-image-layer override-upload-image-missing-placeholder">
                                  <span class="fa fa-user is-user" />
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
                          <button
                            v-if="image?.link"
                            class="override-upload-image-remove override-upload-image-square"

                            @click="removeImage()"
                          >
                            <span class="override-upload-image-layer override-upload-image-remove-center">
                              <span class="fa fa-trash" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-md-12 mt-4">
                      <div class="text-center fallback-file-input-option">
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
                          class="btn responsive-btn btn-primary"
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
                          v-if="(imageUploadSent && !imageUploadStatus) || imageRemoveHasError"
                          class="mt-2"
                        >
                          Došlo je do greške, molimo probajte kasnije!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="mb-4">
                    <label
                      for="id-name"
                      class="responsive-form-label w-100"
                    >
                      <span class="responsive-form-label__bolder">Ime radnika</span>
                      <br>
                      Ovdje možete promijeniti ime koje će pisati na stranici
                    </label>
                    <input
                      v-model="formData.name"
                      type="text"
                      class="form-control responsive-form-control"
                      placeholder="Ime subjekta"
                      for="id-name"
                    >
                  </div>
                  <div class="mb-4">
                    <label
                      class="responsive-form-label"
                      for="id-email"
                    >
                      <span class="responsive-form-label__bolder">E-mail adresa</span>
                      <br>
                      Ovdje možete promijeniti e-mail adresu koja će se koristiti za kontaktiranje radnika
                    </label>
                    <input
                      id="id-email"
                      v-model="formData.email"
                      type="email"
                      class="form-control responsive-form-control"
                      placeholder="adresa@subjekt.hr"
                    >
                  </div>
                </div>
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
                v-for="(day, dayName) in formData.hours"
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
                                          Ukloni smjenu
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

      <div class="radnik-djelatnosti p-4 border-bottom">
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
                        :checked="formData.services.length === allServices.length"
                        @change="toggleAllServices()"
                      >
                      <span class="form-check-label lead">Sve</span>
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

      <div class="radnik-godisnji p-4 border-bottom">
        <div class="container px-0 override-desktop-limit">
          <div class="row">
            <div class="col-md-12 mb-4">
              <label class="responsive-form-label w-100 mb-5 mt-2">
                <span class="responsive-form-label__bolder">Godišnji odmor</span>
                <br>
                Ovdje možete dodati razdoblje kad ste na godišnjem. Za vrijeme godišnjih odmora nećete biti dostupni za odabir na stranici.
              </label>

              <div v-if="!breakDates.length">
                <div class="text-primary">
                  Nema unesenih razdoblja za godišnji
                </div>
                <div class="row">
                  <div class="col-12 col-md-3">
                    <button
                      class="btn responsive-btn btn-primary w-100 mt-4"
                      @click="addBreak()"
                    >
                      Dodaj razdoblje
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-for="(breakDate, index) in breakDates"
                :key="index"
                class="striped-row p-1"
              >
                <div class="row d-flex align-items-end">
                  <div class="col-12 col-md-9 mb-4">
                    <div class="section-reveal">
                      <div class="row d-flex align-items-end">
                        <div class="col-12 col-sm-6 col-md-4">
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
                        <div class="col-12 col-sm-6 col-md-4">
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
                            @click="removeBreak(index)"
                          >
                            Ukloni razdoblje
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-3 mb-4">
                    <div v-if="index === breakDates.length - 1">
                      <button
                        class="btn responsive-btn btn-primary w-100 mt-4"
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
        @click="save()"
      >
        Spremi
      </button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import {
  defineComponent, ref, reactive, computed,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { Day, StartEnd } from '@/types/workingHours';
import Service from '@/types/service';
import Modal from '@/components/layout/Modal.vue';
import { getTimeOptions, getDayTranslation } from '@/helpers/time';

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
    const errorMsg = ref('Kreiranje radnika nije uspjelo. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.');
    const imageUploadSent = ref(false);
    const imageUploadStatus = ref(false);
    const imageRemoveHasError = ref(false);
    const image = ref(formData?.image);
    const inputFileText = ref('Odaberi sliku...');

    const timeOptions = getTimeOptions();

    // For newly added staff
    if (formData.breaks === undefined) {
      formData.breaks = [];
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

    function toggleAllServices() {
      const alreadySelected = formData.services.length === allServices.value.length;
      if (alreadySelected) {
        formData.services = [];
      } else {
        formData.services = JSON.parse(JSON.stringify(allServices.value));
      }
    }

    async function upload(event: { target: EventTarget & { files: FileList } }) {
      try {
        const imageData = new FormData();
        const imageToUpload = event.target.files[0];

        inputFileText.value = imageToUpload.name;
        imageData.append('image', imageToUpload);
        imageData.append('staff', formData.id.toString());

        const newImage = await store.dispatch(ActionTypes.UPLOAD_IMAGE, imageData);
        image.value = newImage;
        formData.image = newImage;
        imageUploadSent.value = true;
        imageUploadStatus.value = true;
      } catch {
        imageUploadSent.value = true;
        imageUploadStatus.value = false;
      }
    }

    async function removeImage() {
      imageRemoveHasError.value = false;
      try {
        await store.dispatch(ActionTypes.DELETE_IMAGE, image.value.id);
        image.value = null;
      } catch {
        imageRemoveHasError.value = true;
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

    // Close modal on Escape press
    document.onkeydown = (evt) => {
      // eslint-disable-next-line no-param-reassign
      evt = evt || window.event;
      if (evt.code === 'Escape') {
        closeStaffEditModal();
      }
    };

    async function save() {
      if (formData.name && formData.email) {
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
          errorMsg.value = 'Kreiranje radnika nije uspjelo. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.';
        }
      } else {
        requestSent.value = true;
        status.value = false;
        errorMsg.value = 'Ime i email moraju biti unešeni.';
      }
    }

    return {
      save,
      errorMsg,
      addShift,
      removeShift,
      toggleDayActive,
      copyShiftsToOtherDays,
      formData,
      status,
      requestSent,
      getDayTranslation,
      allServices,
      isAssigned,
      toggleService,
      inputFileText,
      upload,
      imageUploadSent,
      imageUploadStatus,
      image,
      removeImage,
      imageRemoveHasError,
      breakDates,
      addBreak,
      removeBreak,
      closeStaffEditModal,
      timeOptions,
      toggleAllServices,
    };
  },
});
</script>
