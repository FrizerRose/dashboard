<template>
  <div class="wrapper">
    <!-- <div class="sidebar"> -->
    <MainNavMenu :nodes="tree.nodes" />
    <!-- end sidebar -->
    <div class="main">
      <TopNavbar />

      <div
        v-if="!routeName !== 'Login'"
        class="header"
      />

      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import MainNavMenu from '../components/layout/MainNavMenu.vue';
import TopNavbar from '../components/layout/TopNavbar.vue';
import Footer from '../components/layout/Footer.vue';

export default defineComponent({
  components: {
    MainNavMenu,
    TopNavbar,
    Footer,
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
          {
            name: 'Postavke',
            slug: '/postavke',
            nodes: [
              { name: 'Račun', slug: '/postavke/racun' },
            ],
          },
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
