/* =============================================================================
   TEMA LIVRO — JavaScript de Colapso/Expansão + Tabs
   Colar em: MediaWiki:Common.js
   ============================================================================= */

$(function(){
  'use strict';

  /* =========================================================================
     INFOBOX — Colapso por cabeçalho e título
     ========================================================================= */

  $('.portable-infobox[class*="pi-theme-"] .pi-title').on('click', function(){
    var $infobox = $(this).closest('.portable-infobox');
    var isCollapsed = $infobox.hasClass('bk-collapsed-all');

    if(isCollapsed){
      $infobox.removeClass('bk-collapsed-all');
      $infobox.find('.bk-hidden').removeClass('bk-hidden');
      $infobox.find('.pi-header').removeClass('bk-section-collapsed');
    } else {
      $infobox.addClass('bk-collapsed-all');
      $infobox.find('.pi-header, .pi-item, .pi-image, .pi-navigation').addClass('bk-hidden');
    }
  });

  $('.portable-infobox[class*="pi-theme-"] .pi-header').on('click', function(e){
    e.stopPropagation();
    var $header = $(this);
    var isCollapsed = $header.hasClass('bk-section-collapsed');
    var $items = $header.nextUntil('.pi-header');

    if(isCollapsed){
      $header.removeClass('bk-section-collapsed');
      $items.removeClass('bk-hidden');
    } else {
      $header.addClass('bk-section-collapsed');
      $items.addClass('bk-hidden');
    }
  });


  /* =========================================================================
     MAPBOX — Colapso por título e barras de seção
     ========================================================================= */

  $('.dk-linkbar').each(function(){
    var $bar = $(this);
    var title = $bar.attr('data-title') || '';
    $bar.find('.mw-collapsible-toggle').remove();
    if($bar.find('.bk-bar-text').length === 0){
      $bar.prepend('<span class="bk-bar-text">' + title + '</span>');
      $bar.append('<span class="bk-toggle">Ocultar</span>');
    }
  });

  $('.dk-mapbox-title').on('click', function(){
    var $mapbox = $(this).closest('.dk-mapbox');
    var isCollapsed = $mapbox.hasClass('bk-map-collapsed');

    if(isCollapsed){
      $mapbox.removeClass('bk-map-collapsed');
      $mapbox.find('.dk-mapbox-link').removeClass('bk-hidden');
      $mapbox.find('.dk-sec-content').removeClass('bk-hidden');
      $mapbox.find('.bk-toggle').text('Ocultar');
    } else {
      $mapbox.addClass('bk-map-collapsed');
      $mapbox.find('.dk-mapbox-link').addClass('bk-hidden');
    }
  });

  $('.dk-linkbar').on('click', function(){
    var $bar = $(this);
    var $section = $bar.closest('.dk-mapbox-link');
    var $content = $section.find('.dk-sec-content');
    var $toggle = $bar.find('.bk-toggle');
    var isCollapsed = $content.hasClass('bk-hidden');

    if(isCollapsed){
      $content.removeClass('bk-hidden');
      $toggle.text('Ocultar');
    } else {
      $content.addClass('bk-hidden');
      $toggle.text('Expandir');
    }
  });


  /* =========================================================================
     TABS — Marcar páginas inexistentes e bloquear para não-admins
     
     3 métodos de detecção (em cascata):
     1. Classe .new (funciona para logados)
     2. href contém "redlink=1" (Fandom adiciona para inexistentes)
     3. API query como fallback
     ========================================================================= */

  var $tabLinks = $('[class^="dk-tab"] a, [class*="dk-tab"] a').not('.tab-act');

  /* Método 1: já tem .new (usuários logados) — nada a fazer */

  /* Método 2: verificar redlink no href */
  $tabLinks.each(function(){
    var $link = $(this);
    var href = $link.attr('href') || '';
    if(href.indexOf('redlink=1') !== -1){
      $link.addClass('new');
    }
  });

  /* Método 3: API fallback para links que não têm .new nem redlink */
  var linksParaVerificar = {};
  $tabLinks.not('.new').each(function(){
    var $link = $(this);
    var href = $link.attr('href') || '';
    var match = href.match(/\/wiki\/([^?#]+)/);
    if(match){
      var title = decodeURIComponent(match[1]).replace(/_/g, ' ');
      if(!linksParaVerificar[title]) linksParaVerificar[title] = [];
      linksParaVerificar[title].push($link);
    }
  });

  var titulos = Object.keys(linksParaVerificar);
  if(titulos.length > 0){
    var apiUrl = mw.util ? mw.util.wikiScript('api') : '/api.php';
    
    $.ajax({
      url: apiUrl,
      data: {
        action: 'query',
        titles: titulos.join('|'),
        format: 'json',
        origin: '*'
      },
      dataType: 'json',
      timeout: 5000,
      success: function(data){
        if(!data.query || !data.query.pages) return;
        var pages = data.query.pages;
        for(var id in pages){
          if(pages.hasOwnProperty(id)){
            var page = pages[id];
            if(parseInt(id) < 0 || page.missing !== undefined){
              var title = page.title;
              if(linksParaVerificar[title]){
                linksParaVerificar[title].forEach(function($link){
                  $link.addClass('new');
                });
              }
            }
          }
        }
        aplicarBloqueioTabs();
      },
      error: function(){
        /* Se API falhar, aplicar bloqueio mesmo assim */
        aplicarBloqueioTabs();
      }
    });
  } else {
    aplicarBloqueioTabs();
  }

  function aplicarBloqueioTabs(){
    var userGroups = [];
    if(typeof mw !== 'undefined' && mw.config){
      userGroups = mw.config.get('wgUserGroups') || [];
    }
    var isAdmin = (
      userGroups.indexOf('sysop') !== -1 ||
      userGroups.indexOf('bureaucrat') !== -1 ||
      userGroups.indexOf('staff') !== -1 ||
      userGroups.indexOf('wiki-manager') !== -1
    );

    if(!isAdmin){
      $('[class^="dk-tab"] a.new, [class*="dk-tab"] a.new')
        .addClass('bk-locked')
        .on('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          return false;
        });
    }
  }

});