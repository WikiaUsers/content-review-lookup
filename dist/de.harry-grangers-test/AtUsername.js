users = []; 
$('.edited-by a:not(.subtle)').each(function(i,el) {
	name = $(this).text();
	users.push({nickname: name, el:el});
	$.getJSON('/api.php?action=query&list=users&ususers=' + name + '&format=json',function(res) {
		id = res.query.users[0].userid;
		_.where(users,{nickname: res.query.users[0].name}).forEach(function(u) {
			u.id = id;
		});
		$.get('https://services.wikia.com/user-attribute/user/' + id + '/attr/name', function(attr) {
			userItems = _.where(users,{id: id})
			userItems.forEach(function(u) {
                		u.name = attr.value;
				
                		if(!$(u.el).siblings('.user_nickname').length) {
                    			$(u.el).text(u.name).after(
                        			'&emsp;',
                        			$('<span />',{class: 'user_nickname'}).css({color:'grey', 'font-weight':'normal'}).text('@' + u.nickname);
                    			);
                		}
			});
		});
	});
});