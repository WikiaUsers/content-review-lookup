/* ViewDeleted
 * Not to be confused with ViewRemoved.
 * 
 * Creates [view content] links on delete logs in Special:RecentChanges and Special:Log/delete
 * Script idea by Leviathan 89
 *
 * Add translations here: https://dev.fandom.com/wiki/Special:BlankPage/I18nEdit/ViewDeleted
 *
 * @scope Personal
 * @author Dorumin
 */

mw.loader.using('mediawiki.api').then(function() {
    var wg = mw.config.get([
        'wgUserGroups',
        'wgPageName',
        'wgNamespaceNumber',
        'wgNamespaceIds'
    ]),
    ug = wg.wgUserGroups,
    can_restore = /sysop|vstf|staff|helper|content-volunteer|content-moderator|content-team-member|wiki-manager/.test(ug.join()),
    config = window.ViewDeleted || {rc: true, logs: 'replace'},
    rc = config.rc && $('#recentchanges-options + .rc-conntent').length,
    logs = config.logs && (wg.wgPageName.slice(-7) == '/delete' || $.getUrlVar('type') == 'delete');
    config.modal = config.modal || {};
    config.modal.preview = config.modal.preview || {};
    config.modal.content = config.modal.content || {};
    if (window.ViewDeleted_init || wg.wgNamespaceNumber != -1 || !(!rc || !logs) || !can_restore) return;
    window.ViewDeleted_init = true;
    var Api = new mw.Api(),
    i18n;
    if (typeof dev == 'undefined' || typeof dev.i18n == 'undefined') { // i18n-js lib
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    // Add the view content links
    function add_links() {
        var $vc_link = $('<span>', {
            class: 'view-content-wrapper',
            append: [
            '[',
            $('<a>', {
                href: '#',
                text: i18n.msg('view-content').plain(),
                class: 'view-content-link'
            }),
            ']'
            ]
        });
        if ((wg.wgPageName.slice(-7) == '/delete' || $.getUrlVar('type') == 'delete') && config.logs) { // Special:Log/delete
            if (config.logs == 'replace') {
                $('.mw-logline-delete .mw-logevent-actionlink a').click(show_modal);
            } else {
                $('.mw-logline-delete').each(function() {
                    $(this).append($vc_link.clone().click(show_modal));
                });
            }
        } else if (config.rc) { // RecentChanges
            if ($.getUrlVar('hideenhanced') == 1) {
                var $elems = $('.special > li').filter(function() {
                    var $this = $(this),
                    href = $this.children('a').first().attr('href').toLowerCase(),
                    prefix = '/wiki/' + Object.keys(wg.wgNamespaceIds)[1];
                    return href.slice(0, prefix.length) == prefix && href.slice(-7) == '/delete';
                }).each(function() {
                    $(this).append($vc_link.clone().click(show_modal));
                });
            } else {
                $('.mw-changeslist-log-delete tr').each(function() {
                    var $this = $(this);
                    if ($this.parent().parent().hasClass('mw-collapsible') && !$this.attr('style')) return;
                    var $elem = $this.children('.mw-enhanced-rc-nested');
                    if (!$elem.length) {
                        $elem = $this.children().last();
                    }
                    $elem.append($vc_link.clone().click(show_modal));
                });
            }
        }
    }
    // Click handler for view content links
    function show_modal(e) {
        if (e.target.nodeName != 'A' || (logs && (e.ctrlKey || e.shiftKey))) return;
        e.preventDefault();
        var $this = $(this),
        title = $.getUrlVar('hideenhanced') == 1 ? $this.prev().prev().text() : $this.closest('li, td').find('a').not('.comment a, .mw-logevent-actionlink a, .view-content-wrapper a').last().text(),
        file_ns = Object.keys(wg.wgNamespaceIds).filter(function(el) {
            return wg.wgNamespaceIds[el] == 6;
        }),
        is_file = !!file_ns.filter(function(el) {
            return el + ':' == title.slice(0, el.length + 1).toLowerCase();
        }).length;
        $.showCustomModal(i18n.msg('view-content-header').escape(), $('<img>', {
            class: 'view-content-ajax',
            src: window.stylepath + '/common/images/ajax.gif',
            alt: i18n.msg('loading').plain(),
            title: i18n.msg('loading').plain()
        }), $.extend({
            id: 'view-content-modal',
            callback: function() {
                $('#view-content-btn-wikitext').attr('disabled', '');
                if (is_file) {
                    $('.view-content-ajax').before(i18n.msg('file-notice').escape());
                }
                get_deleted_content(title, function(content) {
                    $('.view-content-ajax').replaceWith($('<textarea>', {
                        class: 'view-content-textarea',
                        readonly: '',
                        val: content
                    }));
                });
            },
            buttons: [{
                message: i18n.msg('close').escape(),
                id: 'view-content-btn-close',
                handler: function() {
                    $('#view-content-modal').closeModal();
                }
            }, {
                message: i18n.msg('preview').escape(),
                id: 'view-content-btn-preview',
                defaultButton: true,
                handler: function() {
                    $.showCustomModal(i18n.msg('preview-header').escape(), $('<img>', {
                        class: 'view-content-ajax',
                        src: window.stylepath + '/common/images/ajax.gif',
                        alt: i18n.msg('loading').plain(),
                        title: i18n.msg('loading').plain()
                    }), $.extend({
                        id: 'view-content-preview-modal',
                        width: 640,
                        callback: function() {
                            if (is_file) {
                                var should_preview = config.noPrompt || confirm(i18n.msg('file-prompt', title).plain());
                                if (!should_preview) {
                                    $('#view-content-preview-modal').closeModal();
                                    return;
                                }
                                hacky_image_preview(title, function(url) {
                                    $('.view-content-ajax')
                                        .removeAttr('title')
                                        .attr('class', 'view-content-image-preview')
                                        .attr('src', url)
                                        .css({'max-width' : '640px', 'object-fit' : 'contain'});
                                });
                            } else {
                                preview_edit($('.view-content-textarea').val(), function(content) {
                                    $('.view-content-ajax').replaceWith(content);
                                });
                            }
                        }
                    }, config.modal.preview));
                }
            }, {
                message: i18n.msg('restore').escape(),
                id: 'view-content-btn-restore',
                defaultButton: true,
                handler: function() {
                    restore_page(title, prompt(i18n.msg('restore-prompt').plain()), function() {
                        $.showCustomModal(i18n.msg('done').escape(), i18n.msg('page-restored').escape());
                    });
                }
            }]
        }, config.modal.content));
    }
    // Function to get the content. If the page was restored, falls back to the current content of the existing page.
    function get_deleted_content(title, callback) {
        Api.get({
            action: 'query',
            prop: 'revisions', // in case it's restored
            rvprop: 'content|ids',
            titles: title,
            list: 'deletedrevs', // in case it wasn't restored
            drprop: 'content|revid',
            drlimit: 1
        }).done(function(d) {
            callback(d.query.deletedrevs[0] ? d.query.deletedrevs[0].revisions[0]['*'] : d.query.pages[Object.keys(d.query.pages)[0]].revisions[0]['*']);
        });
    }
    // Function to restore the page
    function restore_page(title, reason, callback) {
        if (!reason) return;
        Api.post({
            action: 'undelete',
            title: title,
            reason: reason,
            token: mw.user.tokens.get('editToken')
        }).done(function(d) {
            if (!d.error) {
                callback(d);
            } else {
                alert(d.error.code + ': ' + d.error.info);
            }
        });
    }
    // Preview text as an article
    function preview_edit(text, callback) {
        Api.get({
            action: 'parse',
            text: text
        }).done(function(d) {
            callback(d.parse.text['*']);
        });
    }
    // Small loan of a million dollars to who can come up with how to do this with just APIs.
    // Not really, but I will credit you on the doc page.
    function hacky_image_preview(title, callback) {
        $.get(mw.util.getUrl('Special:Undelete') + '?target=' + encodeURIComponent(title), function(page) {
            var $page = $(page),
            url = $page.find('#undelete ul:last-of-type > li > a[href]:first-of-type').attr('href');
            if (url.indexOf('token') == -1) {
                alert(i18n.msg('redirect-prompt').plain());
                $('#view-content-preview-modal').closeModal();
            }
            callback(url);
        });
    }
    mw.hook('dev.i18n').add(function(lib) { // Wait for i18n-js to load
        lib.loadMessages('ViewDeleted').done(function(_i18n) {
            i18n = _i18n;
            i18n.useUserLang();
            add_links();
            // AjaxRC integration
            window.ajaxCallAgain = window.ajaxCallAgain || [];
            window.ajaxCallAgain.push(add_links);
        });
    });
    mw.util.addCSS('.view-content-ajax {\
        display: block;\
        margin: 30px auto;\
    }\
    .view-content-textarea { \
        width: 100%;\
        height: 300px;\
    }');
    if (config.rc) {
        mw.util.addCSS('.comment + .view-content-wrapper {\
            margin-left: 4px;\
        }');
    }
});