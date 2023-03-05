// EDIT INTRO BUTTON
importScriptPage('EditIntroButton/code.js', 'dev');
// END INTRO BUTTON
 
// REFRESH DROP-DOWN MENU OPTION
importScriptPage('PurgeButton/code.js', 'dev');
// END REFRESH BUTTON

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
}

function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-sims" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}

// *** ReferencePopups script *** //
// *** [[w:c:dev:ReferencePopups]] *** //
// *** Simply move your cursor over any footnote and the contents of the footnote will be displayed in a popup *** //
// *** You no longer have to jump away from the article text to read a footnote! *** //
// *** Currently "unlocked" -- users can disable the script for themselves in the script's preferences if they choose so *** //
// *** NOTE: "Configure Reference Popups" button will not appear in Oasis skin if Wikia's category module is enabled. Add ?useskin=monobook to the end of the page URL and look for the link just below the categories *** //
// *** The developers may be looking for a fix. *** //
importArticle({type:'script', article:'w:c:dev:ReferencePopups/code.js'});
// *** END ReferencePopups script *** //

/* Discord Integrator added to Wikia Rail */
$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});