/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* BEGIN MODEL596 INFOBOX PLACEMENT */
/* Put Fandom's original infobox back into the explicitly marked dossier slot. */
(function () {
    'use strict';
    var scheduled = false;
    var observer = null;
    var observedRoot = null;

    function numberOf(box) {
        var value = box.querySelector('[data-source="номер_релиза"] .pi-data-value');
        return value ? value.textContent.replace(/\s/g, '').replace(/^0+(?=\d)/, '') : '';
    }

    function markVariants(box) {
        var tabs = box.querySelectorAll('.wds-tabs__tab');
        Array.prototype.forEach.call(tabs, function (tab) {
            var label = tab.querySelector('.wds-tabs__tab-label');
            if (label && label.textContent.trim().toLowerCase() === 'chase') {
                tab.setAttribute('data-model596-variant', 'chase');
            }
        });
    }

    function restore() {
        scheduled = false;
        var slots = document.querySelectorAll('.model596-file .model596-file-infobox-slot[data-infobox-number]');
        var boxes = document.querySelectorAll('.portable-infobox.pi-theme-596-auto');
        Array.prototype.forEach.call(boxes, markVariants);
        Array.prototype.forEach.call(slots, function (slot) {
            var file = slot.closest('.model596-file');
            var number = slot.getAttribute('data-infobox-number').replace(/^0+(?=\d)/, '');
            var matches = Array.prototype.filter.call(boxes, function (box) {
                var owner = box.closest('.model596-file');
                return numberOf(box) === number && (!owner || owner === file);
            });
            // Do not guess if several infoboxes could match a single dossier.
            if (matches.length !== 1 || slot.contains(matches[0])) {
                return;
            }
            var box = matches[0];
            var wrapper = box.closest('.portable-infobox-wrapper');
            if (wrapper && wrapper.querySelectorAll('.portable-infobox').length !== 1) {
                return;
            }
            // Move the whole wrapper including Fandom's own "more" control and listeners.
            var movable = wrapper || box;
            if (movable.contains(slot)) {
                return;
            }
            movable.classList.add('model596-file-infobox');
            slot.appendChild(movable);
        });
    }

    function schedule() {
        if (!scheduled) {
            scheduled = true;
            (window.requestAnimationFrame || window.setTimeout)(restore);
        }
    }

    function watchContent() {
        var content = document.getElementById('mw-content-text');
        if (!content || content === observedRoot || !window.MutationObserver) {
            return;
        }
        if (observer) {
            observer.disconnect();
        }
        observedRoot = content;
        observer = new MutationObserver(schedule);
        observer.observe(content, { childList: true, subtree: true });
    }

    mw.hook('wikipage.content').add(function () {
        watchContent();
        schedule();
    });
    jQuery(function () {
        watchContent();
        schedule();
        if (mw.config.get('skin') === 'fandommobile' || mw.config.get('skin') === 'ucp_mobile' || document.body.classList.contains('skin-fandommobile')) {
            mw.loader.using('ext.portableInfobox.mobile.js').then(schedule, schedule);
        }
    });
}());

/* END MODEL596 INFOBOX PLACEMENT */