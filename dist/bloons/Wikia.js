// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/accountNavigation.js'
    ]
});

/* Add Sandbox tab on all user pages and user talk pages - from SML Wiki */
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/User:" + wgTitle + "/Sandbox";
    var adds = "<li data-id='sandbox'><a href='" + address + "'>Sandbox</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});