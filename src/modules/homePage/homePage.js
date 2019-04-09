import Vue from 'vue';
import App from './homePage.vue';
import router from './router';
import store from '../../store/store';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#root');
