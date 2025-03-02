// скрипт завантажує дані таблиць випадіння для завдань та контрактів і приводить їх до того вигляду, який може обробити модуль перекладу таблиць випадіння
$(function() {
	const PAGE_NAME = mw.config.get("wgPageName");
	const WHITELIST_PAGES = [
		"Модуль:Переклад/ДропJSON/контракти",
		"Модуль:Переклад/ДропJSON/завдання",
	];
	var resultData = {}, options = {};
	Object.freeze(WHITELIST_PAGES);
	if (WHITELIST_PAGES.includes(PAGE_NAME)) {
		var missionsType = PAGE_NAME == 'Модуль:Переклад/ДропJSON/контракти' ? 'bounty' : 'missions';
	// завантаження файлу налаштувань
		$.ajax({
			url: "https://warframe.fandom.com/uk/wiki/Модуль:Переклад/ДропJSON/налаштування.json?action=raw",
			dataType: 'json',
			success: function(data) { 
				options = data;
				addBtn();
			}
		});
	}

	// функція додає кнопку, активації основної функції
	function addBtn() {
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
				css: { 'height': '30px', 'width': '200px', 'margin':'auto', 'display': 'block' },
				click: function() {
					$(this).hide();
					$('#loaderDiv').show();
					callback(missionsType);
				}
			})	
		);
	}

	// результат розміщується в текстовому полі для зручності копіювання
	function showResult() {
		var text = JSON.stringify(resultData)
			.replace(/"_id":"[a-f0-9]+",/g, '')
			.replace(/"rarity":"\w+",/g, '');
		$("#loaderDiv").hide();
		$('#mw-customcollapsible-'+(missionsType)+'DropsJSON').append(
			$('<textarea>', {
				text: text,
				css: { 'height': '300px', 'width': '100%' }
			}),
			$('<button>', {
				class: "wds-button",
				id: "saveDropData",
				text: "Зберегти дані",
				css: { 'height': '30px', 'width': '200px', 'margin':'auto', 'display': 'block' },
				click: function(e) { e.preventDefault(); saveToPage(text); }
			})
		);
	}

// зберігає дані на сторінках (Модуль:Переклад/ДропJSON/контракти.json) через апі медіавікі
	function saveToPage(text) {
		var params = {
			action: 'edit',
			title: PAGE_NAME + '.json',
			text: text,
			format: 'json',
			summary: 'Автоматична заміна вмісту [[MediaWiki:GetDropsJSON.js]]'
		},
		api = new mw.Api();

		api.postWithToken( 'csrf', params ).done(function() {
			$('button#saveDropData').text("Успішно збережено").prop("disabled", true);
		});
	}

	// отримує дані та формує з них один об’єкт json
	function callback() {
		var opt = options[missionsType];
		var requests = Array();
		// формує запити та поміщає проміси в змінну
		$.each(opt.load, function(index, link) {
  			requests.push($.ajax({
				url: link,
				dataType: 'json',
			}));
		});
		if (missionsType == "missions" && options.missions.separateDuviriRewards) {
			requests.push($.ajax({
			url: "https://api.warframestat.us/drops/search/Duviri/?grouped_by=location",
			dataType: 'json',
		}));
		}
		// виконує запити і поміщає кожен результат в arguments
		var defer = $.when.apply($, requests);
		defer.done(function() {
			// цикл в якому отримані дані поміщаються в потрібному вигляді в resultData
			for (i=0;i<Object.keys(opt.load).length;i++) {
				var rewardsAlias = Object.keys(opt.load)[i];
				if (rewardsAlias == "missionRewards") resultData = arguments[i][0].missionRewards;
				else resultData[rewardsAlias] = arguments[i][0][rewardsAlias] || arguments[i][0];
			}

			// цикл в якому з resultData видаляються непотрібні дані
			$.each(opt.remove, function(object, entry) {
				if (missionsType == 'missions') delete resultData[entry];
				else delete resultData[object][entry];
			});

			if (missionsType == "missions" && options.missions.separateDuviriRewards) {
				resultData.Duviri = arguments[Object.keys(opt.load).length][0];
				delete resultData.Duviri["Cephalon Simaris, Complete The Duviri Paradox"];
			}

			//завантажує таблицю нагород Дувірі з warframe.com/uk/droptables і конвертує в json
			showResult();
		});
	}
});