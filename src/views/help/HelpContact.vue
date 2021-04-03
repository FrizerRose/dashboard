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
                  class="responsive-form-label w-100"
                >
                  <span class="responsive-form-label__bolder">E-mail</span>
                </label>
                <input
                  id="id-contact-email"
                  v-model="formData.email"
                  type="text"
                  placeholder="Vaša e-mail adresa"
                  class="form-control responsive-form-control"
                >
              </div>
              <div class="mb-4">
                <label
                  for="id-contact-message"
                  class="responsive-form-label w-100"
                >
                  <span class="responsive-form-label__bolder">Poruka</span>
                  <br>
                  Detaljno opišite o čemu se radi da što brže otkrijemo uzrok poteškoća i otklonimo problem
                </label>
                <textarea
                  id="id-contact-message"
                  v-model="formData.body"
                  class="form-control responsive-form-control"
                  placeholder="Ovdje opišite problem"
                  cols="30"
                  rows="10"
                />
              </div>
              <div class="text-end">
                <button
                  :class="{
                    btn: true,
                    'responsive-btn': true,
                    'btn-primary': !requestSent,
                    'btn-success': requestSent && status,
                    'btn-danger': requestSent && !status,
                  }"
                  @click="send()"
                >
                  Pošalji
                </button>
              </div>
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

    const status = ref(false);
    const requestSent = ref(false);

    async function send() {
      try {
        if (selectedCompany.value) {
          formData.value.company = selectedCompany.value.id;
          formData.value.name = selectedCompany.value.name;
          await store.dispatch(ActionTypes.SEND_CONTACT, formData.value);
          requestSent.value = true;
          status.value = true;
        } else {
          throw new Error('Company did not load.');
        }
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    return {
      formData,
      send,
      requestSent,
      status,
    };
  },
});
</script>
