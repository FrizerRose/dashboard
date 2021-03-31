<template>
  <Dashboard>
    <template #header>
      Pomoć
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-12 col-md-6 col-xxl-8">
              <div class="card alert-primary">
                <div class="card-header pb-0 alert-primary">
                  <h5 class="card-title">
                    Tutorial
                  </h5>
                </div>
                <div class="card-body">
                  <p>Ponovo pokrenite tutorial da vas provede kroz stranicu.</p>
                  <div class="text-end">
                    <button
                      class="btn responsive-btn btn-primary mt-4"
                      @click="restartTutorial()"
                    >
                      Pokreni tutorial
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xxl-4">
              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    Česta pitanja
                  </h5>
                </div>
                <div class="card-body">
                  <p>Pronađite odgovore na najčešće postavljena pitanja.</p>
                  <div class="text-end">
                    <router-link
                      to="/cesta-pitanja"
                      class="btn responsive-btn btn-primary mt-4"
                    >
                      Prikaži
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    Kontakt
                  </h5>
                </div>
                <div class="card-body">
                  <p>Za ostala pitanja javite nam se direktno.</p>
                  <div class="text-end">
                    <router-link
                      to="/kontakt"
                      class="btn responsive-btn btn-primary mt-4"
                    >
                      Otvori
                    </router-link>
                  </div>
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
