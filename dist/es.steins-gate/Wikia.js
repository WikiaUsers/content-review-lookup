/* Tabber abajo */
var tabberOptions = {
    'onLoad': function() {
       $('.infobox').each(function() {
          $(this).find('.tabbernav').insertAfter($(this).find('.tabberlive:last-child'));
       });
    }
};