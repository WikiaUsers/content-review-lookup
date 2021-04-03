/**
 * @name VariantMenu.js
 *
 * @author Winston Sung
 * @author 机智的小鱼君
 *
 * @desc ZH wikis' modern variant menu
 *       Temporary implement for MAIN-21654, IW-4490
 */
!(function() {
  // Variables
  var conf = mw.config.get([
    'wgAction',
    'wgArticleId',
    'wgContentLanguage',
    'wgPageContentModel',
    'wgPageName',
    'wgUserVariant'
  ])
  var $subtitle = $('.page-header__page-subtitle')
 
  if (!/zh/i.test(conf.wgContentLanguage)) {
    return console.log('VariantMenu.js was built for zh wikis.')
  }
  if ($subtitle.length < 1) return
  if ($('[id^="ca-varlang-"]').length < 1) return
 
  mw.loader.using(['mediawiki.util'], function() {
    // Hide default varlang links
    // $('[id^="ca-varlang-"]').hide()
    $subtitle.html(function() {
      var html = $(this).html()
      // html = html.replace(/(\|[\s\|]+?)+/g, '|')
      html = html.replace(
        /( *\|\s+?)?<a[^<>\|]*?id="ca-varlang-[0-9]+".*?>.*?<\/a>/g,
        ''
      )
      html = html.trim()
      return html
    })
 
    // Utils
    var userVariant = conf.wgUserVariant
 
    var variantId = {
      zh: '0',
      'zh-hans': '1',
      'zh-hant': '2',
      'zh-cn': '3',
      'zh-hk': '4',
      'zh-mo': '5',
      'zh-my': '6',
      'zh-sg': '7',
      'zh-tw': '8'
    }
 
    var variantName = {
      zh: '不转换',
      'zh-hans': '简体',
      'zh-hant': '繁體',
      'zh-cn': '大陆简体',
      'zh-hk': '香港繁體',
      'zh-mo': '澳門繁體',
      'zh-my': '大马简体',
      'zh-sg': '新加坡简体',
      'zh-tw': '臺灣正體'
    }
 
    var variantLink = function(lang) {
      if (!variantName[lang]) return ''
      var urlParams = {}
      var url = location.href
      url = url.split('#')[0].split('?')[1]
      if (url) {
        url = url.split('&')
        $.each(url, function(index, param) {
          param = param.split('=')
          var key = decodeURI(param[0])
          var val = decodeURI(param[1]) || ''
          urlParams[key] = val
        })
      }
      urlParams.variant = lang
      urlParams = $.param(urlParams)

      return $('<li>').append(
        $('<a>', {
          id: 'ca-varlang-' + variantId[lang],
          text: variantName[lang],
          href: '?' + urlParams
        })
      )
    }
 
    // Create Element
    // Make list
    var $allVariantList = $('<ul>', {
      class: 'wds-list wds-is-linked variant-list'
    })
    $.each(Object.keys(variantName), function(index, lang) {
      if (lang === userVariant) return
      $allVariantList.append(variantLink(lang))
    })
    // svg triangle
    var $triangle =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"><template shadowmode="closed"><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></template></use></svg>'
 
    // make menu
    var $variantMenu = $('<div>', {
      class: 'wds-dropdown page-header__languages page-header__variants'
    }).append(
      $('<div>', { class: 'wds-dropdown__toggle' }).append(
        $('<span>', {
          class: 'user-variant',
          'data-tracking': 'variant-dropdown'
        }).append(variantName[userVariant] || variantName['zh']),
        $triangle
      ),
      $('<div>', {
        class:
          'wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned'
      })
        .css({ 'z-index': 2 })
        .append($allVariantList)
    )
 
    // Append menu
    $('.page-header__contribution > div:first').prepend($variantMenu)
 
    // Add style
    mw.util.addCSS(
      '.page-header__variants + .page-header__languages{margin-left: 5px;}'
    )
  })
})()