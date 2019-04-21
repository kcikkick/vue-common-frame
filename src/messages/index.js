import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zhMessage from './zh-message';
import enMessage from './en-message';
import _ from 'lodash';

Vue.use(VueI18n);

const messages = {
  en: _.assignIn({}, enMessage, enLocale),
  zh: _.assignIn({}, zhMessage, zhLocale)
};

export default new VueI18n({
  locale: 'zh',
  messages
});