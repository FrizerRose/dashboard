<template>
  <Dashboard>
    <template #header>
      Česta pitanja
    </template>
    <template #body>
      <main class="content p-0">
        <div class="container-fluid p-0">
          <div
            v-if="allFaq"
            class="faq-main-wrap"
          >
            <div class="faq-main">
              <div
                v-for="(pair, index) in getFaqByCategory('Kalendar')"
                :id="'pitanje-' + pair.id"
                :key="index"
                class="faq-main__cards"
              >
                <div
                  class="card mb-0"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title">
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
                :id="'pitanje-' + pair.id"
                :key="index"
                class="faq-main__cards"
              >
                <div
                  class="card mb-0"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title">
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
                :id="'pitanje-' + pair.id"
                :key="index"
                class="faq-main__cards"
              >
                <div
                  class="card mb-0"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title">
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
                :id="'pitanje-' + pair.id"
                :key="index"
                class="faq-main__cards"
              >
                <div
                  class="card mb-0"
                >
                  <div class="card-header pb-0 help-header">
                    <h5 class="card-title">
                      Općenito
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
              <div class="faq-main__extra-notice pt-4">
                <div class="card mb-0 alert-primary">
                  <div class="card-body py-0">
                    <h3 class="mt-3 mb-4">
                      Dodatna pitanja?
                    </h3>
                    <p>
                      Za ostala pitanja javite nam se
                      <router-link
                        to="/kontakt"
                      >
                        direktno
                      </router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="faq-aside">
              <ul class="faq-aside__list nav">
                <li
                  v-for="(pair, index) in getFaqByCategory('Kalendar')"
                  :key="index"
                  class="faq-aside__item mb-1"
                >
                  <a
                    :href="'#pitanje-' + pair.id"
                    class="nav-link"
                  >{{ pair.question }}</a>
                </li>
                <li
                  v-for="(pair, index) in getFaqByCategory('Termini')"
                  :key="index"
                  class="faq-aside__item mb-1"
                >
                  <a
                    :href="'#pitanje-' + pair.id"
                    class="nav-link"
                  >{{ pair.question }}</a>
                </li>
                <li
                  v-for="(pair, index) in getFaqByCategory('Notifikacije')"
                  :key="index"
                  class="faq-aside__item mb-1"
                >
                  <a
                    :href="'#pitanje-' + pair.id"
                    class="nav-link"
                  >{{ pair.question }}</a>
                </li>
                <li
                  v-for="(pair, index) in getFaqByCategory('')"
                  :key="index"
                  class="faq-aside__item mb-1"
                >
                  <a
                    :href="'#pitanje-' + pair.id"
                    class="nav-link"
                  >{{ pair.question }}</a>
                </li>
              </ul>
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
  .faq-main-wrap {
    @media (max-width: 767px) {
    }
    @media (min-width: 768px) {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .faq-main {
    @media (max-width: 767px) {
      height: 60vh;
      overflow-y: auto;
      // margin-top: 4.25rem;
      padding: 1.5rem 1.5rem 60vh;
      position: relative;
      width: 100%;
    }
    @media (min-width: 768px) {
      padding: 1.5rem;
      padding-bottom: 80vh;
      width: 75%;
    }
  }
  .faq-main__cards {
    padding-top: 1.5rem;
  }

  .faq-aside {
    @media (max-width: 767px) {
      position: fixed;
      left: auto;
      top: 60vh;
      background: white;
      width: 100%;
      height: 40vh;
      overflow-y: auto;
      padding-top: 1rem;
      padding-bottom: 3rem;
    }
    @media (min-width: 768px) {
      position: sticky;
      top: 1rem;
      height: 100%;
      width: 25%;
      display: flex;
      flex-direction: column;
    }

    &__list {
      @media (min-width: 768px) {
        margin-top: 2rem;
      }
    }

    &__item {
      width: 100%;
    }

    &__item a {
      color: black;
      @media (min-width: 768px) {
        &:hover {
          background-color: white;
        }
      }
    }
  }
</style>
