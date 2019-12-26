(function ($) {
  $.fn.dropdown = function () {
    const options = {
      default: {
        itemsOutput: false,
        totlaMin: 0,
        totalMax: Infinity,
      },
      guests: {
        totalMax: 10,
        itemsOutput: false,
        declensions: ['гостей', 'гость', 'гостя']
      },
      room: {
        totalMin: 1,
        totalMax: 10,
        itemsOutput: true,
        declensions: {
          bedrooms: ['спален', 'спальня', 'спальни'],
          beds: ['кроватей', 'кровать', 'кровати'],
          bathrooms: ['ванн', 'ванна', 'ванны']
        }
      }
    };

    this.each(function () {
      const $mainInput = $(this).find('.dropdown__field');
      const $dropdownContent =  $(this).find('.dropdown__content');
      const $items = $dropdownContent.find('.dropdown__item');
      const $itemInputs = $items.find('.dropdown__item-value');
      const $incrementButtons = $dropdownContent.find('.dropdown__button[data-action="plus"]');
      const $decrementButtons = $dropdownContent.find('.dropdown__button[data-action="minus"]');
      const $menuButtons = $dropdownContent.find('.dropdown__menu-button');
      const $clearButton = $dropdownContent.find('.dropdown__menu-button[data-action="clear"]');
      const dropdownRole = $(this).attr('data-role');
      let totalValue = 0;
      let itemsOutput, totalMax, totalMin;
      let itemRoles = [];
      let itemMinValues = [];
      let itemMaxValues = [];

      init();

      $mainInput.click(event => {
        event.preventDefault();
        $mainInput.toggleClass('dropdown__field_expanded');
        $dropdownContent.toggleClass('dropdown_expanded');
      });

      $('body').click(event => {
        if(!$(event.target).closest($(this)).length){
          hide();
        }
      });

      $decrementButtons.each(function(index){
        $(this).click(function(){
          let itemInput = $itemInputs.eq(index);
          let itemValue =  itemInput.val();

          if (itemValue > itemMinValues[index] && totalValue > totalMin) {
            itemValue--;
            totalValue --;
            itemInput.val(itemValue);
            update();
          }
        });
      });

      $incrementButtons.each(function(index){
        $(this).click(function(){
          let itemInput = $itemInputs.eq(index);
          let itemValue =  itemInput.val();

          if (itemValue < itemMaxValues[index] && totalValue < totalMax) {
            itemValue++;
            totalValue++;
            itemInput.val(itemValue);
            update();
          }
        });
      });

      $menuButtons.click(function() {
        actionHandler($(this));
      });

      function init() {
        itemsOutput = options[dropdownRole].itemsOutput ? options[dropdownRole].itemsOutput : options.default.itemsOutput;
        totalMin = options[dropdownRole].totalMin ? options[dropdownRole].totalMin : options.default.totlaMin;
        totalMax = options[dropdownRole].totalMax ? options[dropdownRole].totalMax : options.default.totlaMax;

        $items.each(function (index) {
          if (itemsOutput) {
            itemRoles.push($(this).attr('data-role'));
          }

          let minValue = $(this).attr('data-min') ? $(this).attr('data-min') : 0;
          itemMinValues.push(minValue);
          let maxValue = $(this).attr('data-max') ? $(this).attr('data-max') : Infinity;
          itemMaxValues.push(maxValue);

          totalValue += Number($itemInputs.eq(index).val());
        });

        update();
      }


      function actionHandler(button){
        let action = button.data('action');

        if (action === 'clear') {
          clear();
        }

        if (action === 'apply') {
          hide();
        }
      }

      function update() {
        let totalValueString = '';

        $items.each(function(index) {
          let itemValue = +$itemInputs.eq(index).val();
          if (itemsOutput && itemValue) {
            totalValueString += itemValue + ' ' + declension(itemValue, options[dropdownRole].declensions[itemRoles[index]]) + ', ';
          }
          updateControls(itemValue, index);
        });

        if (!itemsOutput && totalValue) {
          totalValueString = totalValue + ' ' + declension(totalValue, options[dropdownRole].declensions);
        }

        totalValueString = totalValueString.replace(/, $/, '');
        $mainInput.val(totalValueString);
        updateMenu();
      }

      function updateControls(itemValue, index) {

        if(itemValue <= itemMinValues[index] || totalValue <= totalMin) {
          $decrementButtons.eq(index).addClass('dropdown__button_disabled');
        } else {
          $decrementButtons.eq(index).removeClass('dropdown__button_disabled');
        }

        if(itemValue >= itemMaxValues[index] || totalValue >= totalMax) {
          $incrementButtons.eq(index).addClass('dropdown__button_disabled');
        } else {
          $incrementButtons.eq(index).removeClass('dropdown__button_disabled');
        }

      }

      function updateMenu() {
        if (totalValue) {
          $clearButton.removeClass('dropdown__menu-button_disabled');
        } else {
          $clearButton.addClass('dropdown__menu-button_disabled');
        }
      }

      function clear() {
        totalValue = 0;
        $items.each(function(index) {
          $itemInputs.eq(index).val(0);
          updateControls(0, index);
        });
        $mainInput.val('');
        updateMenu();
      }

      function hide() {
        $mainInput.removeClass('dropdown__field_expanded').focusout();
        $dropdownContent.removeClass('dropdown_expanded');
      }

      function declension(val, declensionsArray) {
        if (!declensionsArray) return '';

        switch (val) {
          case 0:
            return declensionsArray[0];
          case 1:
            return declensionsArray[1];
          case 2:
          case 3:
          case 4:
            return declensionsArray[2];
          default:
            if (val > 20) {
              if(val > 99) {
                return declension(val % 100, declensionsArray);
              }
              return declension(val % 10, declensionsArray);
            }
            return declensionsArray[0];
        }
      }
    });
    return this;
  };
}(jQuery));

$('.js-dropdown').dropdown();