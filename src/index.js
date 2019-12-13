import roomSearch from './components/room-search/room-search';
import carousel from './components/room-preview/room-preview';

$(document).ready(() => {
  roomSearch();
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