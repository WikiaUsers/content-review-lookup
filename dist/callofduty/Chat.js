// **********
// Chat topic
// **********

// Remember to escape single quotes in the topic using \' to prevent this from breaking.

// Credit to Runescape Wiki

var chatTopic = 'Welcome to the Call of Duty Wiki chat. Rules and more information can be found <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><br /><u>here</u></a>. FAQs <a href="/wiki/Project:Chat/FAQ" target="_blank" title="Chat FAQ"><u>here</u></a>. <a href="http://sactage.com/stats/cod.html" target="_blank" title="Stats"><u>Chat statistics</u></a>. Emotes list <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>here</u></a>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
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
// Chat options import
// ************
 
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('MediaWiki:ChatOptions/code.js','dev');
}

// ****************
// END Chat options import
// ****************

// Enables images to be posted in chat
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');