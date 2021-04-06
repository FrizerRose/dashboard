<template>
  <div class="wrapper">
    <MainNavMenu :nodes="tree.nodes" />
    <div class="main">
      <TopNavbar>
        <slot name="header" />
      </TopNavbar>

      <slot name="body" />

      <Footer />
    </div>
    <div
      v-if="anyModalOpen"
      class="modal-backdrop fade show"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import MainNavMenu from '@/components/layout/MainNavMenu.vue';
import TopNavbar from '@/components/layout/TopNavbar.vue';
import Footer from '@/components/layout/Footer.vue';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    MainNavMenu,
    TopNavbar,
    Footer,
  },
  setup() {
    const store = useStore();
    const anyModalOpen = computed(() => store.getters.anyModalOpen);

    return {
      anyModalOpen,
      tree: {
        nodes: [
          { name: 'Naslovnica', templateName: 'Home', slug: '/' },
          {
            name: 'Kalendar', templateName: 'Calendar', slug: '/kalendar', tourStep: 'kalendar-step-1',
          },
          {
            name: 'Usluge', templateName: 'Services', slug: '/usluge', tourStep: 'usluge-add',
          },
          {
            name: 'Radnici', templateName: 'Staff', slug: '/radnici', tourStep: 'radnici-add',
          },
          { name: 'Klijenti', templateName: 'Customers', slug: '/klijenti' },
          {
            name: 'Postavke', templateName: 'Settings', slug: '/postavke', hideForStaff: true, tourStep: 'postavke-edit',
          },
          {
            name: 'Pomoć',
            templateName: 'Help',
            slug: '/pomoc',
            target: 'help',
            nodes: [
              { name: 'Česta Pitanja', templateName: 'HelpFaq', slug: '/cesta-pitanja' },
              { name: 'Kontakt', templateName: 'HelpContact', slug: '/kontakt' },
            ],
          },
        ],
      },
    };
  },
});
</script>
