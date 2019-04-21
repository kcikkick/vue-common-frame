import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './messages';

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
