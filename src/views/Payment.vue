<template>
  <Dashboard>
    <template #header>
      Plaćanje
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-12 col-md-6 col-xxl-8">
              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    Plaćanje &ndash; Upute
                  </h5>
                </div>
                <div class="card-body">
                  <h5 class="h6 card-title">
                    Kolko placam, kad, zašto? Šta ak ne platim? -copy
                  </h5>
                  <p>
                    200kn iban jao copy treba
                  </p>
                  <hr>
                  <h5 class="h6 card-title">
                    Koje opcije za uplatu postoje?
                  </h5>
                  <p>
                    Uplate se vrše na naš račun, postoje dvije opcije. -copy<br><br>
                    <ul>
                      <li>
                        Klikom na <mark>"Prikaži QR kod"</mark> otvorite QR kod koji možete skenirati sa aplikacijom za mobilno bankarstvo,
                        te na taj način obaviti uplatu bez mogućnosti pogreške. <br><br>
                      </li>
                      <li>
                        Ručno izvršiti uplatu sa ovim informacijama:
                        <br>
                        (tablica, ili nekako stilizirano)
                        <br>
                        IBAN: HR1723600001101234565
                        <br>
                        Iznos: 200kn
                        <br>
                        Model: 00
                        <br>
                        Poziv na broj: 14-07
                        <br>
                      </li>
                    </ul>
                  </p>
                  <p class="mt-4">
                    Nakon što se izvršili uplatu, kliknite
                    <button class="btn btn-primary">
                      Ovdje
                    </button> kako bismo obradili vašu uplatu.
                    Na email će te dobiti potvrdu kada potvrdimo uplatu. Ako imate dodatnih pitanja,
                    <router-link
                      to="/kontakt"
                    >
                      kontaktirajte nas.
                    </router-link>
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-xxl-4">
              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    QR Kod
                  </h5>
                </div>
                <div class="card-body text-center">
                  <img
                    v-if="qrCodeIsVisible"
                    :src="qrCode"
                    alt="qr kod"
                  > <br>
                  <button
                    class="btn btn-lg btn-primary mt-2 me-2"
                    @click="showQrView()"
                  >
                    Prikaži QR kod
                  </button>
                </div>
              </div>

              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    Zadnja odobrena uplata
                  </h5>
                </div>
                <div class="card-body text-center">
                  12.06.2021 - 200kn
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';
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
    const qrCode = ref('');
    const qrCodeIsVisible = ref(false);

    async function fetchQrCode() {
      const today = new Date();
      const response = await store.dispatch(ActionTypes.FETCH_BARCODE,
        `${selectedCompany.value?.id}-${today.getMonth() + 1}-${today.getDate()}`);

      qrCode.value = `data:image/png;base64,${response}`;
    }

    function showQrView() {
      qrCodeIsVisible.value = true;
    }

    fetchQrCode();

    return {
      qrCode,
      qrCodeIsVisible,
      showQrView,
    };
  },
});
</script>
