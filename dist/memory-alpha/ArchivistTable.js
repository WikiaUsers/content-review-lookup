$(function(){
	if (!$('#archivist-table').length){
		return;
	}
	
	var api = new mw.Api();
	var now = new Date().getTime();
	var diffURL;
	var timestamp;
	var editCount;
	var editActivityUntouched;
	var editActivity;
	var roles;
	var rolesString;
	var validRoles = [
		'bot',
		'bureaucrat',
		'sysop',
		'content-moderator',
		'threadmoderator',
		'rollback',
		'quick-answers-editor',
		'user',
	];
	var months = [
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
	
	$('#archivist-table tr:not(:first-child)').each(function(){
		editDate(this, 'newer', '4');
	});
	
	function editDate(row, dir, i, first, last){
		api.get({
			action: 'query',
			list: 'usercontribs',
			uclimit: '1',
			ucprop: 'ids|timestamp',
			ucnamespace: '0',
			ucuser: $(row).find('td:first-child a').attr('title'),
			ucdir: dir,
		}).done(function(userData){
			diffURL = mw.util.getUrl('Special:Diff/' + userData.query.usercontribs[0].revid);
			timestamp = userData.query.usercontribs[0].timestamp;
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
		}).done(function(userData){
			editCount = userData.query.users[0].editcount;
			editActivityUntouched = (editCount * (last - first + 1)) / (now - last + 1);
			editActivity = Math.round(Math.log(editActivityUntouched * Math.pow(10, 11) + 1) * 10) / 10;
			$(row).find('td:nth-child(6)').html(editActivity);
			roles = validRoles.filter(function(role){
				return userData.query.users[0].groups.indexOf(role) !== -1;
			});
			rolesString = roles
				.join(', ')
				.replace('sysop', 'admin')
				.replace('content-moderator', 'content moderator')
				.replace('threadmoderator', 'thread moderator')
				.replace('quick-answers-editor', 'quick answers editor')
				.replace('user', 'archivist');
			$(row).find('td:nth-child(7)').html(rolesString);
			$(row).find('td:nth-child(8)').html(editCount);
		});
	}
});