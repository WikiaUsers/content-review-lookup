/* Any JavaScript here will be loaded for all users on every page load. */ 
/* From [[wikipedia:MediaWiki:Common.js/edit.js]]. Will install the Reference dialog, etc., also, soon.*/        
/*Depnding on: 
[[File:Button_blockquote.png]]
[[File:Button_enter.png]]
[[File:Button_hide_comment.png]]  
[[File:Button_insert_table.png]]   
[[File:Button_redirect.png]]     
[[File:Button_reflink.png]]    
[[File:Button_strike.png]] 
All from Wikipedia.         
*/ 
 

function addExtraButtons () {
	mw.toolbar.addButtons(
	{
		'imageId': 'button-redirect',
		'imageFile': '//static3.wikia.nocookie.net/psiepsilon/images/c/c9/Button_redirect.png',   
		'speedTip': 'Redirect',
		'tagOpen': '#REDIRECT[[',
		'tagClose': ']]',
		'sampleText': 'Target page name'
	},
	{
		'imageId': 'button-strike',
		'imageFile': '//static3.wikia.nocookie.net/psiepsilon/images/c/c9/Button_strike.png',  
		'speedTip': 'Strike',
		'tagOpen': '<s>',
		'tagClose': '</s>',
		'sampleText': 'Strike-through text'
	},
	{
		'imageId': 'button-enter',
		'imageFile': '//static3.wikia.nocookie.net/psiepsilon/images/c/c9/Button_enter.png',  
		'speedTip': 'Line break',
		'tagOpen': '<br/>',
		'tagClose': '',
		'sampleText': ''
	}, 
		'imageId': 'button-hide-comment',
		'imageFile': '//static3.wikia.nocookie.net/psiepsilon/images/c/c9/Button_hide_comment.png', 
		'speedTip': 'Insert hidden Comment',
		'tagOpen': '<!-- ',
		'tagClose': ' -->',
		'sampleText': 'Comment'
	}, 
	{
		'imageId': 'button-blockquote',
		'imageFile': '//static3.wikia.nocookie.net/psiepsilon/images/c/c9/Button_blockquote.png',
		'speedTip': 'Insert block of quoted text',
		'tagOpen': '<blockquote>\n',
		'tagClose': '\n</blockquote>',
		'sampleText': 'Block quote'
	},
	{
		'imageId': 'button-insert-table',
		'imageFile': '//static3.wikia.nocookie.net/psiepsilon/images/c/c9/Button_insert_table.png',
		'speedTip': 'Insert a table',
		'tagOpen': '{| class="wikitable"\n|',
		'tagClose': '\n|}',
		'sampleText': '-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3'
	},
	{
		'imageId': 'button-insert-reflink',
		'imageFile': '//static3.wikia.nocookie.net/psiepsilon/images/c/c9/Button_reflink.png',
		'speedTip': 'Insert a reference',
		'tagOpen': '<ref>',
		'tagClose': '</ref>',
		'sampleText': 'Insert footnote text here'
	}
	);
}
 
mw.loader.using( 'user.options', function () {
	if ( ! mw.user.options.get( 'usebetatoolbar' ) ) {
		mw.loader.using( 'mediawiki.action.edit', function(){
			$( addExtraButtons );
		} );
	}
} );