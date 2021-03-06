<template>
  <div>
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
          for="id-name"
          class="form-label w-100"
        >
          <strong>Ime Usluge</strong>
          <br>
          Ovdje možete promijeniti ime koje će pisati na stranici
        </label>
        <input
          v-model="formData.name"
          type="text"
          class="form-control"
          placeholder="Ime firme"
          for="id-name"
        >
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <label
          for="id-name"
          class="form-label w-100"
        >
          <strong>Cijena Usluge</strong>
          <br>
          Ovdje možete promijeniti cijenu usluge (kn)
        </label>
        <input
          v-model="formData.price"
          type="text"
          class="form-control"
          placeholder="50"
          for="id-name"
        > kn
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <label
          for="id-name"
          class="form-label w-100"
        >
          <strong>Trajanje Usluge</strong>
          <br>
          Ovdje možete promijeniti trajanje usluge (min)
        </label>
        <input
          v-model="formData.duration"
          type="text"
          class="form-control"
          placeholder="Ime firme"
          for="id-name"
        > min
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
// import Staff from '@/types/staff';
import {
  defineComponent, ref, reactive, capitalize,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const formData = reactive(JSON.parse(JSON.stringify(props.service)));
    const requestSent = ref(false);
    const status = ref(false);

    async function save() {
      try {
        await store.dispatch(ActionTypes.UPDATE_SERVICE, formData);
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
      capitalize,
    };
  },
});
</script>
