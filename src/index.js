import './index.css';
import Vue from 'vue';
import App from './App.vue';

let text = '321321';
console.log(text)

let vm = new Vue({
  el: '#app',
  render: h => h(App)
});