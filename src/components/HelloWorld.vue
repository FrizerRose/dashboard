<template>
  <div class="example">
    <h1>{{ msg }}</h1>
    <h4>{{ advice }}</h4>

    <button @click="fetchNewNumberAndAdvice()">
      Get new piece of advice
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '../store';

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const store = useStore();
    const number = computed(() => store.state.shared.number);
    const advice = computed(() => store.state.shared.advice);

    const fetchNewNumberAndAdvice = async () => {
      const newNumber = Math.floor(Math.random() * Math.floor(100));
      store.commit(MutationTypes.CHANGE_NUMBER, newNumber);
      store.dispatch(ActionTypes.FETCH_ADVICE, newNumber);
    };

    fetchNewNumberAndAdvice();

    return {
      number,
      advice,
      fetchNewNumberAndAdvice,
    };
  },
});
</script>

<style scoped lang="scss">
.example {
  color: grey;
}
</style>
