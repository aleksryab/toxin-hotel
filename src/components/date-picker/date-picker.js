import './lib/datepicker';

$('.js-date-picker').each(function () {

  const $checkIn = $(this).find('.input__field[name="check-in"]'),
        $checkOut = $(this).find('.input__field[name="check-out"]');

  $(this).find('.js-date').inputmask({
    oncomplete: function() {
      select($(this));
    }
  });

  $checkIn.datepicker({
    language: 'ru',
    range: true,
    minDate: new Date(),
    clearButton: true,
    applyButton: true,
    multipleDates: 2,
    twoInputs: true,
    minInput: $checkIn,
    maxInput: $checkOut,
    dateFormat: 'dd.mm.yyyy',
    keyboardNav: false,
    offset: 5,
    navTitles: {
      days: 'MM yyyy'
    },
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>'
  });

  const calendar = $checkIn.data('datepicker');


  $checkOut.click( function() {
    calendar.show();
  });

  $checkOut.focus( function() {
    calendar.show();
  });


  function select(input) {

    let value = input.val();
    if (value.match(/^\d\d\.\d\d\.\d\d\d\d$/)) {

      value = value.split('.');
      let date = new Date();
      date.setDate(value[0]);
      date.setMonth(value[1]-1);
      date.setFullYear(value[2]);

      if(date >= new Date().setHours(0, 0, 0, 0)) {
        calendar.selectDate(date);
        $checkOut.focus();
      } else {
        console.log('Мы не можем путешествовать в прошлое :(');
      }
    }
  }
});


$('.js-date-picker-single').find('.input__field').datepicker({
  language: 'ru',
  minDate: new Date(),
  range: true,
  clearButton: true,
  applyButton: true,
  keyboardNav: false,
  multipleDates: 2,
  offset: 5,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd M',
  navTitles: {
    days: 'MM yyyy'
  },
  prevHtml: '<i class="material-icons">arrow_back</i>',
  nextHtml: '<i class="material-icons">arrow_forward</i>'
});