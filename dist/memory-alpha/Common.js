// Configuration for [[MediaWiki:ImportJS]]

window.AutoCreateUserPagesConfig = {
  content: {
    2: '{{sub'+'st:newuser}}',
    3: '{{sub'+'st:welcome}}',
  },
  summary: 'Script: Creating user+talkpage on first edit'
};

// Interactive Tree Script

var smallTreeCount = 3;

$('.appear').each(function(index, currentTree){
  const currentButtonID = 'mainButton-'+index;
  const numberOfSubLists = $(this).find('ul li ul, ol li ol, ul li ol, ol li ul').length;
  const total = $(this).find('ul li, ol li').length - numberOfSubLists;
  const buttonLabel = (total > smallTreeCount) ? 'show all' : 'hide all';
  const button = (numberOfSubLists === 0) ? '' : ' (<a id="'+currentButtonID+'" class="show-hide-button">'+buttonLabel+'</a>)';
  const desc = $('<div>This list includes '+total+' items'+button+'.</div>');

  $(this).prepend(desc);

  $('#'+currentButtonID).click(function(){
    if ($(this).text() === "show all"){
      $(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').show();
    } else {
      $(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').hide();
    }

    $(this).text(($(this).text() === "show all") ? "hide all" : "show all");
  });
});

$('.appear li ul, .appear li ol').each(function(index, currentTree){
  const currentButtonID = 'pane-'+index++;
  const total = $(this).find('li').length - $(this).find('ul li, ol li').length;
  const button = '<a id="'+currentButtonID+'" class="show-hide-button">'+total+'</a>';

  if (total > smallTreeCount){
    $(currentTree).hide();
  }

  $(this).before('('+button+')');

  $('#'+currentButtonID).click(function(){
    $(currentTree).toggle();
  });
});

// "Interactive quotes" script; by [[User:Bp]]

function speakerLabel(text) {
  var spkr = document.createElement('span');
  spkr.innerHTML = text + ": ";
  spkr.className = "speaker-label";
  return spkr;
}

function explicitQuoteOn(event, e) {
  var si = (e) ? e.firstChild : this.firstChild;
  while(si) {
    explicitQuoteOn(event, si);
    if (si.className == "dialogue-inside") {
      si.className = "dialogue-inside-highlight";
    } else if (si.className == "quoteline") {
      if (si.childNodes[0].className != "speaker-label") {
        if (si.title != '') {
          si.insertBefore(speakerLabel(si.title), si.childNodes[0]);
          si.title = '';
        }
      }
      if (si.childNodes[0].className == "speaker-label") {
        si.childNodes[0].style.display = "inline";
      }
    }
    si = si = si.nextSibling;
  }
}
	
function explicitQuoteOff(event, e) {
  var si = (e) ? e.firstChild : this.firstChild;
  while(si) {
    explicitQuoteOff(event, si);
    if (si.className == "dialogue-inside-highlight") {
      si.className = "dialogue-inside";
    } else if (si.className == "quoteline") {
      if (si.childNodes[0].className == "speaker-label") {
        si.childNodes[0].style.display = "none";
      }
    }
    si = si = si.nextSibling;
  }
}

var explicitQuotes = 0;

function doQuotes() {
  if (!explicitQuotes) { return; }

  var dumbevent;
  var divs = document.getElementsByTagName("div");

  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'dialogue') {
      if (explicitQuotes == 1) {
        divs[i].onmouseover = explicitQuoteOn;
        divs[i].onmouseout = explicitQuoteOff;
      } else {
        explicitQuoteOn(dumbevent, divs[i]);
      }
    }
  }
}

$(doQuotes);
	
