window.chatBanMessage = {
    title: 'Chat Ban', // The title of the message
    body: 'You have been banned from visiting the house of Peppa and getting muddy. The ban will expire in $1, and the reason for your ban is $2' // Body of the message, '$1' is the expiry of the ban and '$2' is the reason for the ban
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NewMessageCount.js',
        'u:dev:MediaWiki:ChatInterwikiLinks/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:ChatThemes/code.js',
        'u:dev:MediaWiki:ChatBanMessage.js',
        'u:dev:MediaWiki:EmoticonDragAndDrop.js',
        'u:dev:MediaWiki:SpellingBee/startup.js',
    ]
});