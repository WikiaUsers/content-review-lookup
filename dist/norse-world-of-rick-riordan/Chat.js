//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Norse Wiki of Rick Riordan wiki chat.';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// END Chat topic
 
//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   $('.Chat li').remove();
}

importScriptPage('ChatTags/code.js', 'dev');
// <syntaxhighlight lang="javascript">
/*

the following script blocks certain works in certain conditions
*/
 
ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = $('textarea[name="message"]').val().toLowerCase(),
			b = [
                                "arse",
				"ass",
				"asses",
                                "asshole",
                                "bastard",
				"bitch",
				"bitches",
                                "boob",
				"boobs",
                                "buttwipe",
				"cunt",
				"dick",
                                "fuck",
				"fucker",
				"fucking",
                                "jackass",
				"motherfucker",
				"nigga",
				"niggas",
				"nigger",
				"niggers",
				"piss",
				"pussy",
				"tits",
				"sex",
				"whore",
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
					alert("Warning! The Asgardians have caught you using inappropriate language and have blocked your message.");
				} else if (ChatStringsBlocker.count === 2) {
					alert("LAST WARNING!!!\nIt's the second time you were caught using inappropriate language. One last time and you'll be kicked!!");
				} else if (ChatStringsBlocker.count === 3) {
					window.close(); // close on 3rd offense
				}
			}
		}
	}
});
 
// </syntaxhighlight>
 
window.onload=addClearChatText();
 
//END Clear chat button
 
// Chat options 
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('MediaWiki:Chat.js/options.js');
}