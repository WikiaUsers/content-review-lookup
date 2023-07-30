(function(mw) {
	'use strict';

	var maps, mapSelect;

	function checkURL() {
		var url = window.location.href;
		var hashIndex = url.indexOf("#");

		if (hashIndex > -1) {
			var map = decodeURI(url.substring(hashIndex+1).replace(/_/g," "));
			if (maps.includes(map)) {
				return map;
			}
		}

		return "Display All Quests";
	}

	function displayEnemyMapInfo() {
		var enemyTables = document.getElementsByClassName("enemy-info-table table");
		for (var j = 0; j < enemyTables.length; j++) {
			var enemyTable = enemyTables[j];
			for (var i = 1; i < enemyTable.rows.length; i++) {
				var row = enemyTable.rows[i];
				if (mapSelect.value == "Display All Quests") {
					row.style.display = "";
				} else {
					if (row.cells[0].innerHTML == mapSelect.value) {
						row.style.display = "";
					} else {
						row.style.display = "none";
					}
				}
			}
		}
	}

	function _populateSelectBox(ele, list, defaultIndex) {
		ele.options.length = 0;
		for (var i = 0; i < list.length; i++) {
			var opt = document.createElement('option');
			opt.innerHTML = list[i];
			opt.value = list[i];
			ele.appendChild(opt);
		}
		ele.selectedIndex = defaultIndex || 0;
	}

	function init($content) {
		var main = $content.find('#EnemyMapDropdown')[0];
		if (!main) return;
		maps = main.textContent;
		main.style.display = '';
		main.innerHTML = '<select id="mapSelect" name="mapSelect"></select>';
	
		mapSelect = $content.find('#mapSelect')[0];
		mapSelect.addEventListener('change', displayEnemyMapInfo);
		var mapList = [];
		mapList.push("Display All Quests");
		
		for (var i = 0; i < maps.length; i++) {
			mapList.push(maps[i]);
		}
		
		_populateSelectBox(mapSelect, mapList);
		mapSelect.value = checkURL();
		displayEnemyMapInfo(mapSelect);
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);