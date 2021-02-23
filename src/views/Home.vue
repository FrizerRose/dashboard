<template>
  <div style="background-color: red; padding: 4rem;">
    <h1>home</h1>
  </div>
  <router-view />
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
