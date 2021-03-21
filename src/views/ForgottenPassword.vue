<template>
  <div class="main d-flex justify-content-center w-100">
    <main
      class="content d-flex p-0"
      style="width: 100%;"
    >
      <div class="container d-flex flex-column">
        <div class="row h-100">
          <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div class="d-table-cell align-middle">
              <div
                v-if="resetDone"
                class="text-center mt-4"
              >
                <h1 class="h2">
                  Provjerite e-mail
                </h1>
                <p class="lead">
                  Lozinka je resetirana. U poruci koju ćete primiti na e-mail adresu se nalazi vaša nova lozinka.
                </p>
                <div class="text-center mt-3">
                  <button
                    class="btn responsive-btn btn-primary"
                    @click.prevent="goToLogin()"
                  >
                    Nazad na Login
                  </button>
                </div>
              </div>
              <div
                v-if="!resetDone"
                class="card"
              >
                <div class="card-body">
                  <div class="m-sm-4">
                    <form>
                      <div class="mb-3">
                        <label
                          class="responsive-form-label"
                          for="LOGIN-MODAL-EMAIL"
                        >Email koji koristite za prijavu</label>
                        <input
                          id="LOGIN-MODAL-EMAIL"
                          v-model="chosenEmail"
                          required=""
                          class="form-control responsive-form-control"
                          type="email"
                          name="validation-email"
                          placeholder="abc@abc.com"
                        >
                        <label
                          v-if="hasError && errorMsg"
                          class="error jquery-validation-error small form-text invalid-feedback"
                          :style="{display: 'inline-block'}"
                          for="validation-email"
                        >{{ errorMsg }}</label>
                      </div>
                      <div class="text-center mt-3">
                        <button
                          class="btn responsive-btn btn-primary"
                          @click.prevent="resetPassword()"
                        >
                          Resetetiraj lozinku
                        </button>
                      </div>
                      <div class="text-center mt-3">
                        <button
                          class="btn responsive-btn btn-secondary"
                          @click.prevent="goToLogin()"
                        >
                          Nazad na Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const chosenEmail = ref('');
    const resetDone = ref(false);
    const hasError = ref(false);
    const errorMsg = ref('');

    function goToLogin() {
      router.push('/prijava');
    }

    async function resetPassword() {
      if (!chosenEmail.value) {
        hasError.value = true;
        errorMsg.value = 'Potreno je unesti email.';
        return;
      }

      hasError.value = false;

      try {
        await store.dispatch(ActionTypes.RESET_PASSWORD, chosenEmail.value);
        resetDone.value = true;
      } catch {
        hasError.value = true;
        errorMsg.value = `Resetiranje lozinke nije uspjelo.
        Ako ste sigurni da je unešena email adresa ispravna, javite se na korisnički podršku.`;
      }
    }

    return {
      goToLogin,
      resetPassword,
      chosenEmail,
      resetDone,
      hasError,
      errorMsg,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
