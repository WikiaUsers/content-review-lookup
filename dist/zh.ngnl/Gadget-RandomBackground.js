/** 
 * @name RandomBackground
 */
!(function () {

  // Cache config
  var conf = mw.config.get()
  var listPageName = conf.wgFormattedNamespaces[4] + ':RandomBackgroundList'

  // @function Get random string
  function getRandom(arr) {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - 1,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(min)
  }

  // Get Background image list
  new mw.Api().get({
    format: 'json',
    action: 'parse',
    page: listPageName,
    prop: 'wikitext'
  }).then(function (data) {
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
    function randomBg() {
      var item = getRandom(bgList),
        img = item[0].img,
        des = item[0].des
      $('body').css('background-image', 'url(' + img + ')')
    }

    // Run while ready
    randomBg()

    // Add button
    $('.wds-community-header__local-navigation .wds-tabs').append(
      $('<li>', { 'class': 'wds-tabs__tab' }).append(
        $('<div>', { 'class': 'wds-tabs__tab-label' }).append(
          $('<a>', {
            'src': 'javascript:void(0);',
            'id': 'RandomBg'
          }).append(
            $('<img>', { src: 'https://vignette.wikia.nocookie.net/no-game-no-life/images/7/70/Random.png/revision/latest?cb=20190616113051&format=original&path-prefix=zh', style: 'width:12px;height:12px;margin-right:4px' }),
            '随机背景'
          ).click(randomBg)
        )
      )
    )

    // Format list page
    if (conf.wgPageName.replace(/_/g, ' ') === listPageName) {
      $('#mw-content-text').html('').append(
        $('<pre>', { text: JSON.stringify(pageJson, null, 2) })
      )
    }
  })
})()