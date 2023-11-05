importScriptPage('Time.js', 'dev');

// adds show/hide-button to navigation bars
function createDivToggleButton(){
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "DivFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'DivToggle';
            NavToggle.setAttribute('id', 'DivToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleDiv(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
 
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'DivContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
 
 
            var NavToggleText = document.createTextNode(isCollapsed ? DivShowTxt : DivHideTxt);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "DivHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'DivFrame' + indexNavigationBar);
        }
    }
}
 
$( createDivToggleButton );



//automatic daily purge

(function DailyPurge(window, $, mw) {
	"use strict";
/*add pages to be purged every 24 hours directly below*/
	const pagesList = [
		'Blog:Staff Blog Posts'
                'Category:Staff Blog Posts'
                'Special:Community'
	].map(function(string) {
		return string.replaceAll(' ', '_');
	});
	if (!pagesList.includes(mw.config.get('wgPageName')))
		return;

	mw.loader.using('mediawiki.api').then(function() {
		try {
			const lastPurgeTimestamp = 
				mw.config.get('wgPageParseReport')
				.cachereport
				.timestamp;

			const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
			const lastPurgeTime = new Date(Date.UTC(
				lastPurgeTimeParts[1],
				lastPurgeTimeParts[2] - 1,
				lastPurgeTimeParts[3],
				lastPurgeTimeParts[4],
				lastPurgeTimeParts[5],
				lastPurgeTimeParts[6],
			));

			if (Date.now() - lastPurgeTime.valueOf() <= 24 * 60 * 60 * 1000)
				return;

		} catch(e) {
			return;
		}

		(new mw.Api()).post({
			action: 'purge',
			titles: mw.config.get('wgPageName')
		});
	});

})(window, jQuery, mediaWiki);

// prevents existing tags from being hidden
(window.dev = window.dev [[:Template:!!]] {}).profileTags = { noHideTags: true };

window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { u: 'Has not edited recently' }
	}
};

//tagging Moderators to never be tagged as "usergroup-inactive" except inactive Moderators
UserTagsJS.modules.userfilter = {
	'Moonwatcher x Qibli': ['inactive'],
};


UserTagsJS.modules.implode = {
	'Half-Admin | Content+Thread': ['threadmoderator', 'content-moderator'], // Adds 'Half-Admin | Content+Thread' BUT also removes Thread Moderator and Content Moderator

window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)',
    interval: 600, /* How often the timer updates in milliseconds (1000=1 second) */
    location: 'header',
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});

//default to classic categories

// Get all elements with the class "category-layout-selector__item"
var items = document.querySelectorAll('li.category-layout-selector__item');

// Loop through each item and add the "is-active" class
items.forEach(function(item) {
  item.classList.add('is-active');
});


$(function() {
    // Check if we're on the page where you want to enable chat
    if (mw.config.get('wgPageName') === 'LiveChatTest') {
        // Create a div for the chat and append it to the page
        var chatContainer = $('<div id="chat-container"></div>').appendTo('body');
        chatContainer.css({
            'position': 'fixed',
            'bottom': '0',
            'right': '10px',
            'background': 'white',
            'border': '1px solid #ccc',
            'padding': '10px',
            'max-height': '300px',
            'overflow-y': 'auto'
        });

        // Create an input field for users to type messages
        var inputField = $('<input type="text" id="chat-input" placeholder="Type your message"/>').appendTo(chatContainer);

        // Listen for Enter key press to send messages
        inputField.keypress(function(e) {
            if (e.which === 13) { // Enter key
                var message = inputField.val();
                inputField.val('');

                // Append the message to the chat container
                $('<div class="chat-message"></div>').text(message).appendTo(chatContainer);
            }
        });
    }
});