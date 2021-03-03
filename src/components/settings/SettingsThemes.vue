<template>
  <div class="card">
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
  </div>
  <div class="card">
    <div class="card-body">
      <fieldset class="mb-3">
        <label class="form-label w-100">
          <strong>Odabir boje elemenata</strong>
          <br>
          Odaberite akcentnu boju za neke od elemenata na stanici
        </label>
        <label class="form-check">
          <input
            name="radio-main-color"
            type="radio"
            class="form-check-input"
            checked
          >
          <span class="form-check-label">Crno-bijelo (zadano)</span>
        </label>
        <label class="form-check">
          <input
            name="radio-main-color"
            type="radio"
            class="form-check-input"
          >
          <span class="form-check-label">Orchid</span>
        </label>
        <label class="form-check">
          <input
            name="radio-main-color"
            type="radio"
            class="form-check-input"
          >
          <span class="form-check-label">Coral</span>
        </label>
        <label class="form-check">
          <input
            name="radio-main-color"
            type="radio"
            class="form-check-input"
          >
          <span class="form-check-label">Goldenrod</span>
        </label>
      </fieldset>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  setup() {
    const store = useStore();
  },
});
</script>

<style scoped lang='scss'>

</style>
