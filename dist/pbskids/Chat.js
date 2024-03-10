var chatTopic = 'Welcome to the Chat! Please make sure to read the policy <a href="/wiki/PBS_Kids_wiki:policy" target="_blank" title="PBS_Kids_wiki:policy"><u>here</u></a> and other information.';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

window.ignoreBot = "FlutterBot";
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}

/*
	the following script blocks certain works in certain conditions
	regex reduction suggested by Callofduty4 http://community.wikia.com/wiki/Thread:628738#7
*/
 
ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = " " + $('textarea[name="message"]').val().toLowerCase() + " ", // the padded spaces are to make sure that matches won't be located in the beginning or ending of the message
			b = [
				"ass",
				"asses",
				"bitch",
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
				"piss",
				"pussy",
				"shit",
				"shitty",
				"tits",
				"sex",
				"whore",
				"whores"
			],
			escape = "[\\n\\d \\?\\!\\.\\,]+(" + b.join("\n").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(/\n/g,"|") + ")[\\n\\d \\?\\!\\.\\,]+"; // decoder from http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex#answer-6969486
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
})