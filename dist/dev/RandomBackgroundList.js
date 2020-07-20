/**
 * Random Background List
 ** Save your community's random background images list on Project page
 ** Update background image list without review
 ** Display custom image descriptions(eg.Copyright)
 **/
$(function () {
  function init(i18n) {
    // Variables
    var list,
    formatText,
    api = new mw.Api(),
    config = mw.config.get(['wgArticlePath','wgNamespaceNumber','wgNamespaceNumber','wgTitle','wgAction']),
    msgRandom = i18n.msg('RandomBackground').escape(),
    msgAbout = i18n.msg('AboutBackground').escape(),
    msgView = i18n.msg('ViewBackground').escape(),
    msgDescription = i18n.msg('Description').escape().replace('$1','<a href="https://dev.fandom.com/wiki/RandomBackgroundList" target="_blank">dev wiki:RandomBackgroundList</a>'),
    msgDescriptionList = '<code>list</code>: '+i18n.msg('DescriptionList').escape(),
    msgDescriptionImg = '<code>img</code>: '+i18n.msg('DescriptionImg').escape(),
    msgDescriptionDes = '<code>des</code>: '+i18n.msg('DescriptionDes').escape();
 
    // Function get random arr
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
 
    // Main function
    function randomBg(bglist) {
      var item = getRandomArrayElements(bglist.list, 1),
      imgname = item[0].img.replace(/file\:/i, ''),
      imgsrc = config.wgArticlePath.replace('$1', 'Special:Filepath/' + imgname),
      imgpage = config.wgArticlePath.replace('$1', 'File:' + imgname),
      des = item[0].des;
 
      $('body.skin-oasis').css({
        'background-image': 'url(' + imgsrc + ')'
      });
 
      if ($('.background-license-description').length === 0) {
        $('.license-description')
          .append(
            $('<div>', {
              'class': 'background-license-description'
            }
          )
        );
      }
      if (des !== undefined) {
        $('.background-license-description').html(msgAbout.replace('$1', des).replace('$2', '(<a href="' + imgpage + '">' + msgView + '</a>)')).append(
          $('<a>',{
            'href':'javascript:void(0)',
            'style':'float:right'
          }).text(msgRandom).click(function(){randomBg(list)})
        );
      } else {
        $('.background-license-description').html(msgAbout.replace('$1', '<a href="' + imgpage + '">' + msgView + '</a>').replace('$2', '')).append(
          $('<a>',{
            'href':'javascript:void(0)',
            'style':'float:right'
          }).text(msgRandom).click(function(){randomBg(list)})
        );
      }
    }
 
    // Get list
    new mw.Api().get({
      action: 'parse',
      page: 'Project:Random-background-list',
      prop: 'wikitext',
      format: 'json'
    }).done(function (data) {
      var wikitext = data.parse.wikitext['*'];
      list = JSON.parse(wikitext);
      randomBg(list);
      // Format list page
      if (config.wgNamespaceNumber === 4 && config.wgTitle === 'Random-background-list' &&config.wgAction === 'view') {
        $('#mw-content-text').html('<p>'+msgDescription+'<ul><li>'+msgDescriptionList+'</li><li>'+msgDescriptionImg+'</li><li>'+msgDescriptionDes+'</li></ul></p>'+'<pre>'+wikitext+'</pre>');
      }
    });
 
    // Add button
    $('.wds-community-header__local-navigation .wds-tabs').append(
      $('<li>', {
        'class': 'wds-tabs__tab random-background-btn'
      }).append(
        $('<div>', {
          'class': 'wds-tabs__tab-label'
        }).append(
          $('<img>', {
            'src': 'https://vignette.wikia.nocookie.net/no-game-no-life/images/7/70/Random.png/revision/latest?cb=20190616113051&format=original&path-prefix=zh',
            'style': 'width:12px;height:12px;'
          }),
          $('<a>', {
            'href': 'javascript:void(0)'
          })
            .text(msgRandom)
            .click(function () {
              randomBg(list);
            }
          )
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