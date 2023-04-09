/**
 * Name:        block-lengths
 * Version:     v1.0
 * Author:      Caburum
 * Description: Displays the table from [[Project:Rules#Block Lengths]] when blocking a user
**/

mw.loader.using(['mediawiki.api', 'mediawiki.util'], function() {
	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Block' || window['gadget-block-lengths-loaded']) return;
	window['gadget-block-lengths-loaded'] = true;

	// Display table next to form
	mw.util.addCSS('\
		.mw-htmlform-ooui-wrapper {\
			display: flex;\
			flex-wrap: wrap;\
			gap: 10px;\
		}\
		.mw-htmlform-ooui-wrapper > .mw-htmlform {\
			min-width: 500px;\
			flex: 1;\
		}\
		.mw-htmlform-ooui-wrapper > .mw-parser-output {\
			max-width: 500px;\
			flex: auto;\
		}\
	');

	// Fetch table
	var api = new mw.Api(),
		page = new mw.Title('Rules', 4);
	api.get({
		action: 'parse',
		text: '{{#lst: ' + page.toText() + '|blocklengths}}', // [[mw:Extension:Labeled Section Transclusion]]
		contentmodel: 'wikitext'
	}).done(function (data) {
		var text = data.parse.text['*'];

		// Add table to UI
		$('.mw-htmlform-ooui-wrapper').append(text);

		// Add link to rules
		$('.mw-ipb-conveniencelinks').prepend('<a href="' + page.getUrl() + '" title="' + page.toText() + '">Rules</a> | ');
	});
});