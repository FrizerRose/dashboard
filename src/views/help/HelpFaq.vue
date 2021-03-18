<template>
  <Dashboard>
    <template #header>
      Česta pitanja
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div
            v-if="faq"
            class="row"
          >
            <div
              v-for="(pair, index) in faq"
              :key="index"
              class="col-12"
            >
              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title text-end">
                    Kategorija pitanja
                  </h5>
                </div>
                <div class="card-body py-0">
                  <h3 class="mt-3 mb-4">
                    {{ pair.question }}
                  </h3>
                  <p>{{ pair.answer }}</p>
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
