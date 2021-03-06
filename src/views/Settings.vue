<template>
  <Dashboard>
    <main class="content">
      <div
        v-if="selectedCompany"
        class="container-fluid p-0"
      >
        <div class="row">
          <div class="col-2">
            <div class="tab">
              <ul
                class="nav nav-tabs flex-column"
                role="tablist"
              >
                <li
                  class="nav-item"
                  @click="currentTab = 'CompanyDetails'"
                >
                  <a
                    class="nav-link active"
                    href="#tab-1"
                    data-bs-toggle="tab"
                    role="tab"
                  >Podatci o firmi</a>
                </li>
                <li
                  class="nav-item"
                  @click="currentTab = 'Orders'"
                >
                  <a
                    class="nav-link"
                    href="#tab-2"
                    data-bs-toggle="tab"
                    role="tab"
                  >Narudžbe</a>
                </li>
                <li
                  class="nav-item"
                  @click="currentTab = 'PersonalDetails'"
                >
                  <a
                    class="nav-link"
                    href="#tab-3"
                    data-bs-toggle="tab"
                    role="tab"
                  >Korisnički podaci</a>
                </li>
                <li
                  class="nav-item"
                  @click="currentTab = 'WorkingHours'"
                >
                  <a
                    class="nav-link"
                    href="#tab-4"
                    data-bs-toggle="tab"
                    role="tab"
                  >Radno vrijeme</a>
                </li>
                <li
                  class="nav-item"
                  @click="currentTab = 'Themes'"
                >
                  <a
                    class="nav-link"
                    href="#tab-5"
                    data-bs-toggle="tab"
                    role="tab"
                  >Izgled</a>
                </li>
                <li
                  class="nav-item"
                  @click="currentTab = 'Notifications'"
                >
                  <a
                    class="nav-link"
                    href="#tab-6"
                    data-bs-toggle="tab"
                    role="tab"
                  >Notifikacije</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="selectedCompany"
            class="col-10"
          >
            <div class="tab">
              <div class="tab-content">
                <div
                  id="tab-1"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsCompanyDetails v-if="currentTab === 'CompanyDetails'" />
                </div>
                <div
                  id="tab-2"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsOrders v-if="currentTab === 'Orders'" />
                </div>
                <div
                  id="tab-3"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsPersonalDetails v-if="currentTab === 'PersonalDetails'" />
                </div>
                <div
                  id="tab-4"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsWorkingHours v-if="currentTab === 'WorkingHours'" />
                </div>
                <div
                  id="tab-5"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsThemes v-if="currentTab === 'Themes'" />
                </div>
                <div
                  id="tab-6"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsNotifications v-if="currentTab === 'Notifications'" />
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
import { defineComponent, ref, computed } from 'vue';
import { useStore } from '@/store';
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

  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const currentTab = ref('CompanyDetails');

    return {
      selectedCompany,
      currentTab,
    };
  },
});
</script>
