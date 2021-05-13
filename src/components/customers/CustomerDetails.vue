<template>
  <div class="card">
    <div class="card-body">
      <!-- klijent je odabran -->
      <div v-if="customer.name">
        <div>
          <div class="row">
            <div class="col-xxl-6">
              <table class="table responsive-font-size table-striped table-row-expandable">
                <tbody>
                  <tr>
                    <td><strong>Ime</strong></td>
                    <td class="text-end">
                      {{ customer.name ? customer.name : 'Nije unešen' }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>E-mail</strong></td>
                    <td class="text-end">
                      {{ customer.email ? customer.email : 'Nije unešen' }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Mobitel</strong></td>
                    <td class="text-end">
                      {{ customer.phone ? customer.phone : 'Nije unešen' }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Ukupna zarada od klijenta</strong>
                    </td>
                    <td class="text-end">
                      {{ totalEarnings }} kn
                    </td>
                  </tr>
                  <tr
                    v-if="customerAppointments.length"
                  >
                    <td><strong>Prosječna vrijednost dolaska</strong></td>
                    <td class="text-end">
                      {{ Math.floor(totalEarnings / customerAppointments.length) }} kn
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Bilješka</strong></td>
                    <td class="text-end">
                      {{ customer.notes ? customer.notes : 'Nema bilješke' }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                v-if="!editCustomerMode"
                class="btn responsive-btn btn-primary mb-3"
                @click="editCustomerMode = true"
              >
                <span>Uredi</span>
              </button>

              <button
                v-if="editCustomerMode"
                class="btn responsive-btn btn-danger"
                @click="editCustomerMode = false"
              >
                <span>Odbaci</span>
              </button>
            </div>
            <div class="col-xxl-6">
              <div v-if="customer.name && attendedPercentage !== null">
                <!-- alert box -->

                <div class="position-relative">
                  <div class="progress override-place-in-alert">
                    <div
                      role="progressbar"
                      class="progress-bar"
                      :class="{
                        'bg-success': attendedPercentage === 100,
                        'bg-warning': attendedPercentage < 100 && attendedPercentage >= 80,
                        'bg-danger': attendedPercentage < 80,
                      }"
                      :style="{width: attendedPercentage + '%'}"
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
                <!-- ends alert box -->

                <div v-if="customerAppointments.length">
                  <table class="table responsive-font-size table-striped |-table-row-expandable">
                    <tbody>
                      <tr
                        v-for="appointment in customerAppointments.slice(0,5)"
                        :key="appointment.id"
                      >
                        <td>{{ appointment.date }}</td>
                        <td>{{ appointment.time }}</td>
                        <td>{{ appointment.service.name }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  Klijent nema rezerviranih termina.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- klijent nije odabran -->
      </div>
      <!-- klijent nije odabran -->
      <div
        v-else
        class="alert alert-warning mb-0"
      >
        <div class="alert-message">
          Odaberite klijenta
        </div>
      </div>
    </div>
  </div>

  <!-- edit box -->

  <div v-if="editCustomerMode">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-xxl-6">
            <CustomerEdit
              v-if="editCustomerMode"
              :customer-for-edit="customer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- nema ni jednog klijenta i nema termina -->
  <div
    v-if="!customerAppointments"
    class="alert alert-warning mb-0"
  >
    <div class="card">
      <div class="card-body">
        <div class="alert-message">
          Nema klijenata.
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
