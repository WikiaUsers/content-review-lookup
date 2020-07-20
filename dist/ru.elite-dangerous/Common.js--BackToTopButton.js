/**Кнопка Наверх (Взято с http://ru.warframe.wikia.com/)**/
 
 
function hideFade() {
  // hide #backtotop first
  $('#backtotop').hide();
  // fade in #backtotop
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > ButtonStart) {
        switch (FadeSwitch) {
          case 0:
            $('#backtotop').show();
            break;
          default:
            $('#backtotop').fadeIn();
            break;
        }
      } else {
        switch (FadeSwitch) {
          case 0:
            $('#backtotop').hide();
            break;
          default:
            $('#backtotop').fadeOut();
            break;
        }
      }
    });
  });
}
function goToTop() {
  // scroll body to 0px on click
  $('body,html').animate({
    scrollTop: 0
  }, ScrollSpeed);
  return false;
}
function addBackToTop() {
  if (skin == 'oasis') {
    $('<div id="backtotop" onclick="goToTop();"></div>').prependTo('body.mediawiki');
    hideFade();
  }
}
var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
if (!window.BackToTop) {
  $(document).ready(addBackToTop);
}
var BackToTop = true; // prevent duplication
if (typeof Start == 'number') {
  ButtonStart = Start;
}
if (typeof Speed == 'number') {
  ScrollSpeed = Speed;
}
if (typeof ToggleFading == 'number') {
  FadeSwitch = ToggleFading;
}
 
//</source>