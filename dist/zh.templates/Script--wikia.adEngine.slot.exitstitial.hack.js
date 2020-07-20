/**
* __NOWYSIWYG__
* [[Category:Script|{{SUBPAGENAME}}]]
* [[Category:Wikia|{{SUBPAGENAME}}]]
* 
* 此 js 用來修正外鏈連結廣告會造成將網頁跳轉而不是開啟新分頁或是視窗
**/

(function(){
    var _context = ads.context;
    
    $(window)
        .on('load.exitstitial', function(){
            
setTimeout(function(){
    
    var _exitstitial = $('.WikiaArticle a.exitstitial').filter('.external, .extiw');

    //console.log([ads.context]);
    
    if ((_context.slots.exitstitial && _context.opts.pageType == 'all_ads') || _exitstitial.eq(0).hasHandlers('click'))
    {
        require(['ext.wikia.adEngine.slot.inContentPlayer', 'ext.wikia.adEngine.slot.skyScraper3', 'wikia.document', 'wikia.window', require.optional('ext.wikia.adEngine.slot.exitstitial'), require.optional('ext.wikia.adEngine.slot.inContentDesktop')], function(inContentPlayer, skyScraper3, doc, win, exitstitial, inContentDesktop)
        {
            //console.log(['wikia.adEngine.slot.exitstitial.hack 1', _exitstitial.eq(0).listHandlers('onclick'), _exitstitial]);
            
            _exitstitial.off('click');
        });
        
        //console.log(['wikia.adEngine.slot.exitstitial.hack 2', _exitstitial.eq(0).listHandlers('onclick'), _exitstitial]);
        _exitstitial.off('click');
    }
}, 1500);

        })
        .trigger('load.exitstitial')
    ;

})();