import './lib/jquery.inputmask.min';

$('.js-date').inputmask({
  alias: 'datetime',
  inputFormat: 'dd.mm.yyyy',
  placeholder: 'ДД.ММ.ГГГГ'
});