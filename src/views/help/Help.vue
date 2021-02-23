<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        pomoć
        <router-view />
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
  },

  setup() {
    return {
    };
  },
});
</script>
