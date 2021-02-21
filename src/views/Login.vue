<template>
  <div>
    <h1 v-if="hasError">
      ERROR aaaaaaaaaa
    </h1>
    <form
      class="o-form"
      @submit.prevent="login()"
    >
      <div class="o-input-wrap">
        <label
          class="o-label"
          for="LOGIN-MODAL-EMAIL"
        >Email*</label>
        <input
          id="LOGIN-MODAL-EMAIL"
          v-model="credentials.email"
          class="o-input"
          name="email"
          type="email"
          required=""
        >
      </div>

      <div class="o-input-wrap">
        <label
          class="o-label"
          for="LOGIN-MODAL-PASSWORD"
        >Password*</label>
        <input
          id="LOGIN-MODAL-PASSWORD"
          v-model="credentials.password"
          class="o-input"
          name="password"
          type="password"
          required=""
        >
      </div>

      <button
        type="submit"
        class="o-button -padding"
      >
        <span class="o-button_label">Sign in</span>
      </button>
    </form>

    <div class="o-layout -gutter">
      <div class="o-layout_item">
        <button
          class="o-form_link"
          @click.prevent="goToForgottenPassword()"
        >
          Forgotten password
        </button>
      </div>
    </div>
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
