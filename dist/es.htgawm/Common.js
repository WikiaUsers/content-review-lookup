
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
"speedTip": "Redirect",
"tagOpen": "#REDIRECT [[",
"tagClose": "]]",
"sampleText": "Insert text"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
"speedTip": "Strike",
"tagOpen": "<s>",
"tagClose": "</s>",
"sampleText": "Strike-through text"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
"speedTip": "Line break",
"tagOpen": "<br />",
"tagClose": "",
"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
"speedTip": "Comment visible only for editors",
"tagOpen": "<!-- ",
"tagClose": " -->",
"SampleText": "Inserta el enlace aqui"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile": "https://vignette.wikia.nocookie.net/how-to-get-away-with-murder/images/e/e1/Refbutton.png/revision/latest?cb=20170202075355&path-prefix=es",
"speedTip": "Referencias",
"tagOpen": "<ref>",
"tagClose": "</ref>",
"SampleText": "Inserta el enlace aqui"};
}

<!-- ------------------------------------------------------------------ -->
/* Any JavaScript here will be loaded for all users on every page load. */
$(function () {
    var conf = mw.config.get([
            'wgAction',
            'wgNamespaceNumber'
        ]);
 
	// loads [[MediaWiki:Geshi.css]] on Thread namespace as necessary
	// as it's not loaded by default
	// @example <https://dev.wikia.com/wiki/Thread:5735>
	// @todo check if this is needed for Message_Wall too
	// @todo submit a bug report for this too
	if (conf.wgNamespaceNumber === 1201 && $('.mw-geshi').length) {
		mw.loader.load('ext.geshi.local');
	}
 
	if (
            conf.wgAction === 'edit' &&
            conf.wgNamespaceNumber === 0
        ) {
            // causing some duplication bugs atm, will revisit soon TM
            // importScript('MediaWiki:CodeEditor.js');
	}
});