<template>
  <ul
    v-if="node.nodes"
    v-show="!isShowing"
    :id="node.target"
    class="sidebar-dropdown list-unstyled collapse show"
    data-bs-parent="#sidebar"
  >
    <li
      v-for="node in node.nodes"
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
    node: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const menuNodes = computed(() => props.node);

    return {
      menuNodes,
    };
  },
});
</script>
