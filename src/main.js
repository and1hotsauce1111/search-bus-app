import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import store from './store';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Popper from 'vue3-popper';

// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
dom.watch();
library.add(fas);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('Popper', Popper)
  .use(router)
  .use(store)
  .mount('#app');
