importArticles({
    type: 'script',
    articles: [
        'u:runescape:User:Joeytje50/tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (para que los usuarios no tenga que volver a cargar el chat para ver más emoticones)
        'u:dev:ChatAnnouncements/code.js', //ChatAnnouncements (de modo que los mods de chat pueden hacer anuncios de chat personalizado dentro de la charla)
        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js',
        'Mediawiki:BadWords.js',
        'u:dev:ChatOptions/code.js'
    ]
});
 
/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
    }
}
 
/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}