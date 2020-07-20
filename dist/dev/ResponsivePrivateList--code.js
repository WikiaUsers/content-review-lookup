(function() {
    function calcRail() {
        var rail = document.getElementById('Rail');
        var wikilist = document.getElementById('WikiChatList');
        var children = Array.from(rail.children).filter(function(el) {
            return el != wikilist;
        });
        // Clamping is done through #PrivateChatList max-height
        var height = children.reduce(function(h, el) {
            var styles = getComputedStyle(el);
            var verticalMargin = parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
            return h + el.offsetHeight + verticalMargin;
        }, 0);
        wikilist.style.height = (rail.offsetHeight - height) + 'px';
    }

    $(window).resize(calcRail);
    mw.hook('dev.chat.render').add(function(mainRoom) {
        mainRoom.model.privateUsers.bind('add', function() {
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:ResponsivePrivateList.css'
            });
            calcRail();
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Chat-js.js'
    });
})();