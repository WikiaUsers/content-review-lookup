//скрипт виводить таблицю з активними проривами Порожнечі, ворогами та датою закінчення, бере дані з api

$(function() {
	const blockID = 'fissures-list';
	const tableID = 'fissure-table';
	const IMG_PREFIX = '/revision/latest?path-prefix=uk';
	const TIER_ORDER = {
		'Реквієм': 5,
		'Літ': 1,
		'Мезо': 2,
		'Нео': 3,
		'Аксі': 4,
	};
	const Icons = {
		'railjack': '9/9f/Рейкоджек_іконка_uk.png',
		'steelPath': 'd/d6/Шлях_сталі_іконка_uk.svg',
		'Корпус': '8/86/Корпус_іконка_uk.png',
		'Ґрінери': '9/97/Ґрінери_іконка_uk.png',
		'Уярмлені': 'c/c6/Орокіни_іконка_uk.png',
		'Заражені': '8/8a/Заражені_іконка_uk.svg',
		'Сутичка': '5/57/Ґрінери_або_Корпус_іконка_uk.png',
		'Реквієм': 'd/d9/Прорив_Реквієм_uk.svg',
		'Літ': '6/64/Прорив_Літ_uk.svg',
		'Мезо': 'a/a8/Прорив_Мезо_uk.svg',
		'Нео': '8/8d/Прорив_Нео_uk.svg',
		'Аксі': 'b/b1/Прорив_Аксі_uk.svg',
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
				if (TIER_ORDER[a.tier] > TIER_ORDER[b.tier]) return 1;
				if (TIER_ORDER[a.tier] < TIER_ORDER[b.tier]) return -1;
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
			$('.fissure-checkbox').change(function(e) {
				if ($('.fissure-checkbox:checked').length === 1)
					$('.fissure-checkbox:checked')[0].disabled = true;
				else if ($('input.fissure-checkbox:disabled').length > 0)
					$('input.fissure-checkbox:disabled')[0].disabled = false;

				$('tr#' + e.currentTarget.id + '-row').filter(function () {
					$(this)[0].hidden = !e.currentTarget.checked;
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
											$("<input>", {
												class: 'fissure-checkbox',
												type: 'checkbox',
												id: 'normal'
											}),
											$("<label>", {
												class: 'button fissure-checkbox',
												text: 'Звичайні',
												for: 'normal'
											}),
											$("<input>", {
												class: 'fissure-checkbox',
												type: 'checkbox',
												id: 'steel-path'
											}),
											$("<label>", {
												class: 'button fissure-checkbox',
												text: 'Шлях сталі',
												for: 'steel-path'
											}),
											$("<input>", {
												class: 'fissure-checkbox',
												type: 'checkbox',
												id: 'void-storm'
											}),
											$("<label>", {
												class: 'button fissure-checkbox',
												text: 'Бурі Порожнечі',
												for: 'void-storm'
											})
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
			var rowID = (fissure.isHard && 'steel-path' ||  fissure.isStorm && 'void-storm' || 'normal') + '-row';
			$('#' + tableID).append($("<tr>", {
				id: rowID,
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