$(function() {
  $('.js-checkbox-list').each(function() {
    const checkboxList = $(this);
    checkboxList.find('.checkbox-list__title').click(() => {
      checkboxList.toggleClass('checkbox-list_expanded');
    });
  });
});
