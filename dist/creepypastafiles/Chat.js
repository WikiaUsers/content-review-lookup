importArticles ({
    type: 'script',
    articles: [
        /** Special commands for kicking and banning  **/
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        /** End commands and begin other plugins **/
        'u:dev:MediaWiki:ChatBlockButton/code.3.js', //Block button in dropdown
        'u:dev:MediaWiki:ChatMessageWallCount/code.js',
        'u:dev:MediaWiki:ChatOptions/beta.js', //Various
        'u:dev:MediaWiki:ChatSendButton.js', //Send button
        'u:dev:MediaWiki:ChatStatus/code.js', //Custom stati
        'u:dev:MediaWiki:ChatUserPageButton.js', //Userpage button in dropdown
        'u:shining-armor:MediaWiki:ChatTags/code.js', //Chat markup syntax
        'u:dev:MediaWiki:GiveChatMod/code.js', //Make chat mod button in dropdown
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js', //Group PMs
        'u:dev:MediaWiki:IsTyping/code.js', //Shows users that are typing
        'u:dev:MediaWiki:Pings.js' //Pings user when the user is pinged
    ]
});