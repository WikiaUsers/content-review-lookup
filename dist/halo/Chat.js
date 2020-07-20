// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
        var chatTopic = '<span style="color:#BE4C00;">Welcome to FLEETCOM - UNSC Fleet Communications.</span><br /><a href="/wiki/Halo_Alpha:Chat_Policy" style="text-decoration:none;" style="text-decoration:none;" target="_blank" title="FLEETCOM Chat Policy">Rules</a> <span style="color:#BE4C00;">•</span> <a href="/wiki/Category:Chat_logs" style="text-decoration:none;" style="text-decoration:none;" target="_blank" title="FLEETCOM Chat Logs">Logs</a></font> <span style="color:#BE4C00;">•</span> <a href="/wiki/MediaWiki:Emoticons" style="text-decoration:none;" style="text-decoration:none;" target="_blank" title="FLEETCOM Emotion Icons">Emotes</a>'
 
$(function() {
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
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
    //importScriptPage('Chat/Options.js','scripts');
    importScriptPage('ChatOptions/code.js','dev');
    $('#chatOptionsButton').remove()
    $('#chat-options-button').appendTo("#ChatHeader").css({'right' : '155px', 'bottom' : 0, 'position' : 'absolute', 'cursor' : 'pointer'});
}
 
// ****************
// END Chat options import
// ****************
 
// load chat options stylesheet
importStylesheetPage('Chat/Chat.css', 'scripts');
// end load chat options stylsheet