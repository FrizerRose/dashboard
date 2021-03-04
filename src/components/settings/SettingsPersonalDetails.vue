<template>
  <div class="card">
    <div class="card-body">
      <button
        :class="{
          btn: true,
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
  <div class="card">
    <div class="card-body">
      <label
        for="id-change-password-old"
        class="form-label w-100"
      >
        <strong>Stara lozinka</strong>
        <br>
        Upišite trenutnu lozinku
      </label>
      <input
        id="id-change-password-old"
        v-model="formData.oldPassowrd"
        class="form-control"
        type="password"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        for="id-change-password-new-1"
        class="form-label w-100"
      >
        <strong>Nova lozinka</strong>
        <br>
        Upišite novu lozinku
      </label>
      <input
        id="id-change-password-new-1"
        v-model="formData.newPassword"
        class="form-control"
        type="password"
      >
      <label
        for="id-change-password-new-2"
        class="form-label w-100"
      >
        <br>
        Ponovno upišite novu lozinku
      </label>
      <div
        v-if="passwordMismatch"
        class="text-danger"
      >
        Lozinke nisu jednake. Upišite ih ponovo. TODO: marko
      </div>
      <input
        id="id-change-password-new-2"
        v-model="formData.newPasswordRepeated"
        class="form-control"
        type="password"
      >
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
    const token = computed(() => store.state.auth.accessToken);

    const formData = reactive({
      oldPassowrd: '',
      newPassword: '',
      newPasswordRepeated: '',
    });
    const requestSent = ref(false);
    const status = ref(false);
    const passwordMismatch = ref(false);

    async function save() {
      passwordMismatch.value = false;
      requestSent.value = false;
      status.value = false;

      try {
        if (formData.newPassword !== formData.newPasswordRepeated) {
          passwordMismatch.value = true;
          throw new Error('New password missmatch!');
        }

        await store.dispatch(ActionTypes.CHANGE_PASSWORD, {
          oldPassword: formData.oldPassowrd,
          password: formData.newPassword,
          token: token.value || '',
        });
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
      passwordMismatch,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
