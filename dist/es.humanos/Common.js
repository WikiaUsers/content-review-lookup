/* ================================================================
   SCRIPT COMPLETO - Wiki Humanos
   ================================================================ */

(function () {

    /* ============================================================
       1. INFO DEBAJO DEL TÍTULO
       ============================================================ */
    function iniciarInfoPagina() {
        if (mw.config.get('wgNamespaceNumber') !== 0) return;
        if (mw.config.get('wgAction') !== 'view') return;

        var pageName = mw.config.get('wgPageName');
        var api = new mw.Api();

        var lastEdit = api.get({
            action: 'query', prop: 'revisions', titles: pageName,
            rvprop: 'timestamp|user', rvlimit: 1, rvdir: 'older', format: 'json'
        });
        var firstEdit = api.get({
            action: 'query', prop: 'revisions', titles: pageName,
            rvprop: 'timestamp|user', rvlimit: 1, rvdir: 'newer', format: 'json'
        });
        var categorias = api.get({
            action: 'query', prop: 'categories', titles: pageName,
            cllimit: 'max', format: 'json'
        });

        $.when(lastEdit, firstEdit, categorias).done(function (lastRes, firstRes, catRes) {
            try {
                var lastPages = lastRes[0].query.pages;
                var firstPages = firstRes[0].query.pages;
                var catPages = catRes[0].query.pages;

                var lastRev = lastPages[Object.keys(lastPages)[0]].revisions[0];
                var firstRev = firstPages[Object.keys(firstPages)[0]].revisions[0];
                var listaCategorias = catPages[Object.keys(catPages)[0]].categories || [];

                var lastDate = new Date(lastRev.timestamp);
                var firstDate = new Date(firstRev.timestamp);
                var opciones = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                var talkUrl = mw.util.getUrl('Discusión:' + pageName);

                var catHtml = listaCategorias.length
                    ? listaCategorias.map(function (c) {
                        var nombreCat = c.title.replace(/^Categoría:|^Category:/, '');
                        return '<a href="' + mw.util.getUrl(c.title) + '" class="wh-info-cat-tag">' + nombreCat + '</a>';
                    }).join('')
                    : '<span class="wh-info-cat-vacia">Sin categorías</span>';

                var html =
                    '<div id="wh-page-info">' +
                        '<div class="wh-info-fila"><span class="wh-info-icono">✍️</span><span class="wh-info-etiqueta">Creado por:</span><span class="wh-info-valor"><b>' + firstRev.user + '</b> — ' + firstDate.toLocaleDateString('es-ES', opciones) + '</span></div>' +
                        '<div class="wh-info-fila"><span class="wh-info-icono">🕓</span><span class="wh-info-etiqueta">Última edición:</span><span class="wh-info-valor"><b>' + lastRev.user + '</b> — ' + lastDate.toLocaleDateString('es-ES', opciones) + '</span></div>' +
                        '<div class="wh-info-fila wh-info-fila-cats"><span class="wh-info-icono">🏷️</span><span class="wh-info-etiqueta">Categorías:</span><span class="wh-info-cats">' + catHtml + '</span></div>' +
                        '<a href="' + talkUrl + '" class="wh-info-discusion">💬 Discusión</a>' +
                    '</div>';

                $('#firstHeading').after(html);
            } catch (e) {
                console.error('Wiki Humanos - Error en info de página:', e);
            }
        });
    }


    /* ============================================================
       2. PREVIEW AL PASAR EL MOUSE (con ocultamiento corregido)
       ============================================================ */
    function iniciarPreview() {
        if (mw.config.get('wgNamespaceNumber') !== 0) return;

        var cache = {};
        var $preview = null;
        var showTimer = null;
        var hideTimer = null;
        var currentTitle = null;

        function crearCaja() {
            $preview = $('<div id="wh-preview-box"></div>').appendTo('body');

            // Si el mouse entra a la propia cajita de preview, cancelar el ocultamiento
            $preview.on('mouseenter', function () {
                clearTimeout(hideTimer);
            });
            // Si el mouse sale de la cajita, ocultarla
            $preview.on('mouseleave', function () {
                ocultarConDelay();
            });
        }

        // Quita {{plantillas}} respetando anidamiento (ej. {{{1}}}, plantillas dentro de plantillas)
        function quitarPlantillas(texto) {
            var resultado = '';
            var profundidad = 0;
            for (var i = 0; i < texto.length; i++) {
                if (texto[i] === '{' && texto[i + 1] === '{') {
                    profundidad++;
                    i++;
                    continue;
                }
                if (texto[i] === '}' && texto[i + 1] === '}') {
                    if (profundidad > 0) profundidad--;
                    i++;
                    continue;
                }
                if (profundidad === 0) resultado += texto[i];
            }
            return resultado;
        }

        function limpiarWikitexto(wikitexto) {
            var t = wikitexto || '';
            t = t.replace(/<ref[^>]*\/>/gi, ''); // <ref .../>
            t = t.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, ''); // <ref>...</ref>
            t = t.replace(/<!--[\s\S]*?-->/g, ''); // comentarios
            t = quitarPlantillas(t); // {{plantillas}}
            t = t.replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1'); // [[Link|Texto]] -> Texto
            t = t.replace(/'''([^']+)'''/g, '$1'); // negrita
            t = t.replace(/''([^']+)''/g, '$1'); // cursiva
            t = t.replace(/<[^>]+>/g, ''); // etiquetas HTML sueltas
            t = t.replace(/^[=*#:;].*$/gm, ''); // encabezados, listas, etc.
            t = t.replace(/\n{2,}/g, '\n').trim();
            return t;
        }

        function primerasFrases(texto, cantidad) {
            var limpio = texto.replace(/\s+/g, ' ').trim();
            var frases = limpio.match(/[^.!?]+[.!?]+/g);
            if (!frases || !frases.length) return limpio.slice(0, 200);
            return frases.slice(0, cantidad).join(' ').trim();
        }

        function mostrar(titulo, x, y) {
            if (cache[titulo]) {
                renderizar(cache[titulo], x, y);
                return;
            }
            var api = new mw.Api();

            api.get({
                action: 'query', prop: 'extracts|pageimages',
                exintro: true, explaintext: true, exsentences: 3,
                piprop: 'thumbnail', pithumbsize: 300,
                titles: titulo, format: 'json'
            }).done(function (res) {
                var pages = res.query.pages;
                var pageId = Object.keys(pages)[0];
                var page = pages[pageId];
                if (pageId === '-1' || !page) return;

                var thumbnail = page.thumbnail ? page.thumbnail.source : null;

                if (page.extract && page.extract.trim().length > 0) {
                    var data = { titulo: titulo, extract: page.extract, thumbnail: thumbnail };
                    cache[titulo] = data;
                    if (currentTitle === titulo) renderizar(data, x, y);
                    return;
                }

                // --- Respaldo: leer wikitexto de la introducción y limpiarlo a mano ---
                api.get({
                    action: 'parse', page: titulo, prop: 'wikitext',
                    section: 0, format: 'json'
                }).done(function (res2) {
                    var wikitexto = (res2.parse && res2.parse.wikitext) ? res2.parse.wikitext['*'] : '';
                    var limpio = limpiarWikitexto(wikitexto);
                    var descripcion = limpio ? primerasFrases(limpio, 3) : 'Este artículo aún no tiene una introducción con texto.';

                    var data = { titulo: titulo, extract: descripcion, thumbnail: thumbnail };
                    cache[titulo] = data;
                    if (currentTitle === titulo) renderizar(data, x, y);
                }).fail(function () {
                    var data = { titulo: titulo, extract: 'Este artículo aún no tiene una introducción con texto.', thumbnail: thumbnail };
                    cache[titulo] = data;
                    if (currentTitle === titulo) renderizar(data, x, y);
                });
            });
        }

        function renderizar(data, x, y) {
            var html = '<div class="wh-preview-texto"><div class="wh-preview-titulo">' + data.titulo + '</div><div class="wh-preview-extracto">' + data.extract + '</div></div>';
            if (data.thumbnail) {
                html += '<div class="wh-preview-imagen"><img src="' + data.thumbnail + '" alt=""></div>';
            }

            var anchoBox = data.thumbnail ? 460 : 320;
            var maxX = $(window).width() - anchoBox - 20;
            var posX = Math.min(x + 15, maxX > 0 ? maxX : 10);

            $preview
                .toggleClass('wh-preview-con-imagen', !!data.thumbnail)
                .html(html)
                .css({ left: posX + 'px', top: y + 15 + 'px' })
                .addClass('wh-preview-mostrar'); // dispara la animación vía CSS
        }

        function ocultarInmediato() {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            currentTitle = null;
            if ($preview) $preview.removeClass('wh-preview-mostrar');
        }

        function ocultarConDelay() {
            clearTimeout(hideTimer);
            hideTimer = setTimeout(function () {
                currentTitle = null;
                if ($preview) $preview.removeClass('wh-preview-mostrar');
            }, 120); // pequeño margen para poder mover el mouse hacia la cajita sin que parpadee
        }

        $(function () {
            crearCaja();

            $(document).on('mouseenter', '#mw-content-text a[href*="/wiki/"]', function (e) {
                var $link = $(this);
                var href = $link.attr('href');
                if (/\/wiki\/(Categor%C3%ADa|Category|Archivo|File|Special|Especial|Plantilla|Template|Discusi%C3%B3n|Talk):/i.test(href)) return;
                if ($link.hasClass('new')) return;

                clearTimeout(hideTimer);
                var titulo = decodeURIComponent(href.split('/wiki/')[1]).replace(/_/g, ' ');
                currentTitle = titulo;

                showTimer = setTimeout(function () {
                    mostrar(titulo, e.pageX, e.pageY);
                }, 280);
            });

            $(document).on('mousemove', '#mw-content-text a[href*="/wiki/"]', function (e) {
                if ($preview && $preview.hasClass('wh-preview-mostrar')) {
                    var anchoBox = $preview.hasClass('wh-preview-con-imagen') ? 460 : 320;
                    var maxX = $(window).width() - anchoBox - 20;
                    var posX = Math.min(e.pageX + 15, maxX > 0 ? maxX : 10);
                    $preview.css({ left: posX + 'px', top: e.pageY + 15 + 'px' });
                }
            });

            $(document).on('mouseleave', '#mw-content-text a[href*="/wiki/"]', function () {
                clearTimeout(showTimer);
                ocultarConDelay();
            });
        });
    }


    /* ============================================================
       3. MÓDULO DE MENÚ EN EL RIEL LATERAL (5 botones)
       ============================================================ */
    function iniciarMenuLateral() {
        if (mw.config.get('wgAction') !== 'view') return;

        function urlArchivo(nombre) {
            return mw.util.getUrl('Special:FilePath/' + nombre);
        }

        var botones = [
            { texto: 'Administración', link: mw.util.getUrl('Wiki Humanos:Administración'), icono: '🛡️', esImagen: false },
            { texto: 'Taller de práctica', link: mw.util.getUrl('Wiki Humanos:Práctica'), icono: urlArchivo('Book.png'), esImagen: true },
            { texto: 'Páginas nuevas', link: mw.util.getUrl('Special:PáginasNuevas'), icono: urlArchivo('Check2.png'), esImagen: true },
            { texto: 'Crear página', link: mw.util.getUrl('Special:CreatePage'), icono: '➕', esImagen: false },
            { texto: 'Artículos sin categorizar', link: mw.util.getUrl('Special:PáginasSinCategorizar'), icono: '🏷️', esImagen: false }
        ];

        function construirBoton(b, index) {
            var $btn = $('<a></a>').addClass('wh-menu-btn').attr('href', b.link).css('animation-delay', (index * 0.07) + 's');
            var $icono = b.esImagen
                ? $('<img>').addClass('wh-menu-icono-img').attr('src', b.icono).attr('alt', '')
                : $('<span></span>').addClass('wh-menu-icono-emoji').text(b.icono);
            var $texto = $('<span></span>').addClass('wh-menu-texto').text(b.texto);
            return $btn.append($icono).append($texto);
        }

        function construirModulo() {
            var $modulo = $('<section id="wh-menu-modulo" class="rail-module"></section>');
            var $header = $('<div class="wh-menu-header"><span class="wh-menu-header-icono">📋</span> Menú Wiki Humanos</div>');
            var $lista = $('<div class="wh-menu-lista"></div>');
            botones.forEach(function (b, i) { $lista.append(construirBoton(b, i)); });
            return $modulo.append($header).append($lista);
        }

        // El riel de Fandom (UCP) a veces carga de forma diferida (widgets, anuncios).
        // Reintentamos varias veces hasta encontrarlo, en vez de buscar una sola vez.
        var intentos = 0;
        var maxIntentos = 20; // ~10 segundos
        var interval = setInterval(function () {
            intentos++;
            var $railUCP = $('.page__right-rail, aside.page__right-rail').first();
            var $railOasis = $('#WikiaRail').first();

            if ($railUCP.length || $railOasis.length) {
                clearInterval(interval);
                if ($('#wh-menu-modulo').length) return; // evitar duplicados
                var $modulo = construirModulo();
                if ($railUCP.length) {
                    $railUCP.prepend($modulo);
                } else {
                    $railOasis.prepend($modulo);
                }
            } else if (intentos >= maxIntentos) {
                clearInterval(interval);
                console.warn('Wiki Humanos: no se encontró el riel lateral tras varios intentos.');
            }
        }, 500);
    }


    /* ============================================================
       4. CSS (inyectado automáticamente)
       ============================================================ */
    var css = ''
        // --- Info de página ---
        + '#wh-page-info{font-size:0.88em;color:#444;margin:6px 0 16px 0;padding:12px 16px;background:#f7f7fa;border:1px solid #e4e4ec;border-radius:8px;position:relative;line-height:1.7;}'
        + '.wh-info-fila{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap;}'
        + '.wh-info-icono{width:18px;text-align:center;flex-shrink:0;}'
        + '.wh-info-etiqueta{font-weight:bold;color:#6c5ce7;flex-shrink:0;}'
        + '.wh-info-valor{color:#333;}'
        + '.wh-info-fila-cats{align-items:flex-start;margin-top:2px;}'
        + '.wh-info-cats{display:flex;flex-wrap:wrap;gap:6px;}'
        + '.wh-info-cat-tag{background:#e8e5fb;color:#5a4bd4 !important;text-decoration:none !important;font-size:0.85em;font-weight:600;padding:3px 10px;border-radius:12px;transition:background .15s ease;}'
        + '.wh-info-cat-tag:hover{background:#6c5ce7;color:#fff !important;}'
        + '.wh-info-cat-vacia{color:#999;font-style:italic;font-size:0.85em;}'
        + '.wh-info-discusion{position:absolute;top:10px;right:14px;background:#6c5ce7;color:#fff !important;text-decoration:none !important;font-weight:bold;font-size:0.85em;padding:6px 14px;border-radius:6px;transition:background .15s ease;}'
        + '.wh-info-discusion:hover{background:#5a4bd4;}'
        + '@media (max-width:600px){.wh-info-discusion{position:static;display:inline-block;margin-top:8px;}}'

        // --- Preview con animación de aparición/desaparición ---
        + '#wh-preview-box{position:absolute;z-index:9999;display:flex;align-items:stretch;background:#fff;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.22);overflow:hidden;max-width:320px;font-family:inherit;'
        +   'opacity:0;transform:translateY(-6px) scale(0.97);pointer-events:none;'
        +   'transition:opacity .18s ease, transform .18s ease;}'
        + '#wh-preview-box.wh-preview-mostrar{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}'
        + '#wh-preview-box.wh-preview-con-imagen{max-width:460px;}'
        + '.wh-preview-texto{padding:16px;flex:1;min-width:0;}'
        + '.wh-preview-titulo{font-weight:bold;font-size:1.05em;color:#202122;margin-bottom:8px;border-bottom:1px solid #eee;padding-bottom:8px;}'
        + '.wh-preview-extracto{font-size:0.88em;color:#444;line-height:1.5;}'
        + '.wh-preview-imagen{width:160px;flex-shrink:0;background:#f2f2f2;}'
        + '.wh-preview-imagen img{width:100%;height:100%;object-fit:cover;display:block;}'
        + '#wh-preview-box:not(.wh-preview-con-imagen) .wh-preview-imagen{display:none;}'

        // --- Módulo de menú lateral ---
        + '#wh-menu-modulo{background:#fff;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.15);overflow:hidden;margin-bottom:12px;animation:whMenuEntrada .4s ease-out;}'
        + '@keyframes whMenuEntrada{from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}}'
        + '.wh-menu-header{background:linear-gradient(135deg,#6c5ce7,#5a4bd4);color:#fff;font-weight:bold;font-size:0.95em;padding:12px 16px;display:flex;align-items:center;gap:8px;}'
        + '.wh-menu-lista{display:flex;flex-direction:column;padding:6px;}'
        + '.wh-menu-btn{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:4px;color:#26292d !important;text-decoration:none !important;font-size:0.9em;font-weight:500;background:transparent;opacity:0;transform:translateX(10px);animation:whMenuBotonEntrada .35s ease-out forwards;transition:background .15s ease,padding-left .15s ease;}'
        + '@keyframes whMenuBotonEntrada{to{opacity:1;transform:translateX(0);}}'
        + '.wh-menu-btn:hover{background:#f0eefd;color:#6c5ce7 !important;padding-left:14px;}'
        + '.wh-menu-icono-img{width:20px;height:20px;object-fit:contain;flex-shrink:0;}'
        + '.wh-menu-icono-emoji{font-size:1.05em;flex-shrink:0;width:20px;text-align:center;}'
        + '.wh-menu-texto{flex:1;line-height:1.3;}'
    ;

    mw.util.addCSS(css);


    /* ============================================================
       INICIO
       ============================================================ */
    $(function () {
        iniciarInfoPagina();
        iniciarPreview();
        iniciarMenuLateral();
    });

})();