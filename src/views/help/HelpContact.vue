<template>
  <Dashboard>
    <template #header>
      Kontakt
    </template>
    <template #body>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-md-3" />
            <div class="col-md-6">
              <div class="mb-4">
                <label
                  for="id-contact-email"
                  class="form-label w-100"
                >
                  <strong>E-mail</strong>
                  <br>
                  Ovdje upišite e-mail adresu na koju ćemo vam odgovoriti
                </label>
                <input
                  id="id-contact-email"
                  v-model="formData.email"
                  type="text"
                  class="form-control form-control-lg"
                >
              </div>
              <div class="mb-4">
                <label
                  for="id-contact-message"
                  class="form-label w-100"
                >
                  <strong>Poruka</strong>
                  <br>
                  Ovdje opišite problem
                </label>
                <textarea
                  id="id-contact-message"
                  v-model="formData.about"
                  class="form-control form-control-lg"
                  placeholder="Detaljno opišite o čemu se radi da što brže otkrijemo uzrok poteškoća i otklonimo problem"
                  cols="30"
                  rows="10"
                />
              </div>
              <button
                class="btn btn-lg btn-primary"
                @click="send()"
              >
                Pošalji
              </button>
            </div>
          </div>
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
