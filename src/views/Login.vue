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
              <h1 class="h2">
                Dobrodošli
              </h1>
              <p class="lead">
                Prijavite se za nastavak
              </p>

              <div class="card">
                <div class="card-body">
                  <div class="login-brand mb-4 text-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0H0v24h12zm0-6a6 6 0 100-12 6 6 0 000 12z"
                      />
                    </svg>
                  </div>
                  <form @submit.prevent="login()">
                    <div class="mb-4">
                      <label
                        class="responsive-form-label"
                        for="LOGIN-MODAL-EMAIL"
                      >
                        <span class="responsive-form-label__bolder">E-mail</span>
                      </label>
                      <input
                        id="LOGIN-MODAL-EMAIL"
                        v-model="credentials.email"
                        required=""
                        class="form-control responsive-form-control"
                        type="email"
                        name="validation-email"
                        placeholder="Upišite e-mail adresu"
                      >
                    </div>
                    <div class="mb-4">
                      <label
                        class="responsive-form-label"
                        for="LOGIN-MODAL-PASSWORD"
                      >
                        <span class="responsive-form-label__bolder">Lozinka</span>
                      </label>
                      <input
                        id="LOGIN-MODAL-PASSWORD"
                        v-model="credentials.password"
                        required=""
                        class="form-control responsive-form-control"
                        type="password"
                        name="validation-password"
                        placeholder="Upišite lozinku"
                      >
                      <p
                        v-if="hasError"
                        class="mb-0 text-danger mt-4"
                      >
                        {{ errorMsg }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-between mt-4">
                      <a
                        href=""
                        class="btn responsive-btn"
                        @click.prevent="goToForgottenPassword()"
                      >
                        Zaboravljena lozinka?
                      </a>
                      <button
                        type="submit"
                        class="btn responsive-btn btn-primary"
                      >
                        Prijavi se
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
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);

    const credentials = reactive({ email: '', password: '' });
    const hasError = ref(false);
    const errorMsg = ref('Prijava nije uspjela. Ako ste sigurni da su unešeni podaci ispravni, javite se korisničkoj podršci.');

    async function login() {
      hasError.value = false;

      try {
        if (selectedCompany.value) {
          await store.dispatch(ActionTypes.LOGIN, { ...credentials, company: selectedCompany.value?.id });
          router.push('/');
        } else {
          errorMsg.value = 'Došlo je do greške. Molimo vas da pokušate ponovno.';
          throw new Error();
        }
      } catch {
        hasError.value = true;
      }
    }

    function goToForgottenPassword() {
      router.push('/zaboravljena-lozinka');
    }

    return {
      credentials,
      login,
      goToForgottenPassword,
      hasError,
      errorMsg,
    };
  },
});
</script>
