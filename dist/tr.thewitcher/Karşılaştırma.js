//Code with Claude
(function () {
    'use strict';

    var IZIN_VERILEN_TURLER = [
        'Ağır zırh', 'Hafif zırh', 'Orta ağırlıkta zırh',
        'Gümüş kılıç', 'Çelik kılıç', 'Arbalet'
    ];
    var STORAGE_KEY = 'karsilastirma_liste';
    var itemsCache = null;

    function getList() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) { return []; }
    }

    function saveList(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function loadData(callback) {
        if (itemsCache) { callback(itemsCache); return; }
        new mw.Api().get({
            action: 'parse',
            page: 'Şablon:KarşılaştırmaJSON',
            prop: 'text',
            format: 'json'
        }).done(function (res) {
            var html = res.parse.text['*'];
            var text = $('<div>').html(html).text().trim();
            try {
                itemsCache = JSON.parse(text);
                callback(itemsCache);
            } catch (e) { console.error('Karşılaştırma verisi ayrıştırılamadı:', e); }
        }).fail(function (err) { console.error('Karşılaştırma verisi çekilemedi:', err); });
    }

    function updateBadge() {
        var count = getList().length;
        $('#karsilastirma-badge').text(count > 0 ? '(' + count + ')' : '');
    }

    function renderTable(items, selected) {
        var labelOrder = [], seen = {};
        selected.forEach(function (n) {
            (items[n] && items[n].stats || []).forEach(function (s) {
                if (!seen[s.label]) { seen[s.label] = true; labelOrder.push(s.label); }
            });
        });

        var table = $('<table class="karsilastirma-table"></table>');
        var headRow = $('<tr><th></th></tr>');
        selected.forEach(function (n) {
            var it = items[n];
            var th = $('<th></th>');
            th.append('<div class="k-name">' + mw.html.escape(n) + '</div>');
            if (it && it.reqLevel) th.append('<div class="k-level">Seviye ' + Number(it.reqLevel) + '</div>');
            headRow.append(th);
        });
        table.append(headRow);

        labelOrder.forEach(function (label) {
            var row = $('<tr></tr>');
            row.append('<td class="k-label">' + mw.html.escape(label) + '</td>');
            var values = selected.map(function (n) {
                var s = ((items[n] || {}).stats || []).find(function (s) { return s.label === label; });
                return s ? s.value : null;
            });
            var nums = values.filter(function (v) { return typeof v === 'number'; });
            var best = nums.length ? Math.max.apply(null, nums) : null;
            values.forEach(function (v) {
                var cell = $('<td></td>');
                if (v === null) { cell.text('—').addClass('k-na'); }
                else {
                    cell.text(v);
                    if (best !== null && v === best && nums.length > 1) cell.addClass('k-best');
                }
                row.append(cell);
            });
            table.append(row);
        });
        return table;
    }

    function openPopup() {
        loadData(function (items) {
            var list = getList().filter(function (n) { return items[n]; });
            var overlay = $('<div class="karsilastirma-overlay"></div>');
            var modal = $('<div class="karsilastirma-modal"></div>');
            var header = $('<div class="karsilastirma-modal-head"></div>');
            header.append('<span>Karşılaştırma</span>');
            var closeBtn = $('<button class="karsilastirma-close">×</button>');
            closeBtn.on('click', function () { overlay.remove(); });
            header.append(closeBtn);
            modal.append(header);

            if (list.length === 0) {
                modal.append('<p class="karsilastirma-empty">Henüz eşya eklemediniz. Eşya sayfalarında "Karşılaştırmaya Ekle" butonuna basın.</p>');
            } else {
                modal.append(renderTable(items, list));
                var clearBtn = $('<button class="karsilastirma-clear">Listeyi Temizle</button>');
                clearBtn.on('click', function () {
                    saveList([]);
                    updateBadge();
                    overlay.remove();
                });
                modal.append(clearBtn);
            }

            overlay.append(modal);
            overlay.on('click', function (e) { if (e.target === overlay[0]) overlay.remove(); });
            $('body').append(overlay);
        });
    }

    function injectButton() {
        var typeEl = document.querySelector('.esya-type');
        if (!typeEl) return;
        var type = typeEl.textContent.trim();
        if (IZIN_VERILEN_TURLER.indexOf(type) === -1) return;

        var pageName = mw.config.get('wgPageName').replace(/_/g, ' ');

        var btn = $('<button id="karsilastirma-ekle-btn" class="karsilastirma-ekle-btn">Karşılaştırmaya Ekle <span id="karsilastirma-badge"></span></button>');

        function refreshBtnState() {
            var inList = getList().indexOf(pageName) !== -1;
            btn.toggleClass('active', inList);
            btn.contents().first()[0].textContent = inList ? 'Listede ✓ ' : 'Karşılaştırmaya Ekle ';
        }

        btn.on('click', function () {
            var list = getList();
            var idx = list.indexOf(pageName);
            if (idx === -1) {
                if (list.length >= 3) {
                    alert('En fazla 3 eşya karşılaştırabilirsiniz. Önce listeyi temizleyin.');
                    return;
                }
                list.push(pageName);
            } else {
                list.splice(idx, 1);
            }
            saveList(list);
            updateBadge();
            refreshBtnState();
        });

        var viewBtn = $('<button class="karsilastirma-goster-btn">Karşılaştırmayı Göster</button>');
        viewBtn.on('click', openPopup);

        var wrap = $('<div class="karsilastirma-buton-alani"></div>').append(btn).append(viewBtn);
        $(typeEl).closest('.portable-infobox, .pi-esya-header').after(wrap);
        if ($('.karsilastirma-buton-alani').length === 0) {
            $(typeEl).closest('.pi-esya-header').parent().prepend(wrap);
        }

        refreshBtnState();
        updateBadge();
    }

    $(function () { injectButton(); });
})();