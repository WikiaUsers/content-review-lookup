// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('Chat/Options.js','scripts');
	$('#chatOptionsButton').remove()
	$('#chat-options-button').appendTo("#ChatHeader").css({'right' : '155px', 'bottom' : 0, 'position' : 'absolute', 'cursor' : 'pointer'});
}
 
// ****************
// END Chat options import
// ****************
 
// load chat options stylesheet
importStylesheetPage('Chat/Chat.css', 'scripts');
// end load chat options stylsheet