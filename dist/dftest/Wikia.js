/** 
 * Random Background List
 ** Save your community's random background images list on Project page
 ** Update background image list without review
 ** Display custom image descriptions(eg.Copyright)
 **/
$(function() {
  function init(i18n) {
    // Variables
     var list;
 
    // Function get random arr
     function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
      while (i-->min) {
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
          imgname = item[0].img.replace(/file\:/i,''),
          imgsrc = mw.config.get('wgArticlePath').replace('$1','Special:Filepath/'+imgname),
          imgpage = mw.config.get('wgArticlePath').replace('$1','File:'+imgname),
          des = item[0].des;
 
       $('body.skin-oasis').css({
        'background-image': 'url(' + imgsrc + ')'
      });
 
      if ($('.background-license-description').length === 0) {
        $('.license-description').append(
           $('<div>',{
            'class': 'background-license-description'
          })
        );
      }
      if (des !== undefined) {
        $('.background-license-description').html(i18n.msg('AboutBackground').escape().replace('$1',des).replace('$2','(<a href="'+imgpage+'">'+i18n.msg('ViewBackground').escape()+'</a>)'));
      } else {
        $('.background-license-description').html(i18n.msg('AboutBackground').escape().replace('$1','<a href="'+imgpage+'">'+i18n.msg('ViewBackground').escape()+'</a>').replace('$2',''));
      }
    }
 
    // Get list
    new mw.Api().get({
      action: 'parse',
      page: 'Project:Random-background-list',
      prop: 'wikitext',
       format: 'json'
    }).done(function(data) {
      var wikitext = data.parse.wikitext['*'];
       list = JSON.parse(wikitext);
      randomBg(list);
    });
 
    // Add button
    $('.wds-community-header__local-navigation .wds-tabs').append(
      $('<li>',{'class':'wds-tabs__tab random-background-btn'}).append(
        $('<div>',{'class':'wds-tabs__tab-label'}).append(
          $('<img>',{
            'src': 'https://vignette.wikia.nocookie.net/no-game-no-life/images/7/70/Random.png/revision/latest?cb=20190616113051&format=original&path-prefix=zh',
            'style': 'width:12px;height:12px;'
          }),
          $('<a>',{
            'src': 'javascript:void(0);'
          })
          .text(i18n.msg('RandomBackground').escape())
          .click(function(){randomBg(list)})
        )
      )
    );
    if (mw.config.get('wgNameSpaceId') === 4 && mw.config.get('wgTitle') === 'Random-background-list') {
      // ???
    }
  }
  mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('RandomBackgroundList').then(init);
  });
  importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
  });
});