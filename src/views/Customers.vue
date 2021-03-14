<template>
  <Dashboard>
    <main class="content-X postavke-content">
      <div
        v-if="selectedCompany"
        class="container-fluid p-0"
      >
        <div class="postavke-nav">
          <CustomersSearch />
          <ul
            class="postavke-nav__list"
            role="tablist"
          >
            <li
              class="postavke-nav__list-item"
              @click="currentTab = 'CompanyDetails'"
            >
              <a
                class="postavke-nav__link active"
                href="#tab-1"
                data-bs-toggle="tab"
                role="tab"
              >
                <span class="postavke-nav__icon">
                  <span class="fa fa-user" />
                </span>
                <span class="postavke-nav__label">Customer name</span>
              </a>
            </li>
          </ul>
        </div>
        <div
          v-if="selectedCompany"
          class="postavke-main"
        >
          <div class="tab">
            <div class="tab-content">
              <div
                id="tab-1"
                class="tab-pane active"
                role="tabpanel"
              >
                <CustomerDetails v-if="currentTab === 'CompanyDetails'" />
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
import CustomerDetails from '@/components/customers/CustomerDetails.vue';
import CustomersSearch from '@/components/customers/CustomersSearch.vue';

export default defineComponent({
  components: {
    Dashboard,
    CustomerDetails,
    CustomersSearch,
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

<style lang="scss" scoped>
.postavke-content {
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

    &:hover,
    &.active {
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
