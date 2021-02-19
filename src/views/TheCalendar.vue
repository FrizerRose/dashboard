<template>
  <div>
    <h1>template kalendar</h1>
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
    <Calendar
      v-model="value"
      :number-of-months="3"
    />
    <Calendar v-model="value">
      <template #date="slotProps">
        <strong
          v-if="slotProps.date.day > 10 && slotProps.date.day < 15"
          class="special-day"
        >{{ slotProps.date.day }}</strong>
        <template v-else>
          {{ slotProps.date.day }}
        </template>
      </template>
    </Calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Calendar from 'primevue/calendar';

export default defineComponent({
  components: {
    Calendar,
  },

  setup() {
    const value = ref(null);
    return {
      Calendar,
      value,
    };
  },
});
</script>
