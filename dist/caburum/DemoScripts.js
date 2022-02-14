// See [[w:c:dev:MediaWiki:DemoScripts.js]] for the original script
// See [[MediaWiki:Custom-DemoScripts.json]] for the restricted config

/* jshint curly:false, jquery:true, browser:true */
/* global mediaWiki:true, importArticles:true, importArticle:true, dev:true */

;(function ($, mw, cfg) {
	'use strict';

	var urlVars = new URLSearchParams(location.search);
	// killswitch & dblrun protection
	if (urlVars.get('nodemo') || cfg.loaded) return;
	cfg.loaded = true;

	var includes = {
		/**
		 * a-z ordered
		 * 
		 * possible fields:
		 *
		 * - selector: element(s) to look for in the page
		 * - page: name of the page
		 * - subpages: exclude subpages when set to false (defaults to true)
		 * - exec: callback to execute when selector or page are detected
		 * - styles: stylesheet(s) to load when selector or page are detected
		 * - scripts: script(s) to load when selector or page are detected
		 *
		 */
	};

	function merge (other) {
		/*jshint validthis:true*/
		var self = this;

		if (Array.isArray(other)) {
			other.forEach(function (elem) {
				if (self.indexOf(elem) === -1) {
					self.push(elem);
				}
			});
		} else {
			self.push(other);
		}
	}

	$.get(mw.util.wikiScript('api'), {
		action: 'query',
		format: 'json',
		titles: 'MediaWiki:Custom-DemoScripts.json',
		prop: 'revisions',
		rvprop: 'content',
		rvslots: 'main',
		indexpageids: 1
	}).always(function(data) {
		if (typeof data === 'object') {
			data = JSON.parse(data.query.pages[data.query.pageids[0]].revisions[0].slots.main['*']);
			$.each(data, function() {
				this.restricted = 1;
			});
			// keep includes on top and preserve it from overwriting by data
			includes = $.extend(true, {}, includes, data, includes);
		}
		$(function () {
			var scripts = [],
				styles = [],
				page = mw.config.get('wgPageName'),
				basepage = page.replace(/\/.*/, '');

			scripts.merge = merge;
			styles.merge = merge;

			$.each(includes, function (name, actions) {
				if (actions.restricted) {
					actions.selector = '#mw-content-text ' + (actions.selector || '').split(',')[0];
					if (actions.scripts) {
						if (actions.scripts instanceof Array) {
							actions.disabled = actions.disabled || !actions.scripts.every(function(v) {
								return !/\|/.test(v);
							});
						} else {
							actions.disabled = actions.disabled || /\|/.test(actions.scripts);
						}
					}
				}

				if (actions.disabled) {
					return;
				}

				if (actions.selector && !$(actions.selector).length) {
					return;
				}

				if (actions.page && (actions.subpages === false ? page : basepage) !== actions.page) {
					return;
				}

				if (actions.exec && !actions.restricted) {
					actions.exec();
				}

				if (actions.styles) {
					styles.merge(actions.styles);
				}

				if (actions.scripts) {
					scripts.merge(actions.scripts);
				}
			});

			if (scripts.length) {
				importArticles({ type: 'script', articles: scripts });
			}
			if (styles.length) {
				importArticles({ type: 'style', articles: styles });
			}
		});
	});
}(jQuery, mediaWiki, (window.dev = window.dev || {}).demoscripts = window.dev.demoscripts || {}));