$(function(){
	if (!$('#archivist-table').length){
		return;
	}
	
	var api = new mw.Api();
	var now = new Date().getTime();
	var startValue = 0;
	var blockedUsers = [];
	var validGroups = [
		'bot',
		'bot-global',
		'bureaucrat',
		'sysop',
		'content-moderator',
		'threadmoderator',
		'rollback',
		'quick-answers-editor',
		'user',
	];
	
	api.get({
		list: 'blocks',
		bklimit: 'max',
	}).done(function(blockInfo){
		blockInfo.query.blocks.forEach(function(blockEntry){
			blockedUsers.push(blockEntry.user);
		});
		fetchUsers(startValue);
	});
	
	function fetchUsers(start){
		api.get({
			action: 'listuserssearchuser',
			groups: 'autoconfirmed',
			contributed: '100',
			limit: '100',
			order: 'ts_edit',
			sort: 'desc',
			offset: String(start),
		}).done(function(result){
			var totalResults = result.listuserssearchuser.result_count;
			var availableResults = (totalResults > 100) ? 100 : totalResults;
			for (var i = 0; i < availableResults; i++){
				processUser(result.listuserssearchuser, i);
			}
		});
	}
	
	function processUser(listusers, i){
		var obj = listusers[i];
		console.log('Beginning check for ' + obj.username);
		var user = {
			username: obj.username,
			edits: {
				first: {},
				latest: {},
			},
			editcount: Number(obj.edit_count),
		};
		
		api.get({
			list: 'usercontribs',
			uclimit: '1',
			ucprop: 'ids|timestamp',
			ucnamespace: '0',
			ucuser: user.username,
			ucdir: 'older',
		}).done(function(contribs){
			if (!contribs.query.usercontribs.length){
				return;
			}
			
			user.edits.latest.date = new Date(contribs.query.usercontribs[0].timestamp);
			user.edits.latest.revid = Number(contribs.query.usercontribs[0].revid);
			
			if (now - user.edits.latest.date.getTime() > 86400000 * 365){
				return;
			}
			
			if (blockedUsers.indexOf(user.username) !== -1){
				return;
			}
			
			var groups = validGroups.filter(function(group){
				return obj.groups.split(', ').indexOf(group) !== -1;
			});
			
			if (groups.indexOf('bot') !== -1 || groups.indexOf('bot-global') !== -1){
				return;
			}
			
			api.get({
				list: 'usercontribs',
				uclimit: '1',
				ucprop: 'ids|timestamp',
				ucnamespace: '0',
				ucuser: user.username,
				ucdir: 'newer',
			}).done(function(contribs){
				if (!contribs.query.usercontribs.length){
					return;
				}
				
				user.edits.first.date = new Date(contribs.query.usercontribs[0].timestamp);
				user.edits.first.revid = Number(contribs.query.usercontribs[0].revid);
				user.groups = groups;
				addRow(user, listusers, i);
			});
		});
	}
	
	function addRow(obj, listusers, i){
		console.log(obj);
		var row = $('<tr>');
		var placeholder = $('#archivist-table--placeholder');
		var groupsString = obj.groups
			.join(', ')
			.replace('sysop', 'admin')
			.replace('content-moderator', 'content moderator')
			.replace('threadmoderator', 'thread moderator')
			.replace('quick-answers-editor', 'quick answers editor')
			.replace('user', 'archivist');
		
		var firstEditDate = obj.edits.first.date;
		var latestEditDate = obj.edits.latest.date;
		var firstEditTime = firstEditDate.getTime();
		var latestEditTime = latestEditDate.getTime();
		
		var numerator = obj.editcount * (latestEditTime - firstEditTime + 1);
		var denominator = now - latestEditTime + 1;
		var unrounded = Math.log((numerator / (denominator + Math.pow(10, 6))) + 1) * 2;
		var rounded = Math.round(unrounded * 10) / 10;
		
		var firstEditTarget = 'Special:Diff/' + obj.edits.first.revid;
		var latestEditTarget = 'Special:Diff/' + obj.edits.latest.revid;
		var firstEditDisplay = [
			String(firstEditDate.getFullYear()),
			String(firstEditDate.getMonth() + 1).padStart(2, '0'),
			String(firstEditDate.getDate()).padStart(2, '0')
		];
		var latestEditDisplay = [
			String(latestEditDate.getFullYear()),
			String(latestEditDate.getMonth() + 1).padStart(2, '0'),
			String(latestEditDate.getDate()).padStart(2, '0')
		];
		
		row.append($('<td>').html(link('User:' + obj.username, obj.username)));
		row.append($('<td>').html(link(firstEditTarget, firstEditDisplay.join('-'))).data('sort-value', firstEditTime));
		row.append($('<td>').html(link(latestEditTarget, latestEditDisplay.join('-'))).data('sort-value', latestEditTime));
		row.append($('<td>').html(groupsString));
		row.append($('<td>').html(obj.editcount));
		row.append($('<td>').html(rounded).data('sort-value', unrounded));
		$('#archivist-table tbody tr:last-child').after(row);
		
		if (placeholder.length){
			placeholder.remove();
		}
		
		if (i === 99){
			startValue = startValue + 100;
			fetchUsers(startValue);
		}
	}
	
	function link(target, display){
		return $('<a>').attr('href', mw.util.getUrl(target)).attr('title', target).html(display ? display : target);
	}
});