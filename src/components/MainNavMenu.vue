<template>
  <nav class="sidebar">
    <ul
      v-if="nodes"
      class="sidebar-nav"
    >
      <li
        v-for="node in nodes"
        :key="node.name"
        class="sidebar-item active"
      >
        <router-link
          :to="node.slug"
          data-bs-target="#dashboards"
          data-bs-toggle="collapse"
          class="sidebar-link"
        >
          <i
            class="align-middle"
            data-feather="sliders"
          /> <span class="align-middle">{{ node.name }}</span>
          <span
            class="badge badge-sidebar-primary"
            style="display: none;"
          >5</span>
        </router-link>

        <MainNavSubmenu
          v-if="node.nodes"
          :nodes="node.nodes"
        />
      </li>
    </ul>
  </nav>
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
