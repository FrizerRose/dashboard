<template>
  <Dashboard>
    <template #header>
      QR Kod
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-12 col-md-6 col-xxl-8">
              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    QR Kod &ndash; Upute
                  </h5>
                </div>
                <div class="card-body">
                  <h5 class="h6 card-title">
                    Što je QR kod?
                  </h5>
                  <p>
                    QR Kod omogućuje brz pristup informacijama, tako će primjerice vaše mušterije moći skenirati vaš kod putem svojih
                    pametnih telefona i brzo pristupiti vašoj stranici za rezervacije.
                  </p>
                  <hr>
                  <h5 class="h6 card-title">
                    Kako se koristi QR kod?
                  </h5>
                  <p>
                    QR Kod možete koristiti na dva načina. <br><br>
                    <ul>
                      <li>
                        Klikom na <mark>"Prikaži QR kod"</mark> otvorite QR kod koji možete spremiti,
                        ili podijeliti s mušterijama,
                        te na taj način omogućiti brz pristup vašoj stranici za rezervacije. <br><br>
                      </li>
                      <li>
                        Klikom na <mark>"Ispis QR koda"</mark>, otvoriti će vam se pregled za ispis,
                        potom vaš kod možete ispisati ili spremiti u PDF formatu, te
                        primjerice staviti unutar vašeg salona kako bi potaknuli postojeće mušterije na online rezervaciju.
                      </li>
                    </ul>
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
                    class="btn btn-lg btn-primary mt-4 me-2"
                    @click="showQrView()"
                  >
                    Prikaži QR kod
                  </button>
                  <button
                    class="btn btn-lg btn-primary mt-4"
                    @click="qrPrintView()"
                  >
                    Ispiši QR kod
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
  </Dashboard>
  <div class="for-print text-center">
    <img
      v-if="qrCode"
      :src="qrCode"
      alt="qr kod"
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';
import { useStore } from '@/store';

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
      const bookingPageSlug = selectedCompany.value?.bookingPageSlug;
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingPageSlug}.dolazim.hr`);
      if (response.status === 200) {
        qrCode.value = response.url;
      }
    }

    function qrPrintView() {
      setTimeout(() => {
        window.print();
      }, 100);
    }

    function showQrView() {
      qrCodeIsVisible.value = true;
    }

    fetchQrCode();

    return {
      qrCode,
      qrCodeIsVisible,
      qrPrintView,
      showQrView,
    };
  },
});
</script>
<style lang="scss" scoped>
.for-print {
  display: none;
}

@media print {
  .wrapper,
  .main * {
    display: none;
  }
  .for-print,
  .for-print * {
    display: block;
    margin: 0 auto;
  }
}
</style>
