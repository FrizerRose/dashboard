import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "kalendar" */ '../views/Login.vue'),
  },
  {
    path: '/kalendar',
    name: 'Calendar',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "kalendar" */ '../views/Calendar.vue'),
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
    path: '/postavke',
    name: 'Settings',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "postavke" */ '../views/settings/Settings.vue'),
    children: [
      {
        path: 'racun',
        name: 'Account',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "postavke-racun" */ '../views/settings/SettingsAccount.vue'),
      },
    ],
  },
  {
    path: '/pomoc',
    name: 'Help',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "pomoc" */ '../views/help/Help.vue'),
    children: [
      {
        path: 'cesta-pitanja',
        name: 'Faq',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "cesta-pitanja" */ '../views/help/HelpFaq.vue'),
      },
      {
        path: 'uputstvo',
        name: 'Manual',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "uputstvo" */ '../views/help/HelpManual.vue'),
      },
      {
        path: 'kontakt',
        name: 'Contact',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "kontakt" */ '../views/help/HelpContact.vue'),
      },
    ],
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

export default router;
