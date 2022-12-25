$(function () {
  $('.mpb-inner[data-link]').click(function () {
    $('.mpb-view.mpb-' + $(this).attr('data-link')).css({ width: '100%' });
    $('.mpb-slider').animate({ scrollLeft: parseInt($('.mpb-slider').css('width')) }, 250);
  });
  $('.mpb-view-back').click(function () {
    var _this = this;
 
    $('.mpb-slider').animate({ scrollLeft: 0 }, 250, function () {
      $(_this).parent().css({ width: '0' });
    });
  });
  $('.mpb-subcat-link[data-link]').click(function () {
    $(this).parent().find('.mpb-subcat-link').removeClass('mpb-active');
    $(this).parent().parent().find('.mpb-subcat').removeClass('mpb-active');
    $(this).addClass('mpb-active');
    $('.mpb-subcat.mpb-' + $(this).attr('data-link')).addClass('mpb-active');
  });
  $('.mpb-subcat-link[data-gwent]').click(function () {
    window.open('http://gwint.wikia.com/wiki/Gwint_Wiki', '_blank').focus();
  });
  $('.mpb-subcat-link[data-blog]').click(function () {
    window.open('http://wiedzmin.wikia.com/wiki/Blog_u%C5%BCytkownika:Ruttou/Jak_czyta%C4%87_wied%C5%BAmina%3F', '_blank').focus();
  });
});