<template>
  <div
    v-if="!routeName !== 'Login'"
    class="header"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const route = useRoute();
    const routeName = computed(() => route.name);

    return {
      routeName,
    };
  },
});
</script>
