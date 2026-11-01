/**
 * Cizgi ve Dizi Ansiklopedisi - Bolum Listesi, hashsiz gezinme + bolum ozetleri (surum 4.3: mevcut ozellikler + Bolum Kisim URL hash temizleme)
 * MediaWiki:BolumListesiHashsiz.js sayfasina yapistirin.
 * MediaWiki:ImportJS icine sadece: BolumListesiHashsiz.js
 *
 * Lua'daki mevcut sezon/kart/tablo baglantilarini korur.
 * Tiklamalari JavaScript ile yonetir, #... eklemez.
 */
(function () {
    'use strict';

    // Ayni sayfada script iki kez yuklenirse ikinci kez isleyici ekleme.
    if (window.__cdbBolumListesiHashsizVersion) return;
    window.__cdbBolumListesiHashsizVersion = '4.3';

    var targetPattern = /^(?:sezon-\d+|liste-sezon-\d+|liste-sezon-kapat|dizi-gorunum-(?:kart|tablo))$/;
    var styleId = 'cdb-bolum-hashsiz-stil';

    function addStyle() {
        if (document.getElementById(styleId)) return;
        var style = document.createElement('style');
        style.id = styleId;
        style.textContent = [
            '.dizi-liste .dizi-liste-akordeon.cdb-hashsiz-etkin .dizi-liste-akordeon-panel{display:none!important}',
            '.dizi-liste .dizi-liste-akordeon.cdb-hashsiz-etkin .dizi-liste-akordeon-blok.cdb-sezon-acik>.dizi-liste-akordeon-panel{display:block!important}',
            '.dizi-liste .dizi-liste-akordeon.cdb-hashsiz-etkin .dizi-liste-akordeon-ac{display:inline!important}',
            '.dizi-liste .dizi-liste-akordeon.cdb-hashsiz-etkin .dizi-liste-akordeon-kapat{display:none!important}',
            '.dizi-liste .dizi-liste-akordeon.cdb-hashsiz-etkin .dizi-liste-akordeon-blok.cdb-sezon-acik .dizi-liste-akordeon-ac{display:none!important}',
            '.dizi-liste .dizi-liste-akordeon.cdb-hashsiz-etkin .dizi-liste-akordeon-blok.cdb-sezon-acik .dizi-liste-akordeon-kapat{display:inline!important}',
            '.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-tablo .dizi-liste-kart-gorunumu{display:none!important}',
            '.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-tablo .dizi-liste-tablo-gorunumu{display:flex!important;flex-direction:column;gap:22px}',
            '.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-kart .dizi-liste-tablo-gorunumu{display:none!important}',
            '.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-kart .dizi-liste-kart-gorunumu{display:block!important}',
            '.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-tablo .dizi-liste-kart-dugme a,.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-kart .dizi-liste-tablo-dugme a{background:transparent!important;color:var(--cdb-main)!important}',
            '.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-tablo .dizi-liste-tablo-dugme a,.dizi-liste .dizi-liste-gorunumler.cdb-hashsiz-kart .dizi-liste-kart-dugme a{background:linear-gradient(135deg,#367ffc,#2051d9)!important;color:white!important}',
            '.dizi-liste .dizi-liste-akordeon-blok,.dizi-liste .dizi-liste-tablo-sezon-blok{scroll-margin-top:100px}',
            // Bolum ozetleri: kartta en cok uc, tabloda bir satir.
            // JS calismiyorsa bu stiller eklenmez ve metin eksiksiz gorunur.
            '.dizi-liste .cdb-bolum-ozet{min-width:0;margin-top:5px;font-weight:400}',
            '.dizi-liste .cdb-bolum-ozet-metin{display:block;min-width:0;font-size:12px;line-height:1.45;color:var(--cdb-quiet,#777);white-space:normal;overflow-wrap:anywhere}',
            '.dizi-liste .cdb-bolum-ozet.cdb-ozet-etkin:not(.cdb-ozet-acik) .cdb-bolum-ozet-metin{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}',
            '.dizi-liste .cdb-bolum-ozet.cdb-ozet-tablo.cdb-ozet-etkin:not(.cdb-ozet-acik) .cdb-bolum-ozet-metin{-webkit-line-clamp:1}',
            '.dizi-liste .cdb-bolum-ozet-parca+.cdb-bolum-ozet-parca{margin-left:6px}',
            '.dizi-liste .cdb-bolum-ozet-dugme{margin-top:3px;font-size:11px;font-weight:650;line-height:1.45;color:var(--cdb-main,#367ffc);cursor:pointer;user-select:none}',
            '.dizi-liste .cdb-bolum-ozet-dugme:focus-visible{outline:2px solid var(--cdb-main,#367ffc);outline-offset:3px;border-radius:3px}',
            '.dizi-liste .dizi-tablo-bolumadi .cdb-bolum-ozet{margin-top:3px}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function targetFromLink(link) {
        var saved = link.getAttribute('data-cdb-hashsiz');
        if (saved && targetPattern.test(saved)) return saved;

        // Fandom sayfa adreslerini farkli yazabilir (URL kodlamasi,
        // yonlendirme vb.). Bu nedenle eski surumdeki pathname/search
        // birebir esitligi kontrolunu kullanmiyoruz.
        var href = link.getAttribute('href') || '';
        var hashPosition = href.indexOf('#');
        if (hashPosition < 0) return '';
        var target;
        try { target = decodeURIComponent(href.slice(hashPosition + 1)); }
        catch (e) { return ''; }
        if (!targetPattern.test(target)) return '';
        try {
            var address = new URL(href, location.href);
            if (address.origin !== location.origin) return '';
        } catch (e) { return ''; }
        return target;
    }

    function prepareLinks(scope) {
        var root = scope || document;
        var links = root.querySelectorAll ? root.querySelectorAll('.dizi-liste a[href*="#"]') : [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var target = targetFromLink(link);
            if (!target) continue;
            // URL'de ve linkin uzerine gelince #... gorunmesin.
            link.setAttribute('data-cdb-hashsiz', target);
            link.setAttribute('href', location.pathname + location.search);
        }
    }

    // Tek bir olay dinleyicisi tum kart ve tablo ozetlerini yonetir.
    // Yalnizca gorunen ve gercekten kisaltilan metinlerde dugme goster.
    function ozetleriHazirla(scope) {
        var root = scope || document;
        var items = root.querySelectorAll ? root.querySelectorAll('.dizi-liste .cdb-bolum-ozet') : [];
        for (var i = 0; i < items.length; i++) {
            var wrap = items[i];
            var text = wrap.querySelector('.cdb-bolum-ozet-metin');
            var button = wrap.querySelector('.cdb-bolum-ozet-dugme');
            if (!text || !button) continue;
            if (!wrap.getClientRects().length) continue; // gizli tablo/sezon
            wrap.classList.add('cdb-ozet-etkin');
            if (wrap.classList.contains('cdb-ozet-acik')) {
                button.style.display = 'inline-block';
            } else {
                button.style.display = (text.scrollHeight > text.clientHeight + 2) ?
                    'inline-block' : 'none';
            }
        }
    }

    function ozetAcKapat(button) {
        var wrap = button.closest('.cdb-bolum-ozet');
        if (!wrap) return;
        var acik = wrap.classList.toggle('cdb-ozet-acik');
        button.setAttribute('aria-expanded', String(acik));
        button.textContent = acik ? 'Daha az göster ▲' : 'Devamını oku ▼';
        if (!acik) ozetleriHazirla(wrap.closest('.dizi-liste'));
        saveSummaryState(wrap, acik);
    }

    document.addEventListener('click', function (event) {
        var target = event.target && event.target.closest ?
            event.target.closest('.dizi-liste .cdb-bolum-ozet-dugme') : null;
        if (!target) return;
        event.preventDefault();
        event.stopPropagation();
        ozetAcKapat(target);
    }, true);

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var target = event.target;
        if (!target || !target.matches || !target.matches('.dizi-liste .cdb-bolum-ozet-dugme')) return;
        event.preventDefault();
        ozetAcKapat(target);
    });

    // Siteye geri gelince ayni bolumden devam edebilmek icin yerel hafiza.
    // Kayit, her wiki sayfasi icin AYRI tutulur. Hesap/sunucuya yazilmaz.
    var savedRoot = null;
    var savedState = null;
    var storageKey = 'cdb:bolum-listesi:v1:' + location.pathname;
    var restorePending = false;
    var readerHasMoved = false;
    var scrollTimer = null;
    var restoreTimer = null;

    function loadState() {
        try {
            var value = localStorage.getItem(storageKey);
            if (!value) return null;
            var data = JSON.parse(value);
            return data && typeof data === 'object' ? data : null;
        } catch (error) { return null; }
    }

    function writeState() {
        if (!savedState) return;
        try { localStorage.setItem(storageKey, JSON.stringify(savedState)); }
        catch (error) { /* gizli pencere veya depolama kapaliysa normal gezin */ }
    }

    function saveSummaryState(wrap, expanded) {
        if (!savedState || !savedRoot || !savedRoot.contains(wrap)) return;
        var name = wrap.getAttribute('data-cdb-ozet');
        if (!name) return;
        if (!savedState.collapsed || typeof savedState.collapsed !== 'object') {
            savedState.collapsed = {};
        }
        if (expanded) delete savedState.collapsed[name];
        else savedState.collapsed[name] = true;
        writeState();
    }

    function applySavedSummaries(root) {
        var collapsed = savedState && savedState.collapsed || {};
        var summaries = root.querySelectorAll('.cdb-bolum-ozet[data-cdb-ozet]');
        for (var i = 0; i < summaries.length; i++) {
            var item = summaries[i];
            var isOpen = !collapsed[item.getAttribute('data-cdb-ozet')];
            item.classList.toggle('cdb-ozet-acik', isOpen);
            var button = item.querySelector('.cdb-bolum-ozet-dugme');
            if (button) {
                button.setAttribute('aria-expanded', String(isOpen));
                button.textContent = isOpen ? 'Daha az göster ▲' : 'Devamını oku ▼';
            }
        }
    }

    function isTableView(root) {
        var views = root.querySelector('.dizi-liste-gorunumler');
        return !!views && views.classList.contains('cdb-hashsiz-tablo');
    }

    function openSeason(root, number, shouldScroll, shouldSave) {
        var accordion = root.querySelector('.dizi-liste-akordeon');
        if (!accordion) return;
        var blocks = accordion.querySelectorAll('.dizi-liste-akordeon-blok');
        var wanted = null;
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id === 'sezon-' + number) wanted = blocks[i];
        }
        if (!wanted) return;
        accordion.classList.add('cdb-hashsiz-etkin');
        for (var j = 0; j < blocks.length; j++) {
            blocks[j].classList.toggle('cdb-sezon-acik', blocks[j] === wanted);
        }
        ozetleriHazirla(root);
        if (shouldSave !== false && savedState) {
            savedState.season = String(number);
            writeState();
        }
        if (shouldScroll) wanted.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function closeSeasons(root, shouldSave) {
        var accordion = root.querySelector('.dizi-liste-akordeon');
        if (!accordion) return;
        accordion.classList.add('cdb-hashsiz-etkin');
        var blocks = accordion.querySelectorAll('.dizi-liste-akordeon-blok');
        for (var i = 0; i < blocks.length; i++) blocks[i].classList.remove('cdb-sezon-acik');
        if (shouldSave !== false && savedState) {
            savedState.season = '';
            writeState();
        }
    }

    function showView(root, table, shouldSave) {
        var views = root.querySelector('.dizi-liste-gorunumler');
        if (!views) return;
        views.classList.toggle('cdb-hashsiz-tablo', table);
        views.classList.toggle('cdb-hashsiz-kart', !table);

        // Eski Common.css, :target tabanli kurallarla tabloyu tekrar
        // gorunur yapabiliyor. CSS dosyasina dokunmadan, iki panelin
        // gorunurlugunu dogrudan belirle. Inline !important, eski
        // :target kurallarindan da onceliklidir.
        var kartPanel = views.querySelector('.dizi-liste-kart-gorunumu');
        var tabloPanel = views.querySelector('.dizi-liste-tablo-gorunumu');
        if (kartPanel) kartPanel.style.setProperty('display', table ? 'none' : 'block', 'important');
        if (tabloPanel) tabloPanel.style.setProperty('display', table ? 'flex' : 'none', 'important');

        ozetleriHazirla(root);
        if (shouldSave !== false && savedState) {
            savedState.view = table ? 'tablo' : 'kart';
            writeState();
        }
    }

    // Sayfadaki piksel konumu YANINDA gorunen bolumu de kaydet.
    // Boyutlar degisse bile bolum numarasini kullanarak ayni yere doneriz.
    function saveReadingPosition() {
        if (!savedRoot || !savedState || restorePending) return;
        var y = Math.max(0, Math.round(window.scrollY || window.pageYOffset || 0));
        var candidates = savedRoot.querySelectorAll(isTableView(savedRoot) ?
            '.dizi-liste-tablo-gorunumu tr[id^="cdb-episode-"]' :
            '.dizi-liste-kart-gorunumu .dizi-liste-kart[id^="cdb-card-"]');
        var chosen = null;
        var viewport = window.innerHeight || 800;
        // Yalnizca gorunen bolumlerin kutularina bak.
        for (var i = 0; i < candidates.length; i++) {
            var candidate = candidates[i];
            if (!candidate.getClientRects().length) continue;
            var rect = candidate.getBoundingClientRect();
            if (rect.bottom > 115 && rect.top < viewport - 20) {
                chosen = { id: candidate.id, top: Math.round(rect.top) };
                break;
            }
        }
        savedState.position = {
            y: y,
            view: isTableView(savedRoot) ? 'tablo' : 'kart',
            anchor: chosen ? chosen.id : '',
            offset: chosen ? chosen.top : 0
        };
        writeState();
    }

    function restoreReadingPosition() {
        if (!savedState || !savedState.position || readerHasMoved) return;
        var pos = savedState.position;
        var y = Number(pos.y) || 0;
        if (pos.anchor && pos.view === savedState.view) {
            var anchor = document.getElementById(pos.anchor);
            if (anchor && anchor.getClientRects().length) {
                y = anchor.getBoundingClientRect().top + window.scrollY - (Number(pos.offset) || 0);
            }
        }
        window.scrollTo({ left: 0, top: Math.max(0, y), behavior: 'instant' });
    }

    function markReaderMoved() {
        readerHasMoved = true;
        if (restorePending) {
            restorePending = false;
            if (restoreTimer !== null) clearTimeout(restoreTimer);
            saveReadingPosition();
        }
    }

    function initMemory(root) {
        if (!root || savedRoot === root) return;
        savedRoot = root;
        savedState = loadState() || {};
        // Daha once bir secim yoksa tablo varsayilan.
        savedState.view = savedState.view === 'kart' ? 'kart' : 'tablo';
        if (!savedState.collapsed || typeof savedState.collapsed !== 'object') savedState.collapsed = {};
        showView(root, savedState.view === 'tablo', false);
        if (Object.prototype.hasOwnProperty.call(savedState, 'season')) {
            if (savedState.season) openSeason(root, savedState.season, false, false);
            else closeSeasons(root, false);
        }
        applySavedSummaries(root);
        ozetleriHazirla(root);
        writeState();

        // F5 ve sonraki ziyaretlerde sayfa konumunu kurtar.
        if (savedState.position && Number.isFinite(Number(savedState.position.y))) {
            restorePending = true;
            try { history.scrollRestoration = 'manual'; } catch (error) {}
            requestAnimationFrame(function () { restoreReadingPosition(); });
            // Fandom fontlari ve sayfa resimleri gec yuklenebilir.
            // Kullanici kaydirmaya basarsa bu ek deneme yapilmaz.
            restoreTimer = setTimeout(function () {
                if (!readerHasMoved) restoreReadingPosition();
                restorePending = false;
                saveReadingPosition();
            }, 900);
        }
    }

    window.addEventListener('scroll', function () {
        if (restorePending) return;
        if (scrollTimer !== null) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(saveReadingPosition, 350);
    }, { passive: true });
    window.addEventListener('pagehide', function () {
        if (scrollTimer !== null) clearTimeout(scrollTimer);
        if (!restorePending) saveReadingPosition();
    });
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden' && !restorePending) saveReadingPosition();
    });
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (name) {
        window.addEventListener(name, function (event) {
            if (name === 'keydown' && !/^(?:PageDown|PageUp|ArrowDown|ArrowUp|Home|End| |Space)$/.test(event.key)) return;
            markReaderMoved();
        }, { passive: true });
    });

    function activate(root, target) {
        var season = /^sezon-(\d+)$/.exec(target);
        if (season) {
            // Tablo gorunumundeyken sezona tiklamak kartlara gecirmesin.
            if (isTableView(root)) {
                var targetSeason = document.getElementById('cdb-tablosezon-' + season[1]);
                if (targetSeason) {
                    targetSeason.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return true;
                }
            }
            showView(root, false);
            openSeason(root, season[1], true);
            return true;
        }
        var panel = /^liste-sezon-(\d+)$/.exec(target);
        if (panel) {
            showView(root, false);
            openSeason(root, panel[1], false);
            return true;
        }
        if (target === 'liste-sezon-kapat') { closeSeasons(root); return true; }
        if (target === 'dizi-gorunum-tablo') { showView(root, true); return true; }
        if (target === 'dizi-gorunum-kart') { showView(root, false); return true; }
        return false;
    }

    // Capture asamasinda yakala: Fandom'un baska click olaylari linke
    // ulasmadan once normal sayfa-atlamasini engelle.
    document.addEventListener('click', function (event) {
        if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
            event.metaKey || event.altKey || event.shiftKey) return;
        var el = event.target;
        var a = el && el.closest ? el.closest('.dizi-liste a') : null;
        if (!a) return;
        var target = targetFromLink(a);
        if (!target) return;
        var root = a.closest('.dizi-liste');
        if (!root) return;
        event.preventDefault();
        event.stopPropagation();
        activate(root, target);
        // Gec veya dinamik uretilen baglanti da ayni anda temizlensin.
        a.setAttribute('data-cdb-hashsiz', target);
        a.setAttribute('href', location.pathname + location.search);
    }, true);

    // Bir baska betik veya eski onbellek hash eklerse hemen temizle.
    function handleExistingHash() {
        if (!location.hash) return;
        var target;
        try { target = decodeURIComponent(location.hash.slice(1)); }
        catch (e) { return; }
        if (!targetPattern.test(target)) return;
        var root = document.querySelector('.dizi-liste');
        if (!root) return;
        if (activate(root, target)) {
            history.replaceState(history.state, '', location.href.split('#')[0]);
        }
    }
    window.addEventListener('hashchange', handleExistingHash);

    function init() {
        addStyle();
        prepareLinks(document);
        initMemory(document.querySelector('.dizi-liste'));
        handleExistingHash();
        ozetleriHazirla(document);
        // Tamamlanan font yuklemeleri satir yuksekligini degistirebilir.
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () { ozetleriHazirla(document); });
        }

        // Bolum listesi parcasi daha sonra degisirse yeni linkleri de yakala.
        if (window.MutationObserver) {
            var roots = document.querySelectorAll('.dizi-liste');
            for (var i = 0; i < roots.length; i++) {
                (function (root) {
                    var observer = new MutationObserver(function (mutations) {
                        for (var j = 0; j < mutations.length; j++) {
                            if (mutations[j].addedNodes.length) {
                                prepareLinks(root);
                                ozetleriHazirla(root);
                                return;
                            }
                        }
                    });
                    observer.observe(root, { childList: true, subtree: true });
                })(roots[i]);
            }
        }
    }

    // Pencere boyutu degisince tek bir olcum yap (her kart icin dinleyici yok).
    var ozetResizeFrame = null;
    window.addEventListener('resize', function () {
        if (ozetResizeFrame !== null) cancelAnimationFrame(ozetResizeFrame);
        ozetResizeFrame = requestAnimationFrame(function () {
            ozetResizeFrame = null;
            ozetleriHazirla(document);
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function () {
            prepareLinks(document);
            initMemory(document.querySelector('.dizi-liste'));
            ozetleriHazirla(document);
        });
    }

    // Yalniz Modül:Bölüm'ün Kısım 1 / Kısım 2 sekmeleri.
    // Fandom'un tabber isleyicisine karismadan URL'ye ekledigi #Kısım_1
    // benzeri parcayi siler. Bolum Listesi'nin hicbir davranisini degistirmez.
    function cdbKisimAdresiniTemizle() {
        if (!document.querySelector('.dizi-bolum-kisim-tabber') || !window.location.hash) return;
        var parca;
        try { parca = decodeURIComponent(window.location.hash.slice(1)); }
        catch (e) { return; }
        if (!/^(?:tabber[-_])?k[ıi]s[ıi]m[\s_-]*[0-9]+$/i.test(parca)) return;
        try { window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search); }
        catch (e) { /* Fandom izin vermezse sekmeleri bozma. */ }
    }

    // Fandom sekme tiklamasinda URL'yi senkron ya da gecikmeli guncelleyebilir.
    // Native tabber'in sekmeyi degistirmesini tamamlamasina izin veriyoruz.
    function cdbKisimAdresiniSonraTemizle() {
        window.setTimeout(cdbKisimAdresiniTemizle, 0);
        window.setTimeout(cdbKisimAdresiniTemizle, 100);
    }

    document.addEventListener('click', function (event) {
        var el = event.target && event.target.closest ? event.target.closest(
            '.dizi-bolum-kisim-tabber .tabbernav a,' +
            '.dizi-bolum-kisim-tabber .tabber__tab,' +
            '.dizi-bolum-kisim-tabber [role="tab"]'
        ) : null;
        if (!el) return;
        // preventDefault yok: Fandom'un Kısım değiştirmesi devam eder.
        cdbKisimAdresiniSonraTemizle();
    }, true);

    // Klavye/navigasyon ile sekme degisimi de dahil; Fandom'un
    // hashchange dinleyicilerinin ardindan calisir.
    window.addEventListener('hashchange', cdbKisimAdresiniSonraTemizle);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cdbKisimAdresiniTemizle, { once: true });
    } else {
        cdbKisimAdresiniTemizle();
    }
})();

