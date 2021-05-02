/*
	This javascript puts any parenthesis content within a pagetitle into an element with 
	the title-parenthesis class, allowing its appearance to be controlled separately.

	The code was imported from the RuneScape Wiki.
	https://oldschool.runescape.wiki/w/MediaWiki:Gadget-titleparenthesis.js
	This may not be original credit - but no additional credit was given at the source.
*/

$(function () {
    var conf = mw.config.get([
       'wgNamespaceNumber'
    ]);
    var title = $('h1#firstHeading').text();

	if (conf.wgNamespaceNumber !== 0 || title.lastIndexOf('(') < 0 ||
		$('.no-parenthesis-style').length) {
		return;
	} 
	
	// use the title in the DOM so this respects DISPLAYTITLE
	var start = title.lastIndexOf('('),
		end = title.substring(start, title.length).lastIndexOf(')');

	// add offset here
	end += start + 1;
	
	$('h1#firstHeading')
		.empty()
		.append(
			mw.html.escape(title.substring(0, start)),
			$('<span>')
				.addClass('title-parenthesis')
				.text(title.substring(start, end)),
			mw.html.escape(title.substring(end, title.length))
		);
});