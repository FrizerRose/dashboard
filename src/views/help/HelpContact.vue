<template>
  <Dashboard>
    <template #header>
      Kontakt
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          Email
          <input
            id=""
            v-model="formData.email"
            type="email"
            name="email"
          >
          Poruka
          <textarea
            id=""
            v-model="formData.body"
            name="body"
            cols="30"
            rows="10"
          />

          <button
            class="btn btn-primary"
            @click="send()"
          >
            Pošalji
          </button>
        </div>
      </main>
    </template>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
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

    const formData = ref({
      email: '', body: '', name: '', company: 0,
    });

    async function send() {
      try {
        if (selectedCompany.value) {
          formData.value.company = selectedCompany.value.id;
          formData.value.name = selectedCompany.value.name;
          await store.dispatch(ActionTypes.SEND_CONTACT, formData.value);
        } else {
          throw new Error('Company did not load.');
        }
      } catch {
        console.log('Failed sending contact.');
      }
    }

    return {
      formData,
      send,
    };
  },
});
</script>
