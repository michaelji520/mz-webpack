import './app.less';
import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';

// import $ from 'jquery';
const router = new Router({
  mode: 'history'
});
import { test } from './calc';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
