/*****
** DisconnectCheck by 452 for the Saints Row Wiki chat

For the record, every aspect of this script should be something that is handled within the core chat script itself.  
The core chat script should be able to perform the simple task of maintaining a connection, and reconnecting upon disconnection.

The script sets a 60 second timer.
When a message or user status update is received, the timer is reset.
If 60 seconds passes without receiving data, the script both sends a dummy status update, and attempts a silent reconnect.
If 30 seconds passes without receiving data, a message is displayed, and a retry is sent
If another 30 seconds passes, the reconnect script is launched

The timeout is configurable.
* Timeout = 60 seconds
* Retry time = Timeout / 2
* Retries = 2

The reconnect script first makes an ajax request
If the ajax request fails, then wikia is offline, the user is offline, or somewhere in between.
Ajax request retries every 10 seconds
When the ajax request is successful, the reconnect popup is launched, which the refreshes the main chat window.

This script now saves the session to local browser storage, in multiple cases:
*When the page is closed
*When the page is refreshed
*Every 5 minutes (configurable), in case of a browser crash.

*****/
window.Version['DisconnectCheck'] = "2015-06-02 - popup window fallback re-implemented for edge cases";

window.DisconnectionCheck = new Object();
window.DisconnectionCheck.retry = 0;

function debug452(out, classs) { 
  if (wgUserName == "452") {
    if (classs) mainRoom.inlineAlert(out, classs);
    else console.log(out); 
  }
}

