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
      '<a href="https://discord.gg/2bRzJfh8DV" title="¡Ingresa al servidor de My Hero Academia Wiki!">' +
        '<img src="https://vignette.wikia.nocookie.net/bokunoheroacademia/images/9/96/Wiki-Icono.png/revision/latest?cb=20180822044317&path-prefix=es" alt="¡Ingresa al servidor de My Hero Academia Wiki!" />'  +
        '<a href="https://discord.gg/2bRzJfh8DV" class="btnwnms">ACEPTAR INVITACIÓN</a>' +
      '</a>' +
    '</section>' +
    '<section class="rail-module" id="social-widgets">' +
      '<h2>¡Siguenos en Twitter e Instagram!</h2>' +
      '<table>' +
        '<tr>' +
          '<td>' +
      '<a href="https://instagram.com/bnhwiki" title="¡Síguenos en el instagram oficial de My Hero Academia Wiki!">' +
            '<img src="https://static.wikia.nocookie.net/panaderia-de-ricardo/images/e/e2/InstagramBanner.png/revision/latest?cb=20201221173340&path-prefix=es" alt="¡Síguenos en el instagram oficial de My Hero Academia Wiki!" />'  +
           '<a href="https://twitter.com/BnHWiki" title="¡Síguenos en el twitter oficial de My Hero Academia Wiki!">' +
            '<img src="https://i.imgur.com/1YSEmrh.png" alt="¡Siguenos en el twitter oficial de My Hero Academia Wiki!" />'  +
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
      $('#TOP_RIGHT_BOXAD').after(generalModule, $('.recent-wiki-activity')); // Inserts module and Recent Wiki Activity (if there is) below ads
    } else if (cfg.wgPageName === 'Special:RecentChanges') { // If there are no ads, checks if it's Special:WikiActivity
      $('#WikiaRail').prepend(generalModule, $('.CommunityCornerModule')); // Inserts module and Community Corner at the top of the sidebar
    } else { // If there are no ads and it isn't Special:WikiActivity
      $('.right-rail-wrapper').prepend(generalModule, $('.recent-wiki-activity')); // Inserts modules at the top of the sidebar
    }
  } else { // If it's the homepage
    $('#home-social-widgets').html(homeModule); // Inserts home module
  }
 
  $.getScript('https://platform.twitter.com/widgets.js', function (data) {
    return data;
  });
});

mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.poll-maker').each(function() {
        var $this = $(this),
            id = $this.attr('data-poll-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://www.poll-maker.com/frame' + id,
                css: css,
                seamless: 'seamless',
                frameborder: 'no'
            })
        );
    });
});