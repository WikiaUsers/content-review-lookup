/*****
** DisconnectCheck by 452 for the Saints Row Wiki chat

The script sets a 60 second timer.
When a message or user status update is received, the timer is reset.
If 60 seconds passes without receiving data, the script sends a dummy status update.
If 30 seconds passes without receiving data, a message is displayed, and a retry is sent
If another 30 seconds passes, the reconnect script is launched

These are the default times, which are configurable.
* Timeout - 60 seconds
* Retry time - 30 seconds
* Retries - 2

The reconnect script first makes an ajax request
If the ajax request fails, then wikia is offline, the user is offline, or somewhere in between.
Ajax request retries every 2 seconds
When the ajax request is successful, a popup window is launched
The content of the chat window is copied to the popup window
The popup window then refreshes the chat window
The popup window checks the chat window every 2 seconds to see if it has loaded
If the main chat window has not loaded in 30 seconds, it is refreshed again
When the main chat window loads, the popup window copies the history back to the main window
The popup window then closes.

*****/
window.Version['DisconnectCheck'] = "2014-08-06 - support for custom statuses";

window.DisconnectionCheck = new Object();
window.DisconnectionCheck.retry = 0;

function connectionCheckTimeout() {
	if (!chatOptions.options.timeoutRetries) chatOptions.options.timeoutRetries = 1;
	if (!chatOptions.options.timeoutRetry) chatOptions.options.timeoutRetries = 30;

	window.clearInterval(window.DisconnectionCheck.Timer);
	if (chatOptions.options.disconnectCheck == false) return;
	if (window.DisconnectionCheck.retry == chatOptions.options.timeoutRetries*1) {
		mainRoom.inlineAlert("DisconnectCheck timed out: You have probably been disconnected.", "ReconnectStatus");
		if ($("#chatalert").size() && !window.silence) {
			document.getElementById('chatalert').src = window.defaultsound;
			document.getElementById('chatalert').play();
		}
		reconnect();
		return;
	}
	if (window.DisconnectionCheck.retry && window.DisconnectionCheck.retry < chatOptions.options.timeoutRetries*1) {
		var sec = (chatOptions.options.timeoutTest*1) + (chatOptions.options.timeoutRetry * window.DisconnectionCheck.retry );
		var rec = chatOptions.options.timeoutRetry * (chatOptions.options.timeoutRetries*1 - window.DisconnectionCheck.retry);
		mainRoom.inlineAlert("It has been "+sec+" seconds since the server has responded, reconnecting in "+rec+" seconds, or click <b class='button' style='color:white;' onclick='reconnect();return false;'>reconnect</b>", "ReconnectStatus");
	}
	window.DisconnectionCheck.Time = new Date().getTime();

	mainRoom.socket.send(new models.SetStatusCommand({ statusMessage: window.DisconnectionCheck.Time, statusState: mainRoom.model.users.findByName(wgUserName).attributes.statusState }).xport());
	window.DisconnectionCheck.Timer = setInterval('connectionCheckTimeout()', chatOptions.options.timeoutRetry * 1000);
	window.DisconnectionCheck.retry++;
}
function connectionCheckReset(message) {
	window.DisconnectionCheck.lastUpdate = (new Date()).toGMTString(); //saving for debugging
	window.clearInterval(window.DisconnectionCheck.Timer);
	if (chatOptions.options.disconnectCheck == false) return;
	if (window.DisconnectionCheck.retry == chatOptions.options.timeoutRetries) mainRoom.inlineAlert("False alarm, response from server received. You are still connected.", "ReconnectStatus");
	window.DisconnectionCheck.retry = 0;
	if($(".toggleStatus").hasClass("isAway") && !$("li.User[data-user='"+wgUserName+"']").hasClass('away')) {
		mainRoom.inlineAlert("(E"+($(".toggleStatus").hasClass("isAway")?1:0)+($("li.User[data-user='"+wgUserName+"']").hasClass('away')?1:0)+") Your away status has become unsynced, now resetting to 'away'.", "alertStatus");
		mainRoom.socket.send(new models.SetStatusCommand({ statusState: window.customStatus != undefined?'away'+window.customStatus:'away' }).xport());
	}
	window.DisconnectionCheck.Timer = setInterval('connectionCheckTimeout()', (chatOptions.options.timeoutTest - Math.round(Math.random()*5))*1000);
}
mainRoom.socket.bind('updateUser',  $.proxy(connectionCheckReset, this));
mainRoom.socket.bind('chat:add',  $.proxy(connectionCheckReset, this));
window.DisconnectionCheck.Timer = setInterval('connectionCheckTimeout()', (chatOptions.options.timeoutTest - Math.round(Math.random()*5))*1000);

