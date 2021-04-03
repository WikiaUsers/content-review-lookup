/**
 * A toggle script for hiding "patrol-requests".
 * This is basically just a function for hiding/redisplaying a heading with its underlying conversation.
 * 
 * Created by [[User:Jack McKalling]]
 */
$(function() {
	var objStatusClasses = {
		"new":  "patrol-request-status-new",
		"wip":  "patrol-request-status-wip",
		"done": "patrol-request-status-done"
	};
	
	/**
	 * Check whether the current user wants to show (true) or hide (false) the specified patroller request status.
	 * If the current user did not set these settings before, this method returns false by default.
	 * This information is stored in the browser's localStorage (assuming there is one)
	 * @param {string} strName The status key to check in the user settings
	 * @return boolean
	 */
	function hasUserSetting(strName) {
		var strRaw = localStorage.getItem("mw-patrol-requests-settings");
		if (strName === null && strRaw === null) return null; // tell that user has no settings yet
		// localStorage variable should be formatted as "status1 status2 statusX", e.g. "new wip"
		// each value specifies a status of patrol requests that should be shown
		if (strRaw === null) return false;
		if ((" " + strRaw + " ").indexOf(" " + strName + " ") < 0)  return false;
		return true;
	}
	
	/**
	 * Sets the user preference for the specified patroller request status.
	 * If the current user wants the specified status to show, it will be appended to a space-separated multi value.
	 * This information is acquired from the browser's localStorage (assuming there is one)
	 * @param {string} strStatusKey The status key to set in the user settings
	 * @param {boolean} booShow The value whether to show (true) or hide (false)
	 */
	function setUserSetting(strStatusKey, booShow) {
		var strSettings = localStorage.getItem("mw-patrol-requests-settings");
		if (!objStatusClasses.hasOwnProperty(strStatusKey)) return; // cancel if status doesn't exist
		if (strSettings === null || strSettings === "") strSettings = ""; // new usersettings
		else if (strSettings == strStatusKey) strSettings = ""; // unset specified status
		else strSettings = (" " + strSettings + " ").replace(" " + strStatusKey + " ", " ").trim(); // strip away specified status
		if (booShow) {
			strSettings += (strSettings !== "" ? " " : "") + strStatusKey; // add specified status
		}
		localStorage.setItem("mw-patrol-requests-settings", strSettings);
	}
	
	/**
	 * A handler for toggling the display of "empty" headings.
	 * An empty heading is one which has no content between it and the next same-level heading.
	 * @param {boolean} booShow Whether to display or hide the "empty" headings
	 * @param {string} strByStatus Specifies the status of the patrol requests that should display/hide
	 */
	function toggleEmptyHeadings(booShow, strByStatus) {
		strByStatus = objStatusClasses.hasOwnProperty(strByStatus) ? strByStatus : "";
		$("h2").nextAll("h3").each(function() {
			var headingContent = $(this).nextUntil("h3"), editLink = null, tocEntry = null, funcHasUnhideableRequests = function() {
				// detect patrol requests without any status as unhideable
				if ($(this).is(".patrol-request") && !$(this).is("[class*='patrol-request-status-']")) return true;
				// (merged if with for-loop to only iterate over the above user defined properties)
				for (var strStatusKey in objStatusClasses) if (objStatusClasses.hasOwnProperty(strStatusKey)) {
					// detect patrol requests with an unhideable status as unhideable
					if (strStatusKey != strByStatus && $(this).is("." + objStatusClasses[strStatusKey])) {
						if (hasUserSetting(strStatusKey)) return true; // but only if also set to display by user setting
					}
				}
				return false; // only hideable stuff at this point
			};
			// check if heading contains only hideable conversations
			if (headingContent.length > 0 // if heading is not empty
			&&  headingContent.is(function() { return $(this).is("." + objStatusClasses[strByStatus]); }) // and contains hideable requests
			&& !headingContent.is(funcHasUnhideableRequests)) { // but no unhideable ones
				// wrap the headline ID in $.escapeSelector() in the new jQuery3, or use different heading/toc matching technique
				tocEntry = $("#toc [href='#" + $(this).find(".mw-headline")[0].id + "']"); // find matching TOC link entry
				if (booShow) {
					$(this).show();
					tocEntry.parent().find(".mw-editsection").remove(); // remove previously added TOC edit link
					tocEntry.find("span").css("color", ""); // restore TOC link colour for shown header
				}
				else {
					$(this).hide();
					editLink = $(this).find(".mw-editsection")[0].cloneNode(true); // create edit link for TOC
					tocEntry.find("span").css("color", "#808080"); // greyout TOC link for hidden header
					tocEntry.parent().find(".mw-editsection").remove(); // should not be here anymore but just to be safe
					$(editLink).insertAfter(tocEntry[0]); // add edit link to TOC
				}
			}
		});
	}
	
	/**
	 * A handler for saving the display/hide state of patrol requests by their status
	 * @param {jQuery.event} e The event that jQuery passes into the handler on trigger
	 */
	function saveNewDisplayState(e) {
		var booShowRequests = hasUserSetting(e.data.statusKey), // get current user setting
			objToggleLinks = $("." + objStatusClasses[e.data.statusKey].replace("-status-", "-toggle-")); // get the triggering jslinks
		booShowRequests = !booShowRequests; // invert toggle mode only on saving
		setUserSetting(e.data.statusKey, booShowRequests); // save user setting
		toggleDisplay(objToggleLinks, e.data.statusKey, booShowRequests); // activate toggled display
	}
	
	/**
	 * Toggle display of patrol requests by their status.
	 * The toggle may be triggered by a jslink which matches the status of the patrol requests to toggle.
	 * Multiple jslinks can trigger the same status.
	 * @param {jQuery} objTrigger The jQuery object containing the jslink(s) that triggered the toggle
	 * @param {string} strStatusKey The status key of patrol requests to toggle, must exist as key in the objStatusClasses global
	 * @param {boolean} booShow Whether to show (true) or hide (false) the specified patrol requests
	 */
	function toggleDisplay(objTrigger, strStatusKey, booShow) {
		$("." + objStatusClasses[strStatusKey]).next("dl").toggle(booShow); // toggle conversation
		$("." + objStatusClasses[strStatusKey]).toggle(booShow); // toggle request
		toggleEmptyHeadings(booShow, strStatusKey); // toggle grouped heading
		objTrigger.html(booShow ? "Hide" : "Show"); // toggle the triggering jslink
	}
	
	/**
	 * Attach handler to all relevant toggle jslinks and actuate the user setting state on load.
	 * Only on view, and only if there are toggle links, and not on edit, submit or other actions.
	 * When editing only a fragment/section of the page, the script would break anyway.
	 */
	if (mw.config.get("wgAction") === "view" && $(".diff").length <= 0 && $("[class*='patrol-request-toggle']").length > 0) {
		var objToggleLinks = null, booNoSettings = hasUserSetting(null) === null;
		for (var strStatusKey in objStatusClasses) if (objStatusClasses.hasOwnProperty(strStatusKey)) {
			if (booNoSettings) setUserSetting(strStatusKey, true); // enable all by default when user has no settings yet
			objToggleLinks = $("." + objStatusClasses[strStatusKey].replace("-status-", "-toggle-"));
			objToggleLinks.on("click", { statusKey: strStatusKey }, saveNewDisplayState); // add handler with autosave
			if (!hasUserSetting(strStatusKey)) toggleDisplay(objToggleLinks, strStatusKey, false); // hide on absence in user settings
		}
	}
});