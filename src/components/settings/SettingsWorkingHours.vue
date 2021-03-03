<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <label
            class="form-label w-100"
            for="id-working-hour-from"
          >
            <strong>Od</strong>
          </label>
          <select
            id="id-working-hour-from"
            class="form-control mb-3"
            name="id-working-hour-from"
          >
            <option value="0">
              0
            </option>
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
            <option value="6">
              6
            </option>
            <option value="7">
              7
            </option>
            <option
              value="8"
              selected
            >
              8
            </option>
            <option value="9">
              9
            </option>
            <option value="10">
              10
            </option>
            <option value="11">
              11
            </option>
            <option value="12">
              12
            </option>
            <option value="13">
              13
            </option>
            <option value="14">
              14
            </option>
            <option value="15">
              15
            </option>
            <option value="16">
              16
            </option>
            <option value="17">
              17
            </option>
            <option value="18">
              18
            </option>
            <option value="19">
              19
            </option>
            <option value="20">
              20
            </option>
            <option value="21">
              21
            </option>
            <option value="22">
              22
            </option>
            <option value="23">
              23
            </option>
          </select>
        </div>
        <div class="col-6">
          <label
            class="form-label w-100"
            for="id-working-hour-to"
          >
            <strong>Do</strong>
          </label>
          <select
            id="id-working-hour-to"
            class="form-control mb-3"
            name="id-working-hour-to"
          >
            <option value="0">
              0
            </option>
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
            <option value="6">
              6
            </option>
            <option value="7">
              7
            </option>
            <option value="8">
              8
            </option>
            <option value="9">
              9
            </option>
            <option value="10">
              10
            </option>
            <option value="11">
              11
            </option>
            <option value="12">
              12
            </option>
            <option value="13">
              13
            </option>
            <option value="14">
              14
            </option>
            <option value="15">
              15
            </option>
            <option
              value="16"
              selected
            >
              16
            </option>
            <option value="17">
              17
            </option>
            <option value="18">
              18
            </option>
            <option value="19">
              19
            </option>
            <option value="20">
              20
            </option>
            <option value="21">
              21
            </option>
            <option value="22">
              22
            </option>
            <option value="23">
              23
            </option>
            <option value="24">
              24
            </option>
          </select>
        </div>
      </div>
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
