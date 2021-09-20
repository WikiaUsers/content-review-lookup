window.BackToTopModern = true;
 
/* Add .activetab to the active tab - By Fujimaru-kun from Fairy-Tail Fr Wiki  */
$( '.pi-theme-tab .pi-header .selflink').parent().addClass('activetab');

/* Add defImageLoader and AppendBlock.js to the import - By TRJ-VoRoN from The Binding of Isaac Ru Wiki and By Vastmine1029 from Adopt Me! Wiki */
importArticles({
    type: 'script',
    articles: [
        'u:ru.bindingofisaac:MediaWiki:Common.js/defImageLoader.js',
        'u:adoptme:MediaWiki:AppendBlock.js',
    ]
});