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
        <li>
          <div class="round-button-wrap">
            <router-link
              to="/pomoc"
              class="round-button has-shadow"
            >
              <span class="o-background-wrap o-ratio">
                <span class="o-background is-white" />
                <span class="o-background is-secondary anim-hover" />
                <span class="o-front">
                  <span class="round-button__label">?</span>
                </span>
              </span>
            </router-link>
          </div>
        </li>
        <li class="nav-item dropdown d-flex align-items-center">
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

<style lang="scss" scoped>
.round-button-wrap {
  position: relative;
  z-index: 1;
  margin-right: 0.5rem;
}
.round-button {
  display: block;
  border: 2px solid rgba(0,0,0,0.05);
  border-radius: 9999px;
  width: 3rem;
  overflow: hidden;
  color: black;
  font-size: 1.5rem;
  transition: color 0.2s cubic-bezier(0.4, 0, 0, 1);

  &:hover {
    color: white;
  }

  &.has-shadow {
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.1);
  }
}

.o-background-wrap {
  position: relative;
  z-index: 0;
}
.o-background {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: -1;

  &.is-white {
    background-color: white;
  }
  &.is-secondary {
    background-color: #495057;
    border-radius: 9999px;
    transition: color 0.2s cubic-bezier(0.4, 0, 0, 1);
  }
  &.anim-hover {
    transform: scale(0);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0, 1);
    .round-button:hover & {
      transform: scale(1);
    }
  }
}

.o-front {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.o-ratio {
  position: relative;
  display: block;
  overflow: hidden;

  &:before {
    display: block;
    padding-bottom: 100%; /* [1] */
    width: 100%;
    content: "";
  }
}

.o-ratio_content,
  .o-ratio > img,
  .o-ratio > iframe,
  .o-ratio > embed,
  .o-ratio > object {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  // height: 100%;
}
</style>
