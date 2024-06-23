/* THIS API DOES NOT SAVE OR LOG ANY INFORMATION THAT IS SUBMITTED!
	THE API BEING USED ONLY PARSES HTML FROM https://purplerp.hasroot.com/
	AND RETURNS REQUESTED DATA BASED ON THAT */
	
	


/* The following are functions that display data on the Main page and character
	pages about how many people and who are live on Twitch roleplaying on PurpleRP */
	

// Asynchronous http GET request
function httpGetAsync(url, callback, params) {
	console.log('[PURPLERP WIKI API] Preparing Live_Notif request');
	
	var paramStr = "?";
	
	// Parse params to string
	if (params != null) {
		console.log('[PURPLERP WIKI API] Parsing Live_Notif request params...');
		var i = 0;

		Object.keys(params).forEach(function(key) {
			if (i > 0)
				paramStr += "&";
					
			paramStr += key + '=' + params[key];
			i++;
		});
	}
	
	console.log('[PURPLERP WIKI API] Listening to onreadystatechanged event');
	/* Create a request and asynchronously wait for it to be ready using the
		onreadystatechange event to execute a callback*/
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			console.log('[PURPLERP WIKI API] Live_Notif received good response: ' + xmlHttp.responseText);
			callback(xmlHttp.responseText);
		}
	};
	
	/* Open the request asynchronously (doesn't block because it allows the
		onreadystatechange event to do the work)*/
	xmlHttp.open('GET', url+paramStr, true);
	xmlHttp.send(null);
	
	console.log('[PURPLERP WIKI API] Live_Notif request opened and sent.');
}


// Build the HTML structure for the live banner
function buildLiveHtml(streamer) {
	console.log('[PURPLERP WIKI API] Buidling Live_Notif HTML...');
	$( '#mw-content-text' ).prepend($( '<div>', {id: 'live-notif__container'}));
	
	$( '#live-notif__container' ).append(
		$( '<div>', {id: 'live-notif'} )
		.append(
			$( '<div>', {id: 'live-notif__image-container'})
			.append(
				$( '<img>', {
					id: 'live-notif__image',
					src: 'https://static.wikia.nocookie.net/purplerp/images/d/d4/Twitch_Logo.png',
					width: '40px'
				})
			)
		)
		.append(
			$( '<div>', {id: 'live-notif__text'})
			.append(
				$( '<div>', {id: 'live-notif__streamer-live'})
				.append(
					$( '<span>', {
						id: 'live-notif__streamer',
						text: "🔴 " + streamer + " "
					})
				)
				.append(
					$( '<span>', {id: 'live-notif__live'})
					.append(
						$( '<a>', {
							id: 'live-notif__link',
							href: "https://twitch.tv/" + streamer,
							text: "IS LIVE ON TWITCH"
						})
					)
				)
			)
			.append(
				$( '<div>', {id: 'live-notif__tip'} )
				.append(
					$( '<em>', {text: "Click the link above to watch!"})
				)
			)
		)
	);
	
	console.log('[PURPLERP WIKI API] Done building Live_Notif HTML');
}

/* Use the "portrayedby" data-source in the character infobox to check HasRoot
	and display a banner at the top of the page if that person is live on Twitch */
(function() {
	if ( mw.config.get( 'wgCategories' ).includes( 'Characters' ) ) {
		console.log('[PURPLERP WIKI API] This is a character page; getting streamer name from infobox...');
		// Get Twitch username from the character infobox
		var portrayedBy = Array.from(
			Array.from(
				Array.from(document.querySelectorAll('[data-source]'))
				.find(
					function(node) {
						return node.dataset.source == "portrayedby";
					}
				).children
			)
			.find(
				function(node) {
					return node.className.includes("pi-data-value");
				}
			).children
		)
		.find(
			function(node) {
				return node.localName == "a";
			}
		).pathname.substr(1);
		
		console.log('[PURPLERP WIKI API] Streamer name: ' + portrayedBy);
		
		// If the Twitch username was found, see if they're live
		if ( portrayedBy != "" && portrayedBy != null) {
			
			
			/* If the twitch streamer is live and roleplaying on PurpleRP based
				on HasRoot data, display the live notice at the top of the page */
			httpGetAsync(
				'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-68e5d768-b4d0-4051-9d2e-032bd58af429/HasRoot/is_live',
				function(live) {
					console.log('[PURPLERP WIKI API] Live_Notif callback');
					if (live == "1") {
						// Build the HTML for the banner
						buildLiveHtml(portrayedBy);
					}
				},
				{streamer: portrayedBy.toLowerCase()}
			);
		}
	}
})();


/* Display on the Main page how many people are live on Twitch roleplaying on
	PurpleRP based on HasRoot data */
(function(){
	// Check if we're on the main page
	if ( mw.config.get('wgIsMainPage') ) {
		// Request the live count
		httpGetAsync(
			'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-68e5d768-b4d0-4051-9d2e-032bd58af429/HasRoot/get_stream_count',
			function(liveCount) {
				/* Set the innertext of the element with id "live-count" to the
					received count */
				document.getElementById("live-count").innerText = liveCount;
			}
		);
	}
})();