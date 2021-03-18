<template>
  <div class="postavke-nav">
    <ul
      class="postavke-nav__list"
      role="tablist"
    >
      <li class="postavke-nav__list-item">
        <div class="postavke-nav__link active">
          <CustomersSearch />
        </div>
      </li>
      <li class="postavke-nav__list-item">
        <a
          v-for="customer in customers"
          :key="customer.id"
          class="postavke-nav__link active"
          href="#tab-1"
          data-bs-toggle="tab"
          role="tab"
          @click="selectedCustomer = customer"
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from '@/store';
import CustomerDetails from '@/components/customers/CustomerDetails.vue';

export default defineComponent({
  components: {
    CustomerDetails,
  },

  setup() {
    const store = useStore();

    const customers = computed(() => store.state.customer.customers);
    const reservedAppointments = computed(() => store.state.shared.reservedAppointments);
    console.log(customers.value[0]);
    const selectedCustomer = ref({ ...customers.value[0] });

    return {
      selectedCustomer,
      reservedAppointments,
      customers,
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
