<template>
  <div class="home">
    <!--
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

    <MainNavMenu :nodes="tree.nodes" />

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
import MainNavMenu from '../components/MainNavMenu.vue';

export default defineComponent({
  components: {
    MainNavMenu,
    Calendar,
  },

  setup() {
    const value = ref(null);
    return {
      MainNavMenu,
      Calendar,
      value,
    };
  },
  data() {
    return {
      tree: {
        nodes: [
          { name: 'Naslovnica', slug: 'naslovnica' },
          { name: 'Kalendar', slug: 'kalendar' },
          { name: 'Usluge', slug: 'usluge' },
          { name: 'Radnici', slug: 'radnici' },
          { name: 'Postavke', slug: 'postavke' },
          {
            name: 'Pomoć',
            slug: 'pomoc',
            nodes: [
              { name: 'Česta Pitanja', slug: 'cesta-pitanja' },
              { name: 'Uputstvo', slug: 'uputstvo' },
              { name: 'Kontakt', slug: 'kontakt' },
            ],
          },
        ],
      },
    };
  },
});
</script>
