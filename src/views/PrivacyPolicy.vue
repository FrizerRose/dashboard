<template>
  <Dashboard>
    <template #header>
      Izjava o privatnosti
    </template>
    <template #body>
      <main class="content page-terms">
        <div class="container override-terms-limit">
          <h1>Izjava o privatnosti</h1>

          <p>
            Dolazim.info je poštuje vašu privatnost i predan je tome da ju očuva. Izjava o privatnosti predtavlja predložak po
            kojem će podatci koje nam ustupite prikupljati i obrađivati. Pročitajte Izjavu u cijelosti kako bi bolje razumjeli
            za što se podatci koje nam ustupite koriste, na koji način ih obrađujemo i što s njima radimo.
          </p>

          <h2>Vaši osobni podatci</h2>
          <h3>Informacije koje prikupljamo od vas</h3>

          <p>
            U svrhu pružanja usluge prikupljamo i obrađujemo neke ili sve od niže navedenih podataka:

            <ul>
              <li>
                Informacije koje ste nam ustupili pri popunjavanju kontakt forme na stranici. To uključuje i informacije
                ustupljene pri:
                <ul>
                  <li>upisivanju podataka za prijavu u sustav</li>
                  <li>upisivanju usluge koju pružate</li>
                  <li>upisivanju radnika</li>
                  <li>upisivanju radnog vremena</li>
                </ul>
              </li>

              <li>
                Ustupate nam informacije i u situaciji kad:
                <ul>
                  <li>tražite više informacija o proizvodu i njegovim značajkama</li>
                  <li>tražite pojašnjenje o nekoj od značajki proizvoda</li>
                </ul>
              </li>

              <li>
                Kod prijave tehničkog problema ili poteškoće, također nam ustupate informacije, bilo kroz kontakt formu ili na
                naš zahtjev. Ako nas kontaktirate putem e-maila, telefonski ili na neki drugi način zapis o tom događaju u
                nekom obliku može ostati pohranjen.
              </li>

              <li>
                Također, kod ispunjavanja Upitnika o zadovoljstvu korisnika ustupate nam neke podatke koje možemo koristiti u
                svrhu poboljšanja usluge, no međutim, ne obvezujemo se da ćemo na svaki zahtjev odgovoriti.
              </li>
            </ul>
          </p>

          <!-- <p>
            <router-link to="/kontakt">
              placeholder link
            </router-link>
          </p> -->
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang='ts'>
import {
  defineComponent,
} from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
  },
});
</script>
