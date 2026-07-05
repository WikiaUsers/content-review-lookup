/* =============================================================================
   TEMA LIVRO — JavaScript de Colapso/Expansão + Tabs
   Colar em: MediaWiki:Common.js
   ============================================================================= */

$(function(){
  'use strict';

  /* =========================================================================
     INFOBOX — Colapso por cabeçalho e título
     - Título (pi-title): clique colapsa/expande TODA a infobox
     - Cabeçalho (pi-header): clique colapsa/expande sua seção
     - Infobox começa SEMPRE expandida
     ========================================================================= */

  $(document).on('click', '.portable-infobox[class*="pi-theme-"] .pi-title', function(e){
    /* Ignorar cliques em links dentro do título */
    if($(e.target).is('a')) return;
    
    var $infobox = $(this).closest('.portable-infobox');
    var isCollapsed = $infobox.hasClass('bk-collapsed-all');

    if(isCollapsed){
      /* Expandir tudo */
      $infobox.removeClass('bk-collapsed-all');
      $infobox.find('.bk-hidden').removeClass('bk-hidden');
      $infobox.find('.pi-header').removeClass('bk-section-collapsed');
    } else {
      /* Colapsar: esconder tudo EXCETO o título */
      $infobox.addClass('bk-collapsed-all');
      $infobox.find('.pi-header, .pi-item, .pi-image, .pi-navigation, .pi-panel, .pi-group, .pi-data, .pi-smart-data-value').not('.pi-title').addClass('bk-hidden');
    }
  });

  $(document).on('click', '.portable-infobox[class*="pi-theme-"] .pi-header', function(e){
    e.stopPropagation();
    /* Ignorar se a infobox inteira está colapsada */
    var $infobox = $(this).closest('.portable-infobox');
    if($infobox.hasClass('bk-collapsed-all')) return;
    
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
     Compatível com tabelas geradas pelo Module:TabelaMapa e HTML manual
     ========================================================================= */

  $('.dk-linkbar').each(function(){
    var $bar = $(this);
    var title = $bar.attr('data-title') || '';
    
    /* Remover toggles nativos do MediaWiki */
    $bar.find('.mw-collapsible-toggle').remove();
    
    /* Se já tem bk-bar-text, não duplicar */
    if($bar.find('.bk-bar-text').length > 0) return;
    
    /* Se data-title existe, usar ele e limpar o conteúdo texto solto */
    if(title){
      /* Limpar texto solto (que pode estar duplicando o título) */
      $bar.contents().filter(function(){
        return this.nodeType === 3; /* text nodes */
      }).remove();
      $bar.prepend('<span class="bk-bar-text">' + mw.html.escape(title) + '</span>');
    } else {
      /* Sem data-title: pegar o texto existente e envolver em bk-bar-text */
      var existingText = $bar.text().trim();
      /* Remover todo conteúdo texto */
      $bar.contents().filter(function(){
        return this.nodeType === 3;
      }).remove();
      /* Remover spans que não são bk-toggle */
      $bar.children('span:not(.bk-toggle)').each(function(){
        existingText = existingText || $(this).text().trim();
        $(this).remove();
      });
      if(existingText){
        $bar.prepend('<span class="bk-bar-text">' + mw.html.escape(existingText) + '</span>');
      }
    }
    
    /* Adicionar toggle se não existe */
    if($bar.find('.bk-toggle').length === 0){
      $bar.append('<span class="bk-toggle">Ocultar</span>');
    }
  });

  /* Título da mapbox — colapsa/expande TUDO */
  $(document).on('click', '.dk-mapbox-title', function(){
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

  /* Barra de seção — colapsa/expande conteúdo dessa seção */
  $(document).on('click', '.dk-linkbar', function(){
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

  /* Seções que começam colapsadas (data-collapsed="1") */
  $('.dk-mapbox-link[data-collapsed="1"]').each(function(){
    $(this).find('.dk-sec-content').addClass('bk-hidden');
    $(this).find('.bk-toggle').text('Expandir');
  });


  /* =========================================================================
     TABS — Marcar páginas inexistentes e bloquear para não-admins
     ========================================================================= */

  var $tabLinks = $('[class^="dk-tab"] a, [class*="dk-tab"] a').not('.tab-act');

  /* Método 1: já tem .new */
  /* Método 2: verificar redlink no href */
  $tabLinks.each(function(){
    var $link = $(this);
    var href = $link.attr('href') || '';
    if(href.indexOf('redlink=1') !== -1){
      $link.addClass('new');
    }
  });

  /* Método 3: API fallback */
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
      $('[class^="dk-tab"] a.new, [class*="dk-tab"] a.new, [class^="dk-tab"] span.new, [class*="dk-tab"] span.new')
        .addClass('bk-locked')
        .on('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          return false;
        });
    }
  }

});