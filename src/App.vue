<template>
  <div class="c-site-wrapper">
    <header
      v-if="routeName !== 'Login'"
      class="c-site-header"
    >
      <MainNavMenu :nodes="tree.nodes" />
    </header>
    <main class="c-site-main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import MainNavMenu from './components/MainNavMenu.vue';

export default defineComponent({
  components: {
    MainNavMenu,
  },
  setup() {
    const route = useRoute();
    const routeName = computed(() => route.name);

    return {
      routeName,
      tree: {
        nodes: [
          { name: 'Naslovnica', slug: '/' },
          { name: 'Kalendar', slug: '/kalendar' },
          { name: 'Usluge', slug: '/usluge' },
          { name: 'Radnici', slug: '/radnici' },
          { name: 'Postavke', slug: '/postavke' },
          {
            name: 'Pomoć',
            slug: '/pomoc',
            nodes: [
              { name: 'Česta Pitanja', slug: '/pomoc/cesta-pitanja' },
              { name: 'Uputstvo', slug: '/pomoc/uputstvo' },
              { name: 'Kontakt', slug: '/pomoc/kontakt' },
            ],
          },
        ],
      },
    };
  },
});
</script>
