/*
Darstellung dieses Gadgets nicht korrekt in Firefox ≤ 32, Internet Explorer und Edge (Stand 7. April 2017)
Sollte fehlerfrei funktionieren:
 Desktop
  Chrome ≥ 1
  Edge ≥ 18
  Firefox ≥ 53
  Opera ≥ 15
  Safari ≥ 4

 Mobil
  Android webview ≥ 2
  Chrome für Android ≥ 18
  Firefox für Android ≥ 53
  Opera für Android ≥ 14
  Safari auf iOS ≥ 3.2
  Samsung Internet ≥ 1.0

Source: (Stand 17. Nov 2020)
 https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image
 https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position
*/
mw.hook('wikipage.content').add(function($content) {
	'use strict';
	$content.find('.enchanted:not(.loaded)')
		.addClass('loaded')
		.each(function(index, ele) {
			var sprite = $(ele).find('.sprite');
			var link = sprite.css('background-image');
			var pos = sprite.css('background-position');
			var node = $('<span>')
				.addClass('glint')
				.css('mask-image', link)
				.css('mask-position', pos)
				.css('-webkit-mask-image', link)
				.css('-webkit-mask-position', pos)
				.appendTo(sprite);
		});
});