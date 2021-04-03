// Copy to clipboard button - by Polymeric.
var $temp = $('<input>');
var $url = $('#mp-ft-card .mdc-card__action-buttons a').attr('href');

$( '#ft-share-btn' ).attr({
  role: 'button',
  tabindex: '0'
});

$('#ft-share-btn').on('click', function() {
  $('body').append($temp);
  $temp.val($url).select();
  document.execCommand('copy');
  $temp.remove();

  // Updates the button's color and tooltip text.
  $('#ft-share-ttp').attr('data-tips', 'Link copied to clipboard!');
  $('#ft-share-btn').css('color', 'var(--cr-success)');

  // Brings both back to normal after 5s.
  setTimeout(function() {
    $('#ft-share-ttp').attr('data-tips', 'Share article');
    $('#ft-share-btn').css('color', 'var(--text-theme-secondary-on-background)');
  }, 5000);
})

// BackToTop button with a few adjustments - by Polymeric.
// The original code of this file is available at
// https://dev.fandom.com/wiki/BackToTopButton/code.js and was made by Noemon,
// Rappy, Robyn Grayson, and KockaAdmiralac.

// A script that adds a "Back To Top" at the bottom right part of the screen.
// Created by Noemon from Dead Space Wiki.
(function (window, $, mw) {
  'use strict';

  var buttonStart = typeof window.BackToTopStart === 'number' ?
    window.BackToTopStart : 80,
    scrollSpeed = typeof window.BackToTopSpeed === 'number' ?
      window.BackToTopSpeed : 0,
    fadeSpeed = typeof window.BackToTopFade === 'number' ?
      window.BackToTopFade : 0,
    $button;

  window.BackToTopModern = true;

  // Double-run protection
  if (window.BackToTopLoaded) {
    return;
  }
  window.BackToTopLoaded = true;

  function init() {
    var $buttonChildren = $button.children('button, img, div');

    $buttonChildren.hide();
    $(window).scroll(throttle(100, function () {
      if ($(this).scrollTop() > buttonStart) {
        switch (fadeSpeed) {
          case 0:
            $buttonChildren.show();
            break;
          default:
            $buttonChildren.fadeIn(fadeSpeed);
            break;
        }
      } else {
        switch (fadeSpeed) {
          case 0:
            $buttonChildren.hide();
            break;
          default:
            $buttonChildren.fadeOut(fadeSpeed);
            break;
        }
      }
    }));
    mw.hook('dev.BackToTopButton').fire($button);
  }

  function click() {
    $('body, html').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  }

  $('.FAB__container').keypress(function(event) {
    if (event.keyCode === 13) {
      $('.FAB__container').click();
    }
  });

  function modernInit() {
    $button = $('<div>', {
      id: 'BackToTopBtn',
      append: [
        $('<div>', {
          'class': 'FAB__container',
          'role': 'button',
          append: [
            $('<div>', {
              id: 'bttp-ttp',
              'class': 'FAB-icon__container top-tip',
              'data-tips': 'Return to top',
              'html': '<svg height="26" viewBox="0 0 24 24" width="26" class="FAB-icon" xmlns="http://www.w3.org/2000/svg"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></svg>'
            }),
          ],
        }),
      ],
      click: click
    }).appendTo(document.body);
    $(window).on('resize', throttle(100));
    init();
  }

  /* $.throttle source code */
  function throttle(delay, no_trailing, callback, debounce_mode) {
    var timeout_id, last_exec = 0;
    if (typeof no_trailing !== 'boolean') {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }
    function wrapper() {
      var that = this
        , elapsed = +new Date() - last_exec
        , args = arguments;
      function exec() {
        last_exec = +new Date();
        callback.apply(that, args);
      }
      ; function clear() {
        timeout_id = undefined;
      }
      ; if (debounce_mode && !timeout_id) {
        exec();
      }
      timeout_id && clearTimeout(timeout_id);
      if (debounce_mode === undefined && elapsed > delay) {
        exec();
      } else if (no_trailing !== true) {
        timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
      }
    }
    ;
    return wrapper;
  };

  if (window.BackToTopModern) {
    modernInit();
  }
}(this, jQuery, mediaWiki));

// Better Google Translate button. By User:Polymeric
// Code based from Translator.js from w:c:dev
// https://dev.fandom.com/wiki/MediaWiki:Translator/Translator.js

