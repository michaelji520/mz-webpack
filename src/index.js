import _ from 'lodash';
import './style.css';
import bg from '../assets/images/avatar.png';
import Data from './data.xml';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  element.classList.add('hello');

  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack!'], ' ');

  btn.innerHTML = 'Click me and check the console';
  btn.onclick = printMe;

  element.appendChild(btn);

  var myImage = new Image();
  myImage.src = bg;
  element.appendChild(myImage);

  console.log(Data);

  return element;
}

document.body.appendChild(component());
