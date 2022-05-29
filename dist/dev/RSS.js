/**
 * Name: RSS
 * Author: Caburum
 * Description: Allows intergration with RSS feeds
 */
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:Jquery.rss.js',
		'u:dev:MediaWiki:Moment.js'
	]
}).then(function() {
	mw.hook('wikipage.content').add(function($content) {
		if (!$content) return;
		$content.find('.rss-feed:not(.loaded)').each(function() {
			var $this = $(this).addClass('loaded'),
				url = $this.attr('data-url'),
				limit = $this.attr('data-limit') || 10,
				dateFormat = $this.attr('data-dateFormat') || 'MMMM D, YYYY',
				format = $this.attr('data-format') || 'details',
				template;

			switch (format) {
				case 'title': template = '<li><a href="{url}">{title}</a></li>'; break;
				case 'short': template = '<li><a href="{url}">{title}</a> ({date}) <br/>'; break;
				case 'short-image': template = '<li><a href="{url}">{title}</a> ({date}) <br/> {teaserImage}'; break;
				case 'image': template = '<li><a href="{url}">{title}</a> ({date}) {teaserImage} <br/> {shortBodyPlain}...</li>'; break;
				case 'details': /* fall through */
				default: template = '<li><a href="{url}">{title}</a> ({date}) <br/> {shortBodyPlain}...</li>'; break;
			}

			$this.rss(url, {
				entryTemplate: template,
				dateFormat: dateFormat,
				limit: limit
			});
		});
	});
});