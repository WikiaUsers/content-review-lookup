/**
 * Official Google Translate Script
 * Google's Official 'Plugin' that translates pages from default wiki language to user's default language
 */

$('head').append('<meta name="google-translate-customization" content="65b6fc2aac6fdfe3-ee1bbfa3517bae7f-g8e4de2d0f86fba97-14"></meta>');

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true}, 'google_translate_element');
}

$('.WikiHeader').append('<div id="google_translate_element" class="buttons" style="right: 176px;"></div>');
$('.WikiHeader').append('<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>');