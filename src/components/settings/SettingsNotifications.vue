<template>
  <div>
    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="mb-4">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.clientReminderEmail"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Korisnici će primati email za podsjetnik prije termina</span>
              </label>
            </div>
            <div class="mb-4">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.staffReminderEmail"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Radnici će primati email kada se rezervira novi termin</span>
              </label>
            </div>
            <div class="mb-4">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.staffCancellationNotice"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Radnici će primati email kada se otkaže termin</span>
              </label>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="mb-4">
              <label class="responsive-form-label w-100">
                <strong>Vrijeme za podsjetnik - klijent</strong>
                <br>
                Odaberite koliko sati prije termina želite klijentu poslati podsjetnik.
              </label>
              <div class="d-flex align-items-baseline">
                <select
                  id="id-reminder-time"
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

            <div class="mb-4">
              <label class="responsive-form-label w-100">
                <strong>Vrijeme za podsjetnik - radnik</strong>
                <br>
                Odaberite koliko sati prije termina želite radniku poslati podsjetnik.
              </label>
              <div class="d-flex align-items-baseline">
                <select
                  id="id-reminder-time"
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
          </div>
        </div>
      </div>
    </div>

    <p
      v-if="requestSent && !status"
      class="text-danger"
    >
      Spremanje nije uspjelo. Pokušajte ponovno. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.
    </p>

    <div class="notifikacije-interaktivno">
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
