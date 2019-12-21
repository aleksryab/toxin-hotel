(function ($) {
  $.fn.dropdown = function (options) {
    this.each(function () {
      const $mainInput = $(this).find('.input__field');
      const $dropdownContent =  $(this).find('.dropdown__content');
      const $inputButton = $(this).find('.input__button');
      const $items = $dropdownContent.find('.dropdown__item');
      const $itemInputs = $items.find('.dropdown__value');
      const $controlButtons = $dropdownContent.find('.dropdown__button');
      const $decrementButtons = $dropdownContent.find('.dropdown__button[data-action="minus"]');
      const $menuButtons = $dropdownContent.find('.dropdown__menu-button');
      const $clearButton = $dropdownContent.find('.dropdown__menu-button[data-action="clear"]');
      let totalValue = $mainInput.val();

      updateControls();

      $mainInput.click(event => {
        event.preventDefault();
        $mainInput.toggleClass('input__field_expanded');
        $dropdownContent.toggleClass('dropdown_expanded');
      });

      $controlButtons.click(function() {
        actionHandler($(this));
      });

      $menuButtons.click(function() {
        actionHandler($(this));
      });

      $('body').click(event => {
        if(!$(event.target).closest($dropdownContent).length &&
            !$(event.target).closest($mainInput).length &&
            !$(event.target).closest($inputButton).length){

           hide();
        }
      });


      function actionHandler(button){
        const itemInput = button.parent().children('.dropdown__value');
        let action = button.data('action');
        let itemValue =  itemInput.val();

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
        $items.each(function(index) {
          let itemVal = $itemInputs.eq(index).val();
          if(itemVal <= 0) {
            $decrementButtons.eq(index).addClass('dropdown__button_disabled');
          } else {
            $decrementButtons.eq(index).removeClass('dropdown__button_disabled');
          }
        });

        if (totalValue) {
          $clearButton.removeClass('dropdown__menu-button_disabled');
        } else {
          $clearButton.addClass('dropdown__menu-button_disabled');
        }
      }

      function hide() {
        $mainInput.removeClass('input__field_expanded').focusout();
        $dropdownContent.removeClass('dropdown_expanded');
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

  $('.js-dropdown').dropdown();
}(jQuery));