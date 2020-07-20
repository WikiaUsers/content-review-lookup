// Light / dark theme switcher
(function(){
    // the buttons
    $('.Rail .public').before('<button class="chat-button theme-button dark">Dark Theme</button><button class="chat-button theme-button light">Light Theme</button>');
    // handlers
    $('.theme-button').on("click", function(){
        if ($(this).hasClass('dark')) {
            $('body').removeClass('light').addClass('dark');
            $(this).hide();
            $('.theme-button.light').show();
        } else if ($(this).hasClass('light')) {
            $('body').removeClass('dark').addClass('light');
            $(this).hide();
            $('.theme-button.dark').show();
        }
    });
    // dark by default
    $('body').addClass('dark');
    $('.theme-button.dark').hide();
})();

// Chat options
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
}
 
// Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatTags/code.js',
        'u:dev:ChatDelay/code.js',
        'u:dev:NewMessageCount.js',
        "u:dev:MediaWiki:PrivateMessageAlert/code.js",
        'u:kocka:MediaWiki:Emoticons.js',
        'u:electroboom:MediaWiki:ChatTagsLink.js'
    ]
});