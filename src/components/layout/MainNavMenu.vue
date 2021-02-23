<template>
  <nav
    id="sidebar"
    class="sidebar"
  >
    <div class="sidebar-content js-simplebar">
      <router-link
        to="/"
        class="sidebar-brand"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          enable-background="new 0 0 20 20"
          xml:space="preserve"
        >
          <path
            d="M19.4,4.1l-9-4C10.1,0,9.9,0,9.6,0.1l-9,4C0.2,4.2,0,4.6,0,5s0.2,0.8,0.6,0.9l9,4C9.7,10,9.9,10,10,10s0.3,0,0.4-0.1l9-4
              C19.8,5.8,20,5.4,20,5S19.8,4.2,19.4,4.1z"
          />
          <path
            d="M10,15c-0.1,0-0.3,0-0.4-0.1l-9-4c-0.5-0.2-0.7-0.8-0.5-1.3c0.2-0.5,0.8-0.7,1.3-0.5l8.6,3.8l8.6-3.8c0.5-0.2,1.1,0,1.3,0.5
              c0.2,0.5,0,1.1-0.5,1.3l-9,4C10.3,15,10.1,15,10,15z"
          />
          <path
            d="M10,20c-0.1,0-0.3,0-0.4-0.1l-9-4c-0.5-0.2-0.7-0.8-0.5-1.3c0.2-0.5,0.8-0.7,1.3-0.5l8.6,3.8l8.6-3.8c0.5-0.2,1.1,0,1.3,0.5
              c0.2,0.5,0,1.1-0.5,1.3l-9,4C10.3,20,10.1,20,10,20z"
          />
        </svg>
        <span class="align-middle me-3"> AppStack</span>
      </router-link>
    </div>
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
          :data-bs-target="'#' + node.target"
          :data-bs-toggle="{collapsed : node.nodes, collapse : !node.nodes}"
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
          :node="node"
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
  setup(props) {
    props.nodes.forEach((node) => {
      if (node.nodes !== undefined) {
        console.log(node.nodes);
      }
    });
  },
});
</script>
