importArticles({
    type: 'script',
    articles: [
        "w:c:dev:FileUsageAuto-update/code.js",
        "w:c:dev:QuickDelete/code.js",
        "w:c:dev:AjaxBatchDelete/code.js",
        "w:c:dev:ListFiles/code.js",
        "w:c:dev:NullEditButton/code.js",
        "w:c:dev:ReferencePopups/code.js"
    ]
});
	// Custom edit buttons
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
			'Redirect',
			'#REDIRECT [[',
			']]',
			'Inserisci testo',
			'mw-editbutton-redirect'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
			'Aggiungi la ō',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
			'Aggiungi la ū',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
			'Aggiungi una nota a piè di pagina',
			'<ref>',
			'</ref>',
			'\{{f|||}}',
			'mw-editbutton-ref'
		);
	}