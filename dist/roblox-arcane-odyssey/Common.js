/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'Damage_Calculation') {
	$(function () {
	        importScriptPage('MediaWiki:Calculators/DamageCalculator.js');
	});
}