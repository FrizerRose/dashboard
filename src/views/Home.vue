<template>
  <Dashboard>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-12 col-md-6 col-xxl-9">
              <CalendarHome v-if="reservedAppointments" />
            </div>
            <div
              v-if="stats"
              class="col-12 col-md-6 col-xxl-3"
            >
              <StatCard
                title="Narudžbi prošlih 7 dana"
                :figure="stats.lastWeekAppointmentCount"
              />
              <StatCard
                title="Promet prošlih 7 dana"
                :figure="stats.lastWeekAppointmentRevenue"
                :is-revenue="true"
              />
              <StatCard
                title="Narudžbi sljedećih 7 dana"
                :figure="stats.nextWeekAppointmentCount"
                :percentage="Math.floor((stats.nextWeekAppointmentCount / stats.lastWeekAppointmentCount) * 100)"
              />
              <StatCard
                title="Promet sljedećih 7 dana"
                :figure="stats.nextWeekAppointmentRevenue"
                :percentage="Math.floor((stats.nextWeekAppointmentRevenue / stats.lastWeekAppointmentRevenue) * 100)"
                :is-revenue="true"
              />
              <div class="qr-code-button-wrap">
                <div class="row">
                  <div class="col-12">
                    <button
                      class="btn btn-lg btn-secondary w-100"
                      @click="fetchQrCode()"
                    >
                      Prikaži QR Kod
                    </button>
                  </div>
                  <div class="col-12">
                    <img
                      v-if="qrCode"
                      :src="qrCode"
                      alt="qr kod"
                    >
                  </div>
                </div>
              </div>
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
import CalendarHome from '../components/calendar/CalendarHome.vue';
import StatCard from '../components/StatCard.vue';

export default defineComponent({
  components: {
    Dashboard,
    CalendarHome,
    StatCard,
  },
  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);

    const route = useRoute();
    const routeName = computed(() => route.name);

    const qrCode = ref('');
    const stats = ref();

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

    async function fetchStats() {
      if (selectedCompany.value?.id) {
        stats.value = await store.dispatch(ActionTypes.FETCH_STATS, selectedCompany.value.id);
      }
    }

    watch(() => selectedCompany.value, (newCompany) => {
      if (newCompany?.id) {
        fetchAppointmentsOnToday();
        fetchStats();
      }
    });

    fetchAppointmentsOnToday();
    fetchStats();

    return {
      routeName,
      qrCode,
      fetchQrCode,
      reservedAppointments,
      stats,
    };
  },
});
</script>
