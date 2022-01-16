/* Any JavaScript here will be loaded for all users on every page load. */

/* BackToTop */
window.BackToTopModern = true;

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages","Special:NewFiles"];
importScriptPage('AjaxRC/code.js', 'dev');

/* AddRailModule on top */
window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true},
];

/* Template for Tabs -  From Wikia One Piece*/
// Template:Tabs
$(function() {
	// If a sub-tab is "selected", make the parent tabs also "selected"
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabs
		var $TabsHeight = $(this).height();

		// Increase bottom margin of main tabs
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE randomly changes text above top navigation from "Symphogear Wiki" to one from the list -  From Marvel Database Fandom
////////////////////////////////////////////////////////////////////
*/
var wiki_name_number=Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 1;
var wiki_name_text=["Meteoroid-falling, burning, and disappear, then…", "In the distance, that day, when the star became music...", "Believe in justice and hold a determination to fist.", "By shedding many tears, the reality you face is...", "Create a history, with the light God could not know" ][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;


// END of Template:Tabs