// <nowiki>
// BEGIN MW GADGET
// *********

$(function () {
	if ($('span.mw-rollback-link').size() > 0 && wgCanonicalSpecialPageName && wgCanonicalSpecialPageName == 'Contributions') {
		var selector = '';
		switch (skin) {
			case 'monobook':	selector = '#p-cactions ul:first';	break;
			case 'monaco':		selector = '#page_bar ul:first';	break;
			case 'oasis': 		selector = '#my-tools-menu';		break;
			default: 		return;					
		}
 
		// TODO: Use jquery and add only if skin == monaco
		appendCSS('body.masthead-special #page_bar {height: auto !important;}');
 
		$(selector).prepend(
			$('<li />').append(
				$('<a />').attr({
					'href': '#',
					'id': 'ca-rollbackall',
					'title': 'Rollback all edits displayed here.'
				}).click(function() {
					for (var i in document.links) {
						if (document.links[i].href.indexOf('action=rollback') != -1) {
							window.open(document.links[i].href);
						}
    					}
				}).text('Rollback all').css({
				})
			)
		);
	}
});

//END MW GADGET
//</nowiki>