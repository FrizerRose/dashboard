<template>
  <Dashboard>
    <template #header>
      Korisnici
    </template>
    <template #body>
      <main class="content-X postavke-content">
        <div
          v-if="customers"
          class="container-fluid p-0"
        >
          <!-- TODO: move customer list to a separate component, adjust search -->
          <div class="postavke-nav">
            <ul
              class="postavke-nav__list"
              role="tablist"
            >
              <li class="postavke-nav__list-item">
                <div class="postavke-nav__link active">
                  <input
                    id="oldCustomerName"
                    v-model="oldCustomerName"
                    placeholder="Počnite upisivati ime klijenta"
                    type="text"
                    name="oldCustomerName"
                    autocomplete="off"
                    class="form-control"
                    @input="oldCustomerInputChange()"
                  >
                </div>
              </li>
              <li class="postavke-nav__list-item">
                <a
                  v-for="customer in oldCustomerCandidates"
                  :key="customer.id"
                  class="postavke-nav__link active"
                  href="#tab-1"
                  data-bs-toggle="tab"
                  role="tab"
                  @click="selectCustomer(customer)"
                >
                  <span class="postavke-nav__icon">
                    <span class="fa fa-user" />
                  </span>
                  <span class="postavke-nav__label">{{ customer.name }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="postavke-main">
            <div class="tab">
              <div class="tab-content">
                <div
                  id="tab-1"
                  class="tab-pane active"
                  role="tabpanel"
                >
                  <CustomerDetails
                    v-if="selectedCustomer"
                    :customer="selectedCustomer"
                  />
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
import { defineComponent, ref, computed } from 'vue';
import { useStore } from '@/store';
import Dashboard from '@/components/layout/Dashboard.vue';
import CustomerDetails from '@/components/customers/CustomerDetails.vue';
import ActionTypes from '@/store/action-types';
import Customer from '@/types/customer';

export default defineComponent({
  components: {
    Dashboard,
    CustomerDetails,
  },

  setup() {
    const store = useStore();
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const customers = computed(() => store.state.customer.customers);
    const selectedCustomer = ref({ ...customers.value[0] });
    const oldCustomerName = ref('');
    let oldCustomerCandidates = ref([] as Customer[]);

    if (customers.value.length) {
      oldCustomerCandidates = JSON.parse(JSON.stringify(customers.value));
    }

    async function selectCustomer(customer: Customer) {
      try {
        await store.dispatch(ActionTypes.FETCH_APPOINTMENT_BY_CUSTOMER, customer.id);
      } catch {
        // oldCustomerCandidates.value = [];
      }
      selectedCustomer.value = customer;
    }

    async function fetchCustomersByName() {
      try {
        const response = await store.dispatch(ActionTypes.FETCH_CUSTOMERS_BY_NAME, {
          name: oldCustomerName.value,
          company: selectedCompany.value?.id,
        });
        console.log(response);
        oldCustomerCandidates.value = response;
      } catch {
        oldCustomerCandidates.value = [];
      }
    }
    const debounce = (func: Function, timeout = 300) => {
      let timer: number;
      return (...args: unknown[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    };
    const oldCustomerInputChange = debounce(() => fetchCustomersByName());

    return {
      selectedCustomer,
      selectCustomer,
      customers,
      oldCustomerName,
      oldCustomerInputChange,
      oldCustomerCandidates,
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
    // @media (min-width: 1200px) {
    //   margin-top: 2rem;
    // }
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
