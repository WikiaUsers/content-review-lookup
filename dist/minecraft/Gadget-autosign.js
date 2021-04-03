// pads a time to 2 digits
function padtime(time) {
	return (time + '').padStart(2, '0');
}

$(function() {
'use strict';

// only run when editing
if (mw.user.options.get('showtoolbar') &&
	mw.user.options.get('usebetatoolbar') &&
	$.inArray(mw.config.get('wgAction'), ['edit', 'submit']) > -1) {
		
	// wait on the API library
	$.when(mw.loader.using('mediawiki.api'), $.ready).then(function() {
		// fetch the username and timestamp of the last revision
		new mw.Api().get({
			action: 'query',
			titles: mw.config.get('wgPageName'),
			prop: 'revisions',
			rvprop: 'user|timestamp',
			formatversion: 2
		}).done(function(data) {
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
				insert = '{{subst:'+'unsigned|'+user+'}}';
			} else {
				// wish there was an easier way to do this, I miss moment.js
				var timestamp = padtime(date.getUTCHours())+':'+padtime(date.getUTCMinutes())+', '+date.getUTCDate()+' '+date.toLocaleDateString('en-us', {month:'long', timeZone:'UTC'})+' '+date.getUTCFullYear();
				insert = '{{subst:'+'unsigned|'+user+'|'+timestamp+'}}';
			}
			
			// add the editor button
			$.when(mw.loader.using('ext.wikiEditor'), $.ready).then(function() {
				$('#wpTextbox1').wikiEditor('addToToolbar', {
					section: 'advanced',
					group: 'insert',
					tools: {
						autosign: {
							label: 'Autosign previous comment',
							type: 'button',
							icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Insert-signature.svg',
							action: {type: 'replace', options: {pre: insert}}
						}
					}
				});
			});
		});
	});
}
});