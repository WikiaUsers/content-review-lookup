// **********
// Chat topic
// **********

// Remember to escape single quotes in the topic using \' to prevent this from breaking.

// Credit to Runescape Wiki (http://runescape.wikia.com) and Call of Duty Wiki (http://callofduty.wikia.com)

var chatTopic = 'Welcome to the Poptropica Wiki!<br/><a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>Rules</u></a> • <a href="/wiki/Project:Chat/FAQ" target="_blank" title="Chat FAQ"><u>FAQs</u></a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>Emotes</u></a> • <a href="/wiki/Poptropica Wiki:Chat/Report" target="_blank" title="Report"><u>Report a user</u></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// **************
// END Chat topic
// **************


// ***************
// Spam protection
// ***************

// Credit to Joeytje50, script modified slightly for more leniency/easier changing

// Change these variables to modify the leniency of the script

var maxLimit = 6; // limit for sent lines
var maxLength = 1250; // limit for how long a line can be (in chars)
var limitTimeout = 2000; // timeout for the sent lines limiter

var rate = 0;
function ratelimit(e) {
	if (rate > maxLimit) {
		this.disabled = true;//disabling input in case they press ESC before the redirect is complete
		e.preventDefault();
		mainRoom.sendMessage({which : 13, shiftKey : false, preventDefault : function() {} })
		document.location.href = wgServer+"/wiki/Project:Chat/Ratelimit_triggered";
		return false;
	}
	if (this.value.length>=maxLength || this.value.split('\n').length>=6) {
		var val = this.value.substring(0,maxLength).split('\n');
		val = val[0]+'\n'+val[1]+'\n'+val[2]+'\n'+val[3]+'\n'+val[4];//remove all lines after the 5th line.
		this.value = val;
		if (e.type == 'keypress') {
			e.preventDefault();
			return false;
		}
	}
	if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && this.value != '') {
		rate += 1;
		setTimeout(function() {
			if (rate > 0) { rate -= 1 }
		},limitTimeout);
	}
}
$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);

// *******************
// END Spam protection
// *******************


// ************
// Chat options
// ************
importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:ChatEditRestriction.js');
// ****************
// END Chat options
// ****************

//!kick begin http://dev.wikia.com/wiki/!kick
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );
//!kick end

//ChatEditTools begin http://dev.wikia.com/wiki/ChatEditTools
importScriptPage('ChatEditTools/code.js', 'dev')
//ChatEditTools end

//WordFilter Begin http://dev.wikia.com/wiki/WordFilter
importArticles( {
    type: 'script',
    articles: [
        "u:dev:WordFilter/code.js"
    ]
} );
//WordFilter End