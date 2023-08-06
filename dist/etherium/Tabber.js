/* Tabber hash links */
mw.loader.using('ext.Tabber', function() {
	if(location.hash != '' && location.hash != '#') {
		var id = 0;
		switch(location.hash.replace('#', '').toLowerCase()) {
			case 'consortium':
				id = 1;
				break;
			case 'intar':
				id = 2;
				break;
			case 'vectide':
				id = 3;
				break;
		}
		if(id != 0) {
			$('.tabberactive').removeClass('tabberactive');
			$('.tabbertab').hide();
			$('.tabberlive div:nth-child(' + (id + 1) + ')').show();
			$('.tabbernav li:nth-child(' + id + ')').addClass('tabberactive');
		}
	}

	$('.tabbernav a').click(function() {
		showTab($(this).attr('title'));
	});

	function showTab(title) {
		location.hash = '#' + title;
		switch(title.toLowerCase()) {
			case 'consortium':
				id = 1;
				break;
			case 'intar':
				id = 2;
				break;
			case 'vectide':
				id = 3;
				break;
		}
		if(id != 0) {
			$('.tabberactive').removeClass('tabberactive');
			$('.tabbertab').hide();
			$('.tabberlive div:nth-child(' + (id + 1) + ')').show();
			$('.tabbernav li:nth-child(' + id + ')').addClass('tabberactive');
		}
	}
});