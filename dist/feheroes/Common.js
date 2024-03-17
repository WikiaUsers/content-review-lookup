/*
MediaWiki:Common.js - Loaded for all skins, NOT loaded on mobile.
MediaWiki:Mobile.js - Loaded for mobile ONLY.
MediaWiki:Universal.js - Loaded by both Common.js and Mobile.js, so loaded on everything no matter what.
*/

mw.hook('wikipage.content').add(function($content) {
	// [[Template:AudioLooping]]
	var audioAll = $content[0].querySelectorAll('div[data-audio]');
	for (var i = 0; i < audioAll.length; i++) {
		var audio = document.createElement('audio');
		audio.src = audioAll[i].dataset.audio;
		audio.preload = 'none';
		audio.style.maxWidth = '100%';
		audio.style.width = '300px';
		audio.controls = true;
		audio.loop = true;
		audioAll[i].appendChild(audio);
	}

	// [[Template:Style]]
	var styles = $content[0].querySelectorAll('#pageStyles[data-style]');
	for (i = 0; i < styles.length; i++) {
		var style = document.createElement('style');
		style.append(styles[i].dataset.style);
		styles[i].appendChild(style);
	}

	var articles = [];

	articles.push('MediaWiki:ChangeVisibleText.js');
	if ($content.find('.fehwiki-tabber')[0]) articles.push('MediaWiki:Universal.js');
	if ($content.find('#DropdownSelects')[0]) articles.push('MediaWiki:DropdownSelects.js');
	if ($content.find('#buildFilter')[0]) articles.push('MediaWiki:BuildDropdownFilter.js');
	if (mw.config.get('wgPageName') === 'Stats_calculator') articles.push('MediaWiki:Stats_Calculator.js');

	//Gamepedia/FANDOM-specific code to add format=original parameter to file URLs on File pages
	if (mw.config.get("wgNamespaceNumber") === 6) {
		$( ".fullImageLink > a, .fullMedia > p > a, .filehistory tr td:nth-child(3) > a, .filehistory tr td:nth-child(4) > a" ).attr( "href", function( _, val) {
			return (new mw.Uri(val)).extend({format: "original"}).toString();
		});
	}

	if (articles.length) importArticles({type: "script", articles: articles});
});