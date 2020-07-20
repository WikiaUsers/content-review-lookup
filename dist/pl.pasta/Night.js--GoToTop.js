/*
 * Go To Top
 * Napisane przez Py64
 * Data utworzenia: 17.10.2014r. 18:44
 * Wyświetl przycisk ,,Na górę"
*/

var GTTInterval;
var GTTMsg = 'Na górę';

$('body').append('<div class="toTop" onclick="GTT()">' + GTTMsg + '</div>');

$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}
function GTT() {
$('.WikiaHeader').scrollView();
}