/* Çizgi ve Dizi Ansiklopedisi — Bölüm Listesi: görsel büyütme + arama + rastgele bölüm
 * Common.js içindeki ESKİ "Bölüm listesi özel görsel büyütücü" BLOĞUNUN YERİNE koyun.
 * Eski bloğun altına ikinci kez eklemeyin (eski kurulum koruması yeni kodu engeller).
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
        '.cdb-bolum-sonuc:focus-visible{outline:2px solid #6eabff;outline-offset:2px;}',
        '.cdb-bolum-sonuc-yok{font-size:12px;opacity:.65;}',
        '.cdb-rastgele-arkaplan{position:fixed;inset:0;z-index:2147483599;display:flex;',
        'justify-content:center;align-items:center;padding:18px;background:rgba(5,9,20,.86);',
        'opacity:0;visibility:hidden;transition:opacity .24s ease,visibility .24s ease;}',
        '.cdb-rastgele-arkaplan[hidden]{display:none!important;}',
        '.cdb-rastgele-arkaplan.is-open{opacity:1;visibility:visible;}',
        '.cdb-rastgele-kart{position:relative;width:min(450px,100%);max-height:90dvh;',
        'overflow-y:auto;box-sizing:border-box;padding:16px;border-radius:17px;',
        'background:#152a49;color:#f3f7ff;box-shadow:0 18px 70px rgba(0,0,0,.5);',
        'transform:translateY(8px) scale(.985);transition:transform .24s ease;}',
        '.cdb-rastgele-arkaplan.is-open .cdb-rastgele-kart{transform:translateY(0) scale(1);}',
        '.cdb-rastgele-kapat{position:absolute;top:10px;right:10px;width:36px;height:36px;',
        'border-radius:9px;border:0;background:rgba(255,255,255,.12);color:white;',
        'font-size:24px;cursor:pointer;z-index:2;}',
        '.cdb-rastgele-baslik{font-size:16px;font-weight:750;margin:3px 40px 12px 2px;}',
        '.cdb-rastgele-gorsel{display:flex;justify-content:center;align-items:center;',
        'height:192px;border-radius:11px;overflow:hidden;background:#2b3a54;margin-bottom:12px;}',
        '.cdb-rastgele-gorsel img{display:block;width:100%;height:100%;object-fit:contain;}',
        '.cdb-rastgele-gorsel-yok{font-size:13px;color:#bdc7d8;}',
        '.cdb-rastgele-meta{font-size:12px;color:#bed6ff;margin-bottom:7px;}',
        '.cdb-rastgele-ad{font-size:20px;font-weight:760;line-height:1.35;overflow-wrap:anywhere;}',
        '.cdb-rastgele-orijinal{font-size:13px;color:#b7c3d6;margin-top:5px;overflow-wrap:anywhere;}',
        '.cdb-rastgele-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:17px;}',
        '.cdb-rastgele-actions a,.cdb-rastgele-actions button{flex:1 1 130px;display:flex;',
        'justify-content:center;align-items:center;border-radius:9px;padding:11px 13px;',
        'border:1px solid #59729c;background:#274269;color:#fff;text-decoration:none!important;',
        'font-size:13px;font-weight:700;cursor:pointer;}',
        '.cdb-rastgele-actions .cdb-rastgele-yeni{background:#397dea;border-color:#397dea;}',
        '.cdb-rastgele-actions .cdb-rastgele-pasif{opacity:.65;cursor:not-allowed;}',
        '.cdb-rastgele-actions a[hidden]{display:none!important;}',
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
    function readEpisodes(root) {
        var cards = root.querySelectorAll('.dizi-liste-kart');
        var episodes = [];
        Array.prototype.forEach.call(cards, function (card) {
            var id = (card.id || '').match(/^cdb-card-(\d+)-(.+)$/);
            if (!id) return;
            var titleLink = card.querySelector('.dizi-liste-ad a[href]');
            var titleEl = card.querySelector('.dizi-liste-ad');
            var title = titleEl ? titleEl.textContent.trim() : '';
            if (!title) return;
            var originalEl = card.querySelector('.dizi-liste-engad');
            var badge = card.querySelector('.dizi-liste-no');
            var imageEl = card.querySelector('.dizi-liste-gorsel img');
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
                    logo: logoNode ? (logoNode.currentSrc || logoNode.src || '') : ''
                };
            }).filter(function (record) { return record.channel || record.date; });
            if (!broadcasts.length) {
                var dateElement = card.querySelector('.dizi-liste-tarih');
                if (dateElement && dateElement.textContent.trim()) {
                    broadcasts = [{channel: '', date: dateElement.textContent.trim(), logo: ''}];
                }
            }
            episodes.push({
                season: id[1], no: id[2], seasonNumber: badge ? badge.textContent.trim() : '',
                title: title, original: originalEl ? originalEl.textContent.trim() : '',
                broadcasts: broadcasts,
                image: imageEl ? (imageEl.currentSrc || imageEl.src) : '',
                link: titleLink ? titleLink.href : '',
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
        return ep.season + '. Sezon · ' + ep.no + '. Bölüm';
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
    function appendBroadcasts(parent, broadcasts) {
        if (!broadcasts || !broadcasts.length) return;
        var wrap = element('div', 'cdb-bolum-sonuc-yayinlar');
        broadcasts.forEach(function (rec) {
            var record = element('span', 'cdb-bolum-sonuc-yayin');
            if (rec.logo) {
                var logo = element('img');
                logo.src = rec.logo;
                logo.alt = '';
                logo.loading = 'lazy';
                record.appendChild(logo);
            }
            if (rec.channel) record.appendChild(element('span', 'cdb-bolum-sonuc-kanal', rec.channel));
            if (rec.channel && rec.date) record.appendChild(element('span', '', '—'));
            if (rec.date) record.appendChild(element('span', 'cdb-bolum-sonuc-tarih', rec.date));
            wrap.appendChild(record);
        });
        parent.appendChild(wrap);
    }
    function resultRow(ep) {
        var row = element(ep.exists ? 'a' : 'div', 'cdb-bolum-sonuc');
        if (ep.exists) row.href = ep.link;
        row.appendChild(element('span', 'cdb-bolum-sonuc-no', ep.no));
        var middle = element('span', 'cdb-bolum-sonuc-metin');
        middle.appendChild(element('span', 'cdb-bolum-sonuc-ad', ep.title));
        var sub = episodeDescription(ep) + (ep.original ? ' · ' + ep.original : '');
        middle.appendChild(element('span', 'cdb-bolum-sonuc-alt', sub));
        // Iki veya daha cok yayin tarihi varsa HER BIRINI kanaliyla goster.
        appendBroadcasts(middle, ep.broadcasts);
        row.appendChild(middle);
        return row;
    }
    var modal = null, modalFocus = null, modalOverflow = '', currentEpisodes = [], lastRandom = -1;
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
            '<div class="cdb-rastgele-meta"></div><div class="cdb-rastgele-ad"></div>' +
            '<div class="cdb-rastgele-orijinal"></div><div class="cdb-rastgele-yayinlar"></div>' +
            '<div class="cdb-rastgele-actions"><a class="cdb-rastgele-git">Bölüme Git</a>' +
            '<button class="cdb-rastgele-yeni" type="button">🔀 Başka Bölüm Seç</button></div>' +
            '</div>';
        document.body.appendChild(modal);
        modal.querySelector('.cdb-rastgele-kapat').addEventListener('click', closeRandom);
        modal.addEventListener('click', function (ev) { if (ev.target === modal) closeRandom(); });
        modal.querySelector('.cdb-rastgele-yeni').addEventListener('click', chooseRandom);
    }
    function chooseRandom() {
        if (!currentEpisodes.length) return;
        var index = Math.floor(Math.random() * currentEpisodes.length);
        if (currentEpisodes.length > 1 && index === lastRandom) {
            index = (index + 1 + Math.floor(Math.random() * (currentEpisodes.length - 1))) % currentEpisodes.length;
        }
        lastRandom = index;
        var ep = currentEpisodes[index];
        var holder = modal.querySelector('.cdb-rastgele-gorsel');
        while (holder.firstChild) holder.removeChild(holder.firstChild);
        if (ep.image) {
            var img = element('img');
            img.src = ep.image;
            img.alt = ep.title + ' bölüm görseli';
            img.loading = 'eager';
            img.onerror = function () {
                holder.textContent = '';
                holder.appendChild(element('span', 'cdb-rastgele-gorsel-yok', 'Görsel yüklenemedi'));
            };
            holder.appendChild(img);
        } else holder.appendChild(element('span', 'cdb-rastgele-gorsel-yok', 'Görsel bulunmuyor'));
        modal.querySelector('.cdb-rastgele-meta').textContent = episodeDescription(ep);
        modal.querySelector('.cdb-rastgele-ad').textContent = ep.title;
        modal.querySelector('.cdb-rastgele-orijinal').textContent = ep.original;
        var randomBroadcasts = modal.querySelector('.cdb-rastgele-yayinlar');
        randomBroadcasts.textContent = '';
        appendBroadcasts(randomBroadcasts, ep.broadcasts);
        var go = modal.querySelector('.cdb-rastgele-git');
        if (ep.exists) {
            go.hidden = false;
            go.href = ep.link;
            go.classList.remove('cdb-rastgele-pasif');
            go.removeAttribute('aria-disabled');
            go.tabIndex = 0;
        } else {
            go.hidden = true;
            go.removeAttribute('href');
            go.classList.add('cdb-rastgele-pasif');
            go.setAttribute('aria-disabled', 'true');
            go.tabIndex = -1;
        }
    }
    function openRandom(episodes, trigger) {
        if (!episodes.length) return;
        setupRandomModal();
        currentEpisodes = episodes;
        lastRandom = -1;
        modalFocus = trigger;
        modalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        chooseRandom();
        animateOpen(modal);
        setFocusableFocus(modal.querySelector('.cdb-rastgele-kapat'));
    }
    function closeRandom() {
        if (!modal || modal.hidden || !modal.classList.contains('is-open')) return;
        animateClose(modal);
        document.body.style.overflow = modalOverflow;
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
            matching.slice(0, max).forEach(function (ep) { results.appendChild(resultRow(ep)); });
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