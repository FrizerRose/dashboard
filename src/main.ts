// import '@/assets/scss/main.scss';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store';

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 0.5,
  });
}

const app = createApp(App);

app.use(store).use(router).use(PrimeVue).mount('#app');
