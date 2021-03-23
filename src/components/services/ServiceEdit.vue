<template>
  <Modal :layout="'is-big'">
    <template #header>
      <h5 class="modal-title h4">
        Uređivanje usluge
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Zatvori"
        @click="closeServiceEditModal()"
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
          <div class="usluga-naziv">
            <div class="mb-4">
              <label
                for="id-edit-service-name"
                class="responsive-form-label w-100"
              >
                <strong>Naziv usluge</strong>
                <br>
                Ovdje možete promijeniti naziv usluge
              </label>
              <input
                id="id-edit-service-name"
                v-model="formData.name"
                type="text"
                class="form-control responsive-form-control"
                placeholder="Naziv usluge"
              >
            </div>
          </div>
          <div class="usluga-cijena">
            <div class="mb-4">
              <label
                for="id-edit-service-price"
                class="responsive-form-label w-100"
              >
                <strong>Cijena usluge</strong>
                <br>
                Ovdje možete promijeniti cijenu usluge (kn)
              </label>
              <div class="d-flex align-items-baseline">
                <input
                  id="id-edit-service-price"
                  v-model="formData.price"
                  type="text"
                  class="form-control responsive-form-control text-end"
                >
                <span class="ms-2">kn</span>
              </div>
            </div>
          </div>
          <div class="usluga-trajanje">
            <div class="mb-4">
              <label
                for="id-edit-service-duration"
                class="responsive-form-label w-100"
              >
                <strong>Trajanje Usluge</strong>
                <br>
                Ovdje možete promijeniti trajanje usluge (min)
              </label>
              <div class="d-flex align-items-baseline">
                <select
                  id="id-edit-service-duration"
                  v-model="formData.duration"
                  class="form-control responsive-form-control"
                  name="edit-service-duration"
                >
                  <option value="15">
                    15
                  </option>
                  <option value="30">
                    30
                  </option>
                  <option value="45">
                    45
                  </option>
                  <option value="60">
                    60
                  </option>
                  <option value="75">
                    75
                  </option>
                  <option value="90">
                    90
                  </option>
                  <option value="105">
                    105
                  </option>
                  <option value="120">
                    120
                  </option>
                  <option value="135">
                    135
                  </option>
                  <option value="150">
                    150
                  </option>
                  <option value="165">
                    165
                  </option>
                  <option value="180">
                    180
                  </option>
                  <option value="195">
                    195
                  </option>
                  <option value="210">
                    210
                  </option>
                  <option value="225">
                    225
                  </option>
                  <option value="240">
                    240
                  </option>
                </select>
                <span class="ms-2">min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4">
        <div class="container override-desktop-limit">
          <div class="usluga-izvrsitelj">
            <div>
              <label class="responsive-form-label">
                <strong>Izvršitelji</strong>
                <br>
                Označite radnike koji obavljaju ovu uslugu
              </label>
              <div class="striped-row p-1">
                <div class="row">
                  <div class="col-6 col-sm-8">
                    <label class="form-check m-0">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :checked="formData.staff.length === allStaff.length"
                        @change="toggleAllStaff()"
                      >
                      <span class="form-check-label lead">Sve</span>
                    </label>
                  </div>
                </div>
              </div>
              <div
                v-for="staff in allStaff"
                :key="staff.id"
                class="striped-row p-1"
              >
                <div class="row">
                  <div class="col-12">
                    <label class="form-check m-0">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :checked="isAssigned(staff)"
                        @change="toggleStaff(staff)"
                      >
                      <span class="form-check-label lead">{{ staff.name }}</span>
                    </label>
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
import Staff from '@/types/staff';
import {
  defineComponent, ref, reactive, computed,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import Modal from '@/components/layout/Modal.vue';
import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const allStaff = computed(() => store.state.staff.allStaff);
    const formData = reactive(JSON.parse(JSON.stringify(props.service)));
    const requestSent = ref(false);
    const status = ref(false);
    const errorMsg = ref('Promjena usluge nije uspjela. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.');

    async function save() {
      if (formData.name && formData.price && formData.duration) {
        try {
          await store.dispatch(ActionTypes.UPDATE_SERVICE, formData);
          requestSent.value = true;
          status.value = true;
        } catch {
          requestSent.value = true;
          status.value = false;
          errorMsg.value = 'Promjena usluge nije uspjela. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.';
        }
      } else {
        requestSent.value = true;
        status.value = false;
        errorMsg.value = 'Ime, cijena i trajanje moraju biti unešeni.';
      }
    }

    function isAssigned(staff: Staff) {
      return formData.staff.findIndex((assignedStaff: Staff) => assignedStaff.id === staff.id) !== -1;
    }

    function toggleStaff(staff: Staff) {
      if (isAssigned(staff)) {
        const staffIndex = formData.staff.findIndex((assignedStaff: Staff) => assignedStaff.id === staff.id);
        formData.staff.splice(staffIndex, 1);
      } else {
        formData.staff.push(staff);
      }
    }

    function toggleAllStaff() {
      const alreadySelected = formData.staff.length === allStaff.value.length;
      if (alreadySelected) {
        formData.staff = [];
      } else {
        formData.staff = JSON.parse(JSON.stringify(allStaff.value));
      }
    }

    function closeServiceEditModal() {
      store.commit(MutationTypes.CHANGE_OPEN_SERVICE_EDIT_MODAL, false);
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
        closeServiceEditModal();
      }
    };

    return {
      save,
      formData,
      status,
      errorMsg,
      requestSent,
      allStaff,
      isAssigned,
      toggleStaff,
      toggleAllStaff,
      closeServiceEditModal,
    };
  },
});
</script>
