// Go to bottom button. Credit to Fngplg and Fandyllic
(function(window, $, mw) {
  'use strict';

  var translations = {
      en: 'Go to bottom'
    },

    buttonStart = typeof window.JumpToBottomStart === 'number' ?
    window.JumpToBottomStart :
    0,
    scrollSpeed = typeof window.JumpToBottomSpeed === 'number' ?
    window.JumpToBottomSpeed :
    600,
    fadeSwitch = typeof window.JumpToBottomFade === 'number' ?
    window.JumpToBottomFade :
    600,

    theText = (typeof window.JumpToBottomText === 'string' && window.JumpToBottomText) ||
    translations['.en'] || translations.en;

  if (window.JumpToBottomLoaded) {
    return;
  }

  window.JumpToBottomLoaded = true;

  $(addJumpToBottom);

  function hideFade() {
    $("#jumptobottom").hide();

    $(window).scroll(function() {
      if (($(this).scrollTop() > buttonStart) && ($(this).scrollTop() < ($('#mw-content-text').height() - $('.wds-global-footer').height()))) {
        switch (fadeSwitch) {
          case 0:
            $('#jumptobottom').show();
            break;
          default:
            $('#jumptobottom').fadeIn();
            break;
        }
      } else {
        switch (fadeSwitch) {
          case 0:
            $('#jumptobottom').hide();
            break;
          default:
            $('#jumptobottom').fadeOut();
            break;
        }
      }
    });
  }

  $('body').on('click', '#jumptobottom', function() {
    $('body,html').animate({
      scrollTop: $('#mw-content-text').height() - $('.wds-global-footer').height() + 250
    }, scrollSpeed);

    return false;
  });

  function addJumpToBottom() {
    if (skin == 'oasis') {
      $('<li />', {
          id: 'jumptobottom',
          style: 'float: right; margin-top: -1px; border-right: none'
        })
        .append(
          $('<button />', {
            type: 'button',
            style: 'height: 20px;',
            text: theText
          })
        )
        .appendTo('#WikiaBarWrapper .toolbar > .tools');

      hideFade();
    }
}

// Adding a new Rail Module
// Must be nested in Go to bottom button code to make sure it only loads once
$('#WikiaRail').prepend('<section class="module"><h1>Important Pages</h1> Welcome to the FanFiction RP wiki. Please make sure to follow our <a href="https://fanficages.wikia.com/wiki/Rules and Guidelines">Rules and Guidelines</a>.<br><br>If you have any questions, please refer to our local admins! They&#39ll be more than happy to help you. The founder of our wiki is<br><a href="https://fanficages.wikia.com/wiki/User:TheFallenNinja">Flame</a>. The other two admins currently are <a href="https://fanficages.wikia.com/wiki/User:Withersoul 235">Wither</a> and <a href="https://fanficages.wikia.com/wiki/User:Sabina Bladefoxy">Sabina</a>.<br><br>Wither is quite experienced at CSS and (albeit to a much lesser extent) JavaScript; he can help out with that.<br><br>We hope you&#39ll enjoy your time at the Fanfiction RP wiki!<br><br>Sincerely,<br><br><br>The Wiki Staff</section>');
}(this, jQuery, mediaWiki));

// Allows to make text other text upon click
  
$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

// Sorts content on Special:WhatLinksHere alphabetically
// Author: Fngplg

(function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list, $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1;});
    $list.children('li').remove(); $list.append(sorted_list);
})(jQuery);

// Add new buttons to the Source Editor toolbar

if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/c8/Button_redirect.png",
	"speedTip": "Add redirect",
	"tagOpen": "#REDIRECT [" + "[",
	"tagClose": "]]",
	"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/c9/Button_strike.png",
	"speedTip": "Strike through text",
	"tagOpen": "<s>",
	"tagClose": "</s>",
	"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/1/13/Button_enter.png",
	"speedTip": "Line break",
	"tagOpen": "<br />",
	"tagClose": "",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/7/74/Button_comment.png",
	"speedTip": "Add text only visible in the Source Editor",
	"tagOpen": "<!-- ",
	"tagClose": " -->",
	"sampleText": "Insert comment here"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "//images.wikia.com/central/images/f/fd/Button_underline.png",
	"speedTip": "Underline text",
	"tagOpen": "<u>",
	"tagClose": "</u>",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/4/43/Button-template.png",
	"speedTip": "Add template tags",
	"tagOpen": "{{",
	"tagClose": "}}",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/2/28/Button_wikilink.png",
	"speedTip": "Add link to category or file page",
	"tagOpen": "[[:",
	"tagClose": "]]",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/cb/Button_wikipedia.png",
	"speedTip": "Quick link to Wikipedia",
	"tagOpen": "[[wikipedia:",
	"tagClose": "]]",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/3/3c/Button_pre.png",
	"speedTip": "Show literal content in gray box and code font",
	"tagOpen": "<pre>",
	"tagClose": "</pre>",
	"sampleText": ""
	};
}