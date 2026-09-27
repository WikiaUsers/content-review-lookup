mw.hook('wikipage.content').add(function() {
	const page = mw.config.get('wgPageName');
	
	fetch(`/wiki/${page}?action=raw`)
		.then(response => response.text())
		.then(content => {
			
			$('.page-header__meta').prepend('<a class="auto-archiver">Archive</a>');
			$('.auto-archiver').click(function() {
				if ($(this).hasClass('busy')) return;
				$(this).addClass('busy');
				
				new mw.Api().postWithEditToken({
					action: 'edit',
					format: 'json',
					title: 'User:' + mw.config.get('wgUserName') + '/AA/' + page,
					text: content,
					summary: `AutoArchiver: “[[${page.replace(/_/g, ' ')}]]” successfully archived`,
				}).then(() => {
					$(this).addClass('voted');
					$(this).text('Success');
					$(this).removeClass('busy');
					setTimeout(() => {
						$(this).removeClass('voted');
						$(this).text('Archive');
					}, 1000);
				});
			});
		});
});