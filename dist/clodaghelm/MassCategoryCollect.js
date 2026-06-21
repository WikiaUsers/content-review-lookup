/*
 * @name MassCategoryCollect
 * @desc Collects items from category pages.
 * @auth [[User:ClodaghelmC]]
 */

(function (window, $, mw) {
    'use strict';

    window.MassCategoryCollect = $.extend({
        timeout: {
            toast: 1000,
            action: 1000
        }
    }, window.MassCategoryCollect || {});

    // Double load protection
    if (window.MassCategoryCollect.loaded) {
        return;
    }
    window.MassCategoryCollect.loaded = true;

    // Library scope
    (window.dev = window.dev || {}).mcc = {};

    // Cache necessary config
    var conf = mw.config.get([
        'wgCanonicalNamespace'
    ]);

    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
        var collectedItems = JSON.parse(localStorage.getItem('mcc-data') || '[]');
        var listModal;

        function init() {
            var placement = window.dev.placement.loader;
            placement.script('mcc');
            $(placement.element('tools'))[placement.type('prepend')](
                $('<li>').append($('<a>', {
                    id: 't-mcc',
                    text: 'Mass Category Collect',
                    href: '#',
                    click: function (e) {
                        e.preventDefault();
                        openModal();
                    }
                }))
            );
            document.querySelectorAll('.category-page__member').forEach(processItem);
        }

        function openModal() {
            if (listModal) {
                listModal.show();
                return;
            }

            listModal = new window.dev.modal.Modal({
                id: 'mcc',
                size: 'medium',
                title: 'Mass Category Collect',
                content: '<textarea id="mcc-content" style="width: 100%; height: 400px;" readonly></textarea>',
                closeEscape: false,
                buttons: [
                    { text: 'Toggle', event: 'toggleMode', primary: true },
                    { text: 'Copy', event: 'copyList' },
                    { text: 'Clear', event: 'clearList' }
                ],
                events: {
                    toggleMode: function () {
                        document.body.classList.toggle('mcc-enabled');
                        var isEnabled = document.body.classList.contains('mcc-enabled');
                        window.dev.toasts[isEnabled ? 'success' : 'warning'](
                            'MCC has been ' + (isEnabled ? 'enabled' : 'disabled') + '!',
                            { timeout: window.MassCategoryCollect.timeout.toast }
                        );
                    },
                    copyList: function () {
                        if (collectedItems.length === 0) return window.dev.toasts.error('Nothing to copy!', { timeout: window.MassCategoryCollect.timeout.toast });
                        navigator.clipboard.writeText(collectedItems.join('\n')).then(function () {
                            window.dev.toasts.success('Copied to clipboard!', { timeout: window.MassCategoryCollect.timeout.toast });
                        });
                    },
                    clearList: function () {
                        if (collectedItems.length === 0) return window.dev.toasts.error('List is already empty!', { timeout: window.MassCategoryCollect.timeout.toast });
                        collectedItems = [];
                        localStorage.removeItem('mcc-data');
                        document.querySelectorAll('.category-page__member').forEach(function (item) {
                            item.classList.remove('mcc-selected');
                        });
                        updateModal();
                        window.dev.toasts.info('List cleared!', { timeout: window.MassCategoryCollect.timeout.toast });
                    }
                }
            });

            listModal.create();
            updateModal();
            listModal.show();
        }

        function updateModal() {
            var textArea = document.getElementById('mcc-content');
            if (textArea) textArea.value = collectedItems.length > 0 ? collectedItems.join('\n') : 'No items collected yet.';
        }

        function processItem(item) {
            var link = item.querySelector('.category-page__member-link') || item.querySelector('a');
            var itemName = link ? link.innerText.trim() : "";
            if (!itemName) return;

            if (collectedItems.includes(itemName)) item.classList.add('mcc-selected');

            item.addEventListener('click', function (e) {
                if (!document.body.classList.contains('mcc-enabled')) return;
                e.preventDefault();

                var index = collectedItems.indexOf(itemName);
                if (index > -1) {
                    collectedItems.splice(index, 1);
                    item.classList.remove('mcc-selected');
                    window.dev.toasts.warning('Removed: ' + itemName, { timeout: window.MassCategoryCollect.timeout.action });
                } else {
                    collectedItems.push(itemName);
                    item.classList.add('mcc-selected');
                    window.dev.toasts.success('Added: ' + itemName, { timeout: window.MassCategoryCollect.timeout.action });
                }
                localStorage.setItem('mcc-data', JSON.stringify(collectedItems));
                updateModal();
            });
        }

        mw.hook('dev.modal').add(function () {
            mw.hook('dev.placement').add(function () {
                mw.hook('dev.toasts').add(function () {
                    if (conf.wgCanonicalNamespace === 'Category') {
                        init();
                    }
                });
            });
        });

        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Modal.js',
                'u:dev:MediaWiki:Placement.js',
                'u:dev:MediaWiki:Toasts.js'
            ]
        }, {
            type: 'style',
            articles: [
                'u:clodaghelm:MediaWiki:MassCategoryCollect.css'
            ]
        });
    });
})(this, jQuery, mediaWiki);