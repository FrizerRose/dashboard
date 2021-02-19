import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/TheHome.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/kalendar',
    name: 'Calendar',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "kalendar" */ '../views/TheCalendar.vue'),
  },
  {
    path: '/usluge',
    name: 'Services',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "usluge" */ '../views/TheServices.vue'),
  },
  {
    path: '/radnici',
    name: 'Workforce',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "radnici" */ '../views/TheWorkforce.vue'),
  },
  {
    path: '/postavke',
    name: 'Settings',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "postavke" */ '../views/TheSettings.vue'),
    children: [
      {
        path: 'racun',
        name: 'Account',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "postavke-racun" */ '../views/PageSettings/TheAccount.vue'),
      },
    ],
  },
  {
    path: '/pomoc/:id',
    name: 'Help',
    // lazy loaded route
    component: () => import(/* webpackChunkName: "pomoc" */ '../views/TheHelp.vue'),
    children: [
      {
        path: 'cesta-pitanja',
        name: 'Faq',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "cesta-pitanja" */ '../views/PageHelp/TheFaq.vue'),
      },
      {
        path: 'uputstvo',
        name: 'Manual',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "uputstvo" */ '../views/PageHelp/TheManual.vue'),
      },
      {
        path: 'kontakt',
        name: 'Contact',
        // lazy loaded route
        component: () => import(/* webpackChunkName: "kontakt" */ '../views/PageHelp/TheContact.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page.
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
