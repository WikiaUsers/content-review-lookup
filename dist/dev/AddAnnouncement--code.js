(function(mw, $) {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgCityId',
        'wgPageName',
        'wgServer'
    ]);

    if (config.wgNamespaceNumber !== 500) {
        return;
    }
    var i18n;
    var preloads = 2;
    function addAnnouncement() {
        var ajaxProps = {
            action: 'parse',
            page: config.wgPageName,
            format: 'json',
            section: 0,
            disablepp: 1
        };
        $.get(mw.util.wikiScript('api'), ajaxProps, function(res) {
            var text = $(res.parse.text['*']).text().trim();
            if(!text.length) {
                ajaxProps.section = 1;
                $.get(mw.util.wikiScript('api'), ajaxProps, function(res) {
                    var html = $.parseHTML(res.parse.text['*']);
                    // remove headline
                    html.shift();
                    var text = $('<div>').append(html).text().trim();
                    if(text.length > 100) {
                        text = text.slice(0, 99) + '\u2026';
                    }
                    confirmDialog(text);
                });
                return;
            }
            else if(text.length > 100) {
                text = text.slice(0, 99) + '\u2026';
            }
            confirmDialog(text);
        });
    }

function saveAnnouncement(dialog) {
    var text = dialog.find('.aa-text').val().trim();
    if (!text.length) {
        dialog.find('.wds-dialog__notification')
            .text(i18n.msg('error').plain())
            .css('color', '#d71035')
            .show();
        return;
    }

    var isWikiaOrg = config.wgServer.indexOf('wikia.org') !== -1;

    dialog.find('.wds-button[data-action="ok"]').prop('disabled', true);
    dialog.find('.wds-dialog__notification').hide();
    $.ajax({
        url: 'https://services.' + (isWikiaOrg ? 'wikia.org' : 'fandom.com') + '/announcements/' + config.wgCityId + '/announcements',
        type: 'POST',
        contentType: 'application/json',
        processData: false,
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            text: text,
            url: window.location.href
        }),
        success: function(res) {
            dialog.find('.wds-dialog__notification').text(i18n.msg('success').plain()).css('color', '#4cda9a').show();
        },
        error: function(e) {
            var title = '';
            try { title = JSON.parse(e.responseText).title; } catch (err) {}
            dialog.find('.wds-dialog__notification').empty().append(i18n.msg('error').escape(), '<br>', title).css('color', '#d71035').show();
            console.error(title);
            dialog.find('.wds-button[data-action="ok"]').prop('disabled', false);
        },
        dataType: 'json'
    });
}

function confirmDialog(text) {
    var dialog = $('<div>', { class: 'wds-dialog__curtain' });
    dialog.append(
        $('<div>', { class: 'wds-dialog__wrapper' }).append(
            $('<div>', { class: 'wds-dialog__title', text: i18n.msg('confirm-title').plain() }),
            $('<div>', { class: 'wds-dialog__content' }).append(
                $('<p>', { class: 'wds-dialog__notification' }).hide(),
                $('<p>', { text: i18n.msg('confirm-text').plain() }),
                $('<textarea>', {
                    class: 'aa-text',
                    rows: 4,
                    maxlength: 100,
                    val: text,
                    css: { width: '100%', boxSizing: 'border-box' }
                })
            ),
            $('<div>', { class: 'wds-dialog__actions' }).append(
                $('<button>', { class: 'wds-button wds-is-text wds-dialog__actions-button', 'data-action': 'abort', text: i18n.msg('abort').plain() }).click(function() {
                    dialog.detach();
                }),
                $('<button>', { class: 'wds-button wds-is-text wds-dialog__actions-button', 'data-action': 'ok', text: i18n.msg('ok').plain() }).click(function() {
                    saveAnnouncement(dialog);
                })
            )
        )
    ).appendTo(mw.util.$content);
}

	function init() {
		if (--preloads>0) return;
        window.dev.i18n.loadMessages('AddAnnouncement').done(function(d) {
            i18n = d;
            $('<button>', {
                'class': 'wds-button',
                'type': 'checkbox',
                'id': 'addAnnouncement',
                'text': i18n.msg('add').plain()
            }).click(addAnnouncement).appendTo(mw.util.$content);
        });
    }

    mw.hook('dev.i18n').add(init);
    mw.loader.using('mediawiki.util').then(init);

    importArticle({
        type:'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})(window.mediaWiki, window.jQuery);