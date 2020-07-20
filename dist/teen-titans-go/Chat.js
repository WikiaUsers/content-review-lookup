importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:!mods/code.js',              //Ping all moderators
        'u:dev:MediaWiki:ChatAnnouncements/code.js',  //Make announcement in chat
        'u:dev:MediaWiki:ChatModHover/code.js',       //Identify mods
        'u:dev:MediaWiki:GiveChatModPrompt/code.js',  //Prompt before promoting
        'u:dev:MediaWiki:!kick/code.js',              //Kick in main chat
        'u:kocka:MediaWiki:Emoticons.js',             //Window for emoticons
        'u:shining-armor:MediaWiki:ChatTags/code.js'
    ]
});

importScriptPage('MediaWiki:ChatBlockButton/code.2.js', 'dev');

chatBlockReason = "Misbehaving in chat - see [[Teen_Titans_Go!_Wiki:Chat_Guidelines|chat guidelines]]";
chatBlockExpiry = "1 week";

window.absentMessage = '<user> is currently not in the chat. Check your spelling.';
importScriptPage('!kick.js', 'dev');