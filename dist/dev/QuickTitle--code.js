// Allows a user to change the displayed title of a page without pressing the Edit button
// Authors: KCCreations & KockaAdmiralac
mw.loader.using([
     'mediawiki.api',
     'mediawiki.user'
]).then(function() {
    var config = mw.config.get([
        'wgIsArticle',
        'wgPageName',
        'wgVersion'
    ]);

    // Limiting the scope of the script
    if (
        !config.wgIsArticle ||
        window.QuickTitleLoaded
    ) {
        return;
    }
    window.QuickTitleLoaded = true;
 
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('QuickTitle').then(function(i18n) {
 
            var titleLocation = $('.page-header .page-header__main .page-header__title'); // Location of the title
 
            // Caches the page data so it doesn't load the data every time the page loads
            // Also ensures the page exists before being able to rename it
            $.get(mw.util.wikiScript('index'), { action: "raw", title: config.wgPageName }, function(data) {
                titleLocation.click(function() {
                    if ($('#QuickTitleField').length > 0) {
                        return;
                    }
                    var title = $(this)[0].firstChild.textContent;
                    $(this).append(
                        $('<br/>'),
                        $('<input>', {
                            'type': 'text',
                            'id': 'QuickTitleField',
                            'size': '50',
                            'value': title
                        }),
                        $('<br/>'),
                        $('<input>', {
                           'type': 'text',
                            'id': 'QuickTitleSummary',
                            'value': i18n.inContentLang().msg('defaultSummary').plain() 
                        }),
                        $('<br/>'),
                        $('<a>', {
                            'id': 'QuickTitleChange',
                            'class': 'wds-button',
                            'text': i18n.msg('changeTitle').plain()
                        }),
                        $('<a>', {
                            'id': 'QuickTitleCancel',
                            'class': 'wds-button',
                            'text': i18n.msg('cancel').plain()
                        })
                    );
                    $('#QuickTitleField').focus();
                    $('#QuickTitleChange').click(function() {
                        var newTitle = $('#QuickTitleField').val().replace(/}}/ig, ""),
                            displayTitle = "{{DISPLAYTITLE:" + newTitle + "}}",
                            text,
                            regex = /{{DISPLAYTITLE:.+?(?!(\r|\n))}}/ig;
                        if(data.match(regex)) text = data.replace(regex, displayTitle);
                        new mw.Api().post($.extend({
                            action: 'edit',
                            minor: true,
                            bot: true,
                            summary: $("#QuickTitleSummary").val(),
                            title: config.wgPageName,
                            token: mw.user.tokens.get("csrfToken") || mw.user.tokens.get("editToken")
                        }, text ? { "text": text } : { prependtext: displayTitle })).done(function(d) {
                            if (d.error) {
                                new BannerNotification(i18n.msg('error', d.error.code).escape(), 'error').show();
                            } else {
                                titleLocation.text(newTitle);
                                window.location.reload();
                            }
                        }).fail(function(code) {
                            if (config.wgVersion === '1.19.24') {
                                new BannerNotification(i18n.msg('error', code || 'http').escape()).show();
                            } else {
                                mw.notify(i18n.msg('error', code).plain(), {
                                    type: 'error'
                                });
                            }
                        });
                    });
                    $('#QuickTitleCancel').click(function() { setTimeout(function() { titleLocation.text(title); }, 100); });
                });
            });
        });
    });
});