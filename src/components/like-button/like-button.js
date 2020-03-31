$('.js-like-button').click(function(event) {
  const valueBox = $(this).find('.like-button__value');
  let value = +valueBox.text();

  if ($(this).hasClass('like-button_liked')) {
    valueBox.text(--value);
  } else {
    valueBox.text(++value);
  }

  $(this).toggleClass('like-button_liked');
});