<template>
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a
      class="sidebar-toggle"
    >
      <i class="hamburger align-self-center" />
    </a>

    <h3 class="ml-5 mt-2">
      <slot />
    </h3>

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
import { defineComponent, onMounted } from 'vue';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({

  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.commit(MutationTypes.LOGOUT, true);
      router.push('/prijava');
    }

    onMounted(() => {
      const sidebarElement = document.getElementsByClassName('sidebar')[0];
      const sidebarToggleElement = document.getElementsByClassName('sidebar-toggle')[0];

      sidebarToggleElement.addEventListener('click', () => {
        sidebarElement.classList.toggle('collapsed');

        sidebarElement.addEventListener('transitionend', () => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    });

    return {
      logout,
    };
  },
});
</script>
