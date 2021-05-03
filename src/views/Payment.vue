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
                        Poziv na broj: {{ `${selectedCompany?.id}-${today.getMonth() + 1}-${today.getDate()}` }}
                        <br>
                      </li>
                    </ul>
                  </p>
                  <p class="mt-4">
                    <span v-if="!processingPayment.id">
                      Nakon što se izvršili uplatu, kliknite
                      <button
                        class="btn btn-primary"
                        @click="createPayment()"
                      >
                        Ovdje
                      </button> kako bismo obradili vašu uplatu.
                    </span>

                    <span
                      v-else
                      class="lead"
                    >
                      <span class="fa fa-spinner" /> Vaša uplata je trenutno u obradi.
                    </span>

                    <br>
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
                    @click="toggleQrView()"
                  >
                    <span v-if="qrCodeIsVisible">Sakri</span><span v-else>Prikaži</span> QR kod
                  </button>
                </div>
              </div>

              <div
                v-if="!trialEnded"
                class="card"
              >
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    Probni period
                  </h5>
                </div>
                <div class="card-body">
                  Probni period završava za <strong>{{ Math.floor(trialEndsIn) }}</strong> dana.
                  Na {{ getHumanReadableDate(trialEndsOn.toString()) }}
                </div>
              </div>

              <div class="card">
                <div class="card-header pb-0 help-header">
                  <h5 class="card-title">
                    Zadnja odobrena uplata
                  </h5>
                </div>
                <div class="card-body">
                  <div v-if="lastPaidPayment">
                    <span class="fa fa-check" /> {{ getHumanReadableDate(lastPaidPayment.date) }}
                  </div>
                  <div v-else>
                    Još nema odobrenih uplata
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

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import { getDateStringFromDate, getHumanReadableDate, dateDiffInDays } from '@/helpers/time';
import Payment from '@/types/payment';

export default defineComponent({
  components: {
    Dashboard,
  },
  setup() {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const lastPaidPayment = computed(() => {
      const paidPayments = selectedCompany.value?.payments.filter((payment: Payment) => payment.status === 'paid');
      if (paidPayments?.length) {
        paidPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return paidPayments[0];
      }
      return false;
    });

    const qrCode = ref('');
    const qrCodeIsVisible = ref(false);
    const today = new Date();

    const trialEnded = ref(false);
    const trialEndsIn = ref(0);
    const trialEndsOn = ref(new Date());
    if (selectedCompany.value) {
      const trialEndDate = new Date(selectedCompany.value.createdAt);
      trialEndDate.setMonth(trialEndDate.getMonth() + 1);

      trialEndsOn.value = trialEndDate;
      trialEndsIn.value = dateDiffInDays(trialEndDate, today);
      trialEnded.value = trialEndDate.getTime() < today.getTime();
    }

    const processingPayment = ref({} as Payment);
    if (selectedCompany.value) {
      const foundPayment = selectedCompany.value.payments.find((payment: Payment) => payment.status === 'processing');
      if (foundPayment) {
        processingPayment.value = foundPayment;
      }
    }

    async function fetchQrCode() {
      const response = await store.dispatch(ActionTypes.FETCH_BARCODE,
        `${selectedCompany.value?.id}-${today.getMonth() + 1}-${today.getDate()}`);

      qrCode.value = `data:image/png;base64,${response}`;
    }

    function toggleQrView() {
      qrCodeIsVisible.value = !qrCodeIsVisible.value;
    }

    async function createPayment() {
      if (selectedCompany.value) {
        processingPayment.value = await store.dispatch(ActionTypes.CREATE_PAYMENT, {
          status: 'processing',
          date: getDateStringFromDate(today),
          company: selectedCompany.value.id,
        } as Payment);
      }
    }

    fetchQrCode();

    return {
      selectedCompany,
      today,
      qrCode,
      qrCodeIsVisible,
      toggleQrView,
      getHumanReadableDate,
      createPayment,
      processingPayment,
      lastPaidPayment,
      trialEnded,
      trialEndsIn,
      trialEndsOn,
    };
  },
});
</script>
