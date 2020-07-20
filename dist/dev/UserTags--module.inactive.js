//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint bitwise:false */
/*global mediaWiki UserTagsJS */

//
// MODULE: Inactive
// Adds users to the inactive group if they haven't edited recently
//
UserTagsJS.extensions.inactive = (function($, mw, Date) {
	"use strict";
	return {
		start: function(config, username, logger/*, lang*/) {
			this._logger = logger;

			// Legacy support: we used to accept a raw number here
			if (typeof(config) === 'number') {
				config = { days: config };
			}
			// Canonicalise: Namespaces may be names, days might not be a number
			this._days = (config.days | 0 ? config.days : 30) | 0;
			if (this._days < 1) {
				logger.err('Negative days:', this._days);
				return;
			}
			this._includeZero = !!config.zeroIsInactive;
			var namespaces = config.namespaces;
			if ($.isArray(namespaces)) {
				// Canonicalise: non numbers get converted to numbers
				var ids = mw.config.get('wgNamespaceIds'), id;
				for (var i = 0, len = namespaces.length ; i < len ; ++i) {
					if (typeof(namespaces[i]) === 'number') {
						continue;
					}

					id = ids[(namespaces[i] + '').replace(/ /g, '_').toLowerCase()];
					if (typeof(id) === 'number') {
						namespaces[i] = id;
					} else {
						logger.wrn('Invalid namespace:', namespaces[i]);
						namespaces.splice(i, 1);
						--i, --len; // Since we just lost the index
					}
				}
			} else {
				namespaces = null;
			}

			// Problem configuration. If there's a namespace then we have to do
			// this as a general query. There's no major problem with this as
			// handling in generate() is identical but we can't use special
			// requests for AJAX merging.
			if (namespaces && namespaces.length) {
				return {
					ajax: {
						list: 'usercontribs',
						ucuser: username,
						uclimit: 1,
						ucprop: 'timestamp',
						ucnamespace: namespaces.join('|')
					}
				};
			}

			// Default configuration
			return {
				ajax: {
					type: 'contributions',
					limit: 1,
					dir: 'older',
					prop: ['timestamp']
				}
			};
		},
		generate: function(json) {
			json = json.query.usercontribs[0]; // Only 1 contribution was requested
			if (!json || !json.timestamp) { // No contributions
				return this._includeZero && ['inactive'];
			}

			// Decode ISO8601 date
			var when = Date.parseISO8601(json.timestamp);
			if (!when) { // Shouldn't happen, ever
				this._logger.err('Unparsable ISO8601 Strict Timestamp:', json.timestamp);
				return; // Fail
			}
			// Figure out the window of time the user must have made at least 1
			// contribution during.
			var lim = new Date();
			lim = +lim + lim.getTimezoneOffset() * 6e4; // To UTC
			lim -= this._days * 864e5;

			// Has the user been inactive for beyond the limit?
			return +when < lim && ['inactive'];
		}
	};
})(jQuery, mediaWiki, Date);

//</syntaxhighlight>