<template>
  <Dashboard>
    <template #header>
      Česta pitanja
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          česta pitanja
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
  },
});
</script>
