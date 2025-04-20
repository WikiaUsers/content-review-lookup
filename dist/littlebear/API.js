mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	
	// For [[Template:Administration]]
	const adminGroups = ['bot', 'rollback', 'threadmoderator', 'content-moderator', 'sysop'];
	
	api.get({
		action: 'listuserssearchuser',
		groups: adminGroups.join(','),
		contributed: '1',
		limit: '100',
		order: 'ts_edit',
		sort: 'desc',
		offset: '0',
	}).done(userList => {
		const now = new Date().getTime();
		let status = 'Active';
		
		for (let i = 0; i < userList.listuserssearchuser.result_count; i++){
			const username = userList.listuserssearchuser[i].username;
			const allGroups = userList.listuserssearchuser[i].groups.split(', ');
			const roles = adminGroups.filter(role => allGroups.indexOf(role) !== -1);
			const numberOfEdits = userList.listuserssearchuser[i].edit_count;
			const lastEdit = userList.listuserssearchuser[i].last_edit_date;
			const lastEditComp = lastEdit.split(/,* /);
			const lastEditString = `${lastEditComp[1]} ${lastEditComp[2]} ${lastEditComp[3]} ${lastEditComp[0]} UTC`;
			const lastEditDate = new Date(lastEditString).getTime();
			
			if (now - lastEditDate > 31556952000){
				status = 'Inactive';
			} else if (now - lastEditDate > 2629746000){
				status = 'Semi-active';
			}
			
			const row = $('<tr>')
				.append($('<td>').append(link(`User:${username}`, username)))
				.append($('<td>').text(roles.join(', ')))
				.append($('<td>').text(numberOfEdits))
				.append($('<td>').append(link(`Special:Contributions/${username}`, lastEdit)))
				.append($('<td>').attr('class', status.toLowerCase()).text(status));
			
			$('.administration').append(row);
		}
	});
});

function link(page, text = page){
	const newLink = $('<a>');
	newLink.attr('href', mw.util.getUrl(page));
	newLink.attr('title', page);
	newLink.html(text);
	return newLink.prop('outerHTML');
}