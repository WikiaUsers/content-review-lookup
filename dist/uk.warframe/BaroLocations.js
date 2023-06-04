//скрипт підтягує локацію та дату прибуття Баро Кі’Тіра з api.warframestat.us та виводить рядок

$(function() {
	const BARO_PAGE_NAME = mw.config.get("wgPageName");
	const BARO_WHITELIST_PAGES = [
		"Головна",
		"Баро_Кі’Тір",
		"Шаблон:Таймери",
	];
	Object.freeze(BARO_WHITELIST_PAGES);
	if (BARO_WHITELIST_PAGES.includes(BARO_PAGE_NAME)) {
		$.get( "https://api.warframestat.us/pc/voidTrader/?language=uk", function( data ) {
			var mainText;
			var time = data.active ? data.expiry : data.activation;
			[_, nodeName, planet] = data.location.match(/(.+) \((.+)\)/);
			if (BARO_PAGE_NAME == 'Баро_Кі’Тір') {
				mainText = data.active ? 'Баро Кі’Тір перебуває на реле %s. <br />Торговець планує покинути реле за ' : 'Баро Кі’Тір прибуде на реле %s за ';
				$( "div#baro_timer").css({'font-size':'25px', 'text-align':'center'}).append(
					$( "<span>" ).html(
						mainText.replace('%s', '<a href="https://warframe.fandom.com/uk/wiki/Реле">'
							+ nodeName.replace('Реле', '') + '</a> '
							+ '(<a href="https://warframe.fandom.com/uk/wiki/'
							+ planet + '">' + planet + '</a>)'
						)
					),
					$("<br>"),
					$("<span>", {
						style: 'cursor:help;',
						'data-time': new Date(time).getTime(),
						title: new Date(time).toLocaleString(),
						text: '1'
					})
				);
			} else {
				mainText = data.active ? 'перебуває на реле %s. <br />Баро планує покинути реле за' : 'прибуде на реле %s';
				$( "div#baro_timer").css('font-size','12px').attr('align','center').append( 
					$( "<span>" ).html(
						'<a href="https://warframe.fandom.com/uk/wiki/Баро_Кі’Тір">Баро Кі’Тір</a> ' +
						mainText.replace('%s', '<a href="https://warframe.fandom.com/uk/wiki/Реле">'
							+ nodeName.replace('Реле', '') + '</a> '
							+ '(<a href="https://warframe.fandom.com/uk/wiki/'
							+ planet + '">' + planet + '</a>)'
						)
					),
					$("<br />"),
					$("<span>", {
						style: 'cursor:help;font-size:18px;font-weight:bold;',
						'data-time': new Date(time).getTime(),
						title: new Date(time).toLocaleString(),
						text: '1'
					})
				);
			}
			setInterval(countdown, 1000);
		}, "json" );
	}

	function countdown() {
    	$span = $( 'div#baro_timer span[data-time]' );
		var countDownDate = $span.attr('data-time');
		var now = new Date().getTime();
		var distance = countDownDate - now;
		
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		$span.html((days > 0 ? days + "&nbsp;дн.&nbsp;" : '') + (hours > 0 ? hours + "&nbsp;год&nbsp;" : '') + (minutes > 0 ? minutes + "&nbsp;хв&nbsp;" : '') + seconds + "&nbsp;c");
	}
});