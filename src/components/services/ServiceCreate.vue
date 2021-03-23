<template>
  <Modal :layout="'is-big'">
    <template #header>
      <h5 class="modal-title h4">
        Dodavanje usluge
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Zatvori"
        @click="closeServiceCreateModal()"
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
          <div class="row">
            <div class="col-md-6 mb-4">
              <label
                class="responsive-form-label w-100"
                for="id-add-service-name"
              >
                <strong>Naziv usluge</strong>
              </label>
              <input
                id="id-add-service-name"
                v-model="newService.name"
                type="text"
                class="form-control responsive-form-control"
                placeholder="Ovdje upišite naziv usluge"
              >
            </div>
            <div class="col-md-4 mb-4">
              <label
                class="responsive-form-label w-100"
                for="id-add-service-price"
              >
                <strong>Cijena</strong>
              </label>
              <input
                id="id-add-service-price"
                v-model="newService.price"
                type="number"
                class="form-control responsive-form-control"
              >
            </div>
            <div class="col-md-4 mb-4">
              <label
                class="responsive-form-label w-100"
                for="id-add-service-duration"
              >
                <strong>Trajanje (u minutama)</strong>
              </label>
              <select
                id="id-add-service-duration"
                v-model="newService.duration"
                class="form-control responsive-form-control"
                name="add-service-duration"
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
                        :checked="newService.staff.length === allStaff.length"
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
        @click="createService()"
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
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Staff from '@/types/staff';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const allStaff = computed(() => store.state.staff.allStaff);
    const requestSent = ref(false);
    const status = ref(false);
    const errorMsg = ref('Kreiranje usluge nije uspjelo. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.');

    function closeServiceCreateModal() {
      store.commit(MutationTypes.CHANGE_OPEN_SERVICE_CREATE_MODAL, false);
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
        closeServiceCreateModal();
      }
    };

    const newService = reactive({
      name: '',
      price: 0,
      duration: 30,
      company: selectedCompany.value?.id,
      staff: [] as Staff[],
    });

    function isAssigned(staff: Staff) {
      return newService.staff.findIndex((assignedStaff: Staff) => assignedStaff.id === staff.id) !== -1;
    }

    function toggleStaff(staff: Staff) {
      if (isAssigned(staff)) {
        const staffIndex = newService.staff.findIndex((assignedStaff: Staff) => assignedStaff.id === staff.id);
        newService.staff.splice(staffIndex, 1);
      } else {
        newService.staff.push(staff);
      }
    }

    function toggleAllStaff() {
      const alreadySelected = newService.staff.length === allStaff.value.length;
      if (alreadySelected) {
        newService.staff = [];
      } else {
        newService.staff = JSON.parse(JSON.stringify(allStaff.value));
      }
    }

    async function createService() {
      if (newService.name && newService.price && newService.duration) {
        try {
          await store.dispatch(ActionTypes.CREATE_SERVICE, newService);
          requestSent.value = true;
          status.value = true;
          newService.name = '';
          newService.price = 0;
          newService.duration = 0;
          closeServiceCreateModal();
        } catch {
          requestSent.value = true;
          status.value = false;
          errorMsg.value = 'Kreiranje usluge nije uspjelo. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.';
        }
      } else {
        requestSent.value = true;
        status.value = false;
        errorMsg.value = 'Ime, cijena i trajanje moraju biti unešeni.';
      }
    }

    return {
      requestSent,
      status,
      errorMsg,
      newService,
      createService,
      closeServiceCreateModal,
      toggleAllStaff,
      allStaff,
      isAssigned,
      toggleStaff,
    };
  },
});
</script>
