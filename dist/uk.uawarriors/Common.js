/*Псевдослайдер-ультранавигация*/
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", "") );
        $(window).scroll();                     //Костыль, который имитирует прокрутку
        setTimeout($(window).scroll(), 1000);   // окна, чтобы загрузились картинки
    return false;
  });
});
});