function connectionCheckTimeout(testStr) {
	if (chatOptions.options.disconnectCheck == false) return;
	window.DisconnectionCheck.timeoutRetries = 2;
	if (!chatOptions.options.timeoutTime) chatOptions.options.timeoutTime = 60;
	if (chatOptions.options.timeoutTime < 15) chatOptions.options.timeoutTime = 15;
	window.DisconnectionCheck.timeoutRetryTime = chatOptions.options.timeoutTime/2;
	window.DisconnectionCheck.autosave = chatOptions.options.timeoutTime*4;

	if (typeof testStr != "undefined") {
		mainRoom.inlineAlert("Testing connection...", "ReconnectStatusTest");
	} else {
		mainRoom.socket.socket = null;
		mainRoom.socket.connect();
		if (!window.DisconnectionCheck.reconnecting && typeof ChatRefresher == "undefined" && (window.DisconnectionCheck.retry >= window.DisconnectionCheck.timeoutRetries*1) || (!$("#WikiChatList #user-"+wgUserName).length)) {
			mainRoom.inlineAlert("DisconnectCheck timed out: You have probably been disconnected.", "ReconnectStatus");
			if ($("#chatalert").size() && !window.silence) {
				document.getElementById('chatalert').src = window.defaultsound;
				document.getElementById('chatalert').play();
			}
			reconnect();
			return;
		}
		if (!window.DisconnectionCheck.reconnecting && window.DisconnectionCheck.retry && window.DisconnectionCheck.retry < window.DisconnectionCheck.timeoutRetries*1) {
			var sec = (chatOptions.options.timeoutTime*1) + (window.DisconnectionCheck.timeoutRetryTime * window.DisconnectionCheck.retry);
			var rec = window.DisconnectionCheck.timeoutRetryTime * (window.DisconnectionCheck.timeoutRetries*1 - window.DisconnectionCheck.retry);
			if ($('.ReconnectStatus.FalseAlarm').size()) $('.ReconnectStatus').remove();
			mainRoom.inlineAlert("It has been "+sec+" seconds since the server has responded, reconnecting in "+rec+" seconds, or click <b class='button' style='color:white;' onclick='reconnect();return false;'>reconnect</b>", "ReconnectStatus");
		}
	}
	window.DisconnectionCheck.Time = testStr?testStr:new Date().getTime();

	mainRoom.socket.send(new models.SetStatusCommand({ statusMessage: window.DisconnectionCheck.Time, statusState: mainRoom.model.users.findByName(wgUserName).attributes.statusState }).xport());
	window.clearInterval(window.DisconnectionCheck.Timer);
	window.DisconnectionCheck.Timer = setInterval('connectionCheckTimeout()', window.DisconnectionCheck.timeoutRetryTime * 5000);
	window.DisconnectionCheck.retry++;
}
function connectionCheckReset(message) {

$(".debugreset").remove();
debug452("reset", "debugreset");

	window.DisconnectionCheck.lastUpdate = whatsTheTime(1);
	if (!chatOptions.options.disconnectCheck) return;
	if (!$("#lastCheck").length) $("#WikiaPage").append($("<div>").attr("id", "lastCheck"));
	$("#lastCheck").html("Last Check: "+window.DisconnectionCheck.lastUpdate);

	if (!window.lastSaved) window.lastSaved = new Date().getTime();
	if (new Date().getTime() - window.lastSaved > window.DisconnectionCheck.autosave*1000) {
	    saveHistory();
	    window.lastSaved = new Date().getTime();
	}

	if (typeof message == "object") {
		var tempUser = new models.User().mport(message.data);
		if (tempUser.get('name') == wgUserName) {
		    if (tempUser.get('statusMessage') == "test"+wgUserName) {
			$('.ReconnectStatusTest').remove();
			mainRoom.inlineAlert("You are still connected.", "ReconnectStatus");
		    }
		}
	}

	if ($('.ReconnectStatus:not(.FalseAlarm)').length) {
		$('.ReconnectStatus').remove();
		window.DisconnectionCheck.reconnecting = false;
		window.clearTimeout(window.reconnectCheck);
		mainRoom.inlineAlert("Response from server received. You are connected.", "ReconnectStatus FalseAlarm");
	}
	window.DisconnectionCheck.retry = 0;

	tempCurrentStatus = mainRoom.model.users.findByName(wgUserName).attributes.statusState.substring(0,4) == "away"?mainRoom.model.users.findByName(wgUserName).attributes.statusState.substring(4):mainRoom.model.users.findByName(wgUserName).attributes.statusState;

	if($(".toggleStatus").hasClass("isAway")) {
		if (!$("li.User[data-user='"+wgUserName+"']").hasClass('away')) {
			if (!window.changingStatus) mainRoom.inlineAlert("(E"+($(".toggleStatus").hasClass("isAway")?1:0)+($("li.User[data-user='"+wgUserName+"']").hasClass('away')?1:0)+") Your status has become unsynced, now resetting to '"+(window.customStatus != undefined?window.customStatus+" (away)":"away")+"'.", "alertStatus");
			window.changingStatus = true;
			mainRoom.socket.send(new models.SetStatusCommand({ statusState: window.customStatus != undefined?'away'+window.customStatus:'away' }).xport());
		}
	} else if (window.customStatus != tempCurrentStatus) {
		if (!window.changingStatus && (tempCurrentStatus != "here")) mainRoom.inlineAlert("(E2) Your status has become unsynced and is currently '"+tempCurrentStatus+"', resetting to '"+window.customStatus+"'", "alertStatus");
		window.changingStatus = true;
		mainRoom.socket.send(new models.SetStatusCommand({ statusState: window.customStatus }).xport());

	} else {
		window.changingStatus = false;
	}
	window.clearInterval(window.DisconnectionCheck.Timer);
	window.DisconnectionCheck.Timer = setInterval('connectionCheckTimeout()', (chatOptions.options.timeoutTime - Math.round(Math.random()*5))*1000);
}
mainRoom.socket.bind('updateUser', $.proxy(connectionCheckReset, this));
mainRoom.socket.bind('chat:add', $.proxy(connectionCheckReset, this));
mainRoom.socket.bind('join', $.proxy(connectionCheckReset, this));

window.DisconnectionCheck.Timer = setInterval('connectionCheckTimeout()', (chatOptions.options.timeoutTime - Math.round(Math.random()*5))*1000);

$(".reconnectButton").removeClass("hiddenContent");

function reconnect() {
	debug452("reconnecting "+whatsTheTime(1));
	window.DisconnectionCheck.reconnecting = true;
	if (!$('.InternetCheck').size()) mainRoom.inlineAlert("Checking for internet connection..."+whatsTheTime(1), "ReconnectStatus InternetCheck");

	saveHistory();

	$.ajax({'dataType':'text','data':{'title':'MediaWiki:Chat.js/DisconnectCheck.js#'+Date.now(),'action':'raw','ctype':'text/plain',},'url':wgScript,
	  'error': function() {
		if (window.DisconnectionCheck.reconnecting) {
			$('.ReconnectWaiting').remove();
			mainRoom.inlineAlert("Waiting for internet connection..."+whatsTheTime(1), "ReconnectWaiting");
			window.clearInterval(window.reconnectCheck);
			window.reconnectCheck = window.setInterval('reconnect()', 10000); 
		}
	  },
	  'success': function(data) {
		if (window.DisconnectionCheck.reconnecting) {
			mainRoom.inlineAlert("Internet connection confirmed, launching popup.","ReconnectStatus");
			debug452("timeout r:"+window.DisconnectionCheck.retry, "debugtimeout");
			if (typeof ChatRefresher == "undefined") reconnectPopup();
		}
	  }
	});
	window.clearInterval(window.reconnectCheck);
	window.reconnectCheck = window.setInterval('reconnect()', 10000);
}

