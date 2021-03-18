<template>
  <Dashboard>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-6">
              <CalendarHome v-if="reservedAppointments" />
            </div>
            <div class="col-6">
              bb
            </div>
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import Dashboard from '@/components/layout/Dashboard.vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import { getDateStringFromDate } from '@/helpers/time';
// import WelcomeBack from '../components/WelcomeBack.vue';
// import TotalSales from '../components/TotalSales.vue';
// import PendingOrders from '../components/PendingOrders.vue';
// import TotalRevenue from '../components/TotalRevenue.vue';
// import Sales from '../components/Sales.vue';
// import DailyFeed from '../components/DailyFeed.vue';
// import WeeklySales from '../components/WeeklySales.vue';
// import Appointments from '../components/Appointments.vue';
// import UpcomingAppointments from '../components/UpcomingAppointments.vue';
import CalendarHome from '../components/calendar/CalendarHome.vue';

export default defineComponent({
  components: {
    Dashboard,
    CalendarHome,
    // WelcomeBack,
    // TotalSales,
    // PendingOrders,
    // TotalRevenue,
    // Sales,
    // DailyFeed,
    // WeeklySales,
    // Appointments,
    // UpcomingAppointments,
  },
  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);

    const route = useRoute();
    const routeName = computed(() => route.name);

    const qrCode = ref('');

    async function fetchQrCode() {
      const bookingPageSlug = selectedCompany.value?.bookingPageSlug;
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingPageSlug}.frizerrose.info`);

      if (response.status === 200) {
        qrCode.value = response.url;
      }
    }

    function fetchAppointmentsOnToday() {
      if (selectedCompany.value?.id) {
        store.dispatch(ActionTypes.FETCH_APPOINTMENTS_ON_DATE, {
          companyID: selectedCompany.value.id,
          dateString: getDateStringFromDate(new Date()),
        });
      }
    }

    watch(() => selectedCompany.value, (newCompany) => {
      if (newCompany?.id) {
        fetchAppointmentsOnToday();
      }
    });

    fetchAppointmentsOnToday();

    return {
      routeName,
      qrCode,
      fetchQrCode,
      reservedAppointments,
    };
  },
});
</script>
