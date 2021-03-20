<template>
  <Dashboard>
    <template #header>
      Postavke
    </template>
    <template #body>
      <main class="content-X postavke-content">
        <div
          class="container-fluid p-0"
        >
          <div class="postavke-nav">
            <ul
              class="postavke-nav__list"
              role="tablist"
            >
              <li
                class="postavke-nav__list-item"
                @click="currentTab = 'CompanyDetails'"
              >
                <a
                  :class="{'postavke-nav__link' : true, 'active': currentTab === 'CompanyDetails'}"
                  href="#tab-1"
                  data-bs-toggle="tab"
                  role="tab"
                >
                  <span class="postavke-nav__icon">
                    <span class="fa fa-building" />
                  </span>
                  <span class="postavke-nav__label">Podatci o firmi</span>
                </a>
              </li>
              <li
                class="postavke-nav__list-item"
                @click="currentTab = 'Orders'"
              >
                <a
                  :class="{'postavke-nav__link' : true, 'active': currentTab === 'Orders'}"
                  href="#tab-2"
                  data-bs-toggle="tab"
                  role="tab"
                >
                  <span class="postavke-nav__icon">
                    <span class="fa fa-user" />
                  </span>
                  <span class="postavke-nav__label">Narudžbe</span>
                </a>
              </li>
              <li
                class="postavke-nav__list-item"
                @click="currentTab = 'WorkingHours'"
              >
                <a
                  :class="{'postavke-nav__link' : true, 'active': currentTab === 'WorkingHours'}"
                  href="#tab-3"
                  data-bs-toggle="tab"
                  role="tab"
                >
                  <span class="postavke-nav__icon">
                    <span class="fa fa-clock" />
                  </span>
                  <span class="postavke-nav__label">Radno vrijeme</span>
                </a>
              </li>
              <li
                class="postavke-nav__list-item"
                @click="currentTab = 'Themes'"
              >
                <a
                  :class="{'postavke-nav__link' : true, 'active': currentTab === 'Themes'}"
                  href="#tab-4"
                  data-bs-toggle="tab"
                  role="tab"
                >
                  <span class="postavke-nav__icon">
                    <span class="fa fa-palette" />
                  </span>
                  <span class="postavke-nav__label">Izgled</span>
                </a>
              </li>
              <li
                class="postavke-nav__list-item"
                @click="currentTab = 'Notifications'"
              >
                <a
                  :class="{'postavke-nav__link' : true, 'active': currentTab === 'Notifications'}"
                  href="#tab-5"
                  data-bs-toggle="tab"
                  role="tab"
                >
                  <span class="postavke-nav__icon">
                    <span class="fa fa-bell" />
                  </span>
                  <span class="postavke-nav__label">Notifikacije</span>
                </a>
              </li>
            </ul>
          </div>
          <div
            class="postavke-main"
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
                  <SettingsWorkingHours v-if="currentTab === 'WorkingHours'" />
                </div>
                <div
                  id="tab-4"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <SettingsThemes v-if="currentTab === 'Themes'" />
                </div>
                <div
                  id="tab-5"
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

<style lang="scss" scoped>
.postavke-content {
  flex: 1;
  background-color: var(--bs-light);
}

.postavke-nav {
  @media (max-width: 575px) {
      position: fixed;
      bottom: 0;
      left: 0;
      background: var(--bs-light);
      z-index: 10;
      overflow: hidden;
      overflow-x: auto;
      width: 100%;
  }
  @media (min-width: 576px) and (max-width: 1199px) {
      background: var(--bs-light);
      overflow: hidden;
      overflow-x: auto;
      width: 100%;
  }
  @media (min-width: 1200px) {
    display: inline-block;
    width: 25%;
    vertical-align: top;
  }

  &__list {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    @media (max-width: 575px) {
      white-space: nowrap;
      display: flex;
    }
    @media (min-width: 576px) and (max-width: 1199px) {
      white-space: nowrap;
      display: flex;
    }
    @media (min-width: 1200px) {
      margin-top: 2rem;
    }
  }

  &__list-item {
    @media (max-width: 575px) {
      // display: inline-block;
      // white-space: nowrap;
      // flex: 0 0 auto;
      // min-width: 30%;
      flex: 0 0 30%;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    color: var(--bs-dark);

    @media (max-width: 575px) {
      padding: 0 1rem;
    }
    @media (min-width: 576px) {
      padding: 1rem 2rem;
    }
    @media (max-width: 1199px) {
      flex-direction: column;
    }
    @media (min-width: 1200px) {
      padding: 0.5rem 0.75rem;
    }

    &:hover, &.active {
      background-color: white;
    }
  }

  &__icon {
    padding: 0.5em 1em;
    font-size: 1rem;
  }
}

//

.postavke-main {
  @media (max-width: 575px) {
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 1200px) {
    display: inline-block;
    width: 75%;
  }
}
</style>
