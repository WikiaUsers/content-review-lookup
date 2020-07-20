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

/**
 * ChatTags
 *   By [[User:AnimatedCartoons]]
 */

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
importScriptPage( 'ChatObject/code.js', 'dev' );
 
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );

// **********
// Chat topic
// **********
 
// Remember to escape single quotes in the topic using \' to prevent this from breaking.
 
// Credit to Runescape Wiki
 
var chatTopic = 'Chat Rules/FAQs: <a href="/wiki/Project:Chat_Rules/FAQs" target="_blank" title="Project:Chat Rules/FAQs"><u>here</u></a>.<br> Emotes List: <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>here</u></a>.';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:Right; position:absolute; width:60%; z-index:0; font-size: 13px; color:whitesmoke; font-weight:bold; line-height:1.6; margin-left:80px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// **************
// END Chat topic
// **************


/*
// ***************
// Spam protection [Disabled due to numerous bugs]
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
*/

// *******************
// Start - Chat Ban Evasion Detection
// *******************
if (true) {
	$.getJSON("/api.php?action=query&format=json&meta=userinfo&uiprop=rights&cb=" + new Date().getTime(), function(data) {
		var a = data.query.userinfo.rights,
			isBypassBlock = false;
		for (var i in a) {
			if (a[i] === "ipblock-exempt") {
				isBypassBlock = true;
			}
		}
		if (!isBypassBlock) {
			// user is not in group that allows evading ip blocks (e.g. not sysop, staff or vstf), check if ip is blocked
			$.ajax({
				url: "/api.php?action=query&format=json&meta=userinfo&uiprop=blockinfo&callback=cb",
				dataType: "jsonp",
				jsonpCallback: "cb",
				success: function(data) {
					if (typeof data.query.userinfo.blockedby !== "undefined") {
						// ip is blocked
						mainRoom.socket.send(
							new models.ChatEntry({
								roomId: mainRoom.roomId,
								name: mw.config.get("wgUserName"),
								text: "Error #sppt_id" + mainRoom.roomId + " at unix" + new Date().getTime() + ": please notify an admin and include the username of this message's poster and the message's content"
							}).xport()
						);
						localStorage.chatIpBlockedDetected = new Date().getTime();
					}
				}
			});
		}
	});
}
// ****************
// END
// ****************

mainRoom.maxCharacterLimit = 5000;

mportArticles( {
    type: 'script',
    articles: [
        "u:dev:SpellingBee/startup.js"
    ]
} );