/* Add Buttons */
$(window).load(function addButtons() {
    var $o = $('#Rail');
    if ($o.length === 0) {
        setTimeout(addButtons, 250);
    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
        var $div = $('<div>').css('display', 'none').attr('id', 'chatOptionsButton');
        $o.prepend($div, dayNightButton());
    }
});

/* Emoticons */ 
// WARNING: This should be added to the chat.js only
importArticles({
	type: "script",
	articles: [
		'u:kocka:MediaWiki:Emoticons.js',
		'u:dev:AjaxEmoticons/code.js',
		'u:kocka:MediaWiki:ChatRules/code.js',
		'u:dev:MediaWiki:!mods/code.js',
		'u:dev:Tabinsert.js' 
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

/* Chat Options */
importScriptPage('MediaWiki:ChatOptions/code.js');
window.EmoticonsWindowConfig = { chatOptionsIntegration: true };