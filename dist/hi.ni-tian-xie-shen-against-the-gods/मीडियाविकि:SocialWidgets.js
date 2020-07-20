/**
 * @name SocialWidgets
 * @author Akyusch
 * @version 1.0.0
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
      '<a href="https://discord.gg/cba6VzE" title="Join the Ancient Chat Group Discord server!">' +
        '<img src="https://vignette.wikia.nocookie.net/ni-tian-xie-shen-against-the-gods/images/6/66/Discord_banner_%28x%29.png/revision/latest?cb=20180713035808" alt="Join the Ancient Chat Group Discord server!" />' +
      '</a>' +
    '</section>' +
    
    console.log();
 
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