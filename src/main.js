import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
dom.watch();


library.add(fas)

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')
