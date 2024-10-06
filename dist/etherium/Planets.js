(function(mw) {
	'use strict';
	if (!['Planets', 'Template:Planets'].includes(mw.config.get('wgPageName'))) return;
	mw.hook('wikipage.content').add(function($content) {
		var gameUniverse = $content.find('#game_universe:not(.loaded)')[0];
		if (!gameUniverse) return;
		gameUniverse.classList.add('loaded');
		var gameSwitch = $content.find('#view .switch')[0];
		var gameSpan = $content.find('#data > span');
		var solarSystem = $content.find('#solar-system')[0];

		if (window.innerWidth < 620) {
			gameUniverse.classList.remove('view-3D');
			gameUniverse.classList.add('view-2D');
			gameSwitch.classList.add('on');
			gameSwitch.classList.remove('off');
		}
		gameSwitch.addEventListener('click', function() {
			gameUniverse.classList.toggle('view-3D');
			gameUniverse.classList.toggle('view-2D');
			gameSwitch.classList.toggle('on');
			gameSwitch.classList.toggle('off');
		});
		gameSpan.each(function(index, value) {
			value.addEventListener('click', function() {
				solarSystem.classList = value.classList[0];
				gameSpan.each(function(index2, value2) {
					if (value2.classList.contains('active')) {
						value2.classList.remove('active');
						return;
					}
				});
				value.classList.add('active');
			});
		});
	});
})(window.mediaWiki);