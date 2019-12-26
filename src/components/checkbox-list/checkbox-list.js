$('.js-checkbox-list').each(function name() {
  const checkboxList = $(this);
  checkboxList.find('.checkbox-list__title').click(event => {
    checkboxList.toggleClass('checkbox-list_expanded');
  });
});
