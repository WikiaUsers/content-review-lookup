/* ===== 2. Portada: estatísticas e atividade recente ao vivo ===== */
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
  if (!$('.pt-home').length) return;

  var fmt = function (n) { return Number(n).toLocaleString('pt-BR'); };

  function updateStats() {
    new mw.Api().get({ action: 'query', meta: 'siteinfo', siprop: 'statistics' }).done(function (d) {
      var s = d.query.statistics;
      var map = {
        articles: s.articles, pages: s.pages, images: s.images,
        edits: s.edits, users: s.users, activeusers: s.activeusers
      };
      $('[data-live]').each(function () {
        var k = $(this).attr('data-live');
        if (map[k] !== undefined) $(this).text(fmt(map[k]));
      });
    });
  }

  function ago(iso) {
    var m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (m < 1) return 'agora';
    if (m < 60) return 'há ' + m + ' min';
    var h = Math.round(m / 60);
    if (h < 24) return 'há ' + h + ' h';
    return 'há ' + Math.round(h / 24) + ' d';
  }

  function updateRecent() {
    var $l = $('#pt-recent-list');
    if (!$l.length) return;
    new mw.Api().get({
      action: 'query', list: 'recentchanges', rcprop: 'title|user|timestamp',
      rctype: 'edit|new', rclimit: 6, rcnamespace: 0
    }).done(function (d) {
      var $ul = $('<ul></ul>');
      (d.query.recentchanges || []).forEach(function (rc) {
        $('<li></li>')
          .append($('<a></a>').attr('href', mw.util.getUrl(rc.title)).text(rc.title))
          .append(document.createTextNode(' — ' + rc.user + ' '))
          .append($('<small></small>').text(ago(rc.timestamp)))
          .appendTo($ul);
      });
      $l.empty().append($ul.children().length ? $ul : 'Nenhuma atividade recente.');
    });
  }

  function tick() {
    $('#pt-clock').text(new Date().toLocaleTimeString('pt-BR'));
  }

  updateStats(); updateRecent(); tick();
  setInterval(tick, 1000);
  setInterval(function () { updateStats(); updateRecent(); }, 60000);
});


