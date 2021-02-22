<template>
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
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';

export default defineComponent({
  components: {
    // Calendar,
  },

  setup() {
    // const calendar = new Calendar(calendarEl, {
    //   plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    //   initialView: 'dayGridMonth',
    //   headerToolbar: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,listWeek',
    //   },
    // });
    // return {
    //   calendar,
    // };
  },
});
</script>
