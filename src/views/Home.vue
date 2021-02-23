<template>
  <Dashboard>
    <div style="background-color: red; padding: 4rem;">
      <h1>home</h1>
    </div>
  </Dashboard>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Dashboard from '@/components/layout/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
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
