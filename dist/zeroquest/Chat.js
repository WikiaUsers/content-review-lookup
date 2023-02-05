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

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Please read our <a href="/wiki/Wiki_Rules#Chat_Rules" target="_blank" title="Chat Rules">Chat Rules</a> Thank you.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:90%;z-index:0;font-size:12px;line-height:1.6;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()