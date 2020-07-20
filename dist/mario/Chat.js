/*################################################################/
/################## THIS CODING IS USED FOR CHAT #################/
/################################################################/
/####### ChatAnnouncements #######/
/################################*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
    ]
});
/*################################/
/######## ChatBanMessage #########/
/################################*/
window.chatBanMessage = {
    title: 'Chat Ban', // The title of the message
    body: 'You have been banned from the chat. The ban will expire in $1, and the reason for your ban is $2' // Body of the message, '$1' is the expiry of the ban and '$2' is the reason for the ban
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatBanMessage.js',
    ]
});
/*################################/
/########### ChatCount ###########/
/################################*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatCount.js',
    ]
});
/*################################/
/###### ChatDeveloperTools #######/
/################################*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatDeveloperTools.js',
    ]
});
 
/*################################/
/########## ChatImages ###########/
/################################*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatImages/code.js',
    ]
});
/*################################/
/##### ChatMessageWallCount ######/
/################################*/
window.configChatMessageWallCount = {
  refreshRate: 30000,           // Query rate
  notificationColor: "#ff2d21", // Alert color
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatMessageWallCount/code.js',
    ]
});
/*################################/
/########## ChatStatus ###########/
/################################*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatStatus/code.js',
    ]
});