mw.loader.using('mediawiki.api').then(function () {
	//CC doesn't have Special:Community
	if (mw.config.get('wgCityId') === 177 || window.ShowWROnToolbarLoaded) {
		return;
	}
	window.ShowWROnToolbarLoaded = true;

	function main () {
		$.get(mw.config.get('wgScriptPath') + '/wiki/Special:Community', function (data) {
	        var fake = document.createElement('div');
	        fake.innerHTML = data;
			var el = fake.querySelector('#mw-content-text .community-page-rail a[data-tracking="wiki-representative-avatar-username"]');
		    $('#WikiaBar .toolbar .tools').append(
		        $('<li>', {
		            html: (mw.config.get('wgContentLanguage') === 'en' ? 'WR' : 'ARC') + ':&nbsp;',
		            append: (el || mw.messages.get('rightsnone'))
		        })
		    );
		});
	}

	if (mw.messages.get('rightsnone')) {
		main();
	} else {
		new mw.Api().loadMessagesIfMissing(['rightsnone']).then(function () {
			main();
		});
	}
});