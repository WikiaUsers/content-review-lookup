/**
 * @name SocialWidgets
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @version 1.0.5
 * @license CC-BY-SA-3.0
 * @description Inserts widgets for social networks at the top of the sidebar
 */
/* eslint-env jquery */
$(window).load(function () {
  'use strict';
 
  console.log('SocialWidgets v1.0.5');
 
  var cfg = window.mw.config.get([
    'wgIsMainpage',
    'wgPageName'
  ]);
 
  var generalModule =
    '<section class="module" id="discord-banner">' +
      '<a href="https://discord.gg/ape2hfk" title="¡Ingresa al servidor de Fanloid Wiki!">' +
        '<img src="https://vignette.wikia.nocookie.net/fanloid/images/4/41/Discord_fanloid.png/revision/latest/scale-to-width-down/250?cb=20200518114418&path-prefix=es" alt="¡Ingresa al servidor Fanloid Wiki!" />'  +
        '<a href="https://discord.gg/ape2hfk" class="btnwnms">¡ÚNETE!</a>' +
      '</a>' +
    '</section>'

  var homeModule =
    '<section class="module" id="discord-banner">' +
      '<a href="https://discord.gg/ape2hfk" title="¡Ingresa al servidor de Fanloid Wiki!">' +
        '<img src="https://vignette.wikia.nocookie.net/fanloid/images/4/41/Discord_fanloid.png/revision/latest/scale-to-width-down/250?cb=20200518114418&path-prefix=es" alt="¡Ingresa al servidor Fanloid Wiki!" />'  +
        '<a href="https://discord.gg/ape2hfk" class="btnwnms">¡ÚNETE!</a>' +
      '</a>' +
    '</section>';
 
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
 
  $.getScript('https://platform.twitter.com/widgets.js', function (data) {
    return data;
  });
});