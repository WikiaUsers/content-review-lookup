/* Any JavaScript here will be loaded for all users on every page load. */

/* BackToTop */
window.BackToTopModern = true;

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages","Special:NewFiles"];
importScriptPage('AjaxRC/code.js', 'dev');

/* MessageWallUserTags */
window.MessageWallUserTags = {
    tagColor: '#C778A5',
    txtSize: '13px',
    glow: true,
    glowSize: '15px',
    glowColor: '#FF7777',
    users: {
        'GotenSakurauchi': 'Admin',
        'Sylphfarn12': 'Admin',
        'CureHibiki': 'Admin',
        'Lightangel2': 'Admin',
        'AirastormRider': 'Admin',
    }
};

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
// END of Template:Tabs

/* AddRailModule on top */
window.AddRailModule = [
    {page: 'Template:Today', prepend: true},
    {page: 'Template:Events', prepend: true},
    {page: 'Template:RailModule', prepend: true},
];