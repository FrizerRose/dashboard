<template>
  <div>
    <label
      class="responsive-form-label"
      for="id-client-name"
    >
      <strong>Ime</strong>
    </label>
    <input
      id="id-client-name"
      v-model="formData.name"
      type="text"
      class="form-control responsive-form-control"
    >
    <label
      class="responsive-form-label"
      for="id-client-email"
    >
      <strong>Email</strong>
    </label>
    <input
      id="id-client-email"
      v-model="formData.email"
      type="text"
      class="form-control responsive-form-control"
    >
    <label
      class="responsive-form-label"
      for="id-client-phone"
    >
      <strong>Mob</strong>
    </label>
    <input
      id="id-client-phone"
      v-model="formData.phone"
      type="text"
      class="form-control responsive-form-control"
    >
    <strong>Bilješke o klijentu</strong>
    <textarea
      id="id-client-note"
      v-model="formData.notes"
      class="form-control responsive-form-control"
      rows="4"
    />
    <br>
    <button
      class="btn responsive-btn btn-primary mb-3"
      @click="save()"
    >
      Spremi
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
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

    async function save() {
      await store.dispatch(ActionTypes.UPDATE_CUSTOMER, formData);
    }

    return {
      formData,
      save,
    };
  },
});
</script>
