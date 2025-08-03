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
});