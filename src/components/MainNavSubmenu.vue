<template>
  <ul
    v-if="nodes"
    v-show="!isShowing"
    class="c-sidebar_list -is-submenu"
  >
    <li
      v-for="node in nodes"
      :key="node.id"
    >
      <span class="c-sidebar_dropdown-wrap">
        <router-link
          :to="node.slug"
          class="c-sidebar_link"
        >
          {{ node.name }}
        </router-link>
      </span>
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
