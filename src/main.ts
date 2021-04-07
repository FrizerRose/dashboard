// import '@/assets/scss/main.scss';
import '@/assets/scss/appstack-overrides.scss';
// import * as Sentry from '@sentry/vue';
// import { Integrations } from '@sentry/tracing';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store';
import { DeveloperError } from './types/customError';

if (process.env.VUE_APP_API_ENDPOINT === undefined) {
  throw new DeveloperError('No ENV variable for the api endpoint is present');
}

if (process.env.NODE_ENV === 'production') {
  console.log = function noConsole() {
    // Do Nothing
  };
}

// if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SENTRY_DSN !== undefined) {
//   Sentry.init({
//     dsn: process.env.VUE_APP_SENTRY_DSN,
//     integrations: [new Integrations.BrowserTracing()],

//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 0.5,
//   });
// }

createApp(App).use(store).use(router)
  .mount('#app');
