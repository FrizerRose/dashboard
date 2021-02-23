<template>
  <div class="main d-flex justify-content-center w-100">
    <main class="content d-flex p-0">
      <div class="container d-flex flex-column">
        <div class="row h-100">
          <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div class="d-table-cell align-middle">
              <div
                v-if="!resetDone"
                class="text-center mt-4"
              >
                <h1 class="h2">
                  Provjerite e-mail
                </h1>
                <p class="lead">
                  Lozinka je resetirana. U poruci koju ćete primiti na e-mail adresu se nalazi vaša nova lozinka.
                </p>
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
                          class="form-label"
                          for="LOGIN-MODAL-EMAIL"
                        >Email</label>
                        <input
                          id="LOGIN-MODAL-EMAIL"
                          required=""
                          class="form-control form-control-lg"
                          type="email"
                          name="validation-email"
                          placeholder="Enter your email"
                        >
                        <small class="form-text d-block text-muted">Ako email
                          nije dobar format, izbaci error. Ako je format dobar,
                          zatvori formu i napiši da je na email adresu poslana
                          poruka s lozinkom.</small>
                        <label
                          v-if="hasError"
                          class="error jquery-validation-error small form-text invalid-feedback"
                          :style="{display: 'inline-block'}"
                          for="validation-email"
                        >This field is required.</label>
                      </div>
                      <div class="text-center mt-3">
                        <button
                          class="btn btn-lg btn-primary"
                          @click="goToLogin()"
                        >
                          Reset password
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

export default defineComponent({
  setup() {
    const router = useRouter();

    const hasError = ref(false);

    function goToLogin() {
      router.push('/login');
    }

    return {
      goToLogin,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
