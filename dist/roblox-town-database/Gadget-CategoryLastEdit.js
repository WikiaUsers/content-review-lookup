/* CategoryLastEdit v2 — fecha/hora de última edición en cards de categoría */
$(function () {
    'use strict';

    var DEBUG = true; // ponlo en false cuando ya funcione

    function log() {
        if (DEBUG && window.console) {
            console.log.apply(console, ['[CategoryLastEdit]'].concat([].slice.call(arguments)));
        }
    }

    // 1. ¿Estamos en una página de categoría?
    var ns = mw.config.get('wgCanonicalNamespace');
    log('Namespace detectado:', ns);
    if (ns !== 'Category') {
        log('No es categoría, salgo.');
        return;
    }

    // 2. ¿Hay cards?
    var $cards = $('.category-page__member');
    log('Cards encontradas:', $cards.length);
    if ($cards.length === 0) {
        return;
    }

    // 3. Mapear título real -> card (usando href, no texto)
    var titleToCard = {};
    $cards.each(function () {
        var $link = $(this).find('.category-page__member-link');
        if ($link.length === 0) return;

        var href = $link.attr('href') || '';
        // href = "/wiki/Commands_(Special)" o "/es/wiki/..." según idioma
        var raw = href.replace(/^.*\/wiki\//, '');
        var title = decodeURIComponent(raw).replace(/_/g, ' ');

        if (title) {
            titleToCard[title] = $(this);
        }
    });

    var titles = Object.keys(titleToCard);
    log('Títulos únicos:', titles.length, titles);
    if (titles.length === 0) {
        return;
    }

    // 4. Consultar la API en lotes de 50
    var batches = [];
    for (var i = 0; i < titles.length; i += 50) {
        batches.push(titles.slice(i, i + 50));
    }

    var api = new mw.Api();

    batches.forEach(function (batch) {
        api.get({
            action: 'query',
            prop: 'revisions',
            rvprop: 'timestamp',
            titles: batch.join('|'),
            formatversion: 2
        }).done(function (data) {
            log('Respuesta API:', data);

            if (!data || !data.query || !data.query.pages) {
                log('Sin pages en la respuesta.');
                return;
            }

            data.query.pages.forEach(function (page) {
                if (!page.revisions || !page.revisions[0]) {
                    log('Sin revisiones para:', page.title);
                    return;
                }

                var ts = page.revisions[0].timestamp;
                var d = new Date(ts);

                var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
                var fecha = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
                var hora  = pad(d.getHours()) + ':' + pad(d.getMinutes());

                var $card = titleToCard[page.title];
                if (!$card) {
                    log('No encontré card para:', page.title);
                    return;
                }

                // Evitar duplicados en re-ejecuciones
                if ($card.find('.category-page__member-date').length) {
                    return;
                }

                var $span = $('<span>')
                    .addClass('category-page__member-date')
                    .attr('title', 'Última edición: ' + ts)
                    .text(fecha + ' ' + hora);

                $card.append($span);
                log('Fecha inyectada en:', page.title, '->', fecha + ' ' + hora);
            });
        }).fail(function (err) {
            log('ERROR API:', err);
        });
    });
});