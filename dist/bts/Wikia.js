window.BackToTopModern = true;
 
/* Add .activetab to the active tab - By Fujimaru-kun from Fairy-Tail Fr Wiki  */
$( '.pi-theme-tab .pi-header .selflink').parent().addClass('activetab');

/* Add defImageLoader to the import - By TRJ-VoRoN from The Binding of Isaac Ru Wiki  */
importArticles({
    type: 'script',
    articles: [
        'u:bindingofisaac:MediaWiki:Common.js/defImageLoader.js',
    ]
});