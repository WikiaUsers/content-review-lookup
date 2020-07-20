/* Any JavaScript here will be loaded for all users on every page load. */

// Custom edit buttons
if (mw.toolbar) {
	mw.toolbar.addButton(
		'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
		'Redirect',
		'#REDIRECT [[',
		']]',
		'Insert text',
		'mw-editbutton-redirect'
	);

	mw.toolbar.addButton(
		'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
		'Add the ō character',
		'ō',
		'',
		'',
		'mw-editbutton-macron-o'
	);
		
	mw.toolbar.addButton(
		'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
		'Add the ū character',
		'ū',
		'',
		'',
		'mw-editbutton-macron-u'
	);

	mw.toolbar.addButton(
		'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
		'Add a Chapter Reference',
		'<ref>',
		'</ref>',
		'Chapter 0, page 0',
		'mw-editbutton-ref'
	);
}