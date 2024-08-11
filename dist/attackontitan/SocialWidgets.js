/**
 * @name SocialWidgets
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @version 1.2.8
 * @license CC-BY-SA-3.0
 * @description Inserts widgets for social networks at the top of the sidebar
 */
/* eslint-env jquery */
(function () {
  'use strict';

  console.log('SocialWidgets v1.2.8');

  var cfg = window.mw.config.get([
    'wgIsMainPage',
    'wgPageName'
  ]);

  /* Widgets */
  var twitter =
  '<p id="sw-twitter-1">' +
    '<a href="https://twitter.com/AoTWiki?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-lang="en" data-show-count="true">Follow @AoTWiki</a>' +
  '</p>';
  var getFacebook = function (height, width) {
    return '<p id="sw-facebook">' +
        '<iframe style="border: 0; height: ' + height + 'px; margin: 0; overflow: hidden; width: ' + width + 'px;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FAttackOnTitanWiki&amp;height=' + height + '&amp;show_faces=false&amp;small_header=true&amp;stream=true&amp;width=' + width + '" scrolling="yes"></iframe>' +
      '</p>';
  };
  var instagram =
    '<p id="sw-instagram">' +
      '<span id="instabutton"></span>' +
    '</p>';

  /* Inserts the module in the corresponding places */
  if (cfg.wgIsMainPage !== true) { // If it's not the homepage
    var facebook;
    /* Changes the widgets if the page contains spoilers */
    if ($.inArray('Spoilers', window.mw.config.get('wgCategories')) > -1) {
      twitter =
        '<p id="sw-twitter-2">' +
          '<a class="twitter-timeline" data-width="270" data-height="200" data-lang="en" data-chrome="noheader|nofooter" href="https://twitter.com/AoTWiki">Tweets by @AoTWiki</a>' +
        '</p>';
      facebook = getFacebook(68, 270);
    } else {
      facebook = getFacebook(200, 270);
    }
    /* Builds sidebar module */
    var sidebarModule =
      '<section class="rail-module" id="social-widgets">' +
        '<h2>Follow us!</h2>' +
        '<div>' +
            twitter +
            facebook +
            instagram +
        '</div>' +
      '</section>';
    if ($('#ad-container').length) { // Checks if there are ads
      $('#ad-container').after(sidebarModule, $('#wikia-recent-activity')); // Inserts module and Recent Wiki Activity (if there is) below ads
    } else { // If there are no ads and it isn't Special:WikiActivity
      $('#WikiaRail').prepend(sidebarModule, $('#wikia-recent-activity')); // Inserts module at the top of the sidebar
    }
  } else { // If it's the homepage
    /* Builds homepage module */
    var homeModule = twitter + getFacebook(290, 290) + instagram;
    $('#home-social-widgets').html(homeModule); // Inserts homepage module
  }

  /* Twitter SDK and InstaButton */
  window.mw.loader.load('//platform.twitter.com/widgets.js');
  window.importArticle({ type: 'script', article: 'MediaWiki:InstaButton.js' });
})();