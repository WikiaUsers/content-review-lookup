/**
 * Script: FanFeed
 * Author: Marisa1980
 * Description: Restore the old Fan Feed module at the bottom of the wiki article
 * Other: The script is heavily relied on API request. This script can not run on mobile site
**/

// IMPORT CSS
importArticle({
	type: 'style',
	article: 'u:dev:MediaWiki:FanFeed.css',
});

(function () {
	function buildFanFeed() {
		// BUILD HTML STRUCTURE
		var $wrapper = $('<div>', { class: 'fan-feed-wrapper' }).append(
			$('<div>', { class: 'fan-feed' }).append(
			$('<h2>').text('Fan Feed'),
			$('<div>', { class: 'fan-feed-grid' })
			)
		);
		
		// INSERT BEFORE RIGHT RAIL
		var $target = $('.page.has-right-rail');
		if ($target.length) {
			$target.after($wrapper);
		} else {
			$('body').append($wrapper);
		}
		
		var $grid = $wrapper.find('.fan-feed-grid');
		
		// SIDEBAR, FIRST GRID CELL
		var currentWikiName = mw.config.get('wgSiteName');
		var $sidebar = $('<div>', { class: 'fan-feed-sidebar' }).append(
			$('<h3>').text('More ' + currentWikiName),
			$('<ul>').append('<li>Loading…</li>')
		);
		$grid.append($sidebar);
		
		// SIDEBAR LINKS, RECIRCULATION API
		var popApiUrl =
			mw.config.get('wgServer') +
			'/wikia.php?controller=RecirculationApi&method=getPopularPages&format=json&limit=3';
		
		$.getJSON(popApiUrl).done(function (data) {
			var $ul = $sidebar.find('ul').empty();
			data.forEach(function (item) {
				var $li = $('<li>').append(
					$('<a>').attr('href', item.url).text(item.title)
				);
				$ul.append($li);
			});
		})
		.fail(function () {
			$sidebar.find('ul').html('<li>Error loading popular pages</li>');
		});
		
		// ARTICLES, RECOMMENDATION SERVICE
		var wikiId = mw.config.get('wgCityId');
		var articleId = mw.config.get('wgArticleId');
		
		if (wikiId && articleId) {
			var recApiUrl =
				'https://services.fandom.com/recommendations/recommendations' +
				'?wikiId=' + wikiId +
				'&articleId=' + articleId;
			
			$.getJSON(recApiUrl)
				.done(function (res) {
					// SHUFFLE RECOMMENDATION
					function shuffle(array) {
						for (var i = array.length - 1; i > 0; i--) {
							var j = Math.floor(Math.random() * (i + 1));
							var temp = array[i];
							array[i] = array[j];
							array[j] = temp;
						}
						return array;
					}
					
					var items = shuffle(res.article_recommendation).slice(0, 8);
					
					items.forEach(function (item) {
						var imgSrc =
							item.thumbnail_url && item.thumbnail_url.trim()
								? item.thumbnail_url
								: 'https://vignette.wikia.nocookie.net/ucp-internal-test-starter-commons/images/a/a9/Example.jpg/revision/latest';
						
						var $tile = $('<a>')
							.addClass('fan-feed-tile')
							.attr('href', item.url)
							.append(
								$('<img>').attr('src', imgSrc),
								$('<div>')
									.addClass('overlay')
									.append(
										$('<h4>').text(item.article_title),
										$('<p>').text(item.wiki_title)
									)
							);
						$grid.append($tile);
					});
				})
				.fail(function () {
					$grid.append('<p>Error loading recommended articles</p>');
				});
		} else {
			$grid.append('<p>No recommendations available</p>');
		}
	}
	
	// RUN AFTER RHE PAGE IS READY
	$(function () {
		var ns = mw.config.get('wgNamespaceNumber');
		var allowedNamespaces = [0];
		if (allowedNamespaces.includes(ns)) {
			buildFanFeed();
		}
	});
})();