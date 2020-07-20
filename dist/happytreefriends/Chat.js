
importScriptPage('ChatOptions/code.js', 'dev')

// WARNING: For normal displaying use fullscreen editor
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ChatAnnouncements/code.js", //Allows admins to make announcements in chat.
        "u:shining-armor:MediaWiki:ChatTags/code.js", //Basic HTML matkups in chat
        "u:kocka:MediaWiki:Emoticons.js", //Adds the "Emoticons" button.
        'u:runescape:User:Joeytje50/tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatTags/code.js', //Not sure if this is different from other ChatTags script.
        'u:dev:!mods/code.js', //Ping mods using !mods.
        'u:dev:ChatOptions/code.js', //Adds "Options" button to chat interface.
        'u:dev:!kick/code.js', //Allows mods to kick users using text
        'u:dev:MediaWiki:GiveChatModPrompt/code.js' //Prompts an admin when "Give ChatMod Status" button clicked.
    ]
});

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