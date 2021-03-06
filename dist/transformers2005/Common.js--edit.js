/* Any JavaScript here will be loaded for all users on every page load. */
/*global mw, importScript */
/*jshint strict: false, browser: true, jquery: true */
/**
 * Extra toolbar options
 *  
 *  Description: Adds extra buttons to the old (non-enhanced) editing toolbar.
 *  
 *  Maintainers: [[User:MarkS]], [[User:Voice of All]], [[User:R. Koot]]
 */
 
function addExtraButtons () {
	mw.toolbar.addButtons(
	{
		'imageId': 'button-redirect',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png',
		'speedTip': 'Redirect',
		'tagOpen': '#REDIRECT[[',
		'tagClose': ']]',
		'sampleText': 'Target page name'
	},
	{
		'imageId': 'button-strike',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png',
		'speedTip': 'Strike',
		'tagOpen': '<s>',
		'tagClose': '</s>',
		'sampleText': 'Strike-through text'
	},
	{
		'imageId': 'button-enter',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png',
		'speedTip': 'Line break',
		'tagOpen': '<br/>',
		'tagClose': '',
		'sampleText': ''
	},
	{
		'imageId': 'button-subscript',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png',
		'speedTip': 'Subscript',
		'tagOpen': '<sub>',
		'tagClose': '</sub>',
		'sampleText': 'Subscript text'
	},
	{
		'imageId': 'button-superscript',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png',
		'speedTip': 'Superscript',
		'tagOpen': '<sup>',
		'tagClose': '</sup>',
		'sampleText': 'Superscript text'
	},
	{
		'imageId': 'button-small',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/5/58/Button_small.png',
		'speedTip': 'Small',
		'tagOpen': '<small>',
		'tagClose': '</small>',
		'sampleText': 'Small text'
	},
	{
		'imageId': 'button-hide-comment',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png',
		'speedTip': 'Insert hidden Comment',
		'tagOpen': '<!-- ',
		'tagClose': ' -->',
		'sampleText': 'Comment'
	},
	{
		'imageId': 'button-gallery',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png',
		'speedTip': 'Insert a picture gallery',
		'tagOpen': '\n<gallery>\n',
		'tagClose': '\n</gallery>',
		'sampleText': 'File:Example.svg|Caption1\nFile:Example.jpg|Caption2'
	},
	{
		'imageId': 'button-blockquote',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png',
		'speedTip': 'Insert block of quoted text',
		'tagOpen': '<blockquote>\n',
		'tagClose': '\n</blockquote>',
		'sampleText': 'Block quote'
	},
	{
		'imageId': 'button-insert-table',
		'imageFile': '//upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png',
		'speedTip': 'Insert a table',
		'tagOpen': '{| class="wikitable"\n|',
		'tagClose': '\n|}',
		'sampleText': '-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3'
	},
	{
		'imageId': 'button-insert-reflink',
		'imageFile': '//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
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
 
/**
 * Fix edit summary prompt for undo
 *
 *  Fixes the fact that the undo function combined with the "no edit summary prompter"
 *  causes problems if leaving the edit summary unchanged.
 *  Added by [[User:Deskana]], code by [[User:Tra]].
 *  See also [[bugzilla:8912]].
 */
$(function () {
    if (document.location.search.indexOf('undo=') !== -1 && document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value = '1';
    }
});
 
 
/**
 * RefToolbar
 *
 *  Description: Adds tools for citing references to the edit toolbar. 
 *  See [[Wikipedia:RefToolbar]] for further documentation. One of
 *  three possible versions will load (Reftoolbar 2.0b, Reftoolbar 2.0a,
 *  or Reftoolbar 1.0) depending on the user preferences (the
 *  usebetatoolbar and usebetatoolbar-cgd parameters).
 *
 *  To disable this script, add
 *      refToolbarInstalled = 'bypass';
 *  to [[Special:Mypage/common.js]].
 *
 *  Current maintainers: none
 *  Former maintainers: [[User:Mr.Z-man]], [[User:Kaldari]]
 */
function initializeRefTools() {
    if ( window.refToolbarInstalled === undefined ) {
        importScript( 'MediaWiki:RefToolbarBase.js' );
 
        if ( mw.user.options.get( 'usebetatoolbar' ) ) {
            // Enhanced editing toolbar is on. Going to load Reftoolbar 2.0a or 2.0b.
            if ( mw.user.options.get( 'usebetatoolbar-cgd' ) ) {
                // Dialogs are on. Loading 2.0b. (standard)
                mw.loader.using( 'ext.wikiEditor.toolbar', function () {
                    importScript( 'MediaWiki:RefToolbar.js' );
                });
            } else {
                // Dialogs are off. Loading 2.0a.
                mw.loader.using( 'ext.wikiEditor.toolbar', function () {
                    importScript( 'MediaWiki:RefToolbarNoDialogs.js' );
                });
            }
        } else {
            // Enhanced editing toolbar is off. Loading Reftoolbar 1.0. (legacy)
            importScript( 'MediaWiki:RefToolbarLegacy.js' );
        }
 
        window.refToolbarInstalled = true;
    }
}
 
$( initializeRefTools );