(function() {
    var config = mw.config.get(['wgNamespaceNumber', 'wgTitle', 'wgPageName', 'wgSiteName']);
    function getPostfix(wiki) {
        return ' | ' + wiki + ' | Fandom';
    }
    function isCustom(postfix, pageName, title) {
        return pageName !== title.substring(0, title.length - postfix.length);
    }
    var isCustomTitle = isCustom(getPostfix(config.wgSiteName), config.wgPageName, $('title').text());
    if (config.wgNamespaceNumber !== 2 || config.wgTitle.indexOf('/') !== -1 || isCustomTitle || window.isLakeNamesLoaded) {
        return;
    }
    window.isLakeNamesLoaded = true;
    $('title').text(config.wgTitle + getPostfix(config.wgSiteName));
})();