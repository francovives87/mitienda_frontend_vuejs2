import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
/* BOOTSTRAP */
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
/* FontAwesomeIcons */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping, faHatWizard, faMobile, faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
/* FontAwesomeIcons */
import axios from 'axios'
import VueAxios from 'vue-axios'
/* SweetAlert2 */
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { faCircleCheck, faEye, faCompass} from '@fortawesome/free-regular-svg-icons';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});


library.add(
  fas,
  faHatWizard,
  faInstagram,
  faWhatsapp,
  faMobileScreen,
  faCircleCheck,
  faCartShopping,
  faEye,
  faCompass,
  
  
  )

delete L.Icon.Default.prototype._getIconUrl;

const local = 'http://127.0.0.1:8000'
const prod = 'https://system.mitienda.app'

Vue.prototype.server = prod


Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
