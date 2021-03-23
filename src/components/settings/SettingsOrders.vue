<template>
  <div>
    <div class="narucivanje-interaktivno mb-4 text-end">
      <button
        :class="{
          btn: true,
          'responsive-btn': true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="save()"
      >
        Spremi
      </button>
    </div>

    <div
      v-if="requestSent && !status"
      class="p-4 mt-4 alert alert-danger"
    >
      <div class="container override-desktop-limit">
        Spremanje nije uspjelo. Pokušajte ponovno. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.
      </div>
    </div>

    <div class="narucivanje-najkasnije">
      <div class="mt-4 border-top border-bottom">
        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse align-items-end">
            <div class="col-12 col-sm-6 d-flex flex-column justify-content-between">
              <label
                for="id-lead-time"
                class="responsive-form-label w-100"
              >
                <strong>Naručivanje najkasnije</strong>
              </label>
              <select
                id="id-lead-time"
                v-model="formData.preferences.leadTimeWindow"
                class="form-control responsive-form-control"
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
            <div class="col-12 col-sm-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Odaberite koliko se sati unaprijed može naručiti
                <br>
                1-8 sati
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="narucivanje-u-buducnost">
      <div class="border-bottom">
        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse align-items-end">
            <div class="col-12 col-sm-6 d-flex flex-column justify-content-between">
              <label
                class="responsive-form-label w-100"
                for="id-scheduling-window"
              >
                <strong>Naručivanje u budućnost</strong>
              </label>
              <select
                id="id-scheduling-window"
                v-model="formData.preferences.schedulingWindow"
                class="form-control responsive-form-control"
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
            <div class="col-12 col-sm-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Odaberite koliko se dana u budućnost može naručivati
                <br>
                7-90 dana
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="narucivanje-ponisti">
      <div class="border-bottom">
        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse align-items-end">
            <div class="col-12 col-sm-6 d-flex flex-column justify-content-between">
              <label
                class="responsive-form-label w-100"
                for="id-cancel-time"
              >
                <strong>Otkazivanje narudžbe</strong>
              </label>
              <select
                id="id-cancel-time"
                v-model="formData.preferences.cancellationWindow"
                class="form-control responsive-form-control"
                name="id-cancel-time"
              >
                <option value="1">
                  1 sat prije zakazanog termina
                </option>
                <option
                  value="2"
                  selected
                >
                  2 sata prije zakazanog termina
                </option>
                <option value="3">
                  3 sata prije zakazanog termina
                </option>
                <option value="4">
                  4 sata prije zakazanog termina
                </option>
                <option value="5">
                  5 sati prije zakazanog termina
                </option>
                <option value="6">
                  6 sati prije zakazanog termina
                </option>
                <option value="7">
                  7 sati prije zakazanog termina
                </option>
                <option value="8">
                  8 sati prije zakazanog termina
                </option>
                <option value="9">
                  9 sati prije zakazanog termina
                </option>
                <option value="10">
                  10 sati prije zakazanog termina
                </option>
              </select>
            </div>
            <div class="col-12 col-sm-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Odaberite kada se najkasnije narudžba može otkazati
                <br>
                1-10 sati
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="narucivanje-korisnici">
      <div class="border-bottom">
        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-6">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.hasStaffPick"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Klijenti mogu birati radnika</span>
              </label>
            </div>
            <div class="col-12 col-sm-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Označite ako želite da u procesu naručivanja klijenti mogu odabrati radnika kojeg preferiraju
              </label>
            </div>
          </div>
        </div>
        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-6">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.canCancel"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Klijenti mogu otkazati termin</span>
              </label>
            </div>
            <div class="col-12 col-sm-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Označite ako želite da klijenti nakon što su se naručili imaju mogućnost otkazati zakazani termin
                i time ga osloboditi za nekog drugog
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="narucivanje-interaktivno mt-4 text-end">
      <button
        :class="{
          btn: true,
          'responsive-btn': true,
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
