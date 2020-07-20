// <nowiki>
/* 
* Mass Rename Revert
* @desc Opens all "revert" links on [[Special:Log/move]] that are currently ticked
* Due to MediaWiki limitations, it is not possible to do with ?action=move in the API currently with regular user rights, so opening them all is the best we can do
* Opens all those which are ticked
* @author Ozuzanna
*/

;(function($, mw) {
    var groups = window.MassRenameRevertGroups || ['autoconfirmed'],
        config = mw.config.get([
            'wgUserGroups',
            'wgPageName',
            'wgCanonicalSpecialPageName'
        ]);
    if (
        window.MassRenameRevertLoaded ||
        !config.wgUserGroups.some(function(el) {
            return groups.indexOf(el) !== -1;
        })
    ) {
        return;
    }
    window.MassRenameRevertLoaded = true;
    var i18n;
    function init (i18nData) {
        i18n = i18nData;
        if (
            config.wgPageName === 'Special:Log/move' ||
            (
                config.wgCanonicalSpecialPageName === 'Log' &&
                document.URL.indexOf('type=move') !== -1
            )
        ) {
            loadScript();
        }
    }
    function loadScript () {
        var chk = '<input type="checkbox" checked="checked"/> ';
        $('#mw-content-text').find('p').first().append('<br/><a id="start-btn" class="button" style="cursor:pointer">' + i18n.msg('open').escape() + '</a> <a id="uncheck-btn" class="button" style="cursor:pointer">' + i18n.msg('uncheck').escape() +'</a>');
        $('.mw-logline-move').each(function() {
            var title = $(this).children('a').last().attr('title');
            if (title.split('(page does not exist)').length === 1) {
                $(this).prepend(chk);
            }
        });
        $('#start-btn').click(function() {
            $('.mw-logline-move').each(function() {
                var chkObject = $(this).find('input');
                if (chkObject.attr('checked')) {
                    var href = $(this).children('.mw-logevent-actionlink').find('a').attr('href');
                    window.open(href,'_blank');
                }
            });
        });
 
        $('#uncheck-btn').click(function() {
            var btn = $(this);
            if (btn.text() == i18n.msg('uncheck').plain()) {
                $('.mw-logline-move').each(function() {
                    var chkObject = $(this).find('input');  
                    if (chkObject.attr('checked')) {
                        chkObject.removeAttr('checked');
                    }
                });
                btn.text(i18n.msg('check').plain());
            } else {
                $('.mw-logline-move').each(function() {
                    var chkObject = $(this).find('input');  
                    if (!chkObject.attr('checked')) {
                        chkObject.attr('checked','checked');
                    }
                });
                btn.text(i18n.msg('uncheck').plain()); 
            }
        });
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('MassRenameRevert').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})(this.jQuery, this.mediaWiki);