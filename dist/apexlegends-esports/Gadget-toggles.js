// <nowiki>
(function($, mw) {
	'use strict';
window.popupButton = function(e) {
	e.stopPropagation();
	var hiddenClass = $(this).attr('data-toggler-hiddenclass');
	hiddenClass = hiddenClass ? hiddenClass : 'popup-content-hidden';
	// if we're re-clicking the same one we just showed before then, just hide it
	// otherwise hide all the others and show this one
	var $shownContent = $(this).find('.popup-content-wrapper-action:not(.' + hiddenClass + ')');
	if ($shownContent.length) {
		$shownContent.addClass(hiddenClass);
		return;
	}
	// hide everything...
	$('.popup-content-wrapper-action').addClass(hiddenClass);
	var $wrapper = $(this).find('.popup-content-wrapper-action');
	// ...and then show only this one
	$wrapper.toggleClass(hiddenClass);
	var $inner = $(this).find('.popup-content-inner-action');
	// this should be a decrease in width so that we don't have wasted extra whitespace
	$wrapper.css('width', $inner.outerWidth(true));
	
	// time to compute dimensions so we can shift this stuff if needed
	// we don't want pop-ups to overflow out of window/bounding box provided by page
	// we're doing all this before we actually show the thing, so we can guarantee there's no "jump"
	var width = $wrapper.outerWidth(true);
	var buttonHalfWidth = $(this).width() / 2;
	var leftCoord, totalWidth;
	var topCoord, totalHeight;
	// a window container will be specified for example on the front page when we want popup area to be
	// constrained more strictly than just the edge of the page.
	// because there might be a more immediate positioned parent of the popup button, we
	// don't use offsetParent() method here, and instead manually calculate offsets using coordinates
	// of the element itself (the button) and the parent we specified with .popup-window-container
	var windowContainer = $(this).closest('.popup-window-container, .page-content');
	
	// CASE: we only want the parent to constrain the verticality of the element, but it's ok
	// to spill out horizontally. An example is the per-game summaries "inside" of the match results
	var windowContainerY = $(this).closest('.popup-window-container-y');
	
	if (windowContainer.length > 0) {
		// in this case use offset which respects the position of the elements wrt entire document
		// in theory we should probably support position within window also, but
		// for the most part, this situation should only occur with relatively small areas
		// e.g. front page sections
		// so to make things SIGNIFICANTLY simpler, don't worry about maybe spilling off window
		var coords1 = $(this).offset();
		var parentCoords1 = $(windowContainer).offset();
		leftCoord = parseInt(coords1.left) - parseInt(parentCoords1.left);
		totalWidth = $(windowContainer).width();
		// may as well grab y values here too since they're conditional, we'll use them later though
		topCoord = parseInt(coords1.top) - parseInt(parentCoords1.top);
		totalHeight = $(windowContainer).height();
	}
	else if (windowContainerY.length > 0) {
		// this comes from above, verticality stuff is constrained by parent element
		var coords2 = $(this).offset();
		var parentCoords2 = $(windowContainerY).offset();
		topCoord = parseInt(coords2.top) - parseInt(parentCoords2.top);
		totalHeight = $(windowContainerY).height();
		
		// this comes from below, horizontal-ness stuff is constrained only by the window
		var coords3 = this.getBoundingClientRect();
		leftCoord = parseInt(coords3.left);
		totalWidth = $(window).width();
	}
	else {
		// getBoundingClientRect in order to get position within current window
		// we want to avoid spilling off window
		// n.b. this implies avoiding spilling off document as well
		var coords4 = this.getBoundingClientRect();
		leftCoord = parseInt(coords4.left);
		totalWidth = $(window).width();
		topCoord = parseInt(coords4.top);
		totalHeight = $(window).height();
	}
	
	// now that we know all of the relevant dimensions, do the adjustments
	
	// first the x-direction if needed
	if (leftCoord + width + buttonHalfWidth > totalWidth) {
		// case 1: this thing is TOO BIG just put it all the way in the other side and let it overflow still
		if (width > totalWidth) {
			$wrapper.css('left', -1 * parseInt(leftCoord) + 'px');
		}
		// case 2: this thing is overflowing unless we put the right amount of space over to the left
		else {
			$wrapper.css('left', parseInt(totalWidth) - (parseInt(leftCoord) + parseInt(width)) + 'px');
		}
	}
	// case 3: no overflow we are happy
	else {
		$wrapper.css('left', '');
	}
	
	// now the y-direction, again if needed
	var height = $inner.outerHeight(true);
	var buttonHalfHeight = $(this).height() / 2;
	if (topCoord + height + buttonHalfHeight > totalHeight) {
		if (height > totalHeight) {
			$wrapper.css('top', -1 * parseInt(topCoord) + 'px');
		}
		else {
			$wrapper.css('top', parseInt(totalHeight) - (parseInt(topCoord) + parseInt(height)) + 'px');
		}
	}
	else {
		$wrapper.css('top', '');
	}
	
	// We are now done positioning the thing
	
	// Next, we may need to do some height stuff so we can do an overflow:scroll; thing
	
	if ($wrapper.hasClass('scrollable-y')) {
		$inner.css('max-height', totalHeight + 'px');
	}
	
	$(document).click(function(){
		$('.popup-content-wrapper-action').addClass(hiddenClass);
	});
};

mw.hook('wikipage.content').add(function($content) {
	// implements freeform toggle akin to Dynamic Tabs - only one section can be shown at a time
	// assign class "optionfromlist-toggler" to each toggler to make them recognized at all
	// assign attr "data-toggle-section" & this value as a class to each toggler
	// to make them behave together (to support multiple unrelated sections per page)
	
	// to start something hidden, add class toggle-section-hidden
	
	// assign attrs data-toggler-show and data-toggler-hide to each
	// assign classes of the values of the attr of show/hide to the content that you want it to control
	
	function oflRun(e) {
		var $this = $(e.srcElement);
		if($this.hasClass('active')) return;
		var thisSection = $this.attr('data-toggle-section');
		$('.' + thisSection).removeClass('active');
		if ($this.attr('data-toggler-setactive')) $('.' + ($this.attr('data-toggler-setactive')) ).addClass('active');
		$this.addClass('active');
		var toHide = $this.attr('data-toggler-hide');
		var toShow = $this.attr('data-toggler-show');
		if (! toHide.startsWith('.')) toHide = '.' + toHide;
		if (! toShow.startsWith('.')) toShow = '.' + toShow;
		var hiddenClass = $this.attr('data-toggler-hiddenclass');
		hiddenClass = hiddenClass ? hiddenClass : 'toggle-section-hidden';
		$(toHide).addClass(hiddenClass);
		$(toShow).removeClass(hiddenClass);
		
	}
	
	$content.find('.optionfromlist-toggler').click(oflRun);
	
	// no "active" or "inactive" toggles here, otherwise behaves the same as above
	$content.find('.alwaysactive-toggler').click(function() {
		var $this = $(this);
		var toHide = $this.attr('data-toggler-hide');
		var toShow = $this.attr('data-toggler-show');
		if (! toHide.startsWith('.')) toHide = '.' + toHide;
		if (! toShow.startsWith('.')) toShow = '.' + toShow;
		var hiddenClass = $this.attr('data-toggler-hiddenclass');
		hiddenClass = hiddenClass ? hiddenClass : 'toggle-section-hidden';
		$(toHide).addClass(hiddenClass);
		$(toShow).removeClass(hiddenClass);
	});
	
	$content.find('.sections-toggler').click(function() {
		var $this = $(this);
		var toHideData = $this.attr('data-toggler-hide');
		var toShowData = $this.attr('data-toggler-show');
		var toHide_tbl = toHideData.split(';');
		var toShow_tbl = toShowData.split(';');
		
		var hiddenClass = $this.attr('data-toggler-hiddenclass');
		hiddenClass = hiddenClass ? hiddenClass : 'toggle-section-hidden';
		
		for (var i in toHide_tbl) {
			if (toHide_tbl.hasOwnProperty(i)) {
				var toHide = toHide_tbl[i];
				if (! toHide.startsWith('.')) toHide = '.' + toHide;
				$(toHide).addClass(hiddenClass);
			}
		}
		
		for (var j in toShow_tbl) {
			if (toShow_tbl.hasOwnProperty(j)) {
				var toShow = toShow_tbl[j];
				if (! toShow.startsWith('.')) toShow = '.' + toShow;
				$(toShow).removeClass(hiddenClass);
			}
		}
	});
	
	// checkboxes to show-hide rows in a table (or whatever)
	$content.find('.checkbox-togglers').each(function(undefined, ele) {
		$(ele).find('span[data-toggle-class]').each(function(index, eleSpan) {
			var dataset = eleSpan.dataset;
			var input = document.createElement('input');
			input.type = 'checkbox';
			if (dataset.checked) input.checked = dataset.checked;
			if (dataset.toggleClass) input.dataset.toggleClass = dataset.toggleClass;
			if (dataset.togglerHiddenclass) input.dataset.togglerHiddenclass = dataset.togglerHiddenclass;
			input.addEventListener('change', function() {
				var $this = $(this);
				var classToToggle = $this.attr('data-toggle-class');
				if (! classToToggle.startsWith('.')) classToToggle = '.' + classToToggle;
				var hiddenClass = $this.attr('data-toggler-hiddenclass');
				hiddenClass = hiddenClass ? hiddenClass : 'toggle-section-hidden';
				$(classToToggle).toggleClass(hiddenClass);
			});
			eleSpan.parentElement.prepend(input);
		});
	});
	
	$content.find('.all-toggle-all-toggler').off('click');
	$content.find('.all-toggle-all-toggler').click(function() {
		var attr = $(this).attr('data-all-toggle-key');
		console.log(attr);
		$('.all-toggle-all-toggler[data-all-toggle-key="' + attr +'"]').toggleClass('active');
		$('.all-toggle-all-toggler[data-all-toggle-key="' + attr +'"]').toggleClass('toggle-section-hidden');
		$('.all-toggle-all-toggle[data-all-toggle-key="' + attr +'"]').toggleClass('toggle-section-hidden');
	});
	
	
	// Show-Hide individual columns of tables, using Widget:ColumnShowHide
	$content.find('.column-show-hide-toggler').off('click');
	$content.find('.column-show-hide-toggler').click(function() {
		var tableIndex = $(this).closest('.column-show-hide').attr('data-table-index');
		var columnIndex = $(this).attr('name');
		var selectors = [
			'table.column-show-hide-' + tableIndex + ' > * > tr > *:nth-of-type(' + columnIndex + '):not(.colspan-cell)',
			'table.column-show-hide-' + tableIndex + ' > tr > *:nth-of-type(' + columnIndex + '):not(.colspan-cell)',
		];
		var selectorsStr = selectors.join(', ');
		$(selectorsStr).toggleClass('column-show-hide-hidden');
	});
	
	$content.find('.column-show-hide-show-all').off('click');
	$content.find('.column-show-hide-show-all').click(function() {
		$(this).closest('.column-show-hide').find('.column-show-hide-toggler').prop("checked", true);
		var tableIndex = $(this).closest('.column-show-hide').attr('data-table-index');
		var selectors = [
			'table.column-show-hide-' + tableIndex + ' > * > tr > *:not(.colspan-cell)',
			'table.column-show-hide-' + tableIndex + ' > tr > *:not(.colspan-cell)',
		];
		var selectorsStr = selectors.join(', ');
		$(selectorsStr).removeClass('column-show-hide-hidden');
	});
	// End show-hide stuff
	
	// LAZY STUFF
	
	function processAllLazyTogglers(toggleClass) {
		if (window.lazySectionsAlreadyStarted[toggleClass]) return $.Deferred().resolve();
		window.lazySectionsAlreadyStarted[toggleClass] = true;
		var elList = [];
		$('.optionfromlist-toggler-lazy.' + toggleClass).each(function() {
			elList.push(this);
		});
		return processEachLazyToggler(elList);
	}
	
	function processEachLazyToggler(elList) {
		if (elList.length == 0) {
			return $.Deferred().resolve();
		}
		var $thisEl = $(elList.pop());
		return processOneLazyToggler($thisEl)
		.then(function() {
			return processEachLazyToggler(elList);
		});
	}
	
	function processOneLazyToggler($thisEl) {
		var $contentParent = $(getParentFromToggler($thisEl));
		if (window.lazyContentAlreadyLoaded[$contentParent.attr('id')]) {
			switchToNonLazy($thisEl);
			return $.Deferred().resolve();
		}
		var toParse = $thisEl.attr('data-templatecode');
		if (!toParse) {
			toParse = $contentParent.attr('data-templatecode');
		}
		console.log(toParse);
		return parseHTML(toParse)
		.then(function(html) {
			window.lazyContentAlreadyLoaded[$contentParent.attr('id')] = true;
			return addHTMLToSection(html, $thisEl);
		});
	}
	
	function getParentFromToggler($thisEl) {
		return document.getElementById($thisEl.attr('data-replaceid'));
	}
	
	function parseHTML(str) {
		var a = new mw.Api();
		return a.get({
			action: 'parse',
			title: 'Main Page',
			text: '!!!!!!!!{{' + str + '}}!!!!!!!!',
			prop: 'text'
		}).then(function(data) {
			var text = data.parse.text['*'];
			var tbl = text.split('!!!!!!!!');
			return tbl[1];
		});
	}
	
	function addHTMLToSection(html, $thisEl) {
		var el = getParentFromToggler($thisEl);
		$(el).html(html);
		mw.hook('wikipage.content').fire($(el));
		switchToNonLazy($thisEl);
		return $.Deferred().resolve();
	}
	
	function switchToNonLazy($thisEl) {
		$thisEl.removeClass('optionfromlist-toggler-lazy');
		$thisEl.addClass('optionfromlist-toggler');
		$thisEl.off('click');
		$thisEl.click(oflRun);
	}
	
	$content.find('.optionfromlist-toggler-lazy').each(function() {
		$(this).click(function() {
			if (typeof lazyContentAlreadyLoaded === 'undefined') window.lazyContentAlreadyLoaded = {};
			if (typeof lazySectionsAlreadyStarted === 'undefined') window.lazySectionsAlreadyStarted = {};
			if($(this).hasClass('active')) return;
			return processOneLazyToggler($(this))
			.then(oflRun.bind(this))
			.then(processAllLazyTogglers($(this).attr('data-toggle-section')));
		});
	});
	
	// Popups
	
	// How to use:
	// Create toggles using Module:ToggleUtil
	// Define a unique class on the wrapper element and assign a width larger than the largest expected internal width
	// Then the wrapper's width will shrink to match the inner content's outer width
	// This can be used to guarantee either a max-width on the inner content when inner is variable width
	// (such as in game recap sentences)
	// Or to guarantee a full width on the fixed-width inner content with an arbitrarily large outer width value
	// (such as in tournament-team history)
	
	$content.find('.popup-button-action').off('click');
	$content.find('.popup-button-action').click(window.popupButton);
	
	$content.find('.popup-button-lazy').off('click');
	$content.find('.popup-button-lazy').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $button = $(this);
		var button = this;
		var text = '{{' + $button.attr('data-parse-text') + '}}';
		new mw.Api().get({
			action : "parse",
			text : text,
			prop : "text",
			disablelimitreport: 1,
			disableeditsection: 1,
		}).then(function(data){
			var result = data.parse.text["*"];
			result = result.replace('\\"','"');
			var resultBody = $(result).html();
			$button.find('.popup-content-inner-action').html(resultBody);
			$button.off('click');
			$button.click(window.popupButton);
			mw.hook('wikipage.content').fire($button);
			return $.Deferred().resolve();
		}).then(function() {
			return window.popupButton.bind(button)(e);
		});
	});
	
});
})(window.jQuery, window.mediaWiki);
// </nowiki>