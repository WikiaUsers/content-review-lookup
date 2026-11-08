/* Çizgi ve Dizi Ansiklopedisi — Common.js tam sürüm (Arama: kanal logolu adlar ve sezon içi sıra)
 * Rastgele Bölüm: kart/tablo ile aynı logo + ad ve logo + tarih satırları,
 * çoklu resim otomatik geçişi, bağlantı durumunun doğrulanması.
 * Önceki Common.js sürümünün yerini alır; ikinci kez alta EKLENMEZ.
 */

/* Çizgi ve Dizi Ansiklopedisi — Bölüm Listesi: görsel büyütme + arama + rastgele bölüm
 * Tek sürüm: eski aynı adlı bloğun yerine kullanılır.
 * Görsel büyütücü, arama ve rastgele bölüm özellikleri korunur.
 * Modül:BölümListesi değişmez. Yalnızca .dizi-liste içindeki bölümler işlenir.
 * Ek: Bölüm bağlantıları üzerinde Fandom NO IMAGE önizlemesi gizlenir.
 */
(function () {
    'use strict';
    if (window.cdbBolumListesiZoomKuruldu) return;
    window.cdbBolumListesiZoomKuruldu = true;

    var ANIMATION_MS = 240;
    var style = document.createElement('style');
    style.id = 'cdb-bolum-listesi-arama-rastgele-stil';
    style.textContent = [
        '.dizi-liste .dizi-liste-gorsel img,.dizi-liste .cdb-tablo-resim-ogesi img,',
        '.dizi-liste .dizi-liste-hakkinda-foto img{cursor:zoom-in;}',
        '.cdb-ozel-lightbox{position:fixed;inset:0;z-index:2147483600;display:flex;',
        'flex-direction:column;justify-content:center;align-items:center;box-sizing:border-box;',
        'padding:54px 16px;background:rgba(5,9,20,.94);color:#fff;',
        'opacity:0;visibility:hidden;transition:opacity .24s ease,visibility .24s ease;}',
        '.cdb-ozel-lightbox.is-open{opacity:1;visibility:visible;}',
        '.cdb-ozel-lightbox[hidden]{display:none!important;}',
        '.cdb-ozel-lightbox img{display:block;max-width:96vw;max-height:calc(100dvh - 110px);',
        'width:auto;height:auto;object-fit:contain;box-shadow:0 12px 50px rgba(0,0,0,.5);',
        'transform:scale(.985);transition:transform .24s ease;}',
        '.cdb-ozel-lightbox.is-open img{transform:scale(1);}',
        '.cdb-ozel-lightbox .cdb-zoom-kapat{position:absolute;top:10px;right:16px;',
        'border:0;background:rgba(255,255,255,.14);color:#fff;border-radius:9px;',
        'width:43px;height:43px;cursor:pointer;font-size:30px;line-height:1;}',
        '.cdb-ozel-lightbox .cdb-zoom-kapat:hover{background:rgba(255,255,255,.24);}',
        '.cdb-bolum-araclar{box-sizing:border-box;margin:14px 0 17px;padding:15px;',
        'border:1px solid var(--cdb-border,rgba(130,147,170,.26));border-radius:13px;',
        'background:#152a49;color:#edf4ff;}',
        '.cdb-bolum-araclar *{box-sizing:border-box;}',
        '.cdb-bolum-araclar-baslik{font-size:15px;font-weight:750;margin:0 0 10px;}',
        '.cdb-bolum-araclar-satir{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap;}',
        '.cdb-bolum-arama{flex:1 1 260px;min-width:0;display:block;width:100%;padding:12px 13px;',
        'font-size:14px;line-height:1.4;border-radius:9px;border:1px solid var(--cdb-border,#8a98aa);',
        'background:#10192b!important;color:#edf4ff!important;border-color:#41618d!important;box-shadow:none;}',
        '.cdb-bolum-arama:focus{outline:2px solid var(--cdb-main,var(--theme-link-color,#387dec));',
        'outline-offset:1px;}',
        '.cdb-bolum-rastgele-tus{padding:10px 17px;border:0;border-radius:9px;',
        'background:#2861df!important;color:#fff!important;opacity:1!important;',
        'font-size:14px;font-weight:700;cursor:pointer;}',
        '.cdb-bolum-rastgele-tus:hover{background:#397bfa!important;filter:none;}',
        '.cdb-bolum-rastgele-tus:focus-visible{outline:2px solid #abcfff;outline-offset:3px;}',
        '.cdb-bolum-arama-sonuc[hidden]{display:none!important;}',
        '.cdb-bolum-arama-sonuc{margin-top:12px;}',
        '.cdb-bolum-arama-durum{font-size:12px;opacity:.8;margin-bottom:9px;}',
        '.cdb-bolum-sonuclar{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}',
        '.cdb-bolum-sonuc{display:flex;align-items:center;gap:10px;padding:9px 11px;',
        'min-width:0;text-align:left;border-radius:9px;border:1px solid var(--cdb-border,rgba(130,147,170,.24));',
        'background:#101c32!important;color:#f1f5ff!important;text-decoration:none!important;}',
        'a.cdb-bolum-sonuc:hover{background:#1a3153!important;border-color:#4285ff!important;}',
        '.cdb-bolum-sonuc-no{display:inline-flex;align-items:center;justify-content:center;',
        'flex:0 0 auto;min-width:31px;padding:5px;border-radius:7px;color:#fff;',
        'background:#2864e8!important;font-size:12px;font-weight:700;}',
        '.cdb-bolum-sonuc-metin{display:block;min-width:0;overflow-wrap:anywhere;}',
        '.cdb-bolum-sonuc-ad{display:block;font-size:13px;font-weight:700;}',
        '.cdb-bolum-sonuc-alt{display:block;font-size:11px;color:#b5c7df;margin-top:4px;line-height:1.5;}',
        '.cdb-bolum-sonuc-yayinlar{display:flex;flex-direction:column;gap:5px;margin-top:7px;}',
        '.cdb-bolum-sonuc-yayin{display:flex;align-items:center;gap:5px 7px;flex-wrap:wrap;',
        'font-size:11px;color:#d9e7fd;line-height:1.35;}',
        '.cdb-bolum-sonuc-yayin img{display:block;max-width:48px;max-height:19px;',
        'width:auto;height:auto;object-fit:contain;flex-shrink:0;}',
        '.cdb-bolum-sonuc-kanal{font-weight:700;color:#f1f6ff;}',
        '.cdb-bolum-sonuc-tarih{color:#c1d5f4;}',
        '.cdb-rastgele-yayinlar{display:flex;flex-direction:column;gap:5px;margin-top:12px;}',
        '.cdb-bolum-arama-durum{color:#b9cce5;}',
        '.cdb-bolum-sonuc-ad{color:#f5f8ff;line-height:1.45;}',
        // Arama kartlarinda farklı kanal adlari AYRI satirlarda, logo yaninda durur.
        '.cdb-bolum-sonuc-adlar{display:flex!important;flex-direction:column!important;',
        'gap:5px!important;width:100%!important;min-width:0!important;}',
        '.cdb-bolum-sonuc-ad-satiri{display:flex!important;align-items:center!important;',
        'justify-content:flex-start!important;gap:7px!important;min-width:0!important;',
        'line-height:1.4!important;}',
        '.cdb-bolum-sonuc-ad-logolar{display:inline-flex!important;align-items:center!important;',
        'gap:3px!important;flex:0 1 auto!important;flex-wrap:nowrap!important;',
        'max-width:50%!important;min-width:0!important;}',
        '.cdb-bolum-sonuc-ad-logo{display:inline-flex!important;align-items:center!important;',
        'flex:0 0 auto!important;min-width:0!important;}',
        '.cdb-bolum-sonuc-ad-logo img{display:block!important;width:auto!important;',
        'height:auto!important;max-width:49px!important;max-height:20px!important;',
        'object-fit:contain!important;}',
        '.cdb-bolum-sonuc-ad-yazi{display:block!important;min-width:0!important;',
        'flex:1 1 auto!important;color:#f5f8ff!important;font-weight:750!important;',
        'font-size:13px!important;line-height:1.4!important;overflow-wrap:break-word!important;}',
        '.cdb-bolum-sonuc-ad-kanal-yazi{font-size:10px!important;white-space:nowrap!important;',
        'color:#bed4f4!important;font-weight:700!important;}',
        '.cdb-bolum-sonuc-yayin{flex-wrap:nowrap!important;min-width:0!important;}',
        '.cdb-bolum-sonuc-yayin img{max-width:58px!important;max-height:22px!important;}',
        '.cdb-bolum-sonuc-tarih{min-width:0!important;overflow-wrap:break-word!important;}',
        '.cdb-bolum-sonuc:focus-visible{outline:2px solid #6eabff;outline-offset:2px;}',
        // KISA ARAMA SONUCLARI: mini bolum listesi degil, tek kompakt sonuc.
        '.cdb-bolum-sonuc.cdb-sonuc-kisa{padding:9px 12px!important;gap:10px!important;',
        'min-height:55px!important;align-items:center!important;}',
        '.cdb-sonuc-kisa .cdb-bolum-sonuc-metin{display:flex!important;flex-direction:column!important;',
        'gap:4px!important;min-width:0!important;}',
        '.cdb-kisa-basliklar{display:flex!important;align-items:center!important;flex-wrap:wrap!important;',
        'gap:2px 12px!important;min-width:0!important;}',
        '.cdb-kisa-baslik{display:inline-flex!important;align-items:center!important;gap:5px!important;',
        'max-width:100%!important;min-width:0!important;line-height:1.3!important;}',
        '.cdb-kisa-baslik-logolar{display:inline-flex!important;align-items:center!important;gap:2px!important;',
        'flex:0 0 auto!important;}',
        '.cdb-kisa-baslik-logolar img{display:block!important;max-width:34px!important;',
        'max-height:15px!important;width:auto!important;height:auto!important;object-fit:contain!important;}',
        '.cdb-kisa-baslik-yazi{font-size:13px!important;font-weight:750!important;color:#f5f8ff!important;',
        'line-height:1.3!important;overflow-wrap:break-word!important;min-width:0!important;}',
        '.cdb-kisa-meta{display:flex!important;flex-wrap:wrap!important;align-items:center!important;',
        'column-gap:6px!important;row-gap:2px!important;font-size:11px!important;',
        'color:#b5c7df!important;line-height:1.4!important;}',
        '.cdb-kisa-tarih{display:inline-flex!important;align-items:center!important;gap:4px!important;',
        'color:#bed1eb!important;white-space:nowrap!important;}',
        '.cdb-kisa-tarih img{display:block!important;max-width:35px!important;max-height:15px!important;',
        'height:auto!important;width:auto!important;object-fit:contain!important;}',
        '.cdb-bolum-sonuc-yok{font-size:12px;opacity:.65;}',
        '.cdb-rastgele-arkaplan{position:fixed!important;inset:0!important;',
        'width:100%!important;height:100dvh!important;padding:16px!important;',
        'box-sizing:border-box!important;z-index:2147483599!important;display:flex!important;',
        'align-items:center!important;justify-content:center!important;overflow:hidden!important;',
        'background:rgba(5,9,20,.89)!important;opacity:0;visibility:hidden;',
        'transition:opacity .24s ease,visibility .24s ease;}',
        '.cdb-rastgele-arkaplan[hidden]{display:none!important;}',
        '.cdb-rastgele-arkaplan.is-open{opacity:1;visibility:visible;}',
        '.cdb-rastgele-arkaplan *{box-sizing:border-box!important;}',
        '.cdb-rastgele-kart{position:relative!important;display:block!important;',
        'width:650px!important;max-width:100%!important;min-width:0!important;',
        'max-height:calc(100dvh - 32px)!important;overflow-x:hidden!important;',
        'overflow-y:auto!important;overscroll-behavior:contain!important;',
        'padding:18px!important;border-radius:17px!important;',
        'background:#152a49!important;color:#f3f7ff!important;',
        'box-shadow:0 18px 70px rgba(0,0,0,.55)!important;',
        'transform:translateY(8px) scale(.985);transition:transform .24s ease;}',
        '.cdb-rastgele-arkaplan.is-open .cdb-rastgele-kart{transform:translateY(0) scale(1);}',
        '.cdb-rastgele-kapat{position:absolute!important;top:12px!important;',
        'right:12px!important;width:39px!important;height:39px!important;',
        'border:0!important;border-radius:10px!important;cursor:pointer!important;',
        'background:#334968!important;color:#fff!important;',
        'font-size:25px!important;line-height:1!important;z-index:2!important;}',
        '.cdb-rastgele-baslik{font-size:17px!important;font-weight:750!important;',
        'line-height:1.35!important;margin:3px 46px 15px 0!important;color:#f4f8ff!important;}',
        /* Fotograf orijinal boyutta gosterilir; minik kart resmi buyutulmez. */
        '.cdb-rastgele-arkaplan .cdb-rastgele-gorsel{width:100%!important;',
        'max-width:620px!important;height:auto!important;aspect-ratio:16/9!important;',
        'display:flex!important;justify-content:center!important;align-items:center!important;',
        'border-radius:12px!important;overflow:hidden!important;min-width:0!important;',
        'background:#101b30!important;margin:0 auto 13px!important;}',
        '.cdb-rastgele-arkaplan .cdb-rastgele-gorsel img{display:block!important;',
        'max-width:100%!important;max-height:100%!important;',
        'width:auto!important;height:auto!important;object-fit:contain!important;}',
        '.cdb-rastgele-gorsel-yok{font-size:13px!important;color:#c9d5e9!important;}',
        '.cdb-rastgele-gorsel.cdb-rastgele-gorsel-bos{height:auto!important;',
        'min-height:0!important;background:transparent!important;',
        'margin:0 0 9px!important;justify-content:flex-start!important;}',
        '.cdb-rastgele-meta{color:#a9c9f5!important;font-size:12px!important;',
        'font-weight:650!important;margin:0 0 8px!important;}',
        /* Kartın içindeki ad ve yayın tarihi görünümünü değiştirmeden taşır. */
        /* Solda ad+logo, sagda kanal+tarih; ayirici cizgisiz. */
        '.cdb-rastgele-arkaplan .cdb-rastgele-bilgi-grid{display:grid!important;',
        'grid-template-columns:minmax(0,1.25fr) minmax(0,.9fr)!important;',
        'column-gap:18px!important;row-gap:10px!important;align-items:start!important;',
        'min-width:0!important;width:100%!important;margin-top:10px!important;}',
        '.cdb-rastgele-bilgi-sol,.cdb-rastgele-bilgi-sag{min-width:0!important;}',
        '.cdb-rastgele-arkaplan .cdb-rastgele-bilgi-sag{border:0!important;',
        'padding:0!important;}',
        '.cdb-rastgele-adlar{display:flex!important;flex-direction:column!important;',
        'gap:6px!important;margin:0!important;min-width:0!important;}',
        /* Sabit logo sutunu yok: ad, logonun hemen yanindan baslar. */
        '.cdb-rastgele-arkaplan .cdb-rastgele-ad-satiri{display:flex!important;',
        'flex-direction:row!important;align-items:center!important;',
        'justify-content:flex-start!important;gap:7px!important;',
        'min-width:0!important;width:100%!important;padding:0!important;',
        'grid-template-columns:none!important;}',
        '.cdb-rastgele-arkaplan .cdb-rastgele-kanal-grubu{display:inline-flex!important;',
        'flex:0 1 auto!important;flex-wrap:nowrap!important;gap:3px!important;',
        'align-items:center!important;justify-content:flex-start!important;',
        'min-width:0!important;max-width:53%!important;}',
        '.cdb-rastgele-logo-kutu{display:inline-flex!important;flex:0 0 auto!important;',
        'align-items:center!important;justify-content:center!important;',
        'width:auto!important;height:auto!important;min-width:0!important;',
        'margin:0!important;padding:0!important;}',
        '.cdb-rastgele-logo-kutu img{display:block!important;',
        'width:auto!important;height:auto!important;max-width:58px!important;',
        'max-height:22px!important;object-fit:contain!important;}',
        '.cdb-rastgele-logo-metin{font-size:11px!important;font-weight:700!important;',
        'color:#e3edff!important;line-height:1.2!important;}',
        '.cdb-rastgele-ad-metin{display:block!important;flex:1 1 auto!important;',
        'min-width:0!important;font-size:16px!important;font-weight:760!important;',
        'color:#fff!important;line-height:1.35!important;',
        'overflow-wrap:break-word!important;word-break:normal!important;}',
        '.cdb-rastgele-orijinal{font-size:13px!important;line-height:1.4!important;',
        'color:#b9cbe6!important;margin:7px 0 0!important;',
        'overflow-wrap:break-word!important;}',
        '.cdb-rastgele-yayinlar{display:flex!important;flex-direction:column!important;',
        'gap:8px!important;margin:0!important;min-width:0!important;}',
        '.cdb-rastgele-yayin-baslik{display:none!important;}',
        /* Tarih sabit bir sutuna oturmaz, logonun hemen yanina gelir. */
        '.cdb-rastgele-arkaplan .cdb-rastgele-yayin-kaydi{display:flex!important;',
        'flex-direction:row!important;align-items:center!important;',
        'justify-content:flex-start!important;flex-wrap:nowrap!important;',
        'gap:7px!important;padding:0!important;min-width:0!important;',
        'border:0!important;grid-template-columns:none!important;}',
        '.cdb-rastgele-yayin-kanal{display:inline-flex!important;align-items:center!important;',
        'flex:0 0 auto!important;gap:0!important;min-width:0!important;}',
        '.cdb-rastgele-yayin-kanal img{display:block!important;flex-shrink:0!important;',
        'width:auto!important;height:auto!important;max-width:65px!important;',
        'max-height:23px!important;object-fit:contain!important;}',
        '.cdb-rastgele-yayin-kanal-adi{color:#dce9ff!important;font-size:12px!important;',
        'font-weight:650!important;line-height:1.25!important;}',
        '.cdb-rastgele-yayin-tarih{color:#d4e2f8!important;',
        'white-space:normal!important;font-size:12px!important;',
        'line-height:1.4!important;text-align:left!important;min-width:0!important;}',
        '.cdb-rastgele-actions{display:flex!important;gap:9px!important;',
        'margin:15px 0 0!important;flex-wrap:wrap!important;}',
        '.cdb-rastgele-actions a,.cdb-rastgele-actions button{display:flex!important;',
        'align-items:center!important;justify-content:center!important;',
        'flex:1 1 155px!important;min-height:44px!important;min-width:0!important;',
        'padding:10px 12px!important;border-radius:9px!important;',
        'text-decoration:none!important;text-align:center!important;',
        'font-size:13px!important;font-weight:750!important;cursor:pointer!important;',
        'border:1px solid #5d80b0!important;color:#fff!important;',
        'background:#284773!important;white-space:normal!important;}',
        '.cdb-rastgele-actions .cdb-rastgele-yeni{background:#397dea!important;',
        'border-color:#397dea!important;}',
        '.cdb-rastgele-actions a[hidden]{display:none!important;}',
        '.cdb-rastgele-uyari{margin:9px 0 0!important;',
        'color:#b0c2dd!important;font-size:11px!important;line-height:1.4!important;}',
        '.cdb-rastgele-uyari[hidden]{display:none!important;}',
        '@media(max-width:520px){.cdb-rastgele-arkaplan{padding:9px!important;}',
        '.cdb-rastgele-kart{padding:14px!important;',
        'max-height:calc(100dvh - 18px)!important;}',
        '.cdb-rastgele-arkaplan .cdb-rastgele-bilgi-grid{grid-template-columns:1fr!important;',
        'gap:11px!important;}',
        '.cdb-rastgele-arkaplan .cdb-rastgele-bilgi-sag{border:0!important;',
        'padding:0!important;}',
        '.cdb-rastgele-arkaplan .cdb-rastgele-ad-satiri{display:flex!important;',
        'grid-template-columns:none!important;}',
        '.cdb-rastgele-ad-metin{font-size:15px!important;}',
        '.cdb-rastgele-logo-kutu img{max-width:53px!important;}',
        '.cdb-rastgele-yayin-kanal img{max-width:58px!important;}',
        '.cdb-rastgele-yayin-tarih{font-size:12px!important;}}',
        'body.cdb-bolum-uzerinde .npage-preview,body.cdb-bolum-uzerinde .mwe-popups{display:none!important;}',
        '@media(min-width:1320px){.cdb-bolum-sonuclar{grid-template-columns:repeat(3,minmax(0,1fr));}}',
        '@media(max-width:600px){.cdb-ozel-lightbox{padding:48px 8px;}',
        '.cdb-ozel-lightbox img{max-width:100%;max-height:calc(100dvh - 96px);}',
        '.cdb-bolum-sonuclar{grid-template-columns:1fr;}',
        '.cdb-bolum-rastgele-tus{flex:1 1 100%;}}',
        '@media(prefers-reduced-motion:reduce){',
        '.cdb-ozel-lightbox,.cdb-ozel-lightbox img,.cdb-rastgele-arkaplan,',
        '.cdb-rastgele-kart{transition:none!important;}}'
    ].join('');
    (document.head || document.documentElement).appendChild(style);

    function setFocusableFocus(element) {
        if (!element || !element.focus) return;
        try { element.focus({preventScroll: true}); } catch (e) { element.focus(); }
    }
    function reduceMotion() {
        return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
    function animateOpen(element) {
        element.hidden = false;
        // Stilleri hesaplatıp ardından aç; böylece geçiş gerçekten tetiklenir.
        void element.offsetWidth;
        element.classList.add('is-open');
    }
    function animateClose(element, after) {
        element.classList.remove('is-open');
        if (reduceMotion()) { element.hidden = true; if (after) after(); return; }
        window.setTimeout(function () {
            if (!element.classList.contains('is-open')) {
                element.hidden = true;
                if (after) after();
            }
        }, ANIMATION_MS + 20);
    }

    var viewer = null, photo = null;
    var oldOverflow = '', previousFocus = null, requestId = 0;
    var imageCache = Object.create(null);
    function setupViewer() {
        if (viewer) return;
        viewer = document.createElement('div');
        viewer.className = 'cdb-ozel-lightbox';
        viewer.hidden = true;
        viewer.setAttribute('role', 'dialog');
        viewer.setAttribute('aria-modal', 'true');
        viewer.setAttribute('aria-label', 'Büyütülmüş görsel');
        viewer.innerHTML = '<button type="button" class="cdb-zoom-kapat" aria-label="Görseli kapat">×</button>' +
            '<img alt="Büyütülmüş bölüm görseli">';
        document.body.appendChild(viewer);
        photo = viewer.querySelector('img');
        viewer.querySelector('.cdb-zoom-kapat').addEventListener('click', closeViewer);
        viewer.addEventListener('click', function (e) { if (e.target === viewer) closeViewer(); });
    }
    function closeViewer() {
        if (!viewer || viewer.hidden || !viewer.classList.contains('is-open')) return;
        requestId++;
        animateClose(viewer, function () { photo.removeAttribute('src'); });
        document.body.style.overflow = oldOverflow;
        if (previousFocus && previousFocus.isConnected) setFocusableFocus(previousFocus);
    }
    function fullImageUrl(filename) {
        if (imageCache[filename]) return imageCache[filename];
        var scriptPath = (window.mw && mw.config && mw.config.get('wgScriptPath')) || '/tr';
        var api = scriptPath.replace(/\/$/, '') + '/api.php';
        imageCache[filename] = fetch(api + '?action=query&format=json&prop=imageinfo&iiprop=url&titles=' +
            encodeURIComponent('File:' + filename), {credentials: 'same-origin'})
            .then(function (res) { if (!res.ok) throw new Error('API'); return res.json(); })
            .then(function (data) {
                var pages = data && data.query && data.query.pages;
                if (!pages) return null;
                var item = pages[Object.keys(pages)[0]];
                return item && item.imageinfo && item.imageinfo[0] && item.imageinfo[0].url || null;
            }).catch(function () { return null; });
        return imageCache[filename];
    }
    function getFileName(link) {
        try {
            var url = new URL(link.href, location.href);
            var title = url.searchParams.get('title');
            if (!title) {
                var marker = '/wiki/';
                var index = url.pathname.indexOf(marker);
                if (index < 0) return null;
                title = decodeURIComponent(url.pathname.slice(index + marker.length));
            }
            var match = title.match(/^(?:File|Dosya):(.+)$/i);
            return match ? match[1].replace(/_/g, ' ') : null;
        } catch (e) { return null; }
    }
    function openViewer(link, thumb, name) {
        setupViewer();
        previousFocus = document.activeElement;
        oldOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        photo.src = thumb.currentSrc || thumb.src;
        animateOpen(viewer);
        setFocusableFocus(viewer.querySelector('.cdb-zoom-kapat'));
        var localRequest = ++requestId;
        fullImageUrl(name).then(function (url) {
            if (url && localRequest === requestId && !viewer.hidden && viewer.classList.contains('is-open')) {
                photo.src = url;
            }
        });
    }
    // Fotoğrafların özgün büyütücüsü: yalnızca işaretli bölüm listesi görselleri.
    document.addEventListener('click', function (e) {
        if (!e.target || !e.target.closest) return;
        var link = e.target.closest('a[href]');
        if (!link) return;
        var scope = link.closest('.dizi-liste .dizi-liste-gorsel,' +
            '.dizi-liste .cdb-tablo-resim-ogesi,' +
            '.dizi-liste .dizi-liste-hakkinda-foto');
        if (!scope) return;
        var thumb = link.querySelector('img');
        if (!thumb) return;
        var marked = link.classList.contains('cdb-zoom-resim') ||
            thumb.classList.contains('cdb-zoom-resim') ||
            !!link.closest('.cdb-zoom-resim') || !!link.querySelector('.cdb-zoom-resim');
        if (!marked) return;
        var filename = getFileName(link);
        if (!filename) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        openViewer(link, thumb, filename);
    }, true);

    // Fandom'un NO IMAGE onizlemesini yalnizca bolum baglantilarinda gizle.
    // Dosyanin varligini degistirmez; site genelindeki onizlemeler korunur.
    function bolumBaglantisi(node) {
        return !!(node && node.closest && node.closest(
            '.dizi-liste .dizi-liste-ad a,' +
            '.dizi-liste .dizi-liste-veri-tablosu a,' +
            '.dizi-liste .cdb-bolum-sonuc a'
        ));
    }
    document.addEventListener('mouseover', function (event) {
        if (bolumBaglantisi(event.target)) {
            document.body.classList.add('cdb-bolum-uzerinde');
        }
    }, true);
    document.addEventListener('mouseout', function (event) {
        if (bolumBaglantisi(event.target) && !bolumBaglantisi(event.relatedTarget)) {
            document.body.classList.remove('cdb-bolum-uzerinde');
        }
    }, true);
    window.addEventListener('blur', function () {
        document.body.classList.remove('cdb-bolum-uzerinde');
    });

    // --- Bölüm arama ve sürpriz kartı: Es şablonunu değil mevcut kartların DOM'unu okur. ---
    function normal(metin) {
        return String(metin || '').toLocaleLowerCase('tr-TR')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/ı/g, 'i').replace(/\s+/g, ' ').trim();
    }
    function isExistingEpisodeLink(link) {
        if (!link || link.classList.contains('new')) return false;
        try {
            var u = new URL(link.href, location.href);
            return !u.searchParams.has('redlink') && u.searchParams.get('action') !== 'edit';
        } catch (e) { return false; }
    }
    // Fandom erteleme (lazy loading) nedeniyle gorselin src'si bos/yer tutucu olabilir.
    function gercekGorselAdresi(deger) {
        var kaynak = String(deger || '').trim();
        if (!kaynak || /^(?:data:|blob:|about:)/i.test(kaynak) ||
            /(?:placeholder|transparent|spacer|spinner|blank\.gif)/i.test(kaynak)) return '';
        try { return new URL(kaynak, location.href).href; }
        catch (e) { return ''; }
    }
    function gorselAdaylari(img) {
        if (!img) return [];
        var adaylar = [], gorulen = Object.create(null);
        function ekle(kaynak) {
            var adres = gercekGorselAdresi(kaynak);
            if (adres && !gorulen[adres]) { gorulen[adres] = true; adaylar.push(adres); }
        }
        ['data-src', 'data-original', 'data-image-src', 'data-lazy-src',
         'data-original-src', 'data-url'].forEach(function (alan) { ekle(img.getAttribute(alan)); });
        var set = img.getAttribute('data-srcset');
        if (set) ekle(set.split(',')[0].trim().split(/\s+/)[0]);
        ekle(img.currentSrc);
        ekle(img.getAttribute('src'));
        return adaylar;
    }
    // MediaWiki sayfa bağlantısının gerçek başlığını yakala (redlink?title=... dahil).
    function bolumSayfaBasligi(href) {
        if (!href) return '';
        try {
            var url = new URL(href, location.href);
            var baslik = url.searchParams.get('title');
            if (!baslik) {
                var esik = url.pathname.indexOf('/wiki/');
                if (esik < 0) return '';
                baslik = decodeURIComponent(url.pathname.slice(esik + 6));
            }
            return (baslik || '').replace(/_/g, ' ').trim();
        } catch (e) { return ''; }
    }
    // Kırmızı oluşturma bağlantısı yerine normal okuma adresine yönlendir.
    function bolumSayfaAdresi(ep) {
        if (!ep || !ep.linkTitle) return ep && ep.exists ? ep.link : '';
        try {
            var yazi = encodeURIComponent(ep.linkTitle.replace(/ /g, '_'));
            var sablon = (window.mw && mw.config && mw.config.get('wgArticlePath')) || '';
            if (sablon && sablon.indexOf('$1') !== -1) {
                var kaynakAdres = new URL(ep.link || location.href, location.href);
                return new URL(sablon.replace('$1', yazi), kaynakAdres.origin).href;
            }
            var kaynak = new URL(ep.link || location.href, location.href);
            var dizin = kaynak.pathname.indexOf('/wiki/');
            if (dizin >= 0) return kaynak.origin + kaynak.pathname.slice(0, dizin + 6) + yazi;
            var alt = (window.mw && mw.config && mw.config.get('wgScriptPath')) || '/tr';
            return new URL(alt.replace(/\/$/, '') + '/wiki/' + yazi, kaynak.origin).href;
        } catch (e) { return ep.link || ''; }
    }
    var rastgeleSayfaDurumuOnbellek = Object.create(null);
    // Gerçekten sayfa yok mu? Yalnızca SEÇİLEN bölüm için sunucudan kontrol et.
    function rastgeleSayfayiDogrula(ep) {
        if (!ep || !ep.linkTitle) return Promise.resolve(null);
        if (ep.exists) return Promise.resolve(true);
        if (rastgeleSayfaDurumuOnbellek[ep.linkTitle]) {
            return rastgeleSayfaDurumuOnbellek[ep.linkTitle];
        }
        var yol = (window.mw && mw.config && mw.config.get('wgScriptPath')) || '/tr';
        var api = yol.replace(/\/$/, '') + '/api.php';
        rastgeleSayfaDurumuOnbellek[ep.linkTitle] = fetch(
            api + '?action=query&format=json&formatversion=2&redirects=1&titles=' +
            encodeURIComponent(ep.linkTitle), {credentials:'same-origin'}
        ).then(function (response) {
            if (!response.ok) throw new Error('API yanıt vermedi');
            return response.json();
        }).then(function (data) {
            var sayfalar = data && data.query && data.query.pages;
            if (!sayfalar) return null;
            var sayfa = Array.isArray(sayfalar) ? sayfalar[0] :
                sayfalar[Object.keys(sayfalar)[0]];
            if (!sayfa) return null;
            return !Object.prototype.hasOwnProperty.call(sayfa, 'missing') &&
                !Object.prototype.hasOwnProperty.call(sayfa, 'invalid');
        }).catch(function () { return null; });
        return rastgeleSayfaDurumuOnbellek[ep.linkTitle];
    }
    function readEpisodes(root) {
        var cards = root.querySelectorAll('.dizi-liste-kart');
        var episodes = [];
        // Sezon içindeki kart sırası, genel bölüm numarasından ayrıdır.
        var sezonKartSirasi = Object.create(null);
        Array.prototype.forEach.call(cards, function (card) {
            var id = (card.id || '').match(/^cdb-card-(\d+)-(.+)$/);
            if (!id) return;
            var buSezondakiSira = (sezonKartSirasi[id[1]] || 0) + 1;
            sezonKartSirasi[id[1]] = buSezondakiSira;
            var titleLink = card.querySelector('.dizi-liste-ad a[href]');
            var titleEl = card.querySelector('.dizi-liste-ad');
            // Farklı kanal adları ayrı satırlarda: textContent bunları bitiştiriyordu.
            var baslikSatirlari = titleEl ? Array.prototype.slice.call(
                titleEl.querySelectorAll('.cdb-kanalli-turkce-ad')) : [];
            var baslikAdlari = baslikSatirlari.map(function (satir) {
                var ad = satir.querySelector('.cdb-kanal-ad-metin') || satir;
                return (ad.textContent || '').replace(/\s+/g, ' ').trim();
            }).filter(Boolean);
            var title = baslikAdlari.length ? baslikAdlari.join(' / ') :
                (titleEl ? (titleEl.textContent || '').replace(/\s+/g, ' ').trim() : '');
            if (!title) return;
            var originalEl = card.querySelector('.dizi-liste-engad');
            var badge = card.querySelector('.dizi-liste-no');
            var sezonIciNo = badge ? badge.textContent.trim() : '';
            // Bazı Es kayıtlarında rozet numarası genel numaraya düşer.
            // 3. sezondaki 21. genel bölüm, 3. sezonun 21. bölümü değildir.
            // Sezon içi sıra verisi yoksa kartın o sezondaki sırasını kullan.
            if (!sezonIciNo || (Number(id[1]) > 1 && sezonIciNo === id[2])) {
                sezonIciNo = String(buSezondakiSira);
            }
            // Tek img yerine bu karta kayıtlı BÜTÜN galeriyi oku.
            var goruntuKayitlari = [], resimGorulen = Object.create(null);
            Array.prototype.forEach.call(card.querySelectorAll('.dizi-liste-gorsel img'), function (img) {
                var bag = img.closest('a[href]');
                var dosya = bag ? getFileName(bag) : '';
                var adaylar = gorselAdaylari(img);
                var anahtar = dosya ? 'dosya:' + dosya : (adaylar[0] || '');
                if (!anahtar || resimGorulen[anahtar]) return;
                resimGorulen[anahtar] = true;
                goruntuKayitlari.push({element: img, fileName: dosya, candidates: adaylar});
            });
            var imageEl = goruntuKayitlari.length ? goruntuKayitlari[0].element : null;
            var imageFileName = goruntuKayitlari.length ? goruntuKayitlari[0].fileName : '';
            // Kanal ve tarih HER yayin kaydindan birlikte okunur.
            // Boylece HBO Max 2025, Cartoon Network 2008 ile karismaz.
            var broadcastNodes = card.querySelectorAll('.dizi-liste-tarih .dizi-tarih-kaydi');
            var broadcasts = Array.prototype.map.call(broadcastNodes, function (node) {
                var day = node.querySelector('.dizi-tarih-gun');
                var channelNode = node.querySelector('.dizi-tarih-kanal');
                var logoNode = channelNode && channelNode.querySelector('img');
                var channel = channelNode ?
                    (channelNode.getAttribute('title') || channelNode.textContent || '').trim() : '';
                if (!channel && logoNode) channel = (logoNode.getAttribute('alt') || '').trim();
                // [HBO] Max gibi kanallari ekranda ve aramada HBO Max olarak goster.
                channel = channel.replace(/[\[\]]/g, '');
                return {
                    channel: channel,
                    date: day ? day.textContent.trim() : (node.textContent || '').trim(),
                    logo: logoNode ? (logoNode.currentSrc || logoNode.src || '') : '',
                    logoElement: logoNode
                };
            }).filter(function (record) { return record.channel || record.date; });
            if (!broadcasts.length) {
                var dateElement = card.querySelector('.dizi-liste-tarih');
                if (dateElement && dateElement.textContent.trim()) {
                    broadcasts = [{channel: '', date: dateElement.textContent.trim(), logo: ''}];
                }
            }
            episodes.push({
                season: id[1], no: id[2], seasonNumber: sezonIciNo,
                title: title, original: originalEl ? originalEl.textContent.trim() : '',
                titleRows: baslikSatirlari, broadcasts: broadcasts,
                broadcastRows: Array.prototype.slice.call(broadcastNodes),
                images: goruntuKayitlari,
                image: gorselAdaylari(imageEl)[0] || '',
                imageElement: imageEl, imageFileName: imageFileName || '',
                link: titleLink ? titleLink.href : '',
                linkTitle: titleLink ? bolumSayfaBasligi(titleLink.href) : '',
                exists: isExistingEpisodeLink(titleLink)
            });
        });
        return episodes;
    }
    function element(tag, cls, txt) {
        var el = document.createElement(tag);
        if (cls) el.className = cls;
        if (txt !== undefined && txt !== null) el.textContent = txt;
        return el;
    }
    function episodeDescription(ep) {
        return ep.season + '. Sezon · ' + ep.seasonNumber + '. Bölüm';
    }
    function matchingBroadcasts(ep, search) {
        return (ep.broadcasts || []).filter(function (rec) {
            var channel = normal(rec.channel), date = normal(rec.date);
            // Ayni kayittaki kanal+tarih sorgulanir, farkli yayimlar karistirilmaz.
            var together = (channel + ' ' + date).trim();
            var words = search.split(/\s+/).filter(Boolean);
            return channel.indexOf(search) !== -1 || date.indexOf(search) !== -1 ||
                together.indexOf(search) !== -1 ||
                (date + ' ' + channel).trim().indexOf(search) !== -1 ||
                (words.length > 1 && words.every(function (word) {
                    return together.indexOf(word) !== -1;
                }));
        });
    }
    // Arama sonucu, ayni bolum kartindaki kanal-logolu Turkce isimleri korur.
    // Kaynak basliktaki <a> etiketini KOPYALAMA: sonucun kendisi baglanti olabilir.
    function aramaBasliklariniYaz(parent, ep) {
        var kapsayici = element('span', 'cdb-bolum-sonuc-adlar');
        var satirlar = ep.titleRows || [];
        if (!satirlar.length) {
            kapsayici.appendChild(element('span', 'cdb-bolum-sonuc-ad-yazi', ep.title));
        } else {
            satirlar.forEach(function (kayit) {
                var satir = element('span', 'cdb-bolum-sonuc-ad-satiri');
                var logolar = element('span', 'cdb-bolum-sonuc-ad-logolar');
                Array.prototype.forEach.call(kayit.querySelectorAll('.cdb-kanal-ad-logo img'), function (kaynak) {
                    var adres = gorselAdaylari(kaynak)[0];
                    if (!adres) return;
                    var logoKutusu = element('span', 'cdb-bolum-sonuc-ad-logo');
                    var logo = document.createElement('img');
                    logo.src = adres;
                    logo.alt = (kaynak.getAttribute('alt') || '').trim();
                    logo.loading = 'lazy';
                    logoKutusu.appendChild(logo);
                    logolar.appendChild(logoKutusu);
                });
                Array.prototype.forEach.call(kayit.querySelectorAll('.cdb-kanal-ad-yazi'), function (kaynak) {
                    var yazi = (kaynak.textContent || '').trim();
                    if (yazi) logolar.appendChild(element('span', 'cdb-bolum-sonuc-ad-kanal-yazi', yazi));
                });
                if (logolar.childNodes.length) satir.appendChild(logolar);
                var adKaynak = kayit.querySelector('.cdb-kanal-ad-metin') || kayit;
                var ad = (adKaynak.textContent || '').replace(/\s+/g, ' ').trim();
                if (ad) satir.appendChild(element('span', 'cdb-bolum-sonuc-ad-yazi', ad));
                if (satir.childNodes.length) kapsayici.appendChild(satir);
            });
        }
        parent.appendChild(kapsayici);
    }
    // Her yayin tarihini kendi kanal logosu ile gostermek icin kayit eslesmesini koru.
    // Logosu olan kanalin adini ayni satirda bir daha yazma.
    function appendBroadcasts(parent, broadcasts) {
        if (!broadcasts || !broadcasts.length) return;
        var wrap = element('div', 'cdb-bolum-sonuc-yayinlar');
        broadcasts.forEach(function (rec) {
            var record = element('span', 'cdb-bolum-sonuc-yayin');
            var adres = rec.logoElement ? gorselAdaylari(rec.logoElement)[0] : '';
            if (!adres) adres = gercekGorselAdresi(rec.logo);
            if (adres) {
                var logo = element('img');
                logo.src = adres;
                logo.alt = rec.channel || '';
                logo.title = rec.channel || '';
                logo.loading = 'lazy';
                record.appendChild(logo);
            } else if (rec.channel) {
                record.appendChild(element('span', 'cdb-bolum-sonuc-kanal', rec.channel));
            }
            if (rec.date) record.appendChild(element('span', 'cdb-bolum-sonuc-tarih', rec.date));
            wrap.appendChild(record);
        });
        parent.appendChild(wrap);
    }
    // Arama sonucu sade tutulur: numara, logolu ad(lar), kisa kimlik.
    // Tarih/kanal sorgusunda yalnizca ESLESEN yayin tarihi gosterilir.
    // Tum yayin tarihlerinin listelenmesi arama sonucunu mini bolum listesine ceviriyordu.
    function resultRow(ep, search) {
        var row = element(ep.exists ? 'a' : 'div', 'cdb-bolum-sonuc cdb-sonuc-kisa');
        if (ep.exists) row.href = ep.link;
        row.appendChild(element('span', 'cdb-bolum-sonuc-no', ep.no));
        var middle = element('span', 'cdb-bolum-sonuc-metin');
        var titles = element('span', 'cdb-kisa-basliklar');
        var titleRows = ep.titleRows || [];
        if (!titleRows.length) {
            titles.appendChild(element('span', 'cdb-kisa-baslik-yazi', ep.title));
        } else {
            titleRows.forEach(function (kayit) {
                var pair = element('span', 'cdb-kisa-baslik');
                var icons = element('span', 'cdb-kisa-baslik-logolar');
                var dedup = Object.create(null);
                Array.prototype.forEach.call(kayit.querySelectorAll('.cdb-kanal-ad-logo img'), function (img) {
                    var url = gorselAdaylari(img)[0];
                    if (!url || dedup[url]) return;
                    dedup[url] = true;
                    var logo = element('img');
                    logo.src = url;
                    logo.alt = '';
                    logo.title = img.getAttribute('alt') || '';
                    logo.loading = 'lazy';
                    icons.appendChild(logo);
                });
                // Tanimsiz kanallar logo yerine metin kullanir.
                Array.prototype.forEach.call(kayit.querySelectorAll('.cdb-kanal-ad-yazi'), function (node) {
                    var channel = (node.textContent || '').trim();
                    if (channel) icons.appendChild(element('span', 'cdb-bolum-sonuc-ad-kanal-yazi', channel));
                });
                if (icons.childNodes.length) pair.appendChild(icons);
                var titleNode = kayit.querySelector('.cdb-kanal-ad-metin') || kayit;
                var name = (titleNode.textContent || '').replace(/\s+/g, ' ').trim();
                if (name) pair.appendChild(element('span', 'cdb-kisa-baslik-yazi', name));
                if (pair.childNodes.length) titles.appendChild(pair);
            });
        }
        middle.appendChild(titles);
        var meta = element('span', 'cdb-kisa-meta');
        meta.appendChild(element('span', '', episodeDescription(ep)));
        if (ep.original) meta.appendChild(element('span', '', '· ' + ep.original));
        var tarihEslesmeleri = matchingBroadcasts(ep, search);
        if (tarihEslesmeleri.length) {
            var match = tarihEslesmeleri[0];
            var small = element('span', 'cdb-kisa-tarih');
            small.appendChild(element('span', '', '·'));
            var logoSrc = match.logoElement ? gorselAdaylari(match.logoElement)[0] : '';
            if (!logoSrc) logoSrc = gercekGorselAdresi(match.logo);
            if (logoSrc) {
                var logo = element('img');
                logo.src = logoSrc;
                logo.alt = match.channel || '';
                logo.title = match.channel || '';
                logo.loading = 'lazy';
                small.appendChild(logo);
            } else if (match.channel) {
                small.appendChild(element('span', '', match.channel));
            }
            if (match.date) small.appendChild(element('span', '', match.date));
            if (tarihEslesmeleri.length > 1) small.appendChild(element('span', '', '+' + (tarihEslesmeleri.length - 1)));
            meta.appendChild(small);
        }
        middle.appendChild(meta);
        row.appendChild(middle);
        return row;
    }
    var modal = null, modalFocus = null, modalOverflow = '', modalRootOverflow = '', currentEpisodes = [], lastRandom = -1;
    function setupRandomModal() {
        if (modal) return;
        modal = element('div', 'cdb-rastgele-arkaplan');
        modal.hidden = true;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Rastgele bölüm seçimi');
        modal.innerHTML =
            '<div class="cdb-rastgele-kart">' +
            '<button type="button" class="cdb-rastgele-kapat" aria-label="Kapat">×</button>' +
            '<div class="cdb-rastgele-baslik">🎲 Rastgele Bölüm</div>' +
            '<div class="cdb-rastgele-gorsel"><span class="cdb-rastgele-gorsel-yok">Görsel bulunmuyor</span></div>' +
            '<div class="cdb-rastgele-meta"></div>' +
            '<div class="cdb-rastgele-bilgi-grid">' +
            '<div class="cdb-rastgele-bilgi-sol"><div class="cdb-rastgele-adlar"></div>' +
            '<div class="cdb-rastgele-orijinal"></div></div>' +
            '<div class="cdb-rastgele-bilgi-sag"><div class="cdb-rastgele-yayinlar"></div></div>' +
            '</div>' +
            '<div class="cdb-rastgele-actions"><a class="cdb-rastgele-git" hidden>Bölüme Git</a>' +
            '<button class="cdb-rastgele-yeni" type="button">🔀 Başka Bölüm Seç</button></div>' +
            '<div class="cdb-rastgele-uyari" role="status" aria-live="polite" hidden></div>' +
            '</div>';
        document.body.appendChild(modal);
        modal.querySelector('.cdb-rastgele-kapat').addEventListener('click', closeRandom);
        modal.addEventListener('click', function (ev) { if (ev.target === modal) closeRandom(); });
        modal.querySelector('.cdb-rastgele-yeni').addEventListener('click', chooseRandom);
    }
    // Bölüm adını yazarken başka bir bölüme bağlantı ekleme; gerçek adı koru.
    function rastgeleAdlariYaz(ep, kutu) {
        kutu.textContent = '';
        var satirlar = ep.titleRows || [];
        if (!satirlar.length) {
            kutu.appendChild(element('div', 'cdb-rastgele-ad-metin', ep.title));
            return;
        }
        satirlar.forEach(function (kayit) {
            var satir = element('div', 'cdb-rastgele-ad-satiri');
            var kanallar = element('div', 'cdb-rastgele-kanal-grubu');
            var logolar = kayit.querySelectorAll('.cdb-kanal-ad-logo img');
            Array.prototype.forEach.call(logolar, function (img) {
                var kap = element('span', 'cdb-rastgele-logo-kutu');
                var kopya = document.createElement('img');
                var adres = gorselAdaylari(img)[0];
                if (adres) kopya.src = adres;
                var ad = (img.getAttribute('alt') || img.getAttribute('title') || '').trim();
                kopya.alt = ad;
                if (ad) kap.title = ad;
                kopya.loading = 'eager';
                kap.appendChild(kopya);
                kanallar.appendChild(kap);
            });
            Array.prototype.forEach.call(
                kayit.querySelectorAll('.cdb-kanal-ad-yazi'), function (yazi) {
                    kanallar.appendChild(element('span', 'cdb-rastgele-logo-metin',
                        (yazi.textContent || '').trim()));
                });
            var metinKaynak = kayit.querySelector('.cdb-kanal-ad-metin') || kayit;
            var ad = (metinKaynak.textContent || '').replace(/\s+/g, ' ').trim();
            satir.appendChild(kanallar);
            satir.appendChild(element('div', 'cdb-rastgele-ad-metin', ad));
            kutu.appendChild(satir);
        });
    }
    // Orijinal ad, logo sirasinin degil Turkce ad metninin altindan baslasin.
    function rastgeleOrijinaliHizala() {
        if (!modal || modal.hidden) return;
        var sol = modal.querySelector('.cdb-rastgele-bilgi-sol');
        var ad = sol && sol.querySelector('.cdb-rastgele-ad-satiri .cdb-rastgele-ad-metin');
        var orijinal = sol && sol.querySelector('.cdb-rastgele-orijinal');
        if (!sol || !ad || !orijinal) return;
        // Ekran daraldiginda etiket, mevcut sol sutunun icinde kalir.
        var bosluk = Math.max(0, Math.round(ad.getBoundingClientRect().left -
            sol.getBoundingClientRect().left));
        orijinal.style.setProperty('margin-left', bosluk + 'px', 'important');
    }
    function rastgeleAdResimleriniDinle() {
        if (!modal) return;
        Array.prototype.forEach.call(
            modal.querySelectorAll('.cdb-rastgele-adlar img'), function (img) {
                if (!img.complete) img.addEventListener('load', rastgeleOrijinaliHizala, {once:true});
            });
    }
    window.addEventListener('resize', rastgeleOrijinaliHizala);

    // Bölüm listesindeki görünüm gibi: LOGO + TARİH.
    // Kanal logosu olmayan kayıtta kanal adı metin olarak gösterilir.
    // Her kaydın kendi tarihini koru; iki ayrı yayın kaydını karıştırma.
    function rastgeleYayinlariYaz(ep, kutu) {
        kutu.textContent = '';
        if (!ep.broadcasts || !ep.broadcasts.length) return;
        ep.broadcasts.forEach(function (kayit, i) {
            var satir = element('div', 'cdb-rastgele-yayin-kaydi');
            var kanal = element('span', 'cdb-rastgele-yayin-kanal');
            var kaynak = kayit.logoElement;
            if (!kaynak && ep.broadcastRows && ep.broadcastRows[i]) {
                kaynak = ep.broadcastRows[i].querySelector('.dizi-tarih-kanal img');
            }
            var resim = kaynak ? gorselAdaylari(kaynak)[0] : gercekGorselAdresi(kayit.logo);
            if (resim) {
                var img = document.createElement('img');
                img.src = resim;
                img.alt = kayit.channel || '';
                img.title = kayit.channel || '';
                img.loading = 'eager';
                kanal.appendChild(img);
            } else if (kayit.channel) {
                kanal.appendChild(element('span', 'cdb-rastgele-yayin-kanal-adi', kayit.channel));
            }
            if (kanal.childNodes.length) satir.appendChild(kanal);
            satir.appendChild(element('span', 'cdb-rastgele-yayin-tarih', kayit.date));
            kutu.appendChild(satir);
        });
    }

    var rastgeleSayfaKontrolIstek = 0;
    var rastgeleGorselIstekNo = 0;
    var rastgeleGorselZamanlayici = null;
    function rastgeleGorselZamanlayicisiniKapat() {
        if (rastgeleGorselZamanlayici !== null) {
            window.clearInterval(rastgeleGorselZamanlayici);
            rastgeleGorselZamanlayici = null;
        }
    }
    function rastgeleGorseliGoster(ep, kutu) {
        var istekNo = ++rastgeleGorselIstekNo;
        rastgeleGorselZamanlayicisiniKapat();
        kutu.classList.remove('cdb-rastgele-gorsel-bos');
        kutu.textContent = '';
        kutu.appendChild(element('span', 'cdb-rastgele-gorsel-yok', 'Görseller yükleniyor…'));
        var kayitlar = ep.images && ep.images.length ? ep.images :
            [{element: ep.imageElement, fileName: ep.imageFileName,
              candidates: ep.image ? [ep.image] : []}];
        var bulunanlar = [], tamamlanan = 0, aktifSira = 0, gosterilenAdres = '';

        function ekranaKoy(adres) {
            if (istekNo !== rastgeleGorselIstekNo) return;
            gosterilenAdres = adres;
            var img = kutu.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                img.alt = ep.title + ' bölüm görseli';
                kutu.textContent = '';
                kutu.classList.remove('cdb-rastgele-gorsel-bos');
                kutu.appendChild(img);
            }
            img.src = adres;
        }
        function ilerle() {
            if (istekNo !== rastgeleGorselIstekNo || bulunanlar.length < 2) return;
            aktifSira = (aktifSira + 1) % bulunanlar.length;
            ekranaKoy(bulunanlar[aktifSira].url);
        }
        function zamanlayiciyiYenile() {
            rastgeleGorselZamanlayicisiniKapat();
            if (bulunanlar.length > 1 && istekNo === rastgeleGorselIstekNo) {
                rastgeleGorselZamanlayici = window.setInterval(ilerle, 2000);
            }
        }
        function resmiBul(kayit) {
            return new Promise(function (resolve) {
                var adaylar = (kayit.candidates || gorselAdaylari(kayit.element)).slice();
                var konum = 0, bitti = false;
                function bitir(adres) {
                    if (bitti) return;
                    bitti = true;
                    resolve(adres);
                }
                function kontrolEt(adres, devam) {
                    if (!adres || istekNo !== rastgeleGorselIstekNo) {
                        devam(); return;
                    }
                    var resim = new Image();
                    resim.onload = function () {
                        if (resim.naturalWidth > 1 && resim.naturalHeight > 1) {
                            bitir(adres);
                        } else devam();
                    };
                    resim.onerror = devam;
                    resim.src = adres;
                }
                function kucukGorseleDon() {
                    if (bitti) return;
                    if (istekNo !== rastgeleGorselIstekNo) { bitir(null); return; }
                    if (konum >= adaylar.length) { bitir(null); return; }
                    kontrolEt(adaylar[konum++], kucukGorseleDon);
                }
                // Asil dosyayi ONCE yukle. Kartin src/currentSrc degeri genelde
                // Fandom'un kucuk (ornegin 320px) thumbnail adresidir.
                if (kayit.fileName) {
                    fullImageUrl(kayit.fileName).then(function (url) {
                        if (!url) { kucukGorseleDon(); return; }
                        kontrolEt(url, kucukGorseleDon);
                    }).catch(kucukGorseleDon);
                } else kucukGorseleDon();
            });
        }
        kayitlar.forEach(function (kayit, kaynakSira) {
            resmiBul(kayit).then(function (adres) {
                if (istekNo !== rastgeleGorselIstekNo) return;
                tamamlanan++;
                if (adres && !bulunanlar.some(function (x) { return x.url === adres; })) {
                    bulunanlar.push({sira:kaynakSira, url:adres});
                    bulunanlar.sort(function (a, b) { return a.sira - b.sira; });
                    var eskiIndex = bulunanlar.findIndex(function (x) { return x.url === gosterilenAdres; });
                    aktifSira = eskiIndex >= 0 ? eskiIndex : 0;
                    if (!gosterilenAdres) ekranaKoy(bulunanlar[0].url);
                    zamanlayiciyiYenile();
                }
                if (tamamlanan === kayitlar.length && !bulunanlar.length) {
                    kutu.classList.add('cdb-rastgele-gorsel-bos');
                    kutu.textContent = '';
                    kutu.appendChild(element('span', 'cdb-rastgele-gorsel-yok',
                        'Bu bölümün kayıtlı görseli bulunamadı'));
                }
            });
        });
    }
    function chooseRandom() {
        if (!currentEpisodes.length) return;
        var index = Math.floor(Math.random() * currentEpisodes.length);
        if (currentEpisodes.length > 1 && index === lastRandom) {
            index = (index + 1 + Math.floor(Math.random() * (currentEpisodes.length - 1))) % currentEpisodes.length;
        }
        lastRandom = index;
        var ep = currentEpisodes[index];
        rastgeleGorseliGoster(ep, modal.querySelector('.cdb-rastgele-gorsel'));
        modal.querySelector('.cdb-rastgele-meta').textContent = episodeDescription(ep);
        rastgeleAdlariYaz(ep, modal.querySelector('.cdb-rastgele-adlar'));
        modal.querySelector('.cdb-rastgele-orijinal').textContent = ep.original;
        rastgeleAdResimleriniDinle();
        window.requestAnimationFrame(rastgeleOrijinaliHizala);
        rastgeleYayinlariYaz(ep, modal.querySelector('.cdb-rastgele-yayinlar'));
        // "Sayfa yok" kararını yalnızca bağlantı sınıfına bakarak verme.
        var go = modal.querySelector('.cdb-rastgele-git');
        var bilgi = modal.querySelector('.cdb-rastgele-uyari');
        var istek = ++rastgeleSayfaKontrolIstek;
        var sayfaAdresi = bolumSayfaAdresi(ep);
        go.hidden = true;
        go.removeAttribute('href');
        bilgi.hidden = true;
        bilgi.textContent = '';
        if (ep.exists && sayfaAdresi) {
            go.hidden = false;
            go.textContent = 'Bölüme Git';
            go.href = sayfaAdresi;
        } else if (!ep.linkTitle) {
            bilgi.textContent = 'Bu bölüm için sayfa bağlantısı bulunamadı.';
            bilgi.hidden = false;
        } else {
            bilgi.textContent = 'Bölüm sayfası kontrol ediliyor…';
            bilgi.hidden = false;
            rastgeleSayfayiDogrula(ep).then(function (varMi) {
                if (istek !== rastgeleSayfaKontrolIstek || !modal ||
                    modal.hidden || !modal.classList.contains('is-open')) return;
                if (varMi === true && sayfaAdresi) {
                    go.textContent = 'Bölüme Git';
                    go.href = sayfaAdresi;
                    go.hidden = false;
                    bilgi.hidden = true;
                } else {
                    go.hidden = true;
                    bilgi.textContent = varMi === false ?
                        'Bu bölümün sayfası henüz oluşturulmamış.' :
                        'Bölüm sayfasının durumu doğrulanamadı.';
                    bilgi.hidden = false;
                }
            });
        }
        // Sonraki bölüm seçildiğinde pencere üstten başlasın.
        var kart = modal.querySelector('.cdb-rastgele-kart');
        if (kart) kart.scrollTop = 0;
    }
    function openRandom(episodes, trigger) {
        if (!episodes.length) return;
        setupRandomModal();
        currentEpisodes = episodes;
        lastRandom = -1;
        modalFocus = trigger;
        modalOverflow = document.body.style.overflow;
        modalRootOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        chooseRandom();
        animateOpen(modal);
        window.requestAnimationFrame(rastgeleOrijinaliHizala);
        setFocusableFocus(modal.querySelector('.cdb-rastgele-kapat'));
    }
    function closeRandom() {
        if (!modal || modal.hidden || !modal.classList.contains('is-open')) return;
        ++rastgeleGorselIstekNo;
        ++rastgeleSayfaKontrolIstek;
        rastgeleGorselZamanlayicisiniKapat();
        animateClose(modal);
        document.body.style.overflow = modalOverflow;
        document.documentElement.style.overflow = modalRootOverflow;
        if (modalFocus && modalFocus.isConnected) setFocusableFocus(modalFocus);
    }
    function initList(root) {
        if (root.getAttribute('data-cdb-tools-initialized') === '1') return;
        var episodes = readEpisodes(root);
        if (!episodes.length) return;
        root.setAttribute('data-cdb-tools-initialized', '1');
        var target = root.querySelector('.dizi-liste-gorunumler');
        if (!target) target = root.querySelector('.dizi-liste-ust');
        if (!target || !target.parentNode) return;
        var toolbar = element('section', 'cdb-bolum-araclar');
        toolbar.setAttribute('aria-label', 'Bölüm bulma ve keşif');
        toolbar.innerHTML =
            '<div class="cdb-bolum-araclar-baslik">Bölüm Bul ve Keşfet</div>' +
            '<div class="cdb-bolum-araclar-satir">' +
            '<input class="cdb-bolum-arama" type="search" autocomplete="off" ' +
            'placeholder="Ad, numara, 2x2, kanal veya Temmuz 2025" aria-label="Bölüm ara">' +
            '<button type="button" class="cdb-bolum-rastgele-tus">🎲 Rastgele Bölüm</button>' +
            '</div><div class="cdb-bolum-arama-sonuc" hidden>' +
            '<div class="cdb-bolum-arama-durum" role="status" aria-live="polite"></div>' +
            '<div class="cdb-bolum-sonuclar"></div></div>';
        target.parentNode.insertBefore(toolbar, target);
        var field = toolbar.querySelector('.cdb-bolum-arama');
        var resultBox = toolbar.querySelector('.cdb-bolum-arama-sonuc');
        var results = toolbar.querySelector('.cdb-bolum-sonuclar');
        var status = toolbar.querySelector('.cdb-bolum-arama-durum');
        var matching = [];
        function updateResults() {
            var search = normal(field.value);
            if (!search) { resultBox.hidden = true; matching = []; results.textContent = ''; return; }
            var isNumber = /^\d+[a-j]?$/.test(search);
            var yearQuery = /^(?:19|20)\d{2}$/.test(search);
            var seasonQuery = search.match(/^(\d+)\s*[x×.]\s*(\d+[a-j]?)$/);
            matching = episodes.filter(function (ep) {
                if (seasonQuery) return ep.season === seasonQuery[1] && normal(ep.seasonNumber) === seasonQuery[2];
                if (yearQuery) return matchingBroadcasts(ep, search).length > 0;
                if (isNumber) {
                    var mainNo = normal(ep.no);
                    return mainNo === search || normal(ep.seasonNumber) === search ||
                        mainNo.split('-').indexOf(search) !== -1 ||
                        mainNo.replace(/[a-j]$/, '') === search;
                }
                return normal(ep.title).indexOf(search) !== -1 ||
                    normal(ep.original).indexOf(search) !== -1 ||
                    matchingBroadcasts(ep, search).length > 0;
            });
            resultBox.hidden = false;
            results.textContent = '';
            var max = 40;
            status.textContent = matching.length ?
                matching.length + ' bölüm bulundu' + (matching.length > max ? ' · İlk 40 sonuç gösteriliyor' : '') :
                'Eşleşen bölüm bulunamadı';
            matching.slice(0, max).forEach(function (ep) { results.appendChild(resultRow(ep, search)); });
        }
        field.addEventListener('input', updateResults);
        field.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && matching.length && matching[0].exists) {
                e.preventDefault(); window.location.assign(matching[0].link);
            }
        });
        toolbar.querySelector('.cdb-bolum-rastgele-tus').addEventListener('click', function (e) {
            openRandom(episodes, e.currentTarget);
        });
    }
    function init() {
        Array.prototype.forEach.call(document.querySelectorAll('.dizi-liste'), initList);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
    if (window.mw && mw.hook) mw.hook('wikipage.content').add(init);

    // Her iki açılır pencere için Esc + klavyeyle odak tuzağı.
    document.addEventListener('keydown', function (e) {
        var active = modal && !modal.hidden && modal.classList.contains('is-open') ? modal :
            (viewer && !viewer.hidden && viewer.classList.contains('is-open') ? viewer : null);
        if (!active) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            if (active === modal) closeRandom(); else closeViewer();
        } else if (e.key === 'Tab') {
            var all = active.querySelectorAll('a[href],button:not([disabled])');
            var items = Array.prototype.filter.call(all, function (el) { return el.tabIndex >= 0; });
            if (!items.length) return;
            var first = items[0], last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); setFocusableFocus(last);
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); setFocusableFocus(first);
            }
        }
    });
})();


