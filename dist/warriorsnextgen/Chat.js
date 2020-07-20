/* Add Buttons */
$(window).load(function addButtons() {
    var $o = $('#Rail');
    if ($o.length === 0) {
        setTimeout(addButtons, 250);
    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
        var $div = $('<div>').css('display', 'none').attr('id', 'chatOptionsButton');
        $o.prepend($div, tcThemeButton(), shcThemeButton(), rcThemeButton(), wcThemeButton(), skcThemeButton()/*, clearChatText()*/);
    }
});
 
/* Clear chat /
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}
*/
 
/* Switch between Clan themes and default wiki theme in chat */
function tcThemeButton() {
    var defaultText = 'Default';
    var thunderText = 'ThunderClan';
    var $clanThemeButton = $('<div>').addClass('chat-button');
    var $clanThemeLink = $('<a>').addClass('wikia-button').text(thunderText);
    var $body = $('body');
    $tcThemeButton.html($tcThemeLink);
    $tcThemeLink.click(function() {
        $body.toggleClass('default');
        $body.toggleClass('thunder');
        $(this).text(function(index, text) {
            return text === thunderText ? defaultText : thunderText;
        });
    });
    $body.addClass('default');
    return $tcThemeButton;
}

function shcThemeButton() {
    var defaultText = 'Default';
    var shadowText = 'ShadowClan';
    var $clanThemeButton = $('<div>').addClass('chat-button');
    var $clanThemeLink = $('<a>').addClass('wikia-button').text(shadowText);
    var $body = $('body');
    $shcThemeButton.html($shcThemeLink);
    $shcThemeLink.click(function() {
        $body.toggleClass('default');
        $body.toggleClass('shadow');
        $(this).text(function(index, text) {
            return text === shadowText ? defaultText : shadowText;
        });
    });
    $body.addClass('default');
    return $shcThemeButton;
}

function rcThemeButton() {
    var defaultText = 'Default';
    var riverText = 'RiverClan';
    var $clanThemeButton = $('<div>').addClass('chat-button');
    var $clanThemeLink = $('<a>').addClass('wikia-button').text(riverText);
    var $body = $('body');
    $rcThemeButton.html($rcThemeLink);
    $rcThemeLink.click(function() {
        $body.toggleClass('default');
        $body.toggleClass('river');
        $(this).text(function(index, text) {
            return text === riverText ? defaultText : riverText;
        });
    });
    $body.addClass('default');
    return $rcThemeButton;
}

function wcThemeButton() {
    var defaultText = 'Default';
    var windText = 'WindClan';
    var $clanThemeButton = $('<div>').addClass('chat-button');
    var $clanThemeLink = $('<a>').addClass('wikia-button').text(windText);
    var $body = $('body');
    $wcThemeButton.html($wcThemeLink);
    $wcThemeLink.click(function() {
        $body.toggleClass('default');
        $body.toggleClass('wind');
        $(this).text(function(index, text) {
            return text === windText ? defaultText : windText;
        });
    });
    $body.addClass('default');
    return $wcThemeButton;
}

function skcThemeButton() {
    var defaultText = 'Default';
    var skyText = 'SkyClan';
    var $clanThemeButton = $('<div>').addClass('chat-button');
    var $clanThemeLink = $('<a>').addClass('wikia-button').text(skyText);
    var $body = $('body');
    $skcThemeButton.html($skcThemeLink);
    $skcThemeLink.click(function() {
        $body.toggleClass('default');
        $body.toggleClass('sky');
        $(this).text(function(index, text) {
            return text === skyText ? defaultText : skyText;
        });
    });
    $body.addClass('default');
    return $skcThemeButton;
}
 
/* Chat Rules button */
$.get(location.origin + "/wiki/Chat Policy?action=render", function(data) {
	mw.util.addCSS("#ChatRulesModalContent{height:400px;overflow-y:auto}.ChatRulesButton{float:center; position:relative; text-align: center;}#ChatRulesModalContent ul{list-style-type:square;margin-left:15px}");
	var modalContent = '<div id="ChatRulesModalContent">' + data + '</div>';
 
	$('body').on('click', '.rules', function(e) {
        e.preventDefault();
		$.showModal("Rules", modalContent, {
			id: "ChatRulesModal",
			width: 500,
			buttons: [{
				id: "ChatRulesCloseButton",
				defaultButton: true,
				message: "Close",
				handler: function() {
					$("#ChatRulesModal").closeModal();
				}
			}]
		});
	});
});
 
$(function() { 
    $('#ChatHeader .public.wordmark')
        .prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">' + chatTopic + '</div>')
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
CustomLinks.banlog = '/wiki/Special:Log/chatban?page=User:';
CustomLinks.dev = 'http://dev.wikia.com/wiki/';
 
// Aliases
CustomLinks.mw = wgServer + '/wiki/MediaWiki:';
CustomLinks.wp = CustomLinks.wikipedia;
CustomLinks.yt = CustomLinks.youtube;
 
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
 
/* CustomLinks binding */
setTimeout(function() {
    mainRoom.model.chats.bind('afteradd', afterMessage);
    mainRoom.model.privateUsers.bind('add', function(u) {
        mainRoom.chats.privates[u.attributes.roomId].model.chats.bind('afteradd', afterMessage);
    });
}, 5000);
 
/* Fix stupid PM crashing */
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

// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the official WCNG chat and roleplay location! <br>Please read and follow <a href="Chat_Policy" target="_blank">our rules</a> before joining the game.';

/* SCRIPT SETTINGS
   Due to how these scripts work, variable-type settings should be set before import */
ajaxEmoticonsInterval = 180000; /* 3 minutes = 180 seconds = 180,000ms */

var customMessage = {
    message: '$1 NEW MESSAGE(S)!'
};

var chatags = { videos: true };

chatAnnouncementsAll = true;

window.ChatStatus = {
	statuses: {
		afk: "Patrolling",
		edit: "Editing",
		food: "Hunting",
		tv: "Resting",
		game: "Training"
	},
	debug: false
};
 

/* IMPORTS */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:BlinkingTabAlert.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatNotifications/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:MediaWiki:ChatSyntaxHighlight.js',
        'u:dev:MediaWiki:HideChatRail/code.js',
        'u:dev:MediaWiki:ChatLogger.js',
    ]
});