<template>
  <main class="content">
    <div class="container-fluid p-0">
      <router-view />
      <a
        href="#"
        class="btn btn-primary float-end mt-n1"
      ><i class="fas fa-plus" /> Dodaj uslugu</a>
      <h1 class="h3 mb-3">
        Usluge
      </h1>
      <ServiceList />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ServiceList from '../components/ServiceList.vue';

export default defineComponent({
  components: {
    ServiceList,
  },

  setup() {
    return {
      ServiceList,
    };
  },
});
</script>
