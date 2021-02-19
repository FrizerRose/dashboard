<template>
  <div>
    <div class="temp-fixed">
      <p>template postavke</p>
    </div>
    <!--
      # Settings
      - koliko se ranije moze bookirat (lead time, 1h default)
      - scheduling window (30 day default)
      - cancellation policy (koliko ranije mogu cancelirrati, 2h default)
      - Change Name
      - Change Logo
      - Change About text
      - Change Street name
      - Change City
      - Change phone number
      - Change Radno vrijeme
      - Change contact email
      - Change social media links (repeater)
      - Change website link
      - Add terms&conditions link
      - Da li end-user ima opciju biranja radnika?
      - Mjenjanje subdomene - nakon sto API call prodje, ispisemo im da ce uskoro bit redirektani i redirektamo
      - Color variant
      - change password
    -->
    <MainNavMenu :nodes="tree.nodes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavMenu from '../components/MainNavMenu.vue';

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
