(function ($) {
  $.fn.dropdown = function (options) {
    this.each( () => {
      const $mainInput = $(this);
      const $dropdownContent = $(this).parents('.input').find('.dropdown');
      const $inputButton = $(this).parents('.input').find('.input__button');
      const $items = $dropdownContent.find('.dropdown__item');
      const $clearButton = $dropdownContent.find('.dropdown__menu-button[data-action="clear"]');
      let totalValue = '';

      updateControls();

      $('body').click(function(event) {

        let target = $(event.target);

        if (target.closest($mainInput).length || target.closest($inputButton).length) {
          event.preventDefault();
          $mainInput.toggleClass('input__field_expanded');
          $dropdownContent.toggleClass('dropdown_expanded');

        } else if (target.is('.dropdown__button') || target.is('.dropdown__menu-button')) {
          event.preventDefault();
          calculation(target, target.attr('data-action'));

        } else if (!target.closest($dropdownContent).length) {
          hide();
        }
      });

      function hide() {
        $mainInput.removeClass('input__field_expanded').focusout();
        $dropdownContent.removeClass('dropdown_expanded');
      }

      function calculation(button, action){
        let itemInput = button.parent().children('.dropdown__value'),
            itemValue =  itemInput.val();
        totalValue = $mainInput.val().replace(/\D+/g,'');

        if (action === 'minus' && itemValue != 0) {
          itemValue--;
          totalValue--;
          itemInput.val(itemValue);
          updateValue();
        }

        if (action === 'plus') {
          itemValue++;
          totalValue++;
          itemInput.val(itemValue);
          updateValue();
        }

        if (action === 'clear') {
          totalValue = '';
          $items.each(function() {
            $(this).find('.dropdown__value').val(0);
          });
          updateValue();
        }

        if (action === 'apply') {
          hide();
        }
      }

      function updateValue() {
        if (totalValue) {
          totalValue += declension(totalValue);
        } else {
         totalValue = '';
       }
       $mainInput.val(totalValue);
       updateControls();
      }

      function updateControls() {
        $items.each(function () {
          let itemVal = $(this).find('.dropdown__value').val();
          let minusBtn = $(this).find('.dropdown__button[data-action="minus"]');
          if(itemVal <= 0) {
            minusBtn.addClass('dropdown__button_disabled');
          } else {
            minusBtn.removeClass('dropdown__button_disabled');
          }
        });

        if (totalValue) {
          $clearButton.removeClass('dropdown__menu-button_disabled');
        } else {
          $clearButton.addClass('dropdown__menu-button_disabled');
        }
      }

      function declension(val) {
        switch (val) {
          case 0:
            return ' гостей';
          case 1:
            return ' гость';
          case 2:
          case 3:
          case 4:
            return ' гостя';
          default:
            if (val > 20) {
              if(val > 99) {
                return declension(val % 100);
              }
              return declension(val % 10);
            }
            return ' гостей';
        }
      }

    });
    return this;
  };
}(jQuery));