(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'JSPages' || window.MinimalJSPagesLoaded) {
        return;
    }
    window.MinimalJSPagesLoaded = true;
    var ucp = mw.config.get('wgVersion') !== '1.19.24';

    function click () {
        $(this).hide();
        if ($(this).hasClass('showunsubmitted')) {
            $('button.hideapproved').hide();
            $('table > tbody > tr').has('td:nth-child(2) > span:not(.content-review-status-unsubmitted)').hide();
        } else {
            $('table > tbody > tr').has('td:nth-child(2) > .content-review-status-live').hide();
        }
    }

    function init (i18n) {
        var button1 = $('<button>', {
            click: click,
            text: i18n.msg('show').plain(),
            class: 'showunsubmitted secondary'
        });
        var button2 = $('<button>', {
            click: click,
            text: i18n.msg('hide').plain(),
            class: 'hideapproved secondary'
        });
        $('table').prev().append(button1, ' ', button2);

        //not jquery because .children() doesn't support text nodes
        document.querySelectorAll('.content-review-status').forEach(function (status) {
            var td = status.parentElement,
            nodes = td.childNodes,
            i = nodes.length;
            while (i--) {
                var node = nodes[i];
                if (node.nodeType == Node.TEXT_NODE || status.classList.contains('content-review-status-rejected') && i == 1) {
                    td.removeChild(node);
                }
            }
        });
    }

    function UCPclick () {
        $(this).hide();
        if ($(this).hasClass('showunsubmitted')) {
            $('button.hideapproved').hide();
            $('.content-review__table > tbody > tr').has('td:nth-child(2) > div:not(.content-review__status--unsubmitted)').hide();
        } else {
            $('.content-review__table > tbody > tr').has('td:nth-child(2) > .content-review__status--live').hide();
        }
    }

    function UCPinit (i18n) {
        var button1 = $('<button>', {
            click: UCPclick,
            text: i18n.msg('show').plain(),
            class: 'showunsubmitted wds-button wds-is-secondary'
        });
        var button2 = $('<button>', {
            click: UCPclick,
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
        if (ucp) {
            i18n.loadMessages('MinimalJSPages').done(UCPinit);
        } else {
            i18n.loadMessages('MinimalJSPages').done(init);
        }
    });

    importArticles({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }, {
        type: 'style',
        article: 'u:dev:MediaWiki:MinimalJSPages.css'
    });
})();