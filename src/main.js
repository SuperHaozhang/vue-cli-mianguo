import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './routers/index.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
//import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import qs from 'qs'
import mixin from './mixin/index.js'
import config from './config/index.js'
import Vuex from 'vuex'
import store from './store/index.js'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer,{
    defaultOptions: {
        zIndex: 9999
    }
});
Viewer.setDefaults({
    Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
});
Vue.use(Vuex);
Vue.prototype.$config = config;
Vue.config.productionTip = false;

Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

new Vue({
    router,
    store ,
  render: h => h(App),
}).$mount('#app');
