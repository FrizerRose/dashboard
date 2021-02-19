<template>
  <div class="c-site-wrapper">
    <header class="c-site-header">
      <MainNavMenu :nodes="tree.nodes" />
    </header>
    <main class="c-site-main">
      <section class="c-section">
        topbar
      </section>

      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavMenu from './components/MainNavMenu.vue';

export default defineComponent({
  components: {
    MainNavMenu,
  },

  setup() {
    return {
      MainNavMenu,
    };
  },
  data() {
    return {
      tree: {
        nodes: [
          { name: 'Naslovnica', slug: '/' },
          { name: 'Kalendar', slug: 'kalendar' },
          { name: 'Usluge', slug: 'usluge' },
          { name: 'Radnici', slug: 'radnici' },
          { name: 'Postavke', slug: 'postavke' },
          {
            name: 'Pomoć',
            slug: 'pomoc',
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
