importArticles({
    type: 'script',
    articles: [
        'MediaWiki:ChatOptions.js',
        'MediaWiki:BotonEnviar.js',
        'MediaWiki:Chat.js/WordFilter.js',
 
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:ChatTimestamps/code.js',
    ]
});

/* Add Buttons */
$(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
    } else if ($('.chat-button').length === 0) {
        setTimeout(function() {
            $('.kockaEmoticonsSpan').wrap('<div class="chat-button" />');
        }, 2500);
    }
});
 
/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Limpiar chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}