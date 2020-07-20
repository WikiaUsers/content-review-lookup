// Thumb version of the widget
// Modelled after Youtube like-bar
// TODO: Use images instead of text. Make width configurable.
// TODO: Mode switch to hide like-bar and just use counter, also offer to hide dislike counter
dev.StarRatings.ui.thumb = function($this, callbacks) {
	"use strict";
	// Image sprite: 2x2 grid (like, dislike columns; normal, hover states)
	var $ = jQuery,
	    $thumbDown = $('<span style="padding: 0 0.5ex; font-weight:bold; cursor:pointer; font-family: \'Segoe UI\', Emoji, sans-serif">&#x1F44E;</span>'),
	    $thumbUp = $thumbDown.clone().html('&#x1F44D;'),
	    $bar = $('<span style="display:inline-block; width: 10em; height: 5px; border-radius:1ex; overflow:hidden; vertical-align: middle"><span style="background-color:green; border-right:1px solid white; height: 100%; display: block; float: left"></span><span style="background-color:red; margin-right:-1px; height: 100%; display: block; float: left"></span></span>');
	$this
	.append($thumbUp, $bar, $thumbDown)
	.css('display', 'inline-block');
	$thumbUp
	.prop('title', 'Dislike')
	.click($.proxy(callbacks.submit, callbacks, 10))
	.mouseenter($.proxy($thumbDown.css, $thumbUp, 'color', '#0B0')).mouseleave($.proxy($thumbUp.css, $thumbUp, 'color', ''));
	$thumbDown
	.prop('title', 'Like')
	.click($.proxy(callbacks.submit, callbacks, 0))
	.mouseenter($.proxy($thumbDown.css, $thumbDown, 'color', 'red')).mouseleave($.proxy($thumbDown.css, $thumbDown, 'color', ''));
	return {
		set: function(data) {
			var total = data.votes[0] + data.votes[10];
			var thumbDownPerc = (data.votes[0] / total * 100 || 0).toFixed(2) + '%';
			var thumbUpPerc = (data.votes[10] / total * 100 || 0).toFixed(2) + '%';
			$bar.children()
			.first().css('width', thumbUpPerc).end()
			.last().css('width', thumbDownPerc);
			$thumbDown.html('&#x1F44E; ' + thumbDownPerc);
			$thumbUp.html('&#x1F44D; ' + thumbUpPerc);
		},
		onAjaxError: $.noop
	};
};