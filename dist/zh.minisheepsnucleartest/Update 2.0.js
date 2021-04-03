//角色頁面顯示用(Template:Char/gallery)
; (function ($) {
  var GalleryFunc = function (gallery) {
    //大圖切換按鈕
    $('#image-change-list').on('click', '.change-button', function(){
      $('.change-button.click').removeClass('click');
      $(this).addClass('click');
      var chooseVar = $(this).data('id');
      if (!chooseVar) return;
      $('.full-card-area .show').removeClass('show');
      var item = $('.full-card-image[data-id="' + chooseVar + '"]', $('.full-card-area'));
      if (item) item.addClass('show');
    });

    //換裝切換按鈕
    $('.change-clothing-list').on('click', '.change-cloth-button', function(){
      $('.change-cloth-button.click').removeClass('click');
      $(this).addClass('click');
      var clothVer = $(this).data('cloth');
      if (!clothVer) return;
      $('.full-card-area .cloth-show').removeClass('cloth-show');
      var item = $('.full-card-image[data-cloth="' + clothVer + '"]', $('.full-card-area'));
      if (item) item.addClass('cloth-show');
    });
  }



  $(document).ready(function () {
    var gallery = $('.char-gallery');
    if (!gallery) return;
    GalleryFunc (gallery);
  });
}(jQuery));


; (function ($) {
  var ShowPicDiv = function (content) {
    content.on('click', '.sg-slide-icon', function(){
      var chooseVar = $(this).data('id');

      $('.sg-slide-main-visible', content).each(function(){
        $(this).removeClass('sg-slide-main-visible').addClass('sg-slide-main-invisible');
      });
      var item = $('.sg-slide-main-invisible[data-id="' + chooseVar + '"]', content);
      if (item) item.removeClass('sg-slide-main-invisible').addClass('sg-slide-main-visible');
    });
  }



  $(document).ready(function () {
    var content = $('.sg-slide-content');
    if (!content) return;
    ShowPicDiv (content);
  });
}(jQuery));


; (function ($) {
  $(document).ready(function () {
    var poster = $('.mw-home-detail-multiplayer').parents('.tpl-news-type-1');
    if (poster) poster.css('padding-top', '25px');
  });
}(jQuery));