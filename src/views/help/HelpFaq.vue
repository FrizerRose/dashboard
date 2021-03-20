<template>
  <Dashboard>
    <template #header>
      Česta pitanja
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div
            v-if="allFaq"
            class="row"
          >
            <div class="col-9">
              <div
                v-for="(pair, index) in getFaqByCategory('Kalendar')"
                :key="index"
              >
                <div
                  :id="'pitanje-' + pair.id"
                  class="card"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title text-end">
                      Kalendar
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
              <div
                v-for="(pair, index) in getFaqByCategory('Termini')"
                :key="index"
              >
                <div
                  :id="'pitanje-' + pair.id"
                  class="card"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title text-end">
                      Termini
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
              <div
                v-for="(pair, index) in getFaqByCategory('Notifikacije')"
                :key="index"
              >
                <div
                  :id="'pitanje-' + pair.id"
                  class="card"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title text-end">
                      Notifikacije
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
              <div
                v-for="(pair, index) in getFaqByCategory('')"
                :key="index"
              >
                <div
                  :id="'pitanje-' + pair.id"
                  class="card"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title text-end">
                      Ostalo
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
            <div
              class="col-3"
            >
              <div class="c-sidebar-index">
                <p
                  v-for="(pair, index) in allFaq"
                  :key="index"
                  style="cursor: pointer"
                  class="mb-1"
                  @click="scrollTo(pair)"
                >
                  > {{ pair.question }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 700px">
          <span>Za ostala pitanja javite nam se </span>
          <router-link
            to="/kontakt"
          >
            direktno
          </router-link>
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
import Faq from '@/types/faq';

export default defineComponent({
  components: {
    Dashboard,
  },
  setup() {
    const store = useStore();

    const allFaq = computed(() => store.state.faq.faq);

    store.dispatch(ActionTypes.FETCH_FAQ, {});

    function scrollTo(pair: Faq) {
      const element = document.getElementById(`pitanje-${pair.id}`);
      if (element) {
        element.scrollIntoView(true);
      }
    }

    function getFaqByCategory(category: string) {
      if (allFaq.value) {
        const faqInCategory = allFaq.value.filter((faq) => faq.category === category);
        return faqInCategory.sort((a, b) => a.order - b.order);
      }
      return [];
    }

    return {
      allFaq,
      getFaqByCategory,
      scrollTo,
    };
  },
});
</script>

<style lang="scss" scoped>
  .c-sidebar-index {
    position: sticky;
    top: 1rem;
  }
</style>
