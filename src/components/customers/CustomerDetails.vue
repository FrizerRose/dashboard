<template>
  <div class="row">
    <div :class="editCustomerMode ? 'col-md-8' : 'col-md-4'">
      <div class="card">
        <div
          v-if="customer.name"
          class="card-header pb-1"
        >
          <h3>
            {{ customer.name }}
          </h3>
        </div>
        <div class="card-body">
          <CustomerEdit
            v-if="editCustomerMode"
            :customer-for-edit="customer"
          />
          <ul
            v-else-if="customer.name"
            class="list-unstyled"
          >
            <li><strong>Email:</strong> {{ customer.email ? customer.email : 'Nije unešen' }}</li>
            <li><strong>Mob.:</strong> {{ customer.phone ? customer.phone : 'Nije unešen' }}</li>
            <li><strong>Ukupna zarada od klijenta:</strong> {{ totalEarnings }}kn</li>
            <li v-if="customerAppointments.length">
              <strong>Prosječna vrijednost dolaska:</strong>
              {{ Math.floor(totalEarnings / customerAppointments.length) }}kn
            </li>
            <li>
              <strong>Bilješka:</strong>
              {{ customer.notes ? customer.notes : 'Nema bilješke' }}
            </li>
          </ul>
          <button
            v-if="customer.name"
            class="btn responsive-btn "
            :class="editCustomerMode ? 'btn-secondary' : 'btn-primary'"
            @click="editCustomerMode = !editCustomerMode"
          >
            <span v-if="!editCustomerMode">Uredi</span>
            <span v-else>Odbaci</span>
          </button>
        </div>
      </div>
    </div>
    <div :class="editCustomerMode ? 'col-md-4' : 'col-md-8'">
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
                  'bg-danger': attendedPercentage < 80,
                }"
                :style="{
                  width: attendedPercentage + '%',
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
                'alert-danger': attendedPercentage < 80,
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
import {
  defineComponent, computed, ref, reactive,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import CustomerEdit from '@/components/customers/CustomerEdit.vue';

export default defineComponent({
  components: {
    CustomerEdit,
  },
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const customerAppointments = computed(() => store.state.shared.selectedCustomerAppointments);
    const editCustomerMode = ref(false);
    const formData = reactive(JSON.parse(JSON.stringify(props.customer)));

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

    // eslint-disable-next-line max-len
    const totalEarnings = computed(() => customerAppointments.value.reduce((total, appointment): number => total + appointment.service.price, 0));

    async function save() {
      await store.dispatch(ActionTypes.UPDATE_CUSTOMER, formData);
    }

    return {
      customerAppointments,
      attendedPercentage,
      totalEarnings,
      editCustomerMode,
      formData,
      save,
    };
  },
});
</script>
