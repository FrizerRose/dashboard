<template>
  <div>
    <div class="izgled-boja">
      <label
        id="id-theme-color"
        class="form-label w-100"
      >
        <strong>Odabir boje elemenata</strong>
        <br>
        Odaberite akcentnu boju za neke od elemenata na stranici
      </label>
      <select
        id="id-theme-color"
        v-model="formData.preferences.colorVariant"
        class="form-control form-control-lg mb-3"
        name="id-theme-color"
      >
        <option value="default">
          Crno-bijelo
        </option>
        <option value="orchid">
          Orchid
        </option>
        <option value="coral">
          Coral
        </option>
        <option value="goldenrod">
          Goldenrod
        </option>
      </select>
    </div>

    <div class="izgled-interaktivno">
      <button
        :class="{
          btn: true,
          'btn-lg': true,
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
