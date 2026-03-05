/* === PortableInfobox: toggle por título (todas as infobox) === */
mw.hook('wikipage.content').add(function($content){
  $content.find('.portable-infobox').each(function(idx, el){
    var $box = $(el);

    // Se tiver "no-collapse", respeita opt-out
    if ($box.hasClass('no-collapse')) return;

    // Marca como "collapsible" (CSS usa esta classe)
    $box.addClass('collapsible');

    var $title = $box.find('.pi-title').first();
    if (!$title.length) return;

    // Acessibilidade
    $title.attr({
      role: 'button',
      tabindex: 0,
      'aria-expanded': 'true',
      'aria-controls': 'pi-body-'+idx
    });

    // Clique / teclado
    var toggle = function(ev){
      if (ev.type === 'keydown' && ev.key !== 'Enter' && ev.key !== ' ') return;
      ev.preventDefault();

      // Alterna colapsado
      $box.toggleClass('collapsed');
      var collapsed = $box.hasClass('collapsed');
      $title.attr('aria-expanded', String(!collapsed));
    };

    $title.on('click', toggle);
    $title.on('keydown', toggle);
  });
});

/* TabelaMapa – botão Ocultar/Expandir no título (alinhado à direita) */
(function () {
  // Garante jQuery e o hook de conteúdo
  mw.loader.using(['jquery']).then(function () {
    var $ = jQuery;

    function wireToggles($root) {
      $root.find('.dk-mapbox-link').each(function () {
        var $sec     = $(this);
        var $bar     = $sec.children('.dk-linkbar').first();
        var $content = $sec.children('.mw-collapsible-content, .dk-sec-content').first();

        if (!$bar.length || !$content.length) return;

        // Evita duplicar
        if ($bar.data('dkToggleWired')) return;

        // Wrapper e botão
        var $wrap = $('<span class="dk-toggle-wrap" />');
        var $btn  = $('<button type="button" class="dk-toggle" aria-expanded="true">Ocultar</button>');

        // Estado inicial se vier "fechado" pela marcação
        if ($sec.hasClass('mw-collapsed')) {
          $content.hide();
          $btn.text('Expandir').attr('aria-expanded', 'false');
        }

        $btn.on('click', function () {
          var isVisible = $content.is(':visible');
          // Animação suave
          $content.stop(true, true).slideToggle(150);
          // Alterna texto/estado
          $btn.text(isVisible ? 'Expandir' : 'Ocultar')
              .attr('aria-expanded', String(!isVisible));
        });

        // Insere no título e marca como ligado
        $wrap.append($btn);
        $bar.append($wrap).data('dkToggleWired', true);
      });
    }

    // Na carga da página e sempre que o conteúdo for re-renderizado
    mw.hook('wikipage.content').add(function ($content) {
      wireToggles($content);
    });

    // Fallback para a primeira carga fora do hook (caso o tema atrase o hook)
    $(function () { wireToggles($(document)); });
  });
})();

(function () {
  function makeSpan(cls, txt) {
    var s = document.createElement('span');
    s.className = cls;
    s.textContent = txt;
    return s;
  }

  function splitOne(el) {
    if (!el || el.dataset.dkSplitDone === '1') return;

    var t = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (t.length < 2) return;

    var left = t.slice(0, 1);
    var right = t.slice(-1);
    var mid = t.slice(1, -1);

    el.textContent = '';
    el.appendChild(makeSpan('dk-split-left', left));
    el.appendChild(makeSpan('dk-split-mid', mid));
    el.appendChild(makeSpan('dk-split-right', right));
    el.dataset.dkSplitDone = '1';
  }

  function splitAll(root) {
    root = root || document;
    var nodes = root.querySelectorAll ? root.querySelectorAll('.dk-split-auto') : [];
    for (var i = 0; i < nodes.length; i++) splitOne(nodes[i]);
  }

  function run() { splitAll(document); }

  // 1) load normal
  document.addEventListener('DOMContentLoaded', run);

  // 2) quando o navegador restaura a página do cache (sem recarregar)
  window.addEventListener('pageshow', run);

  // 3) quando o Fandom/MediaWiki injeta conteúdo (troca de página interna, etc.)
  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(function ($content) {
      // $content é jQuery; pegamos o nó raiz
      splitAll($content && $content[0] ? $content[0] : document);
    });
  }
})();