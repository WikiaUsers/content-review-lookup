// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*! Copyright (C) 2012 Lunarity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*jshint smarttabs:true laxbreak:true laxcomma:true curly:false jquery:true browser:true */
/*global mediaWiki */

/**
 * This implements a basic image switcher gallery widget.
 *
 * There is a horizontally scrollable list of image names at the top and a single
 * image underneath that cross-fades when the top links are clicked.
 *
 * The widget applies itself to the page when it loads like mw-collapsible, it also
 * hooks into Wikia's previews in the Oasis Editor so that switches in the article
 * preview will work as well. The widget can be constructed manually using the
 * $.fn.imageSwitch() function [jQuery UI]. A basic API for adding and removing DOM
 * elements is available, including programmatic switching of the selected image.
 */
mediaWiki.loader.load(['jquery.ui.widget', 'jquery.ui.core'], null, true); // Fix RL bug
mediaWiki.loader.using(['jquery.ui.widget', 'jquery.ui.core'], function() {
// Resource Loader Bug: The stupid thing tries to do a document.write if the page
// hasn't $(document).ready()-ed yet, but that ONLY WORKS IN EMBEDDED SCRIPT TAGS.
// Since this is loaded by importArticles, that fails miserably and screws the
// whole thing up. Great.
"use strict";

// jQuery UI Core 1.9 feature
if (!jQuery.fn.uniqueId)
(function($) {
	var key = 0, PREFIX = 'uniqueId-';
	$.fn.extend({
		uniqueId: function() {
			return this.each(function() {
				if (!this.id) {
					this.id = PREFIX + key++;
				}
			});
		},
		removeUniqueId: function() {
			return this.each(function() {
				if (this.id && (this.id + '').substr(0, PREFIX.length) === PREFIX) {
					this.removeAttribute('id');
				}
			});
		}
	});
})(jQuery);

(function(window, $) {

	// MW1.19 comes with jQuery UI 1.8.23 which sucks a lot compared to 1.9
	// The APIs are not very good (no _destroy or _on/_off)
	// TODO: Need to create a throttled, shared handler for $(window).resize()
	$.widget('slightlydamned.imageSwitch', {
		/*options: { // Nothing
		},*/
		_activeClass: 'image-switch-jstitle-active',

		// Constructor
		_create: function () {
			// Base structure
			this.element.addClass('image-switch-list-js');
			this._$titleRow = $('<div class="image-switch-jslist-titles" />')
				.on({
					click: $.proxy(this._onTitleClick, this),
					keypress: $.proxy(this._onAriaPress, this)
				}, '.image-switch-item-title > a')
				.prependTo(this.element)
				;
			this._$active = $([]); // Empty jQuery

			// items to switchables
			this.refreshItems();

			// disabled option is "required" (sort of)
			if (this.options.disabled) {
				this.options.disabled = false;
				this.disable();
			}
		},

		// ARIA requires that spacebar act as a click on buttons, spacebar doesn't work
		// on links so we need to emulate it for compliance. This is otherwise pointless.
		_onAriaPress: function(ev) {
			if (ev.which === 32) {
				ev.preventDefault();
				ev.stopPropagation();
				$(ev.target).click();
			}
		},

		// Initialise item boxes into the switch.
		// Can be called at any time if nodes are added to adapt the new elements in.
		refreshItems: function() {
			var dataKey = this.widgetBaseClass, $titleRow = this._$titleRow;

			// Remove dead headings for items which have been removed from the body
			$titleRow.find('> .image-switch-item-title').each(function() {
				var self = this.parentNode.parentNode;
				if (!$.data(this, dataKey).closest('.image-switch-list-js').is(self)) {
					// Dead item, remove heading
					$(this).remove();
				}
			});

			// Find items that have not had their title moved (new items) and fix them
			this.element.find('> .image-switch-item > .image-switch-item-title').each(function() {
				var $title = $(this)
				  , $item = $(this.parentNode)
				  ;
				// We store the jQuery for the item in data so we can find the associated item
				// when the title is clicked
				// All items are rendered invisible and headings are wrapped in anchors
				// NOTE: role/aria are accessibility crap, pressed indicates toggle (radio/check)
				$title.data(dataKey, $item.css('display', 'none'))
					.uniqueId() // jQuery UI Core, make up an ID if there isn't one
					.appendTo($titleRow)
					.contents().wrapAll('<a href="#" role="button" aria-pressed="false" />');
				$item.attr('aria-labelledby', $title[0].id);
			});

			// Now that's done, we need to equally columnise if the total space is less than
			// the available width to create a neat symmetry.
			this._columniseTitles();

			// Make first item visible if none already are
			if (!this._$active.closest('.image-switch-list-js').is(this.element)) {
				this._$active = $titleRow.find('> .image-switch-item-title').first()
					.addClass(this._activeClass)
					;
				// Edge case, no items at all.
				if (this._$active[0]) {
					this._$active.data(dataKey).css('display', '');
					this._$active.children('a').attr('aria-pressed', 'true');
				}
			}
		},
		// Algorithm for making titles into neat, approximately equal columns.
		// This is rather complicated, the algorithm employs iterative elimination
		// to reduce the problem then solve the relevant subset.
		// Result is that large items are untouched, small items are widened equally
		// to try and distribute the available space "fairly" in an aesthetic way.
		_columniseTitles: function() {
			var $titleRow = this._$titleRow
			  , $titles = $titleRow.find('> .image-switch-item-title').css('width', '')
			  ;
			$titleRow.position(); // Reflow the page so we get the correct widths
			// Fast test, if there is no possible way this could work then don't bother.
			if ($titleRow.outerWidth(true) > this.element.width()) {
				return;
			}

			// If possible, we will make all columns equal.
			var availWidth = $titleRow.width()
			  , colWidth = availWidth / $titles.length
			  , items = []
			  ;
			// First step is to check for oversized columns, if they exist then
			// we have to solve for column space iteratively. O(n)
			$titles.each(function() {
				var $this = $(this), width = $this.outerWidth(true);
				if (width <= colWidth) { // Sane.
					items[items.length] = { $e: $this, w: width };
				} else { // Uh oh.
					availWidth -= width;
				}
			});
			// If there were oversized items then we're in trouble, we need to start
			// the iterative elimination algorithm.
			var i = 0, len = items.length;
			if ($titles.length !== len) {
				// Sort biggest to smallest. O(n log n)
				items.sort(function(a, b) {
					return a.w === b.w ? 0 : (a.w < b.w ? 1 : -1);
				});
				var lastI;
				do { // O(n)
					lastI = i;
					// Recalc the column width given that some space has been lost to
					// oversized columns.
					colWidth = availWidth / (len - lastI);

					// Apply elimination pass
					while (i < len) {
						if (items[i].w > colWidth) { // More space lost
							availWidth -= items[i].w;
						} else { // Since it's sorted, we can stop as soon as the test fails
							break;
						}
						++i;
					}

					// If nothing was eliminated then we have the final column set
				} while(lastI !== i);
			}
			// Now that we have a solvable problem, we just need to set the width on all the
			// remaining items.
			for ( ; i < len ; ++i) {
				// Column width - (padding + border + margin)
				items[i].$e[0].style.width = (colWidth - (items[i].$e.outerWidth(true) - items[i].$e.width())) + 'px';
			}
		},
		// Tear down and cleanup this widget
		destroy: function() {
			var dataKey = this.widgetBaseClass, activeClass = this._activeClass;
			// Move the titles back into the items, and strip the anchors and classes
			// Reveal all items as well.
			this.enable(); // Get rid of the blackout
			this.element.removeClass('image-switch-list-js');
			this._$titleRow
				.find('> .image-switch-item-title').each(function() {
					$(this.firstChild.firstChild).unwrap(); // Remove anchor
					var $this = $(this);
					this.style.width = ''; // Remove column width
					$this
					.removeData(dataKey).removeClass(activeClass).removeUniqueId() // Remove flags
					.data(dataKey).prepend($this).css({ // Title->item + reveal
						display: '',
						opacity: ''
					}).removeAttr('aria-labelledby');
				}).end()
				.remove() // Remove the (empty) title row
				;

			return $.Widget.prototype.destroy.call(this);
		},
		// Event handler for link clicks
		_onTitleClick: function(event) {
			event.preventDefault();
			if (this.options.disabled) return;
			this.switchTo(event.currentTarget.parentNode);
		},
		switchTo: function($node) {
			var dataKey = this.widgetBaseClass;
			if (typeof($node) === 'number') {
				$node = this._$titleRow.find('> :nth-child(' + $node + ')');
			} else {
				$node = $($node);
				if (!$node.hasClass('image-switch-item-title')) {
					// Find the title associated with the item
					$node = this._$titleRow.children().filter(function() {
						var d = $.data(this, dataKey);
						return d && d[0] === $node[0];
					});
					// If it's not an image-switch-item then we're screwed
					if (!$node.length) return;
				}
			}

			// If the chosen title is already active then give-up
			if (this._$active.is($node)) return;

			// Switch the active classes on the titles
			var $old = this._$active;
			this._$active = $node;
			$old.removeClass(this._activeClass)
				.children('a').prop('href', '#').attr('aria-pressed', 'false');
			$node.addClass(this._activeClass)
				.children('a').removeAttr('href').attr('aria-pressed', 'true');

			// Cross-fade the images
			this._crossFadeTo($node.data(dataKey), $old.data(dataKey));

			// Scroll the view to the element
			var visibleLeft = this._$titleRow[0].scrollLeft
			  , visibleWide = this._$titleRow[0].clientWidth
			  , nodeLeft = $node[0].offsetLeft
			  , nodeWidth = $node[0].offsetWidth
			  ;
			if (nodeLeft < visibleLeft) { // Too far right, scroll left
				// Stop current without skip to end [WARN: Callback isn't run]
				this._$titleRow.stop(true).animate({
					scrollLeft: nodeLeft
				}, 'fast');
			} else if (nodeLeft + nodeWidth > visibleLeft + visibleWide) { // Too far left, scroll right
				this._$titleRow.stop(true).animate({
					scrollLeft: nodeLeft - visibleWide + nodeWidth
				}, 'fast');
			} // else, it's in view already
		},
		// Cross-fade two images
		_crossFadeTo: function($new, $old) {
			// (stop(true, true) cancels any current animation, flags are to force the
			// animation to skip straight to the end values and run the completion callback
			// instead of just dropping dead)
			$old.stop(true, true);
			$new.stop(true, true);
			var offset = $old.position(); // WARN: Reflow

			// fadeIn/Out set display instead of clearing it which gets in our way
			// since we rely on stylesheets for our display styles.
			$old.css({
				position: 'absolute',
				top: offset.top,
				left: offset.left
			}).animate({opacity: 0}, 400, function() {
				this.style.display = 'none';
				this.style.position = '';
				this.style.top = this.style.left = '';
			});
			$new.css({
				display: '',
				opacity: 0
			}).animate({opacity: 1}, 400);
		},
		_setOption: function(name, data) {
			// Disabled is a built-in feature (enable/disable function)
			if (name === 'disabled') {
				data = !!data;
				if (data !== this.options.disabled) {
					if (data) {
						// Just cover the thing in a blackout
						this.element.append('<div class="image-switch-list-blackout" />');
					} else {
						this.element.find('.image-switch-list-blackout').remove();
					}
				}
			}

			return $.Widget.prototype._setOption.call(this, name, data);
		}
	});

	// When the page loads, find all switches and arm them
	$(function($) {
		$('#mw-content-text .image-switch-list, .WikiaArticle .image-switch-list').imageSwitch();
	});

	// If we're on an edit page then we'll hook the "AJAX Preview is ready" event that is
	// helpfully provided. It's fired against the window which is rather dumb but at least
	// I don't have to monkey patch or write an editor plugin.
	if (window.mediaWiki.config.get('skin') === 'oasis' && window.mediaWiki.config.get('wgAction') === 'edit') {
		// NOTE: /extensions/wikia/EditPageLayout/js/plugins/PageControls.js
		$(window).on('EditPageAfterRenderPreview.SlightlyDamned-ImageSwitch', function(ev, popup) {
			$(popup).find('.image-switch-list').imageSwitch();
		});
	}
})(window, jQuery);
});

// </syntaxhighlight>