/*
// Tooltips and access keys

ta = new Object();
ta['pt-userpage'] = new Array('.','My user page'); 
ta['pt-anonuserpage'] = new Array('.','The user page for the ip you\'re editing as'); 
ta['pt-mytalk'] = new Array('n','My talk page'); 
ta['pt-anontalk'] = new Array('n','Discussion about edits from this ip address'); 
ta['pt-preferences'] = new Array('','My preferences'); 
ta['pt-watchlist'] = new Array('l','List of pages I\'m monitoring for changes'); 
ta['pt-mycontris'] = new Array('y','List of my contributions'); 
ta['pt-login'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
ta['pt-anonlogin'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
ta['pt-logout'] = new Array('o','Log out'); 
ta['ca-talk'] = new Array('t','Discussion about the content page'); 
ta['ca-edit'] = new Array('e','You can edit this page; please use the preview button before saving'); 
ta['ca-addsection'] = new Array('+','Add a comment to this discussion'); 
ta['ca-viewsource'] = new Array('e','This page is protected; you can view its source'); 
ta['ca-history'] = new Array('h','Past versions of this page'); 
ta['ca-protect'] = new Array('=','Protect this page'); 
ta['ca-delete'] = new Array('d','Delete this page'); 
ta['ca-undelete'] = new Array('d','Restore the edits done to this page before it was deleted'); 
ta['ca-move'] = new Array('m','Move this page'); 
ta['ca-nomove'] = new Array('','You don\'t have the permissions to move this page'); 
ta['ca-watch'] = new Array('w','Add this page to your watchlist'); 
ta['ca-unwatch'] = new Array('w','Remove this page from your watchlist'); 
ta['search'] = new Array('','Search Memory Alpha'); 
ta['p-logo'] = new Array('z','Main Page'); 
ta['n-mainpage'] = new Array('z','Visit the Main Page'); 
ta['n-Main-page'] = new Array('z','Visit the Main Page'); 
ta['n-portal'] = new Array('','About the project, what you can do, where to find things'); 
ta['n-Chat'] = new Array('','IRC, the place to chat');
ta['n-currentevents'] = new Array('','Find background information on current events'); 
ta['n-recentchanges'] = new Array('r','The list of recent changes in the wiki'); 
ta['n-randompage'] = new Array('x','Load a random page'); 
ta['n-help'] = new Array('/','The place to find out information'); 
ta['n-sitesupport'] = new Array('','Support us'); 
ta['t-whatlinkshere'] = new Array('j','List of all wiki pages that link here'); 
ta['t-recentchangeslinked'] = new Array('k','Recent changes in pages linking to this page'); 
ta['feed-rss'] = new Array('','RSS feed for this page'); 
ta['feed-atom'] = new Array('','Atom feed for this page'); 
ta['t-contributions'] = new Array('','View the list of contributions of this user'); 
ta['t-emailuser'] = new Array('','Send a mail to this user'); 
ta['t-upload'] = new Array('u','Upload images or media files'); 
ta['t-specialpages'] = new Array('q','List of all special pages'); 
ta['ca-nstab-main'] = new Array('c','View the content page'); 
ta['ca-nstab-user'] = new Array('c','View the user page'); 
ta['ca-nstab-media'] = new Array('c','View the media page'); 
ta['ca-nstab-special'] = new Array('','This is a special page; you can\'t edit the page itself.'); 
ta['ca-nstab-wp'] = new Array('c','View the project page'); 
ta['ca-nstab-image'] = new Array('c','View the image page'); 
ta['ca-nstab-mediawiki'] = new Array('c','View the system message'); 
ta['ca-nstab-template'] = new Array('c','View the template'); 
ta['ca-nstab-help'] = new Array('c','View the help page'); 
ta['ca-nstab-category'] = new Array('c','View the category page');

*/

// Personalized MA copyright notice

$(function(){
  $('.license-description').append('See <a href="/wiki/Memory_Alpha:Copyrights">Memory Alpha\'s Copyright</a> information for full details.');
});

// Re-add proper namespace prefix to titles where it has been removed "by design"

$.getJSON('/api.php?action=query&prop=info&titles='+mw.config.get('wgPageName')+'&inprop=displaytitle&format=json', function(json){
  $('#firstHeading').html(json['query']['pages'][mw.config.get('wgArticleId')]['displaytitle']);
});

// Countdown: Version: 2.0 Rewrite by Pecoes; original script by Splarka + Eladkse

