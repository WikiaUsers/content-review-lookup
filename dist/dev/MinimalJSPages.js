(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'JSPages' || window.MinimalJSPagesLoaded) {
        return;
    }
    window.MinimalJSPagesLoaded = true;

    function click (event) {
        var clicked = $(event.target);
        var target = $('table > tbody > tr');
        clicked.hide();
        if (clicked.hasClass('showunsubmitted')) {
            $('button.hideapproved').hide();
            target.has('td:nth-child(2) > span:not(.content-review-status-unsubmitted)').hide();
        } else {
            target.has('td:nth-child(2) > .content-review-status-live').hide();
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