/**
 * @title       UserActivityState.js
 * @version     1.0.0
 * @description Automatically updates the activity state of a user, which can be customized according to the wiki's preference
 * @author      Mario&LuigiBowser'sInsideStory (Discord: tier3)
 * @license     CC-BY-SA-3.0
 */

(function() {
    // The main object to reference for the script
    (window.dev = window.dev || {}).userActivityStates = window.dev.userActivityStates || {};
    window.dev.userActivityStates.error = function() {
		var args = ["[UserActivityStates]"];
		args.push.apply(args, arguments);
        console.error.apply(null, args);
    };

	// Method to initialize the script
	window.dev.userActivityStates.init = function(media) {
		if (window.dev.userActivityStates.loaded) {
			return;
		}
		window.dev.userActivityStates.loaded = true;
		var namespaces = Array.isArray(media.namespaces) ? media.namespaces : [];
		
		// Method to get the state for a user
		window.dev.userActivityStates.getUserState = function(username) {
			return fetch(mw.util.wikiScript("api") + "?action=query&format=json&list=usercontribs&uclimit=500&ucuser=" + encodeURIComponent(username) + "&ucnamespace=" + encodeURIComponent(namespaces.join("|"))).then(function (response) {
				if (!response.ok) {
					window.dev.userActivityStates.error("Failed to fetch user state for", username, "due to a not OK response status:", response.status, response.statusText);
					return "error";
				}
				return response.json();
			}).then(function (data) {
				var contribs = data.query && data.query.usercontribs;
				if (!contribs || contribs.length === 0) {
					return "inactive";
				}
			    for (var key in media.states) {
					var stateData = media.states[key];
					var targetContrib = contribs[Math.max(0, stateData.minContribs - 1)];
					if (!targetContrib) { // If they don't have the minimum contribs, skip it
						continue;
					}
					// Check to see if they meet the minimum days required
					var ts = Date.now() - new Date(targetContrib.timestamp).getTime();
					var days_ms = stateData.dayRange * 86400 * 1000;
					if (ts <= days_ms) { // They meet the days required
						return key;
					} 
					// They don't meet the days required, continue to the next
					continue;
				}
				// If no matches are found, return inactive
				return "inactive";
			}).catch(function (error) {
				window.dev.userActivityStates.error("Error fetching user state:", error);
				return "error";
			});
		};

	    // Method to update the elements for each user's state
		window.dev.userActivityStates.updateUserActivityStates = function() {
			document.querySelectorAll(".user-activity-state").forEach(function (element) {
				var username = element.getAttribute("data-user"); // Get the "data-user" attribute
				if (!username) {
					window.dev.userActivityStates.error("Missing \"data-user\" attribute on element:", element);
					return;
				}
				window.dev.userActivityStates.getUserState(username).then(function(state) {
					if (state !== "error") {
						element.classList.add("user-activity-state-" + state);
						element.innerText = state === "inactive" ? media.inactiveText : media.states[state].text;
					}
				});
			});
		};
		window.dev.userActivityStates.updateUserActivityStates();
	};

	// Get the media for the script
    fetch(mw.util.wikiScript("api") + "?action=query&format=json&meta=allmessages&ammessages=Custom-User-Activity-States.json").then(function(response) {
        if (!response.ok) {
            window.dev.userActivityStates.error("Failed to load media due to a not OK response status:", response.status, response.statusText);
            return;
        }
        response.json().then(function(data) {
            var media = data.query.allmessages[0]["*"];
            if (!media) {
				if (window.userActivityStates) {
					window.dev.userActivityStates.init(window.userActivityStates);
					return;
				}
				window.dev.userActivityStates.error("Media could not be loaded. Please go to", window.location.origin + "/wiki/MediaWiki:Custom-User-Activity-States.json", "and create the page or set the window.userActivityStates variable in your JavaScript file. For more help, see https://dev.fandom.com/wiki/UserActivityStates");
               	return;
            }
			try {
				window.dev.userActivityStates.init(JSON.parse(media));
			} catch (e) {
				window.dev.userActivityStates.error("Failed to parse JSON:", e);
			}
        });
    }).catch(function(error) {
		window.dev.userActivityStates.error("Failed to fetch media:", error);
	});
})();