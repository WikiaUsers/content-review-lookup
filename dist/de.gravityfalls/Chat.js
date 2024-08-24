importScriptPage('ChatOptions/code.js', 'dev');

// importScript('Mediawiki:chatEditRestriction.js');

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

importArticles({
	type: "script",
	articles: [
		"u:dev:ChatDelay/code.js"
	]
});


$(window).load(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(themeButtons(), clearChatText());
    }
});
 
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
 
function themeButtons() {
    var normalText = 'Normal theme';
    var dayText = 'Tag Thema';
    var duskText = 'Dämmerungs Thema';
    var nightText = 'Nacht Thema';
    var $button = $('<div class="chat-button" />');
    var $link = $('<a class="wikia-button" />').text(normalText);
    var $body = $('body');
    $button.html($link);
    $button.click(function() {
        switch ($link.text()) {
            case dayText:
                $link.text(duskText);
                $body.removeClass('normal').addClass('day');
                break;
            case duskText:
                $link.text(nightText);
                $body.removeClass('day').addClass('dusk');
                break;
            case nightText:
                $link.text(normalText);
                $body.removeClass('dusk').addClass('night');
                break;
            case normalText:
                $link.text(dayText);
                $body.removeClass('night').addClass('normal');
                break;
        }
    });
    $body.addClass('normal');
    return $button;
}