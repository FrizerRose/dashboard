<template>
  <main class="content">
    <div class="container-fluid p-0">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
  },

  setup() {
    return {
    };
  },
});
</script>
