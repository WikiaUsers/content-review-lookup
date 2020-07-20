/* This page is for Special:Chat stuffs. */


/*imports */
//importScriptPage('MediaWiki:Chat.js/ChatTags.js', 'bcow');
//importScriptPage('MediaWiki:Chat.js/Engrish.js', 'gt3test');
//importScriptPage('MediaWiki:Chat.js/Walrus.js', 'bcow');
//importScriptPage('MediaWiki:Chat.js/Block.js', 'bcow');
//importScriptPage('MediaWiki:Chat.js/hax.js', 'bcow');
//importScriptPage('MediaWiki:ChatOptionscode.js', 'bcow');

/*verification (useless)*/
//console.log('Chat.js loaded. Revision 1.');

/* Other, credits to pvzcc*/
//importScriptPage("MediaWiki:Chat.js/multikick.js", "bloonsconception"); 
//$('a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multi-kick</a>').appendTo('.Write');
//importScriptPage("MediaWiki:Chat.js/grouppm.js", "bloonsconception");

//tasty's fix

var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('ChatOptions/code.js','dev');
}