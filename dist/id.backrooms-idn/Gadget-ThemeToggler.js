setTimeout(() => {
	mw.hook('wikipage.content').add(function() {
		$('.page-header__meta').prepend('<a class="theme-toggler">Toggle T:CSS</a>');
		
		$('style.t-css').each(function() {
			const css = this.sheet;
			const portal = this.dataset.portal;
			var portalOpened = false;
			
			if (!portal || portal == 'none' || portalOpened) {
				$('.theme-toggler').click(() => css.disabled = !css.disabled);
			} else $('.t-css-portal-' + portal).click(() => portalOpened = true);
		});
	});
}, 1000);p