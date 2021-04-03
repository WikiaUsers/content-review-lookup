// Temporary fixes for some problems with Fandom notifications
(function notifPatches (window, $, mw) {
	"use strict";
	// debug toggle
	if (window.notifPatches && window.notifPatches.debug) {debugger; }
	// Preventing multiple load
	if (window.notifPatches && window.notifPatches.loaded) { return; }
	if (!window.notifPatches) {
			window.notifPatches = {loaded: true};
		} else {
			window.notifPatches.loaded = true;
		}

	
// Problem to fix: Further notification requests beyond the first one don't load all notif types

	// Catching all ajax requests
	$(document).ajaxSend(function fixTypes (event, xhr, options) {
		// Filtering the relevant requests: GET notifications requests without any contentType= specified
		// Todo: Find a way to filter also requests made by other scripts rather than Fandom UI
		var url = options.url;
		if ((options.type === 'GET') &&
			(url.indexOf('https://services.fandom.com/on-site-notifications/notifications?') !== (-1)) && 
			(url.indexOf('contentType=') === (-1) ) ) {
		// Adding all standard notification types to the request
			options.url = url + '&contentType=announcement-target&contentType=article-comment-at-mention&contentType=article-comment-reply&contentType=article-comment-reply-at-mention&contentType=discussion-post&contentType=discussion-upvote&contentType=message-wall-post&contentType=message-wall-thread&contentType=post-at-mention&contentType=talk-page-message&contentType=thread-at-mention';
		}
	});


	
// Problem to fix: Notifications from message walls of users with spaces in their username are not marked as read when clicked, due to a messed-up data-uri property

	// Catching new notification cards when added
	var notifList = document.querySelector("ul#notificationContainer");
	var notifListObserver = new MutationObserver(function(mutationList) {
    	for (var mutationIndex in mutationList) {
			for (var nodeIndex in mutationList[mutationIndex].addedNodes) {
				var node = mutationList[mutationIndex].addedNodes[nodeIndex];
				if (node.classList && node.classList.contains('wds-notification-card') ) {
					// Get main <a> element of the card and extract the link
					var a = node.getElementsByClassName("wds-notification-card__outer-body")[0];
					if (!a) { continue; }             
					var uri = a.getAttribute('href');
				
					// if the link contains spaces but the corresponding data-uri attribute doesn't, then apply fixes
					if ((uri.indexOf(' ') !== (-1)) && node.getAttribute('data-uri').indexOf(' ') === (-1)) {
						// Get rid of the anchor part of the link (#...)
						uri = uri.replace(/#[0-9]*$/, '');
						node.setAttribute('data-uri', uri);
					}
				}
			}
		}
	});
	
notifListObserver.observe(notifList, {childList: true});
}) (this, jQuery, mediaWiki);