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
                v-if="resetDoneX"
                class="card"
              >
                <div class="card-body">
                  <h1>
                    Provjerite e-mail
                  </h1>
                  <p class="lead">
                    Lozinka je resetirana. U poruci koju ćete primiti na e-mail adresu se nalazi vaša nova lozinka.
                  </p>
                  <div class="mt-4 text-end">
                    <button
                      class="btn responsive-btn btn-primary"
                      @click="goToLogin()"
                    >
                      Nazad na prijavu
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="!resetDoneX"
                class="card"
              >
                <div class="card-body">
                  <form>
                    <div class="mb-4">
                      <label
                        class="responsive-form-label w-100"
                        for="LOGIN-MODAL-EMAIL"
                      >
                        <span class="responsive-form-label__bolder">E-mail koji koristite za prijavu</span>
                      </label>
                      <input
                        id="LOGIN-MODAL-EMAIL"
                        v-model="chosenEmail"
                        required=""
                        class="form-control responsive-form-control"
                        type="email"
                        name="validation-email"
                        placeholder="Vaša e-mail adresa"
                      >
                      <p
                        v-if="hasError && errorMsg"
                        class="mb-0 text-danger mt-4"
                      >
                        {{ errorMsg }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-between mt-4">
                      <button
                        class="btn responsive-btn"
                        @click.prevent="goToLogin()"
                      >
                        Nazad na prijavu
                      </button>
                      <button
                        class="btn responsive-btn btn-primary"
                        @click.prevent="resetPassword()"
                      >
                        Resetiraj lozinku
                      </button>
                    </div>
                  </form>
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
        errorMsg.value = 'Potreno je upisati e-mail adresu';
        return;
      }

      hasError.value = false;

      try {
        await store.dispatch(ActionTypes.RESET_PASSWORD, chosenEmail.value);
        resetDone.value = true;
      } catch {
        hasError.value = true;
        errorMsg.value = `Resetiranje lozinke nije uspjelo.
        Ako ste sigurni da je upisana e-mail adresa ispravna, javite se na korisnički podršku.`;
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
