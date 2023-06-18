//скрипт підтягує новини з офіційного сайту гри та виводить ті, були додані не пізніше як 30 днів тому

$(function() {
	const NEWS_PAGE_NAME = mw.config.get("wgPageName");
	const NEWS_WHITELIST_PAGES = [
		"Головна",
		"Шаблон:Новини",
	];
	Object.freeze(NEWS_WHITELIST_PAGES);
	if (NEWS_WHITELIST_PAGES.includes(NEWS_PAGE_NAME)) {
		$.get( "https://api.warframestat.us/pc/news/?language=uk", function( data ) {
			$.each( data.reverse(), function (index, newsEntry) {
				if ((new Date().getTime() - new Date(newsEntry.date).getTime()) / (86400 * 1000) > 30) return;
				$( "div.mainpage-box-news ul").append(
					$( "<li>" ).append(
						$( "<a>", {
							href: newsEntry.link,
							text: newsEntry.message
						} )
					)
				);
			});
		}, "json" );
	}
});