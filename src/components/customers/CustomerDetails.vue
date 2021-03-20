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
          <ul class="list-group list-group-flush">
            <li
              v-for="appointment in customerAppointments"
              :key="appointment.id"
              class="list-group-item"
            >
              <strong>{{ appointment.date }} - {{ appointment.time }} - {{ appointment.service.name }}</strong> <br>
            </li>
            <p v-if="!customerAppointments.length">
              Korisnik nema ugovorenih termina.
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

    return {
      customerAppointments,
    };
  },
});
</script>
