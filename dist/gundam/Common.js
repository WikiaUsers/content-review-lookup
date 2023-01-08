// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function (wds) {
	$('.sub-wds-icons-pages-small').append( // Icon for Template:CopyButton
		$('<span>', {
			'id': 'dev-wds-icons-pages-small'
		})
	);
	wds.render('.sub-wds-icons-pages-small');
});

/* Include Global Anime-Common.js Information */
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:WDSIcons/code.js',
		'u:anime:MediaWiki:Anime-Common.js',
	]
});

var config = {
	attributes: true,
	childList: true,
	subtree: true,
	characterData: true
};

// Executes after page has loaded.
$(function ($) {
	"use strict";
	// ==Extension:Page Forms monkeypatches==
	// Improves accessibility by turning captions into labels.
	$('.Form-Gundam .label[data-for]').replaceWith(function () {
		var elLabel = $("<label>", { html: $(this).html() });
		$.each(this.attributes, function (i, attribute) {
			elLabel.attr(attribute.name, attribute.value);
		});
		elLabel.attr('for', elLabel.attr('data-for'));

		return elLabel;
	});

	// Increase limit for multiple instance data by not posting empty fields.
	$('form:has(.Form-Gundam)').submit(function () {
		$(this).find(':input, textarea, select').filter(
			function () {
				return ($(this).hasClass('createboxInput') || ['hidden', 'checkbox'].includes($(this).attr('type'))) && !this.value
			}).attr('disabled', 'disabled');

		return true;
	});
});