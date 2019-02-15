import { cube } from './math.js';
import printMe from './print.js';
import './style.css';
import './test.css';
import _ from 'lodash';

if (process.env.NODE_ENV !== 'production') {
  console.log('You are in development mode!');
}

function component() {

  console.log(_.join(['123', '456'], ' '));

  var element = document.createElement('div');

  element.innerHTML = ['Hello webpack!', '5 cubed is equal to' + cube(5)].join('\n\n');

  var btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}
// store the element to re-render on print.js changes
var element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    // printMe();
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}
