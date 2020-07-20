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
      '<a href="https://discord.gg/u3WtshD" title="¡Ingresa al servidor de Boku no Hero Academia Wiki!">' +
        '<img src="https://vignette.wikia.nocookie.net/bokunoheroacademia/images/9/96/Wiki-Icono.png/revision/latest?cb=20180822044317&path-prefix=es" alt="¡Ingresa al servidor de Boku no Hero Academia Wiki!" />'  +
        '<a href="https://discord.gg/u3WtshD" class="btnwnms">ACEPTAR INVITACIÓN</a>' +
      '</a>' +
    '</section>' +
    '<section class="rail-module" id="social-widgets">' +
      '<h2>¡Siguenos en Twitter!</h2>' +
      '<table>' +
        '<tr>' +
          '<td>' +
           '<a href="https://twitter.com/BnHWiki" title="¡Siguenos en el twitter oficial de Boku no Hero Academia Wiki!">' +
            '<img src="https://i.imgur.com/1YSEmrh.png" alt="¡Siguenos en el twitter oficial de Boku no Hero Academia Wiki!" />'  +
            '<a href="https://twitter.com/BnHWiki?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-lang="es" data-show-count="true">Seguir a @BnHWiki</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' +
          '</td>' +
        '</tr>' +
      '</table>' +
    '</section>';
 
  var homeModule =
    '<table>' +
      '<tr>' +
        '<td>' +
          '<a href="https://twitter.com/BnHWiki?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-lang="es" data-show-count="true">Seguir a @BnHWiki</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' +
        '</td>' +
      '</tr>' +
    '</table>';
 
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