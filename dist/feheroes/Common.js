/*
MediaWiki:Common.js - Loaded for all skins, NOT loaded on mobile.
MediaWiki:Mobile.js - Loaded for mobile ONLY.
MediaWiki:Universal.js - Loaded by both Common.js and Mobile.js, so loaded on everything no matter what.
*/

mw.hook('wikipage.content').add(function($content) {
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

	var articles = [];

	if ($content.find('.fehwiki-tabber')[0]) articles.push('MediaWiki:Universal.js');
	if ($content.find('#DropdownSelects')[0]) articles.push('MediaWiki:DropdownSelects.js');
	if ($content.find('#buildFilter')[0]) articles.push('MediaWiki:BuildDropdownFilter.js');
	if (mw.config.get('wgPageName') === 'Stats_calculator') articles.push('MediaWiki:Stats_Calculator.js');

	if (articles.length) importArticles({type: "script", articles: articles});
});