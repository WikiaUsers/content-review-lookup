/* 
Fire wikipage.content after Fandom's right rail has loaded.
The native toggle-all collapsibles handler runs during the initial
wikipage.content event before the Page Tools portlet (#p-tb) exists,
so it cannot create the collapsible toggle links. 

Firing the hook again after the right rail has loaded allows the native handler to initialize.
This is the same general pattern used by AddRailModule.js on dev.fandom when dynamically attaching rail content.
*/
mw.hook('fandom.rightrail.loaded').add(function () {
    var $content = $('#mw-content-text');
    if ($content.length) {
        mw.hook('wikipage.content').fire($content);
    }
});
/* 
const currentPage = mw.config.get('wgPageName');
const discordPages = [
    'Everspace_Wiki',
    'Everspace_Portal',
    'Everspace_2_Portal'
];
if (discordPages.includes(currentPage)) {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Discord.js'
        ]
    });
}
*/