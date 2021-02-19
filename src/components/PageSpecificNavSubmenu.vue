<template>
  <!-- <pre style="background-color: pink;">
    {{ nodes }}
  </pre> -->
  <ul v-if="nodes">
    <li
      v-for="node in nodes"
      :key="node.id"
    >
      <router-link
        :to="node.slug"
        class="o-link"
      >
        {{ node.name }}
      </router-link>
    </li>
  </ul>
</template>
<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    nodes: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const menuNodes = computed(() => props.nodes);

    return {
      menuNodes,
    };
  },
});
</script>
