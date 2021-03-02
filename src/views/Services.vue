<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        />
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
  </Dashboard>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Dashboard from '@/components/layout/Dashboard.vue';
import ServiceList from '../components/ServiceList.vue';

export default defineComponent({
  components: {
    Dashboard,
    ServiceList,
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
