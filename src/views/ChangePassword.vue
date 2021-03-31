<template>
  <Dashboard>
    <template #header>
      Promjena loznke
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-sm-0 col-lg-1 col-xl-2" />
            <div class="col-sm-12 col-lg-10 col-xl-8">
              <div class="row">
                <div class="col-12 col-sm-6 mb-4">
                  <div class="authentication-password">
                    <label
                      for="id-change-password-old"
                      class="responsive-form-label w-100"
                    >
                      <span class="responsive-form-label__bolder">Stara lozinka</span>
                      <br>
                      Upišite trenutnu lozinku
                    </label>
                    <input
                      id="id-change-password-old"
                      v-model="formData.oldPassowrd"
                      class="form-control responsive-form-control"
                      type="password"
                    >
                  </div>
                </div>

                <div class="col-12 col-sm-6 mb-4">
                  <div class="authentication-password-new">
                    <label
                      for="id-change-password-new-1"
                      class="responsive-form-label w-100"
                    >
                      <span class="responsive-form-label__bolder">Nova lozinka</span>
                      <br>
                      Upišite novu lozinku
                    </label>
                    <input
                      id="id-change-password-new-1"
                      v-model="formData.newPassword"
                      class="form-control responsive-form-control"
                      type="password"
                    >
                    <label
                      for="id-change-password-new-2"
                      class="responsive-form-label w-100"
                    >
                      <br>
                      Ponovno upišite novu lozinku
                    </label>
                    <input
                      id="id-change-password-new-2"
                      v-model="formData.newPasswordRepeated"
                      class="form-control responsive-form-control"
                      type="password"
                    >
                  </div>

                  <div class="authentication-password-errors">
                    <p
                      v-if="passwordMismatch"
                      class="mb-0 text-danger mt-4"
                    >
                      Lozinke nisu jednake. Upišite ih ponovno.
                    </p>

                    <p
                      v-if="hasError"
                      class="mb-0 text-danger mt-4"
                    >
                      {{ errorMsg }}
                    </p>
                  </div>

                  <div class="authentication-interaktivno text-end">
                    <button
                      :class="{
                        'mt-4': true,
                        btn: true,
                        'responsive-btn': true,
                        'btn-primary': !requestSent,
                        'btn-success': requestSent && !hasError,
                        'btn-danger': requestSent && hasError,
                      }"
                      @click="save()"
                    >
                      Spremi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang='ts'>
import {
  defineComponent, computed, ref, reactive,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import Dashboard from '@/components/layout/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
  },
  setup() {
    const store = useStore();
    const token = computed(() => store.getters.getAccessToken);

    const formData = reactive({
      oldPassowrd: '',
      newPassword: '',
      newPasswordRepeated: '',
    });
    const requestSent = ref(false);
    const hasError = ref(false);
    const passwordMismatch = ref(false);
    const errorMsg = 'Promjena lozinke nije uspjela. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.';

    async function save() {
      passwordMismatch.value = false;
      requestSent.value = false;
      hasError.value = false;

      try {
        if (formData.newPassword !== formData.newPasswordRepeated) {
          passwordMismatch.value = true;
          return;
        }

        await store.dispatch(ActionTypes.CHANGE_PASSWORD, {
          oldPassword: formData.oldPassowrd,
          password: formData.newPassword,
          token: token.value || '',
        });

        requestSent.value = true;
      } catch {
        requestSent.value = true;
        hasError.value = true;
      }
    }

    return {
      save,
      formData,
      hasError,
      requestSent,
      passwordMismatch,
      errorMsg,
    };
  },
});
</script>
