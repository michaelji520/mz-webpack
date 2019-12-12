import './app.less';
import Vue from 'vue';
import App from './App.vue';

import $ from 'jquery';

import test from './calc';

$.get('https://www.zhangji.xyz/demo').then((res) => {
  console.log(res)
}).catch(() => {});
let vm = new Vue({
  el: '#app',
  render: h => h(App)
});