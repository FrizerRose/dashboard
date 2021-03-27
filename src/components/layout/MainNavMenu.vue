<template>
  <nav
    id="sidebar"
    class="sidebar"
  >
    <div class="sidebar-content">
      <router-link
        to="/"
        class="sidebar-logo"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0H0v24h12zm0-6a6 6 0 100-12 6 6 0 000 12z"
          />
        </svg>
        <span class="align-middle">Dolazim.hr</span>
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
      <li class="sidebar-item">
        <span class="sidebar-link">
          <router-link
            to="/qr-kod"
            class="btn responsive-btn btn-secondary w-100"
          >
            Prikaži QR Kod
          </router-link>
        </span>
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
