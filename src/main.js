import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './routers/index.js'

import qs from 'qs'
import mixin from './mixin/index.js'
import config from './config/index.js'
import Vuex from 'vuex'
import store from './store/index.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(Vuex);
Vue.prototype.$config = config;
Vue.config.productionTip = false;

Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.use(ViewUI);


new Vue({
    router,
    store ,
  render: h => h(App),
}).$mount('#app');
