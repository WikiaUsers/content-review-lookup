/*
Fire wikipage.content after Fandom's right rail has loaded so the native
collapsible toggle can initialize after #p-tb exists. Use a temporary
attached div as the content context to avoid re-processing existing page
components such as slideshow galleries.
*/
mw.hook('fandom.rightrail.loaded').add(function () {
    var $content = $('#mw-content-text');
    if ($content.length) {
        var $context = $('<div>').appendTo($content);
        mw.hook('wikipage.content').fire($context);
        $context.remove();
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