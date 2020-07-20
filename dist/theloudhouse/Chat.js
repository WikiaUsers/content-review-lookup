/*Chat Block button*/
chatBlockReason = "ToU violation";
chatBlockExpiry = "2 weeks";
importScriptPage('ChatBlockButton/code.2.js','dev');
 
/*Kick cmd customization*/
window.absentMessage = '<user> is currently not in the TLH chat.';
importScriptPage('!kick.js', 'dev');
 
/**CHAT ADDONS**/
/*Chat Enhancements*/
importArticles({
    type: 'script',
    articles: [
        'u:runescape:User:Joeytje50/tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js', //ChatAnnouncements (so that chat mods can make custom chat announcements within the chat)
        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js', //!mods cmd
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatEditTools/code.js',
        'u:dev:CustomChatPings/code.js',
        'u:dev:ChatModHover/code.js',
        'u:dev:GiveChatModPrompt/code.js',
        'u:dev:SpellingBee/startup.js', //In-chat spelling bee 
        "u:dev:jumbles/startup.js", //In-chat Jumbles
        'u:dev:ChatObject/code.js',
        "u:dev:ChatDelay/code.js"
    ]
});
 
/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
    }
}
 
/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}
 
/* Day/Night Switch Feature */
function dayNightButton()
{
    var dayText = 'Day theme';
    var nightText = 'Night theme';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}
 
window.onload = addButtons();
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to The Loud House Wiki chat. <br>Please read  <a href="The_Loud_House_Wiki:Chat_Guidelines" target="_blank">the rules</a> before chatting.';
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
/*Removed hilites for now, needs to be moved to CSS*/