;(function (module, mw, $) {

  'use strict';

  var translations = $.extend(true, {
    en: {
      and: 'and',
      second: 'second',
      seconds: 'seconds',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days'
    },
    fr: {
      and: 'et',
      second: 'seconde',
      seconds: 'secondes',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'heure',
      hours: 'heures',
      day: 'jour',
      days: 'jours'
    },
    es: {
      and: 'y',
      second: 'segundo',
      seconds: 'segundos',
      minute: 'minuto',
      minutes: 'minutos',
      hour: 'hora',
      hours: 'horas',
      day: 'día',
      days: 'días'
    },
    ca: {
      and: 'i',
      second: 'segon',
      seconds: 'segons',
      minute: 'minut',
      minutes: 'minuts',
      hour: 'hora',
      hours: 'hores',
      day: 'dia',
      days: 'dies'
    },
    'pt-br': {
      and: 'e',
      second: 'segundo',
      seconds: 'segundos',
      minute: 'minuto',
      minutes: 'minutos',
      hour: 'hora',
      hours: 'horas',
      day: 'dia',
      days: 'dias'
    },
    de: {
      and: 'und',
      second: 'Sekunde',
      seconds: 'Sekunden',
      minute: 'Minute',
      minutes: 'Minuten',
      hour: 'Stunde',
      hours: 'Stunden',
      day: 'Tag',
      days: 'Tage'
    },
    it: {
      and: 'e',
      second: 'secondo',
      seconds: 'secondi',
      minute: 'minuto',
      minutes: 'minuti',
      hour: 'ora',
      hours: 'ore',
      day: 'giorno',
      days: 'giorni'
    },
    nl: {
      and: 'en',
      second: 'seconde',
      seconds: 'seconden',
      minute: 'minuut',
      minutes: 'minuten',
      hour: 'huur',
      hours: 'huren',
      day: 'dag',
      days: 'dagen'
    },
    pl: {
      and: 'i',
      second: 'sekund(y)',
      seconds: 'sekund(y)',
      minute: 'minut(y)',
      minutes: 'minut(y)',
      hour: 'godzin(y)',
      hours: 'godzin(y)',
      day: 'dni',
      days: 'dni'
    },
    sr: {
      and: 'i',
      second: 'sekundu',
      seconds: 'sekunde/-i',
      minute: 'minutu',
      minutes: 'minute/-a',
      hour: 'sat',
      hours: 'sata/-i',
      day: 'dan',
      days: 'dana'
    },
    zh: {
      and: ' ',
      second: '秒',
      seconds: '秒',
      minute: '分',
      minutes: '分',
      hour: '小时',
      hours: '小时',
      day: '天',
      days: '天'
    },
    hu: {
      and: 'és',
      second: 'másodperc',
      seconds: 'másodperc',
      minute: 'perc',
      minutes: 'perc',
      hour: 'óra',
      hours: 'óra',
      day: 'nap',
      days: 'nap'
    }
  }, module.translations || {}),
  i18n = translations[
    mw.config.get('wgContentLanguage')
  ] || translations.en;

  var countdowns = [];
 
  var NO_LEADING_ZEROS = 1;
 
  function output (i, diff) {
    /*jshint bitwise:false*/
    var delta, result, parts = [];
    delta = diff % 60;
    parts.unshift(delta + ' ' + i18n[delta === 1 ? 'second' : 'seconds']);
    diff = Math.floor(diff / 60);
    delta = diff % 60;
    parts.unshift(delta + ' ' + i18n[delta === 1 ? 'minute' : 'minutes']);
    diff = Math.floor(diff / 60);
    delta = diff % 24;
    parts.unshift(delta + ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ]);
    diff = Math.floor(diff / 24);
    parts.unshift(diff  + ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ]);
    result = parts.pop();
    if (countdowns[i].opts & NO_LEADING_ZEROS) {
      while (parts.length && parts[0][0] === '0') {
        parts.shift();
      }
    }
    if (parts.length) {
      result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
    }
    countdowns[i].node.text(result);
  }

  function end(i) {
    var c = countdowns[i].node.parent();
    switch (c.attr('data-end')) {
      case 'remove':
        c.remove();
        countdowns.splice(i, 1);
        return;
      case 'stop':
        output(i, 0);
        countdowns.splice(i, 1);
        return;
      case 'toggle':
        var toggle = c.attr('data-toggle');
        if (toggle && $(toggle).length) {
          $(toggle).css('display', 'inline');
          c.css('display', 'none');
          countdowns.splice(i, 1);
          return;
        }
        break;
      case 'callback':
        var callback = c.attr('data-callback');
        if (callback && $.isFunction(module[callback])) {
          output(i, 0);
          countdowns.splice(i, 1);
          module[callback].call(c);
          return;
        }
        break;
    }
    countdowns[i].countup = true;
    output(i, 0);
  }

  function update () {
    var now = Date.now();
    $.each(countdowns.slice(0), function (i, countdown) {
      var diff = Math.floor((countdown.date - now) / 1000);
      if (diff <= 0 && !countdown.countup) {
        end(i);
      } else {
        output(i, Math.abs(diff));
      }
    });
    if (countdowns.length) {
      window.setTimeout(function () {
        update();
      }, 1000);
    }
  }

  function getOptions (node) {
    /*jshint bitwise:false*/
    var text = node.parent().attr('data-options'),
      opts = 0;
    if (text) {
      if (/no-leading-zeros/.test(text)) {
        opts |= NO_LEADING_ZEROS;
      }
    }
    return opts;
  }

  $(function () {
    var countdown = $('.countdown');
    if (!countdown.length) return;
    $('.nocountdown').css('display', 'none');
    countdown
    .css('display', 'inline')
    .find('.countdowndate')
    .each(function () {
      var $this = $(this),
        date = (new Date($this.text())).valueOf();
      if (isNaN(date)) {
        $this.text('BAD DATE');
        return;
      }
      countdowns.push({
        node: $this,
        opts: getOptions($this),
        date: date,
      });
    });
    if (countdowns.length) {
      update();
    }
  });
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));

