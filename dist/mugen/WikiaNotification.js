//<syntaxhighlight lang="javascript">
/*!
 * WikiaNotification JS by User:Jak Himself and User:Gguigui1
 * http://dev.wikia.com/wiki/WikiaNotification
 * requires jQuery
 * version 0.2
!*/

function setCookie( cname, cvalue, exdays ) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function WikiaNotification() {
	var notif = document.createElement("ul");
	notif.setAttribute("id", "WikiaNotifications");
	notif.setAttribute("class", "WikiaNotifications");

	var innerLi = document.createElement("li");

	var dataType = document.createElement("div");
	dataType.setAttribute("data-type", "2");

	var close = document.createElement("a");
	$(close).addClass("sprite close-notification");

	$(notif).append(innerLi);
	$(innerLi).append(dataType);
	$(dataType).append(close);
	$(dataType).append(WikiaNotificationMessage);
	$(".WikiaSiteWrapper").append(notif);
}

$(function() {
	var ids = $.cookies.get('WikiaNotification');
	if ( ids ) {
		return;
	}
	
	if ( !WikiaNotificationexpiry ) {
		var WikiaNotificationexpiry = 10;
	}
	
	if( WikiaNotificationMessage.length > 0 ) {
		WikiaNotification();
	} else if( WikiaNotificationMessage.length < 1 || WikiaNotificationMessage === "undefined") {
		console.log("WikiaNotification error: Message empty.");
	}
	
	$(".sprite.close-notification").on("click", function() {
		$("#WikiaNotifications.WikiaNotifications").hide();
		setCookie('WikiaNotification','on',WikiaNotificationexpiry);
	});
});
//</syntaxhighlight>