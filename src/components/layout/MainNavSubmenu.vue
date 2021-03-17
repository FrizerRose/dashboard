<template>
  <ul
    v-if="node.nodes"
    :id="'bs-target-id-' + node.target"
    :class="{
      'sidebar-dropdown' : true,
      'list-unstyled' : true,
      collapse : !submenuShow,
    }"
    data-bs-parent="#sidebar"
  >
    <li
      v-for="subNode in node.nodes"
      :key="subNode.id"
      class="sidebar-item"
      :class="{ active : subNode.templateName === $route.name }"
    >
      <router-link
        :to="subNode.slug"
        class="sidebar-link"
      >
        {{ subNode.name }}
      </router-link>
    </li>
  </ul>
</template>
<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    node: {
      type: Object,
      required: true,
    },
    submenuShow: {
      type: Boolean,
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
