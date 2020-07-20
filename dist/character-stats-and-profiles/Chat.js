// Imports

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAnnouncements/code.js',
        //'u:dev:ChatBinaryButton2.js',
        //'u:dev:ChatHacks.js',
        //"u:dev:ChatMessageWallCount/code.js",
        //'u:dev:ChatObject/code.js',
        //'u:dev:ChatOptions/code.js', Broken
        'u:dev:ChatSendButton.js',
        //'u:dev:ChatStatus/code.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        //'u:dev:FandomizedChat/library.js',
        //'u:dev:FixAdminKick/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:GiveChatMod/code.js',
    ]
});


importScriptPage('ChatTimestamps/code.js','dev');


var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

// Custom Chat Statuses 

window.ChatStatus = {
    statuses: {
        afk: "Using the bathroom",
        edit: "Editing",
        food: "Eating",
        tv: "Watching TV",
        game: "Playing games",
        code: "Programming",
        bottomtext: "Surfing the Web",
        notsoos: "Flying to the moon",
        cake: "Eating pie. Yum.",
        google: "Watching YouTube videos",
        ufo: "Under attack by the evil forces of Ganon",
        homo: "<insert status here>"
    },
    debug: false
};