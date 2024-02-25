/* Any JavaScript here will be loaded for all users on every page load. */

/* DO YOU THING - signed by, GrimPapuff */
/* MAKE SPECIAL:WHATLINKHERE AS ALPHABETICALLY */
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

/* EDIT SECTION */
$('.mw-editsection-visualeditor').append('Visual <svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-pencil-tiny"><symbol id="wds-icons-pencil-tiny" viewBox="0 0 12 12"><use xlink:href="#pencil-tiny" fill-rule="evenodd"><path id="pencil-tiny" d="M8.5 6.086L5.914 3.5 7 2.414 9.586 5 8.5 6.086zM4.586 10H2V7.414l2.5-2.5L7.086 7.5l-2.5 2.5zm7.121-5.707l-4-4a.999.999 0 0 0-1.414 0l-6 6A1 1 0 0 0 0 7v4a1 1 0 0 0 1 1h4c.265 0 .52-.105.707-.293l6-6a.999.999 0 0 0 0-1.414z"></path></use></symbol></use></svg>');

/* MORE ADD IN LICENS-DESCRIPTION */
$('.license-description').append('For more information, see the <a href="/wiki/Dinosaucers_Wiki:Copyright_Policy">Copyright Policy</a>.');

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

// Back to Top Button
window.BackToTopModern = true;

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