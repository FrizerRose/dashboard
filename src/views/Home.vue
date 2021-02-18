<template>
  <div class="home">
    <!-- <ul>
      <li>Home</li>
      <li>Calendar</li>
      <li>Dodavanje usluga/radnika</li>
      <li>Settings</li>
      <li>Help (faq/tutoriali/contact)</li>
    </ul>
    <ul>
      <li>
        widget sa statistikom:
        <ul>
          <li>broj rezervacija u zadnjem tjednu</li>
          <li>revenue u zadnjem tjednu</li>
          <li>next week projection?</li>
        </ul>
      </li>
      <li>upcoming termini - sljedećih 10 termina</li>
      <li>link na tutoriale/faq/contact</li>
      <li>activity feed (booking, reschedule, cancel)</li>
    </ul> -->

    <SomeComp :fruit="Banana" />

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
import SomeComp from '../components/SomeComp.vue';

export default defineComponent({
  components: {
    SomeComp,
    Calendar,
  },

  setup() {
    const value = ref(null);
    return {
      SomeComp,
      Calendar,
      value,
    };
  },
});
</script>
