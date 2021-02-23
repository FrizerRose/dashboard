<template>
  <div class="wrapper">
    <!-- <div class="sidebar"> -->
    <MainNavMenu :nodes="tree.nodes" />
    <!-- end sidebar -->
    <div class="main">
      <TopNavbar />

      <slot />

      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavMenu from '@/components/layout/MainNavMenu.vue';
import TopNavbar from '@/components/layout/TopNavbar.vue';
import Footer from '@/components/layout/Footer.vue';

export default defineComponent({
  components: {
    MainNavMenu,
    TopNavbar,
    Footer,
  },
  setup() {
    return {
      tree: {
        nodes: [
          { name: 'Naslovnica', slug: '/', target: 'bs-target-id-naslovnica' },
          { name: 'Kalendar', slug: '/kalendar', target: 'bs-target-id-kalendar' },
          { name: 'Usluge', slug: '/usluge', target: 'bs-target-id-usluge' },
          { name: 'Radnici', slug: '/radnici', target: 'bs-target-id-radnici' },
          {
            name: 'Postavke',
            slug: '/postavke',
            target: 'bs-target-id-postavke',
            nodes: [
              { name: 'Račun', slug: '/postavke/racun' },
            ],
          },
          {
            name: 'Pomoć',
            slug: '/pomoc',
            target: 'bs-target-id-pomoc',
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
