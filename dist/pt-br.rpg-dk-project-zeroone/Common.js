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
     TABS — Verificar páginas inexistentes via API
     Funciona para TODOS os usuários (logados e visitantes)
     ========================================================================= */

  var $tabLinks = $('[class^="dk-tab"] a, [class*="dk-tab"] a').not('.tab-act');
  var titlesToCheck = {};

  $tabLinks.each(function(){
    var href = $(this).attr('href') || '';
    /* Suporta múltiplos formatos de URL do Fandom:
       /wiki/Titulo
       /pt-br/wiki/Titulo
       /f/p/Titulo
    */
    var match = href.match(/\/wiki\/([^?#]+)/);
    if(!match){
      /* Tenta extrair do href relativo */
      match = href.match(/\/([^\/\?#]+)$/);
    }
    if(match){
      var title = decodeURIComponent(match[1]).replace(/_/g, ' ');
      if(!titlesToCheck[title]){
        titlesToCheck[title] = [];
      }
      titlesToCheck[title].push($(this));
    }
  });

  var allTitles = Object.keys(titlesToCheck);

  if(allTitles.length > 0){
    /* Construir URL da API de forma robusta */
    var apiUrl;
    if(typeof mw !== 'undefined' && mw.util && mw.util.wikiScript){
      apiUrl = mw.util.wikiScript('api');
    } else {
      /* Fallback: construir manualmente a partir do hostname */
      apiUrl = '/api.php';
    }

    var batchSize = 50;
    var pendingBatches = Math.ceil(allTitles.length / batchSize);
    var completedBatches = 0;

    for(var b = 0; b < allTitles.length; b += batchSize){
      var batch = allTitles.slice(b, b + batchSize);
      (function(batchTitles){
        $.ajax({
          url: apiUrl,
          data: {
            action: 'query',
            titles: batchTitles.join('|'),
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
                  if(titlesToCheck[title]){
                    titlesToCheck[title].forEach(function($link){
                      $link.addClass('new');
                    });
                  }
                }
              }
            }
          },
          complete: function(){
            completedBatches++;
            if(completedBatches >= pendingBatches){
              aplicarBloqueioTabs();
            }
          }
        });
      })(batch);
    }
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