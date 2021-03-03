<template>
  <div class="card">
    <div class="card-body">
      <label class="form-check m-0">
        <input
          type="checkbox"
          class="form-check-input"
          checked
        >
        <span class="form-check-label">Korisnici će primati email za podsjetnik prije termina</span>
      </label>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label class="form-check m-0">
        <input
          type="checkbox"
          class="form-check-input"
          checked
        >
        <span class="form-check-label">Radnici će primati email kada se rezervira novi termin</span>
      </label>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label class="form-check m-0">
        <input
          type="checkbox"
          class="form-check-input"
          checked
        >
        <span class="form-check-label">Radnici će primati email kada se otkaže termin</span>
      </label>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <label class="form-label w-100">
            <strong>Vrijeme za podsjetnik - klijent</strong>
            <br>
            Odaberite koliko sati prije termina želite klijentu poslati podsjetnik.
          </label>
          <select
            id="id-reminder-time"
            class="form-control mb-3"
            name="id-reminder-time"
          >
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option
              value="3"
              selected
            >
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
            <option value="6">
              6
            </option>
            <option value="7">
              7
            </option>
            <option
              value="8"
            >
              8
            </option>
            <option value="9">
              9
            </option>
            <option value="10">
              10
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <label class="form-label w-100">
            <strong>Vrijeme za podsjetnik - radnik</strong>
            <br>
            Odaberite koliko sati prije termina želite radniku poslati podsjetnik.
          </label>
          <select
            id="id-reminder-time"
            class="form-control mb-3"
            name="id-reminder-time"
          >
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option
              value="3"
              selected
            >
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
            <option value="6">
              6
            </option>
            <option value="7">
              7
            </option>
            <option
              value="8"
            >
              8
            </option>
            <option value="9">
              9
            </option>
            <option value="10">
              10
            </option>
          </select>
        </div>
      </div>
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
