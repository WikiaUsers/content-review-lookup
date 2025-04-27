'use strict';
mw.loader.using(['mediawiki.api'], () => {
	if (!$('#archivist-table').length){
		return;
	}
	
	const api = new mw.Api();
	const now = Date.now();
	const validRoles = [
		'bot',
		'bureaucrat',
		'sysop',
		'content-moderator',
		'threadmoderator',
		'rollback',
		'quick-answers-editor',
		'user',
	];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	
	$('#archivist-table tr:not(:first-child)').each((index, row) => editDate(row, 'newer', '4'));
	
	function editDate(row, dir, i, first, last){
		api.get({
			action: 'query',
			list: 'usercontribs',
			uclimit: '1',
			ucprop: 'ids|timestamp',
			ucnamespace: '0',
			ucuser: $(row).find('td:first-child a').attr('title'),
			ucdir: dir,
		}).done((userData) => {
			const diffURL = mw.util.getUrl('Special:Diff/' + userData.query.usercontribs[0].revid);
			const timestamp = userData.query.usercontribs[0].timestamp;
			$(row).find('td:nth-child(' + i + ')').html(
				$('<a href="' + diffURL + '">').html(
					timestamp.split('T')[1].split(/:\d\dZ/)[0] + ', ' +
					new Date(timestamp).getUTCDate() + ' ' +
					months[new Date(timestamp).getUTCMonth()] + ' ' +
					new Date(timestamp).getUTCFullYear()
				)
			).data('sort-value', new Date(timestamp).getTime());
			
			if (dir === 'newer'){
				editDate(row, 'older', '5', new Date(timestamp).getTime());
			} else {
				userInfo(row, first, new Date(timestamp).getTime());
			}
		});
	}
	
	function userInfo(row, first, last){
		api.get({
			action: 'query',
			list: 'users',
			usprop: 'editcount|groups',
			ususers: $(row).find('td:first-child a').attr('title'),
		}).done((userData) => {
			const editCount = userData.query.users[0].editcount;
			const editActivityUntouched = (editCount * (last - first + 1)) / (now - last + 1);
			const editActivity = Math.round(Math.log(editActivityUntouched * Math.pow(10, 11) + 1) * 10) / 10;
			const roles = validRoles.filter((role) => userData.query.users[0].groups.indexOf(role) !== -1);
			const rolesString = roles
				.join(', ')
				.replace('sysop', 'admin')
				.replace('content-moderator', 'content moderator')
				.replace('threadmoderator', 'thread moderator')
				.replace('quick-answers-editor', 'quick answers editor')
				.replace('user', 'archivist');
			
			$(row).find('td:nth-child(6)').html(editActivity);
			$(row).find('td:nth-child(7)').html(rolesString);
			$(row).find('td:nth-child(8)').html(editCount);
		});
	}
});