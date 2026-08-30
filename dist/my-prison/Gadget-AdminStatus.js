/*
 * Checks whether admins are active and updates 
 * .user-status[data-user="Name"] and .last-edit[data-user="Name"]
 * elements on the page.
 */
(function ($, mw) {
	'use strict';

	const PAGE = 'My_Prison_Wiki:Staff';
	if (mw.config.get('wgPageName') !== PAGE) {
		console.warn(`[AdminStatus] The title of the current page (${mw.config.get('wgPageName')}) does not match the expected page (${PAGE}); script interrupted.`);
		return;
	}

	if (mw.config.get('wgAction') !== 'view') return;

	const DAYS_LIMIT = 55;
	const api = new mw.Api();

	function cutoffDate() {
		const d = new Date();
		d.setDate(d.getDate() - DAYS_LIMIT);
		return d;
	}

	// Latest edit by the user (or null)
	function lastEdit(user) {
		return api.get({
			action: 'query',
			list: 'usercontribs',
			ucuser: user,
			uclimit: 1,
			ucprop: 'timestamp'
		}).then(function (data) {
			const contribs = data.query && data.query.usercontribs;
			return (contribs && contribs.length) ? new Date(contribs[0].timestamp) : null;
		});
	}

	// Latest log action by the user: blocks, deletions, protections, rights changes, etc
	function lastLogAction(user) {
		return api.get({
			action: 'query',
			list: 'logevents',
			leprop: 'timestamp',
			leuser: user,
			lelimit: 1
		}).then(function (data) {
			const events = data.query && data.query.logevents;
			return (events && events.length) ? new Date(events[0].timestamp) : null;
		});
	}

	function formatDate(date) {
		if (!date) return 'Never';
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	}

	// Group elements by username
	const statusElsByUser = {};
	const lastEditElsByUser = {};

	$('.user-status').each(function () {
		const $el = $(this);
		const user = $el.data('user');
		if (!user) return;

		$el.addClass('status-loading').text('Loading...');

		if (!statusElsByUser[user]) statusElsByUser[user] = [];
		statusElsByUser[user].push($el);
	});

	$('.last-edit').each(function () {
		const $el = $(this);
		const user = $el.data('user');
		if (!user) return;

		$el.addClass('status-loading').text('Loading...');

		if (!lastEditElsByUser[user]) lastEditElsByUser[user] = [];
		lastEditElsByUser[user].push($el);
	});

	const allUsers = Array.from(new Set(
		Object.keys(statusElsByUser).concat(Object.keys(lastEditElsByUser))
	));

	allUsers.forEach(function (user) {
		const $statusEls = statusElsByUser[user] || [];
		const $lastEditEls = lastEditElsByUser[user] || [];

		$.when(lastEdit(user), lastLogAction(user)).done(function (edit, log) {
			const dates = [edit, log].filter(Boolean);
			const mostRecent = dates.length ? new Date(Math.max.apply(null, dates)) : null;
			const isActive = mostRecent ? mostRecent > cutoffDate() : false;

			$statusEls.forEach(function ($el) {
				$el.removeClass('status-loading')
					.addClass(isActive ? 'status-active' : 'status-inactive')
					.text(isActive ? 'Active' : 'Inactive');
			});

			// The last-edit column reflects the edit date specifically (not log actions),
			// so admins who are "active" purely via log actions still show when they last edited.
			$lastEditEls.forEach(function ($el) {
				$el.removeClass('status-loading').text(formatDate(edit));
				if (edit) $el.attr('title', edit.toISOString());
			});
		}).fail(function () {
			$statusEls.forEach(function ($el) {
				$el.removeClass('status-loading')
					.addClass('status-error')
					.text('Error');
			});
			$lastEditEls.forEach(function ($el) {
				$el.removeClass('status-loading').text('Error');
			});
		});
	});

})(jQuery, mediaWiki);