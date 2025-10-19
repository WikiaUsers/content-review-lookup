// Fan Feed --------------------------------------------------------------------
(function($){
	// Prevent double load
	window.xorumwiki = window.xorumwiki || {};
	if (window.xorumwiki.fanFeed) return;
	window.xorumwiki.fanFeed = true;

	// Fan Feed HTML
	var FAN_FEED = `
		<div class="mcf-wrapper">
		    <div class="mcf-content" style="display: block;">
		        <h2 class="mcf-header">Xorum Feed</h2>
		        <div class="mcf-mosaic">
		            <div class="mcf-column">
		                <div class="mcf-card mcf-card-wiki-articles">
		                    <header class="mcf-card-wiki-articles__header">
		                        <span class="mcf-card-wiki-articles__header-text">More Xorum Wiki</span>
		                    </header>
		                    <ul class="mcf-card-wiki-articles__list">
		                        <li class="mcf-card-wiki-articles__item">
		                            <a href="${mw.util.getUrl("")}" class="mcf-card-wiki-articles__item-link" title="Main Page">
		                                <span class="mcf-card-wiki-articles__circle">
		                                	<svg class="wds-icon-tiny wds-icon" style="width: 14px; height: 14px;">
		                                		<use xlink:href="#wds-icons-home-tiny"></use>
		                                	</svg>
		                                </span>
		                                <span class="mcf-card-wiki-articles__title">Main Page</span>
		                            </a>
		                        </li>
		                        <li class="mcf-card-wiki-articles__item">
		                            <a href="${mw.util.getUrl("f").replace("/wiki/", "/")}" class="mcf-card-wiki-articles__item-link" title="Discuss">
		                                <span class="mcf-card-wiki-articles__circle">
		                                	<svg class="wds-icon-tiny wds-icon" style="width: 14px; height: 14px;">
		                                		<use xlink:href="#wds-icons-discussions-tiny"></use>
		                                	</svg>
		                                </span>
		                                <span class="mcf-card-wiki-articles__title">Discuss</span>
		                            </a>
		                        </li>
		                        <li class="mcf-card-wiki-articles__item">
		                            <a href="${mw.util.getUrl("Special:RecentChanges")}" class="mcf-card-wiki-articles__item-link" title="Recent changes">
		                                <span class="mcf-card-wiki-articles__circle">
		                                	<svg class="wds-icon-tiny wds-icon" style="width: 14px; height: 14px;">
		                                		<use xlink:href="#wds-icons-activity-tiny"></use>
		                                	</svg>
		                                </span>
		                                <span class="mcf-card-wiki-articles__title">Recent changes</span>
		                            </a>
		                        </li>
		                    </ul>
		                </div>
		                <div class="mcf-card-article__link">
		                    <a href="${mw.util.getUrl("Zovin")}" class="mcf-card mcf-card-article" title="Zovin">
		                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/0/0b/Zovin.png/revision/latest/scale-to-width-down/800?path-prefix=de">
		                        <span class="mcf-card-article__wrapper has-thumbnail">
		                            <span class="mcf-card-article__title">Zovin</span>
		                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
		                        </span>
		                    </a>
		                </div>
		                <div class="mcf-card-article__link">
		                    <a href="${mw.util.getUrl("Einari")}" class="mcf-card mcf-card-article" title="Einari">
		                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/d/da/Einari.png/revision/latest/scale-to-width-down/800?path-prefix=de">
		                        <span class="mcf-card-article__wrapper has-thumbnail">
		                            <span class="mcf-card-article__title">Einari</span>
		                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
		                        </span>
		                    </a>
		                </div>
		            </div>
		            <div class="mcf-column">
		                <div class="mcf-card-article__link">
		                    <a href="${mw.util.getUrl("Luq")}" class="mcf-card mcf-card-article" title="Luq">
		                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/5/5e/Luq.png/revision/latest/scale-to-width-down/800?path-prefix=de">
		                        <span class="mcf-card-article__wrapper has-thumbnail">
		                            <span class="mcf-card-article__title">Luq</span>
		                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
		                        </span>
		                    </a>
		                </div>
		                <div class="mcf-card-article__link">
		                    <a href="${mw.util.getUrl("Qara")}" class="mcf-card mcf-card-article" title="Qara">
		                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/0/04/Qara.png/revision/latest/scale-to-width-down/800?path-prefix=de">
		                        <span class="mcf-card-article__wrapper has-thumbnail">
		                            <span class="mcf-card-article__title">Qara</span>
		                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
		                        </span>
		                    </a>
		                </div>
		                <div class="mcf-card-article__link">
		                    <a href="${mw.util.getUrl("Atrae")}" class="mcf-card mcf-card-article" title="Atrae">
		                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/1/11/Atrae.png/revision/latest/scale-to-width-down/800?path-prefix=de">
		                        <span class="mcf-card-article__wrapper has-thumbnail">
		                            <span class="mcf-card-article__title">Atrae</span>
		                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
		                        </span>
		                    </a>
		                </div>
		            </div>
		            <div class="mcf-column">
		                <div class="mcf-card-article__link">
		                    <a href="${mw.util.getUrl("Luna")}" class="mcf-card mcf-card-article" title="Luna">
		                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/1/13/Luna.png/revision/latest/scale-to-width-down/800?path-prefix=de">
		                        <span class="mcf-card-article__wrapper has-thumbnail">
		                            <span class="mcf-card-article__title">Luna</span>
		                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
	                    	    </span>
	                        </a>
	                    </div>
	                    <div class="mcf-card-article__link">
	                        <a href="${mw.util.getUrl("Rolfin")}" class="mcf-card mcf-card-article" title="Rolfin">
	                            <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/6/63/Rolfin.png/revision/latest/scale-to-width-down/800?path-prefix=de">
	                            <span class="mcf-card-article__wrapper has-thumbnail">
	                                <span class="mcf-card-article__title">Rolfin</span>
	                                <span class="mcf-card-article__subtitle">Xorum Wiki</span>
	                            </span>
	                        </a>
	                    </div>
	                    <div class="mcf-card-article__link">
	                        <a href="${mw.util.getUrl("Troel")}" class="mcf-card mcf-card-article" title="Troel">
	                            <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/e/e6/Troel.png/revision/latest/scale-to-width-down/800?path-prefix=de">
	                            <span class="mcf-card-article__wrapper has-thumbnail">
	                                <span class="mcf-card-article__title">Troel</span>
	                                <span class="mcf-card-article__subtitle">Xorum Wiki</span>
	                            </span>
	                        </a>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	`;

	function main() {
		// Delay add to try to make it more consitent
		setTimeout(fanFeedHTML, 3000);
	}

	function fanFeedHTML() {
		var $feed = $("<div>")
			.addClass("mixed-content-footer")
			.attr("id", "mixed-content-footer")
			.html(FAN_FEED);

		// Insert under page
		$(".resizable-container > div:last-of-type").after($feed);
	}

	main();
})(jQuery);