/**
 * Adds a button to [[Special:RecentChanges]] that marks as patrolled
 * the user pages created today by [[W:C:dev:AutoCreateUserPages]].
 * 
 * Requires the "patrol" right.
 */
(function() {
	'use strict';

	// ===== Configuration =====
	// Edit summary used by AutoCreateUserPages (its "summary" config option).
	var SUMMARY = "Automatically creating this user's page";
	// Namespace to search in (2 = User).
	var NAMESPACE = 2;
	var BUTTON_ID = 'PatrolAutoCreatedUserPages-button';

	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Recentchanges' || window.PatrolAutoCreatedUserPagesLoaded) {
		return;
	}
	window.PatrolAutoCreatedUserPagesLoaded = true;

	var api;
	var $button;
	var busy = false;

	function getStartOfToday() {
		var now = new Date();
		return new Date(Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate()
		)).toISOString().replace(/\.\d+Z$/, 'Z');
	}

	function fetchCandidates() {
		var candidates = [];
		var params = {
			action: 'query',
			list: 'recentchanges',
			rctype: 'new',
			rcnamespace: NAMESPACE,
			rcshow: '!patrolled',
			rcprop: 'title|user|comment|ids',
			rcdir: 'newer',
			rcstart: getStartOfToday(),
			rclimit: 'max',
			formatversion: 2
		};
		function step(continueParams) {
			return api.get($.extend({}, params, continueParams)).then(function(data) {
				candidates = candidates.concat(data.query.recentchanges);
				if (data.continue) {
					return step(data.continue);
				}
				return candidates;
			});
		}
		return step({continue: ''});
	}

	function isAutoCreated(rc) {
		return Boolean(rc.user) &&
			rc.comment === SUMMARY &&
			rc.title.replace(/^[^:]+:/, '') === rc.user;
	}

	function patrolAll(rcs) {
		var result = {patrolled: 0, failed: 0};
		var chain = $.Deferred().resolve().promise();
		rcs.forEach(function(rc) {
			chain = chain.then(function() {
				return api.postWithToken('patrol', {
					action: 'patrol',
					rcid: rc.rcid
				}).then(function() {
					++result.patrolled;
				}, function(code) {
					++result.failed;
					console.warn(
						'[PatrolAutoCreatedUserPages] Could not patrol',
						rc.title, '-', code
					);
					return $.Deferred().resolve().promise();
				});
			});
		});
		return chain.then(function() {
			return result;
		});
	}

	function resetButton() {
		busy = false;
		$button
			.prop('disabled', false)
			.text('Patrol auto-created user pages');
	}

	function onClick() {
		if (busy) {
			return;
		}
		busy = true;
		$button.prop('disabled', true).text('Searching…');
		fetchCandidates().then(function(rcs) {
			var matches = rcs.filter(isAutoCreated);
			if (!matches.length) {
				mw.notify(
					'No unpatrolled auto-created user pages found for today (UTC).',
					{type: 'info'}
				);
				return;
			}
			$button.text('Patrolling ' + matches.length + ' page(s)…');
			return patrolAll(matches).then(function(result) {
				var msg = 'Marked ' + result.patrolled + ' page(s) as patrolled.';
				if (result.failed) {
					msg += ' ' + result.failed + ' failed (see the console).';
				}
				msg += ' Reload the page to update the list.';
				mw.notify(msg, {type: result.failed ? 'warn' : 'success'});
			});
		}).fail(function(code) {
			mw.notify(
				'An error occurred while patrolling user pages: ' + code,
				{type: 'error'}
			);
		}).always(resetButton);
	}

	function addButton() {
		if ($('#' + BUTTON_ID).length) {
			return;
		}
		$button = $('<button>', {
			id: BUTTON_ID,
			type: 'button',
			'class': 'wds-button',
			text: 'Patrol auto-created user pages'
		}).on('click', onClick);
		var $container = $('<div>', {css: {margin: '1em 0'}}).append($button);
		var $list = $('.mw-changeslist, .mw-changeslist-empty').first();
		if ($list.length) {
			$list.before($container);
		} else {
			$('#mw-content-text').prepend($container);
		}
	}

	mw.loader.using(['mediawiki.api', 'mediawiki.user']).then(function() {
		return mw.user.getRights();
	}).then(function(rights) {
		if (rights.indexOf('patrol') === -1) {
			return;
		}
		api = new mw.Api();
		$(addButton);
		mw.hook('wikipage.content').add(addButton);
	});
})();