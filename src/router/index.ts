import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStore } from '@/store';
import MutationTypes from '@/store/mutation-types';
import { computed } from 'vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/prijava',
    name: 'Login',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "prijava" */ '../views/Login.vue'),
  },
  {
    path: '/zaboravljena-lozinka',
    name: 'Forgotten Password',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "zaboravljana-lozinka" */ '../views/ForgottenPassword.vue'),
  },
  {
    path: '/kalendar',
    name: 'Calendar',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "kalendar" */ '../views/CalendarView.vue'),
  },
  {
    path: '/usluge',
    name: 'Services',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "usluge" */ '../views/Services.vue'),
  },
  {
    path: '/radnici',
    name: 'Staff',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "radnici" */ '../views/Staff.vue'),
  },
  {
    path: '/klijenti',
    name: 'Customers',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "korisnici" */ '../views/Customers.vue'),
  },
  {
    path: '/postavke',
    name: 'Settings',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "postavke" */ '../views/Settings.vue'),
  },
  {
    path: '/uvjeti',
    name: 'Terms',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "postavke" */ '../views/TermsAndConditions.vue'),
  },
  {
    path: '/privatnost',
    name: 'Privacy',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "postavke" */ '../views/PrivacyPolicy.vue'),
  },
  {
    path: '/promijeni-lozinku',
    name: 'ChangePassword',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "postavke" */ '../views/ChangePassword.vue'),
  },
  {
    path: '/pomoc',
    name: 'Help',
    component: () => import(/* webpackChunkName: "cesta-pitanja" */ '../views/help/Help.vue'),
  },
  {
    path: '/cesta-pitanja',
    name: 'Faq',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "cesta-pitanja" */ '../views/help/HelpFaq.vue'),
  },
  {
    path: '/kontakt',
    name: 'Contact',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "kontakt" */ '../views/help/HelpContact.vue'),
  },
  {
    path: '/qr-kod',
    name: 'QR Kod',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "kontakt" */ '../views/QRCodeView.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    // Allows props to be passed to  404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to  404 page.
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const store = useStore();

  if (to.path !== from.path) {
    store.commit(MutationTypes.CHANGE_OPEN_STAFF_CREATE_MODAL, false);
    store.commit(MutationTypes.CHANGE_OPEN_STAFF_EDIT_MODAL, false);
    store.commit(MutationTypes.CHANGE_OPEN_CALENDAR_MODAL, false);
    store.commit(MutationTypes.CHANGE_OPEN_SERVICE_CREATE_MODAL, false);
    store.commit(MutationTypes.CHANGE_OPEN_SERVICE_EDIT_MODAL, false);
  }

  const publicPages = ['/prijava', '/zaboravljena-lozinka', '/404'];
  const authPages = ['/prijava', '/zaboravljena-lozinka'];
  const adminPages = ['/postavke'];

  const authRequired = !publicPages.includes(to.path);
  const authDisallowed = authPages.includes(to.path);
  const accessDisallowed = adminPages.includes(to.path);

  const hasToken = localStorage.getItem('accessToken');
  const expiration = localStorage.getItem('expiration');
  const isTokenExpired = typeof expiration !== 'string' || Date.now() > parseInt(expiration, 10);
  const user = localStorage.getItem('user');
  const parsedUser = typeof user === 'string' ? JSON.parse(user) : null;
  const isAdmin = parsedUser && parsedUser.isAdminAccount;

  // Cancel the tour on public pages
  if (!authRequired) {
    const tour = computed(() => store.state.shared.tour);

    const tourReference = tour.value;
    if (tourReference?.isActive()) {
      tourReference.cancel();
    }
  }

  if (typeof expiration === 'string' && Date.now() > parseInt(expiration, 10)) {
    store.commit(MutationTypes.LOGOUT, true);
  }

  // Trying to access a restricted page + not logged in
  // Redirect to login page
  if (authRequired && (!hasToken || isTokenExpired)) {
    next('/prijava');
  } else if (authDisallowed && hasToken) {
    next('/');
  } else if (accessDisallowed && !isAdmin) {
    next('/');
  } else {
    next();
  }
});

export default router;
