<template>
  <div class="c-app">
    <div class="c-sidebar c-sidebar-dark c-sidebar-show">
      <MainNavMenu :nodes="tree.nodes" />
      <button
        class="c-sidebar-minimizer c-brand-minimizer"
        type="button"
      />
    </div>

    <div class="c-wrapper">
      <header
        v-if="routeName !== 'Login'"
        class="c-header"
      >
        <p>header</p>
      </header>

      <div class="c-body">
        <router-view />

        <footer class="c-footer">
          <p>footer</p>
        </footer>
      </div>
    </div><!-- /.c-wrapper -->
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
