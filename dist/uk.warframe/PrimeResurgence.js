// скрипт отримує дані з api, обробляє їх та передає в модуль для побудови блоків з товарами Варзії, також виводить зворотний відлік до нового прайм-відродження

$(function() {
	// стежить за змінами в #prime-resurgence і тригерить подію для роботи підказок
	function mutate(mutations, observer) {
		if (mutations.length === 1 && mutations[0].addedNodes[0].className == "prime-resurgence tabs") {
			console.log(mutations);
			$(window).trigger('CustomEvent', mutations[0].target);
			observer.disconnect();
		}
	}
	var observer = new MutationObserver( mutate );
	var config = { childList: true, subtree: true };
	observer.observe(document.querySelector('#prime-resurgence'), config);
	
	mw.hook('wikipage.content').add(function($content) {
		$.when(
			$.ajax( {url:"https://api.warframestat.us/pc/vaultTrader?language=uk", dataType: "json"} )
		).then(function( vaultTrader ) {
			if (vaultTrader.active) {
				// блоки з для відображення зворотнього відліку до майбутнього прайм-відродження
				$("#prime-resurgence").append(
					$('<div>', {
						style: 'text-align: center; display: block;',
						append:[
							$('<span>', {
								text: 'Наступні пропозиції',
								style: 'font-size: 24px;',
							}),
							$('<br>'),
							$('<span>', {
								id: 'next-resurgence',
								style: 'font-size: 20px; font-weight: 400;',
							}),
							$('<span>', {
								'data-time': vaultTrader.expiry,
								title: 'Розпочнеться ' + new Date(vaultTrader.expiry).toLocaleString(),
								text: 'time',
								style: 'font-size: 24px; font-weight: 500;',
							})
						]
					}),
					$('<div>', { style: 'clear:both; margin:0; padding:0;' })
				);
				// формує рядок аргументів для функції побудови боксів товарів в модулі
				var args = "";
				$.each(vaultTrader.inventory, function (i, item) {
					args += "|" + item.item;
				});
				const params = {
					action: "parse",
					text: "{{#invoke:Прайм-відродження|drawVaultTraderOffers"+args+"}}",
					format: "json"
				};
				// api запит та розміщення результату
				const api = new mw.Api();
				api.get(params).done( function (data) {
					$("#prime-resurgence").append($(data.parse.text['*']).children());
				}).done(function() {
				// підтягує стилі для табера і активовує його функціонал
					importArticle({
						type: 'style',
						article: 'MediaWiki:BalancedTabber.css'
					});
					$(".prime-resurgence ul.tabs__caption").on("click", "li:not(.active)", function() {
						$(this)
							.addClass("active")
							.siblings()
							.removeClass("active")
							.closest("div.tabs")
							.find("div.tabs__content")
							.removeClass("active")
							.eq($(this).index())
							.addClass("active");
					});
				});
				// передає в модуль рядок з назвою майбутнього прайм-відродження та вставляє отриманий результат
				var lastResurgence = vaultTrader.schedule[vaultTrader.schedule.length-1];
				if (new Date(vaultTrader.expiry).getTime() < new Date(lastResurgence.expiry).getTime()) {
					const api = new mw.Api();
					const params = {
						action: "parse",
						text: "{{#invoke:Прайм-відродження|nextResurgence|M P V Banshee Mirage Prime Dual Pack}}",
						format: "json"
					};
					api.get(params).done( function (data) {
						$("#next-resurgence").html($(data.parse.text['*']).children()[0].innerHTML).after('<br/>');
					});
				}
			}
		});
	});
	setInterval(countdown, 1000);
	// функціонал таймера
	function countdown() {
    	$( '#prime-resurgence span[data-time]' ).each( function () {
			var countDownDate = new Date($( this ).attr('data-time')).getTime();
			var now = new Date().getTime();
			var distance = countDownDate - now;
			
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
			$( this ).text(
				(days > 0 ? days + " дн. " : '') + 
				(hours > 0 ? hours + " год " : '') + 
				(minutes > 0 ? minutes + " хв " : '') + 
				seconds + " c"
			);
			if (seconds < 0) { $( this ).text('Завершилось ' + $( this ).text()); }
		});
	}
});