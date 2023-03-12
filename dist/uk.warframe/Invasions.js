//скрипт виводить активні вторгненн, бере дані з api
$(function() {
	const NW_PAGE_NAME = mw.config.get("wgPageName");
	const WHITELIST_INVASIONS_PAGES = [
		"Вторгнення",
	];
	const NODE_LINK_MAP = {
		"Венера": "Венера (вузол)",
		"Лекс": "Лекс (вузол)"
	};
	const FACTON_COLOR_MAP = {
		"Ґрінери": "#652b24",
		"Корпус": "#053351",
		"Заражені":"#00523d"
	};
	const ICONS_MAP = {
		"ствол": "e/ee/Ствол_uk.png",
		"ствольна коробка": "6/68/Ствольна_коробка_uk.png",
		"ствольні коробки": "6/68/Ствольна_коробка_uk.png",
		"ложе": "c/c8/Ложе_uk.png",
		"ефес": "1/19/Руків’я_uk.png",
		"клинок": "a/a2/Клинок_uk.png",
		"радіатор": "1/1d/Ядро_uk.png",
		"спаровувач": "1/1d/Ядро_uk.png",

		"Детонітовий упорскувач": "e/e3/Детонітовий_упорскувач_uk.png",
		"Форма": "7/74/Форма_uk.png",
		"Мутагенна маса": "5/57/Мутагенна_маса_uk.png",
		"Навкоординати асимільованого Алада В": "2/27/Навкоординати_асимільованого_Алада_В_uk.png",
		"Орокінський каталізатор": "4/40/Орокінський_каталізатор_uk.png",
		"Орокінський реактор": "e/e3/Орокінський_реактор_uk.png",
		"Ексилотримач для ворфрейма": "d/d3/Ексилотримач_для_ворфрейма_uk.png",
		"Полетрон": "2/2b/Полетрон_uk.png",

		"Карак-примара": "4/41/Карак-примара_uk.png",
		"Стран-примара": "5/50/Стран-примара_uk.png",
		"Пагуба-примара": "c/c2/Пагуба-примара_uk.png",
		"Парні Гадюки-примари": "8/8a/Парні_Гадюки-примари_uk.png",
		"Шив": "f/f2/Шив_uk.png",
		"Дера-вандал": "1/15/Дера-вандал_uk.png",
		"Снайптрон-вандал": "9/9c/Снайптрон-вандал_uk.png"
	};
	if (NW_PAGE_NAME === "Вторгнення") {
		$.when($.get( 'https://api.warframestat.us/pc/invasions/?language=uk', "json" )).done(function(data1) {
			var divID ='invasions';
			var containerID = 'invasions_container';

			buildInvasionContainer(divID, containerID);
			data1.sort(function (a, b) {
				if (a.completion < b.completion) return -1;
				if (a.completion > b.completion) return 1;
			});
			$.each( data1, function (index, mission) {
				if ( mission.completion > 0 && mission.completion < 100 && mission.completed == false && mission.eta.search("Infinity") ) {
					buildInvasion(divID, containerID, mission);
				}
			});
			setInterval(countdown, 1000);
		});
	}
	function buildInvasionContainer(divID, containerID) {
		if ($('#'+ divID).find("#" + containerID).length === 0) {
			$('#'+ divID).append(
				$("<div>", {
					id: containerID,
					class: "flex-container",
					style: "justify-content:space-evenly; gap:5px;font-size:11px;",
				})
			);
		}
	}
	function buildInvasion(divID, containerID, missionData) {
		[_, nodeName, planet] = missionData.node.match(/(.+) \((.+)\)/);
		var eta = missionData.eta.match(/\d+\s?\w/g)
			.reduce(function(acc, cur, i) {
			var multiplier = 1000;
			switch (cur.slice(-1)) {
				case 'd':
					multiplier *= 24;
				case 'h':
					multiplier *= 60;
				case 'm':
					multiplier *= 60;
				case 's':
					return ((parseInt(cur) ? parseInt(cur) : 0) * multiplier) + acc;
			}
			return acc;
		}, 0);

		$('#'+ divID).find("#" + containerID)
			.append($("<div>", {
				class: 'wrapper',
				style: 'display: grid; border:1px solid #343434; text-align:center; width:350px; border-radius: 5px;overflow: hidden; background-color: var(--template-background-color-1);',
				append: [
					$("<div>", {
						style: 'width: 105px; display: flex;align-items: center;justify-content: center;'
					}).text(missionData.attacker.faction),
					$("<div>", {
						style: 'width: 105px; grid-row: 2; display: flex;align-items: center;justify-content: center;',
						append: [
							insertImage(missionData, true),
						]
					}),
					$("<div>", {
						style: 'grid-row: 2; display: flex;align-items: center;justify-content: center;'
					}).text(missionData.desc),
					$("<div>", {
						style: 'width: 140px; display: flex;align-items: center;justify-content: center;',
						append: [
							$('<span>').html('<a href="https://warframe.fandom.com/uk/wiki/'
								+ (NODE_LINK_MAP[nodeName] || nodeName) + '">'
								+ nodeName + '</a> '
								+ '(<a href="https://warframe.fandom.com/uk/wiki/' + planet
								+ '">' + planet + '</a>)'),
						]
					}),
					$("<div>", {
						style: 'width: 105px; display: flex;align-items: center;justify-content: center;',
					}).text(missionData.defender.faction),
					$("<div>", {
						style: 'width: 105px; display: flex;align-items: center;justify-content: center;',
						append: [
							insertImage(missionData),
						]
					}),
					$("<div>", {
						style: 'grid-row: 3;grid-column: 1 / 4; height:1rem; display: flex; flex-direction: row;display: flex;align-items: center;justify-content: center;position:relative;',
						append: [
							$("<div>", {
								class: 'progress-bar',
								style: 'height: 100%; display: flex; background-color: ' + FACTON_COLOR_MAP[missionData.attacker.faction] + '; width:' + missionData.completion + '%;'
							}),
							$("<div>", {
								class: 'progress-bar',
								style: 'height: 100%; display: flex; background-color: ' + FACTON_COLOR_MAP[missionData.defender.faction] + '; width:' + (100 - missionData.completion) + '%;'
							}),	
							$("<span>", {
								style: 'position:absolute; color: white;',
								append: [
									$("<span>").text(missionData.completion.toFixed(2) + '% | '),
									$("<span>", {
										'data-time': new Date().getTime() + eta,
										title: 'Завершиться ' + new Date(new Date().getTime() + eta).toLocaleString()
									}),
								]
							}),
						]
					}),
				]
			}));
	}

	function insertImage(data, attack) {
		[itemName, itemPart] = 
			data[attack ? 'attackerReward' : 'defenderReward'].countedItems[0] ? data[attack ? 'attackerReward' : 'defenderReward'].countedItems[0].type.split(': ') : [];
		itemName = itemName ? itemName.replace(' (креслення)', '') : null;
		
		var img = itemName ? $("<a>", {
			href: 'https://warframe.fandom.com/uk/wiki/' + itemName,
			append: [
				$("<img>", {
					class: 'icon',
					width: 'auto',
					height: '4em',
					src: 'https://static.wikia.nocookie.net/warframe/images/'
						+ ICONS_MAP[itemPart || itemName]
						+ '/revision/latest?path-prefix=uk',
					alt: data[attack ? 'attackerReward' : 'defenderReward'].asString,
					title: data[attack ? 'attackerReward' : 'defenderReward'].countedItems[0].type
						+ (data[attack ? 'attackerReward' : 'defenderReward'].countedItems[0].count > 1
							? ' (' + data[attack ? 'attackerReward' : 'defenderReward'].countedItems[0].count + 'шт.)' : ''),
				})
			]
		}) : '';
		return img;
	}
	function countdown() {
		$( 'span[data-time]' ).each( function () {
			var distance = $( this ).attr('data-time') - new Date().getTime();
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
			$( this ).text((days > 0 ? days + " дн. " : '') + (hours > 0 ? hours + " год " : '') + (minutes > 0 ? minutes + " хв " : '') + seconds + " c");
			if (seconds < 0) {
				$( this ).parent().parent().parent().get(0).remove();
			}
		});
	}
});