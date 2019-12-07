import '../input/input';
import './datepicker/datepicker';

export default function searchRoom(){

  let $checkIn = $('.js-datepicker[name="check-in"]'),
      $checkOut = $('.js-datepicker[name="check-out"]');

  let calendar = $checkIn.datepicker({
    language: 'ru',
    range: true,
    minDate: new Date(),
    clearButton: true,
    applyButton: true,
    multipleDates: 2,
    twoInputs: true,
    inputMin: $checkIn,
    inputMax: $checkOut,
    dateFormat: 'dd.mm.yyyy',
    keyboardNav: false,
    offset: 5,
    navTitles: {
      days: 'MM yyyy'
    },
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>'
  });

  $checkOut.click( () => {
    calendar.data('datepicker').show();
    }
  );
  $checkOut.focus( () => {
    calendar.data('datepicker').show();
    }
  );

  $('.js-datepicker').inputmask({
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ',
    oncomplete: (opt) => {
      select(opt.target.value);
    }
  });

  function select(value) {

    if (value.match(/^\d\d\.\d\d\.\d\d\d\d$/)) {

      value = value.split('.');
      let date = new Date();
      date.setDate(value[0]);
      date.setMonth(value[1]-1);
      date.setFullYear(value[2]);

      if(date >= new Date().setHours(0, 0, 0, 0)) {
        calendar.data('datepicker').selectDate(date);
      }
    }
  }
}

