// <nowiki>
/* JavaScript tooltips 
	usage: 
 
		recommended usage: see [[Template:Tooltip]] and [[Template:Tooltip text]], or [[Module:Tooltip]] for module interface
 
 
	raw usage:
 
	Place this where you want the button to appear: 
	<span class="hidden js-tooltip-click" style="display:none;" data-tooltip-name="test">clickable</span>
 
	place this elsewhere to define the content of the tooltip:
<div class="hidden js-tooltip-wrapper" style="display:none;" data-tooltip-for="test" data-tooltip-arrow="yes" data-tooltip-arrow-size="10" data-tooltip-style="custom style"><div class="js-tooltip-text">Content</div></div>
 
 
	span.js-tooltip-click - required
		attribute: data-tooltip-name - links to the corresponding divl; can have many with the same name
		content: the clickable thing, defaults to ?
 
	div.js-tooltip-wrapper - required
		attributes:
			data-tooltip-for - required; links this to spans with the data-tooltip-name equal to this
			data-tooltip-arrow - optional; yes for arrow, no/default for no arrow
			data-tooltip-arrow-size - optional; yes for arrow, no/default for no arrow
			data-tooltip-style - optional; the width of the arrow (height=2width) in px; also defines the gap between the tooltip and the span. defaults to 10
 
		content: div.js-tooltip-text
 
	div.js-tooltip-text - required
		contains: text/html to display inside tooltip
 
*/
(function ($) {
	// every tooltip wrapper on the page considered separately
 
	// remove excess tooltip wrappers for the same name - can cause issues
	(function(){
		var forarr = {}, forarrv, key, first;
		$('.js-tooltip-wrapper').each(function(){
			forarr[$(this).attr('data-tooltip-for')] = true;
		});
		for (key in forarr) {
			first = $('.js-tooltip-wrapper[data-tooltip-for="'+key+'"]').first();
			$('.js-tooltip-wrapper[data-tooltip-for="'+key+'"]').not(first).remove();
		}
	})();
 
	$('.js-tooltip-wrapper').each(function () {
		var $span,
		$text,
		$arrow,
		$wrapper,
		$close,
		resizeEvent,
		hasArrow = true,
		arrpos,
		style,
		styles,
		parsed_styles,
		name,
		size,
		limitwidth = false,
		$currspan = $(null);
 
		// setup vars
		$wrapper = $(this);
		name = $wrapper.attr('data-tooltip-for');
 
		if ($wrapper.attr('data-tooltip-arrow')) {
			hasArrow = $wrapper.attr('data-tooltip-arrow').toLowerCase() == 'oui';
		}
		if ($wrapper.attr('data-tooltip-limit-width')) {
			limitwidth = $wrapper.attr('data-tooltip-limit-width').toLowerCase() == 'oui';
		}
		style = $wrapper.attr('data-tooltip-style');
		size = parseInt($wrapper.attr('data-tooltip-arrow-size'), 10);
		if (typeof size !== 'number' || isNaN(size)) {
			size = 10;
		}
 
		$text = $wrapper.find('.js-tooltip-text');
 
		// setup wrapper css for movement
		$wrapper.removeClass('hidden')
			.on('js-tooltip-close', function () {
				$wrapper.hide();
				$currspan.removeAttr('data-is-currspan');
				$currspan = $(null);
			});
 
		// setup span css
		$span = $('span.js-tooltip-click[data-tooltip-name="' + name + '"]');
		$span.removeClass('hidden')
			.attr('title', 'Cliquez pour des explications, cliquez encore pour fermer');
		if ($span.html() === '') {
			$span.text('?');
		}
 
		// setup arrow
		$arrow = $('<div>');
		$arrow.addClass('js-tooltip-arrow')
			.css({
				top: ($wrapper.outerHeight() * 0.3) + 'px',
				left: ('-' + (size+2) + 'px'), // width of arrow + width of text div border
				'margin-top': ('-' + (size/2) + 'px'),
				'border-width': size + 'px', //actual width of the arrow
			});
		arrpos = '-' + (size+2) + 'px';
 
		// easiest way to deal with arrow is to just not add it if it isn't specified
		if (hasArrow) {
			$wrapper.prepend($arrow);
		}
 
		// setup close button
		$close = $('<button>');
		$close.html('<img src="https://images.wikia.nocookie.net/__cb1458766163/common/skins/oasis/images/icon_close.png" />')
			.addClass('close wikia-chiclet-button js-tooltip-close')
			.click(function(){
				$wrapper.trigger('js-tooltip-close');
			});
		$text.prepend($close);
 
		// setup resize event for repositioning tooltips
		resizeEvent = function () {
			if ($currspan.length === 0) {
				return;
			}
			var offset, position, width, $body, $mwtext;
			offset = $currspan.offset();
			position = $currspan.position();
			width = $currspan.outerWidth();
			$body = $('body');
			$mwtext = $('#mw-content-text');
 
 
			$wrapper.css({
				top: (offset.top - $wrapper.outerHeight()*0.3) + 'px',
			});
			$arrow.css({
				top: ($wrapper.outerHeight() * 0.3) + 'px',
			});
 
			if ((!limitwidth && offset.left > 0.5 * $body.width())
				|| (limitwidth && position.left > 0.5 * $mwtext.width())) {
				$wrapper.css({
					right: (($body.width() - offset.left) - 5 + size) + 'px',
					left: '', // remove other pos to prevent overspecification
				});
				$arrow.removeClass('js-tooltip-arrow-pointleft').addClass('js-tooltip-arrow-pointright').css({
					left: '', // remove other pos to prevent overspecification
					right: arrpos,
					'border-left-width': size + 'px',
					'border-right-width': 0,
				});
				if (limitwidth) {
					$wrapper.css({
						'max-width': '500px',
					});
				}
			} else {
				$wrapper.css({
					left: (offset.left + width - 5 + size) + 'px',
					right: '', // remove other pos to prevent overspecification
				});
				$arrow.removeClass('js-tooltip-arrow-pointright').addClass('js-tooltip-arrow-pointleft').css({
					right: '', // remove other pos to prevent overspecification
					left: arrpos,
					'border-right-width': size + 'px',
					'border-left-width': 0,
				});
				if (limitwidth) {
					$wrapper.css({
						'max-width': '500px',
					});
				}
			}
		};
 
		// attach resize event
		$(window).resize(resizeEvent);
 
		// attach click event to span
		$span.click(function (event) {
			$this = $(event.currentTarget);
			if ($this.attr('data-is-currspan') == 'true') {
			// if the current span is clicked while the popup is open, close the popup
				$this.removeAttr('data-is-currspan');
				$currspan = $(null);
				$wrapper.trigger('js-tooltip-close');
			} else {
				// else move and show the currently open popup
				$currspan = $this;
				$('.js-tooltip-wrapper').not($wrapper).trigger('js-tooltip-close');
				$this.attr('data-is-currspan', true);
				$wrapper.show();
				resizeEvent();
			}
		});
 
		// add custom style
		if (typeof style === 'string' && style !== '') {
			styles = style.split(';');
			styles_parsed = {};
			styles.forEach(function(v) {
				if (typeof v === 'string') {
					var arr = v.split(':');
					if (typeof arr[1] === 'string' && arr[1].trim() !== '') {
						styles_parsed[arr[0].trim()] = arr[1].trim();
					}
				}
			});
			$wrapper.css(styles_parsed);
		}
 
		// finish up
		$wrapper.hide();
		$span.show();
		$wrapper.appendTo($('body'));
	});
 
	// close tooltip if clicked outside of
	$(document).click(function (event) {
		if ($('.js-tooltip-wrapper:visible').length && !$(event.target).closest('.js-tooltip-wrapper, .js-tooltip-click').length) {
			$('.js-tooltip-wrapper').trigger('js-tooltip-close');
		}
	});
})($);