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
                <strong>Tražilica</strong>
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
              class="customers-nav__list"
            >
              <li
                v-for="customer in shownCustomers"
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
              v-if="selectedCustomer"
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
    const selectedCustomer = ref({ ...customers.value[0] });
    const customerName = ref('');
    const shownCustomers = ref([] as Customer[]);

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
      let timer: number;
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

    return {
      selectedCustomer,
      selectCustomer,
      customers,
      customerName,
      customerSearchInputChange,
      shownCustomers,
    };
  },
});
</script>

<style lang="scss" scoped>
.customer-details {
  margin-top: 2rem;
  padding: 0 1.5rem 1.5rem;
}
.customers-nav {
  position: relative;
  margin-top: 2rem;
  padding: 0 1.5rem 1.5rem;

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
