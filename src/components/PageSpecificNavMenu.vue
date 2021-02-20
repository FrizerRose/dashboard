<template>
  <!-- <pre style="background-color: wheat;">
    {{ nodes }}
  </pre> -->
  <ul v-if="nodes">
    <li
      v-for="node in nodes"
      :key="node.id"
    >
      <router-link
        :to="node.slug"
        class="o-link"
      >
        {{ node.name }}
      </router-link>

      <PageSpecificNavSubmenu :nodes="node.nodes" />
    </li>
  </ul>
</template>
<script>
import { computed, defineComponent } from 'vue';
import PageSpecificNavSubmenu from './PageSpecificNavSubmenu.vue';

export default defineComponent({
  components: {
    PageSpecificNavSubmenu,
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
