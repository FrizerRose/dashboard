<template>
  <div />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Shepherd from 'shepherd.js';

export default defineComponent({
  setup(): void {
    const store = useStore();
    const router = useRouter();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const user = computed(() => store.getters.getUser);

    const tour = new Shepherd.Tour({
      useModalOverlay: false,
      defaultStepOptions: {
        classes: 'shadow-md bg-purple-dark',
        // scrollTo: true,
      },
    });

    async function finishTutorial() {
      try {
        const updatedCompany = JSON.parse(JSON.stringify(selectedCompany.value));
        updatedCompany.preferences.isTutorialFinished = true;

        await store.dispatch(ActionTypes.UPDATE_COMPANY, updatedCompany);
        tour.complete();
      } catch {
        // eslint-disable-next-line no-alert
        alert('Došlo je do greške. Molimo pokušajte kasnije.');
      }
    }

    // function redirectTo(route: string) {
    //   router.push(route);
    //   // tour.next;
    // }

    tour.addSteps([
      {
        id: 'first-step',
        text: 'Dobrodošli na Dolazim.info! Krenimo u kratku turu našeg proizvoda kako bi vas upoznali sa svim značajkama.',
        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'kalendar-menu',
        text: 'Ovdje se nalazi Kalendar. U Kalendaru možete vidjeti sve svoje termine, dodati nove ili urediti postojeće. ',
        attachTo: {
          element: '#menu-Kalendar',
          on: 'right-end',
        },
        buttons: [
          {
            text: 'Krenimo na kalendar',
            action: () => {
              router.push('kalendar');
              tour.next();
            },
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'kalendar-step-1',
        text:
          'Klikom na jedan od dostupnih termina, ili jednostavno vremena u danu otvara se izbornik za dodavanje ili uređivanje termina. ',
        attachTo: {
          element: '#fullcalendar',
          on: 'left',
        },
        beforeShowPromise() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 300);
          });
        },

        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'kalendar-step-2',
        text: 'Ovdje se nalazi izbornik za odabir djelatnika. Za svakog unesenog djelatnika možete vidjeti njegov plan rada.',
        attachTo: {
          element: '#selectedWorker',
          on: 'top',
        },
        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'radnici-menu',
        text: 'Pod "Radnici" možete dodati nove ili promijeniti postojeće radnike.',
        attachTo: {
          element: '#menu-Radnici',
          on: 'right-end',
        },
        buttons: [
          {
            text: 'Krenimo na radnike',
            action: () => {
              router.push('radnici');
              tour.next();
            },
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'radnici-add',
        text: 'Ovdje možete dodati novog radnika, kada ste spremni, nastavite s dodavanjem.',
        attachTo: {
          element: '#staffCreateButton',
          on: 'bottom',
        },
        beforeShowPromise() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 300);
          });
        },
        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
        modalOverlayOpeningPadding: 70,
      },
      {
        id: 'radnici-edit',
        text: 'Ovdje možete urediti ili obrisati postojećeg radnika.',
        attachTo: {
          element: '#staffTableEdit',
          on: 'left-end',
        },
        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
        modalOverlayOpeningPadding: 70,
      },
      {
        id: 'usluge-menu',
        text: 'Ovdje možete vidjeti svoje usluge, dodati nove ili urediti postojeće.',
        attachTo: {
          element: '#menu-Usluge',
          on: 'right-end',
        },
        buttons: [
          {
            text: 'Krenimo na usluge',
            action: () => {
              router.push('usluge');
              tour.next();
            },
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'usluge-add',
        text: 'Pokušajte dodati novu uslugu. Kada ste spremni, nastavite na Sljedeći korak.',
        attachTo: {
          element: '#serviceAddButton',
          on: 'bottom',
        },
        beforeShowPromise() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 300);
          });
        },
        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
        modalOverlayOpeningPadding: 70,
      },
      {
        id: 'usluge-edit',
        text: 'Ovdje možete urediti ili obrisati postojeće usluge.',
        attachTo: {
          element: '#serviceTableEdit',
          on: 'left-end',
        },
        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
        modalOverlayOpeningPadding: 70,
      },
      {
        id: 'postavke-menu',
        text: 'Ovdje možete vidjeti svoj profil i urediti postavke.',
        showOn: () => {
          if (user.value?.isAdminAccount) {
            return true;
          }
          return false;
        },
        attachTo: {
          element: '#menu-Postavke',
          on: 'top',
        },
        buttons: [
          {
            text: 'Krenimo na postavke',
            action: () => {
              router.push('postavke');
              tour.next();
            },
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'postavke-edit',
        text: 'U postavkama možete promijeniti postojeće opcije, ili podesiti Dolazim.info kako bi odgovarao vašim poslovnim potrebama.',
        showOn: () => {
          if (user.value?.isAdminAccount) {
            return true;
          }
          return false;
        },
        attachTo: {
          element: '#settingsContainer',
          on: 'left-end',
        },
        beforeShowPromise() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 300);
          });
        },
        buttons: [
          {
            text: 'Sljedeći korak',
            action: tour.next,
          },
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
        modalOverlayOpeningPadding: 70,
      },
      {
        id: 'outro',
        text: `Završili ste Dolazim.info tutorial!
        Više možete saznati klikom na Pomoć u meniju ili nastaviti istraživati po stranici. Sretno!`,
        buttons: [
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
    ]);

    tour.start();

    store.commit(MutationTypes.CHANGE_TOUR, tour);
  },
});
</script>
