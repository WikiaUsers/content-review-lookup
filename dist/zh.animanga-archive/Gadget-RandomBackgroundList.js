/* RandomBackgroundList
 * @title           RandomBackgroundList.js
 * @version         2.0.0 alpha
 * @description     Adapted from https://ngnl.fandom.com/zh/wiki/MediaWiki:Wikia.js
 * @author          机智的小鱼君 (original), Winston Sung (adapted)
 * @license         CC-BY-SA-3.0
 */
$(function () {
  function init(i18n) {
    function msg(i) {
      return i18n.msg(i).parse();
    };
 
    function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
 
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }

    function randomBg() {
      new mw.Api().get({
        action: 'parse',
        page: 'MediaWiki:Custom-RandomBackgroundList/list',
        prop: 'wikitext',
        format: 'json'
      }).done(function (data) {
        var wikitext = data.parse.wikitext['*'],
          json = JSON.parse(wikitext),
          item = getRandomArrayElements(json.list, 1),
          img = item[0].img,
          des = item[0].des;
 
        $('body.skin-oasis').css({
          'background-image': 'url(' + img + ')'
        });
      });
    }
 
    randomBg();
 
    $('.wds-community-header__local-navigation .wds-tabs').append(
      $('<li>', { 'class': 'wds-tabs__tab' }).append(
        $('<div>', { 'class': 'wds-tabs__tab-label' }).append(
          $('<a>', {
            'src': 'javascript:;',
            'id': 'RandomBg'
          })
          .text(msg('RandomBackground'))
          .prepend('<img src="https://vignette.wikia.nocookie.net/no-game-no-life/images/7/70/Random.png/revision/latest?cb=20190616113051&format=original&path-prefix=zh" style="width:12px;height:12px;"/>&nbsp;')
          .click(randomBg)
        )
      )
    );
  }

  mw.hook('dev.i18n').add(function (i18no) {
    i18no.loadMessages('RandomBackgroundList').then(init);
  });
  importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
  });
});