/* Any JavaScript here will be loaded for all users on every page load. */

/* tooltip config and custom tooltips */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
window.tooltips_list = [
    // Used in The Burgle Cats-related articles
    {
        classname: 'burgle-ability-tooltip',
        parse: '{' + '{BurgleCatsSkillDetail|<#skillname#>}}',
    },
    // [pre-migration, legacy] Used in Template:Lineup
    {
        classname: 'lineup-slot-info',
        parse: '{' + '{LineupSlotInfo|<#unitname#>|<#level#>|<#talents#>}}',
    },
    // [pre-migration] Used in Cat Filter (defunct)
    {
    	classname: 'cat-filter-icon-button',
    	parse: '{' + '{FilterIconInfo|<#name#>|<#desc#>}}',
    }
];
/* end of tooltip */

/*Add sidebar rail module*/
window.AddRailModule = [
    {page: 'Template:TopAddRail', prepend: true, maxAge: 60},
    {page: 'Template:BottomAddRail', maxAge: 60},
];
/* End of sidebar rail module */

/* LockOldComments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 120;
window.lockOldComments.addNoteAbove = true;
/* End of LockOldComments */

/* Change UTCClock link from ?action=purge to main page */
$( document ).ready(function () {
	$('#UTCClock').attr('href', 'https://battle-cats.fandom.com/wiki/Battle_Cats_Wiki');
});
/* End of UTCClock link change */

/* Event Code */
mw.loader.using('mediawiki.api').then(function () {
	api = new mw.Api();
	api.get({
		action: 'query',
		prop: 'revisions',
		pageids: 338054,
		rvprop: 'content',
		rvslots: 'main',
		formatversion: '2'
	}).done(function (data) {
		var content = data.query.pages[0].revisions[0].slots.main.content;
		var map = new Map(Object.entries(JSON.parse(content)));
		var images = Array.from(map.keys());
		var currentPage = $('.mw-page-title-main').html();
		api = new mw.Api();
		api.get({
			action: 'query',
			prop: 'pageprops',
			titles: currentPage,
			format: 'json'
		}).done(function (data) {
			var id = Object.keys(data.query.pages)[0];
			for (var i = 0; i < images.length; i++) {
				var img = images[i];
				if (map.get(img).includes(id)) {
					$('.mw-parser-output').append('<img class="hidden-temp" src="/Special:Redirect/file/' + img + '">');
				}
			}
		});
	});
});
/* End of Event Code*/