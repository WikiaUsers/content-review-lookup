/**
 * Chat options
 *   By [[User:Callofduty4]], [[User:Madnessfan34537]], and [[User:Sactage]]
 *   From the Call of Duty Wiki
 */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
}

// **********
// Chat topic
// **********
 
// Remember to escape single quotes in the topic using \' to prevent this from breaking.
 
// Credit to Runescape Wiki
 
var chatTopic = 'Chat Rules/FAQs: <a href="/wiki/Project:Chat_Rules/FAQs" target="_blank" title="Project:Chat Rules/FAQs"><u>here</u></a>.<br> Emotes List: <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>here</u></a>.';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:Right; position:absolute; width:60%; z-index:0; font-size: 13px; color:whitesmoke; font-weight:bold; line-height:1.6; margin-left:70px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// **************
// END Chat topic
// **************

// ***************
// Spam protection
// ***************
 
// Credit to Joeytje50, script modified slightly for more leniency/easier changing
 
// Change these variables to modify the leniency of the script
 
var maxLimit = 5; // limit for sent lines
var maxLength = 750; // limit for how long a line can be (in chars)
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