import 'webpack-jquery-ui/slider';

$(function() {

  const  postfix = '\u20BD';

  $('.js-range-slider').slider({
    range: true,
    min: 0,
    max: 15000,
    values: [5000, 10000],
    classes: {
      "ui-slider-handle": "range-slider__handle",
      "ui-slider-range": "range-slider__range"
    },
    slide: (event, ui) => {
      $('.range-slider__value').val(checkDigit(ui.values[0]) + postfix + ' - ' + checkDigit(ui.values[1]) + postfix);
    }
  });

  $('.range-slider__value')
    .val( checkDigit($('.js-range-slider').slider( 'values', 0 )) +
            postfix + ' - ' +
            checkDigit($( '.js-range-slider').slider( 'values', 1)) +
            postfix);

  function checkDigit(value) {
    value = String(value);
    return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

});