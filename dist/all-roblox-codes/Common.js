/* Any JavaScript here will be loaded for all users on every page load. */

/* Sorting and filtering controls for the game list on the main page */
(function(mw, $) {
	mw.hook('wikipage.content').add(function($content) {
		let games = [];
		let genres = {};
		$content.find('#mpgamelinks').children('.mpgamelink').each(function() {
			let game = {};
			game.element = $(this);
			game.title = $(this).find('.mpgametitle a').html();
			game.genres = $(this).find('.mpgamegenre').html().split(" · ");
			game.genres.forEach((genre) => {
				if (genres[genre]) {
					genres[genre].count++;
				} else {
					genres[genre] = { show: true, count: 1 };
				}
			});
			game.usVol = $(this).data('us-vol');
			game.globalVol = $(this).data('global-vol');
			games.push(game);
		});
		
		$content.find('#mpdesktopgenrefilters, #mpmobilegenrefilters').each(function() {
			let genreNames = Object.keys(genres);
			genreNames.sort();
			genreNames.forEach((genre) => {
				$(this).html($(this).html() + '<label class="mpgenrefilter"><input type="checkbox" value="' + genre + '" checked="checked"><span>' + genre + ' (' + genres[genre].count + ')</span></label>');
			});
		});
		
		$content.find('#mpdesktopgenreselectbuttons, #mpmobilegenreselectbuttons').each(function() {
			let selectAll = $('<button>Select all</button>');
			$(this).append(selectAll);
			let selectNone = $('<button>Select none</button>');
			$(this).append(selectNone);
			selectAll.on('click', function() {
				$content.find('.mpgenrefilter input').prop("checked", true);
				$content.find('.mpgamelink').show();
				Object.keys(genres).forEach((genre) => {
					genres[genre].show = true;
				});
			});
			selectNone.on('click', function() {
				$content.find('.mpgenrefilter input').prop("checked", false);
				$content.find('.mpgamelink').hide();
				Object.keys(genres).forEach((genre) => {
					genres[genre].show = false;
				});
			});
		});
		
		$content.find('.mpgenrefilter input').on('change', function() {
			let genre = $(this).val();
			genres[genre].show = $(this).is(':checked');
			
			games.forEach((game) => {
				let show = false;
				game.genres.forEach((gameGenre) => {
					if (genres[gameGenre].show) {
						show = true;
					}
				});
				
				if (show) {
					game.element.show();
				} else {
					game.element.hide();
				}
			});
		});
		
		let updateGameSort = () => {
			let $gamelinks = $content.find('#mpgamelinks');
			$gamelinks.children('.mpgamelink').detach();
			games.forEach((game) => {
				$gamelinks.append(game.element);
			});
		};
		
		$content.find('#mpdesktopsortbuttons, #mpmobilesortbuttons').each(function() {
			let sortByTitle = $('<button>Sort by Title <span>↓</span></button>');
			$(this).append(sortByTitle);
			let sortByGenre = $('<button>Sort by Genre <span>↕</span></button>');
			$(this).append(sortByGenre);
			let sortByUSVol = $('<button>Sort by US Popularity <span>↕</span></button>');
			$(this).append(sortByUSVol);
			let sortByGlobalVol = $('<button>Sort by Global Popularity <span>↕</span></button>');
			$(this).append(sortByGlobalVol);
			sortByTitle.on('click', function() {
				if ($(this).find('span').html() !== '↓') {
					games.sort((a, b) => a.title.localeCompare(b.title));
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↓');
				} else {
					games.sort((a, b) => b.title.localeCompare(a.title));
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↑');
				}
				updateGameSort();
			});
			sortByGenre.on('click', function() {
				if ($(this).find('span').html() !== '↓') {
					games.sort((a, b) => a.genres.join(' ').localeCompare(b.genres.join(' ')));
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↓');
				} else {
					games.sort((a, b) => b.genres.join(' ').localeCompare(a.genres.join(' ')));
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↑');
				}
				updateGameSort();
			});
			sortByUSVol.on('click', function() {
				if ($(this).find('span').html() !== '↑') {
					games.sort((a, b) => b.usVol - a.usVol);
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↑');
				} else {
					games.sort((a, b) => a.usVol - b.usVol);
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↓');
				}
				updateGameSort();
			});
			sortByGlobalVol.on('click', function() {
				if ($(this).find('span').html() !== '↑') {
					games.sort((a, b) => b.globalVol - a.globalVol);
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↑');
				} else {
					games.sort((a, b) => a.globalVol - b.globalVol);
					$content.find('#mpdesktopsortbuttons button span, #mpmobilesortbuttons button span').html('↕');
					$(this).find('span').html('↓');
				}
				updateGameSort();
			});
		});

		$content.find('#mpgamelinkmobilecontrols').show();
	});
	
})(window.mediaWiki, window.jQuery);