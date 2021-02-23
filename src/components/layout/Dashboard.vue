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
          { name: 'Naslovnica', templateName: 'Home', slug: '/' },
          { name: 'Kalendar', templateName: 'Calendar', slug: '/kalendar' },
          { name: 'Usluge', templateName: 'Services', slug: '/usluge' },
          { name: 'Radnici', templateName: 'Staff', slug: '/radnici' },
          {
            name: 'Postavke',
            templateName: 'Settings',
            slug: '/postavke',
            target: 'settings',
            nodes: [
              { name: 'Račun', slug: '/postavke/racun' },
            ],
          },
          {
            name: 'Pomoć',
            templateName: 'Help',
            slug: '/pomoc',
            target: 'help',
            nodes: [
              { name: 'Česta Pitanja', templateName: 'HelpFaq', slug: '/pomoc/cesta-pitanja' },
              { name: 'Uputstvo', templateName: 'HelpManual', slug: '/pomoc/uputstvo' },
              { name: 'Kontakt', templateName: 'HelpContact', slug: '/pomoc/kontakt' },
            ],
          },
        ],
      },
    };
  },
});
</script>