/* Çizgi ve Dizi Ansiklopedisi — 2 saniyelik otomatik görsel geçişi
 * Bu blok yukarıdaki Common.js ile aynı dosyada zaten vardır.
 * Ayrı bir kez daha eklenmemelidir.
 * Eski ok dinleyicisinden önce çalışır; oklar BÖLÜM sayfasını açmaz.
 */
(function () {
    'use strict';
    if (window.cdbIkiSaniyeGaleriKuruldu) return;
    window.cdbIkiSaniyeGaleriKuruldu = true;

    var SURE = 2000; // Her iki saniyede bir sonraki görsel.
    var CSS_ID = 'cdb-iki-saniye-galeri-stili';

    if (!document.getElementById(CSS_ID)) {
        var stil = document.createElement('style');
        stil.id = CSS_ID;
        stil.textContent = [
            /* Fandom'un tüm kartı kaplayan bölüm bağlantısının üzerine çıkar. */
            '.dizi-liste .dizi-liste-gorsel,.dizi-liste .dizi-tablo-gorsel{position:relative!important;z-index:20!important;}',
            '.dizi-liste .cdb-es-galeri,.dizi-liste .cdb-bolum-galeri{position:relative!important;isolation:isolate!important;z-index:21!important;}',
            '.dizi-liste .cdb-es-galeri .cdb-es-galeri-ok,.dizi-liste .cdb-bolum-galeri .cdb-bolum-ok{z-index:200!important;pointer-events:auto!important;cursor:pointer!important;touch-action:manipulation!important;}',
            /* Önceki A/B görsel sistemini de aynı 2 sn kuralına bağla. */
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-kare{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;animation:none!important;transition:opacity .35s ease!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-kare.cdb-gorsel-aktif{opacity:1!important;visibility:visible!important;pointer-events:auto!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-kisim{animation:none!important;transition:opacity .35s ease!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-kisim.cdb-gorsel-aktif{opacity:1!important;visibility:visible!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-ok-bde{display:none!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-ok-ilk{display:inline-flex!important;opacity:1!important;visibility:visible!important;animation:none!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-ok-sol{left:7px!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-ok-sag{right:7px!important;}',
            '.dizi-liste .cdb-bolum-galeri .cdb-bolum-ok-ilk{top:50%!important;transform:translateY(-50%)!important;}',
            '@media(prefers-reduced-motion:reduce){.dizi-liste .cdb-es-galeri-ray,.dizi-liste .cdb-bolum-kare{transition:none!important;}}'
        ].join('\n');
        (document.head || document.documentElement).appendChild(stil);
    }

    function galeriBul(og) {
        return og && og.closest ? og.closest('.dizi-liste .cdb-es-galeri, .dizi-liste .cdb-bolum-galeri') : null;
    }

    function kareleriBul(galeri) {
        return galeri.classList.contains('cdb-es-galeri') ?
            galeri.querySelectorAll('.cdb-es-galeri-kare') :
            galeri.querySelectorAll('.cdb-bolum-kare');
    }

    function gec(galeri, yon, ilkKurulum) {
        var kareler = kareleriBul(galeri);
        var toplam = kareler.length;
        if (toplam < 2) return;
        var sira = parseInt(galeri.getAttribute('data-cdb-oto-sira') || '0', 10);
        if (!isFinite(sira) || sira < 0 || sira >= toplam) sira = 0;
        if (!ilkKurulum) sira = (sira + yon + toplam) % toplam;
        galeri.setAttribute('data-cdb-oto-sira', String(sira));
        galeri.setAttribute('data-cdb-index', String(sira));

        if (galeri.classList.contains('cdb-es-galeri')) {
            var ray = galeri.querySelector('.cdb-es-galeri-ray');
            if (ray) ray.style.setProperty('transform', 'translate3d(-' + sira * 100 + '%,0,0)', 'important');
        } else {
            Array.prototype.forEach.call(kareler, function (kare, i) {
                kare.classList.toggle('cdb-gorsel-aktif', i === sira);
            });
            var etiketler = galeri.querySelectorAll('.cdb-bolum-kisim');
            Array.prototype.forEach.call(etiketler, function (etiket, i) {
                etiket.classList.toggle('cdb-gorsel-aktif', i === sira);
            });
        }
    }

    function baslat() {
        Array.prototype.forEach.call(document.querySelectorAll(
            '.dizi-liste .cdb-es-galeri, .dizi-liste .cdb-bolum-galeri'
        ), function (galeri) {
            if (galeri.getAttribute('data-cdb-oto-kuruldu') === '1') return;
            galeri.setAttribute('data-cdb-oto-kuruldu', '1');
            gec(galeri, 0, true);
        });
    }

    function okBul(hedef) {
        return hedef && hedef.closest ? hedef.closest(
            '.dizi-liste .cdb-es-galeri-ok, .dizi-liste .cdb-bolum-ok'
        ) : null;
    }

    function dugmeyeBas(olay) {
        var dugme = okBul(olay.target);
        if (!dugme) return;
        var galeri = galeriBul(dugme);
        if (!galeri) return;
        olay.preventDefault();
        olay.stopPropagation();
        if (olay.stopImmediatePropagation) olay.stopImmediatePropagation();
        var geri = dugme.classList.contains('cdb-es-galeri-geri') ||
            dugme.classList.contains('cdb-bolum-ok-sol');
        gec(galeri, geri ? -1 : 1, false);
    }

    /* Kartın tıklama/kaydırma dinleyicilerini ok üzerinden devre dışı bırak. */
    function okunIlkOlayiniDurdur(olay) {
        if (!okBul(olay.target)) return;
        olay.stopPropagation();
        if (olay.stopImmediatePropagation) olay.stopImmediatePropagation();
    }
    window.addEventListener('pointerdown', okunIlkOlayiniDurdur, true);
    window.addEventListener('mousedown', okunIlkOlayiniDurdur, true);
    window.addEventListener('pointerup', okunIlkOlayiniDurdur, true);
    window.addEventListener('mouseup', okunIlkOlayiniDurdur, true);

    /* Pencere yakalama aşaması: kartın / Fandom'un bağlantı dinleyicilerinden önce. */
    window.addEventListener('click', dugmeyeBas, true);
    window.addEventListener('keydown', function (olay) {
        if (olay.key !== 'Enter' && olay.key !== ' ' && olay.key !== 'Spacebar') return;
        dugmeyeBas(olay);
    }, true);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', baslat);
    } else {
        baslat();
    }
    if (window.mw && mw.hook) mw.hook('wikipage.content').add(baslat);

    window.setInterval(function () {
        if (document.hidden) return;
        baslat();
        Array.prototype.forEach.call(document.querySelectorAll(
            '.dizi-liste .cdb-es-galeri, .dizi-liste .cdb-bolum-galeri'
        ), function (galeri) {
            if (galeri.getAttribute('data-cdb-oto-kuruldu') === '1' && galeri.getClientRects().length) {
                gec(galeri, 1, false);
            }
        });
    }, SURE);
}());

/* Çizgi ve Dizi Ansiklopedisi — Yayın Akışı V13
 * Günlük sayfalar Türkçe başlıklı ve yalnızca {{Program|...}} içeriklidir.
 * Kanallar ve tarihler aynı sayfada değişir; başka sayfaya yönlendirme olmaz.
 * Her tarih için TEK toplu API sorgusu; dizi/bölüm/arama koduna dokunulmaz.
 */
(function () {
    'use strict';
    var AYLAR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
        'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    var ANA = ['Cartoon Network','Cartoonito','Nickelodeon','Nicktoons',
        'Nick Jr.','Disney Jr.','TRT Çocuk','Spacetoon'];
    // Türkiye yayın dönemleri: başlangıç dahil, bitiş dahil.
    var DONEM = {
        'Cartoon Network': ['2008-01-28',null],
        'Boomerang':       ['2016-04-23','2023-09-03'],
        'Cartoonito':      ['2023-09-04',null],
        'Nickelodeon':     ['2026-01-01',null], // HD/SD ayrımından sonra kullanılan ad
        'Nickelodeon HD':  ['2012-07-01','2025-12-31'],
        'Nickelodeon SD':  ['2012-03-01','2025-12-31'],
        'Nicktoons':       ['2017-02-20',null],
        'Nick Jr.':        ['2012-05-01',null],
        'Disney Jr.':      ['2011-06-01',null],
        'Disney Channel':  ['2007-04-29','2022-03-31'],
        'Disney XD':       ['2009-10-03','2021-01-31'],
        'TRT Çocuk':       ['2008-11-01',null],
        'Spacetoon':       ['2025-05-19',null]
    };
    // Fandom üzerindeki gerçek dosya adları; Spacetoon PNG istisnası.
    var LOGO = {
        'Cartoon Network': {yeni:'CN.webp',eski:'Eski CN.webp',gecis:'2011-04-04'},
        'Boomerang':       {yeni:'Boomerang.webp'},
        'Cartoonito':      {yeni:'Cartoonito.webp'},
        'Nickelodeon':     {yeni:'Nickelodeon.webp',eski:'Nickelodeon Eski.webp',gecis:'2023-08-01'},
        'Nickelodeon HD':  {yeni:'Nickelodeon.webp',eski:'Nickelodeon Eski.webp',gecis:'2023-08-01'},
        'Nickelodeon SD':  {yeni:'Nickelodeon.webp',eski:'Nickelodeon Eski.webp',gecis:'2023-08-01'},
        'Nicktoons':       {yeni:'Nicktoons.webp',eski:'Nicktoons Eski.webp',gecis:'2024-05-20'},
        'Nick Jr.':        {yeni:'Nick Jr..webp',eski:'Nick JR. Eski.webp',gecis:'2024-02-05'},
        'Disney Jr.':      {yeni:'Disney Jr..webp'},
        'Disney Channel':  {yeni:'Disney Channel.webp'},
        'Disney XD':       {yeni:'Disney XD.webp'},
        'TRT Çocuk':       {yeni:'TRT Çocuk.webp',eski:'Eski TRT Çocuk.webp',gecis:'2021-11-01'},
        'Spacetoon':       {yeni:'SpacetoonKanalLogo.png'}
    };
    // Koyu tasarımda okunabilir kanal kimliği renkleri.
    var RENK = {
        'Cartoon Network':'#f5f5f5', 'Cartoonito':'#35cde9',
        'Boomerang':'#8e87fa', 'Nickelodeon':'#ff7900',
        'Nickelodeon HD':'#ff7900', 'Nickelodeon SD':'#ff7900',
        'Nicktoons':'#8fdd50', 'Nick Jr.':'#39cae4',
        'Disney Jr.':'#4d99f5','Disney Channel':'#5eaaff',
        'Disney XD':'#a9d635','TRT Çocuk':'#fac23c',
        'Spacetoon':'#ffe258'
    };
    var logoAdresleri = Object.create(null);
    var logoBekliyor = Object.create(null);
    var gunlukUygunluk = Object.create(null);

    function donustur(ad,tarih) {
        if (ad === 'Cartoonito' || ad === 'Boomerang')
            return tarih < '2023-09-04' ? 'Boomerang' : 'Cartoonito';
        return ad;
    }
    function donemdeMi(ad, tarih) {
        var aralik = DONEM[ad];
        return !!aralik && tarih >= aralik[0] && (!aralik[1] || tarih <= aralik[1]);
    }
    function tarihKanallari(tarih) {
        var sonuc = [];
        ANA.forEach(function (ad) {
            if (ad === 'Nickelodeon') {
                if (tarih < '2026-01-01') {
                    if (donemdeMi('Nickelodeon HD',tarih)) sonuc.push('Nickelodeon HD');
                    if (donemdeMi('Nickelodeon SD',tarih)) sonuc.push('Nickelodeon SD');
                } else if (donemdeMi('Nickelodeon',tarih)) sonuc.push('Nickelodeon');
            } else {
                var asil = donustur(ad,tarih);
                if (donemdeMi(asil,tarih)) sonuc.push(asil);
            }
            if (ad === 'Disney Jr.') {
                if (donemdeMi('Disney Channel',tarih)) sonuc.push('Disney Channel');
                if (donemdeMi('Disney XD',tarih)) sonuc.push('Disney XD');
            }
        });
        return sonuc;
    }
    function logoAdi(ad,tarih) {
        var b=LOGO[ad];
        return b ? (b.eski && tarih < b.gecis ? b.eski : b.yeni) : '';
    }
    function apiAdresi() {
        if (window.mw && mw.util && typeof mw.util.wikiScript === 'function')
            return mw.util.wikiScript('api');
        var yol = window.mw && mw.config && mw.config.get('wgScriptPath');
        return (yol || '/tr').replace(/\/$/,'') + '/api.php';
    }
    function formatTarih(tarih) {
        var p=/^(\d{4})-(\d{2})-(\d{2})$/.exec(tarih);
        return p && AYLAR[Number(p[2])-1]
            ? Number(p[3])+' '+AYLAR[Number(p[2])-1]+' '+p[1] : tarih;
    }
    function baslik(ad,tarih) { return formatTarih(tarih)+' '+ad+' Yayın Akışı'; }
    function baslikAnahtari(s) {
        return String(s||'').replace(/_/g,' ').replace(/\s+/g,' ').toLocaleLowerCase('tr-TR').trim();
    }
    function jsonGetir(url) {
        return fetch(url,{credentials:'same-origin'}).then(function(res){
            if (!res.ok) throw new Error('HTTP '+res.status);
            return res.json();
        }).then(function(veri){
            if (veri && veri.error) throw new Error(veri.error.info || veri.error.code || 'API hatası');
            return veri;
        });
    }
    function sayfaHamIcerik(sayfa) {
        if (!sayfa || !sayfa.revisions || !sayfa.revisions.length) return '';
        var rev=sayfa.revisions[0];
        var ana=rev.slots && (rev.slots.main || rev.slots['*']);
        if (ana && typeof ana.content === 'string') return ana.content;
        if (ana && typeof ana['*'] === 'string') return ana['*'];
        return typeof rev['*'] === 'string' ? rev['*'] : '';
    }
    function akisKaydiVarMi(icerik) {
        // PHP oluşturucusu bunları yayımlar. Başlık/boş şablon yeterli değildir.
        var ham=String(icerik || '').replace(/<!--[\s\S]*?-->/g,'');
        return /\{\{\s*(?:[Şş]ablon\s*:\s*)?[Pp]rogram\s*\|/i.test(ham) ||
            /class\s*=\s*["'][^"']*\bya-satir\b/i.test(ham);
    }
    function uygunKanallariSorgula(tarih) {
        if (gunlukUygunluk[tarih]) return gunlukUygunluk[tarih];
        var olasiliklar=tarihKanallari(tarih);
        if (!olasiliklar.length) return Promise.resolve([]);
        var isimler=olasiliklar.map(function(ad){return baslik(ad,tarih);});
        // Tek API isteği; yalnızca program satırı içeren mevcut günlük sayfaları tut.
        var url=apiAdresi()+'?action=query&format=json&formatversion=2'+
            '&prop=revisions&rvprop=content&rvslots=main&redirects=1&titles='+
            encodeURIComponent(isimler.join('|'));
        var istek=jsonGetir(url).then(function(veri){
            var pages=(veri.query && veri.query.pages) || [];
            if (!Array.isArray(pages)) pages=Object.keys(pages).map(function(k){return pages[k];});
            var bulunan=Object.create(null);
            pages.forEach(function(sayfa){
                if (!sayfa || Object.prototype.hasOwnProperty.call(sayfa,'missing') ||
                    Object.prototype.hasOwnProperty.call(sayfa,'invalid')) return;
                if (akisKaydiVarMi(sayfaHamIcerik(sayfa)))
                    bulunan[baslikAnahtari(sayfa.title)]=true;
            });
            return olasiliklar.filter(function(ad){return !!bulunan[baslikAnahtari(baslik(ad,tarih))];});
        });
        gunlukUygunluk[tarih]=istek;
        istek.catch(function(){delete gunlukUygunluk[tarih];});
        return istek;
    }

    function logoGoster(dosya,url) {
        document.querySelectorAll('.ya-wrap .ya-kanal[data-ya-logo]').forEach(function(sekme){
            if (sekme.getAttribute('data-ya-logo')!==dosya) return;
            var yer=sekme.querySelector('.ya-kanal-logo');
            if (!yer) return;
            yer.textContent='';
            if (!url) {sekme.classList.add('ya-logo-yok');return;}
            var img=document.createElement('img');
            img.alt=sekme.getAttribute('data-ya-kanal') || '';
            img.loading='lazy';
            img.src=url;
            img.addEventListener('error',function(){
                sekme.classList.add('ya-logo-yok');
                if (img.parentNode) img.parentNode.removeChild(img);
            },{once:true});
            sekme.classList.remove('ya-logo-yok');
            yer.appendChild(img);
        });
    }
    function dosyaAdresleriniBul(dosyalar) {
        var yeniler=dosyalar.filter(function(d){
            return d && !Object.prototype.hasOwnProperty.call(logoAdresleri,d) && !logoBekliyor[d];
        });
        if (!yeniler.length) return;
        yeniler.forEach(function(d){logoBekliyor[d]=true;});
        var url=apiAdresi()+'?action=query&format=json&formatversion=2'+
            '&prop=imageinfo&iiprop=url&titles='+
            encodeURIComponent(yeniler.map(function(d){return 'File:'+d;}).join('|'));
        jsonGetir(url).then(function(veri){
            var harita=Object.create(null);
            var pages=(veri.query && veri.query.pages) || [];
            if (!Array.isArray(pages)) pages=Object.keys(pages).map(function(k){return pages[k];});
            pages.forEach(function(s){
                var ad=(s.title||'').replace(/^(?:File|Dosya):/i,'').replace(/_/g,' ');
                if (s.imageinfo && s.imageinfo[0] && s.imageinfo[0].url)
                    harita[baslikAnahtari(ad)]=s.imageinfo[0].url;
            });
            yeniler.forEach(function(d){
                logoAdresleri[d]=harita[baslikAnahtari(d)] || '';
                logoGoster(d,logoAdresleri[d]);
            });
        }).catch(function(){/* logo hatası yayın akışını engellemez */})
        .finally(function(){yeniler.forEach(function(d){delete logoBekliyor[d];});});
    }
    function ilkLogolariOku(sekmeler,tarih) {
        Array.prototype.forEach.call(sekmeler.querySelectorAll('.ya-kanal[data-ya-kanal]'),function(sekme){
            var dosya=logoAdi(sekme.getAttribute('data-ya-kanal'),tarih);
            var img=sekme.querySelector('.ya-kanal-logo img');
            if (!dosya || !img || Object.prototype.hasOwnProperty.call(logoAdresleri,dosya)) return;
            var src=img.currentSrc || img.getAttribute('data-src') || img.getAttribute('src');
            if (src && !/^(?:data:|about:)/i.test(src)) logoAdresleri[dosya]=src;
        });
    }
    function sekmeOlustur(ad,secili,tarih) {
        var sekme=document.createElement('div');
        sekme.className='ya-kanal'+(secili?' ya-aktif':'');
        sekme.setAttribute('data-ya-kanal',ad);
        sekme.setAttribute('role','tab');
        sekme.setAttribute('aria-selected',secili?'true':'false');
        sekme.setAttribute('tabindex',secili?'0':'-1');
        sekme.title=ad+' yayın akışını göster';
        sekme.style.setProperty('--ya-kanal-renk',RENK[ad] || '#43e0d3');
        var logo=document.createElement('span');
        logo.className='ya-kanal-logo';
        var adYazi=document.createElement('span');
        adYazi.className='ya-kanal-ad';
        adYazi.textContent=ad;
        sekme.appendChild(logo);
        sekme.appendChild(adYazi);
        var dosya=logoAdi(ad,tarih);
        sekme.setAttribute('data-ya-logo',dosya);
        if (Object.prototype.hasOwnProperty.call(logoAdresleri,dosya) && logoAdresleri[dosya]) {
            var img=document.createElement('img');
            img.src=logoAdresleri[dosya];
            img.alt=ad;
            img.loading='lazy';
            img.addEventListener('error',function(){sekme.classList.add('ya-logo-yok');img.remove();},{once:true});
            logo.appendChild(img);
        } else sekme.classList.add('ya-logo-yok');
        return sekme;
    }
    function sekmeleriYaz(sekmeler,adlar,tarih,secili) {
        sekmeler.textContent='';
        adlar.forEach(function(ad){sekmeler.appendChild(sekmeOlustur(ad,ad===secili,tarih));});
        dosyaAdresleriniBul(adlar.map(function(ad){return logoAdi(ad,tarih);}));
    }
    function renderListe(html,liste) {
        liste.innerHTML=html;
        liste.removeAttribute('aria-busy');
    }
    function bilgiGoster(liste,mesaj,hata) {
        liste.textContent='';
        var el=document.createElement('div');
        el.className=hata?'ya-hata':'ya-bos';
        el.textContent=mesaj;
        liste.appendChild(el);
        liste.removeAttribute('aria-busy');
    }
    function gosterilecekHtml(ham) {
        if (!ham) return null;
        var kap=document.createElement('div');
        kap.innerHTML=ham;
        var liste=kap.querySelector('.ya-liste');
        if (liste && liste.querySelector('.ya-satir')) return liste.innerHTML;
        var satirlar=kap.querySelectorAll('.ya-satir');
        if (!satirlar.length) return null;
        return Array.prototype.map.call(satirlar,function(s){return s.outerHTML;}).join('');
    }
    function gunlukListeYukle(kanal,tarih) {
        var url=apiAdresi()+'?action=parse&format=json&formatversion=2'+
            '&prop=text&page='+encodeURIComponent(baslik(kanal,tarih));
        return jsonGetir(url).then(function(veri){
            var ham=veri.parse && veri.parse.text;
            if (ham && typeof ham==='object') ham=ham['*'];
            return gosterilecekHtml(ham);
        });
    }

    function kur(kok) {
        (kok || document).querySelectorAll('.ya-wrap').forEach(function(wrap){
            if (wrap.getAttribute('data-ya-v13')==='1') return;
            var sekmeler=wrap.querySelector('.ya-kanallar');
            var liste=wrap.querySelector('.ya-liste');
            var tarihKutusu=wrap.querySelector('.ya-date-switch');
            if (!sekmeler || !liste || !tarihKutusu) return;
            wrap.setAttribute('data-ya-v13','1');
            liste.setAttribute('role','tabpanel');
            var ilkTarih=tarihKutusu.getAttribute('data-ya-tarih')||'';
            var ilkKanal=donustur(tarihKutusu.getAttribute('data-ya-kanal') || 'Nickelodeon',ilkTarih);
            var ilkKayitVar=!!liste.querySelector('.ya-satir');
            var kayitlar=Object.create(null);
            var seciliKanal='';
            var seciliTarih='';
            var istekNo=0;
            var guncelKanallar=[];
            var seciliYazi=wrap.querySelector('.ya-secili-kanal');
            var tarihYazi=tarihKutusu.querySelector('.ya-date-text');
            var anahtar=function(ad,tarih){return ad+'||'+tarih;};
            if (ilkKayitVar && donemdeMi(ilkKanal,ilkTarih))
                kayitlar[anahtar(ilkKanal,ilkTarih)]=liste.innerHTML;
            ilkLogolariOku(sekmeler,ilkTarih);
            // Lua başlangıçta bütün tarihsel kanalları oluşturur. Kullanıcıya yalnız
            // sunucudan VARLIĞI doğrulanmış kayıtları göstereceğiz.
            sekmeler.textContent='';
            var tarihInput=tarihKutusu.querySelector('input.ya-date-native');
            if (!tarihInput) {
                tarihInput=document.createElement('input');
                tarihInput.type='date';
                tarihInput.className='ya-date-native';
                tarihInput.setAttribute('aria-label','Yayın akışı tarihini seç');
                tarihKutusu.appendChild(tarihInput);
            }
            tarihInput.value=ilkTarih;
            tarihKutusu.classList.add('ya-date-hazir');

            function sadeceSecimiYansit(ad,tarih) {
                seciliKanal=ad;
                seciliTarih=tarih;
                if (seciliYazi) seciliYazi.textContent=ad || '';
                tarihKutusu.setAttribute('data-ya-kanal',ad);
                tarihKutusu.setAttribute('data-ya-tarih',tarih);
                if (tarihYazi) tarihYazi.textContent=formatTarih(tarih);
                tarihInput.value=tarih;
                sekmeleriYaz(sekmeler,guncelKanallar,tarih,ad);
            }
            function sec(istekKanal,tarih) {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) return;
                var token=++istekNo;
                // Tarih değişiminde bir önceki günün sekmeleri ve programları kalmasın.
                seciliTarih=tarih;
                seciliKanal='';
                guncelKanallar=[];
                sekmeler.textContent='';
                if (seciliYazi) seciliYazi.textContent='';
                tarihInput.value=tarih;
                tarihKutusu.setAttribute('data-ya-tarih',tarih);
                if (tarihYazi) tarihYazi.textContent=formatTarih(tarih);
                liste.textContent='';
                liste.setAttribute('aria-busy','true');
                uygunKanallariSorgula(tarih).then(function(uzaktakiler){
                    if (token!==istekNo) return;
                    var olasiliklar=tarihKanallari(tarih);
                    var mevcut=uzaktakiler.slice();
                    // Önizleme/test sayfasına {{Program}} doğrudan konmuş olabilir.
                    // Bu durumda ilk seçili kanalın GERÇEK görünen satırları da bir kayıttır.
                    if (tarih===ilkTarih && ilkKayitVar && donemdeMi(ilkKanal,tarih) &&
                        mevcut.indexOf(ilkKanal)===-1) mevcut.push(ilkKanal);
                    guncelKanallar=olasiliklar.filter(function(k){return mevcut.indexOf(k)!==-1;});
                    if (!guncelKanallar.length) {
                        sadeceSecimiYansit('',tarih);
                        bilgiGoster(liste,'Bu tarihte kayıtlı yayın akışı bulunmuyor.',false);
                        return;
                    }
                    var hedef=donustur(istekKanal,tarih);
                    if (guncelKanallar.indexOf(hedef)===-1) hedef=guncelKanallar[0];
                    sadeceSecimiYansit(hedef,tarih);
                    function listeyiYukle(ad) {
                        if (token!==istekNo) return;
                        var key=anahtar(ad,tarih);
                        if (Object.prototype.hasOwnProperty.call(kayitlar,key)) {
                            renderListe(kayitlar[key],liste);
                            return;
                        }
                        gunlukListeYukle(ad,tarih).then(function(html){
                            if (token!==istekNo) return;
                            if (html) {
                                kayitlar[key]=html;
                                renderListe(html,liste);
                                return;
                            }
                            // Mevcut sayfada gerçekte program satırı yoksa yanlış sekmeyi çıkar.
                            guncelKanallar=guncelKanallar.filter(function(k){return k!==ad;});
                            if (!guncelKanallar.length) {
                                sadeceSecimiYansit('',tarih);
                                bilgiGoster(liste,'Bu tarihte kayıtlı yayın akışı bulunmuyor.',false);
                                return;
                            }
                            sadeceSecimiYansit(guncelKanallar[0],tarih);
                            listeyiYukle(guncelKanallar[0]);
                        }).catch(function(){
                            if (token!==istekNo) return;
                            bilgiGoster(liste,'Yayın akışı yüklenemedi. Sunucuya erişimi kontrol et.',true);
                        });
                    }
                    listeyiYukle(hedef);
                }).catch(function(){
                    if (token!==istekNo) return;
                    if (tarih===ilkTarih && ilkKayitVar && donemdeMi(ilkKanal,tarih)) {
                        guncelKanallar=[ilkKanal];
                        sadeceSecimiYansit(ilkKanal,tarih);
                        renderListe(kayitlar[anahtar(ilkKanal,tarih)],liste);
                    } else {
                        sadeceSecimiYansit('',tarih);
                        bilgiGoster(liste,'Yayın akışları kontrol edilemedi. Tarihi tekrar deneyebilirsin.',true);
                    }
                });
            }
            sekmeler.addEventListener('click',function(e){
                var node=e.target.closest && e.target.closest('.ya-kanal[data-ya-kanal]');
                if (!node || !sekmeler.contains(node)) return;
                e.preventDefault();
                var ad=node.getAttribute('data-ya-kanal');
                if (guncelKanallar.indexOf(ad)!==-1) sec(ad,seciliTarih);
            });
            sekmeler.addEventListener('keydown',function(e){
                var node=e.target.closest && e.target.closest('.ya-kanal[data-ya-kanal]');
                if (!node || !sekmeler.contains(node)) return;
                var ad=node.getAttribute('data-ya-kanal');
                if (e.key==='Enter' || e.key===' ') {
                    e.preventDefault();sec(ad,seciliTarih);
                } else if (e.key==='ArrowRight'||e.key==='ArrowLeft') {
                    e.preventDefault();
                    var all=Array.prototype.slice.call(sekmeler.querySelectorAll('.ya-kanal[data-ya-kanal]'));
                    var i=all.indexOf(node),next=all[(i+(e.key==='ArrowRight'?1:-1)+all.length)%all.length];
                    if (next) {next.focus();sec(next.getAttribute('data-ya-kanal'),seciliTarih);}
                }
            });
            tarihInput.addEventListener('change',function(){
                if (tarihInput.value) sec(seciliKanal || ilkKanal,tarihInput.value);
            });
            tarihKutusu.addEventListener('click',function(e){
                if (e.target===tarihInput) return;
                if (typeof tarihInput.showPicker==='function') {
                    try {tarihInput.showPicker();return;} catch (ignored) {}
                }
                tarihInput.focus();
            });
            sec(ilkKanal,ilkTarih);
        });
    }
    if (document.readyState==='loading') {
        document.addEventListener('DOMContentLoaded',function(){kur(document);});
    } else kur(document);
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function(icerik){
            kur(icerik && icerik[0] ? icerik[0] : document);
        });
    }
}());


/* V37: 3 saniyelik 1a/1b/1c TEK ALAN SLAYTI + kanal onceligi; Es.img yedegi
 *      SPACETOON GEZEGENLERI - API HATASINDA BOS SAYMAMA / TEKRAR DENEME */
/* V23: KANALA ÖZEL RESİM / KÜÇÜK KUŞAK-GEZEGEN SİMGESİ */
/* ================================================================
 * YAYIN AKISI V22 - GUNLUK BASLIK + KANALA OZEL GORSEL
 * Bunu mevcut MediaWiki:Common.js DOSYASININ EN SONUNA EKLEYIN.
 * Lua'da yeni dosya-varlik sorgusu yapmaz; sadece goruntulenen kanalin
 * dosyalarini tek tek degil TOPLU MediaWiki API istegiyle dogrular.
 * ================================================================ */
(function () {
  'use strict';
  var KANAL_EK = {
    'Cartoon Network':'CartoonNetwork', 'Cartoonito':'Cartoonito',
    'Boomerang':'Boomerang', 'Nickelodeon':'Nickelodeon',
    'Nickelodeon HD':'NickelodeonHD', 'Nickelodeon SD':'NickelodeonSD',
    'Nicktoons':'Nicktoons', 'Nick Jr.':'NickJr', 'Disney Jr.':'DisneyJr',
    'Disney Channel':'DisneyChannel', 'Disney XD':'DisneyXD',
    'TRT Çocuk':'TRTÇocuk', 'Spacetoon':'Spacetoon'
  };
  var DOSYA = Object.create(null);
  var calisiyor = false, tekrar = false, zamanlayici = 0;
  // V41: Geçici Es/imageinfo hatasında satırları kontrol edilmiş sayıp
  // img/gezegen eksik durumuna KİLİTLEME. Lua'ya ek sorgu yok.
  var tekrarDeneZamanlayici = 0;
  function APIHatasindaYenidenDene(kayitlar, sadeceResimAPI) {
    var herhangi = false, enKucukGecikme = 30000;
    kayitlar.forEach(function(k) {
      var id=String(k.satir.getAttribute('data-ya-dizi')||'').trim().toLocaleLowerCase('tr-TR');
      var eksikEs=!Object.prototype.hasOwnProperty.call(ES_GORSEL_BILGI,id);
      if (!sadeceResimAPI && !eksikEs) return;
      var deneme=Number(k.satir.getAttribute('data-ya-api-deneme')||0);
      if (deneme>=4) return;
      k.satir.setAttribute('data-ya-api-deneme',String(deneme+1));
      k.satir.removeAttribute('data-ya-resim-bakildi');
      herhangi=true;
      enKucukGecikme=Math.min(enKucukGecikme, 4000*(deneme+1));
    });
    if (herhangi && !tekrarDeneZamanlayici) {
      tekrarDeneZamanlayici=window.setTimeout(function() {
        tekrarDeneZamanlayici=0;
        planla();
      },enKucukGecikme);
    }
  }
  function sayfaBasligi() {
    if (!window.mw || !mw.config) return '';
    return String(mw.config.get('wgTitle') || '').replace(/_/g,' ');
  }
  function gunlukBilgi() {
    var es = /^(\d{1,2})\s+(Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık)\s+(\d{4})\s+(.+?)\s+Yayın Akışı$/i.exec(sayfaBasligi());
    return es && Object.prototype.hasOwnProperty.call(KANAL_EK,es[4]) ?
      { kanal:es[4], tarih:es[1]+' '+es[2]+' '+es[3] } : null;
  }
  // V38: Sadece tarihli kanal sayfasinin kucuk ust basligi.
  // Tum program/slayt/gorsel/gezegen kodlari V37 ile ayni kalir.
  var BASLIK_RENK = {
    'Cartoon Network':'#cfd8e3','Cartoonito':'#35cde9',
    'Boomerang':'#8e87fa','Nickelodeon':'#ff7900',
    'Nickelodeon HD':'#ff7900','Nickelodeon SD':'#ff7900',
    'Nicktoons':'#8fdd50','Nick Jr.':'#39cae4',
    'Disney Jr.':'#4d99f5','Disney Channel':'#5eaaff',
    'Disney XD':'#a9d635','TRT Çocuk':'#fac23c','Spacetoon':'#ffe258'
  };
  var BASLIK_LOGO = {
    'Cartoon Network':{yeni:'CN.webp',eski:'Eski CN.webp',gecis:'2011-04-04'},
    'Boomerang':{yeni:'Boomerang.webp'}, 'Cartoonito':{yeni:'Cartoonito.webp'},
    'Nickelodeon':{yeni:'Nickelodeon.webp',eski:'Nickelodeon Eski.webp',gecis:'2023-08-01'},
    'Nickelodeon HD':{yeni:'Nickelodeon.webp',eski:'Nickelodeon Eski.webp',gecis:'2023-08-01'},
    'Nickelodeon SD':{yeni:'Nickelodeon.webp',eski:'Nickelodeon Eski.webp',gecis:'2023-08-01'},
    'Nicktoons':{yeni:'Nicktoons.webp',eski:'Nicktoons Eski.webp',gecis:'2024-05-20'},
    'Nick Jr.':{yeni:'Nick Jr..webp',eski:'Nick JR. Eski.webp',gecis:'2024-02-05'},
    'Disney Jr.':{yeni:'Disney Jr..webp'},
    'Disney Channel':{yeni:'Disney Channel.webp'},
    'Disney XD':{yeni:'Disney XD.webp'},
    'TRT Çocuk':{yeni:'TRT Çocuk.webp',eski:'Eski TRT Çocuk.webp',gecis:'2021-11-01'},
    'Spacetoon':{yeni:'SpacetoonKanalLogo.png'}
  };
  function baslikLogosu(kanal, tarih, hedef) {
    if (!window.mw || typeof mw.Api!=='function') return;
    var cfg=BASLIK_LOGO[kanal]; if (!cfg) return;
    var par=tarih.match(/^(\d{1,2})\s+([^ ]+)\s+(\d{4})$/);
    var aylar=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz',
      'Ağustos','Eylül','Ekim','Kasım','Aralık'];
    var ay=par?aylar.indexOf(par[2])+1:0;
    var iso=par && ay ? par[3]+'-'+String(ay).padStart(2,'0')+'-'+String(par[1]).padStart(2,'0'):'';
    var dosya=cfg.eski && iso && iso<cfg.gecis ? cfg.eski : cfg.yeni;
    // Tek bir API istegi, yalnizca gunluk sayfada. Lua sorgusu yapilmaz.
    new mw.Api().get({action:'query',prop:'imageinfo',iiprop:'url',
      titles:'File:'+dosya,formatversion:2}).then(function(sonuc){
      var sayfa=sonuc && sonuc.query && sonuc.query.pages && sonuc.query.pages[0];
      var adres=sayfa && sayfa.imageinfo && sayfa.imageinfo[0] && sayfa.imageinfo[0].url;
      if (!adres || !hedef.isConnected) return;
      var img=document.createElement('img');
      img.src=adres; img.alt=kanal+' logosu'; img.loading='lazy';
      img.addEventListener('error',function(){hedef.textContent='';
        hedef.classList.remove('ya-ust-logo-var');},{once:true});
      hedef.appendChild(img);
      hedef.classList.add('ya-ust-logo-var');
    }).catch(function(){/* Baslik metin olarak gorunmeye devam eder. */});
  }
  function baslikEkle() {
    var b=gunlukBilgi();
    // Ana Yayın Akışı sayfasında ve sekmeli tarih görünümünde BAŞLIK YOK.
    if (!b || document.querySelector('.ya-wrap') || document.querySelector('.ya-gunluk-ust')) return;
    var ilk=document.querySelector('.mw-parser-output .ya-satir');
    if (!ilk) return;
    var kapsayici=ilk.closest('.mw-parser-output'); if (!kapsayici) return;
    var alt=ilk;
    while (alt.parentNode && alt.parentNode!==kapsayici) alt=alt.parentNode;
    var bolumler=b.tarih.match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
    if (!bolumler) return;

    var ust=document.createElement('section');
    ust.className='ya-gunluk-ust ya-gunluk-ust-v38';
    ust.style.setProperty('--ya-ust-renk',BASLIK_RENK[b.kanal]||'#51c7dc');
    ust.setAttribute('aria-label',b.kanal+' — '+b.tarih+' Yayın Akışı');

    var tarihKarti=document.createElement('div');
    tarihKarti.className='ya-ust-tarih-karti';
    var gun=document.createElement('span'); gun.className='ya-ust-gun';
    gun.textContent=String(parseInt(bolumler[1],10)).padStart(2,'0');
    var ay=document.createElement('span'); ay.className='ya-ust-ay';
    ay.textContent=bolumler[2];
    var yil=document.createElement('span'); yil.className='ya-ust-yil';
    yil.textContent=bolumler[3];
    tarihKarti.appendChild(gun); tarihKarti.appendChild(ay); tarihKarti.appendChild(yil);

    var icerik=document.createElement('div'); icerik.className='ya-ust-icerik';
    var ustYazi=document.createElement('span'); ustYazi.className='ya-ust-ustyazi';
    ustYazi.textContent='TELEVİZYON YAYIN ARŞİVİ';
    var adSatiri=document.createElement('div'); adSatiri.className='ya-ust-ad-satiri';
    var logo=document.createElement('span'); logo.className='ya-ust-logo';
    var ad=document.createElement('strong'); ad.className='ya-gunluk-kanal'; ad.textContent=b.kanal;
    adSatiri.appendChild(logo); adSatiri.appendChild(ad);
    // V41: Yazı artık kanal adının altında değil, başlığın sağ boş alanında.
    var tur=document.createElement('span'); tur.className='ya-ust-orta-baslik';
    tur.textContent='Yayın Akışı';
    icerik.appendChild(ustYazi); icerik.appendChild(adSatiri);
    ust.appendChild(tarihKarti); ust.appendChild(icerik); ust.appendChild(tur);
    kapsayici.insertBefore(ust,alt);
    baslikLogosu(b.kanal,b.tarih,logo);
  }
  function seciliKanal(satir) {
    var wrap=satir.closest('.ya-wrap');
    if (wrap) {
      var node=wrap.querySelector('.ya-secili-kanal');
      return node ? node.textContent.trim() : '';
    }
    var bilgi=gunlukBilgi(); return bilgi ? bilgi.kanal : '';
  }
  function adaylar(satir,kanal) {
    var ek=KANAL_EK[kanal]; if (!ek) return [];
    var id=String(satir.getAttribute('data-ya-dizi')||'').toLocaleLowerCase('tr-TR');
    var no=String(satir.getAttribute('data-ya-bolum')||'');
    if (!/^[a-z0-9çğıöşü_-]{1,75}$/i.test(id)) return [];
    var arr=[];
    // Ilk aday: tam o bolumun o kanaldaki ekran goruntusu.
    if (/^[0-9]+(?:[ab]|-[0-9]+)?$/i.test(no)) arr.push(id+'_'+no+'_'+ek+'.webp');
    // Ayrı HD/SD sekmelerinde yalnız kendi dosyası; birleşik
    // Nickelodeon sekmesinde iki arşiv dosyası da uygun adaydır.
    if (kanal==='Nickelodeon') {
      ['Nickelodeon HD','Nickelodeon SD'].forEach(function(tur){
        if (/^[0-9]+(?:[a-z]|-[0-9]+)?$/i.test(no)) arr.push(id+'_'+no+'_'+tur+'.webp');
        arr.push(id+'_'+tur+'.webp');
      });
    }
    // Ikinci aday: ayni sovun o kanaldaki genel gorseli.
    arr.push(id+'_'+ek+'.webp');
    return arr;
  }
  // V24: minik saat-ustu simgeler. Fandom'da dosyalarin adlari
  // degisse bile |simge=GercekDosyaAdi.webp tercihi her zaman one gecer.
  // Iki kuşak logosu kanal logosu dosyalarindan; gezegen isimleri
  // sadece dosya ADAYLARIDIR, API bulamazsa simge hic gosterilmez.
  var KUSAK_LOGOLARI={
    boomerang:['Boomerang.webp','Boomerang.png'],
    cartoonito:['Cartoonito.webp','Cartoonito.png']
  };
  // Spacetoon gezegenleri: Gorseldeki 9 gezegen. Her biri YALNIZ
  // tek bir kesin PNG dosya adini kullanir; alternatif dosya aramasi yok.
  var GEZEGEN_LOGOLARI={
    macera:  ['Macera Gezegeni.png'],
    komedi:  ['Komedi Gezegeni.png'],
    bilim:   ['Bilim Gezegeni.png'],
    bonbon:  ['Bonbon Gezegeni.png'],
    film:    ['Film Gezegeni.png'],
    abc:     ['ABC Gezegeni.png'],
    aksiyon: ['Aksiyon Gezegeni.png'],
    spor:    ['Spor Gezegeni.png'],
    'pırıltı':['Pırıltı Gezegeni.png']
  };
  // V24 - SPACETOON GEZEGENLERI (TEK MERKEZ)
  // Dizileri yalniz BIR KEZ ilgili gezegen listesine ekleyin.
  // Ornek: macera: ['ABC', 'DEF']  (Bunlar TEMSILI ID'lerdir.)
  // Gunluk yayinda {{Program|ABC|09.00|12}} demek yeterlidir.
  // Var olan Es[ID] |gezegen= kaydi varsa o daha onceliklidir.
  // NOT: Gercek kayitlar verilmedigi icin listeyi yanlis dizi atamadan bos biraktik.
  var SPACETOON_GEZEGEN_PROGRAMLARI = {
    macera:   [],
    komedi:   [],
    bilim:    [],
    bonbon:   [],
    film:     [],
    abc:      [],
    aksiyon:  [],
    spor:     [],
    'pırıltı': []
  };
  var SPACETOON_PROGRAM_GEZEGENI = Object.create(null);
  // V26: Es[ID] gezegen bilgisini gerekirse JavaScript tek sefer okur.
  // Böylece Es'e |gezegen=Aksiyon yazmak için Lua sürümünü değiştirmek gerekmez.
  var ES_GEZEGEN_ONBELLEK = Object.create(null);
  var ES_GEZEGEN_BEKLEYEN = Object.create(null);
  var ES_GEZEGEN_HATA = Object.create(null);
  var ES_GEZEGEN_YENIDEN = Object.create(null);
  function esGezegenleriniOku() {
    var kodlar=[], goruldu=Object.create(null), simdi=Date.now();
    document.querySelectorAll('.ya-satir[data-ya-dizi]').forEach(function(satir) {
      if (seciliKanal(satir)!=='Spacetoon') return;
      if (String(satir.getAttribute('data-ya-gezegen')||'').trim()) return;
      var id=String(satir.getAttribute('data-ya-dizi')||'').trim();
      var k=id.toLocaleLowerCase('tr-TR');
      if (!/^[a-z0-9çğıöşü_-]{1,75}$/i.test(id) || SPACETOON_PROGRAM_GEZEGENI[k]) return;
      if (Object.prototype.hasOwnProperty.call(ES_GEZEGEN_ONBELLEK,k) ||
          ES_GEZEGEN_BEKLEYEN[k] || goruldu[k] ||
          (ES_GEZEGEN_HATA[k]||0)>=3 || (ES_GEZEGEN_YENIDEN[k]||0)>simdi) return;
      goruldu[k]=1; kodlar.push({id:id,anahtar:k});
    });
    if (!kodlar.length) return;
    function tur(parca) {
      var istek=apiAdresi()+'?action=query&format=json&formatversion=2'+
        '&prop=revisions&rvprop=content&rvslots=main&titles='+
        encodeURIComponent(parca.map(function(x){return 'Şablon:Es'+x.id;}).join('|'));
      parca.forEach(function(x){ES_GEZEGEN_BEKLEYEN[x.anahtar]=true;});
      return fetch(istek,{credentials:'same-origin'}).then(function(r) {
        if (!r.ok) throw new Error('Es HTTP '+r.status);
        return r.json();
      }).then(function(json) {
        if (json.error || !json.query || !json.query.pages) throw new Error('Es API sonucu eksik');
        var pages=json.query.pages;
        if (!Array.isArray(pages)) pages=Object.keys(pages).map(function(k){return pages[k];});
        if (!pages.length) throw new Error('Es sayfasi bulunmadi');
        var sonuc=Object.create(null);
        pages.forEach(function(page) {
          var ad=String(page.title||'').replace(/^(?:Şablon|Template):/i,'');
          if (!/^Es.+/i.test(ad)) return;
          var kod=ad.slice(2).toLocaleLowerCase('tr-TR');
          if (Object.prototype.hasOwnProperty.call(page,'missing')) {
            sonuc[kod]=''; return;
          }
          var rev=page.revisions&&page.revisions[0];
          var slot=rev&&rev.slots&&rev.slots.main;
          var raw=(slot&&(slot.content!==undefined?slot.content:slot['*'])) ||
                  (rev&&(rev.content!==undefined?rev.content:rev['*']));
          // API içeriği gerçekten dönmemişse 'gezegen yok' diye kaydetme.
          if (typeof raw!=='string') return;
          var match=/^\s*\|\s*(?:gezegen|spacetoongezegen|spacetoon_gezegen)\s*=\s*([^\r\n|}]+)/im.exec(raw);
          var tur=match?match[1].replace(/<!--.*?-->/g,'').trim().toLocaleLowerCase('tr-TR'):'';
          sonuc[kod]=Object.prototype.hasOwnProperty.call(GEZEGEN_LOGOLARI,tur)?tur:'';
        });
        parca.forEach(function(x) {
          if (Object.prototype.hasOwnProperty.call(sonuc,x.anahtar)) {
            ES_GEZEGEN_ONBELLEK[x.anahtar]=sonuc[x.anahtar];
            ES_GEZEGEN_HATA[x.anahtar]=0;
          } else {
            ES_GEZEGEN_HATA[x.anahtar]=(ES_GEZEGEN_HATA[x.anahtar]||0)+1;
            ES_GEZEGEN_YENIDEN[x.anahtar]=Date.now()+8000*ES_GEZEGEN_HATA[x.anahtar];
          }
        });
        document.querySelectorAll('.ya-satir[data-ya-dizi]').forEach(function(satir) {
          if (seciliKanal(satir)!=='Spacetoon') return;
          var id=String(satir.getAttribute('data-ya-dizi')||'').toLocaleLowerCase('tr-TR');
          if (Object.prototype.hasOwnProperty.call(sonuc,id) && sonuc[id])
            satir.removeAttribute('data-ya-resim-bakildi');
        });
        planla();
      }).catch(function() {
        // Fandom API 403/429 veya ağ hatası: asla 'gezegen yok' kabul etme.
        parca.forEach(function(x) {
          ES_GEZEGEN_HATA[x.anahtar]=(ES_GEZEGEN_HATA[x.anahtar]||0)+1;
          ES_GEZEGEN_YENIDEN[x.anahtar]=Date.now()+8000*ES_GEZEGEN_HATA[x.anahtar];
        });
        var gecikme=8000*Math.max.apply(null,parca.map(function(x){return ES_GEZEGEN_HATA[x.anahtar];}));
        if (gecikme<=24000) setTimeout(planla,gecikme+300);
      }).then(function() {
        parca.forEach(function(x){delete ES_GEZEGEN_BEKLEYEN[x.anahtar];});
      });
    }
    // Her dizinin Es şablonu bir kez sorgulanır; Lua'ya yeni işlem eklenmez.
    kodlar.forEach(function(x){ES_GEZEGEN_BEKLEYEN[x.anahtar]=true;});
    var zincir=Promise.resolve();
    for (var i=0;i<kodlar.length;i+=20) {
      (function(grup){zincir=zincir.then(function(){return tur(grup);});})(kodlar.slice(i,i+20));
    }
  }
  Object.keys(SPACETOON_GEZEGEN_PROGRAMLARI).forEach(function(gezegen){
    SPACETOON_GEZEGEN_PROGRAMLARI[gezegen].forEach(function(id){
      var kod=String(id||'').trim().toLocaleLowerCase('tr-TR');
      if (kod) SPACETOON_PROGRAM_GEZEGENI[kod]=gezegen;
    });
  });
  function gezegenAnahtari(satir) {
    var acik=String(satir.getAttribute('data-ya-gezegen')||'').trim().toLocaleLowerCase('tr-TR');
    if (acik) return acik;
    var id=String(satir.getAttribute('data-ya-dizi')||'').trim().toLocaleLowerCase('tr-TR');
    return ES_GEZEGEN_ONBELLEK[id] || SPACETOON_PROGRAM_GEZEGENI[id] || '';
  }
  function simgeAdaylari(satir,kanal) {
    var elle=String(satir.getAttribute('data-ya-simge')||'').trim();
    if (elle && /^[^<>\|\[\]\r\n]{1,180}\.(?:webp|png|jpe?g|avif|gif)$/i.test(elle)) return [elle];
    var kusak=String(satir.getAttribute('data-ya-kusak')||'').toLocaleLowerCase('tr-TR');
    // Kusak anlik yayina ozel; CN gibi kanallarda birinci onceliktir.
    if (kusak) return KUSAK_LOGOLARI[kusak]||[];
    // Gezegen yalnız SPACETOON'da görünecek. Tek bir merkezî diziden,
    // varsa Es[ID] |gezegen= alanından otomatik bulunur.
    if (kanal==='Spacetoon') {
      var gezegen=gezegenAnahtari(satir);
      return GEZEGEN_LOGOLARI[gezegen]||[];
    }
    return [];
  }
  // V29: Saat ustunde YALNIZCA minik logo. Hicbir gezegen/kusak adi yazilmaz.
  // Boyutlari JS'de sinirlamak, eski CSS onbellegine takilsa bile
  // devasa logolarin ve saat rozetlerinin olusmasini engeller.
  function minikLogoStiliKur() {
    if (document.getElementById('ya-v29-minik-logo-stili')) return;
    var st=document.createElement('style');
    st.id='ya-v29-minik-logo-stili';
    st.textContent=[
      'body .ya-satir .ya-saat .ya-simge-metni{display:none!important}',
      'body .ya-satir .ya-saat > .ya-saat-simge img{width:auto!important;height:auto!important;max-width:42px!important;max-height:30px!important;object-fit:contain!important}',
      'body .ya-satir .ya-saat.ya-saat-simge-var > .ya-saat-simge{width:52px!important;max-width:52px!important;height:32px!important;max-height:32px!important;gap:0!important}',
      'body .ya-satir .ya-saat.ya-saat-simge-var > .ya-saat-sayi{font-size:15px!important;height:33px!important;min-height:33px!important}'

    ].join('\n');
    (document.head||document.documentElement).appendChild(st);
  }
  function kucukSaatLogosu(satir) {
    var saat=satir.querySelector('.ya-saat');
    if (!saat) return;
    var alan=saat.querySelector('.ya-saat-simge');
    if (!alan) return;
    alan.querySelectorAll('.ya-simge-metni').forEach(function(yazi){yazi.remove();});
    // Daha once Lua'nin olusturdugu salt metinleri de temizle.
    Array.prototype.slice.call(alan.childNodes).forEach(function(oge){
      if (oge.nodeType===3 && oge.textContent.trim()) oge.remove();
    });
    saat.style.setProperty('display','flex','important');
    saat.style.setProperty('flex-direction','column','important');
    saat.style.setProperty('align-items','center','important');
    saat.style.setProperty('justify-content','center','important');
    saat.style.setProperty('gap','4px','important');
    saat.style.setProperty('width','80px','important');
    saat.style.setProperty('max-width','100%','important');
    saat.style.setProperty('height','auto','important');
    saat.style.setProperty('min-height','0','important');
    saat.style.setProperty('padding','0','important');
    saat.style.setProperty('background','transparent','important');
    saat.style.setProperty('border','0','important');
    saat.style.setProperty('box-shadow','none','important');
    alan.style.setProperty('display','flex','important');
    alan.style.setProperty('flex-direction','column','important');
    alan.style.setProperty('align-items','center','important');
    alan.style.setProperty('justify-content','center','important');
    alan.style.setProperty('width','52px','important');
    alan.style.setProperty('max-width','52px','important');
    alan.style.setProperty('height','32px','important');
    alan.style.setProperty('max-height','32px','important');
    alan.style.setProperty('margin','0','important');
    alan.style.setProperty('padding','0','important');
    alan.style.setProperty('gap','0','important');
    alan.style.setProperty('border','0','important');
    alan.style.setProperty('background','transparent','important');
    var resim=alan.querySelector('img');
    if (resim) {
      resim.style.setProperty('display','block','important');
      resim.style.setProperty('width','auto','important');
      resim.style.setProperty('height','auto','important');
      resim.style.setProperty('max-width','42px','important');
      resim.style.setProperty('max-height','30px','important');
      resim.style.setProperty('object-fit','contain','important');
      resim.style.setProperty('margin','0','important');
      resim.style.setProperty('padding','0','important');
    }
    var sayi=saat.querySelector('.ya-saat-sayi');
    if (sayi) {
      sayi.style.setProperty('display','flex','important');
      sayi.style.setProperty('align-items','center','important');
      sayi.style.setProperty('justify-content','center','important');
      sayi.style.setProperty('width','80px','important');
      sayi.style.setProperty('max-width','100%','important');
      sayi.style.setProperty('height','33px','important');
      sayi.style.setProperty('min-height','33px','important');
      sayi.style.setProperty('font-size','15px','important');
      sayi.style.setProperty('line-height','1','important');
      sayi.style.setProperty('font-weight','800','important');
      sayi.style.setProperty('padding','0 4px','important');
      sayi.style.setProperty('border-radius','8px','important');
      sayi.style.setProperty('background','var(--ya-dizi-arka,#249eac)','important');
      sayi.style.setProperty('color','var(--ya-dizi-yazi,#fff)','important');
      sayi.style.setProperty('box-sizing','border-box','important');
    }
  }
  function simgeGoster(satir,url,dosyaAdi) {
    if (!url) return;
    var saat=satir.querySelector('.ya-saat');
    if (!saat) return;
    var alan=saat.querySelector('.ya-saat-simge');
    if (!alan) {
      // Dizinin gezegeni merkezî listeden geldiyse Lua boş yere
      // ikon DOM'u üretmez; buradaki tek küçük öğe JS ile oluşturulur.
      alan=document.createElement('span'); alan.className='ya-saat-simge';
      saat.insertBefore(alan,saat.firstChild);
    }
    var resim=alan.querySelector('img');
    if (!resim) {
      resim=document.createElement('img');
      resim.alt=''; resim.loading='lazy'; resim.decoding='async';
      alan.insertBefore(resim,alan.firstChild);
    }
    // Logo URL'si bozulursa Fandom'un eksik Dosya baglantisina don.
    // Lua veya ikinci bir API sorgusu yok.
    resim.onerror=function(){ simgeKirmiziDosya(satir,dosyaAdi); };
    if (resim.getAttribute('src')!==url) resim.src=url;
    // V29: Gezegen/kuşak adı YAZILMAZ, logo tek başına görünür.
    saat.classList.add('ya-saat-simge-var');
    satir.classList.add('ya-simge-goster');
    kucukSaatLogosu(satir);
  }
  // MediaWiki/Fandom standart eksik dosya baglantisi: kirmizi 'new' linki.
  // Yalniz API bir dosyanin GERCEKTEN eksik oldugunu gosterdiginde kullan.
  // Fandom'da [[Dosya:Ad.png]] gibi olmayan dosya baglantisi kirmizi olur.
  // Bu da ayni baglanti adresi ve 'new' sinifini DOM'da kullanir (Lua yok).
  function simgeKirmiziDosya(satir,dosyaAdi) {
    if (!dosyaAdi || !/^[^<>\|\[\]\r\n]{1,180}\.(?:png|webp|jpe?g|gif|avif)$/i.test(dosyaAdi)) return;
    var saat=satir.querySelector('.ya-saat');
    if (!saat) return;
    var alan=saat.querySelector('.ya-saat-simge');
    if (!alan) {
      alan=document.createElement('span');
      alan.className='ya-saat-simge';
      saat.insertBefore(alan,saat.firstChild);
    }
    alan.textContent='';
    var dosyaBasligi='Dosya:'+dosyaAdi;
    var a=document.createElement('a');
    a.className='new'; // MediaWiki'nin kendi kirmizi eksik-sayfa sinifi
    a.textContent=dosyaBasligi;
    a.title=dosyaBasligi+' (sayfa mevcut değil)';
    a.href=(window.mw && mw.util && mw.util.getUrl) ?
      mw.util.getUrl(dosyaBasligi) : '/tr/wiki/'+encodeURIComponent(dosyaBasligi.replace(/ /g,'_'));
    a.style.cssText='color:#d33!important;font-size:10px;line-height:1.25;overflow-wrap:anywhere;text-align:center;text-decoration:none;';
    alan.appendChild(a);
    saat.classList.add('ya-saat-simge-var');
    satir.classList.add('ya-simge-goster');
    kucukSaatLogosu(satir);
  }
  function apiAdresi() {
    return window.mw && mw.util && mw.util.wikiScript ? mw.util.wikiScript('api') : '/tr/api.php';
  }
  function sorgula(adlar) {
    // 40 dosyalik tek istek, ard arda: Fandom'a gereksiz istek yagdirma.
    var url=apiAdresi()+'?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url&iiurlwidth=360&titles='+
      encodeURIComponent(adlar.map(function(s){return 'File:'+s;}).join('|'));
    return fetch(url,{credentials:'same-origin'}).then(function(r){
      if (!r.ok) throw new Error('HTTP '+r.status);
      return r.json();
    }).then(function(json){
      if (json.error) throw new Error(json.error.info||'API hatasi');
      var pages=json.query && json.query.pages || [];
      if (!Array.isArray(pages)) pages=Object.keys(pages).map(function(k){return pages[k];});
      pages.forEach(function(p){
        if (!p.title || !p.imageinfo || !p.imageinfo[0]) return;
        var dosya=String(p.title).replace(/^(?:File|Dosya):/i,'').replace(/_/g,' ');
        var info=p.imageinfo[0];
        DOSYA[dosya.toLocaleLowerCase('tr-TR')]=info.thumburl || info.url || '';
      });
      adlar.forEach(function(ad){
        var k=ad.replace(/_/g,' ').toLocaleLowerCase('tr-TR');
        if (!Object.prototype.hasOwnProperty.call(DOSYA,k)) DOSYA[k]='';
      });
    });
  }
  /* V37 — Es şablonundan bölüm/parça resimleri; yeni Lua sorgusu yok.
   * Tam bölüm 1 ise 1a/1b/1c sırayla 3 sn, 1a/1b ayrıysa tek kare.
   * Her parça için önce yayın kanalının resmi, yoksa mevcut resim seçilir.
   */
  var ES_GORSEL_BILGI=Object.create(null);
  var ES_GORSEL_BEKLEYEN=Object.create(null);
  var KANAL_SON_EKLERI=Object.keys(KANAL_EK).map(function(ad){
    return {ad:ad,ek:KANAL_EK[ad],token:KANAL_EK[ad].toLocaleLowerCase('tr-TR').replace(/[^a-z0-9çğıöşü]/g,'')};
  }).sort(function(a,b){return b.token.length-a.token.length;});
  function esAlanlariniOku(raw){
    var alan=Object.create(null),satirlar=String(raw||'').split(/\r?\n/);
    satirlar.forEach(function(satir){
      var m=/^\s*\|\s*([^=|]+?)\s*=\s*(.*)$/.exec(satir);
      if(m){var k=m[1].trim().toLocaleLowerCase('tr-TR');if(!Object.prototype.hasOwnProperty.call(alan,k)) alan[k]=m[2].trim();}
    });
    return alan;
  }
  function esResimleriniOku(kodlar){
    var eksik=[],goruldu=Object.create(null);
    kodlar.forEach(function(id){
      var k=id.toLocaleLowerCase('tr-TR');
      if(!/^[a-z0-9çğıöşü_-]{1,75}$/i.test(id)||goruldu[k]||
          Object.prototype.hasOwnProperty.call(ES_GORSEL_BILGI,k)||ES_GORSEL_BEKLEYEN[k]) return;
      goruldu[k]=true;eksik.push({id:id,k:k});
    });
    if(!eksik.length) return Promise.resolve();
    var zincir=Promise.resolve();
    for(var i=0;i<eksik.length;i+=20){
      (function(parca){
        zincir=zincir.then(function(){
          parca.forEach(function(o){ES_GORSEL_BEKLEYEN[o.k]=true;});
          var url=apiAdresi()+'?action=query&format=json&formatversion=2'+
            '&prop=revisions&rvprop=content&rvslots=main&titles='+
            encodeURIComponent(parca.map(function(o){return 'Şablon:Es'+o.id;}).join('|'));
          return fetch(url,{credentials:'same-origin'}).then(function(r){
            if(!r.ok) throw new Error('Es HTTP '+r.status);
            return r.json();
          }).then(function(json){
            if(json.error||!json.query||!json.query.pages) throw new Error('Es içeriği alınamadı');
            var pages=json.query.pages;
            if(!Array.isArray(pages)) pages=Object.keys(pages).map(function(k){return pages[k];});
            pages.forEach(function(page){
              var ad=String(page.title||'').replace(/^(?:Şablon|Template):/i,'');
              if(!/^Es.+/i.test(ad)) return;
              var kod=ad.substring(2).toLocaleLowerCase('tr-TR');
              if(Object.prototype.hasOwnProperty.call(page,'missing')){ES_GORSEL_BILGI[kod]=Object.create(null);return;}
              var rev=page.revisions&&page.revisions[0];
              var slot=rev&&rev.slots&&rev.slots.main;
              var raw=slot&&(slot.content!==undefined?slot.content:slot['*']);
              if(typeof raw!=='string' && rev) raw=rev.content!==undefined?rev.content:rev['*'];
              if(typeof raw==='string') {
                var alanlar=esAlanlariniOku(raw);
                ES_GORSEL_BILGI[kod]=alanlar;
                // Gezegen bilgisini AYNI Es sorgusundan al: ikinci API isteği yok.
                var gezegen=String(alanlar.gezegen||alanlar.spacetoongezegen||alanlar.spacetoon_gezegen||'').trim().toLocaleLowerCase('tr-TR');
                if(Object.prototype.hasOwnProperty.call(GEZEGEN_LOGOLARI,gezegen)) ES_GEZEGEN_ONBELLEK[kod]=gezegen;
              }
            });
          }).catch(function(){
            // 403/429 ya da geçici API hatası: mevcut Lua görüntüsünü koru,
            // bölüm görseli veya kanal bilgisi uydurma.
          }).then(function(){parca.forEach(function(o){delete ES_GORSEL_BEKLEYEN[o.k];});});
        });
      })(eksik.slice(i,i+20));
    }
    return zincir;
  }
  function dosyaAdiAyikla(girdi){
    var s=String(girdi||'').trim();if(!s) return '';
    var w=/^\[\[(?:Dosya|File|Image):([^|\]]+)/i.exec(s);
    if(w) s=w[1];
    if(/^https?:\/\//i.test(s)){
      try { s=decodeURIComponent(s.split(/[?#]/)[0].split('/').pop()); }
      catch(e){return '';}
    }
    s=s.replace(/^(?:Dosya|File|Image):/i,'').split(/[;,]/)[0].trim();
    if(!s||s.length>180||/[<>|\[\]{}\r\n]/.test(s)||!/\.(?:png|webp|jpe?g|gif|avif)$/i.test(s)) return '';
    return s;
  }
  function etiketliKanal(dosya){
    var govde=dosya.replace(/\.[^.]+$/,'').toLocaleLowerCase('tr-TR').replace(/[^a-z0-9çğıöşü]/g,'');
    for(var i=0;i<KANAL_SON_EKLERI.length;i++){
      var k=KANAL_SON_EKLERI[i];
      if(govde.endsWith(k.token) || govde.replace(/\d+$/,'').endsWith(k.token)) return k.ad;
    }
    return '';
  }
  // Es şablonlarının |kanal= alanı kanalların kısa ID'lerini içerir.
  // ID tablosu mevcut Modül:YayınAkışı KANAL_ALIASES ile eşleştirilmiştir.
  var ES_KANAL_IDLERI={
    'cn':'Cartoon Network','cartoon network':'Cartoon Network',
    'cntoo':'Cartoonito','cartoonito':'Cartoonito',
    'bmg':'Boomerang','boomerang':'Boomerang',
    'nick':'Nickelodeon','nickelodeon':'Nickelodeon',
    'nickelodeon hd':'Nickelodeon HD','nickelodeon sd':'Nickelodeon SD',
    'nickt':'Nicktoons','nicktoons':'Nicktoons',
    'nickj':'Nick Jr.','nick jr.':'Nick Jr.','nick jr':'Nick Jr.',
    'disj':'Disney Jr.','disney jr.':'Disney Jr.','disney jr':'Disney Jr.',
    'disc':'Disney Channel','disney channel':'Disney Channel',
    'xd':'Disney XD','disney xd':'Disney XD',
    'trtç':'TRT Çocuk','trt çocuk':'TRT Çocuk','trtçocuk':'TRT Çocuk',
    'stoon':'Spacetoon','spacetoon':'Spacetoon'
  };
  function esKanallariniOku(alan){
    if(!alan)return [];
    var kayit=String(alan.kanal||alan.kanallar||alan.yayinkanali||alan.yayin_kanali||'').trim();
    if(!kayit)return [];
    // [[Kanal|görünen ad]] gibi wiki bağlantılarını da sadeleştir.
    var sade=kayit.replace(/\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g,'$1')
      .replace(/<br\s*\/?\s*>/gi,',')
      .replace(/\s+\/\s+/g,',');
    var bul=Object.create(null),sonuc=[],bilinmeyen=false;
    sade.split(/[,;|\n]+/).forEach(function(parca){
      var kod=parca.trim().toLocaleLowerCase('tr-TR').replace(/\s+/g,' ');
      if(!kod)return;
      var kanal=ES_KANAL_IDLERI[kod];
      if(!kanal){bilinmeyen=true;return;}
      if(!bul[kanal]){bul[kanal]=true;sonuc.push(kanal);}
    });
    // Tanınmayan ID varsa tek kanallı olduğundan EMİN olamayız.
    return bilinmeyen?[]:sonuc;
  }
  function tekYayinKanali(alan){
    var kanallar=esKanallariniOku(alan);
    return kanallar.length===1?kanallar[0]:'';
  }
  // Kanal ayrımı olmayan Nickelodeon için hem HD hem SD görüntüleri
  // geçerlidir. HD/SD tarihsel olarak ayrı sekmeyse birbirine karışmaz.
  function kanalGorselUygunMu(kayitKanal, seciliKanal){
    if (kayitKanal===seciliKanal) return true;
    if (seciliKanal==='Nickelodeon')
      return kayitKanal==='Nickelodeon HD'||kayitKanal==='Nickelodeon SD';
    if ((seciliKanal==='Nickelodeon HD'||seciliKanal==='Nickelodeon SD') && kayitKanal==='Nickelodeon')
      return true; // Kanal belirtilmemiş ortak Nickelodeon dosyası.
    return false;
  }
  // Ör. sb_1a_CNBC-e.webp gibi bilinmeyen kanal ekini yanlışlıkla
  // "etiketsiz resim" sayıp Nick/Spacetoon yayınında göstermeyi önler.
  function dosyadaKanalEkiVarMi(dosya){
    var govde=String(dosya||'').replace(/\.[^.]+$/,'');
    return /(?:^|[_\s-])\d+[a-z]?(?:[_\s-]\d+)?[_\s-][^_\s]+/i.test(govde);
  }
  // 1resim=1a_A.webp;1a_B.webp;1b_A.webp biçimindeki TÜM
  // adları oku. Önceki sürüm yalnızca ilk dosyayı alıyordu.
  function resimAlaniniListele(deger){
    return String(deger||'').split(';').map(dosyaAdiAyikla).filter(Boolean);
  }
  function dosyaninBolumKismi(dosya){
    var govde=String(dosya||'').replace(/\.[^.]+$/,'');
    var m=/(?:^|[_\s-])(\d+[a-z]?)(?=[_\s-]|$)/i.exec(govde);
    return m?m[1].toLocaleLowerCase('tr-TR'):'';
  }
  // Her yayindaki bölümün PARÇALARINI ayrı tut.
  // 1resim=...1a...;...1b...;...1c... -> 1a,1b,1c ayrı slaytlar.
  // 1a yayını -> yalnız 1a; 1b yayını -> yalnız 1b.
  // Aynı parçada kanala özel resim önceliklidir. Başka kanalın resmi
  // yalnız son yedek olarak kullanılır. Üstteki genel dizi img son çare.
  function esBolumGruplari(satir,kanal){
    var id=String(satir.getAttribute('data-ya-dizi')||'').trim().toLocaleLowerCase('tr-TR');
    var no=String(satir.getAttribute('data-ya-bolum')||'').trim().toLocaleLowerCase('tr-TR');
    var alan=ES_GORSEL_BILGI[id];
    if(!alan||!no) return [];
    var istenen=(no.match(/\d+[a-z]?/g)||[]);
    if(!istenen.length) return [];
    var yalnizTamBolum=/^\d+$/.test(no);
    var temel=/^\d+/.exec(no);
    if(!temel) return [];
    temel=temel[0];
    var taranacak=[],eklenen=Object.create(null);
    function ekle(ad){
      if(ad&&!eklenen[ad]){eklenen[ad]=true;taranacak.push(ad);}
    }
    istenen.forEach(function(p){ekle(p+'resim');});
    ekle(temel+'resim');
    // 1aresim, 1bresim gibi AYRI alanlar da tek bölüm 1'den bulunabilsin.
    if(yalnizTamBolum){
      Object.keys(alan).filter(function(k){
        return new RegExp('^'+temel+'[a-z]resim$').test(k);
      }).sort().forEach(ekle);
    }
    var kayitlar=[],goruldu=Object.create(null);
    taranacak.forEach(function(alanAdi){
      var alanNo=alanAdi.slice(0,-5); // '1aresim' -> '1a'
      resimAlaniniListele(alan[alanAdi]).forEach(function(dosya){
        var key=dosya.toLocaleLowerCase('tr-TR');
        if(goruldu[key])return;
        var dosyaNo=dosyaninBolumKismi(dosya);
        // Dosya adinda bölüm belirtildiyse onun gerçek parçasını esas al.
        // 'mh22_2a.webp' = 2a, 'mh22_2b.webp' = 2b.
        var parca=(dosyaNo && dosyaNo.indexOf(temel)===0)?dosyaNo:alanNo;
        if(!/^\d+[a-z]?$/.test(parca) || parseInt(parca,10)!==parseInt(temel,10))return;
        goruldu[key]=1;
        var etiket=etiketliKanal(dosya);
        var kanalSirasi=etiket?(kanalGorselUygunMu(etiket,kanal)?0:2):1;
        kayitlar.push({ad:dosya,parca:parca,kanalSirasi:kanalSirasi,sira:kayitlar.length});
      });
    });
    // Tam bölüm (1): 1a/1b/1c ... hepsi sıra ile.
    // Ayrı bölüm (1a): yalnız 1a. Ayrı parça mevcut değilse
    // ortak '1' resmi kullanılır; başka parçanın resmi ASLA kullanılmaz.
    var parcalar=[];
    if(yalnizTamBolum){
      var gorulen=Object.create(null);
      kayitlar.forEach(function(k){
        if(k.parca!==temel && /^\d+[a-z]$/.test(k.parca))gorulen[k.parca]=true;
      });
      parcalar=Object.keys(gorulen).sort(function(a,b){return a.localeCompare(b,'tr');});
      if(!parcalar.length)parcalar=[temel];
    }else{
      parcalar=istenen.filter(function(p,i,l){return l.indexOf(p)===i;});
    }
    return parcalar.map(function(parca){
      var aday=kayitlar.filter(function(k){return k.parca===parca;});
      var ortak=kayitlar.filter(function(k){return k.parca===temel;});
      var liste=(aday.length?aday:ortak);
      liste.sort(function(a,b){return a.kanalSirasi-b.kanalSirasi||a.sira-b.sira;});
      return liste.map(function(k){return k.ad;});
    }).filter(function(g){return g.length>0;});
  }
  // V37: Tek resim alanında otomatik 3 saniyelik parça geçişi.
  // 3a/3b ayrı yayınlanırsa slayt kurulmaz; '3' ise a ve b sırayla gelir.
  var GORSEL_YEDEKLERI=new WeakMap();
  var SLAYTLAR=new Map();
  var SLAYT_ZAMANLAYICI=0;
  function yedekResmiSakla(yer){
    if(!GORSEL_YEDEKLERI.has(yer))
      GORSEL_YEDEKLERI.set(yer,Array.prototype.slice.call(yer.childNodes).map(function(n){return n.cloneNode(true);}));
  }
  function orijinalGorseleDon(satir){
    SLAYTLAR.delete(satir);
    var yer=satir.querySelector('.ya-gorsel');
    if(!yer||!GORSEL_YEDEKLERI.has(yer))return;
    var once=GORSEL_YEDEKLERI.get(yer);
    yer.classList.remove('ya-es-galeri');
    yer.replaceChildren.apply(yer,once.map(function(n){return n.cloneNode(true);}));
  }
  function slaytResminiYukle(kayit){
    if(!kayit.urls.length){orijinalGorseleDon(kayit.satir);return;}
    var url=kayit.urls[kayit.sira];
    var img=kayit.img;
    img.onerror=function(){
      if(SLAYTLAR.get(kayit.satir)!==kayit)return;
      kayit.urls.splice(kayit.sira,1); // Yüklenemeyen resmi geç.
      if(!kayit.urls.length){orijinalGorseleDon(kayit.satir);return;}
      kayit.sira=kayit.sira%kayit.urls.length;
      slaytResminiYukle(kayit);
    };
    img.removeAttribute('srcset');
    img.removeAttribute('data-srcset');
    if(img.hasAttribute('data-src')) img.setAttribute('data-src',url);
    if(img.getAttribute('src')!==url)img.src=url;
  }
  function slaytSaatiBaslat(){
    if(SLAYT_ZAMANLAYICI)return;
    SLAYT_ZAMANLAYICI=window.setInterval(function(){
      SLAYTLAR.forEach(function(kayit,satir){
        if(!satir.isConnected){SLAYTLAR.delete(satir);return;}
        if(document.hidden||!satir.getClientRects().length)return;
        if(seciliKanal(satir)!==kayit.kanal){SLAYTLAR.delete(satir);return;}
        if(kayit.urls.length<2)return;
        kayit.sira=(kayit.sira+1)%kayit.urls.length;
        slaytResminiYukle(kayit);
      });
      if(!SLAYTLAR.size){window.clearInterval(SLAYT_ZAMANLAYICI);SLAYT_ZAMANLAYICI=0;}
    },3000);
  }
  function slaytKur(satir,urls,kanal){
    var yer=satir.querySelector('.ya-gorsel');
    if(!yer)return;
    if(!urls.length){orijinalGorseleDon(satir);return;}
    var onceki=SLAYTLAR.get(satir);
    if(onceki&&onceki.kanal===kanal&&onceki.urls.join('\n')===urls.join('\n'))return;
    yedekResmiSakla(yer);
    // Eski V35 çoklu resim ızgarası varsa tamamını kaldır,
    // programın normal tek görsel kabını yeniden oluştur.
    if(yer.classList.contains('ya-es-galeri')){
      var orijinal=GORSEL_YEDEKLERI.get(yer);
      yer.classList.remove('ya-es-galeri');
      yer.replaceChildren.apply(yer,orijinal.map(function(n){return n.cloneNode(true);}));
    }
    var img=yer.querySelector('img');
    if(!img){
      img=document.createElement('img');img.alt='';img.loading='lazy';
      yer.textContent='';yer.appendChild(img);
    }
    var kayit={satir:satir,kanal:kanal,yer:yer,img:img,urls:urls.slice(),sira:0};
    SLAYTLAR.set(satir,kayit);
    slaytResminiYukle(kayit);
    if(urls.length>1)slaytSaatiBaslat();
  }
  // Her grup bir bölüm PARÇASIDIR. O parçanın yalnızca bir kanal
  // görselini seç, diğer parçalar aynı img'de sırayla dönsün.
  function uygunSlaytResimleri(kayit){
    var urls=[],goruldu=Object.create(null);
    (kayit.esGruplar||[]).forEach(function(grup){
      for(var i=0;i<grup.length;i++){
        var key=grup[i].replace(/_/g,' ').toLocaleLowerCase('tr-TR');
        if(DOSYA[key]){
          if(!goruldu[DOSYA[key]]){urls.push(DOSYA[key]);goruldu[DOSYA[key]]=true;}
          break;
        }
      }
    });
    if(urls.length)return urls;
    // Es'de hiç resim bulunamadıysa daha önceki kanal-adı adayları.
    var adaylar=kayit.adlar||[];
    for(var j=0;j<adaylar.length;j++){
      var dosya=adaylar[j].replace(/_/g,' ').toLocaleLowerCase('tr-TR');
      if(DOSYA[dosya])return [DOSYA[dosya]];
    }
    return []; // Lua'nın mevcut img çıktısını koru.
  }
  function uygula(kayit){
    var satir=kayit.satir;
    if(!satir.isConnected||seciliKanal(satir)!==kayit.kanal)return;
    slaytKur(satir,uygunSlaytResimleri(kayit),kayit.kanal);
    var simgeBulundu=false;
    for(var j=0;j<kayit.simgeler.length;j++){
      var anahtar=kayit.simgeler[j].replace(/_/g,' ').toLocaleLowerCase('tr-TR');
      if(DOSYA[anahtar]){simgeGoster(satir,DOSYA[anahtar],kayit.simgeler[j]);simgeBulundu=true;break;}
    }
    var kontrolTamam=kayit.simgeler.length&&kayit.simgeler.every(function(ad){
      return Object.prototype.hasOwnProperty.call(DOSYA,ad.replace(/_/g,' ').toLocaleLowerCase('tr-TR'));
    });
    if(kontrolTamam&&!simgeBulundu)simgeKirmiziDosya(satir,kayit.simgeler[0]);
  }
  function guncelle(){
    if(calisiyor){tekrar=true;return;}
    baslikEkle();
    // Es şablonu görsel ve gezegen bilgisi için TEK TOPLU JS isteğiyle okunur.
    var kayitlar=[],idSet=Object.create(null),ids=[];
    document.querySelectorAll('.ya-satir[data-ya-dizi]').forEach(function(satir){
      var kanal=seciliKanal(satir);if(!KANAL_EK[kanal])return;
      if(satir.getAttribute('data-ya-resim-bakildi')===kanal)return;
      satir.setAttribute('data-ya-resim-bakildi',kanal);
      var id=String(satir.getAttribute('data-ya-dizi')||'').trim();
      var key=id.toLocaleLowerCase('tr-TR');
      if(!idSet[key]){idSet[key]=true;ids.push(id);}
      kayitlar.push({satir:satir,kanal:kanal,adlar:adaylar(satir,kanal),simgeler:[]});
    });
    if(!kayitlar.length)return;
    calisiyor=true;
    esResimleriniOku(ids).then(function(){
      var aranan=Object.create(null);
      kayitlar.forEach(function(kayit){
        var diziKodu=String(kayit.satir.getAttribute('data-ya-dizi')||'').trim().toLocaleLowerCase('tr-TR');
        var esAlanlari=ES_GORSEL_BILGI[diziKodu];
        var tekKanal=tekYayinKanali(esAlanlari);
        kayit.esGruplar=esBolumGruplari(kayit.satir,kayit.kanal);
        // Tek kanalli dizide bölüm resimleri Es'de varsa dosya adi tahmin etme.
        if(tekKanal && kayit.esGruplar.length) kayit.adlar=[];
        kayit.simgeler=simgeAdaylari(kayit.satir,kayit.kanal);
        var esDosyalari=[].concat.apply([],kayit.esGruplar);
        esDosyalari.concat(kayit.adlar,kayit.simgeler).forEach(function(ad){
          var key=ad.replace(/_/g,' ').toLocaleLowerCase('tr-TR');
          if(!Object.prototype.hasOwnProperty.call(DOSYA,key))aranan[ad]=true;
        });
      });
      var adlar=Object.keys(aranan),zincir=Promise.resolve();
      var resimApiHatasi=false;
      for(var i=0;i<adlar.length;i+=40){
        (function(grup){zincir=zincir.then(function(){
          return sorgula(grup).catch(function(){resimApiHatasi=true;});
        });})(adlar.slice(i,i+40));
      }
      return zincir.then(function(){
        // Gezegenin ve bölümün gerçek görselleri Es verisiyle gelir;
        // API başarısızsa Lua'nın mevcut img'sini geçici olarak koru.
        APIHatasindaYenidenDene(kayitlar,resimApiHatasi);
      });
    }).catch(function(){
      // 403/429 veya bağlantı hatası: ekranı silmeden sonra tekrar dene.
      APIHatasindaYenidenDene(kayitlar,true);
    }).then(function(){kayitlar.forEach(uygula);}).then(function(){
      calisiyor=false;if(tekrar){tekrar=false;planla();}
    });
  }
  function planla() {
    if (zamanlayici) clearTimeout(zamanlayici);
    zamanlayici=setTimeout(function(){zamanlayici=0;guncelle();},120);
  }
  function baslat() {
    if (!document.body || document.body.getAttribute('data-ya-v22-init')==='1') return;
    minikLogoStiliKur();
    document.body.setAttribute('data-ya-v22-init','1');
    planla();
    var mo=new MutationObserver(function(list){
      // Degisen resim src ozelligini izlemiyoruz, yalniz kart/liste eklenmesini.
      for(var i=0;i<list.length;i++) {
        if(list[i].addedNodes.length || list[i].removedNodes.length){planla();return;}
      }
    });
    mo.observe(document.body,{subtree:true,childList:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',baslat);
  else baslat();
}());