import './app.less';
import Vue from 'vue';
import App from './App.vue';

// import $ from 'jquery';

import { test } from './calc';

new Vue({
  el: '#app',
  render: h => h(App)
});
