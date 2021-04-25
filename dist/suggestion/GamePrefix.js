/*
	This javascript adapts the TitleParenthesis script to put the title prefix within
	a title-identifying class, allowing its appearance to be controlled separately.

	The code was imported from the RuneScape Wiki.
	https://oldschool.runescape.wiki/w/MediaWiki:Gadget-titleparenthesis.js
	This may not be original credit - but no additional credit was given at the source.
*/

$(function () {
    var conf = mw.config.get([
       'wgNamespaceNumber',
        'wgTitle'
    ]);

	if (conf.wgNamespaceNumber !== 0 || conf.wgTitle.indexOf(':') < 0 ||
		$('.no-prefix-style').length) {
		return;
	} 
	
	// use the title in the DOM so this respects DISPLAYTITLE
	var title = $('h1#firstHeading').text(),
		start = 0,
		end = title.indexOf(':'),
		namespace = title.substring(start, end);

	// add offset here
	end += start + 1;
	
	$('h1#firstHeading')
		.empty()
		.append(
			title.substring(0, start),
			$('<span>')
				.addClass(namespace + '-prefix')
				.text(title.substring(start, end)),
			title.substring(end, title.length)
		);
});