<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        <router-view />
        <a
          href="#"
          class="btn btn-primary float-end mt-n1"
        ><i class="fas fa-plus" /> Dodaj radnika</a>
        <h1 class="h3 mb-3">
          Radnici
        </h1>
        <StaffList />
      </div>
    </main>
    <router-view />
  </Dashboard>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Dashboard from '@/components/layout/Dashboard.vue';
import StaffList from '../components/StaffList.vue';

export default defineComponent({
  components: {
    Dashboard,
    StaffList,
  },
  setup() {
    const route = useRoute();
    const routeName = computed(() => route.name);

    return {
      routeName,
      StaffList,
    };
  },
});
</script>
