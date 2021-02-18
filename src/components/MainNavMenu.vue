<template>
  <!-- <pre style="background-color: wheat;">
    {{ nodes }}
  </pre> -->
  <ul v-if="nodes">
    <li
      v-for="node in nodes"
      :key="node.id"
    >
      <router-link :to="node.slug">
        {{ node.name }}
      </router-link>

      <MainNavSubmenu :nodes="node.nodes" />
    </li>
  </ul>
</template>
<script>
import { computed, defineComponent } from 'vue';
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
    const menuNodes = computed(() => props.nodes);

    return {
      menuNodes,
    };
  },
});
</script>
