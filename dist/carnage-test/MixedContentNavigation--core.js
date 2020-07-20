(function(mw, $, config){
    var MCN_wrapper = mw.util.$content.find('.mixed-content-navigation'),
        MCN_elem = MCN_wrapper.children();
    if (MCN_elem.length === 0) return;
    else {
        importArticles({
            type: 'script',
            articles: [
                'MediaWiki:MixedContentNavigation/main.js',
                'MediaWiki:MixedContentNavigation/icons.js',
                'MediaWiki:MixedContentNavigation/slideshow.js',
                'MediaWiki:MixedContentNavigation/menu.js',
                'MediaWiki:MixedContentNavigation/portal.js',
                'MediaWiki:MixedContentNavigation/search.js'
            ]
        });
        
        if (MCN_elem.length === 1){
            MCN.generate(MCN_elem, function($elem, type){
                var $MCN = MCN.create(type, $elem);
                $elem.replaceWith($MCN);
            });
        } else if (MCN_elem.length > 1){
            MCN_elem.each(function(){
                var $el = $(this);
                MCN.generate($el, function($elem, type){
                    var $MCN = MCN.create(type, $elem);
                    $elem.replaceWith($MCN);
                });
            });
        } else {
            return;
        }
    }
}(mediaWiki, jQuery, $.extend({}, window.MCN_config)));