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

// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'أهلاً بك في دردشة الهانتربيديا! <br>يُرجى قراءة <a href="هانتربيديا:القوانين" target="_blank">القوانين</a> قبل البدء بالدردشة.';
 
$(function() { 
    $('#ChatHeader .public.wordmark')
        .prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#FF4500;font-weight:bold;line-height:1.6;margin-left:110px;">' + chatTopic + '</div>')
        .find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// KockaEmoticons help text change
window.kockaEmoticons = {
    help: 'إختر تعبيراً بالنقر عليه. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Full list</a>.'
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
            inlineAlert('لا يسمح بإرسال روابط دردشات مواقع أخرى.');
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