/* ===== 3. Display de horário ao vivo, por país do usuário ===== */
(function () {
  'use strict';

  var CONFIG = {
    floating: true,      // true = mini display flutuante em todas as páginas
    showBrasilia: true   // mostra também o horário de Brasília
  };

  // Fuso horário -> país (código ISO)
  var TZ = {
    // Brasil
    'America/Sao_Paulo':'BR','America/Bahia':'BR','America/Fortaleza':'BR','America/Recife':'BR',
    'America/Belem':'BR','America/Manaus':'BR','America/Cuiaba':'BR','America/Campo_Grande':'BR',
    'America/Rio_Branco':'BR','America/Noronha':'BR','America/Maceio':'BR','America/Araguaina':'BR',
    'America/Porto_Velho':'BR','America/Boa_Vista':'BR','America/Santarem':'BR',
    // América Latina
    'America/Buenos_Aires':'AR','America/Santiago':'CL','America/Punta_Arenas':'CL','Pacific/Easter':'CL',
    'America/Bogota':'CO','America/Lima':'PE','America/Caracas':'VE','America/La_Paz':'BO',
    'America/Asuncion':'PY','America/Montevideo':'UY','America/Guayaquil':'EC','Pacific/Galapagos':'EC',
    'America/Mexico_City':'MX','America/Monterrey':'MX','America/Merida':'MX','America/Cancun':'MX',
    'America/Tijuana':'MX','America/Chihuahua':'MX','America/Hermosillo':'MX','America/Mazatlan':'MX',
    'America/Panama':'PA','America/Costa_Rica':'CR','America/Guatemala':'GT','America/El_Salvador':'SV',
    'America/Tegucigalpa':'HN','America/Managua':'NI','America/Havana':'CU','America/Santo_Domingo':'DO',
    'America/Puerto_Rico':'PR',
    // América do Norte
    'America/New_York':'US','America/Detroit':'US','America/Chicago':'US','America/Denver':'US',
    'America/Phoenix':'US','America/Los_Angeles':'US','America/Anchorage':'US','Pacific/Honolulu':'US',
    'America/Toronto':'CA','America/Vancouver':'CA','America/Edmonton':'CA','America/Winnipeg':'CA',
    'America/Halifax':'CA','America/St_Johns':'CA',
    // Europa
    'Europe/Madrid':'ES','Atlantic/Canary':'ES','Europe/Lisbon':'PT','Atlantic/Azores':'PT','Atlantic/Madeira':'PT',
    'Europe/London':'GB','Europe/Paris':'FR','Europe/Berlin':'DE','Europe/Rome':'IT','Europe/Amsterdam':'NL',
    'Europe/Brussels':'BE','Europe/Zurich':'CH','Europe/Vienna':'AT','Europe/Dublin':'IE','Europe/Stockholm':'SE',
    'Europe/Oslo':'NO','Europe/Copenhagen':'DK','Europe/Helsinki':'FI','Europe/Warsaw':'PL','Europe/Moscow':'RU',
    'Europe/Athens':'GR','Europe/Istanbul':'TR',
    // África
    'Africa/Luanda':'AO','Africa/Maputo':'MZ','Africa/Johannesburg':'ZA','Africa/Lagos':'NG',
    'Africa/Cairo':'EG','Africa/Casablanca':'MA',
    // Ásia e Oceania
    'Asia/Tokyo':'JP','Asia/Seoul':'KR','Asia/Shanghai':'CN','Asia/Hong_Kong':'HK','Asia/Singapore':'SG',
    'Asia/Kolkata':'IN','Asia/Dubai':'AE','Asia/Jerusalem':'IL','Asia/Manila':'PH','Asia/Jakarta':'ID',
    'Asia/Bangkok':'TH','Australia/Sydney':'AU','Australia/Melbourne':'AU','Australia/Perth':'AU',
    'Australia/Brisbane':'AU','Australia/Adelaide':'AU','Pacific/Auckland':'NZ'
  };

  var tz, locale = navigator.language || 'pt-BR';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}

  function countryFromZone(z) {
    if (!z) return null;
    if (TZ[z]) return TZ[z];
    if (/^America\/Argentina\//.test(z)) return 'AR';
    return null;
  }
  function countryFromLocale(l) {
    var m = /[-_]([A-Za-z]{2})\b/.exec(l || '');
    return m ? m[1].toUpperCase() : null;
  }
  function flag(cc) {
    try {
      return cc.replace(/./g, function (c) { return String.fromCodePoint(127397 + c.charCodeAt(0)); });
    } catch (e) { return ''; }
  }
  function countryName(cc) {
    try { return new Intl.DisplayNames(['pt-BR'], { type: 'region' }).of(cc); }
    catch (e) { return cc; }
  }
  function withZone(o) { if (tz) { o.timeZone = tz; } return o; }

  var CC = countryFromZone(tz) || countryFromLocale(locale);

  function parts() {
    var d = new Date(), zoneName = '';
    try {
      var p = new Intl.DateTimeFormat(locale, withZone({ timeZoneName: 'short' })).formatToParts(d);
      for (var i = 0; i < p.length; i++) { if (p[i].type === 'timeZoneName') { zoneName = p[i].value; } }
    } catch (e) {}
    return {
      time: d.toLocaleTimeString(locale, withZone({ hour: '2-digit', minute: '2-digit', second: '2-digit' })),
      date: d.toLocaleDateString(locale, withZone({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })),
      zone: (tz ? tz.replace(/_/g, ' ') : '') + (zoneName ? ' (' + zoneName + ')' : ''),
      br: d.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  }

  function build() {
    return $('<div class="ptclk"></div>').append(
      $('<div class="ptclk-top"></div>').append(
        $('<span class="ptclk-flag"></span>').text(CC ? flag(CC) : '🕒'),
        $('<span class="ptclk-country"></span>').text(CC ? countryName(CC) : 'Seu horário local')
      ),
      $('<div class="ptclk-time"></div>'),
      $('<div class="ptclk-date"></div>'),
      $('<div class="ptclk-tz"></div>'),
      $('<div class="ptclk-ref"></div>')
    );
  }

  function update($w) {
    var p = parts();
    $w.find('.ptclk-time').text(p.time);
    $w.find('.ptclk-date').text(p.date);
    $w.find('.ptclk-tz').text(p.zone);
    if (CONFIG.showBrasilia && tz !== 'America/Sao_Paulo') {
      $w.find('.ptclk-ref').text('Brasília: ' + p.br);
    } else {
      $w.find('.ptclk-ref').empty();
    }
  }

  $(function () {
    var KEY = 'ptclk-hidden';            // lembra se o usuário ocultou o relógio
    var $host = $('#pt-clock-display');
    var $w = build();

    if ($host.length) {
      $host.empty().append($w);          // dentro da página (ex.: portada)
    } else if (CONFIG.floating) {
      $w.addClass('ptclk-float')
        .attr('title', 'Clique para minimizar · ESC oculta · Q mostra')
        .on('click', function () { $(this).toggleClass('ptclk-min'); });
      $('body').append($w);              // display flutuante em todas as páginas
    } else {
      return;
    }

    // Restaura o estado salvo
    try { if (localStorage.getItem(KEY) === '1') { $w.addClass('ptclk-hidden'); } } catch (e) {}

    function setHidden(hidden) {
      $w.toggleClass('ptclk-hidden', hidden);
      try { localStorage.setItem(KEY, hidden ? '1' : '0'); } catch (e) {}
    }

    // ESC oculta, Q mostra (ignora quando o usuário está digitando)
    $(document).on('keydown.ptclk', function (e) {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      var t = e.target, tag = (t.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || t.isContentEditable) return;

      var k = (e.key || '').toLowerCase();
      if (k === 'escape') { setHidden(true); }
      else if (k === 'q') { setHidden(false); }
    });

    update($w);
    setInterval(function () { update($w); }, 1000);
  });
})();


/* ===== 4. Selo de artigo em destaque (só na categoria "Artigos em destaque") ===== */
(function () {
  'use strict';

  var CATEGORIA = 'Artigos em destaque';   // nome da categoria, sem o prefixo "Categoria:"
  var TEXTO = '⭐ Artigo em destaque';     // texto ao lado do título

  var cats = mw.config.get('wgCategories') || [];
  var ns = mw.config.get('wgNamespaceNumber');

  // Só artigos (espaço principal) que estejam na categoria
  if (ns !== 0 || cats.indexOf(CATEGORIA) === -1) return;

  $(function () {
    var $titulo = $('.page-header__title, .firstHeading').first();
    if (!$titulo.length || $titulo.find('.pt-destaque-badge').length) return;

    $('body').addClass('pt-artigo-destaque');
    $titulo.append(
      $('<span class="pt-destaque-badge"></span>')
        .attr('title', 'Este é um artigo em destaque')
        .text(TEXTO)
    );
  });
})();