<template>
  <Dashboard>
    <!--
    # Calendar
    - 7 dana prikazano - back & foreward buttoni
    - odabir Radnika, nema combined prikaza
    - u kalendaru se nalaze slotovi za sva 24h. U jednom viewpointu na desktopu se vide
      8h sa scroll positionom na najranije vrijeme što imaju dodano u business hours.
    - inkrementi od 15min
    - appointment boja slotove. Upcoming termini recimo zelena boja, past termini žuta boja.
    - Klik na prazan slot otvara modal sa Kreiranjem termina, klik na zauzet slot otvara modal sa Editiranjem termina. Kopirati setmore.
    - Quick actions button - linkovi na dodavanje servica/ranika, etc.
  -->
    <main class="content">
      <div class="container-fluid p-0">
        <h1 class="h3 mb-3">
          Kalendar
        </h1>
        <CalendarComponent v-if="selectedWorker" />
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import {
  defineComponent, computed,
} from 'vue';

import Dashboard from '@/components/layout/Dashboard.vue';
import CalendarComponent from '@/components/Calendar.vue';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    Dashboard,
    CalendarComponent,
  },

  setup() {
    const store = useStore();
    const selectedWorker = computed(() => store.state.shared.selectedWorker);

    return {
      selectedWorker,
    };
  },
});
</script>
