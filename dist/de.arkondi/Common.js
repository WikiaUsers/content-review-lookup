/* Zum Abfragen, ob die neueste Version der Common.js auf einer Seite verwendet wird */
console.log('MediaWiki:Common.js - Version 45');

ajaxPages = ['Spezial:Letzte_Änderungen', 'Spezial:WikiActivity'];

importArticles({
  type: 'script',
  articles: [
    'w:c:dev:AjaxRC/code.js',
    'w:c:community:MediaWiki:Snow.js'
  ]
});

importArticles({
  type: 'style',
  articles: [
    'MediaWiki:Fringe-Schrift.css',
    'MediaWiki:HP-Schrift.css'
  ]
});

if (wgPageName == "Tabview") {
  importArticle({
    type: 'style',
    article: 'MediaWiki:Tabview-Blogbeitrag.css'
  })
}

if ($('#moon').length != 0) {
  importArticle({
    type: 'script',
    article: 'MediaWiki:Mondphasen-Skript.js'
  })
}
 
/* Link zur Hilfe im "Mitmachen"-Menü einfügen */
$('#WikiHeader > .buttons > nav > .WikiaMenuElement').append('<li><a href="/wiki/Hilfe:Übersicht">Hilfe</a></li>');

/**
 * Diese Funktion erweitert das "Mitmachen"-Menü um einen neuen Eintrag an der gewünschten Position.
 * @param wp - die gewünschte Position des neuen Eintrags
 * @param ne - das einzufügende Element
 */
function eintrageinfügen(wp, ne) {
  var mitmachen = $('#WikiHeader > .buttons > nav > .WikiaMenuElement > li');
  if (mitmachen.length >= wp) {
    mitmachen.slice(wp-1, wp).before(ne)
  } else {
    mitmachen.parent().append(ne)
  }
}

/* Auf [[Seiteninhalt auslesen]] den Inhalt der Seite [[Seiteninhalt auslesen/Test]] unterhalb der Kommentare einfügen */
if (mw.config.get('wgPageName') == 'Seiteninhalt_auslesen') {
  $(function() {
    mw.loader.using('mediawiki.api', function() {
    console.log('Api geladen');
    var api = new mw.Api();
    api.get( {
      action:'query',
      prop: 'revisions',
      titles: 'Seiteninhalt auslesen/Test',
      rvprop: 'content',
      rvparse: '',
      format: 'json'
    })
    .done(function(data) {
      console.log('data:' + data);
      for (var page in data['query']['pages']) {
        $('#WikiaArticleComments').after('<section>' + data['query']['pages'][page]['revisions'][0]['*'] + '</section>');
        break;
      }
    })
    .fail(function() {
      $('#WikiaArticleComments').after('<section>Hier sollte eigentlich etwas anderes stehen.</section>');
    })
  })
  });
}

function bloggreeting() {
    if (mw.config.get('wgNamespaceNumber') == 500) {
        var infos = mw.config.get('wgTitle').split("/");
        if (infos.length == 1) {
            api = new mw.Api();
            api.get( {
                action:'query',
                prop: 'revisions',
                titles: 'User:' + infos[0] + "/Blogbegrüßung",
                rvprop: 'content',
                rvparse: '',
                format: 'json'
            })
            .done(function(data) {
                for (var page in data['query']['pages']) {
                    $('.UserProfileActionButton').before('<div id="bloggreeting">' + data['query']['pages'][page]['revisions'][0]['*'] + '</div>');
                    break;
                }
            })
        }
    }
}

/* Funktion für den Forum-Header */
function forumheader() {
  var namespace = mw.config.get('wgNamespaceNumber');
  if (namespace == 1201 || namespace == 2000 || mw.config.get('wgCanonicalSpecialPageName') == 'Forum') {
    mw.loader.using('mediawiki.api', function() {
      api = new mw.Api();
      api.get( {
        action:'query',
        prop: 'revisions',
        titles: 'Seiteninhalt auslesen/Test',
        rvprop: 'content',
        rvparse: '',
        format: 'json'
      })
      .done(function(data) {
        for (var page in data['query']['pages']) {
          $('.WikiaPageHeader').after('<div id="forumnavigation">' + data['query']['pages'][page]['revisions'][0]['*'] + '</div>');
        }
      })
    })
  }
}

$(function () {
  eintrageinfügen(1, '<li><a href="/wiki/Hilfe:Übersicht">Hilfe</a></li>');
  bloggreeting();
  forumheader();
  /* erforderliche Elemente zur Inputbox hinzufügen siehe auch Seite [[InputBox]] */
  $('.searchbox')
    .find('.searchboxInput').attr('required', '')
      .after($('<label>').text('Suchen…'))
      .after($('<span>').addClass('bar'));
  //setTimeout("hideTab()",100);
});

function hideTab() {
  if (typeof TabView !== 'undefined') {
    console.log('TabView defined');
    $('ul.tabs > li > a[href="/wiki/Benutzer:Arkondi/Blogbegr%C3%BC%C3%9Fung?action=render"]') .each(function () {
      if (mw.config.get('wgUserName') != 'Arkondi') {
        return ;
      }
      this.style.display = 'none';
    });
    $('ul.tabs > li > a[href="/wiki/Benutzer:Arkondi/sup.css?action=render"]') .each(function () {
      if (mw.config.get('wgUserName') == 'Arkondi') {
        return ;
      }
      this.style.display = 'none';
    });
    return;
  }
  console.log('TabView undefined');
  setTimeout("hideTab()",500);
};

/*
 * Skript zum Protokollieren des Chats beim Betreten des Chats über den Chat-Button laden.
 */
if (ChatEntryPoint) {
  ChatEntryPoint.onClickChatButton = (function (a) {
    var b = window.UserLoginModal;
    if (window.wgUserName) {
      window.chatwindow = window.open(a, 'wikiachat', window.wgWikiaChatWindowFeatures);
      window.chatwindow.onload = setTimeout('window.chatwindow.importArticle({type : \'script\', article : \'MediaWiki:ChatLoggerRewrite.js\')', 6000);
    } else {
      b.show({
        origin: 'chat',
        callback: ChatEntryPoint.onSuccessfulLogin
      })
    }
  });
  ChatEntryPoint.launchChatWindow = (function (c, b) {
    var a = $('#modal-join-chat-button').data('chat-page');
    window.chatwindow = window.open(a, 'wikiachat', window.wgWikiaChatWindowFeatures);
    window.chatwindow.onload = setTimeout('window.chatwindow.importArticle({type : \'script\', article : \'MediaWiki:ChatLoggerRewrite.js\')', 6000);
    if (b) {
      b.trigger('close')
    }
    ChatEntryPoint.reloadPage()
  });
}