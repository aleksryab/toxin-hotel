import './lib/datepicker';

const $checkIn = $('.js-datepicker[name="check-in"]'),
      $checkOut = $('.js-datepicker[name="check-out"]');

$('.js-datepicker').inputmask({
  alias: 'datetime',
  inputFormat: 'dd.mm.yyyy',
  placeholder: 'ДД.ММ.ГГГГ',
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



$checkOut.click( function() {
  $(this).parents('form').find($checkIn).data('datepicker').show();
});

$checkOut.focus( function() {
  $(this).parents('form').find($checkIn).data('datepicker').show();
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
      input.parents('form').find($checkIn).data('datepicker').selectDate(date);
      input.parents('form').find($checkOut).focus();
    } else {
      input.attr('placeholder', '30');
    }
  }
}