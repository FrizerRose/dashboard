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
    <div
      v-if="anyModalOpen"
      class="modal-backdrop fade show"
    />

    <InitialFlow v-if="!isTutorialFinished" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import MainNavMenu from '@/components/layout/MainNavMenu.vue';
import TopNavbar from '@/components/layout/TopNavbar.vue';
import Footer from '@/components/layout/Footer.vue';
import InitialFlow from '@/components/initialFlow/InitialFlowWrapper.vue';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    MainNavMenu,
    TopNavbar,
    Footer,
    InitialFlow,
  },
  setup() {
    const store = useStore();
    const anyModalOpen = computed(() => store.getters.anyModalOpen);
    const isTutorialFinished = computed(() => store.getters.isTutorialFinished);

    watch(() => isTutorialFinished.value, (newState: boolean | undefined, oldState: boolean | undefined) => {
      if (newState) {
        document.body.classList.add('modal-open');
      }

      if (!newState && oldState) {
        document.body.classList.remove('modal-open');
      }
    });

    return {
      anyModalOpen,
      isTutorialFinished,
      tree: {
        nodes: [
          { name: 'Naslovnica', templateName: 'Home', slug: '/' },
          { name: 'Kalendar', templateName: 'Calendar', slug: '/kalendar' },
          { name: 'Usluge', templateName: 'Services', slug: '/usluge' },
          { name: 'Radnici', templateName: 'Staff', slug: '/radnici' },
          { name: 'Postavke', templateName: 'Settings', slug: '/postavke' },
          {
            name: 'Pomoć',
            templateName: 'Help',
            slug: '/pomoc',
            target: 'help',
            nodes: [
              { name: 'Česta Pitanja', templateName: 'HelpFaq', slug: '/cesta-pitanja' },
              { name: 'Uputstvo', templateName: 'HelpManual', slug: '/uputstvo' },
              { name: 'Kontakt', templateName: 'HelpContact', slug: '/kontakt' },
            ],
          },
        ],
      },
    };
  },
});
</script>
