<template>
  <Dashboard>
    <template #header>
      Postavke
    </template>
    <template #body>
      <main
        id="settingsContainer"
        class="content p-0 responsive-content"
      >
        <div class="container-fluid p-0">
          <div class="responsive-nav">
            <ul
              class="responsive-nav__list"
              role="tablist"
            >
              <li
                class="responsive-nav__list-item"
                @click="currentTab = 'CompanyDetails'"
              >
                <button
                  :class="{'responsive-nav__link' : true, 'active': currentTab === 'CompanyDetails'}"
                  role="tab"
                >
                  <span class="responsive-nav__icon">
                    <span class="fa fa-building" />
                  </span>
                  <span class="responsive-nav__label">Podatci o poslovnom subjektu</span>
                </button>
              </li>
              <li
                class="responsive-nav__list-item"
                @click="currentTab = 'Orders'"
              >
                <button
                  :class="{'responsive-nav__link' : true, 'active': currentTab === 'Orders'}"
                  role="tab"
                >
                  <span class="responsive-nav__icon">
                    <span class="fa fa-user" />
                  </span>
                  <span class="responsive-nav__label">Narudžbe</span>
                </button>
              </li>
              <li
                class="responsive-nav__list-item"
                @click="currentTab = 'WorkingHours'"
              >
                <button
                  :class="{'responsive-nav__link' : true, 'active': currentTab === 'WorkingHours'}"
                  role="tab"
                >
                  <span class="responsive-nav__icon">
                    <span class="fa fa-clock" />
                  </span>
                  <span class="responsive-nav__label">Radno vrijeme</span>
                </button>
              </li>
              <li
                class="responsive-nav__list-item"
                @click="currentTab = 'Themes'"
              >
                <button
                  :class="{'responsive-nav__link' : true, 'active': currentTab === 'Themes'}"
                  role="tab"
                >
                  <span class="responsive-nav__icon">
                    <span class="fa fa-palette" />
                  </span>
                  <span class="responsive-nav__label">Izgled</span>
                </button>
              </li>
              <li
                class="responsive-nav__list-item"
                @click="currentTab = 'Notifications'"
              >
                <button
                  :class="{'responsive-nav__link' : true, 'active': currentTab === 'Notifications'}"
                  role="tab"
                >
                  <span class="responsive-nav__icon">
                    <span class="fa fa-bell" />
                  </span>
                  <span class="responsive-nav__label">Notifikacije</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="responsive-main">
            <div class="tab">
              <div class="tab-content">
                <div
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsCompanyDetails v-if="currentTab === 'CompanyDetails'" />
                </div>
                <div
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsOrders v-if="currentTab === 'Orders'" />
                </div>
                <div
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsWorkingHours v-if="currentTab === 'WorkingHours'" />
                </div>
                <div
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsThemes v-if="currentTab === 'Themes'" />
                </div>
                <div
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsNotifications v-if="currentTab === 'Notifications'" />
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
import { defineComponent, ref } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';
import SettingsCompanyDetails from '@/components/settings/SettingsCompanyDetails.vue';
import SettingsNotifications from '@/components/settings/SettingsNotifications.vue';
import SettingsThemes from '@/components/settings/SettingsThemes.vue';
import SettingsWorkingHours from '@/components/settings/SettingsWorkingHours.vue';
import SettingsOrders from '@/components/settings/SettingsOrders.vue';

export default defineComponent({
  components: {
    Dashboard,
    SettingsCompanyDetails,
    SettingsNotifications,
    SettingsThemes,
    SettingsWorkingHours,
    SettingsOrders,
  },

  setup() {
    const currentTab = ref('CompanyDetails');

    return {
      currentTab,
    };
  },
});
</script>
