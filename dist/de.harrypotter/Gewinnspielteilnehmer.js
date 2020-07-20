function getEditcount(callback) {
	if(wgNamespaceIds.user == wgNamespaceNumber) {
        url = '/api.php?' + $.param({
            action: 'query',
            list: 'users',
            ususers: wgTitle,
            usprop: 'editcount',
            format: 'json'
        });
        $.get(url,function(res)  {
            user = res.query.users[0];
            callback(!user.hasOwnProperty('missing') ? user.editcount : false);
        });
    }
}

getEditcount(function(edits) {
	if(edits !== false) {
		if(edits == 1) {
			url = '/api.php?' + $.param({
				action: 'query',
				list: 'usercontribs',
				ucuser: wgTitle,
				uclimit: 1,
				ucprops: 'title',
				format: 'json'
            });

			$.get(url,function(res) {
				page = res.query.usercontribs[0].title;
				url = '/api.php?' + $.param({
					action: 'parse',
					text: '{{BASEPAGENAME}}',
					title: page,
					format: 'json',
					disablepp: true
                });
				$.get(url,function(res) {
					console.log(res.parse.text['*']);
                });
            });
        }
    }
});