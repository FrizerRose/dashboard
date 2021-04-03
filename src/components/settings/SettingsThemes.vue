<template>
  <div>
    <!-- <div
      class="izgled-interaktivno mb-4 text-end"
    >
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
    </div> -->

    <div
      v-if="requestSent && !status"
      class="p-4 mt-4 alert alert-danger"
    >
      <div class="container override-desktop-limit">
        Spremanje nije uspjelo. Pokušajte ponovno. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.
      </div>
    </div>

    <div class="izgled-dark-mode">
      <div class="mt-4 border-top">
        <div class="my-4">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-6">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.hasDarkMode"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Koristi dark mode</span>
              </label>
            </div>

            <div class="col-12 col-sm-6">
              <label
                class="responsive-form-label w-100 mb-0 mt-2"
                for="id-rules"
              >
                Označite "Dark mode" ako želite da pozadina stranice bude crna. Ostavite neoznačeno za svjetlu pozadinu.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="izgled-pattern">
      <div class="mt-4 border-top border-bottom">
        <div class="my-4">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-6">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.hasPattern"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Koristi zigzag uzorak</span>
              </label>
            </div>

            <div class="col-12 col-sm-6">
              <label
                class="responsive-form-label w-100 mb-0 mt-2"
                for="id-rules"
              >
                Označite "zigzag" uzorak ako ga želite u pozadini stranice. Ostavite neoznačeno za praznu pozadinu.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="izgled-pattern">
      <div class="mt-4 border-top border-bottom">
        <div class="my-4">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-6">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.hasBorders"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Prikaži obrub oko elemenata</span>
              </label>
            </div>

            <div class="col-12 col-sm-6">
              <label
                class="responsive-form-label w-100 mb-0 mt-2"
                for="id-rules"
              >
                Odabirom obruba prikazat će se tanka crta oko glavnih elemenata.
                Njena svrha je da uokviriti elemente kako bi se istaknuli od pozadine.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="izgled-boja">
      <div class="border-bottom">
        <div class="mt-4 mb-5">
          <div class="row flex-row-reverse align-items-end">
            <div class="col-12 col-md-8 col-xl-6">
              <label
                for="id-theme-color"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Odabir boje elemenata</span>
              </label>
              <select
                id="id-theme-color"
                v-model="formData.preferences.colorVariant"
                class="form-control responsive-form-control"
                name="id-theme-color"
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
            <div class="col-12 col-md-4 col-xl-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Odaberite akcentnu boju za neke od elemenata na stranici
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="izgled-interaktivno mt-4 text-end">
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
