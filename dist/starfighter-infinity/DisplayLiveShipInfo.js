//*** Javascript intended to be included on individual ship pages. This
//*** script will pull ship data from Darty's Github page (https://darty11.github.io/)
//*** and will update the ship stat displayed on the wiki with the current
//*** information. The goal is auto-updating ship stats.
//***
//*** Add ?debug=N or #debugN to any page url in order to see debug output.
//***    ?debug=1     Highlight values which have been replaced by this script
//***    ?debug=2     Do not replace any values on the page
//***    ?debug=3     Show the old value and new value side by side
//***
//***
//*** Contributors:
//***   Michael T. Mosier <mtmosier@gmail.com>
//***


var displayLiveShipInfo = {};
displayLiveShipInfo.shipData = null;


//*** Begin Data Load Functions
displayLiveShipInfo.loadShipData = function(data) {
	displayLiveShipInfo.shipData = data;
};
//*** End Data Load Functions


//*** Load the ship data
statUpdateCacheUtils.getCachedShipData(displayLiveShipInfo.loadShipData);


//*** Begin Debugging Functions
displayLiveShipInfo.findShipsByPartialName = function(searchName, shipList) {
	var rtnList = [];

	if (typeof shipList === 'undefined') {
		if (!$.isEmptyObject(displayLiveShipInfo.shipData)) {
			shipList = displayLiveShipInfo.shipData;
		}
	}

	if (!$.isEmptyObject(shipList)) {
		searchName = searchName.toLowerCase();
		for (var prop in shipList) {
			ship = shipList[prop];
			if ("name" in ship) {
				if (ship.name.toLowerCase().indexOf(searchName) !== -1) {
					rtnList.push(ship);
				}
			}
		}
	}

	return rtnList;
};


displayLiveShipInfo.filterShipList = function(filterObj, shipList) {
	var rtnList = [];
	var found = false;

	if (typeof shipList === 'undefined') {
		if (!$.isEmptyObject(displayLiveShipInfo.shipData)) {
			shipList = displayLiveShipInfo.shipData;
		}
	}

	if (!$.isEmptyObject(shipList)) {
		for (var prop in shipList) {
			ship = shipList[prop];

			found = true;
			for (var filterProp in filterObj) {
				if (filterProp in ship) {
					if (filterProp == "race" && filterObj[filterProp] == "ghosts") {
						var humanGhostId = statUpdateUtils.getNPRIdFromName("Human Ghosts");
						var aralienGhostId = statUpdateUtils.getNPRIdFromName("Aralien Ghosts");

						if (ship[filterProp] != humanGhostId && ship[filterProp] != aralienGhostId) {
							found = false;
						}
					} else if (ship[filterProp] != filterObj[filterProp]) {
						found = false;
					}
				} else {
					found = false;
				}
			}

			if (found) {
				rtnList.push(ship);
			}
		}
	}

	return rtnList;
};
//*** End Debugging Functions


//*** Begin Utility Functions
displayLiveShipInfo.getShipInfoByName = function(shipName) {
	var testName = shipName.replace(/\s/g, "_");
	if (testName in displayLiveShipInfo.shipData)
		return displayLiveShipInfo.shipData[testName];

	for (var p in displayLiveShipInfo.shipData) {
		if (displayLiveShipInfo.shipData[p].name.toLowerCase() == shipName.toLowerCase()) {
			return displayLiveShipInfo.shipData[p];
		}
	}

	return false;
};
//*** End Utility Functions


