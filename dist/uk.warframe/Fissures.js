//скрипт виводить таблицю з активними проривами Порожнечі, ворогами та датою закінчення, бере дані з api

$(function() {
	const NW_PAGE_NAME = mw.config.get("wgPageName");
	const WHITELIST_FISSURES_PAGES = [
		"Прориви_Порожнечі",
	];
	const MISSION_LINK_MAP = {
		"Орфікс":"Орфікс (завдання)"
	};
	const NODE_LINK_MAP = {
		"Венера":"Венера (вузол)",
		"Лекс":"Лекс (вузол)"
	};
	const PROXIMA_LINK_MAP = {
		"Земля":"Проксима Землі",
		"Вуаль":"Проксима Вуалі",
		"Нептун":"Проксима Нептуна",
		"Плутон":"Проксима Плутона",
		"Венера":"Проксима Венери",
		"Сатурн":"Проксима Сатурна",
	};
	if (WHITELIST_FISSURES_PAGES.includes(NW_PAGE_NAME)) {
		$.when($.get( 'https://api.warframestat.us/pc/fissures?language=uk', "json" )).done(function(data1) {
			var tableID;
			var divID;
			$.each( data1, function (index, fissure) {
				if (!fissure.expired) {
					if (fissure.isHard) {
						divID = 'fissures_hard';
						tableID = 'hard';
					} else if (fissure.isStorm) {
						divID = 'fissures_storms';
						tableID = 'storms';
					} else {
						divID = 'fissures_normal';
						tableID = 'normal';
					}
					buildTable(divID, tableID);
					buildTableRow(divID, tableID, fissure);
					mw.loader.using('jquery.tablesorter', function() {
						$('#fissures_hard table#hard').tablesorter();
						$('#fissures_normal table#normal').tablesorter();
						$('#fissures_storms table#storms').tablesorter();
					});
					setInterval(countdown, 1000);
				}
			});
		});
	}
	function buildTable(divID, tableID) {
		if ($('#'+ divID).find("#" + tableID).length === 0) {
			$('#'+ divID).append(
						$("<table>", {
              id: tableID,
							class: "emodtable sortable jquery-tablesorter",
							style: "width:100%;",
							append: [
								$("<thead>", {
									append: [
										$("<tr>", {
											append: [
												$("<th>", {width: "30%"}).text('Вузол'),
												$("<th>").text('Тип завдання'),
												$("<th>").text('Ера'),
												$("<th>").text('Фракція'),
												$("<th>").attr('data-sort-type', 'data').text('Завершення'),
											]
										})
									]
								}),
                $("<tbody>"),
                $("<tfoot>"),
							]
						})
					);
		}
	}
	function buildTableRow(divID, tableID, fissureData) {
		[_, nodeName, planet] = fissureData.node.match(/(.+) \((.+)\)/);
		var enemy = fissureData.enemy.replace('Орокіни', 'Уярмлені');
		$('#'+ divID).find("table#" + tableID + ' tbody')
			.append($("<tr>", {
				append: [
					$("<td>", {'data-sort-value': nodeName})
						.html('<a href="https://warframe.fandom.com/uk/wiki/'
							+ (NODE_LINK_MAP[nodeName] || nodeName) + '">'
							+ nodeName + '</a> '
							+ '(<a href="https://warframe.fandom.com/uk/wiki/'
							+ (fissureData.isStorm ? PROXIMA_LINK_MAP[planet] : planet)
							+ '">' + planet + '</a>)'
						),
					$("<td>", {
						'data-sort-value': fissureData.missionType,
						append: [
							$("<a>", {
								href: 'https://warframe.fandom.com/uk/wiki/'
								+ (MISSION_LINK_MAP[fissureData.missionType] || fissureData.missionType),
								text: fissureData.missionType
							})
						]
						
					}),
					$("<td>", {
						'data-sort-value': fissureData.tier,
						append: [
							$("<a>", {
								href: 'https://warframe.fandom.com/uk/wiki/Реліквія Порожнечі#Ера',
								text: fissureData.tier
							})
						]
					}),
					$("<td>", {
						'data-sort-value': enemy,
						append: [
							$("<a>", {
								href: 'https://warframe.fandom.com/uk/wiki/' + enemy,
								text: enemy
							})
						]
					}),
					$("<td>", {
						'data-sort-value': fissureData.expiry,
						append: [
							$("<span>", {
								'data-time': fissureData.expiry,
								class: 'basic-tooltip',
								title: 'Закінчиться '+ new Date(fissureData.expiry).toLocaleString(),
								text: '1'
							})
						]
					}),
				]
			}));
	}
  function countdown() {
    	$( '#fissures_tabber span[data-time]' ).each( function () {
			var countDownDate = new Date($( this ).attr('data-time')).getTime();
			var now = new Date().getTime();
			var distance = countDownDate - now;
			
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
			$( this ).text((hours > 0 ? hours + " год " : '') + (minutes > 0 ? minutes + " хв " : '') + seconds + " c");
			if (seconds < 0) {
				$( this ).parent().parent().get(0).remove();
			}
		});
	}
});