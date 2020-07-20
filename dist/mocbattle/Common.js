/* Any JavaScript here will be loaded for all users on every page load. */
/*Recent changes button */
function CreateContestsButton() {
	$('section header div.buttons a:first-child').before('<a data-id="contests" class="wikia-button secondary" accesskey="g" title="Category:Contests" href="/wiki/Category:Contests">Contests</a>');
}

addOnloadHook(CreateContestsButton);

/*Recent changes button */
function CreateRecentChangesButton() {
	$('section header div.buttons a:first-child').before('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
} 

addOnloadHook(CreateRecentChangesButton);