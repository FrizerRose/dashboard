<template>
  <Dashboard>
    <template #header>
      Klijenti
    </template>
    <template #body>
      <main class="content p-0 responsive-content">
        <div
          v-if="customers"
          class="container-fluid p-0"
        >
          <div class="customers-nav responsive-nav">
            <div class="customers-search">
              <label
                for="customerName"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Tražilica</span>
              </label>
              <input
                id="customerName"
                v-model="customerName"
                placeholder="Počnite upisivati ime klijenta"
                type="text"
                name="customerName"
                autocomplete="off"
                class="form-control responsive-form-control mb-3"
                @input="customerSearchInputChange()"
              >
            </div>
            <ul
              v-if="hasFetchedCustomers"
              class="customers-nav__list"
            >
              <li
                v-for="customer in shownCustomers.slice(0,5)"
                :key="customer.id"
                class=" responsive-nav__list-item"
              >
                <button
                  class="customers-search__results"
                  @click="selectCustomer(customer)"
                >
                  <span class="customers-search__result-label">{{ customer.name }}</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="customer-details responsive-main">
            <CustomerDetails
              :customer="selectedCustomer"
            />
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
    const selectedCustomer = ref({} as Customer);
    const customerName = ref('');
    const shownCustomers = ref([] as Customer[]);
    const hasFetchedCustomers = ref(false);

    if (customers.value.length) {
      shownCustomers.value = JSON.parse(JSON.stringify(customers.value));
    }

    async function selectCustomer(customer: Customer) {
      try {
        await store.dispatch(ActionTypes.FETCH_APPOINTMENT_BY_CUSTOMER, customer.id);
      } catch {
        // TODO: err
      }
      selectedCustomer.value = customer;
    }

    async function fetchCustomersByName() {
      try {
        hasFetchedCustomers.value = true;
        const response = await store.dispatch(ActionTypes.FETCH_CUSTOMERS_BY_NAME, {
          name: customerName.value,
          company: selectedCompany.value?.id,
        });
        shownCustomers.value = response;
      } catch {
        shownCustomers.value = JSON.parse(JSON.stringify(customers.value));
      }
    }
    const debounce = (func: Function, timeout = 300) => {
      let timer: any;
      return (...args: unknown[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    };
    const handleSearch = debounce(() => fetchCustomersByName());

    function customerSearchInputChange() {
      if (customerName.value === '') {
        shownCustomers.value = JSON.parse(JSON.stringify(customers.value));
      } else {
        handleSearch();
      }
    }

    fetchCustomersByName();

    return {
      selectedCustomer,
      selectCustomer,
      customers,
      customerName,
      customerSearchInputChange,
      shownCustomers,
      hasFetchedCustomers,
    };
  },
});
</script>

<style lang="scss" scoped>
.customer-details {
  padding: 1rem;
  @media (min-width: 1200px) {
    position: sticky;
    top: 3rem;
  }
}
.customers-nav {
  position: relative;
  padding: 1rem;

  @media (max-width: 575px) {
  }
  @media (min-width: 576px) {
  }
  @media (max-width: 1199px) {
  }
  @media (min-width: 1200px) {
  }
  &__list {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
}
.customers-search {
  &__results {
    background: white;
    border: none;
    width: 100%;
    text-align: left;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
