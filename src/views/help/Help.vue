<template>
  <Dashboard>
    <template #header>
      Pomoć
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-6">
              <div class="card">
                <div class="card-header pb-0 d-flex justify-content-center">
                  <h5 class="card-title">
                    Česta pitanja
                  </h5>
                </div>
                <div class="card-body">
                  Pronađite odgovore na najčešće postavljena pitanja.
                  <br>
                  <router-link to="/cesta-pitanja">
                    Kreni
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card">
                <div class="card-header pb-0 d-flex justify-content-center">
                  <h5 class="card-title">
                    Kontakt
                  </h5>
                </div>
                <div class="card-body">
                  Za ostala pitanja javite nam se direktno.
                  <br>
                  <router-link to="/cesta-pitanja">
                    Kreni
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="card col-4 offset-4">
              <div class="card-header pb-0 d-flex justify-content-center">
                <h5 class="card-title">
                  Tutorial
                </h5>
              </div>
              <div class="card-body">
                Ponovo pokrenite tutorial da vas provede kroz stranicu.
                <br>
                <button
                  class="btn btn-primary"
                  @click="restartTutorial()"
                >
                  Kreni
                </button>
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
    const selectedCompany = computed(() => store.state.shared.selectedCompany);

    async function restartTutorial() {
      const updatedCompany = JSON.parse(JSON.stringify(selectedCompany.value));
      updatedCompany.preferences.isTutorialFinished = false;

      await store.dispatch(ActionTypes.UPDATE_COMPANY, updatedCompany);
    }

    return {
      restartTutorial,
    };
  },
});
</script>
