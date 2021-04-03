/**
 * @name BilibiliVideo.js
 * @author 机智的小鱼君
 * @description Add video from bilibili.com to article
 */
!(function () {
  function init(i18n) {
    $('.BiliVideo, .BilibiliVideo').html(function () {

      // Variables
      var $this = $(this)
      var videoId
      var av = $this.attr('data-av')
      var bv = $this.attr('data-bv')
      var page = $this.attr('data-page') || $this.attr('data-param') || 1 // data-param is typo made by the author in the old version
      var size = $this.attr('data-size') || $this.attr('data-width') || '80%'

      // Verify data
      // Video ID must be set
      if (!av && !bv) {
        return $('<span>', { class: 'error', text: i18n.msg('undefineAv').escape() })
      }
      // Video ID
      if (bv) {
        bv = bv.replace(/^bv/i, '')
        videoId = 'bvid=' + bv
      } else if (av) {
        av = av.replace(/^av/i, '')
        // AV number must be positive integer
        if (!/^[1-9]\d*$/.test(av)) {
          return $('<span>', { class: 'error', text: i18n.msg('invalidAvNumber').escape() })
        }
        videoId = 'aid=' + av
      }
      // Page of video must be positive integer
      if (!/^[1-9]\d*$/.test(page)) {
        page = 1
      }

      // build iframe element
      var $iframe = $('<iframe>', {
        class: 'bili-show bilibili-iframe',
        id: bv ? 'bv-' + bv : 'av-' + av,
        src: '//player.bilibili.com/player.html?' + videoId + '&page=' + page,
        scrolling: 'no',
        border: 0,
        frameborder: 'no',
        framespacing: 0,
        allowfullscreen: true
      }).css('width', size)

      // Resize
      function resizeBilibili() {
        $iframe.height(function () {
          return $(this).width() / 4 * 3
        })
      }
      // Run
      $iframe.load(resizeBilibili)
      $(window).resize(resizeBilibili)
      $('.mw-collapsible-toggle').click(resizeBilibili)

      // Return element
      return $iframe

    })
  }

  // i18n-js
  mw.hook('dev.i18n').add(function (i18no) {
    i18no.loadMessages('BilibiliVideo').then(init);
  });
  importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
  });
})();