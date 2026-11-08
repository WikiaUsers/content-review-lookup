/* =============================================================================
   D.K. — MediaWiki:Common.js
   1. Infobox: colapso por título e cabeçalho
   2. Mapbox: colapso por título e barras de seção
   3. Losango: split automático (1ª/última letra nas pontas)
   4. Abas: marca páginas inexistentes e bloqueia para não-admins
   5. Página inicial: cartões clicáveis
   Tudo roda a cada conteúdo carregado (página, pré-visualização, VisualEditor).
   ============================================================================= */

mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(function () {
  'use strict';

  var GRUPOS_ADMIN = ['sysop', 'bureaucrat', 'staff', 'wiki-manager'];

  var BARRAS_ABAS = [
    '.dk-tabbar', '.dk-tabs', '.dk-tabplaneta', '.dk-tablocal', '.dk-tabassentamento',
    '.dk-tabkaidou', '.dk-tabcontinente', '.dk-tabgalaxia', '.dk-tabsisplanetario',
    '.dk-tabcla-familia', '.dk-tabgrupo', '.dk-tabpoder', '.dk-tabdivindade', '.dk-tabwyris'
  ];
  var LINKS_ABAS = BARRAS_ABAS.map(function (s) { return s + ' a'; }).join(', ');
  var NOVAS_ABAS = BARRAS_ABAS.map(function (s) { return s + ' a.new, ' + s + ' span.new'; }).join(', ');

  function ehAdmin() {
    var grupos = mw.config.get('wgUserGroups') || [];
    return GRUPOS_ADMIN.some(function (g) { return grupos.indexOf(g) !== -1; });
  }


  /* ===========================================================================
     1. INFOBOX
     =========================================================================== */

  $(document).on('click', '.portable-infobox[class*="pi-theme-"] .pi-title', function (e) {
    if ($(e.target).closest('a').length) return;

    var $ib = $(this).closest('.portable-infobox');

    if ($ib.hasClass('bk-collapsed-all')) {
      $ib.removeClass('bk-collapsed-all');
      $ib.find('.bk-hidden').removeClass('bk-hidden');
      $ib.find('.pi-header').removeClass('bk-section-collapsed');
    } else {
      $ib.addClass('bk-collapsed-all');
      $ib.children().not('.pi-title').addClass('bk-hidden');
    }
  });

  $(document).on('click', '.portable-infobox[class*="pi-theme-"] .pi-header', function (e) {
    if ($(e.target).closest('a').length) return;
    e.stopPropagation();

    var $ib = $(this).closest('.portable-infobox');
    if ($ib.hasClass('bk-collapsed-all')) return;

    var $h = $(this);
    var $itens = $h.nextUntil('.pi-header');

    if ($h.hasClass('bk-section-collapsed')) {
      $h.removeClass('bk-section-collapsed');
      $itens.removeClass('bk-hidden');
    } else {
      $h.addClass('bk-section-collapsed');
      $itens.addClass('bk-hidden');
    }
  });


  /* ===========================================================================
     2. MAPBOX
     O título só alterna uma classe; cada seção guarda o próprio estado.
     =========================================================================== */

  $(document).on('click', '.dk-mapbox-title', function (e) {
    if ($(e.target).closest('a').length) return;
    $(this).closest('.dk-mapbox').toggleClass('bk-map-collapsed');
  });

  $(document).on('click', '.dk-linkbar', function (e) {
    if ($(e.target).closest('a').length) return;

    var $bar = $(this);
    var $conteudo = $bar.closest('.dk-mapbox-link').find('.dk-sec-content');
    var fechar = !$conteudo.hasClass('bk-hidden');

    $conteudo.toggleClass('bk-hidden', fechar);
    $bar.find('.bk-toggle').text(fechar ? 'Expandir' : 'Ocultar');
  });

  function prepararMapbox($c) {
    $c.find('.dk-linkbar').each(function () {
      var $bar = $(this);
      if ($bar.data('bkPronto')) return;
      $bar.data('bkPronto', true);

      $bar.find('.mw-collapsible-toggle').remove();

      if (!$bar.find('.bk-bar-text').length) {
        var titulo = $bar.attr('data-title') || $bar.text().trim();

        $bar.contents().filter(function () { return this.nodeType === 3; }).remove();
        if (!$bar.attr('data-title')) {
          $bar.children('span:not(.bk-toggle)').remove();
        }
        if (titulo) {
          $bar.prepend($('<span class="bk-bar-text"></span>').text(titulo));
        }
      }

      if (!$bar.find('.bk-toggle').length) {
        $bar.append('<span class="bk-toggle">Ocultar</span>');
      }
    });

    $c.find('.dk-mapbox-link[data-collapsed="1"]').each(function () {
      var $sec = $(this);
      if ($sec.data('bkPronto')) return;
      $sec.data('bkPronto', true);
      $sec.find('.dk-sec-content').addClass('bk-hidden');
      $sec.find('.bk-toggle').text('Expandir');
    });
  }


  /* ===========================================================================
     3. LOSANGO — split automático
     Pula cabeçalhos com links ou imagens; preserva a âncora do sumário.
     =========================================================================== */

  function splitLosangos($c) {
    $c.find('.dk-diamond-header.dk-split-auto').not('.dk-split-ready').each(function () {
      var $h = $(this);
      var $alvo = $h.children('.mw-headline').first();
      if (!$alvo.length) $alvo = $h;

      if ($alvo.find('a, img').length) return;

      var letras = Array.from($alvo.text().trim());
      if (letras.length < 3) return;

      var $editar = $h.children('.mw-editsection').detach();

      $alvo.empty().append(
        $('<span class="dk-split-left"></span>').text(letras[0]),
        $('<span class="dk-split-mid"></span>').text(letras.slice(1, -1).join('')),
        $('<span class="dk-split-right"></span>').text(letras[letras.length - 1])
      );
      if ($editar.length) $h.append($editar);

      $h.addClass('dk-split-ready');
    });
  }


  /* ===========================================================================
     4. ABAS
     O MediaWiki já marca links vermelhos com .new; a API só confere links
     internos escritos como URL (ex.: [https://.../wiki/Pagina Página]).
     =========================================================================== */

  $(document).on('click', 'a.bk-locked', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  function tituloDoLink(a) {
    if (a.hostname && a.hostname !== location.hostname) return null;
    var href = a.getAttribute('href') || '';
    var m = href.match(/\/wiki\/([^?#]+)/);
    try {
      if (m) return decodeURIComponent(m[1]).replace(/_/g, ' ');
      var t = mw.util.getParamValue('title', href);
      return t ? t.replace(/_/g, ' ') : null;
    } catch (err) {
      return null;
    }
  }

  function bloquearAbas($c) {
    if (ehAdmin()) return;
    $c.find(NOVAS_ABAS).addClass('bk-locked');
  }

  function verificarAbas($c) {
    var pendentes = {};

    $c.find(LINKS_ABAS).not('.tab-act, .new').each(function () {
      var href = this.getAttribute('href') || '';
      if (href.indexOf('redlink=1') !== -1) {
        $(this).addClass('new');
        return;
      }
      var t = tituloDoLink(this);
      if (t) (pendentes[t] = pendentes[t] || []).push($(this));
    });

    var titulos = Object.keys(pendentes);
    if (!titulos.length) {
      bloquearAbas($c);
      return;
    }

    var api = new mw.Api();
    var lotes = [];
    for (var i = 0; i < titulos.length; i += 50) lotes.push(titulos.slice(i, i + 50));

    var consultas = lotes.map(function (lote) {
      return api.get({ action: 'query', titles: lote, formatversion: 2 }).then(function (d) {
        if (!d.query) return;
        var original = {};
        (d.query.normalized || []).forEach(function (n) { original[n.to] = n.from; });
        (d.query.pages || []).forEach(function (p) {
          if (!p.missing && !p.invalid) return;
          var chave = original[p.title] || p.title;
          (pendentes[chave] || []).forEach(function ($a) { $a.addClass('new'); });
        });
      }, function () { /* falha na API: segue sem marcar */ });
    });

    $.when.apply($, consultas).always(function () { bloquearAbas($c); });
  }


  /* ===========================================================================
     5. PÁGINA INICIAL — cartões clicáveis (vão para o 1º link do cartão)
     =========================================================================== */

  function cartoesClicaveis($c) {
    $c.find('.dk-portal, .dk-obra').each(function () {
      var $card = $(this);
      var $link = $card.find('a[href]').first();
      if (!$link.length || $card.hasClass('dk-clicavel')) return;
      $card.addClass('dk-clicavel').attr('data-href', $link.attr('href'));
    });
  }

  $(document).on('click', '.dk-clicavel', function (e) {
    if ($(e.target).closest('a').length) return;
    var href = $(this).attr('data-href');
    if (href) window.location.href = href;
  });


  /* ===========================================================================
     INICIALIZAÇÃO
     =========================================================================== */

  mw.hook('wikipage.content').add(function ($c) {
    prepararMapbox($c);
    splitLosangos($c);
    verificarAbas($c);
    cartoesClicaveis($c);
  });

});