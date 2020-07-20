(function(window, $, mw, undefined){
    var deps = ['mediawiki.util', 'mediawiki.Title', 'mediawiki.api'];
    mw.loader.load(deps, null, true);
    
    mw.loader.using(deps).then(function(){
        function RightsBox($elem){
            this.username = $elem.data('user');
        }
    });
}(this, jQuery, mediaWiki, void 0));