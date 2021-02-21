<template>
  <ul
    v-if="nodes"
    class="c-sidebar-nav"
  >
    <li class="c-sidebar-nav-title">
      nav title
    </li>
    <li
      v-for="node in nodes"
      :key="node.name"
      class="c-sidebar-nav-item"
      :class="{ 'c-sidebar-nav-dropdown' : node.nodes }"
    >
      <router-link
        :to="node.slug"
        class="c-sidebar-nav-link"
        :class="{ 'c-sidebar-nav-dropdown-toggle' : node.nodes }"
      >
        {{ node.name }}
      </router-link>

      <MainNavSubmenu
        v-if="node.nodes"
        :nodes="node.nodes"
      />
    </li>
  </ul>
</template>
<script>
import { defineComponent } from 'vue';
import MainNavSubmenu from './MainNavSubmenu.vue';

export default defineComponent({
  components: {
    MainNavSubmenu,
  },
  props: {
    nodes: {
      type: Array,
      required: true,
    },
  },
});
</script>
