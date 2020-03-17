$(document).ready(() => {
  $('.js-user-bar__button').click(event => {
    $('.user-bar__form').toggleClass('user-bar__form_showed');
  });
});