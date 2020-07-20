/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Like Zhaba script, but common Zhaba script */

/* Profile hats  */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/masthead.js',
        'MediaWiki:Common.js/editcount.js',
        'MediaWiki:Common.js/LastEdited.js',
        'MediaWiki:Kopcap94/CD.js',
        'MediaWiki:Kopcap94/spy.js',
        'MediaWiki:Kopcap94/IPfunction.js',
        'MediaWiki:Kopcap94/WikiStats.js/another.js',
        'w:dev:AjaxRC/code.js',
        'w:dev:DupImageList/code.js'
    ]
});

function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null !== replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-vstf" width="100%" height="700"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;
 
  }
}

if (window.addEventListener) {
    window.addEventListener("load",onloadhookcustom,false);
} else if (window.attachEvent) {
    window.attachEvent("onload",onloadhookcustom);
}


/* Tooltip code by Wildream */
$('.article-tooltip').mouseover(function () {
    $('.article-tooltip-hidden').fadeIn(400);
});
$('.article-tooltip').mouseout(function () {
    $('.article-tooltip-hidden').fadeOut(400);
});
$('.article-tooltip').mousemove(function (a) {
    if (a.pageX === null && a.clientX !== null) {
        var html = document.documentElement;
        var body = document.body;
        a.pageX = a.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        a.pageY = a.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
    }
    $('.article-tooltip-hidden').css({
        left: a.pageX -150,
        top: a.pageY -270
    });
});

// Description: Add game icons to top right corner of articles
// Credit:      User:Porter21
 
function addTitleIcons() {
   if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'monaco':
            insertTarget = $('#article > h1.firstHeading');
            break;
         case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
               insertTarget = $('#WikiaPageHeader');
            }
            break;
      }
 
      if (insertTarget) {
         $('#va-titleicons').css('display', 'block').prependTo(insertTarget);
      }
   }
}
 
jQuery(function($) {
   addTitleIcons();
});

// Титул в зависимости от кол-ва правок, лол
/*
$(function() {
    if(!$('#UserProfileMasthead').length) {
        return;
    }
    var edits = parseInt($('.masthead-info-lower em').text().replace(/(,|\s)/g, ''),10);
    if (edits === 0) {
        return;
    } else if (edits <= 100) {
        text = 'Новичок';
    } else if (edits <=250) {
        text = 'Начинающий';
    } else if (edits <= 500) {
        text = 'Ученик';
    } else if (edits <= 1000) {
        text = 'Знаток';
    } else if (edits <= 2000) {
        text = 'Мастер';
    } else if (edits <= 3000) {
        text = 'Профессионал';
    } else if (edits > 3000) {
        text = 'Кодлует вне Хогвартса';
    }
    if (($('.masthead-info .tag').length)) {
        $('.masthead-info .tag:last-child').after('<span class="tag">'+text+'</span>');
    } else {
        $('.masthead-info h2').after('<span class="tag">'+text+'</span>');
    }
});*/