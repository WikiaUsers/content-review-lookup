setTimeout(() => {
	mw.hook('wikipage.content').add(function() {
		$('.page-header__meta').prepend('<a class="theme-toggler">Toggle T:CSS</a>');
		
		$('style.import-css').each(function() {
			const css = this;
			const wait = $(this).attr('data-wait');
			const portal = $(this).attr('data-portal');
			var portalOpened = false;
			
			if (wait != 'none') var timer = setTimeout(() => {}, wait);
			if (portal != 'none') $('.t-css-portal-' + portal).click(() => portalOpened = true);
			
			$('.theme-toggler').click(function() {
				switch (true) {
					case wait != 'none':
						if (timer || css.disabled == false) {
							clearTimeout(timer);
							timer = false;
							css.disabled = true;
						} else css.disabled = false;
						break;
					case portal != 'none':
						if (portalOpened) css.disabled = !css.disabled;
						break;
					default:
						css.disabled = !css.disabled;
						break;
				}
			});
		});
	});
}, 1000);