<template>
  <nav
    id="sidebar"
    class="sidebar"
  >
    <div class="sidebar-content">
      <router-link
        to="/"
        class="sidebar-brand"
      >
        <svg
          width="256"
          height="256"
          viewBox="0 0 256 256"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M167.111 128c0 23.564-19.102 42.667-42.667 42.667-23.564 0-42.666-19.103-42.666-42.667s19.102-42.667
            42.666-42.667c23.565 0 42.667 19.103 42.667 42.667z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M256 128c0 70.692-57.308 128-128 128H0V0h128c70.692 0 128 57.307 128 128zm-128 85.333c47.128 0
            85.333-38.205 85.333-85.333S175.128 42.667 128 42.667H42.667v170.666H128z"
          />
        </svg>
        <span class="align-middle me-3"> Dolazim.hr</span>
      </router-link>
    </div>
    <ul
      v-if="nodes"
      class="sidebar-nav"
    >
      <li
        v-for="node in nodes"
        :id="'menu-' + node.name"
        :key="node.name"
        class="sidebar-item"
        :class="{ active : node.templateName === $route.name }"
        :style="{position: 'relative'}"
        @click="tourNextStep()"
      >
        <router-link
          :to="node.slug"
          class="sidebar-link"
        >
          {{ node.name }}
        </router-link>

        <button
          v-if="node.nodes !== undefined"
          :data-bs-toggle="node.nodes === undefined ? 'collapsed' : 'collapse'"
          :class="{
            btn : true,
            'btn-lg' : true,
            'sidebar-link' : true,
            collapsed : !submenuShow,
            show : submenuShow
          }"
          :aria-expanded="submenuShow"
          :style="{position: 'absolute', top: 0, right: 0, height: '41px', 'z-index': 1}"
          @click="submenuToggle()"
        />

        <MainNavSubmenu
          v-if="node.nodes"
          :node="node"
          :submenu-show="submenuShow"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
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
  setup() {
    const store = useStore();
    const route = useRoute();
    const tour = computed(() => store.state.shared.tour);

    const submenuShow = ref(false);

    function submenuToggle() {
      submenuShow.value = !submenuShow.value;
    }

    function tourNextStep() {
      const tourReference = tour.value;
      setTimeout((() => {
        if (tourReference) {
          tourReference.next();
        }
      }), 200);
    }

    const submenuPages = ['/cesta-pitanja', '/kontakt'];
    const onSubMenu = submenuPages.includes(route.path);

    if (onSubMenu) {
      submenuShow.value = true;
    }

    return {
      tourNextStep,
      submenuToggle,
      submenuShow,
    };
  },
});
</script>
