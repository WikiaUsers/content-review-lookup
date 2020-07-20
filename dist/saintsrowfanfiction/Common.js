importArticles({
    type: 'script',
    articles: [
        'u:sr:MediaWiki:Common.js/AjaxRC.js',		        /* Autoload new items on Recentchanges   */
        'u:sr:MediaWiki:Common.js/MaintenanceReport.js',	/* loads all maintenance reports         */
        'u:sr:MediaWiki:Common.js/htmlentities.js',		/* adds a button to encode htmlentities  */
        'u:sr:MediaWiki:Common.js/DragDropUploader.js',      /* Special:Upload?DragDrop=1 */
        'u:dev:DupImageList/code.js',			/* Import dup image list. see that page for usage */ 
        'u:dev:AutoEditDropdown/code.js', 		/* automatically open edit menu on hover */
        'u:dev:View_Source/code.js',			/* add "view source" link to edit dropdown */
        'u:dev:PurgeButton/code.js',			/* add "refresh"     link to edit dropdown */
        'u:dev:NullEditButton/code.js',			/* add "null edit"   link to edit dropdown */
        'u:dev:SearchSuggest/code.js',			/* add "search suggestions" to search results */
        'u:dev:RevealAnonIP/code.js',			/* Replace "a wikia contributor" with IP address */
        'u:dev:ReferencePopups/code.js',                /* reference popups */
        'u:dev:DISPLAYTITLE/code.js'			/* Import displaytitle.   see that page for usage */
    ]
});