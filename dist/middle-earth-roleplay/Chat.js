importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importScriptPage('ChatNotifications/code.js', 'dev');

var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	//importScriptPage('Chat/Options.js','scripts');
	importScriptPage('ChatOptions/code.js','dev');
	$('#chatOptionsButton').remove();
	$('#chat-options-button').appendTo("#ChatHeader").css({'right' : '155px', 'bottom' : 0, 'position' : 'absolute', 'cursor' : 'pointer'});
}