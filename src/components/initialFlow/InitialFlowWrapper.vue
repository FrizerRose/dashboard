<template>
  <div />
</template>

<script lang='ts'>
import {
  computed,
  defineComponent,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';
import Shepherd from 'shepherd.js';

export default defineComponent({
  setup(): void {
    const store = useStore();

    const selectedCompany = computed(() => store.state.shared.selectedCompany);

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
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

    tour.addSteps([
      {
        id: 'example-step',
        text: 'Dobrodošli u Frizerrose! Krenimo u turu proizvoda.',
        classes: 'example-step-extra-class',
        buttons: [
          {
            text: 'Sljedeći',
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
        text: 'Na lijevoj strani ekrana nalazi se izbornik. Pod "Radnici" možete dodati nove ili promijeniti postojeće radnike.',
        attachTo: {
          element: '#menu-Radnici',
          on: 'right-end',
        },
        classes: 'example-step-extra-class',
        buttons: [
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'radnici-add',
        text: 'Pokušajte dodati novog radnika. Kada ste spremni, nastavite na sljedeći korak.',
        attachTo: {
          element: '#staffContainer',
          on: 'left-end',
        },
        classes: 'example-step-extra-class',
        buttons: [
          {
            text: 'Sljedeći',
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
        text: 'Klikom na "Usluge" možete dodati nove ili promijeniti postojeće usluge.',
        attachTo: {
          element: '#menu-Usluge',
          on: 'right-end',
        },
        classes: 'example-step-extra-class',
        buttons: [
          {
            text: 'Završi tutorial',
            action: finishTutorial,
          },
        ],
      },
      {
        id: 'usluge-add',
        text: 'Pokušajte dodati novu usluge. Kada ste spremni, nastavite na sljedeći korak.',
        attachTo: {
          element: '#serviceContainer',
          on: 'left-end',
        },
        classes: 'example-step-extra-class',
        buttons: [
          {
            text: 'Sljedeći',
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
        text: `Završili ste Frizerrose tutorial!
        Možete saznati više klikom na Pomoć u meniju ili nastaviti istraživati po stranici. Sretno!`,
        classes: 'example-step-extra-class',
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