//*** Begin Main Content Functions
displayLiveShipInfo.replaceNprShipListWithDetailedTable = function(pageName) {
	var nprId = statUpdateUtils.getNPRIdFromName(pageName);

	if (nprId !== false && (nprId == "ghosts" || nprId > 1)) {  //*** Humans and Araliens don't count

		var tableList = statUpdateUtils.getDataTableInfoList();
		if (tableList.length > 1) {
			return false;
		}


		var shipSection = $('#Ships');
		if (shipSection.length > 0) {
			var elementToAppendTo = shipSection.parent();
			var filter = { race: nprId };
			var shipsToBeAddedList = displayLiveShipInfo.filterShipList(filter);

			if (shipsToBeAddedList.length > 0) {

				//*** Clear existing ship information
				var nextElem = shipSection.parent().next();

				if (nextElem.length > 0)
					nextElem = nextElem[0];
				else
					nextElem = null;

				if (nextElem && nextElem.nodeName == "UL") {
					nextElem.remove();  //*** No need to hang on to the existing list
				}

				//*** Sort the ship list by mass, then name
				shipsToBeAddedList.sort(function(a,b){
					if (a.mass == b.mass) {
						return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
					}
					if (a.mass < b.mass)  return -1;
					return 1;
				});


				//*** Create the table html, complete with ship values
				var tableHtml = '<table class="wikitable sortable">';
				tableHtml += '<tr>';
				tableHtml += '<th> Ship Name </th><th> Shields </th><th> Lock Angle </th><th> Speed </th><th> Accel </th><th> Turn </th><th> Shield Size </th><th> Mass </th><th> Slots <span style="white-space:nowrap;">(S/U/M/P/L/A)</span></th><th> Drop % </th>';
				tableHtml += '</tr>';

				for (var i = 0; i < shipsToBeAddedList.length; i++) {
					var ship = shipsToBeAddedList[i];

					tableHtml += '<tr>';
					tableHtml += '<td>' + statUpdateUtils.addWikiLinkToPhrase(ship.name) + '</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(ship.maxShield) + '</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(ship.lockingAngle) + '&deg;</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(statUpdateUtils.roundToDecPlaces(ship.maxSpeed * statUpdateSettings.shipBaseSpeedMult, 4)) + '</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(statUpdateUtils.roundToDecPlaces(ship.accel * 100, 2)) + '</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(statUpdateUtils.roundToDecPlaces(ship.turning * 30, 2)) + '&deg;/s</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(statUpdateUtils.roundToDecPlaces(ship.shieldSize, 2)) + '</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(statUpdateUtils.roundToDecPlaces(ship.mass, 3)) + '</td>';
					tableHtml += '<td>';
					tableHtml += ship.standardSecondary + ' / ';
					tableHtml += ship.utilitySecondary + ' / ';
					tableHtml += ship.mineSecondary + ' / ';
					tableHtml += ship.proximitySecondary + ' / ';
					tableHtml += ship.largeSecondary + ' / ';
					tableHtml += ship.augmentations + '';
					tableHtml += '</td>';
					tableHtml += '<td>' + statUpdateUtils.escapeHtml(statUpdateUtils.roundToDecPlaces(ship.specialDropLikelihood * 100, 0)) + '%</td>';
					tableHtml += '</tr>';
				}

				tableHtml += '</table>';

				//*** Add new table to the page
				elementToAppendTo.after($(tableHtml));
			}
		}
	}
};


