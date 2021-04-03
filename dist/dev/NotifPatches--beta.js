/* NotifPatches: Beta version */
/* -------------------------- */
/* *******************  This comment is 80 characters long  ***************** */
// Temporary fixes for some problems with Fandom notifications
(function notifPatches (window, $, mw) {
    
    "use strict";
    // debug toggle and double-run prevention
    if (window.notifPatches && window.notifPatches.debug) {debugger; }
    if (window.notifPatches && window.notifPatches.loaded) { return; }
    if (!window.notifPatches) {
	window.notifPatches = {loaded: true};
    } else {
	window.notifPatches.loaded = true;
    }

    // Calculating general data
    const mwInfo = mw.config.get([
        'wgServer',
        'wgNamespaceNumber'
        ]);
        
    const baseService = 'https://services.';
    // Extracts 'fandom.com', 'wikia.org', 'gamepedia.com' or whatever
    const serverDomain = mwInfo.wgServer.split('.').slice(-2).join('.');
    const notifService = '/on-site-notifications/notifications';
    const notifBaseURL = baseService + serverDomain + notifService;
    const mainDomain = 'fandom.com';
    const mainNotifBaseURL = baseService + mainDomain + notifService;

/* 
    Problem:
    Further notification requests beyond the first one don't load all notif 
    types, due to the returned "next" object omitting the specified types.
   
    Solution:
    Appears to be alredy patched by Fandom on UCP wikis, when out of 
    Discussions. Keeping track.
*/
/*  Problem:
    Wall and comment notifications aren't marked as read when visiting the thread without 
    clicking on the notification card.

    Solution:
    Send a mark-as-read request whenever visiting a thread.
*/
    (function markThreadAsRead () {
        const namespace = mwInfo.wgNamespaceNumber;
        var plainURL = window.location.href.replace(/\?.*/, '');
        var id, urlToMark;

        // Namespaces that allow comments: Main (0) and User blog (500)
        if ((namespace === 0) || (namespace === 500)) {
            id = mw.util.getParamValue('commentId');
            if (id) { urlToMark = plainURL + '?commentId=' + id; }
        }
            
        // Message wall namespace
        if (namespace === 1200) {
            var userName = plainURL.slice(plainURL.indexOf(':') + 1, 
                (plainURL.indexOf('?') === -1) ? 
                    plainURL.length : 
                    plainURL.indexOf('?'));
            plainURL = plainURL.replace(userName, userName.replace('_', ' '));
            id = new URLSearchParams(window.location.search).get('threadId');
            if (id) { urlToMark = plainURL + '?threadId=' + id; }
        }

        if (urlToMark) {
            jQuery.ajax({
                url: notifBaseURL + '/mark-as-read/by-uri',
                type: "POST",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                data: JSON.stringify([urlToMark]),
                contentType: "application/json; charset=UTF-8"
            })
        }
    }) ();

/*
    Problem:
    Notifications from message walls of users with spaces in 
    their username are not marked as read when clicked, due to a messed-up 
    data-uri property.
    
    Solution:
    Catching notification cards when added to the DOM and using the link 
    target to fix the data-uri property.
*/ 
    function fixURISpaces (mutationList) {
        for (var mutationIndex in mutationList) {
            for (var nodeIndex in mutationList[mutationIndex].addedNodes) {
		const node = mutationList[mutationIndex].addedNodes[nodeIndex];
		if (node.classList
                &&  node.classList.contains('wds-notification-card') ) {

                    // Get main <a> element of the card and extract the link
		    const a = node.getElementsByClassName
                        ('wds-notification-card__outer-body')[0];
	            if (!a) { continue; }             
	            const uri = a.getAttribute('href');
 
		    // if the link contains spaces but the corresponding 
                    // data-uri attribute doesn't, then apply fixes
		    if ((uri.indexOf(' ') !== (-1))
                    &&  (node.getAttribute('data-uri').indexOf(' ') === (-1)) ) {
                        // Copy the link without the anchor part (#...)
                        node.setAttribute('data-uri', uri.replace(/#.*/, ''));
		    }
	        }
	    }
        }
    };
 
    const notifList = document.getElementById('notificationContainer');
    if (notifList) {
        (new MutationObserver(fixURISpaces)).observe(notifList, {childList: true});
    }

/*
    Problem:
    Other related domains (such as Wikia.org) wrongly trying to retrieve the 
    notifications from the service on the fandom domain, which is blocked by 
    the browser for security.
   
    Solution:
    Catching ajax requests and altering the domain when necessary.
*/
    $(document).ajaxSend(function fixRequest (event, xhr, options) {
	var url = options.url;
	if ((serverDomain !== mainDomain)
	&&  (url.indexOf(mainNotifBaseURL) === 0)) {
            options.url = url.replace(mainNotifBaseURL, notifBaseURL);
	}
    });
                        
/*
    Problem:
    The notification dropdown list disappears immediately when the mouse leaves it's 
    area, forcing the user to be careful when scrolling.

    Solution:
    Using CSS to create a transparent border at the right, so as long as the mouse is 
    over it the dropdown list won't disappear.
*/
    const CSS = document.styleSheets[0];
    CSS.insertRule('#markAllAsReadButton, #notificationContainer { \
                        box-sizing: content-box; \
                        border-right: 50px solid transparent; \
                    }', 
        CSS.cssRules.length);

/*
    Problem:
    Upvote notifications don't show the user who upvoted.

    Solution:
    Track down the notification requests, match the UI notif cards, and add the upvoter 
    names.
*/
/*
    Problem:
    There is no mark-as-read button for a single notification.

    Solution:
    Add such a button.
*/
/*
    Problem:
    There is no way to sort the notifications by type or by community.

    Solution:
    Add sort buttons.
*/

}) (this, jQuery, mediaWiki);