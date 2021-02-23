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
                  Welcome back, {{ name }}
                </h1>
                <p class="lead">
                  Sign in to your account to continue
                </p>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="m-sm-4">
                    <div class="text-center">
                      <img
                        src="/appstack/img/avatars/avatar.jpg"
                        alt="Chris Wood"
                        class="img-fluid rounded-circle"
                        width="132"
                        height="132"
                      >
                    </div>
                    <form @submit.prevent="login()">
                      <div class="mb-3">
                        <label
                          class="form-label"
                          for="LOGIN-MODAL-EMAIL"
                        >Email</label>
                        <input
                          id="LOGIN-MODAL-EMAIL"
                          v-model="credentials.email"
                          required=""
                          class="form-control form-control-lg"
                          type="email"
                          name="validation-email"
                          placeholder="Enter your email"
                        >
                        <small class="form-text d-block text-muted">Example block-level help text here.</small>
                        <label
                          v-if="hasError"
                          class="error jquery-validation-error small form-text invalid-feedback"
                          :style="{display: 'inline-block'}"
                          for="validation-email"
                        >This field is required.</label>
                      </div>
                      <div class="mb-3">
                        <label
                          class="form-label"
                          for="LOGIN-MODAL-PASSWORD"
                        >Password</label>
                        <input
                          id="LOGIN-MODAL-PASSWORD"
                          v-model="credentials.password"
                          required=""
                          class="form-control form-control-lg"
                          type="password"
                          name="validation-password"
                          placeholder="Enter your password"
                        >
                        <small>
                          <a
                            href=""
                            @click.prevent="goToForgottenPassword()"
                          >Forgot password?</a>
                        </small>
                        <small class="form-text d-block text-muted">Example block-level help text here.</small>
                        <label
                          v-if="hasError"
                          class="error jquery-validation-error small form-text invalid-feedback"
                          :style="{display: 'inline-block'}"
                          for="validation-password"
                        >This field is required.</label>
                      </div>
                      <div>
                        <div class="form-check align-items-center">
                          <input
                            id="customControlInline"
                            type="checkbox"
                            class="form-check-input"
                            value="remember-me"
                            name="remember-me"
                            checked
                          >
                          <label
                            class="form-check-label text-small"
                            for="customControlInline"
                          >Remember me next time</label>
                        </div>
                      </div>
                      <div class="text-center mt-3">
                        <button
                          type="submit"
                          class="btn btn-lg btn-primary"
                        >
                          Sign in
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
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const credentials = reactive({ email: '', password: '' });
    const hasError = ref(false);

    async function login() {
      hasError.value = false;

      try {
        await store.dispatch(ActionTypes.LOGIN, credentials);
        router.push('/');
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
    };
  },
});
</script>
