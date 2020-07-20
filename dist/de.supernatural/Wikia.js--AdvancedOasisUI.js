/* Script for adding various UI improvements to Oasis
 * Script by User:Porter21 (http://fallout.wikia.com) and User:Kangaroopower
 * i18n function originally by User:Dantman
 */
(function ($) {
	var config = window.AdvancedOasisUI;
	if (!config) config = {};
	// Stop the script from starting more than once
	if (config.Actions) return;
 
	// true=deep copy (allows user to override some of the translations for
	// one language without causing the script to fall back to English for
	// everything that wasn't overridden)
	config = $.extend(true, {
		accountNavFollowedPages: false,
		accountNavWatchlist: false,
		categoryRedlink: true,
		RCHeader: true,
		lightbox: true,
		randomPageLimitedTo: '',
		userLang: true,
		// German
		'de': {
			addPage: "Seite hinzufügen",
			contributions: "Beiträge",