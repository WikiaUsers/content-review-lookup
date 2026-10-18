/*
 * [[W:C:dev:AddAnnouncement]]
 * Version with modified behavior
 * Gadget for users with the 'announcements' right
*/
(function(mw, $) {
    'use strict';

    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgCityId',
        'wgPageName',
        'wgServer'
    ]);

    if (config.wgNamespaceNumber !== 500 || window.AddAnnouncementLoaded) {
        return;
    }
    window.AddAnnouncementLoaded = true;

    var MAX_LENGTH = 100;
    var KEYDOWN_EVENT = 'keydown.addAnnouncement';
    var i18n;
    var preloads = 2;

    function truncate(text) {
        return text.length > MAX_LENGTH
            ? text.slice(0, MAX_LENGTH - 1) + '\u2026'
            : text;
    }

    function extractText(html) {
        var $div = $('<div>').append($.parseHTML(html));
        $div.find([
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            '.mw-heading', '.mw-editsection', '.toc',
            'style', 'script', 'table', '.reference'
        ].join(', ')).remove();
        return truncate($div.text().replace(/\s+/g, ' ').trim());
    }

    function fetchSection(section) {
        return $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: config.wgPageName,
            prop: 'text',
            format: 'json',
            section: section,
            disablepp: 1
        }).then(function(res) {
            return res.parse ? extractText(res.parse.text['*']) : '';
        });
    }

    function addAnnouncement() {
        fetchSection(0)
            .then(function(text) {
                return text || fetchSection(1);
            })
            .done(confirmDialog)
            .fail(function() {
                confirmDialog('');
            });
    }

    function saveAnnouncement(dialog) {
        var isWikiaOrg = config.wgServer.indexOf('wikia.org') !== -1;
        var $notification = dialog.find('.wds-dialog__notification');
        var $ok = dialog.find('.wds-button[data-action="ok"]');
        var $textarea = dialog.find('.aa-text');
        var text = $textarea.val().trim();

        if (!text.length) {
            $notification
                .text(i18n.msg('error').plain())
                .css('color', '#d71035')
                .show();
            return;
        }

        $ok.prop('disabled', true);
        $textarea.prop('disabled', true);
        $notification.hide();

        $.ajax({
            url: 'https://services.' + (isWikiaOrg ? 'wikia.org' : 'fandom.com') +
                '/announcements/' + config.wgCityId + '/announcements',
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                text: text,
                url: window.location.origin + mw.util.getUrl(config.wgPageName)
            }),
            success: function() {
                $notification
                    .text(i18n.msg('success').plain())
                    .css('color', '#4cda9a')
                    .show();
            },
            error: function(xhr) {
                var title = '';
                try {
                    title = JSON.parse(xhr.responseText).title || '';
                } catch (err) {}
                $notification
                    .empty()
                    .append(
                        $('<span>').text(i18n.msg('error').plain()),
                        $('<br>'),
                        $('<span>').text(title)
                    )
                    .css('color', '#d71035')
                    .show();
                console.error(title);
                $ok.prop('disabled', false);
                $textarea.prop('disabled', false);
            },
            dataType: 'json'
        });
    }

    function closeDialog() {
        $('.aa-dialog').remove();
        $(document).off(KEYDOWN_EVENT);
    }

    function confirmDialog(text) {
        closeDialog();

        var $textarea = $('<textarea>', {
            'class': 'aa-text',
            rows: 4,
            maxlength: MAX_LENGTH,
            css: { width: '100%', boxSizing: 'border-box' }
        }).val(text);

        var $counter = $('<p>', {
            'class': 'aa-counter',
            css: { textAlign: 'right', margin: '4px 0 0', fontSize: '12px' }
        });

        function updateCounter() {
            $counter.text($textarea.val().length + '/' + MAX_LENGTH);
        }
        $textarea.on('input', updateCounter);
        updateCounter();

        var $dialog = $('<div>', { 'class': 'wds-dialog__curtain aa-dialog' });
        $dialog.append(
            $('<div>', { 'class': 'wds-dialog__wrapper' }).append(
                $('<div>', {
                    'class': 'wds-dialog__title',
                    text: i18n.msg('confirm-title').plain()
                }),
                $('<div>', { 'class': 'wds-dialog__content' }).append(
                    $('<p>', { 'class': 'wds-dialog__notification' }).hide(),
                    $('<p>', { text: i18n.msg('confirm-text').plain() }),
                    $textarea,
                    $counter
                ),
                $('<div>', { 'class': 'wds-dialog__actions' }).append(
                    $('<button>', {
                        'class': 'wds-button wds-is-text wds-dialog__actions-button',
                        'data-action': 'abort',
                        text: i18n.msg('abort').plain()
                    }).click(closeDialog),
                    $('<button>', {
                        'class': 'wds-button wds-is-text wds-dialog__actions-button',
                        'data-action': 'ok',
                        text: i18n.msg('ok').plain()
                    }).click(function() {
                        saveAnnouncement($dialog);
                    })
                )
            )
        );

        $dialog.on('mousedown', function(e) {
            if (e.target === this) {
                closeDialog();
            }
        });

        $(document).on(KEYDOWN_EVENT, function(e) {
            if (e.key === 'Escape') {
                closeDialog();
            }
        });

        $dialog.appendTo(mw.util.$content);
        $textarea.focus();
    }

    function init() {
        if (--preloads > 0) {
            return;
        }
        window.dev.i18n.loadMessages('AddAnnouncement').done(function(d) {
            i18n = d;
            $('<button>', {
                'class': 'wds-button',
                id: 'addAnnouncement',
                text: i18n.msg('add').plain()
            }).click(addAnnouncement).appendTo(mw.util.$content);
        });
    }

    mw.hook('dev.i18n').add(init);
    mw.loader.using('mediawiki.util').then(init);

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})(window.mediaWiki, window.jQuery);