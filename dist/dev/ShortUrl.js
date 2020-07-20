/**
 * @name Short URL
 * @author 机智的小鱼君
 * 
 * @description Get the "fake" short link provided by MediaWiki.
 *              Solve the very long link of the pages that name contain non-ASCII words.
 */
!(function () {
  if (window.shortUrl === undefined) {
    window.shortUrl = '';
  } else {
    return;
  }
  // 缓存 mw 变量
  var config = mw.config.get();
  // 判断是否存在文章ID
  if (config.wgArticleId > 0) {
    shortUrl = config.wgServer + config.wgScript + '?curid=' + config.wgArticleId;
    // 在文章后插入段落
    mw.hook('dev.i18n').add(function (data) {
      data.loadMessages('ShortUrl').then(function (i18n) {
        $('#WikiaArticle').after(
          $('<div>', { class: 'shortUrl-block' }).append(
            $('<span>', { class: 'shortUrl-description' }).append(
              $('<span>', { text: i18n.msg('share-this-page-with-link').parse() + ' ' }),
              $('<strong>', { text: shortUrl + ' ' }),
              $('<a>', { text: i18n.msg('copy').parse(), href: 'javascript:;' }).click(function () {
                // 创建 input 元素，选中复制，然后销毁
                var $this = $(this),
                  surlInput = $('<input>', { id: 'shortUrl-copy', value: shortUrl, style: 'z-index: -1; opacity: 0; position: absolute; left: -200vw;', readonly: 'readonly' });
                $this.append(surlInput);
                surlInput.select();
                document.execCommand('copy');
                surlInput.remove();
                $this.text(i18n.msg('copied').parse());
                setTimeout(function () {
                  $this.text(i18n.msg('copy').parse());
                }, 1500);
              })
            )
          )
        );
      });
    });
  }
  // 将短链接替换进文章
  $('.shortUrl').text(shortUrl);
  $('.shortUrl-link').html(
    $('<a>', { href: shortUrl, text: shortUrl })
  );
  // I18n
  importArticles({
    type: 'script',
    articles: [
      'u:dev:MediaWiki:I18n-js/code.js'
    ]
  });
}());