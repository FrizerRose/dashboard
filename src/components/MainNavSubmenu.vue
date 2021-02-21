<template>
  <ul
    v-if="nodes"
    class="c-sidebar-nav-dropdown-items"
  >
    <li
      v-for="node in nodes"
      :key="node.id"
      class="c-sidebar-nav-item"
    >
      <router-link
        :to="node.slug"
        class="c-sidebar-nav-link"
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
