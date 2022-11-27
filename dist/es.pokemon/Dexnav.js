;(function() {
	mw.hook('wikipage.content').add(function() {
		if (!$('.dexnav').length) {
			return;
		}

		mw.hook('dev.wds').add(function(wds) {
			var $toggle = $('<div>', {
				class: 'dexnav-toggle__arrow-down basic-tooltip',
				id: 'dexnav-toggle',
				title: 'Mostrar otras Pokédex regionales.'
			});
			$toggle.append(wds.icon('menu-control-small'));
			$('.dexnav').wrapAll('<div id="dexnav-container" />');
			$('.dexnav').css('display', 'table');
			$('#dexnav-container').after($toggle);

			$toggle.click(function() {
				var isVisible = $toggle.data('is-visible');
				if (isVisible) {
					$('#dexnav-container').removeClass('dexnav-container__expand');
					$toggle.addClass('dexnav-toggle__arrow-down').removeClass('dexnav-toggle__arrow-up');
				} else {
					$('#dexnav-container').addClass('dexnav-container__expand');
					$toggle.removeClass('dexnav-toggle__arrow-down').addClass('dexnav-toggle__arrow-up');
				}
				$toggle.data('is-visible', !isVisible);
			});
		});

		importArticle({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:WDSIcons/code.js',
				'u:dev:MediaWiki:Tooltips.js'
			]
		});
	});
}());