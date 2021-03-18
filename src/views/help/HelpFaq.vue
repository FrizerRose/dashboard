<template>
  <Dashboard>
    <template #header>
      Česta pitanja
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div v-if="faq">
            <div
              v-for="(pair, index) in faq"
              :key="index"
            >
              <h1>{{ pair.question }}</h1>
              <h3>{{ pair.answer }}</h3>
            </div>
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';

export default defineComponent({
  components: {
    Dashboard,
  },
  setup() {
    const store = useStore();

    const faq = computed(() => store.state.faq.faq);

    store.dispatch(ActionTypes.FETCH_FAQ, {});

    return {
      faq,
    };
  },
});
</script>
