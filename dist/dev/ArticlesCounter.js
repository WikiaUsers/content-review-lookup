/**
 * Adds a counter with an amount of articles to the wiki header
 * @docs [[ArticlesCounter]]
 * @author Kofirs2634
 */
$(function() {
	if (window.ArticlesCounter) return;
	window.ArticlesCounter = true;

	const c = mw.config.get(['wgCityId', 'wgArticlePath', 'skin']);
	var i18n;
	
	if (c.skin != 'fandomdesktop') return;
	if (!$('.fandom-community-header').length) return;

	function init() {
		$.ajax({
			method: 'get',
			url: 'https://community.fandom.com/api/v1/Wikis/Details?ids=' + c.wgCityId,
			cache: false
		}).done(render)
		.fail(function(e) { console.error('ArticlesCounter got an error:', e) })
	}

	function render(r) {
		var articles = r.items[c.wgCityId].stats.articles;
		$('.fandom-community-header__community-name-wrapper').after(
			$('<div>', { class: 'articles-counter' }).append($('<a>', {
				href: c.wgArticlePath.replace('$1', 'Special:Allpages'),
				html: '<span>' + splitNum(articles, i18n.msg('separator').plain()) + '</span> ' + i18n.msg('label').plain()
			}))
		)
		$('head').append($('<style>', {
			id: 'articlescount-styles',
			text: '.articles-counter{line-height:26px;margin-inline-start:auto}.articles-counter a:hover,.articles-counter a:active,.articles-counter a:focus{text-decoration:none}.articles-counter span{font-size:22px;font-weight:bold}.fandom-community-header .wiki-tools{margin-inline-start:20px}'
		}))
	}

	// it's a better solution than I've done
	// https://stackoverflow.com/a/2901298
	function splitNum(x, sep) {
		return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, sep)
	}

	importArticle({ type: 'script', article: 'u:dev:MediaWiki:i18n-js/code.js' });
	mw.hook('dev.i18n').add(function(i18np) {
		i18np.loadMessages('ArticlesCounter').done(function(i18np) {
			i18n = i18np; init();
		})
	})
});