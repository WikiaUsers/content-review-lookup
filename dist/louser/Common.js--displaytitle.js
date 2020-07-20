// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true */

jQuery(function($) {
	"use strict";
	$('.changePageTitle').eq(0).each(function() {
		var $h1 = $('.WikiaPageHeader h1, h1#firstHeading').eq(0);
		$h1.prop('title', $h1.text()).empty().append(this.childNodes);
	}).end()
	.remove();
});

// </syntaxhighlight>