/**
 * @name RandomBackground
 * @author 机智的小鱼君
 * @url https://ngnl.fandom.com/zh/wiki/MediaWiki:Gadget-RandomBackground.js
 */
!(function() {
  // Cache config
  var conf = mw.config.get()
  var listPageName = conf.wgFormattedNamespaces[4] + ':RandomBackgroundList'

  // @function Get random string
  function randomPick(list) {
    return list[Math.floor(Math.random() * list.length)]
  }

  // Get Background image list
  new mw.Api()
    .get({
      format: 'json',
      action: 'parse',
      page: listPageName,
      prop: 'wikitext',
    })
    .then(function(data) {
      var wikitext = data.parse.wikitext['*']
      // Cache images
      var bgList = []
      var pageJson = {}
      try {
        pageJson = JSON.parse(wikitext)
        bgList = pageJson.list || []
      } catch (err) {
        console.error('[Random Background]', err)
        return
      }
      if (bgList.length < 1) return

      // @function randomBg
      function setRandomBg() {
        var item = randomPick(bgList),
          img = item.img,
          des = item.des
        if ($('style#randomBgConfig').length < 1) {
          $('head').append($('<style>', { id: 'randomBgConfig' }))
        }
        $('style#randomBgConfig').text(
          ':root { --theme-custom-background-image: url(' + img + ') }'
        )
      }

      // Run while ready
      setRandomBg()

      // Format list page
      if (conf.wgPageName.replace(/_/g, ' ') === listPageName) {
        $('#mw-content-text')
          .html('')
          .append($('<pre>', { text: JSON.stringify(pageJson, null, 2) }))
      }
    })

  // Add button
  mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('RandomBackgroundList').then(function(i18n) {
      $('.fandom-community-header__local-navigation .wds-tabs').append(
        $('<div>', { class: 'wds-dropdown' }).append(
          $('<div>', { class: 'wds-tabs__tab-label first-level-item' }).append(
            $('<a>', {
              src: 'javascript:void(0);',
              id: 'randomBgBtn',
            })
              .append(
                $('<img>', {
                  src:
                    'https://vignette.wikia.nocookie.net/no-game-no-life/images/7/70/Random.png/revision/latest?cb=20190616113051&format=original&path-prefix=zh',
                  style: 'width:12px;height:12px;margin-right:4px',
                }),
                i18n.msg('RandomBackground').parse()
              )
              .on('click', setRandomBg)
          )
        )
      )
    })
  })
  importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js',
  })
})()