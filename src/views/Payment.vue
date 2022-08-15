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
                    Koja je cijena korištenja Dolazim.info servisa?
                  </h5>
                  <p>
                    Cijena pretplate iznosi 200kn za 30 dana,
                    po isteku pretplate potrebno ju je produžiti novom uplatom kako bi vaše stranice nastavile s radom.
                  </p>
                  <hr>
                  <h5 class="h6 card-title">
                    Kako mogu izvršiti uplatu?
                  </h5>
                  <p>
                    Uplate se vrše putem transakcijskog računa, uplatiti možete na jedan od dva načina:<br><br>
                    <ol>
                      <li>
                        Klikom na <mark>"Prikaži QR kod"</mark> otvorite QR kod koji možete skenirati s aplikacijom za mobilno bankarstvo,
                        te na taj način obaviti uplatu bez mogućnosti pogreške. <br><br>
                      </li>
                      <li>
                        <p>Ručno izvršiti uplatu s ovim informacijama:</p>

                        <div class="table-responsive">
                          <table class="table responsive-font-size table-striped table-row-expandable">
                            <tbody>
                              <tr class="nav-item is-expanded">
                                <td class="always-expanded position-relative">
                                  IBAN
                                </td>
                                <td class="always-expanded align-right-on-desktop">
                                  HR7824840081106960714
                                </td>
                              </tr>
                              <tr class="nav-item is-expanded">
                                <td class="always-expanded position-relative">
                                  Iznos
                                </td>
                                <td class="always-expanded align-right-on-desktop">
                                  200kn
                                </td>
                              </tr>
                              <tr class="nav-item is-expanded">
                                <td class="always-expanded position-relative">
                                  Model
                                </td>
                                <td class="always-expanded align-right-on-desktop">
                                  00
                                </td>
                              </tr>
                              <tr class="nav-item is-expanded">
                                <td class="always-expanded position-relative">
                                  Poziv na broj
                                </td>
                                <td class="always-expanded align-right-on-desktop">
                                  {{ `${selectedCompany?.id}-${today.getMonth() + 1}-${today.getDate()}` }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </li>
                    </ol>
                  </p>

                  <div class="mt-4">
                    <p v-if="!processingPayment.id">
                      Nakon što se izvršili uplatu, kliknite
                      <button
                        class="btn btn-primary"
                        @click="createPayment()"
                      >
                        ovdje
                      </button> kako bismo obradili vašu uplatu.
                    </p>

                    <div
                      v-else
                      class="p-4 alert alert-success"
                    >
                      <span>
                        <span
                          class="fa fa-check"
                          style="margin-right: 4px"
                        />
                        <span>Vaša uplata je trenutno u obradi.</span>
                      </span>
                    </div>

                    <p>
                      Nakon obrade vaše uplate i potvrde o uplati, na e-mail Vam dostavljamo potvrdu i račun. <br>
                      Ako imate dodatnih pitanja
                      <router-link
                        to="/kontakt"
                      >
                        kontaktirajte nas.
                      </router-link>
                    </p>
                  </div>
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
                    class="w-100"
                  > <br>
                  <button
                    class="btn btn-lg btn-primary mt-2 me-2"
                    @click="toggleQrView()"
                  >
                    <span v-if="qrCodeIsVisible">Sakrij</span><span v-else>Prikaži</span> QR kod
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
                    <span class="fa fa-check" /> {{ getHumanReadableDate(lastPaidPayment.date) }} <br>
                    <span v-if="subscriptionEndsIn >= 0">
                      Pretplata završava za <strong>{{ Math.floor(subscriptionEndsIn) }}</strong> dana.
                    </span>
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

    const subscriptionEndsIn = ref(-1);
    if (lastPaidPayment.value) {
      const subscriptionEndDate = new Date(lastPaidPayment.value.date);
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      subscriptionEndsIn.value = dateDiffInDays(subscriptionEndDate, today);
    }

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
      subscriptionEndsIn,
    };
  },
});
</script>

<style lang="scss">
@keyframes spinnerTurning {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
