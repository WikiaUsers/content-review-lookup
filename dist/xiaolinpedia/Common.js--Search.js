// <nowiki>
// https://svn.wikia-code.com/wikia/trunk/skins/oasis/js/Search.js
// Revision 58219 (without data trackers)
// deferRequestBy value shrunk from 2000 to 200.

var WikiaSearchApp = {
	searchForm: false,
	searchField: false,
	ads: false,

	init : function() {
		this.searchForm = $('#WikiaSearch');
		this.searchFormBottom = $('#search');
		this.searchField = this.searchForm.children('input[placeholder]');

		// RT #141437 - hide HOME_TOP_RIGHT_BOXAD when showing search suggestions
		this.ads = $("[id$='TOP_RIGHT_BOXAD']");

		if(!this.searchForm.hasClass('noautocomplete')) {
			this.searchField.bind({
				'suggestShow': $.proxy(this.hideAds, this),
				'suggestHide': $.proxy(this.showAds, this)
			});

			// load autosuggest code on first focus
			this.searchField.one('focus', $.proxy(this.initSuggest, this));
		}
	},

	hideAds: function() {
		this.ads.each(function() {
			$(this).children().css('margin-left', '-9999px');
		});
	},

	showAds: function() {
		this.ads.each(function() {
			$(this).children().css('margin-left', 'auto');
		});
	},

	// download necessary dependencies (AutoComplete plugin) and initialize search suggest feature for #search_field
	initSuggest: function() {
		$.when(
			$.loadJQueryAutocomplete()
		).then($.proxy(function() {
			this.searchField.autocomplete({
				serviceUrl: wgServer + wgScript + '?action=ajax&rs=getLinkSuggest&format=json',
				onSelect: $.proxy(function(value, data) {
					var valueEncoded = encodeURIComponent(value.replace(/ /g, '_'));
					// slashes can't be urlencoded because they break routing
					window.location.href = wgArticlePath.
						replace(/\$1/, valueEncoded).
						replace(encodeURIComponent('/'), '/');
				}, this),
				appendTo: '#WikiaSearch',
				deferRequestBy: 250,
				minLength: 3,
				maxHeight: 1000,
				selectedClass: 'selected',
				width: '270px',
				skipBadQueries: true
			});
		}, this));
	}
};

$(function() {
	WikiaSearchApp.init();
});