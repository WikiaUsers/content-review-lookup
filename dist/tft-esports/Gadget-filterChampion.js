(function($, mw) {
	'use strict';
	function escapeCharacters(str) {
		return str.replace(/['\. ]/g, '').toLowerCase();
	}

	function applyFilter(selector, searchString) {
		$(selector).each(function(undefined, ele) {
			if (escapeCharacters(ele.dataset.display).indexOf(searchString) !== -1 || ! searchString || searchString === '') {
				ele.style.display = 'block';
			} else {
				ele.style.display = 'none';
			}
		});
	}

	mw.hook('wikipage.content').add(function($content) {
		var championFilter = $content.find('#champion-filter')[0];
		if (championFilter) {
			championFilter.outerHTML = '<input id="champion-filter"></input>';
			$content.find('#champion-filter')[0].addEventListener('input', function(e) {
				var val = escapeCharacters(e.target.value);
				applyFilter('.frontpage-champion-item', val);
			});
		}
		var itemFilter = $content.find('#item-filter')[0];
		if (itemFilter) {
			itemFilter.outerHTML = '<input id="item-filter"></input>';
			$content.find('#item-filter')[0].addEventListener('input', function(e) {
				var val = escapeCharacters(e.target.value);
				applyFilter('.frontpage-item-item', val);
			});
		}
	});
	
})(window.jQuery, window.mediaWiki);