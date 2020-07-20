// 09:04, November 14, 2016 (UTC)
// <source lang="JavaScript">

// ADD links to OnTheWiki via Wiki-navigation
// @author: UltimateSupreme

(function($) {
	"use strict";

	function addLinks(url, text) {
		var $header = $('#WikiHeader').find('.marked ul');
		$header.append(
			$("<li><a>").addClass('subnav-2-item')
			.find('a').attr({
				'href' : url,
				'class': 'subnav-2a'
			}).text(text).end()
		);
	}
	
	// Edit this part to add more links:
	addLinks("/wiki/Special:CreatePage", "Create!");
	addLinks("/wiki/Project:Help_Center", "Help Center");

        $( '.subnav-2a[href="/wiki/Special:CreatePage"]' ).click(  CreatePage.requestDialog );

}(jQuery));

// </source>