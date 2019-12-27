import 'normalize.css';
import './scss/main.scss';

import './components/input/input.js';
import './components/date-dropdown/date-dropdown.js';
import './components/dropdown/dropdown.js';
import './components/like-button/like-button.js';
import './components/range-slider/range-slider.js';
import './components/checkbox-list/checkbox-list.js';
import './components/room-preview/room-preview.js';


$(document).ready(() => {

  $('.calendar').datepicker({
    language: 'ru',
    range: true,
    startDate:  new Date(2019, 7, 8),
    minDate: new Date(2019, 7, 8),
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