/**
 * Ajax Page Rename
 * Allows the user to quickly rename a page without having to load Special:MovePage
 * https://community.fandom.com/wiki/User:Cörey
 */
(function($, mw) {
    var config = mw.config.get([
        'wgPageName'
    ]),
    $list = $('.page-header__contribution-buttons .wds-list');
 
    if(!$list.find('#ca-move').length || window.AjaxRenameLoaded) {
        return;
    }
    window.AjaxRenameLoaded = true;
 
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
 
    var i18n;
 
    function init(res) {
        i18n = res;
        $list.append(
            $('<li>').append(
                $('<a>', {
                    href: '#',
                    id: 'ajax-rename'
                })
                .text(i18n.msg('button').plain())
                .click(renamePage)
            )
        );
    }
 
    function renamePage() {
        var defaultReason = i18n.inContentLang().msg('default-reason').plain();
        var newName = prompt(i18n.msg('target-prompt').plain(), '');
        
        if (newName === null) {
            return;
        }
        
        var moveReason = prompt(i18n.msg('reason-prompt').plain(), defaultReason);
 
        if (moveReason === null) {
            return;
        }
 
        new mw.Api().post({
            action: 'move',
            from: config.wgPageName,
            to: newName,
            movesubpages: '',
            movetalk: '',
            reason: moveReason,
            token: mw.user.tokens.get('editToken')
        }).done(function(d) {
            if (d.error) {
                alert(i18n.msg('error', d.error.code).plain());
            } else {
                alert(i18n.msg('success', config.wgPageName, newName).plain());
                location.reload(true);
            }
        }).fail(function() {
            alert(i18n.msg('error', i18n.msg('ajax-error').plain()).plain());
        });
    }
 
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.user'
    ]).then(function() {
        mw.hook('dev.i18n').add(function (i18no) {
            i18no.loadMessages('AjaxRename').done(init);
        });
    });
 
})(this.jQuery, this.mediaWiki);