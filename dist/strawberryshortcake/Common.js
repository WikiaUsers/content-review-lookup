/* Any JavaScript here will be loaded for all users on every page load. */
// switching to Wikia's new method
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ShowHide/code.js",
        "w:c:dev:AjaxBatchDelete/code.js",
        "w:c:dev:BackToTopButton/code.js",
        "w:c:dev:CollapsibleEdittools/code.js",
        "w:c:dev:DupImageList/code.js",
        "w:c:deadisland:User:Jgjake2/js/DISPLAYTITLE.js"
        "w:c:runescape:User:Quarenon/massrollback.js"
    ]
});

/** Extra toolbar options ******************************************************
 *  
 *  Description: Adds extra buttons to the old (non-enhanced) editing toolbar.
 *  
 *  Maintainers: [[User:MarkS]], [[User:Voice of All]], [[User:R. Koot]]
 */
 
mw.loader.using( 'mediawiki.action.edit', function() {
	var buttons, i, len;
 
	buttons = [
	{
		'id': "button-redirect",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
		'speedTip': "Redirect",
		'tagOpen': "#REDIRECT [[",
		'tagClose': "]]",
		'sampleText': "Target page name"
	},
	{
		'id': "button-strike",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
		'speedTip': "Strike",
		'tagOpen': "<s>",
		'tagClose': "</s>",
		'sampleText': "Strike-through text"
	},
	{
		'id': "button-enter",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
		'speedTip': "Line break",
		'tagOpen': "<br />",
		'tagClose': "",
		'sampleText': ""
	},
	{
		'id': "button-superscript",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
		'speedTip': "Superscript",
		'tagOpen': "<sup>",
		'tagClose': "</sup>",
		'sampleText': "Superscript text"
	},
	{
		'id': "button-subscript",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
		'speedTip': "Subscript",
		'tagOpen': "<sub>",
		'tagClose': "</sub>",
		'sampleText': "Subscript text"
	},
	{
		'id': "button-small",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
		'speedTip': "Small",
		'tagOpen': "<small>",
		'tagClose': "</small>",
		'sampleText': "Small text"
	},
	{
		'id': "button-hide-comment",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
		'speedTip': "Insert hidden Comment",
		'tagOpen': "<!-- ",
		'tagClose': " -->",
		'sampleText': "Comment"
	},
	{
		'id': "button-gallery",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
		'speedTip': "Insert a picture gallery",
		'tagOpen': "\n<gallery>\n",
		'tagClose': "\n</gallery>",
		'sampleText': "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
	},
	{
		'id': "button-blockquote",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
		'speedTip': "Insert block of quoted text",
		'tagOpen': "<blockquote>\n",
		'tagClose': "\n</blockquote>",
		'sampleText': "Block quote"
	},
	{
		'id': "button-insert-table",
		'imageFile': "//upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
		'speedTip': "Insert a table",
		'tagOpen': '{| class="wikitable"\n|',
		'tagClose': "\n|}",
		'sampleText': "-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
	},
	{
		'id': "button-insert-reflink",
		'imageFile': "//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
		'speedTip': "Insert a reference",
		'tagOpen': "<ref>",
		'tagClose': "</ref>",
		'sampleText': "Insert footnote text here"
	}
	];
 
	for ( i = 0, len = buttons.length; i < len; i++ ) {
		mw.toolbar.addButton(
			buttons[i].imageFile,
			buttons[i].speedTip,
			buttons[i].tagOpen,
			buttons[i].tagClose,
			buttons[i].sampleText,
			buttons[i].id,
			buttons[i].id
		);
	}
 
});