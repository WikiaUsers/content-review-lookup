//скрипт виводить таблицю з активними проривами Порожнечі, ворогами та датою закінчення, бере дані з api

$(function() {
	const blockID = 'fissures-list';
	const tableID = 'fissure-table';
	const IMG_PREFIX = '/revision/latest?path-prefix=uk';
	const Icons = {
		'railjack': '9/9f/Рейкоджек_іконка_uk.png',
		'steelPath': 'd/d6/Шлях_сталі_іконка_uk.svg',
		'Корпус': '8/86/Корпус_іконка_uk.png',
		'Ґрінери': '9/97/Ґрінери_іконка_uk.png',
		'Уярмлені': 'c/c6/Орокіни_іконка_uk.png',
		'Заражені': '8/8a/Заражені_іконка_uk.svg',
		'Шепіт': '9/9d/Шепіт_uk.png',
		'Сутичка': '5/57/Ґрінери_або_Корпус_іконка_uk.png',
		'Реквієм': 'd/d9/Прорив_Реквієм_uk.svg',
		'Літ': '6/64/Прорив_Літ_uk.svg',
		'Мезо': 'a/a8/Прорив_Мезо_uk.svg',
		'Нео': '8/8d/Прорив_Нео_uk.svg',
		'Аксі': 'b/b1/Прорив_Аксі_uk.svg',
		'Омні': 'a/a5/Прорив_Омні_uk.gif',
	};
	const IMG_URL = 'https://static.wikia.nocookie.net/warframe/images/';
	const WIKI_URL = 'https://warframe.fandom.com/uk/wiki/';
	const NW_PAGE_NAME = mw.config.get("wgPageName");
	const WHITELIST_FISSURES_PAGES = [
		"Прориви_Порожнечі",
	];
	const MISSION_LINK_MAP = {
		"Орфікс": "Орфікс (завдання)"
	};
	const NODE_LINK_MAP = {
		"Венера": "Венера (вузол)",
		"Лекс": "Лекс (вузол)"
	};
	const PROXIMA_LINK_MAP = {
		"Земля": "Проксима Землі",
		"Вуаль": "Проксима Вуалі",
		"Нептун": "Проксима Нептуна",
		"Плутон": "Проксима Плутона",
		"Венера": "Проксима Венери",
		"Сатурн": "Проксима Сатурна",
	};
	if (WHITELIST_FISSURES_PAGES.includes(NW_PAGE_NAME)) {
		$.when($.get( 'https://api.warframestat.us/pc/fissures?language=uk', "json" )).done(function(data) {
			data.sort(function(a,b){
				if (a.tierNum > b.tierNum) return 1;
				if (a.tierNum < b.tierNum) return -1;
				return 0;
			});
			if ($('#' + blockID).find("#" + tableID).length === 0) {
				buildTable();
				buildTableBody(data);
				$('.fissure-checkbox').prop( "checked", true );
			}

			mw.loader.using('jquery.tablesorter', function() {
				$('table#' + tableID).tablesorter();
			});
			$('.buttons-wrapper button').click(function(e) {
				$(".fissure-row").each(function () {
					if (e.currentTarget.id == "all") $(this)[0].hidden = false;
					$(this)[0].hidden = e.currentTarget.id == "all" ? false : $(this)[0].id != e.currentTarget.id;
				});
			});
			setInterval(countdown, 1000);
		});
	}
	function buildTable() {
		$('#' + blockID).append(
			$("<table>", {
				id: tableID,
				class: "emodtable sortable jquery-tablesorter",
				style: "width:100%;",
				append: [
					$("<thead>").append(
						$("<tr>", {
							append: [
								$("<th>").text('Ера'),
								$("<th>", {width: "30%", text: 'Вузол'}),
								$("<th>").text('Тип'),
								$("<th>").text('Фракція'),
								$("<th>", {'data-sort-type': 'data',text: 'Завершення'}),
							]
						})
					),
					$("<tbody>"),
					$("<tfoot>").append(
						$("<tr>").append(
							$("<th>", {
								colspan: 6,
								append: [
									$("<div>", {
										class: 'buttons-wrapper',
										append: [
											$("<button>", {
												id: 'all',
												text: 'Усі',
											}),
											$("<button>", {
												id: 'normal',
												text: 'Звичайні',
											}),
											$("<button>", {
												text: 'Шлях сталі',
												id: 'steel-path'
											}),
											$("<button>", {
												text: 'Бурі Порожнечі',
												id: 'void-storm'
											}),
										]
									})
								]
							})
						)
					),
				]
			})
		);
	}

	function buildTableBody(data) {
		$.each(data, function(i, fissure) {
			[_, nodeName, planet] = fissure.node.match(/(.+) \((.+)\)/);
			var enemy = fissure.enemy.replace('Орокіни', 'Уярмлені');
			var rowID = (fissure.isHard && 'steel-path' ||  fissure.isStorm && 'void-storm' || 'normal');
			$('#' + tableID).append($("<tr>", {
				id: rowID,
				class: "fissure-row",
				append: [
					$("<td>", {
						'data-sort-value': fissure.tier,
						html: '<img class="icon dark-invert" src="' +
							IMG_URL + Icons[fissure.tier] + IMG_PREFIX +
							'" title="Прорив рівня: ' + fissure.tier + '" ></img> ',
						append: [
							$("<a>", {
								href: WIKI_URL + 'Реліквія Порожнечі#Ера',
								text: fissure.tier
							})
						]
					}),
					$("<td>", {'data-sort-value': nodeName})
					.html('<a href="' + WIKI_URL + 
						(NODE_LINK_MAP[nodeName] || nodeName) + '">' +
						nodeName + '</a> ' +
						'(<a href="' + WIKI_URL +
						(fissure.isStorm ? PROXIMA_LINK_MAP[planet] : planet) +
						'">' + planet + '</a>)'
					),
					$("<td>", {
						'data-sort-value': fissure.missionType,
						html: (fissure.isStorm || fissure.isHard)? 
							'<img class="icon light-invert" src="' + IMG_URL +
							(fissure.isStorm ? Icons.railjack : Icons.steelPath) +
							IMG_PREFIX + '" title="' +
							(fissure.isStorm ? 'Буря Порожнечі' : 'В режимі «Шлях сталі»') +
							'" ></img> ' : null,
						append: [
							$("<a>", {
								href: WIKI_URL + (MISSION_LINK_MAP[fissure.missionType] || fissure.missionType),
								text: fissure.missionType
							})
						]
					}),
					$("<td>", {
						'data-sort-value': enemy,
						html: '<img class="icon light-invert" src="' +
							IMG_URL + Icons[enemy] + IMG_PREFIX + 
							'" title="' + enemy + '" ></img> ',
						append: [
							$("<a>", {
								href: 'https://warframe.fandom.com/uk/wiki/' + enemy,
								text: enemy
							})
						]
					}),
					$("<td>", {
						'data-sort-value': fissure.expiry,
						append: [
							$("<span>", {
								'data-time': fissure.expiry,
								title: 'Закінчиться '+ new Date(fissure.expiry).toLocaleString()
							})
						]
					}),
				]
			}));
		});
	}

	function countdown() {
    	$( '#fissure-table span[data-time]' ).each( function () {
			var countDownDate = new Date($( this ).attr('data-time')).getTime();
			var now = new Date().getTime();
			var distance = countDownDate - now;
			
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
			$( this ).text(
				(hours > 0 ? hours + " год " : '') + 
				(minutes > 0 ? minutes + " хв " : '') + 
				seconds + " c"
			);
			if (seconds < 0) { $( this ).text('Завершилось ' + $( this ).text()); }
		});
	}
});