<template>
  <div class="c-site-wrapper">
    <MainNavMenu
      v-if="routeName !== 'Login'"
      :nodes="tree.nodes"
    />

    <div class="c-page-wrapper">
      <header
        class="c-site-header"
      >
        <p>header</p>
      </header>
      <main class="c-site-main">
        <router-view />
      </main>
      <footer class="c-site-footer">
        <p>footer</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import ActionTypes from '@/store/action-types';
import MainNavMenu from './components/MainNavMenu.vue';

export default defineComponent({
  components: {
    MainNavMenu,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const routeName = computed(() => route.name);

    const store = useStore();

    // If user lands on non-public page, check if his credentials are valid
    async function checkIfAuthorized() {
      const publicPages = ['/login', '/zaboravljena-lozinka'];
      if (!publicPages.includes(route.path)) {
        try {
          const accessToken = computed(() => store.state.auth.accessToken);
          if (typeof accessToken.value !== 'string') {
            throw new Error('No access token.');
          }

          await store.dispatch(ActionTypes.FETCH_USER, accessToken.value);
        } catch {
          router.push('/login');
        }
      }
    }
    checkIfAuthorized();

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
