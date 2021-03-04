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
      <input
        id="id-change-password-new-2"
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
