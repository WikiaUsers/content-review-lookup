//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true curly:false laxbreak:true smarttabs:true bitwise:false */
/*global mediaWiki UserTagsJS */

//
// MODULE: New Users
// Tags users who have not met a minimum threshold
//
// Editcount is broken (Sep-2012). It returns nonsense values.
// Using the Special:Editcount page is more flexible (namespace filtering) and accurate.
// Unfortunately, the AJAX is manual since Sledge can't handle non-queries.
// NOTE: Parse produces *localised* HTML so you get stuff like "<p>1,000\n</p>"
//
// By user request: We accept a custom computation function for this so that they can do
// stuff like "edits < 30 || days < 14 || (days < 7 && edits < 10)". Also transitively
// enables AND instead of just OR.
//
UserTagsJS.extensions.newuser = (function($, mw, Date) {
	"use strict";
	return {
		start: function(config, username, logger/*, lang*/) {
			// Anonymous users don't work with Special:Editcount, it returns blank
			if (mw.util.isIPv4Address(username) || mw.util.isIPv6Address(username)) return;

			// 4 days matches Wikia's config for autoconfirmed
			// https://github.com/Wikia/app/blob/dev/includes/wikia/VariablesBase.php#L604-L620
			config = $.extend({ days: 4 }, config);

			// Convert to a computation function if there isn't one
			if (typeof(config.computation) !== 'function') {
				var minEdits = config.edits | 0;
				var minDays = config.days | 0;
				// Sanity. Give up if both days and edits are zero.
				if (minEdits < 1 && minDays < 1) return;

				config.computation = function(days, edits) {
					return days < minDays || edits < minEdits;
				};
			}
			this._logger = logger;

			// Our promises for the async data we need to do this calculation
			var daysPromise = this._daysPromise = $.Deferred(),
			    editsPromise = this._editsPromise = $.Deferred();

			// Sanity, convert namespace string to number.
			var namespace = config.namespace;
			if (namespace && typeof(namespace) !== 'number') {
				namespace = mw.config.get('wgNamespaceIds')[namespace];
				if (typeof(namespace) !== 'number') {
					logger.err('Invalid namespace:', config.namespace);
					namespace = null;
				}
			}

			// Performance optimising the common case.
			// In Oasis, with no namespace configuration, we can just scrape the DOM contributions
			// counter instead of AJAXing which is WAY faster (especially since we're manually
			// AJAXing instead of using Sledge)
			if ((typeof(namespace) === 'number' && namespace === namespace) // n === n is false for NaN
			 || ({oasis:1, wikia:1})[mw.config.get('skin')] !== 1
			   ) {
				this._doCustomAjax(username, namespace);
			} else {
				$($.proxy(this._onDomReady, this, username));
			}

			// Start the core AJAX if needed and return the promise to delay further
			// processing until we're ready.
			return {
				ajax: {
					type: 'contributions',
					limit: 1,
					dir: 'newer',
					prop: ['timestamp']
				},
				promise: $.when(daysPromise, editsPromise).then(function(a, b) {
					try {
						return config.computation(a, b) && ['newuser'];
					} catch(e) {
						logger.err('Custom Computation function exploded!', e, e.stack);
						return $.Deferred().reject();
					}
				})
			};
		},
		_onDomReady: function(username, $) {
			if ($('#userProfileApp .user-identity-stats > li > a > strong').length) {
				var number = Number($('#userProfileApp .user-identity-stats > li:first-child > a > strong').text()) + Number($('#userProfileApp .user-identity-stats > li:last-child > a > strong').text());
				if (!isNaN(number)) {
					return this._editsPromise.resolve(+number);
				}
				// WTF?
				this._logger.err('Oasis masthead gave us junk instead of a number! Falling back to AJAX');
			} else {
				// Er... crap
				this._logger.err('Cannot find Oasis masthead to scrape counter! Falling back to AJAX');
			}
			return this._doCustomAjax(username, null);
		},
		_doCustomAjax: function(username, namespace) {
			// Construct the wikitext fragment to invoke the Special:Editcount pseudo-template
			var text = '{{Special:Editcount/' + username;
			if (typeof(namespace) === 'number') {
				text += '/' + namespace;
			}
			text += '}}';

			// Issue our AJAX to run the parser.
			// I'm not using .then() as we need to wait for the generate() callback before
			// we can actually issue a response.
			var editsPromise = this._editsPromise, logger = this._logger;
			this._selfajax = $.ajax({
				url: mw.util.wikiScript('api'),
				data: {
					action: 'parse',
					format: 'json',
					uselang: 'en', // Force English so we don't have to deal with non-English digit chars
					text: text,
					prop: 'text',
					disablepp: 1 // Disable the preprocessor report (HTML comment at end)
				},
				dataType: 'json'
			})
			.done(function(json) {
				if (json && json.parse && json.parse.text) {
					var num = $(document.createElement('div')).html(json.parse.text['*']).text().replace(/[^\d]/g, '');
					if (num) {
						editsPromise.resolve(+num);
						return;
					}
				}
				logger.err('Got a bad response from Special:Editcount:', json);
				editsPromise.reject();
			})
			.fail(function(xhr, status, exception) {
				logger.err('AJAX fail:', xhr.status, status, exception);
				editsPromise.reject();
			})
			;
		},
		generate: function(json) {
			json = json.query.usercontribs[0];
			if (!json) return this.generateFailed();
			// Calculate days since their oldest (i.e. first) edit was made
			this._daysPromise.resolve((Date.now() - Date.parseISO8601(json.timestamp)) / 864e5);
		},
		generateFailed: function() {
			if (this._selfajax) this._selfajax.abort();
			this._daysPromise.reject();
		}
	};
})(jQuery, mediaWiki, Date);

//</syntaxhighlight>