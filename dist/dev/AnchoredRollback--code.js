/** 
 * Anchored Rollback
 * @description Perform rollbacks without changing location
 * @author Ozank
 */

(function() {
    if (window.AnchoredRollbackLoaded) {
        return;
    }
    window.AnchoredRollbackLoaded = true;
    
    var config = mw.config.get([
            'stylepath',
            'wgUserGroups',
            'wgVersion'
        ]),
        isBot = config.wgUserGroups.indexOf('bot') !== -1 ||
                window.anchoredRollbackBot,
        msg;

    function click(e) {
        var $this = $(this),
            href = new mw.Uri($this.attr('href'));

        // validate that link is a rollback link for current wiki
        if (
            href.host !== location.hostname ||
            href.query.action !== 'rollback'
        ) {
            return;
        }

        e.preventDefault();

        if (isBot) {
            href += '&bot=1';
        }

        if (config.wgVersion === '1.19.24') {
            $this.html(
                $('<img>', {
                    src: config.stylepath + '/common/images/ajax.gif'
                })
            );
        } else {
            $this.addClass('mw-ajax-loader');
        }

        $.ajax(href.toString(), {
            dataType: 'text'
        }).done(function() {
            $this
                .css({
                    'color': 'gray',
                    'text-decoration': 'line-through'
                })
                .removeAttr('href title')
                .text(msg)
                .removeClass('mw-ajax-loader');
        });
    }

    function init(i18n) {
        msg = i18n.msg('rollbacked').plain();
        $(document.body).on('click', '.mw-rollback-link > a[href]', click);
    }

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('AnchoredRollback').then(init);
    });
})();