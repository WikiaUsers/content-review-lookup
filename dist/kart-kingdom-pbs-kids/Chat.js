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

window.chatAnnouncementsAll = true;
window.ChatStatus = {
    statuses: {
        afk: 'On vacation',
        edit: 'Editing',
        food: 'Eating',
        game: 'Gaming'
    },
    debug: false
};

importArticles({
    type: 'script',
    articles: [
      'u:dev:!ban/code.js',
      'u:dev:!kick/code.js',
      'u:dev:ChatImages/code.js',
      'u:dev:ChatStatus/code.js',
      'u:dev:GiveChatMod/code.js',
      'u:dev:BlinkingTabAlert.js',
      'u:dev:ChatAnnouncements/code.js',
      'u:dev:ChatBlockButton/code.3.js',
      'u:dev:EmoticonsWindow/code.js',
      'u:dev:IsTyping/code.js',
      'u:shining-armor:ChatTags/code.js',
      'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
      'u:dev:MediaWiki:Day/Night_chat/code.js',
      'u:dev:MediaWiki:PrivateMessageAlert/code.js'
    ]
});

var untilFound = setInterval(function(){
    if ($('.ChatHeader .User').length){
        $('.ChatHeader .User').attr('data-user', mw.config.get('wgUserName'));
        clearInterval(untilFound);
    }
}, 500);
 
window.ChatStringsBlocker = {"count": 0};

$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = " " + $('textarea[name="message"]').val().toLowerCase() + " ", // the padded spaces are to make sure that matches won't be located in the beginning or ending of the message
			b = [
				"ass",
				"asss",
				"assss",
				"asses",
				"assholes",
				"assholess",
				"asssholes",
				"asssholess",
				"bich",
				"bitch",
				"beech",
				"biich",
				"biitch",
				"bbitch",
				"bittch",
				"bitcch",
				"bitchh",
				"bitches",
				"bitchie",
				"bitchiez",
				"bitchies",
				"bitchy",
				"bitchys",
				"bichass",
				"bitchass",
				"betch",
				"bech",
				"boob",
				"booby",
				"boobys",
				"boobies",
				"b**bs",
				"b00bs",
				"boobs",
				"bullshit",
				"bullshitt",
				"retard",
				"reatard",
				"reatardar",
				"retarder",
				"reatarder",
				"retardar",
				"retards",
				"retarded",
				"cunt",
				"cunts",
				"cum",
				"craap",
				"ccrap",
				"cums",
				"cumm",
				"cumms",
				"cummy",
				"cummies",
				"cummers",
				"cumming",
				"cuming",
				"cummings",
				"cummin",
				"thot",
				"sexy",
				"crap",
				"cock",
				"cocks",
				"c0ck",
				"hell",
				"damn",
				"damm",
				"dick",
				"dicks",
				"dicky",
				"dickie",
				"dickies",
				"erect",
				"erects",
				"erecting",
				"fagot",
				"fagots",
				"faggott",
				"faggotts",
				"fagott",
				"faggot",
				"faggots",
				"fuck",
				"fuckas",
				"fuckos",
				"fuka",
				"fucko",
				"fucka",
				"fucko",
				"fukk",
				"fuckk",
				"fucc",
				"fucckk",
				"fuk",
				"frak",
				"frick",
				"fricker",
				"fucker",
				"fuckerz",
				"fuckerss",
				"fucking",
				"hoe",
				"motherfucker",
				"motherfricker",
				"muddafuka",
				"muddafuko",
				"mothertrucker",
				"motherfuckers",
				"motherfuckerz",
				"motherfucka",
				"motherfucko",
				"negro",
				"negroes",
				"negros",
				"niger",
				"nigers",
				"niga",
				"nigas",
				"nigga",
				"niggas",
				"nigger",
				"niggers",
				"nipple",
				"nipples",
				"penis",
				"penises",
				"piss",
				"pissed",
				"pissing",
				"pussy",
				"pussys",
				"shit",
				"shits",
				"shitt",
				"shiit",
				"shhit",
				"shithole",
				"shitass",
				"shitty",
				"tits",
				"titties",
				"sex",
				"whore",
				"whores"
				
			],
			escape = "[\\n\\d \\?\\!\\.\\,]+(" + b.join("\n").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(/\n/g,"|") + ")[\\n\\d \\?\\!\\.\\,]+"; // decoder from https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex#answer-6969486
		if (a.split(new RegExp(escape)).length > 1) { // 1 or more matches (no need to globally search)
			$('textarea[name="message"]').val("");
			ChatStringsBlocker.count++;
			if (ChatStringsBlocker.count < 2) {
				alert("Warning! You were caught using inappropriate language and your message has been blocked.");
			} else if (ChatStringsBlocker.count === 2) {
				alert("LAST WARNING!!!\nIt's the second time you were caught using inappropriate language. A third time would automatically kick you from the chat room!");
			} else if (ChatStringsBlocker.count === 3) {
				window.close(); // close on 3rd offense
			}
		}
	}
});