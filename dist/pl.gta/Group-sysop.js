/***
 * Kod JavaScript zawarty na tej stronie jest uruchamiany przez administratorów.
 ***/

/*** Import gadżetów, które są również dla modków. ***/
importScriptPage('MediaWiki:Group-rollback.js')

/*** Przycisk czyszczący pole opisu przy usuwaniu stron ***/
$(function() {
  $('#wpDeleteReasonRow input').after('<a>wyczyść</a>');
  $('#wpDeleteReasonRow a').click(function() {
    $('#wpDeleteReasonRow input').val("");
  });
});