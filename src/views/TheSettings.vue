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
    <div class="o-flex">
      <PageSpecificNavMenu :nodes="pageSettingsTree.nodes" />
      <WorkforceMember />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WorkforceMember from '../components/Workforce/WorkforceMember.vue';
import PageSpecificNavMenu from '../components/PageSpecificNavMenu.vue';

export default defineComponent({
  components: {
    WorkforceMember,
    PageSpecificNavMenu,
  },

  setup() {
    return {
      WorkforceMember,
      PageSpecificNavMenu,
    };
  },
  data() {
    return {
      pageSettingsTree: {
        nodes: [
          {
            name: 'Račun',
            slug: '/postavke/racun',
            nodes: [
              { name: 'Postavke', slug: '/postavke/racun/postavke' },
              { name: 'Firma', slug: '/postavke/racun/firma' },
              { name: 'Prethodne naplate', slug: '/postavke/racun/prethodne-naplate' },
              { name: 'Kratki izvještaj', slug: '/postavke/racun/kratki-izvjestaj' },
            ],
          },
          {
            name: 'Radnici',
            slug: '/postavke/radnici',
            nodes: [
              { name: 'Pregled svih radnika', slug: '/postavke/radnici/pregled' },
              { name: 'Tomislav', slug: '/postavke/radnici/tomislav' },
              { name: 'Juraj', slug: '/postavke/radnici/juraj' },
            ],
          },
          {
            name: 'Usluge',
            slug: '/postavke/usluge',
            nodes: [
              { name: 'Pregled svih usluga', slug: '/postavke/usluge/pregled' },
              { name: 'Šišanje', slug: '/postavke/usluge/sisanje' },
              { name: 'Frizura', slug: '/postavke/usluge/frizura' },
            ],
          },
          {
            name: 'Naplate',
            slug: '/postavke/naplate',
            nodes: [
              { name: 'Konfiguriraj', slug: '/postavke/naplate/konfiguriraj' },
              { name: 'Postavke Weba', slug: '/postavke/naplate/postavke-weba' },
              { name: 'Prethodne naplate', slug: '/postavke/naplate/prethodne-naplate' },
            ],
          },
          {
            name: 'Izvještavanja prema',
            slug: '/postavke/izvjestavnja-prema',
            nodes: [
              { name: 'Klijentu', slug: '/postavke/izvjestavnja-prema/klijentu' },
              { name: 'Osoblju', slug: '/postavke/izvjestavnja-prema/osoblju' },
            ],
          },
          { name: 'Uredi mail', slug: '/postavke/uredi-mail' },
          {
            name: 'Postavke Weba',
            slug: '/postavke/postavke-weba',
            nodes: [
              { name: 'Pregled postavki', slug: '/postavke/postavke-weba/pregled-postavki' },
              { name: 'Podatci o firmi', slug: '/postavke/postavke-weba/podatci-o-firmi' },
              { name: 'Radno vrijeme', slug: '/postavke/postavke-weba/radno-vrijeme' },
              { name: 'Postavke rezervacija', slug: '/postavke/postavke-weba/postavke-rezervacija' },
              { name: 'Uredi sadržaj na webu', slug: '/postavke/postavke-weba/uredi-sadrzaj-na-webu' },
              { name: 'Recenzije', slug: '/postavke/postavke-weba/recenzije' },
            ],
          },
        ],
      },
    };
  },
});
</script>
