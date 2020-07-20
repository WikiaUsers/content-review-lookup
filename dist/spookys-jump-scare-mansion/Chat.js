
/**
 * Chat options
 *   By [[User:Callofduty4]], [[User:Madnessfan34537]], and [[User:Sactage]]
 *   From the Call of Duty Wiki
 */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:ChatOptions/code.js', 'dev'); }

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



// **********
// Chat topic
// **********
 
// Remember to escape single quotes in the topic using \' to prevent this from breaking.
 
// Credit to Runescape Wiki
 
var chatTopic = 'Chat Rules: <a href="/wiki/Project:Rules_and_Guidelines#Chat_Rules_and_Guidelines" target="_blank" title="Project:Chat Rules"><u>here</u></a>.<br> Emoticons List: <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emoticons"><u>here</u></a>.';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:Right; position:absolute; width:60%; z-index:0; font-size: 12px; color:#a5ced9; font-weight:bold; line-height:1.6; margin-left:10px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// **************
// END Chat topic
// **************