importScriptPage("ChatTags/code.js", "dev");

// Chat notifications; chat moderators and above 

importScriptPage('ChatAnnouncements/code.js','dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:ChatBlockButton/code.2.js',
        //'u:dev:ChatRefresh/code.js',
        'u:dev:GiveChatModPrompt/code.js',
        'u:dev:ChatHacks.js'
    ]
});

/* Day/Night Switch Feature */
function dayNightButton() {
    var dayText = 'Day theme';
    var nightText = 'Night theme';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}