$(document).ready(() => {
  $('.js-filter__button').click(() => {
    $('.filter').toggleClass('filter_expanded');
    $('.filter__form').toggleClass('filter__form_expanded');
    $('.filter__icon').toggleClass('filter__icon_expanded');
    $('.page').toggleClass('page_hidden');
  });
});