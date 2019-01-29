import _ from 'lodash';
import './style.css';
import bg from '../assets/images/avatar.png';

function component() {
  var element = document.createElement('div');
  element.classList.add('hello');

  element.innerHTML = _.join(['Hello', 'webpack!'], ' ');

  var myImage = new Image();
  myImage.src = bg;
  element.appendChild(bg);

  return element;
}

document.body.appendChild(component());
