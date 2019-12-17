import 'normalize.css';
import './scss/main.scss';

import './components/input/input';
import './components/date-picker/date-picker.js';
import './components/dropdown/dropdown.js';


import carousel from './components/room-preview/room-preview';


$(document).ready(() => {

  carousel();

  $('.calendar').datepicker({
    language: 'ru',
    range: true,
    minDate: new Date(),
    clearButton: true,
    applyButton: true,
    multipleDates: 2,
    dateFormat: 'dd.mm.yyyy',
    keyboardNav: false,
    offset: 0,
    navTitles: {
      days: 'MM yyyy'
    },
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>'
  });

});