function reconnectPopup(url) {
	var chatHistory = window.open("", "ChatHistory");
	if (chatHistory == undefined) { 
		mainRoom.inlineAlert("Your browser has blocked the reconnect popup, please allow popups, and click <b class='button' style='color:white;' onclick='reconnect();return false;'>reconnect</b>","ReconnectStatus");
		return;
	}
	$('#chatwelcome').parent().remove();  // remove old welcome message
	$(".alertInit").remove(); // remove old init message
	$("li").removeAttr("id"); // strip all id to avoid later collisions

	chatHistory.document.write("<title>Saints Row Wiki Chat history</title>");
	chatHistory.document.write("<div id='ReconnectMessage'>Attempting to reconnect, please wait...<br />Do not close this window, or the main chat window.<br />It is safe to refresh the main chat window.</div>");

	chatHistory.document.write($(".Chat").html());
	$(".Chat").html('<div><ul><li>Popup successful. Reconnect pending...</li></ul></div>');
 
	chatHistory.document.write("<script>var reconnectRetries = 0;"
	+"function reconnectCheck() {"
	  +"if (reconnectRetries++ == "+chatOptions.options.timeoutTest+") {" 
	    +"if (window.opener == null) {"
	      +"document.getElementById('ReconnectMessage').innerHTML += '<br />Main chat window not found.';"
	      +"window.clearInterval(window.reconnectTimer);"
	    +"} "
	    +"else if (typeof window.opener.$ != 'function')"
	      +"document.getElementById('ReconnectMessage').innerHTML += '<br />Reconnect timeout (1), retrying.';"
	    +"else if (!window.opener.$('.Chat>ul li').length)"
	      +"document.getElementById('ReconnectMessage').innerHTML += '<br />Reconnect timeout (2), retrying.';"
	    +"reconnectRetries = 0;" 
	    +"window.opener.location = '"+url+"';"
	  +"};"
	  +"if (window.opener != null) {"
	    +"if (typeof window.opener.$ == 'function') {"
	      +"if (window.opener.$('.Chat>ul li').length) {"
	        +"window.opener.$('.Chat').prepend(window.document.getElementsByTagName('ul'));"
	        +"window.opener.$('.ReconnectStatus').remove();"
	        +"window.opener.$('.Chat ul:empty').remove();"
	        +"window.opener.mainRoom.viewDiscussion.scrollToBottom();"
	        +"window.clearInterval(window.reconnectTimer);"
	        +"window.close();"
	      +"};"
	    +"};"
	  +"};"
	+"};"
	+"window.reconnectTimer = setInterval('reconnectCheck()', 1000);"
	+"window.opener.location = '"+url+"';</script>"
	); //end of write
}
function reconnect(url) {
	if (!url) url = window.location.href;
	mainRoom.inlineAlert("Checking for internet connection...", "ReconnectStatus");
	$.ajax({'dataType':'text','data':{'title':'MediaWiki:Chat.js/DisconnectCheck.js#'+Date.now(),'action':'raw','ctype':'text/plain',},'url':wgScript,
	  'error': function() { window.reconnectCheck = window.setTimeout('reconnect()', 2000); },
	  'success': function(data) { 
		mainRoom.inlineAlert("Internet connection confirmed, launching popup.","ReconnectStatus");
		reconnectPopup(url);
	  }
	});
}