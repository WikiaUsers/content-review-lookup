/* Import */

importArticles({
    type: "script",
    articles: [
        'u:onepiece:MediaWiki:Common.js/elementClass.js',
        'u:joeplayground:MediaWiki:Tooltip.js'
    ]
});


/* Allow direct link to Tabber */

(function ($){
    var hash = window.location.hash.replace('#', '').replace(/_/g, ' ');
    if (hash === '') return;
    $(function(){
        setTimeout(function() {
            var currentTabber = $('.tabbernav > li > a[title="' + hash + '"]');
            currentTabber.click();
        }, 100);
    });    
})(jQuery);


/* Disable YouTube Autoplay */

window.YoutubePlayerDisableAutoplay = true;