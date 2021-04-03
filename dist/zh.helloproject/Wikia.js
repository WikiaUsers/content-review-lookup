/* http://community.wikia.com/wiki/Thread:570969#2
** Should disable breadcrumb links in what are considered subpages.
** By [[User:Bobogoobo]] */
$(function() {
    var $h2 = $('.WikiaPageHeader h2'), ismain = (mw.config.get('wgNamespaceNumber') === 0);
    if (ismain && $h2.children('a').length > 1) {
        $h2.html($h2[0].innerHTML.substring($h2[0].innerHTML.indexOf('|') + 1));
    } else if (ismain && $h2.text().indexOf('<') === 0) {
        $h2.remove();
    }
});
 
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:DupImageList/code.js',
        'u:dev:ExtendedNavigation/code.js'
    ]
});