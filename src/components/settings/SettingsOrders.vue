<template>
  <div>
    <div class="narucivanje-najkasnije">
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
        v-model="formData.preferences.leadTimeWindow"
        class="form-control mb-3"
        name="id-lead-time"
      >
        <option
          value="1"
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

    <div class="narucivanje-u-buducnost">
      <label
        class="form-label w-100"
        for="id-scheduling-window"
      >
        <strong>Naručivanje u budućnost</strong>
        <br>
        Odaberite koliko se dana u budućnost može naručivati</label>
      <select
        id="id-scheduling-window"
        v-model="formData.preferences.schedulingWindow"
        class="form-control mb-3"
        name="id-scheduling-window"
      >
        <option value="7">
          7 dana
        </option>
        <option value="14">
          14 dana
        </option>
        <option value="30">
          30 dana
        </option>
        <option value="60">
          60 dana
        </option>
        <option value="90">
          90 dana
        </option>
      </select>
    </div>

    <div class="narucivanje-ponisti">
      <label
        class="form-label w-100"
        for="id-cancel-time"
      >
        <strong>Poništavanje narudžbe</strong>
        <br>
        Odaberite kada se najkasnije narudžba može poništiti</label>
      <select
        id="id-cancel-time"
        v-model="formData.preferences.cancellationWindow"
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
        <option value="9">
          9 sati prije roka
        </option>
        <option value="10">
          10 sati prije roka
        </option>
      </select>
    </div>

    <div class="narucivanje-korisnici">
      <div class="mb-4">
        <div class="row mb-2">
          <div class="col-12">
            <label class="form-check m-0">
              <input
                v-model="formData.preferences.hasStaffPick"
                type="checkbox"
                class="form-check-input"
              >
              <span class="form-check-label">Korisnici mogu birati radnika</span>
            </label>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12">
            <label class="form-check m-0">
              <input
                v-model="formData.preferences.canCancel"
                type="checkbox"
                class="form-check-input"
              >
              <span class="form-check-label">Korisnici mogu otkazati termin</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="narucivanje-interaktivno">
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
