<template>
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
  <!-- <div class="card">
    <div class="card-body">
      <fieldset class="mb-3">
        <label class="form-label w-100">
          <strong>Odabir pozadinskog osvjetljenja</strong>
          <br>
          Odaberite pozadinsko osjetljenje
        </label>
        <label class="form-check">
          <input
            name="radio-color-mode"
            type="radio"
            class="form-check-input"
            checked
          >
          <span class="form-check-label">Light mode (zadano)</span>
        </label>
        <label class="form-check">
          <input
            name="radio-color-mode"
            type="radio"
            class="form-check-input"
          >
          <span class="form-check-label">Dark mode</span>
        </label>
        <label class="form-check">
          <input
            name="radio-color-mode"
            type="radio"
            class="form-check-input"
            disabled
          >
          <span class="form-check-label">High contrast</span>
        </label>
      </fieldset>
    </div>
  </div> -->
  <div class="card">
    <div class="card-body">
      <label
        for="id-lead-time"
        class="form-label w-100"
      >
        <strong>Odabir boje elemenata</strong>
        <br>
        Odaberite akcentnu boju za neke od elemenata na stanici
      </label>
      <select
        id="id-lead-time"
        v-model="formData.preferences.colorVariant"
        class="form-control mb-3"
        name="id-lead-time"
      >
        <option value="default">
          Crno-bijelo
        </option>
        <option value="orchid">
          Orchid
        </option>
        <option value="coral">
          Coral
        </option>
        <option value="goldenrod">
          Goldenrod
        </option>
      </select>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, computed, ref, reactive,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const formData = reactive(JSON.parse(JSON.stringify(selectedCompany.value)));
    const requestSent = ref(false);
    const status = ref(false);

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_COMPANY, formData);
        requestSent.value = true;
        status.value = true;
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      save,
      formData,
      status,
      requestSent,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
