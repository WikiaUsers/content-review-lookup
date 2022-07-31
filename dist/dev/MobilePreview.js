/**
 * @name MobilePreview
 * @author 机智的小鱼君
 * @author Laclale (proposed new method of filtering namespaces)
 *
 * @summary Used file: [[File:Loading.gif]]
 */

/**
 *
 * @param {import('jquery').JQueryStatic} $
 * @param {import('types-mediawiki')} mw
 */
;(function($, mw) {
  var conf = mw.config.get(['wgNamespaceNumber', 'wgPageName']);

  function init(ctx) {
    var i18n = ctx[0];
    var Modal = ctx[1].Modal;

    // 过滤不支持Mercury的名字空间
    var skipNamespace = [
      -1,
      1,
      2,
      3,
      4,
      5,
      7,
      8,
      9,
      10,
      11,
      828,
      1200,
      1201,
      1202,
    ];
    if (skipNamespace.includes(conf.wgNameSpaceNumber)) {
      return console.info('MobilePreview stoped');
    }

    var previewSrc = mw.util.getUrl(conf.wgPageName, {
      useskin: 'fandommobile',
      'mobile-app': true,
    });

    $('.wds-global-navigation__user-menu .wds-list, .wiki-tools .wds-dropdown__content .wds-list').append(
      // 添加按钮
      $('<li>').append(
        $('<a>')
          .attr({
            href: 'javascript:;',
            id: 'MobilePreview',
          })
          .html(i18n.msg('PreviewBtn').escape())
          .on('click', function() {
            // 预览区域的内容
            var $modalTitle = $('<div>', {
              text: i18n.msg('BoxHeader').escape(),
            });
            var $modalPlaceholder = $('<div>')
              .attr('id', 'MercuryPreviewLoading')
              .css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                'z-index': '10',
                'background-color': 'rgba(255,255,255,0.3)',
                'background-image':
                  'url(https://vignette.wikia.nocookie.net/dev/images/4/42/Loading.gif/revision/latest?cb=20120218000406)',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
              });
            var $iframe = $('<iframe>')
              .attr({
                id: 'MobilePreviewModalIframe',
                src: previewSrc,
              })
              .css({
                width: 400,
                height: '100%',
              });
            var $modalContent = $('<div>')
              .attr('id', 'MobilePreviewModalContent')
              .css({
                'text-align': 'center',
                width: '100%',
                height: 'calc(100vh - 8rem)',
              })
              .append($modalPlaceholder, $iframe);

            var modalID = 'MobilePreview-' + Date.now();

            // Show Modal
            var $modal = new Modal({
              id: modalID,
              title: $modalTitle.get(0),
              content: $modalContent.get(0),
              size: 'content-size',
              isHTML: true,
              buttons: [],
              events: {},
            });
            $modal.create();
            $modal.show();

            // 加载完毕，清除不必要元素
            function cleanIframe() {
              $iframe.css('background-image', 'none');
              $modalPlaceholder.remove();
              $iframe
                .contents()
                .find('a')
                .removeAttr('href');
            }
            $iframe.on('load', cleanIframe).on('error', cleanIframe);
            setTimeout(cleanIframe, 15 * 1000);
          })
      )
    );
  }

  // Await dependencies
  importArticle(
    {
      type: 'style',
      articles: ['u:dev:MediaWiki:MercuryPreview.css'],
    },
    {
      type: 'script',
      articles: ['u:dev:MediaWiki:I18n-js/code.js', 'u:dev:MediaWiki:Modal.js'],
    }
  );

  Promise.all([
    new Promise(function(resolve) {
      mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('MobilePreview').then(function(i18n) {
          resolve(i18n);
        });
      });
    }),
    new Promise(function(resolve) {
      mw.hook('dev.modal').add(function(modal) {
        resolve(modal);
      });
    }),
  ]).then(init);
})(jQuery, mediaWiki);