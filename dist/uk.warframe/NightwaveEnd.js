//скрипт підтягує дату завершення сезону Нічної хвилі з api.warframestat.us та виводить рядок

$(function() {
	const NW_END_PAGE_NAME = mw.config.get("wgPageName");
	if (NW_END_PAGE_NAME == 'Нічна_хвиля') {
		$.get( "https://api.warframestat.us/pc/nightwave/?language=uk", function( data ) {
			$( "div#nightwave_end").css({'font-size':'25px', 'text-align':'center', 'font-weight':'bold'}).append(
				$( "<span>" ).text(	data.active ? 'Приблизний час до завершення поточного сезону:' : 'Сезон завершився:' ),
				$( "<br>" ),
				$("<span>", {
					style: 'cursor:help;',
					'data-time': new Date(data.expiry).getTime(),
					title: new Date(data.expiry).toLocaleString(),
					text: new Date(data.expiry).toLocaleString()
				})
			);
			setInterval(countdown, 1000);
		}, "json" );
	}

	function countdown() {
    	$span = $( 'div#nightwave_end span[data-time]' );
		var countDownDate = $span.attr('data-time');
		var now = new Date().getTime();
		var distance = countDownDate - now;
		
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (seconds > 0) {
			$span.html((days > 0 ? days + "&nbsp;дн.&nbsp;" : '') + (hours > 0 ? hours + "&nbsp;год&nbsp;" : '') + (minutes > 0 ? minutes + "&nbsp;хв&nbsp;" : '') + seconds + "&nbsp;c");
		}
	}
});