/* Modül:Bölüm: Kısım sekmeleri. 4.3 Bölüm Listesi kodu değiştirilmeden eklendi.
 * Link/tabber kullanılmaz: URL ve tarayıcı geçmişi değişmez.
 * Stil yalnız bu bölüme uygulanır; Common.css değişmez. */
(function () {
    'use strict';
    if (window.__cdbBolumKisimSekmeleriAktif) return;
    window.__cdbBolumKisimSekmeleriAktif = true;

    var rootSelector = '.cdb-bolum-kisim-ozel';
    var styleId = 'cdb-bolum-kisim-son-stil';

    function stilKur() {
        if (document.getElementById(styleId)) return;
        var style = document.createElement('style');
        style.id = styleId;
        style.textContent = [
            '.cdb-bolum-kisim-ozel .cdb-kisim-sekmeler{display:flex!important;justify-content:center!important;align-items:center!important;gap:10px!important;flex-wrap:wrap!important;margin:18px auto 20px!important;width:100%;box-sizing:border-box}',
            '.cdb-bolum-kisim-ozel .cdb-kisim-dugme{display:inline-flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box;min-width:108px;min-height:40px;padding:8px 18px;border-radius:22px;border:1px solid #45618a!important;background:#152944!important;color:#c5d5ed!important;font-size:14px;font-weight:750;line-height:1.4;cursor:pointer;user-select:none;transition:background .15s ease,border-color .15s ease}',
            '.cdb-bolum-kisim-ozel .cdb-kisim-dugme.cdb-kisim-secili{background:linear-gradient(135deg,#367ffc,#2051d9)!important;border-color:#69a4ff!important;color:#fff!important;box-shadow:0 2px 8px rgba(27,83,185,.28)}',
            '.cdb-bolum-kisim-ozel .cdb-kisim-dugme:hover{border-color:#83aeed!important}',
            '.cdb-bolum-kisim-ozel .cdb-kisim-dugme:focus-visible{outline:2px solid #a3caff;outline-offset:3px}',
            '.cdb-bolum-kisim-ozel.cdb-kisim-hazir .cdb-kisim-panel{display:none!important}',
            '.cdb-bolum-kisim-ozel.cdb-kisim-hazir .cdb-kisim-panel.cdb-kisim-secili{display:block!important}',
            '@media(max-width:520px){.cdb-bolum-kisim-ozel .cdb-kisim-dugme{min-width:95px;padding:7px 14px;font-size:13px}}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function parcalar(root) {
        var buttons = Array.prototype.filter.call(root.querySelectorAll('.cdb-kisim-sekmeler .cdb-kisim-dugme'),
            function (element) { return element.closest(rootSelector) === root; });
        var panels = Array.prototype.filter.call(root.querySelectorAll('.cdb-kisim-panel'),
            function (element) { return element.closest(rootSelector) === root; });
        return { buttons: buttons, panels: panels };
    }

    function goster(root, index, focus) {
        var data = parcalar(root);
        if (!data.buttons.length || data.buttons.length !== data.panels.length || index < 0 || index >= data.buttons.length) return;
        for (var i = 0; i < data.buttons.length; i++) {
            var active = i === index;
            data.buttons[i].classList.toggle('cdb-kisim-secili', active);
            data.buttons[i].setAttribute('aria-selected', String(active));
            data.buttons[i].tabIndex = active ? 0 : -1;
            data.panels[i].classList.toggle('cdb-kisim-secili', active);
            data.panels[i].setAttribute('aria-hidden', String(!active));
        }
        if (focus) data.buttons[index].focus();
    }

    function hazirla() {
        stilKur();
        var roots = document.querySelectorAll(rootSelector);
        for (var i = 0; i < roots.length; i++) {
            var root = roots[i];
            if (root.classList.contains('cdb-kisim-hazir')) continue;
            var data = parcalar(root);
            if (!data.buttons.length || data.buttons.length !== data.panels.length) continue;
            root.classList.add('cdb-kisim-hazir');
            goster(root, 0, false);
        }
    }

    document.addEventListener('click', function (event) {
        var button = event.target && event.target.closest ? event.target.closest(rootSelector + ' .cdb-kisim-dugme') : null;
        if (!button) return;
        var root = button.closest(rootSelector);
        if (!root) return;
        if (!root.classList.contains('cdb-kisim-hazir')) hazirla();
        var index = parcalar(root).buttons.indexOf(button);
        if (index < 0) return;
        event.preventDefault();
        goster(root, index, false);
    });

    document.addEventListener('keydown', function (event) {
        var button = event.target && event.target.closest ? event.target.closest(rootSelector + ' .cdb-kisim-dugme') : null;
        if (!button) return;
        var root = button.closest(rootSelector);
        if (!root) return;
        var buttons = parcalar(root).buttons;
        var index = buttons.indexOf(button);
        if (index < 0) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goster(root, index, false);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            goster(root, (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length, true);
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hazirla, {once:true});
    } else {
        hazirla();
    }
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(hazirla);
    }
})();