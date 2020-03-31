import 'normalize.css';
import './scss/main.scss';

// polyfills for IE11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
    }
  };
}
if (!Object.getOwnPropertyDescriptor(Element.prototype,'classList')){
  if (HTMLElement&&Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList')){
      Object.defineProperty(Element.prototype,'classList',Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList'));
  }
}

function importAll(requireContext) {
  requireContext.keys().map(requireContext);
}

importAll(require.context('./components/', true, /\.js$/));
importAll(require.context('./pages/', true, /\.js$/));

