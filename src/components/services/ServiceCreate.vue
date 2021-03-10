<template>
  <Modal>
    <template #header>
      <h5
        class="modal-title h4"
      >
        Dodavanje usluge
      </h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeServiceCreateModal()"
      />
    </template>
    <template #body>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <label
              class="form-label"
              for="id-add-service-name"
            >
              <strong>Ime</strong>
            </label>
            <input
              id="id-add-service-name"
              v-model="newService.name"
              type="text"
              class="form-control"
            >
          </div>
          <div class="col-md-6">
            <label
              class="form-label"
              for="id-add-service-price"
            >
              <strong>E-mail</strong>
            </label>
            <input
              id="id-add-service-price"
              v-model="newService.price"
              type="number"
              class="form-control"
            >
          </div>
          <div class="col-md-6">
            <label for="id-add-service-duration">
              Trajanje
            </label>
            <input
              id="id-add-service-duration"
              v-model="newService.duration"
              type="number"
              name="duration"
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
        @click="createService()"
      >
        Spremi
      </button>
      <button
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeServiceCreateModal()"
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
import Service from '@/types/service';
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

    function closeServiceCreateModal() {
      store.commit(MutationTypes.CHANGE_OPEN_SERVICE_CREATE_MODAL, false);
      document.body.classList.remove('modal-open');
      const modal = document.getElementById('exampleModalFullscreen');
      if (modal) {
        modal.classList.remove('show');
      }
    }
    const newService = reactive({
      name: '',
      price: 0,
      duration: 0,
      company: selectedCompany.value?.id,
    });

    async function createService() {
      try {
        await store.dispatch(ActionTypes.CREATE_SERVICE, newService as Service);
        requestSent.value = true;
        status.value = true;
        newService.name = '';
        newService.price = 0;
        newService.duration = 0;
        closeServiceCreateModal();
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      requestSent,
      status,
      newService,
      createService,
      closeServiceCreateModal,
    };
  },
});
</script>
