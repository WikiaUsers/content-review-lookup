/**
 * CONTENT REVIEW NOTES:
 * This API does not save or log any information that gets submitted
 * It just simply searches twitch.tv to see whether the username is live or not
**/
(function() {
	'use strict';
	if(!mw.config.get("wgCategories").includes("Characters")) return;
	if(mw.config.get("wgCategories").includes("Inactive")) return;
	
	var playedBy = document.querySelector('#live_notif_username').innerText;
	if(!playedBy) return;
	console.log('[ONX WIKI API] Detected streamer name for ' + mw.config.get("wgTitle") + ': ' + playedBy);
	
	console.log('[ONX WIKI API] Checking whether ' + playedBy + ' is live...');
	fetch('https://api.onx.wiki/twitch/' + playedBy).then(function(isLiveCheck) {
		isLiveCheck.json().then(function(isLive) {
			console.debug(isLive);
			console.log('[ONX WIKI API] ' + playedBy + ' is ' + (isLive.is_live ? 'live' : 'not live'));
			if(isLive.is_live) {
				document.getElementById("twitch_live_notif").style.display = "block";
			}
		})
	});
})();
(function() {
	fetch('https://api.onx.wiki/twitch/livecount').then(function(liveCountcheck) {
		liveCountcheck.json().then(function(liveCount) {
			document.getElementById("live_count").innerText = liveCount.live_count;
		})
	});
})();