//Chat scripts based on Steven Universe Wiki; Special thanks to Dorumin from that Wiki
//Ver 2016.06.01: Fixed an issue with text quotation mark breaking code, use ' instead of " if you're including a text link (which contains " quotation marks) in the codes below

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tabinsert.js', // Tab Insert
        'u:dev:AjaxEmoticons/code.js', 
        // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:ChatSendButton.js',
        "u:dev:ChatInterwikiLinks/code.js",
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatImages/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js'
    ]
});
 
// KockaEmoticons settings 
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emojis",
        close: "Close"
    },
    help: 'Select an Emoji from below, for a full list <a href="/wiki/MediaWiki:Emoticons" target="_blank">click here</a>.'
};
 
// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the White Day Wiki chat. <br>Please read  <a href="/wiki/Project:Chat_Policy">the rules</a> before chatting.';

$(function() { 
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">' + chatTopic + '</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// Custom inline alerts
function inlineAlert(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
    $('[name="message"]').val('').removeAttr('disabled').focus();  
}

// Function for message input
$('[name="message"]').keypress(function(e) {
    if (e.which == 13) {
 
        var message = this.value;
 
        // Stop posting of whitespace
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
        // Prevent other wiki chats being linked in main chat
        if (/[\/[]Special:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post other wiki chats in the main chat.');
        }
        // Prevent several websites being linked in main chat
        if (/60484617|kat\.cr|theworldofstevenuniverse\.blogspot\.com|kisscartoon\.me|watchonlinecartoons\.net|madridista-4-life\.tumblr\.com/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post this link in the main chat because it might violate our policies.');
        }
    }
});