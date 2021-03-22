<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <strong>{{ customer.name }}</strong>
        </div>
        <div class="card-body">
          <ul class="list-unstyled">
            <li>Email: {{ customer.email }}</li>
            <li>Mob.: {{ customer.phone }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div
        v-if="customerAppointments"
        class="card"
      >
        <div class="card-header">
          <h5 class="card-title mb-0">
            Termini
          </h5>
        </div>
        <div class="card-body h-100">
          <h4
            v-if="missedPercentage !== null"
            :class="{
              'percentage-green': missedPercentage < 15,
              'percentage-yellow': missedPercentage >= 15 && missedPercentage < 30,
              'percentage-red': missedPercentage >= 30
            }"
          >
            Korisnik je propustio {{ missedPercentage }}% termina.
          </h4>
          <ul class="list-group list-group-flush">
            <li
              v-for="appointment in customerAppointments"
              :key="appointment.id"
              class="list-group-item"
            >
              <strong>{{ appointment.date }} - {{ appointment.time }} - {{ appointment.service.name }}</strong> <br>
            </li>
            <p v-if="!customerAppointments.length">
              Klijent nema ugovorenih termina.
            </p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const customerAppointments = computed(() => store.state.shared.selectedCustomerAppointments);

    const missedPercentage = computed(() => {
      const appointmentCount = customerAppointments.value.length;
      if (!appointmentCount) {
        return null;
      }

      console.log('🚀 ~ file: CustomerDetails.vue ~ line 65 ~ missedPercentage ~ appointmentCount', appointmentCount);
      const missedAppointmentCount: number = customerAppointments.value.reduce((total, appointment): number => {
        if (!appointment.hasCustomerArrived) {
          return total + 1;
        }

        return total;
      }, 0);
      console.log('🚀 ~ f+', missedAppointmentCount);

      return Math.floor((missedAppointmentCount / appointmentCount) * 100);
    });

    return {
      customerAppointments,
      missedPercentage,
    };
  },
});
</script>

<style lang="scss" scoped>
  .percentage-green {
    color: green;
  }
  .percentage-yellow {
    color: orange;
  }
  .percentage-red {
    color: red;
  }
</style>
