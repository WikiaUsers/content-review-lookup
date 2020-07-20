/**
 * @name SocialWidgets
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @version 1.1.22
 * @license CC-BY-SA-3.0
 * @description Inserts widgets for social networks at the top of the sidebar
 */
/* eslint-env jquery */
$(window).load(function () {
  'use strict';

  console.log('SocialWidgets v1.1.22');

  var cfg = window.mw.config.get([
    'wgIsMainpage',
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
  var getInstagram = function (width) {
    return '<p id="sw-instagram">' +
        '<iframe scrolling="no" style="border: none; height: 80px; overflow: hidden; width: ' + width + 'px;" src="data:text/html;charset=utf-8,&lt;html&gt;&lt;body style=&quot;margin: 0;&quot;&gt;&lt;a href=&quot;https://instawidget.net/v/user/attackontitanwiki&quot; id=&quot;link-c91a2877988927980b42557dd8987350de1515c8eba6a70a65fabbbbd0fa36c7&quot;&gt;Follow @attackontitanwiki on Instagram&lt;/a&gt;&lt;script src=&quot;https://instawidget.net/js/instawidget.js?u=c91a2877988927980b42557dd8987350de1515c8eba6a70a65fabbbbd0fa36c7&amp;width=' + width + 'px&quot;&gt;&lt;/script&gt;&lt;/body&gt;&lt;/html&gt;"></iframe>' +
      '</p>';
  };

  /* Inserts the module in the corresponding places */
  if (cfg.wgIsMainpage !== true) { // If it's not the homepage
    var facebook;
    /* Changes the widgets if the page contains spoilers */
    if ($.inArray('Spoilers', window.mw.config.get('wgCategories')) > -1 || cfg.wgPageName === 'Special:WikiActivity') {
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
      '<section class="module" id="discord-widget">' +
        '<a href="https://discord.gg/xPcSRt7" title="Join the Attack on Titan Wiki Discord server!">Join the Attack on Titan/Shingeki no Kyojin Discord server!</a>' +
      '</section>' +
      '<section class="rail-module" id="social-widgets">' +
        '<h2>Follow us!</h2>' +
        '<div>' +
            twitter +
            facebook +
            getInstagram(270) +
        '</div>' +
      '</section>';
    if ($('#TOP_RIGHT_BOXAD').length) { // Checks if there are ads
      $('#TOP_RIGHT_BOXAD').after(sidebarModule, $('#wikia-recent-activity')); // Inserts module and Recent Wiki Activity (if there is) below ads
    } else if (cfg.wgPageName === 'Special:WikiActivity') { // If there are no ads, checks if it's Special:WikiActivity
      $('#WikiaRail').prepend(sidebarModule, $('.CommunityCornerModule')); // Inserts module and Community Corner at the top of the sidebar
    } else { // If there are no ads and it isn't Special:WikiActivity
      $('#WikiaRail').prepend(sidebarModule, $('#wikia-recent-activity')); // Inserts module at the top of the sidebar
    }
  } else { // If it's the homepage
    /* Builds homepage module */
    var homeModule = twitter + getFacebook(290, 290) + getInstagram(290);
    $('#home-social-widgets').html(homeModule); // Inserts homepage module
  }

  /* Twitter SDK */
  window.mw.loader.load('//platform.twitter.com/widgets.js');
});