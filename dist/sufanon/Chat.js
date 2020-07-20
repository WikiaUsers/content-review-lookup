importArticles({
    type: 'script',
    articles: [
        'u:runescape:User:Joeytje50/tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)

        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:!kick/code.js'
    ]
});

/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(clearChatText());
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

window.onload = addButtons();
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Steven Universe Fanon Wikia chat. <br>Please read  <a href="Steven_Universe_Fanon_Wikia:Chat_Policy" target="_blank">the rules</a> before chatting.';
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

/*Removed hilites for now, needs to be moved to CSS*/