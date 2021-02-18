<template>
  <div class="home">
    <Dialog
      v-model:visible="display"
      header="Header"
    >
      Content
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dialog from 'primevue/dialog';

export default defineComponent({
  components: {
    Dialog,
  },
});
</script>
