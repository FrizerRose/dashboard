<template>
  <div>
    <label
      class="responsive-form-label"
      for="id-client-name"
    >
      <span class="responsive-form-label__bolder">Ime klijenta</span>
    </label>
    <input
      id="id-client-name"
      v-model="formData.name"
      type="text"
      class="form-control responsive-form-control mb-3"
    >
    <label
      class="responsive-form-label"
      for="id-client-email"
    >
      <span class="responsive-form-label__bolder">E-mail</span>
    </label>
    <input
      id="id-client-email"
      v-model="formData.email"
      type="text"
      class="form-control responsive-form-control mb-3"
    >
    <label
      class="responsive-form-label"
      for="id-client-phone"
    >
      <span class="responsive-form-label__bolder">Mobitel</span>
    </label>
    <input
      id="id-client-phone"
      v-model="formData.phone"
      type="text"
      class="form-control responsive-form-control mb-3"
    >
    <span class="responsive-form-label__bolder">Bilješke o klijentu</span>
    <textarea
      id="id-client-note"
      v-model="formData.notes"
      class="form-control responsive-form-control mb-3"
      rows="4"
    />
    <button
      :class="{
        btn: true,
        'mb-3': true,
        'responsive-btn': true,
        'btn-primary': !requestSent,
        'btn-success': requestSent && status,
        'btn-danger': requestSent && !status,
      }"
      @click="save()"
    >
      Spremi
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  props: {
    customerForEdit: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const formData = reactive(JSON.parse(JSON.stringify(props.customerForEdit)));
    const requestSent = ref(false);
    const status = ref(false);

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_CUSTOMER, formData);
        requestSent.value = true;
        status.value = true;
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      formData,
      save,
      requestSent,
      status,
    };
  },
});
</script>
