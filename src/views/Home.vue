<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        <DashboardHeaderControls />
        <div class="row">
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
          <div class="col-12 col-lg-6 col-xl-4 d-flex">
            <Calendar />
          </div>
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
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Dashboard from '@/components/layout/Dashboard.vue';
import DashboardHeaderControls from '../components/DashboardHeaderControls.vue';
import WelcomeBack from '../components/WelcomeBack.vue';
import TotalSales from '../components/TotalSales.vue';
import PendingOrders from '../components/PendingOrders.vue';
import TotalRevenue from '../components/TotalRevenue.vue';
import Sales from '../components/Sales.vue';
import DailyFeed from '../components/DailyFeed.vue';
import Calendar from '../components/Calendar.vue';
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
    Calendar,
    WeeklySales,
    Appointments,
    UpcomingAppointments,
  },
  setup() {
    const route = useRoute();
    const routeName = computed(() => route.name);

    return {
      routeName,
    };
  },
});
</script>