displayLiveShipInfo.loadShipDetails = function(shipName) {

	var tableList = statUpdateUtils.getDataTableInfoList();
	var debugLevel = statUpdateUtils.getDebugLevel();

	if (debugLevel == 2) {
		console.log("Not replacing ship details. Showing original values. (Debug mode 2)");
		return;
	}

	if (shipName === "") {
		console.log("Ship name not found.");
		return;
	}

	var shipData = displayLiveShipInfo.getShipInfoByName(shipName);

	//*** Ship not found
	if (shipData === false) {
		console.log("No ships with the name [" + shipName + "] found in imported data.");
		return;
	}

	console.log(shipData);


	var replacementHtml = "";

	if ("description" in shipData && shipData.description !== "") {
		//*** NPR ship descriptions are blank or worse, incorrect
		if ("race" in shipData && shipData.race < 2) {
			var descriptionSection = $("h2 #Game_Description, h2 #In_Game_Description, h2 #Ingame_Description");
			descriptionSection.each(function(){
				var descElem = $(this).parent().next("p");
				while (descElem.length) {
					descElem.remove();
					descElem = $(this).parent().next("p");
				}
			});

			var description = statUpdateUtils.addWikiLinksToText(shipData.description);
			$("<p class=\"updatedDesc\"><i>" + description + "</i></p>").insertAfter(descriptionSection.parent());
			if (debugLevel == 1 || debugLevel == 3) {
				$(".updatedDesc").addClass("updatedValue");
			}
		}
	}

	if ("race" in shipData && shipData.race >= 0 && shipData.race in constants.races) {
		replacementHtml = constants.races[shipData.race].name;
		statUpdateUtils.updateStatElementDisplay($('[data-source=race] div.pi-data-value'), replacementHtml);
	}
	if ("unlockLevel" in shipData && shipData.unlockLevel >= 0) {
		replacementHtml = shipData.unlockLevel;
		statUpdateUtils.updateStatElementDisplay($('[data-source=unlock_level] div.pi-data-value'), replacementHtml);
	}
	if ("price" in shipData && shipData.price > 0) {
		replacementHtml = statUpdateUtils.roundToSignificantAmount(shipData.price * 1.17645);
		statUpdateUtils.updateStatElementDisplay($('[data-source=price] div.pi-data-value'), replacementHtml);
	}
	if ("lifePrice" in shipData && shipData.lifePrice > 0) {
		replacementHtml = shipData.lifePrice;
		statUpdateUtils.updateStatElementDisplay($('[data-source=life_cost] div.pi-data-value'), replacementHtml);
	}
	if ("maxShield" in shipData && shipData.maxShield > 0) {
		replacementHtml = shipData.maxShield;
		statUpdateUtils.updateStatElementDisplay($('[data-source=shields] div.pi-data-value'), replacementHtml);
	}
	if ("maxSpeed" in shipData && shipData.maxSpeed > 0) {
		replacementHtml = statUpdateUtils.roundToDecPlaces(shipData.maxSpeed * statUpdateSettings.shipBaseSpeedMult, 4);
		statUpdateUtils.updateStatElementDisplay($('[data-source=speed] div.pi-data-value'), replacementHtml);
	}
	if ("shieldSize" in shipData && shipData.shieldSize > 0) {
		replacementHtml = statUpdateUtils.roundToDecPlaces(shipData.shieldSize, 2);
		statUpdateUtils.updateStatElementDisplay($('[data-source=shield_radius] div.pi-data-value'), replacementHtml);
	}
	if ("accel" in shipData && shipData.accel > 0) {
		replacementHtml = statUpdateUtils.roundToDecPlaces(shipData.accel * 100, 2);
		statUpdateUtils.updateStatElementDisplay($('[data-source=acceleration] div.pi-data-value'), replacementHtml);
	}
	if ("turning" in shipData && shipData.turning > 0) {
		replacementHtml = statUpdateUtils.roundToDecPlaces(shipData.turning * 30, 2) + "&deg;/s";
		statUpdateUtils.updateStatElementDisplay($('[data-source=turning] div.pi-data-value'), replacementHtml);
	}
	if ("lockingAngle" in shipData && shipData.lockingAngle > 0) {
		replacementHtml = statUpdateUtils.roundToDecPlaces(shipData.lockingAngle, 4);
		statUpdateUtils.updateStatElementDisplay($('[data-source=locking] div.pi-data-value'), replacementHtml);
	}
	if ("cargoAmount" in shipData && shipData.cargoAmount > 0) {
		replacementHtml = shipData.cargoAmount;
		statUpdateUtils.updateStatElementDisplay($('[data-source=cargo] div.pi-data-value'), replacementHtml);
	}
	if ("mass" in shipData && shipData.mass > 0) {
		replacementHtml = statUpdateUtils.roundToDecPlaces(shipData.mass, 2);
		statUpdateUtils.updateStatElementDisplay($('[data-source=mass] div.pi-data-value'), replacementHtml);
	}
	if ("standardSecondary" in shipData && shipData.standardSecondary >= 0) {
		replacementHtml = shipData.standardSecondary;
		statUpdateUtils.updateStatElementDisplay($('[data-source=standard] div.pi-data-value'), replacementHtml);
	}
	if ("utilitySecondary" in shipData && shipData.utilitySecondary >= 0) {
		replacementHtml = shipData.utilitySecondary;
		statUpdateUtils.updateStatElementDisplay($('[data-source=utility] div.pi-data-value'), replacementHtml);
	}
	if ("mineSecondary" in shipData && shipData.mineSecondary >= 0) {
		replacementHtml = shipData.mineSecondary;
		statUpdateUtils.updateStatElementDisplay($('[data-source=mine] div.pi-data-value'), replacementHtml);
	}
	if ("proximitySecondary" in shipData && shipData.proximitySecondary >= 0) {
		replacementHtml = shipData.proximitySecondary;
		statUpdateUtils.updateStatElementDisplay($('[data-source=proximity] div.pi-data-value'), replacementHtml);
	}
	if ("largeSecondary" in shipData && shipData.largeSecondary >= 0) {
		replacementHtml = shipData.largeSecondary;
		statUpdateUtils.updateStatElementDisplay($('[data-source=large] div.pi-data-value'), replacementHtml);
	}
	if ("augmentations" in shipData && shipData.augmentations >= 0) {
		replacementHtml = shipData.augmentations;
		statUpdateUtils.updateStatElementDisplay($('[data-source=augmentations] div.pi-data-value'), replacementHtml);
	}
	if ("turretSlot" in shipData && shipData.turretSlot >= 0) {
		if (shipData.turretSlot === false) {
			replacementHtml = "None";
			statUpdateUtils.updateStatElementDisplay($('[data-source=turrets] div.pi-data-value'), replacementHtml);
		} else {
			//*** We don't have turret count available, so let's leave this field as a player entered value.
		}
	}
};


displayLiveShipInfo.performPageStatReplacements = function() {
	if (
		!$.isEmptyObject(displayLiveShipInfo.shipData)
		&& typeof constants !== 'undefined'
		&& constants !== null
		&& statUpdateUtils.isReady
	) {
		var pageName = statUpdateUtils.getPageName();
		displayLiveShipInfo.replaceNprShipListWithDetailedTable(pageName);
		displayLiveShipInfo.loadShipDetails(pageName);
	} else {
		setTimeout(displayLiveShipInfo.performPageStatReplacements, 50);
	}
};
//*** End Main Content Functions



$( document ).ready(function() {
    displayLiveShipInfo.performPageStatReplacements();
});