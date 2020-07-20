/* AjaxRC */
window.ajaxPages = ["Blog:Recent_posts","Special:Chat","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js', //Automatically tabs through a set slides based on a user-defined timer. 
        'u:dev:AjaxRC/code.js',      //Automatically refreshes pages.
    ]
});
 
/* Portable infoboxes colors */
(function(){
    var infobox = $('.portable-infobox');
    if (infobox.length) {
        var color = '',
        classNames = infobox.attr('class').split(' ');
        for (var i = 0; i < classNames.length; i++) {
            if (classNames[i].indexOf('pi-theme-_') !== -1) {
                color = classNames[i].replace('pi-theme-_', '');
                break;
            }
        }
 
        if (color) {
            infobox.css('border', '1px solid #' + color);
            infobox.find('h2').css('background-color', '#' + color);
 
        }
    }
})();