// Display Ogg files in galleries

const oggFile = $('.wikia-gallery-item [data-image-key$=".ogg"]');

oggFile.each(correctOggFiles);

function correctOggFiles(){
  $(this).after('<audio src="/wiki/Special:Redirect/file/'+$(this).attr('data-image-key')+'" controls>');
  $(this).remove();
}

// Display PDF files in galleries

const adobeGalleryIcon = $('.wikia-gallery-item [data-image-key$=".pdf"]');

adobeGalleryIcon.each(removeAdobeIcon);

function removeAdobeIcon(){
  const fileName = $(this).attr('data-image-key');
  $(this).after('<a href="/wiki/Special:Redirect/file/'+fileName+'" class="directLinkToPDF" target="_blank"></a><iframe src="/wiki/Special:Redirect/file/'+fileName+'" loading="lazy" width="185" height="185" title="'+fileName+'"></iframe><div class="thumbcaption pdf-thumbcaption"><a href="/wiki/File:'+fileName+'" class="info-icon pdf-info-icon"><svg><use xlink:href="#wds-icons-info-small"></use></svg></a></div>');
  $(this).parent().addClass('thumb show-info-icon');
  $(this).remove();
}

// Display PDF files on PDF file pages

const adobeIcon = $('.ns-6 [src="/resources-ucp/mw139/resources/assets/file-type-icons/fileicon-pdf.png"]').parent();

adobeIcon.parent().prepend('<iframe src="/wiki/Special:Redirect/file/'+mw.config.get("wgTitle")+'" loading="lazy" width="250" height="auto" title="'+mw.config.get("wgTitle")+'"></iframe>');
adobeIcon.remove();

// Embed PDF file widgets into pages

const widget = $('.pdf-widget');

widget.each(embedPDFs);

function embedPDFs(){
  const specifiedFile = $(this).attr('data-file');
  const floatDir = $(this).attr('data-float') ? $(this).attr('data-float') : 'right';
  const caption = $(this).attr('data-caption') ? $(this).attr('data-caption').replace(/'''(.+?)'''/g, '<b>$1</b>').replace(/''(.+?)''/g, '<i>$1</i>').replace(/\[\[(.+?)\|(.+?)\]\]/g, '<a href="/wiki/$1">$2</a>').replace(/\[\[(.+?)\]\]/g, '<a href="/wiki/$1">$1</a>') : '';

  $(this).html('<figure class="thumb t'+floatDir+' show-info-icon"><a href="/wiki/Special:Redirect/file/'+specifiedFile+'" class="directLinkToPDF" target="_blank"></a><iframe src="/wiki/Special:Redirect/file/'+specifiedFile+'" loading="lazy" width="174.028" height="auto" scrolling="no" title="'+specifiedFile+'"></iframe><figcaption class="thumbcaption"><a href="/wiki/File:'+specifiedFile+'" class="info-icon pdf-widget-info-icon"><svg><use xlink:href="#wds-icons-info-small"></use></svg></a><p class="caption">'+caption+'</p></figcaption></figure>');
}

// Tabs in sidebars

var localImageHeights = [];

$('.pi-item.wds-tabber').each(function(){
  const localImages = $(this).find('.pi-image-thumbnail');

  localImages.each(function(){
    localImageHeights.push($(this).attr('height'));
  });

  const height = Math.min.apply(this, localImageHeights);

  localImages.each(function(){
    $(this).css({'height':height, 'width':'auto'});
  });

  localImageHeights = [];
});

// Correcting link behavior

function correctLinkBehavior(){
  const queryStrings = $('[href^="https://memory-alpha.fandom.com/wiki/"].text').filter('[href$="?action=raw"], [href$="?useskin=fandommobile"], [href$="?useskin=fandomdesktop"], [href$="?uselang=qqx"], [href$="?safemode=1"], [href*="Special:RecentChanges?"]');

  const otherDirectories = $('.text').filter('[href="https://memory-alpha.fandom.com/f"], [href^="https://memory-alpha.fandom.com/f/"], [href^="https://memory-alpha.fandom.com/api.php"]');

  queryStrings.removeAttr('target rel class');
  otherDirectories.removeAttr('target rel class');
}

correctLinkBehavior();

setTimeout(correctLinkBehavior, 5000);

/* Remove "talk" link from forums */

const talkLink = $('.ns-110 #ca-talk');

if (talkLink){
  talkLink.parent().remove();
}