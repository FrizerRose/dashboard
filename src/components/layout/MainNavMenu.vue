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
          width="127"
          height="24"
          viewBox="0 0 127 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0H0v24h12zm0-6a6 6 0 100-12 6 6 0 000 12z"
          />
          <!-- eslint-disable max-len -->
          <path d="M38.502 5.754c1.368 0 2.55.258 3.546.774 1.008.504 1.776 1.23 2.304 2.178.54.948.81 2.064.81 3.348 0 1.284-.27 2.4-.81 3.348-.528.936-1.296 1.656-2.304 2.16-.996.492-2.178.738-3.546.738h-3.906V5.754h3.906zm0 11.196c1.62 0 2.856-.426 3.708-1.278.852-.864 1.278-2.07 1.278-3.618 0-1.56-.432-2.778-1.296-3.654-.852-.876-2.082-1.314-3.69-1.314h-2.268v9.864h2.268zM51.624 18.462c-.924 0-1.764-.21-2.52-.63a4.58 4.58 0 01-1.764-1.782c-.42-.78-.63-1.68-.63-2.7 0-1.008.216-1.896.648-2.664a4.51 4.51 0 011.8-1.782c.756-.42 1.602-.63 2.538-.63.937 0 1.782.21 2.538.63.756.408 1.35.996 1.782 1.764.445.768.666 1.662.666 2.682s-.227 1.92-.684 2.7a4.634 4.634 0 01-1.817 1.782c-.768.42-1.62.63-2.556.63zm0-1.44c.588 0 1.14-.138 1.657-.414.516-.276.93-.69 1.242-1.242.323-.552.485-1.224.485-2.016s-.156-1.464-.468-2.016c-.312-.552-.72-.96-1.224-1.224a3.355 3.355 0 00-1.638-.414c-.6 0-1.151.138-1.655.414-.492.264-.889.672-1.189 1.224-.3.552-.45 1.224-.45 2.016 0 .804.145 1.482.432 2.034.3.552.697.966 1.188 1.242a3.372 3.372 0 001.62.396zM60.474 4.98V18.3h-1.638V4.98h1.638zM62.654 13.332c0-1.008.204-1.89.612-2.646a4.446 4.446 0 011.674-1.782c.72-.42 1.518-.63 2.394-.63.864 0 1.614.186 2.25.558.636.372 1.11.84 1.422 1.404v-1.8h1.656V18.3h-1.656v-1.836c-.324.576-.81 1.056-1.458 1.44-.636.372-1.38.558-2.232.558-.876 0-1.668-.216-2.376-.648-.708-.432-1.266-1.038-1.674-1.818-.408-.78-.612-1.668-.612-2.664zm8.352.018c0-.744-.15-1.392-.45-1.944a3.098 3.098 0 00-1.224-1.26 3.211 3.211 0 00-1.674-.45c-.612 0-1.17.144-1.674.432a3.134 3.134 0 00-1.206 1.26c-.3.552-.45 1.2-.45 1.944 0 .756.15 1.416.45 1.98.3.552.702.978 1.206 1.278a3.314 3.314 0 001.674.432c.612 0 1.17-.144 1.674-.432.516-.3.924-.726 1.224-1.278.3-.564.45-1.218.45-1.962zM76.654 16.95h4.842v1.35h-6.714v-1.35l4.788-7.182h-4.752V8.436h6.642v1.332l-4.806 7.182zM84.467 6.834c-.312 0-.576-.108-.792-.324a1.077 1.077 0 01-.324-.792c0-.312.108-.576.324-.792.216-.216.48-.324.792-.324.3 0 .552.108.756.324.216.216.324.48.324.792 0 .312-.108.576-.324.792a.998.998 0 01-.756.324zm.792 1.602V18.3h-1.638V8.436h1.638zM99.913 8.256c.768 0 1.452.162 2.052.486.6.312 1.074.786 1.422 1.422.348.636.522 1.41.522 2.322V18.3h-1.62v-5.58c0-.984-.246-1.734-.738-2.25-.48-.528-1.134-.792-1.962-.792-.852 0-1.53.276-2.034.828-.504.54-.756 1.326-.756 2.358V18.3h-1.62v-5.58c0-.984-.246-1.734-.738-2.25-.48-.528-1.134-.792-1.962-.792-.852 0-1.53.276-2.034.828-.504.54-.756 1.326-.756 2.358V18.3h-1.638V8.436h1.638v1.422a3.252 3.252 0 011.296-1.188 4.008 4.008 0 011.818-.414c.828 0 1.56.186 2.196.558.636.372 1.11.918 1.422 1.638a3.235 3.235 0 011.368-1.62 4.03 4.03 0 012.124-.576zM107.118 18.408c-.312 0-.576-.108-.792-.324a1.077 1.077 0 01-.324-.792c0-.312.108-.576.324-.792.216-.216.48-.324.792-.324.3 0 .552.108.756.324.216.216.324.48.324.792 0 .312-.108.576-.324.792a.998.998 0 01-.756.324zM115.271 8.256c.744 0 1.416.162 2.016.486.6.312 1.068.786 1.404 1.422.348.636.522 1.41.522 2.322V18.3h-1.62v-5.58c0-.984-.246-1.734-.738-2.25-.492-.528-1.164-.792-2.016-.792-.864 0-1.554.27-2.07.81-.504.54-.756 1.326-.756 2.358V18.3h-1.638V4.98h1.638v4.86a3.24 3.24 0 011.332-1.17c.576-.276 1.218-.414 1.926-.414zM123.527 10.038a3.16 3.16 0 011.224-1.314c.54-.312 1.194-.468 1.962-.468v1.692h-.432c-1.836 0-2.754.996-2.754 2.988V18.3h-1.638V8.436h1.638v1.602z" />
        </svg>
      </router-link>
    </div>
    <ul
      v-if="nodes"
      class="sidebar-nav"
    >
      <li
        v-for="node in availableNodes"
        :id="'menu-' + node.name"
        :key="node.name"
        class="sidebar-item"
        :class="{ active : node.templateName === $route.name }"
        :style="{position: 'relative'}"
        @click="tourNextStep(node.tourStep)"
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
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const tour = computed(() => store.state.shared.tour);

    const submenuShow = ref(false);

    function submenuToggle() {
      submenuShow.value = !submenuShow.value;
    }

    function tourNextStep(tourStep) {
      if (tourStep) {
        const tourReference = tour.value;
        setTimeout((() => {
          if (tourReference && tourReference.isActive()) {
            tourReference.show(tourStep);
          }
        }), 200);
      }
    }

    const submenuPages = ['/cesta-pitanja', '/kontakt'];
    const onSubMenu = submenuPages.includes(route.path);

    if (onSubMenu) {
      submenuShow.value = true;
    }

    const user = computed(() => store.getters.getUser);
    const availableNodes = props.nodes.filter((node) => (user.value?.isAdminAccount ? true : !node.hideForStaff));

    return {
      tourNextStep,
      submenuToggle,
      submenuShow,
      availableNodes,
    };
  },
});
</script>
