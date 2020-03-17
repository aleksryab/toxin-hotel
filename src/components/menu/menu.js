$(document).ready(() => {
  $('.js-menu__button').click(event => {
    $('.menu__list').toggleClass('menu__list_open');
  });

  $('.js-menu__expander').click(event => {
    $(event.target).next('.menu__submenu').toggleClass('menu__submenu_expanded');
  });
});