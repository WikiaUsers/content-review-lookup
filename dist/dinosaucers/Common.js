/* Any JavaScript here will be loaded for all users on every page load. */

/* DO YOU THING - signed by, GrimPapuff */

// MAKE SPECIAL:WHATLINKHERE AS ALPHABETICALLY
(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')) ? 1 : -1;
    });
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		// Group tags
		bureaucrat: {u:'Bureaucrat', link:'Dinosaucers Wiki:Bureaucrats'},
		sysop: {u:'Administrator', link:'Dinosaucers Wiki:Administrator'},
		inactive: { u: 'Has not edited recently' }
	}
};

UserTagsJS.modules.custom = {
	'Freestyle360': ['founder', 'inactive'], // Add founder + inactive
};

UserTagsJS.modules.inactive = 60;

// ReferencePop
/* The disable ReferencesPopups' animation by default, and why it doesn't affect? */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false }; /* ? */

// Recover style on TOC that's removed by a Fandom script. Found on dev.fandom.com then check on kingdomthegame.fandom.com/wiki/MediaWiki:Common.js.
// And do you know that you can use italic or bold header in TOC? In current day, Offical Fandom Wikia straight up remove this TOC's style in their script. If want to taken back like Wikipedia's choice of style, you must use JS for justice...
// See details of the problem, and the solution by HumansCanWinElves here: dev.fandom.com/f/p/4400000000000019632/
mw.hook("wikipage.content").add(function() {
	var toc = document.querySelector("#toc");
	if (!toc)
		return;

	var tocEntries = toc.querySelectorAll(".toctext"),
		entriesMap = new Map();

	tocEntries.forEach(function(entry) {
		if (entry.innerHTML !== entry.textContent)
			entriesMap.set(entry, entry.innerHTML);
	});

	if (!entriesMap.size)
		return;

	var interval = setInterval(function() {
		var markupRecovered = false;

		entriesMap.forEach(function(savedInnerHTML, entry) {
			if (entry.innerHTML !== savedInnerHTML) {
				entry.innerHTML = savedInnerHTML;
				markupRecovered = true;
			}
		});

		if (markupRecovered)
			clearInterval(interval);
	}, 500);
});