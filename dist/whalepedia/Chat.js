// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
        var chatTopic = '<span style="color:white;">Welcome to the Whale Empire Network!</span><br /><a href="/wiki/Whalepedia:Chat_Policy" style="text-decoration:none;" style="text-decoration:none;" target="_blank" title="Chat Policy">Guidelines</a> <span style="color:white;">•</span> <a href="/wiki/MediaWiki:Emoticons" style="text-decoration:none;" style="text-decoration:none;" target="_blank" title="Emoticons">Emotes</a></font> <span style="color:#90C;">•</span> <a href="/wiki/Whalepedia:Administrators" style="text-decoration:none;" style="text-decoration:none;" target="_blank" title="Whalepedia Administrators">Admins</a> <img width="13" height="13" src="https://vignette.wikia.nocookie.net/halo/images/b/bb/USER-Spartacus_Emblem.png"> <span style="color:#FFFFFF;">=</span>
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:white; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// END Chat topic
 
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
 
/*Mark admins*/
// Written by administrators of the Runescape wiki, who also kindly gave permission for use. 
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/1hs444|Spartacus0898/)) {
				$(this).parent().addClass('admin');
			} else {
				$(this).parent().addClass('bot');
			}
		}
	});
}, 1000)