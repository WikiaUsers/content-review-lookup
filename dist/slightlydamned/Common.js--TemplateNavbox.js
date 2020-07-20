// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint smarttabs:true laxbreak:true jquery:true browser:true */
/*global mediaWiki */

jQuery(function($) {
	"use strict";
	var $navboxes = $('table.template-navbox');
	if (!$navboxes.length) { return; }
	
	mediaWiki.loader.using('mediawiki.util', function() {
		// URL encoded, safe to concat in CSS
		var $replacement = $('<strong class="selflink">');
		$navboxes.find('a[href="' + mediaWiki.util.wikiGetlink() + '"]').replaceWith(function() {
			return $replacement.clone().append($(this).contents());
		});
	});
});
 
// </syntaxhighlight>