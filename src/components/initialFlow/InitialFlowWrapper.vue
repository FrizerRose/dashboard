<template>
  <Modal>
    <template #header>
      <h5
        class="modal-title h4"
      >
        {{ currentStep.title }}
      </h5>
    </template>
    <template #body>
      aa
    </template>
    <template #footer>
      <button
        v-if="currentStepIndex !== (steps.length - 1)"
        class="btn-primary"
        @click="currentStepIndex += 1"
      >
        Sljedeći korak
      </button>
      <button
        class="btn-secondary"
        @click="finishTutorial()"
      >
        Završi tutorial
      </button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Modal from '@/components/layout/Modal.vue';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const currentStepIndex = ref(0);
    const steps = reactive([
      { name: 'staff', title: 'Dodajte radnike' },
      { name: 'services', title: 'Dodajte usluge' },
      { name: 'working-hours', title: 'Dodajte radno vrijeme' },
    ]);

    const currentStep = computed(() => steps[currentStepIndex.value]);

    async function finishTutorial() {
      try {
        const updatedCompany = JSON.parse(JSON.stringify(selectedCompany.value));
        updatedCompany.preferences.isTutorialFinished = true;

        await store.dispatch(ActionTypes.UPDATE_COMPANY, updatedCompany);
      } catch {
        // eslint-disable-next-line no-alert
        alert('Došlo je do greške. Molimo pokušajte kasnije.');
      }
    }

    return {
      selectedCompany,
      currentStep,
      finishTutorial,
      currentStepIndex,
      steps,
    };
  },
});
</script>
