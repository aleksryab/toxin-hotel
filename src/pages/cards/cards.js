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