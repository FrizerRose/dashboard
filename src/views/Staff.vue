<template>
  <main class="c-site-main">
    <div class="temp-fixed">
      <p>template radnici</p>
    </div>

    <router-view />
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
