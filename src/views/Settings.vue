<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-12">
            <div class="tab">
              <ul
                class="nav nav-tabs"
                role="tablist"
              >
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    href="#tab-1"
                    data-bs-toggle="tab"
                    role="tab"
                  >Podatci o firmi</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#tab-2"
                    data-bs-toggle="tab"
                    role="tab"
                  >Narudžbe</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#tab-3"
                    data-bs-toggle="tab"
                    role="tab"
                  >Korisnički podaci</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#tab-4"
                    data-bs-toggle="tab"
                    role="tab"
                  >Radno vrijeme</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#tab-5"
                    data-bs-toggle="tab"
                    role="tab"
                  >Izgled</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#tab-6"
                    data-bs-toggle="tab"
                    role="tab"
                  >Notifikacije</a>
                </li>
              </ul>
              <div class="tab-content">
                <div
                  id="tab-1"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsCompanyDetails />
                </div>
                <div
                  id="tab-2"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsOrders />
                </div>
                <div
                  id="tab-3"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsPersonalDetails />
                </div>
                <div
                  id="tab-4"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsWorkingHours />
                </div>
                <div
                  id="tab-5"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsThemes />
                </div>
                <div
                  id="tab-6"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsNotifications />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';
import SettingsCompanyDetails from '@/components/settings/SettingsCompanyDetails.vue';
import SettingsPersonalDetails from '@/components/settings/SettingsPersonalDetails.vue';
import SettingsNotifications from '@/components/settings/SettingsNotifications.vue';
import SettingsThemes from '@/components/settings/SettingsThemes.vue';
import SettingsWorkingHours from '@/components/settings/SettingsWorkingHours.vue';
import SettingsOrders from '@/components/settings/SettingsOrders.vue';

export default defineComponent({
  components: {
    Dashboard,
    SettingsCompanyDetails,
    SettingsPersonalDetails,
    SettingsNotifications,
    SettingsThemes,
    SettingsWorkingHours,
    SettingsOrders,
  },

  // setup() {

  // },
});
</script>
