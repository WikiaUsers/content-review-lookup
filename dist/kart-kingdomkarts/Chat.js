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
        'u:dev:IsTyping/code.js',
         'u:dev:MediaWiki:EmoticonsWindow/code.js',
         'u:dev:ChatImages/code.js',
         'u:shining-armor:MediaWiki:ChatTags/code.js',
         'u:dev:MediaWiki:ChatAnnouncements/code.js',
         'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
         'u:dev:MediaWiki:ChatSendButton.js',
         'u:dev:MediaWiki:ChatOptions/code.js',
         'u:dev:MediaWiki:ChatBlockButton/code.2.js',
         'u:dev:MediaWiki:GiveChatMod/code.js',
         'u:dev:MediaWiki:TitleNotifications/code.js',
         'u:dev:ChatStatus/code.js',
         'u:dev:MediaWiki:PrivateMessageAlert/code.js',
         'u:dev:!kick/code.js',
    ]
});

window.chatAnnouncementsAll = true;
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
				"bitches",
				"bitchy",
				"boob",
				"boobs",
				"cunt",
				"cunts",
				"dick",
				"fuck",
				"fucker",
				"fucking",
				"ratshit",
				"motherfucker",
				"penis",
				"penises",
				"piss",
				"pussy",
				"shit",
				"shitty",
				"tits",
				"sex",
				"whore",
				"whores",
				"pisses",
				"midget",
				"retarded",
				"retard",
				"faggot",
				"fag",
				"transy",
				"handicapped",
				"fuckhead",
				"hoe",
				"hoes",
				"gypsy",
				"gypsies",
				"gipsies",
				"chinamen",
				"chinamens",
				"redskin",
				"yellowskin",
				"blackskin",
				"cuck",
				"negro",
				"negroes",
				"paki",
				"cocolo",
				"greaser",
				"cushi",
				"golliwog",
				"kaffir",
				"macaca",
				"mammy",
				"pickaninny",
				"bicurious",
				"rastus",
				"wog",
				"beaner",
				"naco",
				"tar-baby",
				"cheesehead",
				"pocho",
				"ching",
				"chong",
				"ching-chong",
				"chingchong",
				"spic",
				"chilote",
				"chonky",
				"bohunk",
				"mulatto",
				"boong",
				"bong",
				"bung",
				"boonga",
				"boong",
				"bunga",
				"boonie",
				"pimp",
				"Farang",
				"Fenian",
				"Feuj",
				"Gyppo",
				"gippo",
				"gypo",
				"gyppie",
				"gyppy",
				"gipp",
				"bluegum",
				"bamboula",
				"balija",
				"beaney",
				"bog",
				"bogtrotter",
				"kano",
				"kanake",
				"dink",
				"dago",
				"dego",
				"dalKhor",
				"darky",
				"darkey",
				"darkie",
				"dogan",
				"dogun",
				"dothead",
				"dunecoon",
				"eightball",
				"eyetie",
				"fenian",
				"feuj",
				"fritz",
				"frogeater",
				"fuzzywuzzy",
				"gabacho",
				"gaijin",
				"gammon",
				"gans",
				"Ганс",
				"gin",
				"ginjockey",
				"gook",
				"gookeye",
				"gooky",
				"goy",
				"goyim",
				"goyum",
				"grago",
				"gragok",
				"greaseball",
				"groid",
				"gub",
				"gubba",
				"guiri",
				"guizi",
				"guido",
				"ginzo",
				"gweilo",
				"gwailo",
				"kwailo",
				"鬼佬",
				"gyopo",
				"kyopo",
				"Hairyback",
				"hajji",
				"hadji",
				"haji",
				"halfbreed",
				"half-breed",
				"haole",
				"heeb",
				"hebe",
				"hick",
				"shemale",
				"hefemale",
				"transtrap",
				"tranny",
				"ladyboy",
				"he-she",
				"transvestite",
				"transgendered",
				"shim",
				"hermaphrodite"
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