function reconnectPopup() {
	var ChatRefresher = window.open("", "ChatRefresher");
	if (typeof ChatRefresher == "undefined") { 
		mainRoom.inlineAlert("Your browser has blocked the reconnect popup, please allow popups, and refresh this window manually","ReconnectStatus");
		window.clearInterval(window.reconnectCheck);
		window.reconnectCheck = window.setInterval('reconnect()', 10000); 
		return;
	}
	$('#chatwelcome').parent().remove();  // welcome message is used to check for reconnection

	ChatRefresher.document.write("<title>Reconnecting to Saints Row Wiki Chat</title>");
	ChatRefresher.document.write("<div id='ReconnectMessage'>Attempting to reconnect, please wait...<br />Do not close this window, or the main chat window.<br />It is safe to refresh the main chat window if necessary.</div>");

	ChatRefresher.document.write("<script>var RefresherChecks = 0, reconnectRetries = 0;"
	+"function RefresherCheck() {"
	  +"if (window.opener != null) {"
	    +"if (typeof window.opener.$ == 'function') {"
	      +"if (window.opener.$('#chatwelcome').length) {"
	        +"window.clearInterval(window.reconnectTimer);"
	        +"window.close();"
	      +"};"
	    +"};"
	  +"};"
	  +"if (RefresherChecks++ >= "+chatOptions.options.timeoutTime+") {"
	    +"RefresherChecks = 0;reconnectRetries++;"
	    +"if (window.opener == null) {"
	      +"document.getElementById('ReconnectMessage').innerHTML += '<br />Main chat window not found.  Aborting reconnection.';"
	      +"window.clearInterval(window.reconnectTimer);"
	    +"} else if (typeof window.opener.$ != 'function') {"
	      +"document.getElementById('ReconnectMessage').innerHTML += '<br />Reconnect timeout, retrying. (Retry #'+reconnectRetries+') (Chat window has not loaded at all)';"
	    +"} else if (!window.opener.$('#chatwelcome').length) {"
	      +"document.getElementById('ReconnectMessage').innerHTML += '<br />Reconnect timeout, retrying. (Retry #'+reconnectRetries+') (Chat window has partially loaded and timed out)';"
	    +"} else if (typeof window.opener.DisconnectionCheck == 'undefined') {"
	      +"document.getElementById('ReconnectMessage').innerHTML += '<br />Reconnect timeout, retrying. (Retry #'+reconnectRetries+') (Scripts have failed to load.)';"
	    +"};"
	    +"window.opener.location = '"+window.location.href+"';"
	  +"};"
	+"};"
	+"window.reconnectTimer = setInterval('RefresherCheck()', 1000);"
	+"window.opener.location = '"+window.location.href+"';</script>"
	); //end of write
	ChatRefresher.blur();
	window.focus();
}

$(function() {
	chatLog = localStorage.getItem('chatLog');
	if (chatLog != null) {
		$('.Chat').prepend(chatLog);
		$('.removeOnReconnect').remove();  // remove old welcome message
		$('.ReconnectStatus').remove();
		mainRoom.viewDiscussion.scrollToBottom();
	}
});
function saveHistory() {
	$('.alertInit').addClass("removeOnReconnect");
	$(".inline-alert:contains('Welcome to the Saints Row Wiki chat')").addClass("removeOnReconnect");
	$('.chatEmpty').remove(); //remove old empty message
	$(".Chat li").removeAttr("id"); // strip all ids to avoid later collisions
	$('.Chat li:empty').remove(); //remove empty
	$('.Chat ul:empty').remove(); //remove empty
	localStorage.setItem('chatLog', $(".Chat").html());
}

$(window).on('beforeunload', function(e) { 
    saveHistory(); 
});