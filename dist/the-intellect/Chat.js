/* Add Buttons */
$(window).load(function addButtons() {
    var $o = $('#Rail');
    if ($o.length === 0) {
        setTimeout(addButtons, 250);
    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
        var $div = $('<div>').css('display', 'none').attr('id', 'chatOptionsButton');
        $o.prepend($div, dayNightButton()/*, clearChatText()*/);
    }
});
 
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
    var dayText = 'Old Theme';
    var nightText = 'New Theme';
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
 

var newStyles = document.createElement('style')
document.head.append(newStyles)
newStyles.innerHTML = ".my-element {" +
"height: " + height + "px;" +
"width: 40px;" +
"color: #9b806b;" +
"}"
// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the AJCW Live Chat!<br>Please read  <a class="rules" href="https://animal-jam-clans-1.wikia.com/wiki/Project:Chat_Policy" target="_blank">our policy</a> before chatting!';
// chatTopic.fontcolor() (may need this later)
 
$(function() { 
    $('#ChatHeader .public.wordmark')
        .prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#F6DCB4;font-weight:bold;line-height:1.6;margin-left:110px;">' + chatTopic + '</div>')
        .find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
 
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
        if (/[\/[:=]Special:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post other wiki chats in the main chat.');
        }
        
    }
});
 
/* Custom links */
CustomLinks = {};

/**
// Detect new messages
var afterMessage = function(e) {
	$('#entry-' + e.cid).find('a[href]').each(function() {
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
};
**/
 
/* CustomLinks binding */
setTimeout(function() {
    mainRoom.model.chats.bind('afteradd', afterMessage);
    mainRoom.model.privateUsers.bind('add', function(u) {
        mainRoom.chats.privates[u.attributes.roomId].model.chats.bind('afteradd', afterMessage);
    });
}, 5000);
 
/* Fix stupid PM crashing */
/*
ChatView.prototype.processText = function(text, allowHtml) {
	if (text === undefined)
		return '';
	if (!allowHtml) {
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");
	}
	var localWikiLinkReg = '^' + wgServer + wgArticlePath;
	localWikiLinkReg = localWikiLinkReg.replace(/\$1/, "(\\S+[^.\\s\\?\\,])");
	localWikiLinkReg = new RegExp(localWikiLinkReg,"i");
	if (!allowHtml) {
		var exp = /\b(ftp|http|https):\/\/(\w+:{0,1}\w*@)?[a-zA-Z0-9\-\.]+(:[0-9]+)?\S+[^.\s\?\,]/ig;
		text = text.replace(exp, function(link) {
			var linkName = link;
			var match = localWikiLinkReg.exec(link);
			if (match !== null ) {
				linkName = match[1].replace(/_/g, " ");
			}
			try {
				linkName = decodeURIComponent(linkName);
			} catch (e) {}
			linkName = linkName.replace(/</g, "&lt;");
			linkName = linkName.replace(/>/g, "&gt;");
			return '<a href="' + link + '">' + linkName + '</a>';
		});
	}
	var linkify = function(article, linkText) {
		article = article.replace(/ /g, "_");
		linkText = linkText.replace(/_/g, " ");
		linkText = unescape(linkText);
		linkText = linkText.replace(/</g, "&lt;");
		linkText = linkText.replace(/>/g, "&gt;");
		var path = wgServer + wgArticlePath;
		article = encodeURIComponent(article);
		article = article.replace(/%2f/ig, "/");
		article = article.replace(/%3a/ig, ":");
		var url = path.replace("$1", article);
		return '<a href="' + url + '">' + linkText + '</a>';
	}
	var exp = /\[\[([^\[\|\]\r\n\t]*)\|([^\[\]\|\r\n\t]*)\]\]/ig;
	text = text.replace(exp, function(wholeMatch, article, linkText) {
		if (!linkText) {
			var colonLocation = article.indexOf(":");
			if (colonLocation == -1) {
				linkText = article;
			} else {
				linkText = article.substring(colonLocation + 1);
			}
		}
		return linkify(article, linkText);
	});
	var exp = /(\[\[[^\[\]\r\n\t]*\]\])/ig;
	text = text.replace(exp, function(match) {
		var article = match.substr(2, match.length - 4);
		var linkText = article.replace(/_/g, " ");
		return linkify(article, linkText);
	});
	text = WikiaEmoticons.doReplacements(text, this.emoticonMapping);
	return text;
};

*/
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ResponsivePrivateList/code.js', //PM that won't be hidden under the list of users
        'u:dev:MediaWiki:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatNotifications/code.js',
        'u:dev:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!mods.js',
        'u:dev:MediaWiki:ClassicModIcons.js'
    ]
});