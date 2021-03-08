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
          Calendar
        </h1>

        <div class="card">
          <div class="card-header">
            <h5 class="card-title">
              FullCalendar
            </h5>
            <h6 class="card-subtitle text-muted">
              Open source JavaScript jQuery plugin for a full-sized, drag & drop event calendar.
            </h6>
          </div>
          <div class="card-body">
            <div id="fullcalendar" />
          </div>
        </div>
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourcePlugin from '@fullcalendar/resource-common';
import listPlugin from '@fullcalendar/list';
import hrLocale from '@fullcalendar/core/locales/hr';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    Dashboard,
  },

  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    onMounted(() => {
      const calendarEl = document.getElementById('fullcalendar');
      if (calendarEl) {
        const calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, resourcePlugin],
          initialView: 'timeGridWeek',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,listWeek',
          },
          views: {
            timeGridWeek: {
            },
          },
          locale: hrLocale,
          slotDuration: '00:15:00',
          slotLabelInterval: '01:00',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          // resources: ,
        });

        calendar.render();
      }
    });

    return {
      // calendar,
    };
  },
});
</script>
