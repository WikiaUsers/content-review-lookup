/**
 * @name SocialWidgets
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @version 1.0.2
 * @license CC-BY-SA-3.0
 * @description Inserts widgets for social networks at the top of the sidebar
 */
/* eslint-env jquery */
$(window).load(function () {
  'use strict';
 
  console.log('SocialWidgets v1.0.4');
 
  var cfg = window.mw.config.get([
    'wgIsMainpage',
    'wgPageName'
  ]);
 
  var generalModule =
    '<section class="module" id="discord-banner">' +
      '<a href="https://discord.gg/attackontitan" title="Join the Attack on Titan Wiki Discord server!">' +
        '<img src="https://vignette.wikia.nocookie.net/shingekinokyojin/images/d/d9/Discord_banner.png/revision/latest/scale-to-width-down/260" alt="Join the Attack on Titan/Shingeki no Kyojin Discord server!" />' +
      '</a>' +
    '</section>' +
 
  function getJS (urls) {
    urls.forEach(function (url) {
      $.getScript(url, function (data) {
        return data;
      });
    });
  }
 
  if (cfg.wgIsMainpage !== true) { // If it's not the homepage
    if ($('#TOP_RIGHT_BOXAD').length) { // Checks if there are ads
      $('#TOP_RIGHT_BOXAD').after(generalModule, $('#wikia-recent-activity')); // Inserts module and Recent Wiki Activity (if there is) below ads
    } else if (cfg.wgPageName === 'Special:WikiActivity') { // If there are no ads, checks if it's Special:WikiActivity
      $('#WikiaRail').prepend(generalModule, $('.CommunityCornerModule')); // Inserts module and Community Corner at the top of the sidebar
    } else { // If there are no ads and it isn't Special:WikiActivity
      $('#WikiaRail').prepend(generalModule, $('#wikia-recent-activity')); // Inserts modules at the top of the sidebar
    }
  } else { // If it's the homepage
    $('#home-social-widgets').html(homeModule); // Inserts home module
  }
  // Inserts SDKs
  getJS(['https://apis.google.com/js/platform.js', 'https://platform.twitter.com/widgets.js']);
});