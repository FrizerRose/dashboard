<template>
  <Dashboard>
    <template #header>
      Pomoć
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          pomoć
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
