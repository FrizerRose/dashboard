<template>
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
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import DashboardHeaderControls from './DashboardHeaderControls.vue';
import WelcomeBack from './WelcomeBack.vue';
import TotalSales from './TotalSales.vue';
import PendingOrders from './PendingOrders.vue';
import TotalRevenue from './TotalRevenue.vue';
import Sales from './Sales.vue';
import DailyFeed from './DailyFeed.vue';
import Calendar from './Calendar.vue';
import WeeklySales from './WeeklySales.vue';
import Appointments from './Appointments.vue';
import UpcomingAppointments from './UpcomingAppointments.vue';

export default defineComponent({
  components: {
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
    return {
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
    };
  },
});
</script>
