importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js'
    ]
});

//Prevent other wiki chats being linked in main chat
if (message.match(/Special:Chat/i) && mainRoom.active === true) {
    e.preventDefault();
    inlineAlert('You cannot post other wiki chats in the main chat.');
}

// Cambiar la descripción del Chat
importScript('MediaWiki:Chat-headline');
 
$(function changeChatDesc() {
    try {
        if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc) {
            $('p.chat-name').html(''+chatDesc+'');
            setTimeout(changeChatDesc(), 200);
        }
    } catch (err) {
        setTimeout(changeChatDesc(), 200);
    }
});