<template>
  <Modal>
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
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <label
              class="form-label"
              for="id-add-service-name"
            >
              <strong>Naziv usluge</strong>
            </label>
            <input
              id="id-add-service-name"
              v-model="newService.name"
              type="text"
              class="form-control"
              placeholder="Ovdje upišite naziv usluge"
            >
          </div>
          <div class="col-md-4 mb-4">
            <label
              class="form-label"
              for="id-add-service-price"
            >
              <strong>Cijena</strong>
            </label>
            <input
              id="id-add-service-price"
              v-model="newService.price"
              type="number"
              class="form-control"
            >
          </div>
          <div class="col-md-4 mb-4">
            <label
              class="form-label"
              for="id-add-service-duration"
            >
              <strong>Trajanje (u minutama)</strong>
            </label>
            <input
              id="id-add-service-duration"
              v-model="newService.duration"
              type="number"
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
        @click="createService()"
      >
        Spremi
      </button>
      <button
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeServiceCreateModal()"
      >
        Zatvori
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
