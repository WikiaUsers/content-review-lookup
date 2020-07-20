function rollbackSpamUserContribs(username,reason) {
	Object.assign(arguments,{username: '', reason: ''});
    $.getJSON('/api.php?action=query&list=usercontribs&ucuser=' + username + '&uclimit=500&ucdir=newer&format=json', function(res) {
        res.query.usercontribs.forEach(function(contrib) {
			contribInfo = new mw.Title(contrib.title);
			if(contribInfo.namespace !== 6) {
                $.getJSON('/api.php?action=query&prop=revisions&rvtoken=rollback&titles=' + encodeURIComponent(contrib.title) + '&rvuser=' + contrib.user + '&rvprop=ids&indexpageids&format=json',function(rev) {
                    token = encodeURIComponent(rev.query.pages[rev.query.pageids[0]].revisions[0].rollbacktoken);
                    $.post('/api.php?action=rollback&title=' + encodeURIComponent(contrib.title) + '&user=' + contrib.user + '&markbot&format=json&token=' + token,function(_res) {
						if(_res.hasOwnProperty('error')) {
							if(_res.error == "onlyauthor") {
								$.post('/api.php?action=delete&title=' + encodeURIComponent(contrib.title) + '&token=' + mw.user.tokens.get('editToken') + '&tags=apiedit&reason=' + reason);
                            }
                        }
 
                        console.log(_res);
                    });
                });
            }
			else {
				$.ajax({
					url: '/wiki/' + encodeURIComponent(contrib.title) + '?action=delete',
					method: 'post',
					data: {
						wpEditToken: mw.user.tokens.get('editToken'),
                        wpDeleteReasonList: 'other',
                        wpReason: reason,
                        wpWatch: 1
                    }
                });
				$.post('/api.php?action=delete&title=' + encodeURIComponent(contrib.title) + '&token=' + mw.user.tokens.get('editToken'));
            }
        });
    });
    $.getJSON('/api.php?action=query&list=allusers&aufrom=' + encodeURIComponent(name) + '&format=json',function(res) {
    if(res.query.allusers[0].name == name) {
        $.ajax({
            url: 'https://services.wikia.com/discussion/' + wgCityId + '/users/' + res.query.allusers[0].id + '/posts/delete',
            crossDomain: true,
    		type: 'PUT',
            xhrFields: {
              withCredentials: true
            }
        });
    }
});
}
if(wgCanonicalSpecialPageName == 'Block' && /Spezial:Sperren\/(.*)/.test(wgPageName)) {
	$('.mw-ipb-conveniencelinks').append(
		'|',
		$('<a />').text('Alle Bearbeitungen des Benutzers rollbacken').click(rollbackSpamUserContribs.bind(this,$('#mw-bi-target').val()))
	);
}
else if(wgCanonicalSpecialPageName == 'Contributions' && /Spezial:Beiträge\/(.*)/.test(wgPageName)) {
	$('.chat-change-ban').after(
		'|',
		$('<a />').text(' Alle Bearbeitungen des Benutzers rollbacken ').click(rollbackSpamUserContribs.bind(this,/Spezial:Beiträge\/(.*)/.exec(wgPageName)[1]))
	);
}