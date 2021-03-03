<template>
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle">
      <i class="hamburger align-self-center" />
    </a>
    <div class="navbar-collapse collapse">
      <ul class="navbar-nav navbar-align">
        <button
          class="btn btn-primary"
          @click="logout()"
        >
          Odjavi se
        </button>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({

  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.commit(MutationTypes.LOGOUT);
      router.push('/prijava');
    }

    return {
      logout,
    };
  },
});
</script>
