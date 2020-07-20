/*
 * Name: HideChatRail
 * Description: Allows you to hide the chat rail to be able to use the window in a smaller size.
 * Author: Pogodaanton
 * Note: This script makes use of the JavaScript Standard Style
 */

/* global $ mw */

$(function () {
  if (
    mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
    window.HideChatRailLoaded
  ) return
  window.HideChatRailLoaded = true

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  var hcr = {
    splotch: false,
    railObserver: null,
    privateObserver: null,

    toggle: function () {
      $('#Rail, .Chat, .Write, #ChatHeader .username').toggleClass('closed')
    },

    toggleUnread: function (data) {
      var curTarget = $('.Rail')
      var children = curTarget.find('h1.public.wordmark, #PrivateChatList li.User')
      var isUnread = false

      setTimeout(function () {
        for (var a = 0; a < children.length; a++) {
          var child = $(children[a])[0]
          if ($(child).hasClass('unread')) isUnread = true
        }

        if (isUnread) curTarget.addClass('unread')
        else curTarget.removeClass('unread')
      }, 2000)
    },

    // 
    toggleInline: function () {
      var target = '#ChatHeader .private'
      var attr = $(target).attr('style')

      if (typeof attr === 'undefined' || attr === 'display: block;') {
        $(target).addClass('inline-block')
      } else {
        $(target).removeClass('inline-block')
      }
    },

    // Get %BORDER% color
    getColor: function () {
      return [
        $('#WikiaPage').css('border-left-color'),
        $('.Rail .selected').css('background-color'),
        'rgba' + $('#WikiaPage').css('background-color').slice(3, -1) + ', 0.8)'
      ]
    },

    // Setting up viewport, EventListeners, MutationObservers
    init: function () {
      $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0"/>')

      $.get('/load.php?debug=false&lang=de&mode=articles&articles=u%3Adev%3AMediaWiki%3AHideChatRail.css&only=styles&cb=' + new Date().getTime(), function (data) {
        mw.util.addCSS(data.replace(/%%BORDER%%/g, hcr.getColor()[0]).replace(/%%SEL%%/g, hcr.getColor()[1]).replace(/%%BG%%/g, hcr.getColor()[2]))
      })

      $(document).on('click', '#ChatHeader .User', hcr.toggle)
      $(document).on('click', '.Rail', hcr.toggleUnread)

      this.railObserver = new MutationObserver(hcr.toggleUnread)
      $('.Rail').find('h1.public.wordmark, #PrivateChatList, #PrivateChatList .splotch').each(function () { hcr.railObserver.observe(this, { childList: true, characterData: true, attributes: true }) })

      this.privateObserver = new MutationObserver(hcr.toggleInline)
      hcr.toggleInline()
      this.privateObserver.observe(document.getElementById('ChatHeader').getElementsByClassName('private')[0], { attributes: true, attributeFilter: ['style'], childList: true })
    }
  }

  hcr.init()
})