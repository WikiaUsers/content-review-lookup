/**
 * @name SocialWidgets
 * @author Manuel de la Fuente (https://manuelfte.com)
 * @version 1.0.5
 * @license CC-BY-SA-3.0
 * @description Inserts widgets for social networks at the top of the sidebar
 */
/* eslint-env jquery */
mw.hook('wikipage.content').add(function() {
  'use strict';

  console.log('SocialWidgets v1.0.5');

  var cfg = window.mw.config.get([
    'wgIsMainpage',
    'wgPageName'
  ]);

  var generalModule =
    '<section class="module" id="discord-banner">' +
      '<a href="https://discord.gg/bZe4G5y" title="¡Ingresa al servior de Ataque a los Titanes Wiki!">' +
        '<img src="https://vignette.wikia.nocookie.net/shingeki-no-kyojin/images/9/9f/Wiki-discord.png/revision/latest?cb=20180402170111&path-prefix=es" alt="¡Ingresa al servidor de Ataque a los Titanes Wiki!" />'  +
        '<a href="https://discord.gg/bZe4G5y" class="btnwnms">ACEPTAR INVITACIÓN</a>' +
      '</a>' +
    '</section>' +
    '<section class="rail-module" id="social-widgets">' +
      '<h2>¡Siguenos en Facebook y Twitter!</h2>' +
      '<table>' +
        '<tr>' +
          '<td colspan="2">' +
            '<iframe style="border: 0; height: 195px; margin: 0; overflow: hidden; width: 268px;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fsnkwiki&amp;width=268&amp;heightcolorscheme=light&amp;show_faces=true&amp;header=true&amp;stream=false&amp;show_border=true" scrolling="no"></iframe>' +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td>' +
            '<a href="https://twitter.com/SnKWikiEs?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-lang="es" data-show-count="true">Seguir a @SnkWikiEs</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' +
          '</td>' +
        '</tr>' +
      '</table>' +
    '</section>';

  var homeModule =
    '<table>' +
      '<tr>' +
        '<td colspan="2">' +
          '<iframe style="border: 0; height: 300px; margin: 0; overflow: hidden; width: 296px;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fsnkwiki&amp;header=true&amp;height=300&amp;heightcolorscheme=light&amp;show_faces=true&amp;small_header=true&amp;stream=true&amp;width=296" scrolling="yes"></iframe>' +
        '</td>' +
      '</tr>' +
      '<tr>' +
        '<td>' +
          '<a href="https://twitter.com/SnkWikiEs?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-lang="es" data-show-count="true">Seguir a @SnkWikiEs</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' +
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