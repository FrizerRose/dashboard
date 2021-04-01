<template>
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a
      class="sidebar-toggle"
    >
      <i class="hamburger align-self-center" />
    </a>

    <div class="navbar-collapse collapse">
      <h3 class="ml-5 mt-2">
        <slot />
      </h3>
      <ul class="navbar-nav navbar-align">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            :class="{
              show : dropdownShowing,
            }"
            @click.prevent="toggleDropdown()"
          >
            <span class="align-middle me-1 d-inline-block">
              <span class="fa fa-user" />
            </span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end"
            :class="{
              show : dropdownShowing,
            }"
          >
            <router-link
              class="dropdown-item"
              to="/promijeni-lozinku"
            >
              <span class="align-middle me-1">
                <span class="fa fa-user" />
              </span>
              Promijeni lozinku
            </router-link>

            <div class="dropdown-divider" />
            <button
              class="dropdown-item"
              @click="logout()"
            >
              <span class="align-middle me-1">
                <span class="fa fa-sign-out-alt" />
              </span>
              Odjavi se
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import MutationTypes from '@/store/mutation-types';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({

  setup() {
    const store = useStore();
    const router = useRouter();

    const dropdownShowing = ref(false);

    function logout() {
      store.commit(MutationTypes.LOGOUT, true);
      router.push('/prijava');
    }

    function toggleDropdown() {
      console.log(dropdownShowing);
      dropdownShowing.value = !dropdownShowing.value;
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
      toggleDropdown,
      dropdownShowing,
    };
  },
});
</script>
