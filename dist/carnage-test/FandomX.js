;(function(mw, $, FX){
    var FXconfig = $.extend(FX, {
            wikiname: server.replace(/http(?:s|):\/\/(.*)\.wikia\.com/, '$1'),
            $page: $('section#WikiaPage'),
            $contentWrapper: $('article#WikiaMainContent'),
            $localNav: $('.PremiumPageHeader, .WikiHeader'),
            $articleHeader: $('.PremiumPageArticleHeader, .WikiaHeader'),
            $wikiaBar: $('#WikiaBarWrapper'),
            $wikiaRail: $('#WikiaRail')
        });
})(this.mediaWiki, this.jQuery, this.FandomX = this.FandomX || {});