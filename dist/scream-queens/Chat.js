importArticles({
    type: 'script',
    articles: [
        'u:runescape:User:Joeytje50/tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js', //ChatAnnouncements (so that chat mods can make custom chat announcements within the chat)
        'u:dev:!mods/code.js',
        'Mediawiki:BadWords.js',
        'u:dev:ChatOptions/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:MediaWiki:ChatModHover/code.js',
        'u:dev:ChatUserpageLink.js',
        'u:dev:NewMessageCount.js'
    ]
});

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
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