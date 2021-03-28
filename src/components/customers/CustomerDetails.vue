<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <div
          v-if="customer.name"
          class="card-header pb-1"
        >
          <h3>
            {{ customer.name }}
          </h3>
        </div>
        <div
          class="card-body"
        >
          <ul
            v-if="customer.name"
            class="list-unstyled"
          >
            <li><strong>Email:</strong> {{ customer.email ? customer.email : 'Nije unešen' }}</li>
            <li><strong>Mob.:</strong> {{ customer.phone ? customer.phone : 'Nije unešen' }}</li>
            <li><strong>Ukupna zarada od klijenta:</strong> {{ totalEarnings }}kn</li>
            <li v-if="customerAppointments.length">
              <strong>Prosječna vrijednost dolaska:</strong>
              {{ Math.floor(totalEarnings / customerAppointments.length) }}kn
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div
        v-if="customerAppointments"
        class="card"
      >
        <div
          v-if="customer.name"
          class="card-header"
        >
          <h5 class="card-title mb-0">
            Termini
          </h5>
        </div>
        <div class="card-body h-100">
          <div
            v-if="customer.name && attendedPercentage !== null"
            class="position-relative"
          >
            <div class="progress override-place-in-alert">
              <div
                role="progressbar"
                class="progress-bar"
                :class="{
                  'bg-success': attendedPercentage === 100,
                  'bg-warning': attendedPercentage < 100 && attendedPercentage >= 80,
                  'bg-danger': attendedPercentage < 80
                }"
                :style="{
                  width: attendedPercentage + '%'
                }"
                :aria-valuenow="attendedPercentage"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <div
              class="alert"
              :class="{
                'alert-success': attendedPercentage === 100,
                'alert-warning': attendedPercentage < 100 && attendedPercentage >= 80,
                'alert-danger': attendedPercentage < 80
              }"
            >
              <div class="px-3 py-4">
                <span v-if="attendedPercentage === 100">A+</span>
                <span v-if="attendedPercentage < 100 && attendedPercentage >= 90">A</span>
                <span v-if="attendedPercentage < 90 && attendedPercentage >= 80">B</span>
                <span v-if="attendedPercentage < 80 && attendedPercentage >= 70">C</span>
                <span v-if="attendedPercentage < 70">D</span>
              </div>
              <div class="px-3 py-4">
                Klijent se pojavio na {{ attendedPercentage }}% termina.
              </div>
            </div>
          </div>
          <ul class="list-group list-group-flush">
            <li
              v-for="appointment in customerAppointments"
              :key="appointment.id"
              class="list-group-item"
            >
              <strong>{{ appointment.date }} - {{ appointment.time }} - {{ appointment.service.name }}</strong> <br>
            </li>
            <p v-if="customer.name && !customerAppointments.length">
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

    const attendedPercentage = computed(() => {
      const appointmentCount = customerAppointments.value.length;
      if (!appointmentCount) {
        return null;
      }

      const attendedAppointmentCount: number = customerAppointments.value.reduce((total, appointment): number => {
        if (appointment.hasCustomerArrived) {
          return total + 1;
        }

        return total;
      }, 0);

      return Math.floor((attendedAppointmentCount / appointmentCount) * 100);
    });

    const totalEarnings = computed(() => customerAppointments.value.reduce(
      (total, appointment): number => total + appointment.service.price, 0,
    ));

    return {
      customerAppointments,
      attendedPercentage,
      totalEarnings,
    };
  },
});
</script>
