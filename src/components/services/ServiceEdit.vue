<template>
  <Modal>
    <template #header>
      <h5
        class="modal-title h4"
      >
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
      <div class="usluga-naziv">
        <div class="mb-4">
          <label
            for="id-edit-service-name"
            class="form-label w-100"
          >
            <strong>Naziv usluge</strong>
            <br>
            Ovdje možete promijeniti naziv usluge koje će pisati na stranici
          </label>
          <input
            id="id-edit-service-name"
            v-model="formData.name"
            type="text"
            class="form-control"
            placeholder="Naziv usluge"
          >
        </div>
      </div>
      <div class="usluga-cijena">
        <div class="mb-4">
          <label
            for="id-edit-service-price"
            class="form-label w-100"
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
              class="form-control text-end"
            >
            <span class="ms-2">kn</span>
          </div>
        </div>
      </div>
      <div class="usluga-trajanje">
        <div class="mb-4">
          <label
            for="id-edit-service-duration"
            class="form-label w-100"
          >
            <strong>Trajanje Usluge</strong>
            <br>
            Ovdje možete promijeniti trajanje usluge (min)
          </label>
          <div class="d-flex align-items-baseline">
            <input
              id="id-edit-service-duration"
              v-model="formData.duration"
              type="text"
              class="form-control text-end"
            >
            <span class="ms-2">min</span>
          </div>
        </div>
      </div>
      <div class="usluga-izvrsitelj">
        <div class="mb-4">
          <div
            v-for="staff in allStaff"
            :key="staff.id"
            class="row"
          >
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
    </template>
    <template
      #footer
    >
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
    </template>
  </Modal>
</template>

<script lang='ts'>
import Staff from '@/types/staff';
import {
  defineComponent, ref, reactive, computed, capitalize,
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

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_SERVICE, formData);
        requestSent.value = true;
        status.value = true;
      } catch {
        requestSent.value = true;
        status.value = false;
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

    function closeServiceEditModal() {
      store.commit(MutationTypes.CHANGE_OPEN_SERVICE_EDIT_MODAL, false);
      document.body.classList.remove('modal-open');
      const modal = document.getElementById('exampleModalFullscreen');
      if (modal) {
        modal.classList.remove('show');
      }
    }

    return {
      save,
      formData,
      status,
      requestSent,
      capitalize,
      allStaff,
      isAssigned,
      toggleStaff,
      closeServiceEditModal,
    };
  },
});
</script>
