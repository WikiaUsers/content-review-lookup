/**
 * Fixes the charset of categories in the descriptions of the badges
 * @author  Kofirs2634
 * @version 1.0
 */
$(function() {
	if (window.BadgesCharsetFix) return;
	window.BadgesCharsetFix = true;
	
	const c = mw.config.get(['wgNamespaceNumber', 'wgTitle']),
		encoder = new TextEncoder(), decoder = new TextDecoder('ascii'),
		chars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	var table = {};
	if (c.wgNamespaceNumber != 2 &&
		(c.wgNamespaceNumber == -1 && !['AchievementsCustomize', 'Leaderboard'].includes(c.wgTitle))
	) return;
	
	function rewrite(selector, n, key) {
		var el = $(selector).eq(n);
		el.html(el.html().replace(new RegExp(key, 'g'), table[key]))
	}
	
	// making decoding table
	chars.toUpperCase().split('').forEach(function(e) { table[decoder.decode(encoder.encode(e))] = e });
	chars.split('').forEach(function(e) { table[decoder.decode(encoder.encode(e))] = e });
	
	// decoding
	for (var key in table) {
		for (n = 0; n < $('.badge-text').length; n++) rewrite('.badge-text', n, key);
		for (n = 0; n < $('.customize-section h2').length; n++) rewrite('.customize-section h2', n, key);
		for (n = 0; n < $('.custom-badges .content-form p:last-child').length; n++) rewrite('.custom-badges .content-form p:last-child', n, key);
	}
	// special piece for .popover (по-русски "костыль")
	setInterval(function() {
		if (!$('.popover').length) return;
		for (var key in table) {
			var el = $('.popover .profile-hover-text p:first-of-type');
			el.html(el.html().replace(new RegExp(key, 'g'), table[key]))
		}
	}, 1000)
})