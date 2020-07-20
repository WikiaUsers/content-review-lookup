//Spoiler Alert
SpoilerAlert = {
    question: 'Parents strongly cautioned. The following article is intended for mature audiences over the age of 17. This article may contain some material that parents would not find suitable for children. The article may contain intense violence, sexual situations, coarse language, and suggestive dialogue.',
    yes: 'Proceed',
    no: 'Do not proceed',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('R');
    }
};

var blinkInterval = 1000; // Custom blink delay, 1000ms is default

// importScriptPage('User:Madnessfan34537/multikick.js', 'callofduty');

importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:AjaxEmoticons/code.js',
        'u:dev:BlinkingTabAlert.js',
        'u:dev:ChatEditTools/code.2.js',
        'u:dev:ChatHacks.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:NewMessageCount.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
});