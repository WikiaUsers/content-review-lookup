// Prevents ProfileTags extension to overwrite default user tags.
(window.dev = window.dev || {}).profileTags = {
	noHideTags: true
};

if (mw.config.get('wgPageName') === 'Monsters') {
	$(function () {
	        importScriptPage('MediaWiki:Calculators/MonsterCalculator.js');
	});
}