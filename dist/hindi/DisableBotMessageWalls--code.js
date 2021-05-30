/**
  * Disable Bot Message Walls 
  * 
  * @author - Jdm280
  * @author - Caburum
  *  
  */

$(function (config) {
	config = config || {};
	var user = mw.config.get('profileUserName'),
	isWallPage = mw.config.get('profileIsMessageWallPage'),
	exceptions = config.exceptions || [];

	if (
		isWallPage && // Message Wall of a vaid user
		!exceptions.includes(user) // User is not excluded
	) {
		$.getJSON(mw.util.wikiScript('api') + '?action=query&format=json&list=users&usprop=groups&ususers=' + mw.util.rawurlencode(user), // Check user's groups
		function(data) {
			if (data.query.users[0].groups.includes('bot')) { // User is a bot
				$('div#MessageWall').remove();
			}
		});
	}
}(window.DisableBotMessageWalls));