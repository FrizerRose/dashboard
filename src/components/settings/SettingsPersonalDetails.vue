<template>
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
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  setup() {
    const store = useStore();
  },
});
</script>

<style scoped lang='scss'>

</style>
