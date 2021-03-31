<template>
  <Dashboard>
    <template #header>
      Uvjeti korištenja
    </template>
    <template #body>
      <main class="content page-terms">
        <div class="container override-terms-limit">
          <h1>Uvjeti korištenja</h1>

          <p>
            Korištenjem internet stranice Dolazim.hr i svih pridruženih stranica i servisa koji pripadaju domeni Dolazim.hr,
            smatra se da su korisnici u svakom trenutku upoznati s ovim uvjetima korištenja te da ih u potpunosti razumiju i
            prihvaćaju.
          </p>

          <p>
            Internetska stranica namijenjena je olakšavanju pristupa javnosti informacijama o raspoloživosti termina malih
            obrtnika i njihovim aktivnostima. Naš je cilj da su te informacije što cjelovitije, točnije i ažuriranije. Ako nas
            obavijestite o pogreškama putem obrasca <router-link to="/kontakt">
              Prijedlozi i komentari
            </router-link>, poduzet ćemo sve potrebne
            korake da se one što prije isprave.
          </p>

          <p>
            Uredništvo servisa Dolazim.hr i svih pridruženih stranica zadržava pravo izmjene sadržaja i uvjeta korištenja
            internet stranice bez obveze prethodne najave te nije odgovorna za bilo kakvu štetu nastalu tim promjenama.
          </p>

          <p>
            Uredništvo servisa Dolazim.hr i svih pridruženih stranica ne snosi odgovornost za izravnu ili neizravnu štetu
            koja je nastala upotrebom ovih stranica. Također, Uredništvo servisa Dolazim.hr i svih pridruženih stranica se
            u potpunosti odriče svake odgovornosti koja je na bilo koji način vezana uz korištenje stranice od strane
            korisnika bilo uporabom ili zlouporabom sadržaja, te za bilo kakvu štetu koja može nastati korisniku ili bilo
            kojoj trećoj strani u vezi s uporabom ili zlouporabom sadržaja stranica. Odricanjem od navedene odgovornosti
            Uredništvu nije cilj smanjiti odgovornost za njeno postupanje u skladu sa zakonskim propisima.
          </p>

          <p>Informacije objavljene na ovoj stranici ne mogu se smatrati stručnim ili pravnim savjetom.</p>

          <p>
            Poduzimamo sve kako bismo što više smanjili smetnje prouzročene tehničkim pogreškama. Moguće je da se neki
            podatci ili informacije na ovim internetskim stranicama sadrže greške. U takvim slučajevima ne možemo zajamčiti
            da naša usluga neće biti prekinuta ili otežana na bilo koji drugi način. Uredništvo portala ne prihvaća odgovornost
            u slučaju otežanog prijenosa podataka uslijed različitih internetskih mreža ili neusklađenosti zbog korisnikova
            mrežnog preglednika. Ako nam se ukaže na pogreške, pokušat ćemo ih što prije ispraviti.
          </p>

          <p>
            Posjetitelji moraju voditi računa o tome da slanje privatnih poruka putem elektronske pošte na mreži može biti
            nesigurno i podložno neovlaštenom pristupu trećih osoba ili pogrešnoj dostavi. Dolazim.hr ne odgovara za sigurnost
            i privatnost poruka.
          </p>

          <p>
            Zabranjena je reprodukcija, umnožavanje ili distribucija dizajna ili podloge stranica Dolazim.hr, pojedinačnih
            elemenata stranica, dizajna logotipa Dolazim.hr i robnih marki ili bilo kojih drugih grafičkih, verbalnih ili
            figurativnih sadržaja objavljenih na toj internetskoj stranici, bez izričitog pisanog odobrenja Dolazim.hr
          </p>

          <p>Dopušteno je stavljati poveznicu internet stranice Dolazim.hr na druge stranice.</p>

          <p>
            Kako bi posjet ovoj internetskoj stranici bio što ugodniji, funkcionalniji i praktičniji, ova internet stranica
            sprema na vaše računalo određenu količinu informacija, takozvanih cookies (kolačići). Upoznajte se s uporabom
            "kolačića".
          </p>
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
