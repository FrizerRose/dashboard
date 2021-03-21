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
              <div class="text-center mt-4">
                <h1 class="h2">
                  Dobrodošli
                </h1>
                <p class="lead">
                  Prijavite se za nastavak
                </p>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="m-sm-4">
                    <div class="login-brand mb-4 text-center">
                      <svg
                        width="256"
                        height="256"
                        viewBox="0 0 256 256"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M167.111 128c0 23.564-19.102 42.667-42.667 42.667-23.564 0-42.666-19.103-42.666-42.667s19.102-42.667
            42.666-42.667c23.565 0 42.667 19.103 42.667 42.667z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M256 128c0 70.692-57.308 128-128 128H0V0h128c70.692 0 128 57.307 128 128zm-128 85.333c47.128 0
            85.333-38.205 85.333-85.333S175.128 42.667 128 42.667H42.667v170.666H128z"
                        />
                      </svg>
                    </div>
                    <form @submit.prevent="login()">
                      <div class="mb-3">
                        <label
                          class="responsive-form-label"
                          for="LOGIN-MODAL-EMAIL"
                        >Email</label>
                        <input
                          id="LOGIN-MODAL-EMAIL"
                          v-model="credentials.email"
                          required=""
                          class="form-control responsive-form-control"
                          type="email"
                          name="validation-email"
                          placeholder="Unesite email"
                        >
                      </div>
                      <div class="mb-3">
                        <label
                          class="responsive-form-label"
                          for="LOGIN-MODAL-PASSWORD"
                        >Lozinka</label>
                        <input
                          id="LOGIN-MODAL-PASSWORD"
                          v-model="credentials.password"
                          required=""
                          class="form-control responsive-form-control"
                          type="password"
                          name="validation-password"
                          placeholder="Unesite lozinku"
                        >
                        <small>
                          <a
                            href=""
                            @click.prevent="goToForgottenPassword()"
                          >Zaboravljena lozinka?</a>
                        </small>
                        <label
                          v-if="hasError"
                          class="error jquery-validation-error small form-text invalid-feedback"
                          :style="{display: 'inline-block'}"
                          for="validation-password"
                        >{{ errorMsg }}</label>
                      </div>
                      <div class="mt-3">
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
