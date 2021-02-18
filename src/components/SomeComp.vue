<template>
  <ul>
    <li>menu item 1</li>
    <li>menu item 2</li>
    <li>menu item 3</li>
    <li>{{ fruit }}</li>
  </ul>
</template>
<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    fruit: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const fruitName = computed(() => props.fruit);
    console.log(fruitName);

    return {
      fruitName,
    };
  },
});
</script>

<style scoped>
</style>
