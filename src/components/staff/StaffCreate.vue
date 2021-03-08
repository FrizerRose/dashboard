<template>
  <Modal>
    <template #header>
      <h5
        class="modal-title h4"
      >
        Dodavanje radnika
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeStaffCreateModal()"
      />
    </template>
    <template #body>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
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
          <div class="col-md-6">
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
      <button
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeStaffCreateModal()"
      >
        Close
      </button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import {
  defineComponent, reactive, ref, computed,
} from 'vue';
import Modal from '@/components/layout/Modal.vue';
import { WorkingHours } from '@/types/workingHours';
import Staff from '@/types/staff';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
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
    });

    function closeStaffCreateModal() {
      store.commit(MutationTypes.CHANGE_OPEN_STAFF_CREATE_MODAL, false);
      document.body.classList.remove('modal-open');
      const modal = document.getElementById('exampleModalFullscreen');
      if (modal) {
        modal.classList.remove('show');
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
    };
  },
});
</script>
