'use strict';
mw.hook('wikipage.content').add(content => {
	const archivistTablePlaceholder = content.find('.archivist-table');
	if (!archivistTablePlaceholder.length){
		return;
	}

	const now = Date.now();
	const users = {};
	const tBody = $('<tbody>');
	const archivistTable = $('<table>').addClass(['grey', 'sortable']).append(
		$('<thead>').append($('<tr>').append(
			$('<th>').text('User'),
			$('<th>').text('Groups'),
			$('<th>').text('Edit count'),
			$('<th>').text('Last article edit')
		)),
		tBody
	);
	const api = new mw.Api({parameters: {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: mw.config.values.wgUserLanguage,
	}});
	const validGroups = [
		'bot',
		'bureaucrat',
		'sysop',
		'content-moderator',
		'threadmoderator',
		'rollback',
		'quick-answers-editor',
		'user',
	];

	recentChanges();
	function recentChanges(rccontinue){
		api.get({
			list: 'recentchanges',
			rcend: new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString(),
			rcnamespace: 0,
			rcprop: ['user', 'timestamp', 'ids'],
			rcshow: ['!anon', '!bot'],
			rclimit: 'max',
			rctype: 'edit',
			rccontinue: rccontinue,
		}).then(apiOutput => {
			for (const edit of apiOutput.query.recentchanges){
				if (Object.keys(users).length === 50){
					break;
				}
				if (Object.keys(users).indexOf(edit.user) === -1){
					users[edit.user] = {
						name: edit.user,
						revid: edit.revid,
						timestamp: edit.timestamp,
					};
				}
			}
			if (Object.keys(users).length < 50 && apiOutput.continue){
				recentChanges(apiOutput.continue.rccontinue);
			} else {
				api.get({
					list: 'users',
					usprop: ['blockinfo', 'groups', 'rights', 'editcount'],
					ususers: Object.keys(users),
				}).then(apiOutput => {
					for (const user of apiOutput.query.users){
						users[user.name].editcount = user.editcount;
						users[user.name].groups = user.groups;
						if (
							user.blockid ||
							user.rights.indexOf('bot') !== -1 ||
							user.groups.indexOf('autoconfirmed') === -1 ||
							user.groups.indexOf('emailconfirmed') === -1 ||
							user.editcount < 100
						){
							delete users[user.name];
						}
					}
					for (const user in users){
						addRow(users[user]);
					}
				});
			}
		});
	}

	function addRow(user){
		const row = $('<tr>');
		const groups = validGroups
			.filter(group => user.groups.indexOf(group) !== -1)
			.join(', ')
			.replace('sysop', 'admin')
			.replace('content-moderator', 'content moderator')
			.replace('threadmoderator', 'thread moderator')
			.replace('quick-answers-editor', 'quick answers editor')
			.replace('user', 'archivist');

		row.append($('<td>').html(link(`User:${user.name}`, user.name)));
		row.append($('<td>').html(link(`Special:Diff/${user.revid}`, user.timestamp)));
		row.append($('<td>').html(groups));
		row.append($('<td>').html(user.editcount));
		tBody.append(row);

		if (Object.keys(users).indexOf(user.name) === Object.keys(users).length - 1){
			archivistTablePlaceholder.html(archivistTable);
			mw.hook('wikipage.content').fire(archivistTablePlaceholder);
		}
	}

	function link(target, display = target){
		return $('<a>', {
			href: mw.util.getUrl(target),
			title: target,
			html: display,
		});
	}
});

// {{JavaScript category}}