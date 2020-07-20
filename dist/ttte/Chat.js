// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="Blue">Welcome to the Shunting Yards! Please read our <a href="/wiki/Thomas the Tank Engine Wikia:Rules#Chat_Rules" target="_blank">Chat Policy</a> but remember to have fun! </font>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#DBDBDB; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
 
// ****************
// END Chat options import
// ****************

// <syntaxhighlight lang="javascript">
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
				"piss",
				"pussy",
				"shit",
				"shitty",
				"tits",
				"sex",
				"whore",
				"slut",
				"dildo",
				"arse",
				"asshole",
				"boner",
				"cocksucker",
				"wank",
				"kike",
				"bollocks",
				"bastard",
				"cornhole",
				"bugger",
				"faggot",
				"fag",
				"minge",
				"masturbate",
				"twat",
				"damn",
				"douche",
				"douchebag",
				"dickhead",
				"bulldyke",
				"whores"
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
					alert("Warning! You were caught using innapropriate language and your message has been blocked.");
				} else if (ChatStringsBlocker.count === 2) {
					alert("LAST WARNING!!!\nIt's the second time you were caught using inappropriate language. A third time would auotmatically kick you from the chat room!");
				} else if (ChatStringsBlocker.count === 3) {
					window.close(); // close on 3rd offense
				}
			}
		}
	}
});

// </syntaxhighlight>