// Todo: 
// 1) Automatically translate the 'Translate with Google' and 'Hide or show
//    translate button' texts beforehand (i18n.js maybe?). Will require to
//    update css positioning with some js too so it adjusts well no matter the
//    width of the text (and also would get rid of animating the left property
//    alongisde the transform one with css when showing/hiding the button).
// 2) Make it so it dynamically translates the whole page (instead of opening a
//    new Google Translate tab with the page, just like Google Arts and
//    Cultures' button does).
$(function() {
  var config = mw.config.get([
    'wgAction',
    'wgPageContentLanguage',
    'wgUserLanguage'
  ]);

  if (window.UseTranslator === false || config.wgAction !== 'view') {
    return;
  }

  window.UseTranslator = false;

  function translate() {
    window.open(new mw.Uri('https://translate.google.com/translate').extend({
      hl: config.wgUserLanguage,
      sl: config.wgPageContentLanguage,
      tl: config.wgUserLanguage,
      u: location.href
    }).toString());

    $('#translate-button').addClass('active hidden');
  }

  function hideshow() {
    $('#translate-button').toggleClass('hidden');
    $('#translate-button').removeClass('active');
  }

  $('body').append([
    $('<div>',{ 'class': 'gl-button hidden', id: 'translate-button' }).append([
      $('<div>',{ 'class': 'text-container', 'role': 'button', 'tabindex': '0', click: translate }).append([
        $('<div>',{ 'class': 'text-container__inner' }).append([
          $('<div>',{ 'class': 'contents' }).html('<svg width="24px" height="24px" viewBox="0 0 48 48" class="g_translate-i"><path fill="none" d="M0 0h48v48H0zm40 12H22.35L30 38l-4 4h14c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2z"></path><path d="M40 10H21.76L20 4H8C5.8 4 4 5.8 4 8v26c0 2.2 1.8 4 4 4h14l2 6h16c2.2 0 4-1.8 4-4V14c0-2.2-1.8-4-4-4zM14.33 29.17c-4.51 0-8.17-3.67-8.17-8.17s3.67-8.17 8.17-8.17c2.08 0 3.97.74 5.47 2.13l.13.13-2.44 2.36-.12-.11c-.57-.54-1.56-1.17-3.04-1.17-2.62 0-4.75 2.17-4.75 4.84s2.13 4.84 4.75 4.84c2.74 0 3.93-1.75 4.25-2.92h-4.42v-3.1h7.9l.03.14c.08.42.11.79.11 1.21-.01 4.71-3.24 7.99-7.87 7.99zm12.07-3.4c.67 1.2 1.48 2.35 2.38 3.4l-1.07 1.06-1.31-4.46zm1.54-1.54h-1.98l-.61-2.08h7.99s-.68 2.63-3.12 5.47c-1.07-1.23-1.81-2.43-2.28-3.39zM42 40c0 1.1-.9 2-2 2H26l4-4-1.63-5.53 1.84-1.84L35.58 36l1.46-1.46-5.41-5.37c1.8-2.07 3.2-4.5 3.83-7.01H38v-2.08h-7.27V18h-2.08v2.08h-3.92L22.35 12H40c1.1 0 2 .9 2 2v26z"></path></svg>Translate with Google')
        ])
      ]),
      $('<div>',{ 'class': 'close-container', 'role': 'button', 'tabindex': '0', 'aria-label': 'Hide or show translate button', 'title': 'Hide or show translate button', click: hideshow }).html('<svg width="24px" height="24px" viewBox="0 0 24 24" class="close_i"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg><svg width="24px" height="24px" viewBox="0 0 48 48" class="g_translate-i"><path fill="none" d="M0 0h48v48H0zm40 12H22.35L30 38l-4 4h14c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2z"></path><path d="M40 10H21.76L20 4H8C5.8 4 4 5.8 4 8v26c0 2.2 1.8 4 4 4h14l2 6h16c2.2 0 4-1.8 4-4V14c0-2.2-1.8-4-4-4zM14.33 29.17c-4.51 0-8.17-3.67-8.17-8.17s3.67-8.17 8.17-8.17c2.08 0 3.97.74 5.47 2.13l.13.13-2.44 2.36-.12-.11c-.57-.54-1.56-1.17-3.04-1.17-2.62 0-4.75 2.17-4.75 4.84s2.13 4.84 4.75 4.84c2.74 0 3.93-1.75 4.25-2.92h-4.42v-3.1h7.9l.03.14c.08.42.11.79.11 1.21-.01 4.71-3.24 7.99-7.87 7.99zm12.07-3.4c.67 1.2 1.48 2.35 2.38 3.4l-1.07 1.06-1.31-4.46zm1.54-1.54h-1.98l-.61-2.08h7.99s-.68 2.63-3.12 5.47c-1.07-1.23-1.81-2.43-2.28-3.39zM42 40c0 1.1-.9 2-2 2H26l4-4-1.63-5.53 1.84-1.84L35.58 36l1.46-1.46-5.41-5.37c1.8-2.07 3.2-4.5 3.83-7.01H38v-2.08h-7.27V18h-2.08v2.08h-3.92L22.35 12H40c1.1 0 2 .9 2 2v26z"></path></svg>')
    ])
  ])

  // Trigger events on 'enter' key press. Probably could be improved DRY code...
  $('.text-container').keypress(function(event) { 
    if (event.keyCode === 13) {
      $('.text-container').click();
    }
  });

  $('.close-container').keypress(function(event) { 
    if (event.keyCode === 13) {
      $('.close-container').click();
    }
  });
});

// Security warning
console.log("%cWARNING", "background-color: yellow; color: red; font-size: 24px;");
console.log("%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.%cDo not enter or paste code that you do not understand.", "font-size: 18px;", "font-size: 18px;");