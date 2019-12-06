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
    prevHtml:
      '<svg width="17" height="18" viewBox="0 0 17 18" fill="#BC9CFF">' +
      '<path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" /></svg>',
    nextHtml:
      '<svg width="17" height="18" viewBox="0 0 17 18" fill="#BC9CFF">' +
      '<path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" /></svg>'
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

