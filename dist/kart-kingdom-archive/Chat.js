importArticles({
type: 'script',
articles: [
'u:dev:MediaWiki:EmoticonsWindow/code.js',
'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
'u:dev:MediaWiki:ChatAnnouncements/code.js',
'u:dev:MediaWiki:ChatBanMessage.js',
'u:dev:MediaWiki:ChatMessageWallCount/code.js',
'u:dev:MediaWiki:ChatBlockButton/code.2.js',
'u:dev:MediaWiki:ChatImages/code.js',
'u:dev:MediaWiki:!ban/code.js',
'u:dev:MediaWiki:!kick/code.js',
'u:dev:MediaWiki:!mods.js',
'u:dev:MediaWiki:Tictactoe/code.js',
'u:shining-armor:MediaWiki:ChatTags/code.js',
'u:dev:MediaWiki:IsTyping/code.js',
'u:dev:MediaWiki:AjaxEmoticons.js',
'u:dev:MediaWiki:ChatInterwikiLinks/code.js',
'u:dev:MediaWiki:NewMessageCount.js',
'u:dev:MediaWiki:GiveChatMod/code.js',
'u:dev:MediaWiki:ChatSendButton.js',
'u:dev:MediaWiki:BlinkingTabAlert.js',
'u:dev:MediaWiki:FixAdminKick/code.js',
'u:dev:MediaWiki:FaviconNotifier/code.js',
'u:dev:MediaWiki:ChatThemes/code.js',
'u:dev:MediaWiki:ChatModHover/code.js',
'u:dev:MediaWiki:ChatTimestamps/code.js',
     ]
});
window.chatAnnouncementsAll = true;
window.chatTimestamps24Hour = true;
window.chatTimestampsAPM = true;
window.chatAnnouncementsAnonymous = true;

/*
	the following script blocks certain works in certain conditions
*/
 
ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = $('textarea[name="message"]').val().toLowerCase(),
			b = [
				"ass",
				"asses",
				"bitch",
				"Hentai",
				"Yaoi",
				"bitches",
				"bitchy",
				"boob",
				"boobs",
				"cunt",
				"dick",
				"fuck",
				"fucker",
				"fucking",
				"motherfucker",
				"nigga",
				"niggas",
				"nigger",
				"niggers",
				"penis",
				"penises",
				"retard",
				"piss",
				"pussy",
				"shit",
				"crap",
				"craphole",
				"fuk",
				"Mothertrucker",
				"Arse",
				"Moby",
				"1uck",
				"fucking",
				"Dildo",
				"Hoe",
                "Slut", 
			    "amibo",
			    "Weener",
			    "Black sheep",
			    "Cum",
                "Clit", 
				"shitty",
				"tits",
				"sex",
				"whore",
				"whores",
				"Creampie",
			],
			c = false; // prevent duplication if blocked word was detected already
		for (var i = 0; i < b.length; i++) { // loop through all words
			var d = b[i];
			if (
			(
			/* possibilities start */
				a == d ||                                                                      // whole message equals the word
				a.search(new RegExp(d + "[ ,\\.\\!\\?]")) == 0 ||                              // starts with the word
				a.search(new RegExp("[ ,\\.\\!\\?]" + d + "[ ,\\.\\!\\?]")) > -1 ||            // contains the word
				a.substr(a.length - d.length - 1).search(new RegExp("[ ,\\.\\!\\?]" + d)) > -1 // end with the word
			/* possibilities end */
			) && c === false
			) {
				var c = true;
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
	}
});