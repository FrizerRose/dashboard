<template>
  <div class="card">
    <div class="card-body">
      <label
        for="id-lead-time"
        class="form-label w-100"
      >
        <strong>Naručivanje najkasnije</strong>
        <br>
        Odaberite koliko se sati unaprijed može naručiti
      </label>
      <select
        id="id-lead-time"
        class="form-control mb-3"
        name="id-lead-time"
      >
        <option
          value="1"
          selected
        >
          1 sat ranije
        </option>
        <option value="2">
          2 sata ranije
        </option>
        <option value="3">
          3 sata ranije
        </option>
        <option value="4">
          4 sata ranije
        </option>
        <option value="5">
          5 sati ranije
        </option>
        <option value="6">
          6 sati ranije
        </option>
        <option value="7">
          7 sati ranije
        </option>
        <option value="8">
          8 sati ranije
        </option>
      </select>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label w-100"
        for="id-scheduling-window"
      >
        <strong>Naručivanje u budućnost</strong>
        <br>
        Odaberite koliko se dana u budućnost može naručivati</label>
      <select
        id="id-scheduling-window"
        class="form-control mb-3"
        name="id-scheduling-window"
      >
        <option value="30">
          30 dana
        </option>
        <option value="60">
          60 dana
        </option>
        <option value="90">
          90 dana
        </option>
        <option value="120">
          120 dana
        </option>
      </select>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label w-100"
        for="id-cancel-time"
      >
        <strong>Poništavanje narudžbe</strong>
        <br>
        Odaberite koliko kasno se narudžba može poništiti</label>
      <select
        id="id-cancel-time"
        class="form-control mb-3"
        name="id-cancel-time"
      >
        <option value="1">
          1 sat prije roka
        </option>
        <option
          value="2"
          selected
        >
          2 sata prije roka
        </option>
        <option value="3">
          3 sata prije roka
        </option>
        <option value="4">
          4 sata prije roka
        </option>
        <option value="5">
          5 sati prije roka
        </option>
        <option value="6">
          6 sati prije roka
        </option>
        <option value="7">
          7 sati prije roka
        </option>
        <option value="8">
          8 sati prije roka
        </option>
      </select>
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
        <span class="form-check-label">Korisnici mogu birati radnika</span>
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
        <span class="form-check-label">Korisnici mogu otkazati termin</span>
      </label>
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
