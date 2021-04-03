/* RandomBackgroundList
 * @title           RandomBackgroundList.js
 * @version         2.0.0 alpha
 * @description     Adapted from https://ngnl.fandom.com/zh/wiki/MediaWiki:Wikia.js
 * @author          机智的小鱼君 (1.0), Winston Sung (2.0)
 * @license         CC BY-SA 3.0
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
          .prepend('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAD3QAAA90BQ/0GwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJqSURBVGiB7Zm/axRBFMdnowSikGDApBXijzqg+QfS2IhlDCpEW0Fr7SySwuu0DPc3GFs7hQRrK5MgGKM5/Qf0gnf3sdg9HF7e7s5cdnb3ZD9wxe28+77v25ubmX1nTENDQ60AzgDzVfsYGeAD0AOeVO1lJPjHAHhctR9vOMmzqj15oRQwXkWkFADw1FXgNvA5Q6gHHABt4KKHsbnkM18TDV8GwP28JBFw5CG6B1xwMD8L7I9gWvJdak/Yb6IowhgzcL2rxpgrxpiWQ1zLGHPZQzeNfG/EU8jnW+gD1zP0biQxpyV/CrkATBJPHZttIFJiI2BHxO4Ckxn6aeYfndq8lWRZSbKmxD1Q4pZztCV94GFh5q1Eb0SiH8CMNT4D/BQxWw664c0nia4BxyLhujW+IcaOgaseBYQ/SgAtYfI3sJC8umLshaPmNmUd5oBpoCOMvga2xLUOMO2oeQ6YC+3dTniPfO6WZsgX4qXyfYb5dyhLbK0AFtE3qx6wWLU/J4BNpYDN0Hkn8kOc+eN4rX4ASylTqA8sVe0vE/Tzjs1OrX/EwEqG+SGrVftUId50DoRZbSM7BM57aJazkQHPhdEu6UeJ9XzFEo8SwCXglzC5YY3Lw1wXWHDQHRL2MMfJ4/QXYMoan0qu2bz1KGBI8S0V4KaSaEWJu6PE3fIsoNgigLPAR5FAXSrRl9hPhHykJL8vJKnPQz3+fSGAtsNNaRdQACh9IS3ZNw/BXWDWQbOoxtahSwEufaEO8BKHrpwo4hXxw/8oFNMXCk2G+eL6QiFRzIdrrYRgrM0b83/8xVReXygElN0XamgYc/4C1PQkM+3MoQQAAAAASUVORK5CYII=" style="width:12px;height:12px;"/>&nbsp;')
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