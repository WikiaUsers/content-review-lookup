/*Recent Changes Button */
function CreateRecentChangesButton() {
	$('section header div.buttons a:first-child').before('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
} 

addOnloadHook(CreateRecentChangesButton);

/*Leaderboard button */
function CreateLeaderboardButton() {
	$('section header div.buttons a:first-child').before('<a data-id="leaderboard" class="wikia-button secondary" accesskey="g" title="Achievements Leaderboard" href="/wiki/Special:Leaderboard">Leaderboard</a>');
} 

addOnloadHook(CreateLeaderboardButton);