/* Buraya konulacak JavaScript kodu sitedeki her kullanıcı için her sayfa yüklendiğinde çalışacaktır */

// Custom edit buttons
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
			'ō harfini ekle',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
			'ū harfini ekle',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
			'Kaynak ekle',
			'<ref>',
			'</ref>',
			'Chapter 0, page 0',
			'mw-editbutton-ref'
		);
	}

/*Spoiler Alert*/
SpoilerAlert = {
  pages: ["Spoiler"],
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});

/*Header Links*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:HeaderLinks/code.js'
    ]
});
/*List Admins*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:ListAdmins/code.js',
    ]
});
/*Flags*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:Flags/code.js',
    ]
});
/*List Users*/
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:ListUsers/code.js',
        // ...
    ]
});
/*FMU*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:FixMultipleUpload/code.js',
    ]
});

/*Global Edit Count*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:GlobalEditcount/code.js',
    ]
});