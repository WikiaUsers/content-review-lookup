// скрипт завантажує дані таблиць випадіння для завдань та контрактів і приводить їх до того вигляду, який може обробити модуль перекладу таблиць випадіння
$(function() {
	const PAGE_NAME = mw.config.get("wgPageName");
	const WHITELIST_PAGES = [
		"Модуль:Переклад/ДропJSON/контракти",
		"Модуль:Переклад/ДропJSON/завдання",
	];
	Object.freeze(WHITELIST_PAGES);
	if (WHITELIST_PAGES.includes(PAGE_NAME)) {
		var missionsType = PAGE_NAME == 'Модуль:Переклад/ДропJSON/контракти' ? 'bounty' : 'missions';
	// завантаження файлу налаштувань
		$.ajax({
			url: "https://warframe.fandom.com/uk/wiki/Модуль:Переклад/ДропJSON/налаштування.json?action=raw",
			dataType: 'json',
			success: addBtn
		});
	}

	// функція додає кнопку, активації основної функції
	function addBtn(options) {
		$('#mw-customcollapsible-'+(missionsType)+'DropsJSON').append(
			$('<div>', {
				id: "loaderDiv",
				css: { 'height': '300px', 'width': '100%', 'display': 'none' },
				append: [
					$('<img>', {
						src: "https://i.gifer.com/ZKZg.gif",
						css: { 'height': '50px', 'width': '50px', 'margin': 'auto',
							'top': 'calc(50% - 25px)', 'position': 'relative', 'display': 'block' },
					})
				]
			}),
			$('<button>', {
				class: "wds-button",
				text: "Завантажити дані",
				css: { 'height': '80px', 'width': '200px', 'margin':'auto', 'display': 'block' },
				on: {
					click: function() {
						$(this).hide();
						$('#loaderDiv').show();
						callback(options, missionsType);
					}
				}
			})	
		);
	}

	// результат розміщується в текстовому полі для зручності копіювання
	function drawResult(data) {
        $("#loaderDiv").hide();
		$('#mw-customcollapsible-'+(missionsType)+'DropsJSON').append(
			$('<textarea>', {
				text: JSON.stringify(allRewards)
					.replace(/"_id":"[a-f0-9]+",/g, '')
					.replace(/"rarity":"\w+",/g, ''),
				css: { 'height': '300px', 'width': '100%' }
			})	
		);
	}

	// завантажує й обробляє дані нагород Дувірі
	function getDuviriData(data, options) {
		$.ajax({
			url: options.proxy+"https://www.warframe.com/uk/droptables",
			data: $(this).serialize(),
			success: function(output) {
				var $table = $(output).filter('#missionRewards')[0].nextElementSibling,
					$rewards = $("tr:has(th:contains(Duviri/Endless: Tier 1  (Normal)))", $table)
						.nextUntil("tr:has(th:contains(Duviri/Endless: Repeated Rewards  (Hard)))"),
					json = {},
					missionName;
				$.each($rewards, function(i, data) {
					if ($(data).hasClass( "blank-row" )) return;
					var $header = $('th', $(data)),
						isNewMission = $header.length === 1;

					missionName = isNewMission ? $header[0].innerText : missionName;
					if (i == 0) missionName = "Duviri/Endless: Tier 1  (Normal)";
					if (missionName == "Duviri/Endless: Repeated Rewards  (Normal)") return;
					missionName = missionName.replace(/\s+/g, ' ');
					if (!json[missionName]) { json[missionName] = { rewards:[] }; }

					if (!isNewMission) {
						var item = $(data)[0].cells[0].innerText,
							chance = $(data)[0].cells[1].innerText
								.replace(/(Very Common|Common|Uncommon|Rare|Legendary|Ultra Rare) \((\d+(\.\d+))%\)/, '$2');
						json[missionName].rewards.push({ itemName: item, chance: Number(chance) });
					}
				});
				data.Duviri = json;
				drawResult(data);
			}
		});
	}

	// отримує дані та формує з них один об’єкт json
	function callback(options) {
		var opt = options[missionsType];
		var requests = Array();
		// формує запити та поміщає проміси в змінну
		$.each(opt.load, function(index, link) {
  			requests.push($.ajax({
				url: link,
				dataType: 'json',
			}));
		});
		// виконує запити і поміщає кожен результат в arguments
		var defer = $.when.apply($, requests);
		defer.done(function(){
			allRewards = {};
			// цикл в якому отримані дані поміщаються в потрібному вигляді в allRewards
			for (i==0;i<Object.keys(opt.load).length;i++) {
				var rewardsAlias = Object.keys(opt.load)[i];
				if (rewardsAlias == "missionRewards") allRewards = arguments[i][0].missionRewards;
				else allRewards[rewardsAlias] = arguments[i][0]; 
			}

			// цикл в якому з allRewards видаляються непотрібні дані
			$.each(opt.remove, function(object, entry) {
				if (missionsType == 'missions') delete allRewards[entry];
				else delete allRewards[object][entry];
			});

			//завантажує таблицю нагород Дувірі з warframe.com/uk/droptables і конвертує в json
			if (missionsType == "missions" && options.DuviriRewards) getDuviriData(allRewards, options);
			else drawResult(allRewards);
		});
	}
});