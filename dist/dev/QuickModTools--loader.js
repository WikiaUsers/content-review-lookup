if (window.ChatWidget) {
    ChatWidget.onClickChatButton = function () {
        var a = window.open('/wiki/Special:Chat', 'wikiachat', mw.config.get('wgWikiaChatWindowFeatures'));
        a.onload = function () {
            a.importArticle({
                type: 'script',
                article: 'u:dev:QuickModTools/code.js'
            });
            $(a).keydown(function (e) {
                if (e.keyCode === 116) {
                    e.preventDefault();
                    var b = window.open(a.location.pathname, 'wikichat' + new Date().getTime(), mw.config.get("wgWikiaChatWindowFeatures"));
                    b.onload = function () {
                        b.importArticle({
                            type: 'script',
                            article: 'u:dev:QuickModTools/code.js'
                        });
                        a.close();
                    };
                }
            });
        };
    };
}