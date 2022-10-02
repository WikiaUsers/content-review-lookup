$(function () {
	'use strict';

	// only run when editing
	if (mw.user.options.get('showtoolbar') &&
		mw.user.options.get('usebetatoolbar') &&
		$.inArray(mw.config.get('wgAction'), ['edit', 'submit']) > -1) {

		// wait on the API library
		$.when(mw.loader.using('mediawiki.api'), $.ready).then(function () {
			// fetch the username and timestamp of the last revision
			new mw.Api().get({
				action: 'query',
				titles: mw.config.get('wgPageName'),
				prop: 'revisions',
				rvprop: 'user|timestamp',
				formatversion: 2
			}).done(function (data) {
				var page = data.query.pages[0];
				// if the revision is missing, skip
				if (page.missing) {
					return;
				}

				// fetch data from the revision
				var revision = page.revisions[0];
				var user = revision.user;
				var date = new Date(revision.timestamp);

				// on the odd chance it fails to parse the date, skip date
				var insert;
				if (isNaN(date.getTime())) {
					insert = '{{subst:' + 'Unsigned|' + user + '}}';
				} else {
					// wish there was an easier way to do this, I miss moment.js
					// made some localization here
					var timestamp = date.toLocaleDateString('zh', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
						+ ' ('
						+ new Intl.DateTimeFormat('zh', { weekday: 'narrow', timeZone: 'UTC' }).format(date)
						+ ') '
						+ date.toLocaleTimeString('zh', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' });
					insert = '{{subst:' + 'Unsigned|' + user + '|' + timestamp + '}}';
				}

				// add the editor button
				$.when(mw.loader.using('ext.wikiEditor'), $.ready).then(function () {
					$('#wpTextbox1').wikiEditor('addToToolbar', {
						section: 'advanced',
						group: 'insert',
						tools: {
							autosign: {
								label: wgULS('自动签名上一次留言', '自動簽名上一次留言'),
								type: 'button',
								icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Insert-signature.svg',
								action: { type: 'replace', options: { pre: insert } }
							}
						}
					});
				});
			});
		});
	}
});