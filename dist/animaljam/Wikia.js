//<nowiki> - Attempting to cancel parsing
//User Page Tabs
mediaWiki.loader.using('mediawiki.util', function() {
    "use strict";
    jQuery(function($) {
        var $tabs = $('#WikiaUserPagesHeader ul.tabs');
        if (!$tabs.length) return;
        var newTabs = {
            'Sandbox': '/Sandbox',
    };
        var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
        if (!name.length) return;
        name = name.text();
        var tabs = document.createDocumentFragment(), li, a;
        for (var tab in newTabs) {
            li = document.createElement('li');
            a = document.createElement('a');
            a.title = 'User:' + name + newTabs[tab];
            a.href = mw.util.wikiGetlink(a.title);
            a.appendChild(document.createTextNode(tab));
            li.appendChild(a);
            tabs.appendChild(li);
        }
        $tabs.append(tabs);
    });
});

if (mw.config.get('wgCanonicalNamespace') == 'Thread') {
	if ($('.msg-title > a').text().indexOf('[Vote]') > -1) {
		var s= $('<div class="votebutton"><input type="button" value="Support" onclick="vote(1)"/></div>');
		var n= $('<div class="votebutton"><input type="button" value="Neutral" onclick="vote(2)"/></div>');
		var o= $('<div class="votebutton"><input type="button" value="Oppose" onclick="vote(3)"/></div>');
		$(".speech-bubble-buttons").prepend(s);
		$(".speech-bubble-buttons").prepend(n);
		$(".speech-bubble-buttons").prepend(o);
	}
}
 
function vote(result) {
	$(".replyBody").click();
	var response;
	switch (result) {
        case 1:
            response = "support";
            break;
        case 2:
            response = "neutral";
            break;
        case 3:
            response = "oppose";
            break;
	}
	$('.new-message').val("{{"+response+"}}");
	$('.replyButton').prop('disabled', false);
}

/*if (('.portable-infobox-image').length) {
    img = $( ".portable-infobox-image" );
    width = img[0].clientWidth;
    height = img[0].clientHeight;
 
    myImg = img[0];
 
    newWidth = width - 20;
    newHeight = height - 20;
 
    console.log(newWidth+","+newHeight);
 
    $(".portable-infobox-image").width(newWidth);
    $(".portable-infobox-image").height(newHeight);
    $(".portable-infobox-image").css("margin","10px");
}*/

var blacklist = [''];
var user = mw.config.get("wgUserName");
// RfR restriction system
if (mw.config.get("wgArticleId") == 47082 && $.inArray(user, blacklist) != -1) {
    $('.createboxButton').hide();
}

// So that creating chat/forum moderators isn't a "are you feeling lucky" game
if ((mw.config.get("wgPageName")).indexOf("Special:UserRights") > -1) {
    $('label[for=wpGroup-chatmoderator]').prepend("chat ");
}

//</nowiki>