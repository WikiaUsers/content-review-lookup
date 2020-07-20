var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
chatOptionsLoaded = 1;
 
importArticles({
    type: 'script',
    articles: [
        'u:shining-armor:MediaWiki:ChatTags/code.js',
         'u:kocka:MediaWiki:Emoticons.js',
         'u:dev:ChatSendButton.js',
         'u:dev:MediaWiki:ChatOptions/code.js',
    ]
});