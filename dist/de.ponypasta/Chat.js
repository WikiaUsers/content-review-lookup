// **********
// Chat topic
// **********

importScriptPage('ChatOptions/code.js', 'dev');
 
var topic = "Keine Drogen, Kinders!"
 
$(function() {
    if (this["ct_inserted"]) return;
	$("#ChatHeader .public.wordmark").prepend(
		$("<div/>",{id: "chatTopic", html: topic}).css({
			textAlign: "center",
			width: "100%",
			lineHeight: "0px",
			marginTop: "20px",
			marginBottom: "-20px",
			zIndex: 0,
			fontFamily: "Consolas",
			fontSize: "20px",
			fontWeight: "bold",
			color: "lightgray"
		})
	);
	this["ct_inserted"] = true;
});

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
	importScriptPage('ChatOptions/code.js','dev');
}
 
// ****************
// END Chat options import
// ****************
 
// Enables images to be posted in chat
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

// ****************
// Chat Options II
// ****************
 
function importScriptNC(page){var uri=mw.config.get('wgScript')+'?title='+mw.util.wikiUrlencode(page)+'&action=raw&ctype=text/javascript&no-cache='+Date.now();return importScriptURI(uri);}
 
importScriptNC("MediaWiki:ChatPlus.js")