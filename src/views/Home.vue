<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        <DashboardHeaderControls />
        <div class="row">
          <div class="col-12 col-sm-6 col-xxl d-flex">
            <button
              class="btn"
              @click="fetchQrCode()"
            >
              Prikaži QR kod
            </button>
            <img
              v-if="qrCode"
              :src="qrCode"
              alt="qrCode"
            >
          </div>
          <div class="col-12 col-sm-6 col-xxl d-flex">
            <WelcomeBack />
          </div>
          <div class="col-12 col-sm-6 col-xxl d-flex">
            <TotalSales />
          </div>
          <div class="col-12 col-sm-6 col-xxl d-flex">
            <PendingOrders />
          </div>
          <div class="col-12 col-sm-6 col-xxl d-flex">
            <TotalRevenue />
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-lg-8 d-flex">
            <Sales />
          </div>
          <div class="col-12 col-lg-4 d-flex">
            <DailyFeed />
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-xl-4 d-none d-xl-flex">
            <WeeklySales />
          </div>
          <div class="col-12 col-lg-6 col-xl-4 d-flex">
            <Appointments />
          </div>
        </div>

        <UpcomingAppointments />
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Dashboard from '@/components/layout/Dashboard.vue';
import { useStore } from '@/store';
import DashboardHeaderControls from '../components/DashboardHeaderControls.vue';
import WelcomeBack from '../components/WelcomeBack.vue';
import TotalSales from '../components/TotalSales.vue';
import PendingOrders from '../components/PendingOrders.vue';
import TotalRevenue from '../components/TotalRevenue.vue';
import Sales from '../components/Sales.vue';
import DailyFeed from '../components/DailyFeed.vue';
import WeeklySales from '../components/WeeklySales.vue';
import Appointments from '../components/Appointments.vue';
import UpcomingAppointments from '../components/UpcomingAppointments.vue';

export default defineComponent({
  components: {
    Dashboard,
    DashboardHeaderControls,
    WelcomeBack,
    TotalSales,
    PendingOrders,
    TotalRevenue,
    Sales,
    DailyFeed,
    WeeklySales,
    Appointments,
    UpcomingAppointments,
  },
  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);

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

    return {
      routeName,
      qrCode,
      fetchQrCode,
    };
  },
});
</script>
