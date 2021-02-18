<template>
  <div class="home">
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
          {{ slotProps.date.day }}}
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
