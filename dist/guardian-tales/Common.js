// append '&format=original' to the url source of specified images
$( function() {
	$('.mw-parser-output img').each( function() {
		var imagename = $(this).attr('data-image-name');
		if ((imagename.match(/^Sprite/) != null) || (imagename.match(/^NPC/) != null) || (imagename.match(/^Artifact/) != null) || (imagename.match(/^Icon/) != null) || (imagename.match(/^Equipment/) != null) || (imagename.match(/^Costume/) != null)) {
			$(this).attr('src', $(this).attr('src') + '&format=original');
		}
	});
});

// add tabindex="-1" to tooltipped itemboxes to retain focus on click
var itemboxTooltip = document.querySelectorAll('.custom-tooltip .itembox');
itemboxTooltip.forEach(function(element) {
	element.tabIndex = -1;
});

// hide LastEdited's summary and modal
if (!window.lastEdited) {
	window.lastEdited = { diffModal: false, comment: false };
}

// import [[MediaWiki:Group-sysop.js]]
if (mw.config.get('wgUserGroups').includes('sysop')) {
	importArticle({
		type: 'script',
		article: 'MediaWiki:Group-sysop.js'
	});
}