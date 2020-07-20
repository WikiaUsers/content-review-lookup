/**
 * BilibiliVideo
 * Author: 机智的小鱼君
 * Synopsis: Show h5 VideoPlayer for video from bilibili.com
 * LOGs
 ** 12:13, December 17, 2018 (UTC) : Beta post
 ** 18:33, December 17, 2018 (UTC) : Update data filter
 ** January 27, 2019 (UTC) : i18n
 **/
$(function() {
  function init(i18n) {
    $('.BiliVideo, .BilibiliVideo').html(function() {
      var av = this.dataset.av;
      var param = this.dataset.param;
      var size = this.dataset.size;
      if (param === '' || param === null) {
        param = '1';
      }
      if (size === '' || size === null) {
        size = '80%';
      }
      if (av === '' || av === undefined || av === null) {
        //av是必须的参数
        return '<span style="font-weight:800;color:red">' + i18n.msg('undefineAv').escape() + '</span>';
      } else if (!/^\d+$/.test(av) || !/^\d+$/.test(param)) {
        //av号和分p仅允许纯数字
        return '<span class="error">' + i18n.msg('invalidData').escape() + '</span>';
      } else if (size.substring(size.length - 1) !== "%" && size.substring(size.length - 2) !== "px") {
        //检查尺寸参数是否符合规定
        return '<span class="error">' + i18n.msg('invalidSize').escape() + '</span>';
      } else {
        return $('<iframe>', {
          'class': 'bili-show',
          'src': '//player.bilibili.com/player.html?aid=' + av + '&page=' + param,
          'scrolling': 'no',
          'border': '0',
          'frameborder': 'no',
          'framespacing': '0',
          'allowfullscreen': 'true',
          'width': size
        }).prop('outerHTML');
      }
    });
    //优化iframe大小，因为用css无法定义长宽比
    function resizeBilibili() {
      $('iframe.bili-show').height(function() {
        return $(this).width() / 4 * 3;
      });
    }
    resizeBilibili();
    //特殊情况
    $(window).resize(resizeBilibili);
    $('.mw-collapsible-toggle').click(resizeBilibili);
  }
  mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('BilibiliVideo').then(init);
  });
  importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
  });
});