//скрипт підтягує локацію та дату прибуття Баро Кі’Тіра з api.warframestat.us та виводить рядок

$(function() {
	const NW_PAGE_NAME = mw.config.get("wgPageName");
	if (NW_PAGE_NAME == 'Баро_Кі’Тір') {
		$.get( "https://api.warframestat.us/pc/voidTrader/?language=uk", function( data ) {
			var mainText = data.active ? 'Торговець перебуває на реле %s. <br />Баро планує покинути реле через ' : 'Торговець прибуде на реле %s через 	';
			var time = data.active ? data.expiry : data.activation;
			[_, nodeName, planet] = data.location.match(/(.+) \((.+)\)/);
			$( "div#baro_timer").css({'font-size':'25px', 'text-align':'center'}).append( 
				$( "<span>" ).html(
					mainText.replace('%s', '<a href="https://warframe.fandom.com/uk/wiki/Реле">'
						+ nodeName.replace('Реле', '') + '</a> '
						+ '(<a href="https://warframe.fandom.com/uk/wiki/'
						+ planet + '">' + planet + '</a>)'
					)
				),
				$("<span>", {
					style: 'cursor:help;',
					'data-time': new Date(time).getTime(),
					title: new Date(time).toLocaleString(),
					text: '1'
				})
			);
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