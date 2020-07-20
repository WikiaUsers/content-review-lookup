/* Add Buttons */
$(window).load(function addButtons() {
    var $o = $('#chatOptionsButton');
    if ($o.length === 0) {
        setTimeout(addButtons, 250);
    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
        $o.after(dayNightButton(), clearChatText());
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
 
// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Steven Universe Wiki sohbetine hoş geldiniz. <br> Lütfen katılmadan önce kurallarımızı okuyunuz.';
 
$(function() { 
    $('#ChatHeader .public.wordmark')
        .prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">' + chatTopic + '</div>')
        .find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// KockaEmoticons help text change
window.kockaEmoticons = {
    vocab: {
        help: 'Üstüne tıklayarak bir emoticon seçin. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Tüm emoticonların listesi</a>.'
    }
};

// Custom inline alerts
function inlineAlert(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
    $('[name="message"]').val('').removeAttr('disabled').focus();  
}
 
// Function for message input
$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {

        var message = this.value;

        // Stop posting of whitespace
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
        // Prevent other wiki chats being linked in main chat
        if (/[\/[:]Special:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post other wiki chats in the main chat.');
        }
        // Prevent several websites being linked in main chat
        if (/60484617|54176365|kat\.cr|thepiratebay|toonget|theworldofstevenuniverse|animeflavor|kisscartoon|gogoanime|beachcitybugle|toonova|watchonlinecartoons|madridista-4-life|madridista-forever/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post this link in the main chat because it might violate our policies.');
        }
    }
});

/* Custom links */
CustomLinks = {};

// Links
CustomLinks.commons = 'http://commons.wikimedia.org/wiki/';
CustomLinks.wikimedia = 'http://wikimediafoundation.org/wiki/';
CustomLinks.wikipedia = 'http://en.wikipedia.org/wiki/';
CustomLinks.youtube = 'https://www.youtube.com/watch?v=';
CustomLinks.skype = 'skype:';

// Aliases
CustomLinks.mw = wgServer + '/wiki/MediaWiki:';
CustomLinks.wp = CustomLinks.wikipedia;
CustomLinks.yt = CustomLinks.youtube;

// Detect new messages
$('body').on('DOMNodeInserted', '.Chat ul > li:not(.inline-alert)', function(el) {
	$(el.target).find('a[href]').each(function() {
        var actualLink = $(this).attr('href').slice((wgServer + '/wiki/').length);
        if (!CustomLinks.hasOwnProperty(actualLink.split(':')[0])) return;
        if (actualLink.split(':')[0] == 'skype') {
            actualLink = actualLink.replace(/%3F/g, '?');
        }
		var newLink = actualLink.replace(new RegExp('^(' + Object.keys(CustomLinks).join('|') + '):', 'i'), function(m) {
			var nonColon = m.slice(0, -1).toLowerCase();
			return CustomLinks[nonColon];
		});
		$(this).attr('href', newLink);
	});
});

/* ChatTags parsing on Private Messages */
setTimeout(function() {
    mainRoom.model.privateUsers.bind('add', function(u) {
        var privateRoomId = u.attributes.roomId;
        var privateRoom = mainRoom.chats.privates[privateRoomId];
        privateRoom.model.chats.bind('afteradd', function(chat) {
            if (chat.attributes.isInlineAlert) return;
            var string = $("#Chat_" + privateRoomId + " .message:last").html();
            string = chatags.parser(string);
            $("#Chat_" + privateRoomId + " .message:last").html(string);
        });
    });
}, 5000);

//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
importArticles({
    type: 'script',
    articles: [
        'u:kocka:Emoticons/code.js', // EmoticonsWindow
        'u:dev:Tabinsert.js', // Tab Insert
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:!kick/code.js',
        'u:su:!mods.js'
    ]
});