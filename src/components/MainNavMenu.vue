<template>
  <div class="c-site-sidebar">
    <ul
      v-if="nodes"
      class="c-sidebar_list"
    >
      <li
        v-for="node in nodes"
        :key="node.name"
      >
        <span class="c-sidebar_dropdown-wrap">

          <router-link
            :to="node.slug"
            class="c-sidebar_link"
          >
            {{ node.name }}
          </router-link>

          <button
            v-if="node.nodes"
            class="c-button c-sidebar_dropdown-toggle -show-on-focus"
            :aria-label="'prikaži više za ' + node.name"
          >
            <span class="o-icon -sidebar-submenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                width="24"
                height="24"
                viewBox="-6 -6 36 36"
              ><path d="M6.707 12.85l-1.414 1.413L12 20.971l6.707-6.708-1.414-1.414L13 17.142V4h-2v13.142L6.707 12.85z" /></svg>
            </span>
          </button>

        </span>

        <MainNavSubmenu
          v-if="node.nodes"
          :nodes="node.nodes"
        />
      </li>
    </ul>
    <button class="c-button">
      <span class="o-icon">+</span>
    </button>
  </div>
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
