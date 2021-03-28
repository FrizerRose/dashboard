<template>
  <div>
    <div
      v-if="hidden"
      class="notifikacije-interaktivno mb-4 text-end"
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
    </div>

    <div
      v-if="requestSent && !status"
      class="p-4 mt-4 alert alert-danger"
    >
      <div class="container override-desktop-limit">
        Spremanje nije uspjelo. Pokušajte ponovno. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.
      </div>
    </div>

    <div class="notifikacije-yes-no">
      <div class="mt-4 border-top border-bottom">
        <div class="my-4">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-12">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.clientReminderEmail"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Klijentu šaljemo e-mail podsjetnik na zakazani termin</span>
              </label>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-12">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.staffReminderEmail"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Radniku šaljemo e-mail kad se novi termin rezervirao uz njegovo ime</span>
              </label>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="row flex-row-reverse">
            <div class="col-12 col-sm-12">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.staffCancellationNotice"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Radniku šaljemo e-mail kad se ranije zakazani termin vezan uz njegovo ime poništi</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="notifikacije-select">
      <div class="border-bottom">
        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse align-items-end">
            <div class="col-12 col-sm-6 d-flex flex-column justify-content-between">
              <label class="responsive-form-label w-100">
                <span class="responsive-form-label__bolder">Klijent</span>
              </label>
              <div class="d-flex align-items-baseline">
                <select
                  id="id-client-reminder-time"
                  v-model="formData.preferences.clientReminderTime"
                  class="form-control responsive-form-control mb-3"
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
                <span
                  v-if="formData.preferences.clientReminderTime < 2"
                  class="ms-2"
                >sat</span>
                <span
                  v-if="formData.preferences.clientReminderTime >= 2 && formData.preferences.clientReminderTime <= 4"
                  class="ms-2"
                >sata</span>
                <span
                  v-if="formData.preferences.clientReminderTime > 4"
                  class="ms-2"
                >sati</span>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Odaberite koliko sati prije termina želite klijentu poslati podsjetnik.
                <br>
                1-10 sati
              </label>
            </div>
          </div>
        </div>

        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse align-items-end">
            <div class="col-12 col-sm-6 d-flex flex-column justify-content-between">
              <label class="responsive-form-label w-100">
                <span class="responsive-form-label__bolder">Radnik</span>
              </label>
              <div class="d-flex align-items-baseline">
                <select
                  id="id-staff-reminder-time"
                  v-model="formData.preferences.staffReminderTime"
                  class="form-control responsive-form-control mb-3"
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
                <span
                  v-if="formData.preferences.staffReminderTime < 2"
                  class="ms-2"
                >sat</span>
                <span
                  v-if="formData.preferences.staffReminderTime >= 2 && formData.preferences.staffReminderTime <= 4"
                  class="ms-2"
                >sata</span>
                <span
                  v-if="formData.preferences.staffReminderTime > 4"
                  class="ms-2"
                >sati</span>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Odaberite koliko sati prije termina želite radniku poslati podsjetnik.
                <br>
                1-10 sati
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="notifikacije-interaktivno mt-4 text-end">
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
