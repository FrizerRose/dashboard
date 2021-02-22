<template>
  <ul
    v-if="nodes"
    v-show="!isShowing"
    id="dashboards"
    class="sidebar-dropdown list-unstyled collapse show"
    data-bs-parent="#sidebar"
  >
    <li
      v-for="node in nodes"
      :key="node.id"
      class="sidebar-item active"
    >
      <router-link
        :to="node.slug"
        class="sidebar-link"
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
