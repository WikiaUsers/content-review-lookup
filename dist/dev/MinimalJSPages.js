(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'JSPages' || window.MinimalJSPagesLoaded) {
        return;
    }
    window.MinimalJSPagesLoaded = true;

    function click () {
        $(this).hide();
        if ($(this).hasClass('showunsubmitted')) {
            $('button.hideapproved').hide();
            $('.content-review__table > tbody > tr').has('td:nth-child(2) > div:not(.content-review__status--unsubmitted)').hide();
        } else {
            $('.content-review__table > tbody > tr').has('td:nth-child(2) > .content-review__status--live').hide();
        }
    }

    function init (i18n) {
        var button1 = $('<button>', {
            click: click,
            text: i18n.msg('show').plain(),
            class: 'showunsubmitted wds-button wds-is-secondary'
        });
        var button2 = $('<button>', {
            click: click,
            text: i18n.msg('hide').plain(),
            class: 'hideapproved wds-button wds-is-secondary'
        });
        $('.content-review__table-wrapper').prev().append(button1, ' ', button2);

        //not jquery because .children() doesn't support text nodes
        document.querySelectorAll('.content-review__status').forEach(function (status) {
            if (status.classList.contains('content-review__status--none')) {
                return;
            }
            var nodes = status.childNodes,
            i = nodes.length;
            while (i--) {
                var node = nodes[i];
                if (node.nodeType == Node.TEXT_NODE) {
                    status.removeChild(node);
                }
            }
        });
    }

    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('MinimalJSPages').done(init);
    });

    importArticles({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }, {
        type: 'style',
        article: 'u:dev:MediaWiki:MinimalJSPages.css'
    });
})();