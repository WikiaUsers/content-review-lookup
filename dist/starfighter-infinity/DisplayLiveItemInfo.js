//*** Javascript intended to be included on individual item pages as
//*** well as item list pages. This script will pull item data from Darty's
//*** Github page (https://darty11.github.io/) and will update the item
//*** stat displayed on the wiki with the current information. The goal
//*** is auto-updating item stats.
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

var displayLiveItemInfo = {};

displayLiveItemInfo.weaponData = null;
displayLiveItemInfo.weaponExtData = null;
displayLiveItemInfo.weaponRangeData = null;
displayLiveItemInfo.weaponVariantData = null;
displayLiveItemInfo.weaponCraftableData = null;


//*** Begin Data Load Functions
displayLiveItemInfo.loadWeaponData = function(data) {
	displayLiveItemInfo.weaponData = data;
};

displayLiveItemInfo.loadWeaponRangeAndVariantData = function(weaponRanges, weaponVariants, craftables) {
	displayLiveItemInfo.weaponExtData = weaponRanges;
	displayLiveItemInfo.weaponRangeData = weaponRanges;
	if (!$.isEmptyObject(weaponVariants))  displayLiveItemInfo.weaponVariantData = weaponVariants;
	if (!$.isEmptyObject(craftables))  displayLiveItemInfo.weaponCraftableData = craftables;
};
//*** End Data Load Functions


//*** Load the item data
statUpdateCacheUtils.getCachedItemData(displayLiveItemInfo.loadWeaponData);
statUpdateCacheUtils.getCachedItemExtraData(displayLiveItemInfo.loadWeaponRangeAndVariantData);



//*** Begin Debugging Functions
displayLiveItemInfo.findItemsByPartialName = function(searchName, itemList) {
	var rtnList = [];

	if (typeof itemList === 'undefined') {
		if (!$.isEmptyObject(displayLiveItemInfo.weaponData)) {
			itemList = displayLiveItemInfo.weaponData;
		}
	}

	if (!$.isEmptyObject(itemList)) {
		searchName = searchName.toLowerCase();
		for (var prop in itemList) {
			item = itemList[prop];
			if ("name" in item) {
				if (item.name.toLowerCase().indexOf(searchName) !== -1) {
					rtnList.push(item);
				}
			}
		}
	}

	return rtnList;
};


displayLiveItemInfo.filterItemList = function(filterObj, itemList) {
	var rtnList = [];
	var found = false;

	if (typeof itemList === 'undefined') {
		if (!$.isEmptyObject(displayLiveItemInfo.weaponData)) {
			itemList = displayLiveItemInfo.weaponData;
		}
	}

	if (!$.isEmptyObject(itemList)) {
		for (var prop in itemList) {
			item = itemList[prop];

			found = true;
			for (var filterProp in filterObj) {
				if (filterProp in item) {
					if (filterProp == "race" && filterObj[filterProp] == "ghosts") {
						var humanGhostId = statUpdateUtils.getNPRIdFromName("Human Ghosts");
						var aralienGhostId = statUpdateUtils.getNPRIdFromName("Aralien Ghosts");

						if (item[filterProp] != humanGhostId && item[filterProp] != aralienGhostId) {
							found = false;
						}
					} else if (item[filterProp] != filterObj[filterProp]) {
						found = false;
					}
				} else {
					found = false;
				}
			}

			if (found) {
				rtnList.push(item);
			}
		}
	}

	return rtnList;
};
//*** End Debugging Functions



//*** Begin Utility Functions
displayLiveItemInfo.initialize = function() {
	var funcItemsToNotDisplay = [];
	var itemName = "", itemId = '';
	var idx = 0;


	if (typeof itemsToSkipInUncategorizedList === 'undefined') {
		itemsToSkipInUncategorizedList = [];
	}

	if (Array.isArray(itemsToSkipInUncategorizedList)) {
		for (var i = 0; i < itemsToSkipInUncategorizedList.length; i++) {
			itemName = itemsToSkipInUncategorizedList[i].toLowerCase().trim();
			if (!funcItemsToNotDisplay.includes(itemName))
				funcItemsToNotDisplay.push(itemName);
		}
	}

	for (var rid in constants.races) {
		raceInfo = constants.races[rid];
		if (Array.isArray(raceInfo.omitFromLoot)) {
			for (idx in raceInfo.omitFromLoot) {
				itemId = raceInfo.omitFromLoot[idx];
				if (itemId in displayLiveItemInfo.weaponData) {
					itemName = displayLiveItemInfo.weaponData[itemId].name.toLowerCase().trim();
					if (!funcItemsToNotDisplay.includes(itemName))
						funcItemsToNotDisplay.push(itemName);
				}
			}
		}
		if (Array.isArray(raceInfo.dontUse)) {
			for (idx in raceInfo.dontUse) {
				itemId = raceInfo.omitFromLoot[idx];
				if (itemId in displayLiveItemInfo.weaponData) {
					itemName = displayLiveItemInfo.weaponData[itemId].name.toLowerCase().trim();
					if (!funcItemsToNotDisplay.includes(itemName))
						funcItemsToNotDisplay.push(itemName);
				}
			}
		}
	}

	for (var p in displayLiveItemInfo.weaponCraftableData) {
		craftingData = displayLiveItemInfo.weaponCraftableData[p];
		if (craftingData.levels > craftingData.locations.length) {
			for (idx = craftingData.locations.length; idx < craftingData.items.length; idx++) {
				itemId = craftingData.items[idx];
				if (itemId in displayLiveItemInfo.weaponData) {
					itemName = displayLiveItemInfo.weaponData[itemId].name.toLowerCase().trim();
					if (!funcItemsToNotDisplay.includes(itemName))
						funcItemsToNotDisplay.push(itemName);
				}
			}
		}
	}

	itemsToSkipInUncategorizedList = funcItemsToNotDisplay;
};


displayLiveItemInfo.isItemHidden = function(item) {
	if (Array.isArray(racesToSkipInUncategorizedList)) {
		if (item.race > 0 && racesToSkipInUncategorizedList.includes(constants.races[item.race].name)) {
			return true;
		}
	}
	if (Array.isArray(itemsToSkipInUncategorizedList)) {
		if (itemsToSkipInUncategorizedList.includes(item.name.toLowerCase().trim())) {
			return true;
		}
	}

	return false;
};


displayLiveItemInfo.getItemRange = function(item) {
	var range = null;

	if ("guidance" in item && item.guidance in constants.lookup.guidance) {
		switch (constants.lookup.guidance[item.guidance]) {
			case "UNGUIDED":  //*** 0
			case "ATTACHED":  //*** 2
			case "NO_COLLISION":  //*** 3
			case "RADIAL_FIRE":  //*** 4
			case "ATTACHED_TO_TARGET":  //*** 5
				if (
					"maxSpeed" in item && item.maxSpeed > 0
					&& "life" in item && item.life > 0
				) {
					range = 0;
					if (
						"initSpeed" in item && item.initSpeed > 0
						&& "acceleration" in item && item.acceleration > 0
					) {
						//*** Calculate the range up to max speed, then adjust life to compensate
					}

					range += item.maxSpeed * item.life;
				}
				break;

			case "HOMING":  //*** 1
				//*** We'll let the default case cover us for homing to avoid unnecessary duplicate code
				break;
		}
	}

	//*** Fallback default value
	if (range === null) {
		if ("lockingRange" in item && item.lockingRange > 0) {
			range = item.lockingRange;
		}
	}

	return range;
};


displayLiveItemInfo.shortenSkillName = function(skillName) {
	skillName = skillName.toUpperCase();
	if (skillName == "EXPLOSIVES")  return "EX";
	if (skillName == "LIGHT")  return "LT";
	if (skillName == "PROGRAMMING")  return "PR";
	if (skillName == "SHIELDS")  return "SH";
	return skillName.substring(0,1);
};


displayLiveItemInfo.splitVarientAndName = function(input) {
	var varientList1 = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X" ];
	var varientList2 = [ "ONE", "TWO", "THREE" ];
	var varientList3 = [ "1", "2", "3" ];

	var parts = input.trim().split(" ");
	var name = input;
	var varient = parts[parts.length - 1].toUpperCase();

	var varientIndex = varientList1.indexOf(varient);
	if (varientIndex === -1) {
		varientIndex = varientList2.indexOf(varient);
	}
	if (varientIndex === -1) {
		varientIndex = varientList3.indexOf(varient);
	}
	if (varientIndex !== -1) {
		name = name.substring(0, name.lastIndexOf(" " + parts[parts.length - 1]));
	} else {
		varient = false;
	}
	return { name: name, varient: varient, varientIndex: varientIndex };
};


displayLiveItemInfo.getUniqueVarientValues = function(propName, varientList) {
	var value = null;
	var valueList = [];
	for (var idx in varientList) {
		item = varientList[idx];

		value = null;
		if (propName == "lockingRange") {
			value = displayLiveItemInfo.getItemRange(item);
		} else if (propName in item) {
			value = item[propName];
		}

		if (value !== null) {
			if (valueList.indexOf(value) === -1) {
				valueList[valueList.length] = value;
			}
		}
	}
	return valueList;
};


displayLiveItemInfo.getVarientDescription = function(varientList) {
	var valueList = [];
	var valueVarientList = [];
	var idx = null;

	for (idx in varientList) {
		item = varientList[idx];
		var nameObj = displayLiveItemInfo.splitVarientAndName(item.name);
		var desc = displayLiveItemInfo.getItemDescription(item);
		var valueIdx = valueList.indexOf(desc);
		if (valueIdx === -1) {
			valueIdx = valueList.length;
			valueList[valueIdx] = desc;
			valueVarientList[valueIdx] = "Level " + nameObj.varient;
		} else {
			valueVarientList[valueIdx] += ", " + nameObj.varient;
		}
	}

	var html = "";
	if (valueList.length > 1) {
		for (idx in valueList) {
			html += "<p class=\"updatedDesc\">" + valueList[idx] + " - " + valueVarientList[idx] + "</p>";
		}
	} else if (valueList.length == 1) {
		html = "<p class=\"updatedDesc\">" + valueList[0] + "</p>";
	}

	return html;
};


displayLiveItemInfo.getItemDescription = function(item, suppressWikiLinks) {
	var extItemData = displayLiveItemInfo.getExtDataForItem(item);
	var description = "";
	if (extItemData && "description" in extItemData && extItemData.description !== "") {
		description = extItemData.description;
		description = description.replace(/\[lockingRange\]/g, displayLiveItemInfo.getItemRange(item) + "su");
		if ("range" in extItemData && extItemData.range in displayLiveItemInfo.weaponData) {
			description = description.replace(/\[weapon\]/g, displayLiveItemInfo.weaponData[extItemData.range].name);
		}
		if ("subWeaponID" in item && item.subWeaponID in displayLiveItemInfo.weaponData) {
			var subItem = displayLiveItemInfo.weaponData[item.subWeaponID];
			var nameObj = displayLiveItemInfo.splitVarientAndName(subItem.name);
			description = description.replace(/\[subWeapon\]/g, nameObj.name);

			if ("lockingRange" in subItem) {
				description = description.replace(/\[subWeaponLockingRange\]/g, displayLiveItemInfo.getItemRange(subItem));
			}
		}
		if ("life" in item && item.life > 0) {
			description = description.replace(/\[lifeTime\]/g, statUpdateUtils.roundToDecPlaces(item.life, 1));
			description = description.replace(/\[life\]/g, statUpdateUtils.roundToDecPlaces(item.life, 1));
		}
		if ("effect" in item && item.effect >= 0) {
			description = description.replace(/\[effect\]/g, constants.effects[item.effect].name);
		}
		if ("amount" in item && item.amount >= 0) {
			description = description.replace(/\[amount\]/g, item.amount);
		}
		if ("lockingRange" in item && item.lockingRange >= 0) {
			description = description.replace(/\[lockingRange\]/g, displayLiveItemInfo.getItemRange(item));
		}
		if ("level" in item && item.level >= 0) {
			description = description.replace(/\[level\]/g, item.level + 1);
			description = description.replace(/\[levelPlusTwo\]/g, item.level + 2);
		}
		if ("effectAmount" in item) {
			description = description.replace(/\[effectPerc\]/g, statUpdateUtils.roundToDecPlaces(item.effectAmount * 100, 0) + "%");
			description = description.replace(/\[invEffectPerc\]/g, statUpdateUtils.roundToDecPlaces((1-item.effectAmount) * 100, 0) + "%");
		}
		if ("effectTime" in item) {
			description = description.replace(/\[effectTime\]/g, item.effectTime);
			description = description.replace(/\[effectPerc\]/g, statUpdateUtils.roundToDecPlaces(item.effectTime * 100, 0) + "%");
		}
	}

	if (typeof suppressWikiLinks === "undefined" || !suppressWikiLinks) {
		description = statUpdateUtils.addWikiLinksToText(description);
	}
	return description;
};


displayLiveItemInfo.getCraftingDataForItem = function(item) {
	var craftingItemData = false;
	var nameObj = displayLiveItemInfo.splitVarientAndName(item.name);

	if (typeof displayLiveItemInfo.weaponExtData === 'object' && displayLiveItemInfo.weaponExtData !== null) {
		var craftingItemDataName = nameObj.name.replace(/ /g, "_");
		var craftingItemDataNameAlt = craftingItemDataName;
		var craftingItemDataNameAlt2 = craftingItemDataName;
		if (nameObj.varient !== false) {
			craftingItemDataNameAlt += "_[name]";
			craftingItemDataNameAlt2 += "_[n]";
			craftingItemDataName += "_[x]";
		}

		if (craftingItemDataName in displayLiveItemInfo.weaponCraftableData) {
			craftingItemData = displayLiveItemInfo.weaponCraftableData[craftingItemDataName];
		} else if (craftingItemDataNameAlt in displayLiveItemInfo.weaponCraftableData) {
			craftingItemData = displayLiveItemInfo.weaponCraftableData[craftingItemDataNameAlt];
		} else if (craftingItemDataNameAlt2 in displayLiveItemInfo.weaponCraftableData) {
			craftingItemData = displayLiveItemInfo.weaponCraftableData[craftingItemDataNameAlt2];
		} else {
			//*** SHORTCUT FAILED.  WALK THE EXT DATA LIST TO FIND A MATCH
			craftingItemDataName = craftingItemDataName.replace(/_/g, " ").toLowerCase();
			craftingItemDataNameAlt = craftingItemDataNameAlt.replace(/_/g, " ").toLowerCase();
			craftingItemDataNameAlt2 = craftingItemDataNameAlt2.replace(/_/g, " ").toLowerCase();
			for (var p in displayLiveItemInfo.weaponCraftableData) {
				var testName = displayLiveItemInfo.weaponCraftableData[p].name.toLowerCase();
				if (testName === craftingItemDataName || testName === craftingItemDataNameAlt || testName === craftingItemDataNameAlt2) {
					craftingItemData = displayLiveItemInfo.weaponCraftableData[p];
					break;
				}
			}
		}
	}

	return craftingItemData;
};


displayLiveItemInfo.getExtDataForItem = function(item) {
	var extItemData = false;
	var nameObj = displayLiveItemInfo.splitVarientAndName(item.name);

	if (typeof displayLiveItemInfo.weaponExtData === 'object' && displayLiveItemInfo.weaponExtData !== null) {
		var extItemDataName = nameObj.name.replace(/ /g, "_");
		var extItemDataNameAlt = extItemDataName;
		var extItemDataNameAlt2 = extItemDataName;
		if (nameObj.varient !== false) {
			extItemDataNameAlt += "_[name]";
			extItemDataNameAlt2 += "_[n]";
			extItemDataName += "_[x]";
		}

		if (extItemDataName in displayLiveItemInfo.weaponExtData) {
			extItemData = displayLiveItemInfo.weaponExtData[extItemDataName];
		} else if (extItemDataNameAlt in displayLiveItemInfo.weaponExtData) {
			extItemData = displayLiveItemInfo.weaponExtData[extItemDataNameAlt];
		} else if (extItemDataNameAlt2 in displayLiveItemInfo.weaponExtData) {
			extItemData = displayLiveItemInfo.weaponExtData[extItemDataNameAlt2];
		} else {
			//*** SHORTCUT FAILED.  WALK THE EXT DATA LIST TO FIND A MATCH
			extItemDataName = extItemDataName.replace(/_/g, " ").toLowerCase();
			extItemDataNameAlt = extItemDataNameAlt.replace(/_/g, " ").toLowerCase();
			extItemDataNameAlt2 = extItemDataNameAlt2.replace(/_/g, " ").toLowerCase();
			for (var p in displayLiveItemInfo.weaponExtData) {
				var testName = displayLiveItemInfo.weaponExtData[p].name.toLowerCase();
				if (testName === extItemDataName || testName === extItemDataNameAlt || testName === extItemDataNameAlt2) {
					extItemData = displayLiveItemInfo.weaponExtData[p];
					break;
				}
			}
		}
	}

	return extItemData;
};


displayLiveItemInfo.getListOfWeaponsInDataTables = function(tableInfoList) {
	var itemNamesFoundList = [];

	for (var idx in tableInfoList) {
		var nameIdx = tableInfoList[idx].headers.indexOf('name');
		if (nameIdx >= 0) {
			tableInfoList[idx].element.find("tr").each(function(){
				var cellList = $(this).find("td");
				if (cellList.length > nameIdx) {
					var nameCellVal = $(cellList[nameIdx]).text().trim();
					if (nameCellVal.toLowerCase() == 'name')  return;
					itemNamesFoundList.push(nameCellVal.toLowerCase());
				}
			});
		}
	}

	return itemNamesFoundList;
};


displayLiveItemInfo.updateNprDropCount = function(pageName) {
	var nprId = statUpdateUtils.getNPRIdFromName(pageName);

	if (nprId !== false && (nprId == "ghosts" || nprId > 1)) {  //*** Humans and Araliens don't count
		var tableList = statUpdateUtils.getDataTableInfoList();
		if (tableList.length > 1) {
			return false;
		}

		var filter = { race: nprId };
		var itemsToBeAddedList = displayLiveItemInfo.filterItemList(filter);
		var itemCount = 0;

		if (itemsToBeAddedList.length > 0) {
			for (var idx in itemsToBeAddedList) {
				if (!displayLiveItemInfo.isItemHidden(itemsToBeAddedList[idx])) {
					itemCount++;
				}
			}
		}

		var dropHeadline = $('.mw-headline[id^="Drop"]');
		if (dropHeadline.length > 0) {
			var replacementText = "Drops (" + itemCount + ")";
			dropHeadline.find('b').text(replacementText);

			var dropNavLink = $('[href="#' + dropHeadline.attr('id') + '"]');
			dropNavLink.text(replacementText);
		}
	}
}


displayLiveItemInfo.populateNprDropTable = function(pageName, tableInfoList) {
	var nprId = statUpdateUtils.getNPRIdFromName(pageName);

	if (nprId !== false && (nprId == "ghosts" || nprId > 1)) {  //*** Humans and Araliens don't count
		for (var tblIdx in tableInfoList) {
			var tableInfo = tableInfoList[tblIdx];
			if (tableInfo.title.toLowerCase() == "drops") {
				var filter = { race: nprId };
				var itemsToBeAddedList = displayLiveItemInfo.filterItemList(filter);

				var rowCount = 0;
				tableInfo.element.find("tr").each(function(){
					rowCount++;
					if (rowCount == 1) {
						return;
					}

					$(this).remove();
				});

				if (itemsToBeAddedList.length > 0) {
					itemsToBeAddedList.sort(function(a,b){
						if (a.type == b.type) {
							if (a.type == 3 && a.weaponType != b.weaponType) {
								if (a.weaponType < b.weaponType)  return -1;
								return 1;
							}
							return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
						}
						if (a.type < b.type)  return -1;
						return 1;
					});

					for (var i = 0; i < itemsToBeAddedList.length; i++) {
						var item = itemsToBeAddedList[i];
						if (displayLiveItemInfo.isItemHidden(item)) {
							continue;
						}

						var rowHtml = "<tr><td>" + statUpdateUtils.escapeHtml(item.name) + "</td>";
						for (var x = 0; x < tableInfo.headers.length - 1; x++) {
							rowHtml += "<td>&nbsp;</td>";
						}
						rowHtml += "</tr>";

						tableInfo.element.append(rowHtml);
					}
				}
			}
		}
	}
};


displayLiveItemInfo.replaceNprDropTableWithDetailedTables = function(pageName) {
	var nprId = statUpdateUtils.getNPRIdFromName(pageName);

	if (nprId !== false && (nprId == "ghosts" || nprId > 1)) {  //*** Humans and Araliens don't count

		var tableList = statUpdateUtils.getDataTableInfoList();
		if (tableList.length > 1) {
			return false;
		}


		var dropSection = $('.mw-headline[id^="Drop"]');
		if (dropSection.length > 0) {
			var nextElem = dropSection.parent().next();

			if (nextElem.length > 0)
				nextElem = nextElem[0];
			else
				nextElem = null;

			if (nextElem && nextElem.nodeName == "TABLE") {
				nextElem.remove();  //*** No need to hang on to the existing table
			}


			var elementToAppendTo = dropSection.parent();
			var filter = { race: nprId };
			var itemsToBeAddedList = displayLiveItemInfo.filterItemList(filter);

			if (itemsToBeAddedList.length > 0) {
				itemsToBeAddedList.sort(function(a,b){
					if (a.type == b.type) {
						if (a.type == 3 && a.weaponType != b.weaponType) {
							if (a.weaponType < b.weaponType)  return -1;
							return 1;
						}
						return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
					}
					if (a.type < b.type)  return -1;
					return 1;
				});

				var curType = false;
				var tableInfo = false;
				var headingElement = false;
				for (var i = 0; i < itemsToBeAddedList.length; i++) {
					var item = itemsToBeAddedList[i];

					if (displayLiveItemInfo.isItemHidden(item)) {
						continue;
					}

					var itemType = constants.lookup.type[item.type];
					if (item.type == 3)
						itemType = constants.lookup.weaponType[item.weaponType];

					if (curType != itemType) {
						if (tableInfo) {
							headingElement = $('<h3><span class="mw-headline" id="Npr_Items_' + curType + '"> ' + displayLiveItemInfo.getDisplayTextForItemType(curType) + ' </span></h3>');
							elementToAppendTo.after(headingElement);
							headingElement.after(tableInfo.tableElement);

							elementToAppendTo = tableInfo.tableElement;
						}

						curType = itemType;
						tableInfo = displayLiveItemInfo.getNewTableInfoByItemType(itemType, [], [ "Purchase Cost" ], "nprItems");
					}

					if (tableInfo) {
						var rowHtml = "<tr><td>" + statUpdateUtils.escapeHtml(item.name) + "</td>";
						for (var x = 0; x < tableInfo.columnCount - 1; x++) {
							rowHtml += "<td>&nbsp;</td>";
						}
						rowHtml += "</tr>";

						tableInfo.tableElement.append(rowHtml);
					}
				}

				if (tableInfo) {
					headingElement = $('<h3><span class="mw-headline" id="Npr_Items_' + curType + '"> ' + displayLiveItemInfo.getDisplayTextForItemType(curType) + ' </span></h3>');
					elementToAppendTo.after(headingElement);
					headingElement.after(tableInfo.tableElement);
				}
			}
		}
	}
};

displayLiveItemInfo.getDisplayTextForItemType = function(itemType) {
	switch (itemType) {
		case "PRIMARY_WEAPON":
			return "Primary Weapons";
			break;
		case "STANDARD":
			return "Standard Secondary Weapons";
			break;
		case "UTILITY":
			return "Utilities";
			break;
		case "MINE":
			return "Mines";
			break;
		case "PROXIMITY":
			return "Proximity Weapons";
			break;
		case "LARGE":
			return "Large Weapons";
			break;
		case "AUGMENTATION":
			return "Augmentations";
			break;
		case "ENGINE":
			return "Engines";
			break;
		case "SHIELD":
			return "Shields";
			break;
	}
	return statUpdateUtils.titleCase(itemType);
};


displayLiveItemInfo.replaceCraftedItemsTableWithDetailedTables = function(pageName) {
	if (pageName == "Crafted Items" || pageName == "Crafting") {

		var itemSection = $("[id^=List_of_Crafted_Items]");
		if (itemSection.length > 0) {
			var styleSection = "";
			var nextElem = itemSection.parent().next();

			if (nextElem.length > 0)
				nextElem = nextElem[0];
			else
				nextElem = null;

			if (nextElem && nextElem.nodeName == "TABLE") {
				nextElem.remove();  //*** No need to hang on to the existing table
			}


			var itemsToBeAddedList = displayLiveItemInfo.getCraftableItemList();

			var elementToAppendTo = itemSection.parent();
			var firstWeaponTable = true;
			if (itemsToBeAddedList.length > 0) {
				itemsToBeAddedList.sort(function(a,b){
					if (a.type == b.type) {
						if (a.type == 3 && a.weaponType != b.weaponType) {
							if (a.weaponType < b.weaponType)  return -1;
							return 1;
						}
						return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
					}
					if (a.type < b.type)  return -1;
					return 1;
				});

				var curType = false;
				var tableInfo = false;
				var headingElement = false;
				var tableDivElement = false;
				for (var i = 0; i < itemsToBeAddedList.length; i++) {
					var item = itemsToBeAddedList[i];

					if (displayLiveItemInfo.isItemHidden(item))
						continue;

					if (item.type > 6)
						continue;

					var craftingData = displayLiveItemInfo.getCraftingDataForItem(item);
					if (craftingData === false)
						continue;

					var itemType = constants.lookup.type[item.type];
					if (item.type == 3)
						itemType = constants.lookup.weaponType[item.weaponType];


					if (curType != itemType) {
						if (tableInfo) {
							styleSection = '';
							if (firstWeaponTable)  styleSection = ' style="display: none;"';
							headingElement = $('<h3 onclick="$(this).toggle(); $(this).next().toggle();"' + styleSection + '><span class="mw-headline" id="Crafted_Items_' + curType + '"> ' + displayLiveItemInfo.getDisplayTextForItemType(curType) + ' </span> <span style="font-size: 14px;">[show]</span></h3>');
							elementToAppendTo.after(headingElement);

							styleSection = ' style="display: none;"';
							if (firstWeaponTable)  styleSection = '';
							tableDivElement = $('<div id="Crafted_Items_' + curType + '_Content"' + styleSection + '></div>');
							tableDivElement.append($('<h3 onclick="$(this).parent().toggle(); $(this).parent().prev().toggle();"><span class="mw-headline"> ' + displayLiveItemInfo.getDisplayTextForItemType(curType) + ' </span> <span style="font-size: 14px;">[hide]</span></h3>'));
							tableDivElement.append(tableInfo.tableElement);
							headingElement.after(tableDivElement);

							firstWeaponTable = false;
							elementToAppendTo = tableDivElement;
						}

						curType = itemType;
						tableInfo = displayLiveItemInfo.getNewTableInfoByItemType(itemType, [ "BP Location" ], [ "Cost", "Purchase Cost" ], "craftedItems");
					}

					if (tableInfo) {
						var rowHtml = "<tr><td>" + statUpdateUtils.escapeHtml(item.name) + "</td>";
						for (var x = 0; x < tableInfo.columnCount - 1; x++) {
							rowHtml += "<td>&nbsp;</td>";
						}
						rowHtml += "</tr>";

						tableInfo.tableElement.append(rowHtml);
					}
				}

				if (tableInfo) {
					styleSection = '';
					if (firstWeaponTable)  styleSection = ' style="display: none;"';
					headingElement = $('<h3 onclick="$(this).toggle(); $(this).next().toggle();"' + styleSection + '><span class="mw-headline" id="Crafted_Items_' + curType + '"> ' + displayLiveItemInfo.getDisplayTextForItemType(curType) + ' </span> <span style="font-size: 14px;">[show]</span></h3>');
					elementToAppendTo.after(headingElement);

					styleSection = ' style="display: none;"';
					if (firstWeaponTable)  styleSection = '';
					tableDivElement = $('<div id="Crafted_Items_' + curType + '_Content"' + styleSection + '></div>');
					tableDivElement.append($('<h3 onclick="$(this).parent().toggle(); $(this).parent().prev().toggle();"><span class="mw-headline"> ' + displayLiveItemInfo.getDisplayTextForItemType(curType) + ' </span> <span style="font-size: 14px;">[hide]</span></h3>'));
					tableDivElement.append(tableInfo.tableElement);
					headingElement.after(tableDivElement);
				}
			}

			//itemSection.parent().remove();
		}
	}
};


displayLiveItemInfo.getNewTableInfoByItemType = function(itemType, additionalFields, fieldsToSkip, additionalClassName) {

	var fieldListStr = "";
	var fieldListCount = 0;
	var fieldList = [];

	switch (itemType) {
		case "PRIMARY_WEAPON":
		case "STANDARD":
			fieldList = [ "Name", "Dmg", "ROF", "DPS", "Amt", "Spd", "LT", "Acc", "Rng", "EU", "DPE", "Effect", "Skill" ];
			break;
		case "UTILITY":
			fieldList = [ "Name", "AM", "AR", "EU", "ET", "Effect", "Skill", "Range" ];
			break;
		case "MINE":
			fieldList = [ "Name", "DPH", "Amt", "Arm", "Lt", "Effect", "Skill" ];
			break;
		case "PROXIMITY":
			fieldList = [ "Name", "DPH", "ROF", "Arm", "Range", "Ammo", "Effect", "Skill", "Notes" ];
			break;
		case "LARGE":
			fieldList = [ "Name", "Total Ammo", "Skill", "Purchase Cost", "Ammo Cost", "Notes" ];
			break;
		case "AUGMENTATION":
			fieldList = [ "Name", "Notes", "Cost", "Skill" ];
			break;
		case "ENGINE":
			fieldList = [ "Engine Name", "Speed", "Reverse", "Acceleration", "Turning", "Propulsion", "PD", "Autopilot", "Skill" ];
			break;
		case "SHIELD":
			fieldList = [ "Name", "Maximum Charge Multiplier", "Charge Rate", "Charge Delay", "Secondary Effects", "Skill" ];
			break;
		case "COLLECTABLE":
			fieldList = [ "Name" ];
			break;
	}

	if (typeof additionalFields !== 'undefined' && Array.isArray(additionalFields)) {
		for (var idx in additionalFields) {
			fieldList.push(additionalFields[idx]);
		}
	}

	//*** Image should always go last
	fieldList.push("Image");

	//*** Create the field list string
	for (var i = 0; i < fieldList.length; i++) {
		if (typeof fieldsToSkip !== 'undefined' && Array.isArray(fieldsToSkip)) {
			if (fieldsToSkip.indexOf(fieldList[i]) !== -1) {
				continue;
			}
		}
		fieldListStr += "<th> " + statUpdateUtils.escapeHtml(fieldList[i]) + "</th>";
		fieldListCount++;
	}

	if (fieldListStr != "") {
		if (typeof additionalClassName !== "undefined")
			additionalClassName = ' ' + additionalClassName.trim();
		else
			additionalClassName = '';

		var tblElem = $('<table class="wikitable sortable' + statUpdateUtils.escapeHtml(additionalClassName) + '"><tr>' + fieldListStr + '</tr></table>');
		return {
			tableElement: tblElem,
			columnCount: fieldListCount
		};
	}

	return null;
};


displayLiveItemInfo.getCraftableItemList = function() {
	var rtnList = [];

	if (!$.isEmptyObject(displayLiveItemInfo.weaponCraftableData)) {
		for (var idx in displayLiveItemInfo.weaponCraftableData) {
			for (var itemIdx in displayLiveItemInfo.weaponCraftableData[idx].items) {
				var itemId = displayLiveItemInfo.weaponCraftableData[idx].items[itemIdx];
				if (itemId in displayLiveItemInfo.weaponData) {
					rtnList.push(displayLiveItemInfo.weaponData[itemId]);
				}
			}
		}
	}

	return rtnList;
}


displayLiveItemInfo.populateUncategorizedItemsTable = function(pageName, tableInfoList) {
	var idx = null;
	var itemsToBeAddedList = [];
	var itemListPageNames = {  //*** Page name to item type mapping - strictly for convenience
		"Primary Weapons": "PRIMARY_WEAPON",
		"Standard Secondary Weapons": "STANDARD",
		"Utilities": "UTILITY",
		"Mines": "MINE",
		"Proximity Weapons": "PROXIMITY",
		"Large Weapons": "LARGE",
		"Augmentations": "AUGMENTATION",
		"Engines": "ENGINE",
		"Shields": "SHIELD",
	};


	if (tableInfoList && pageName in itemListPageNames) {
		var itemType = itemListPageNames[pageName];
		var itemsDisplayedList = displayLiveItemInfo.getListOfWeaponsInDataTables(tableInfoList);

		for (idx in displayLiveItemInfo.weaponData) {
			var item = displayLiveItemInfo.weaponData[idx];
			if (displayLiveItemInfo.isItemHidden(item)) {
				continue;
			}
			switch (itemType) {
				case "PRIMARY_WEAPON":
					if (constants.lookup.type[item.type] == "PRIMARY_WEAPON") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "STANDARD":
					if (constants.lookup.type[item.type] == "SECONDARY_WEAPON" && constants.lookup.weaponType[item.weaponType] == "STANDARD") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "UTILITY":
					if (constants.lookup.type[item.type] == "SECONDARY_WEAPON" && constants.lookup.weaponType[item.weaponType] == "UTILITY") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "MINE":
					if (constants.lookup.type[item.type] == "SECONDARY_WEAPON" && constants.lookup.weaponType[item.weaponType] == "MINE") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "PROXIMITY":
					if (constants.lookup.type[item.type] == "SECONDARY_WEAPON" && constants.lookup.weaponType[item.weaponType] == "PROXIMITY") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "LARGE":
					if (constants.lookup.type[item.type] == "SECONDARY_WEAPON" && constants.lookup.weaponType[item.weaponType] == "LARGE") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "AUGMENTATION":
					if (constants.lookup.type[item.type] == "AUGMENTATION") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "ENGINE":
					if (constants.lookup.type[item.type] == "ENGINE") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
				case "SHIELD":
					if (constants.lookup.type[item.type] == "SHIELD") {
						if (itemsDisplayedList.indexOf(item.name.toLowerCase().trim()) == -1) {
							itemsToBeAddedList.push(item);
						}
					}
					break;
			}
		}
	}


	if (itemsToBeAddedList.length > 0) {
		var newTableInfo = displayLiveItemInfo.getNewTableInfoByItemType(itemType, [ "Obtained" ], [], "uncategorizedItems");

		var uncatFieldListCount = 0;
		if (newTableInfo) {
			itemsToBeAddedList.sort(function(a,b){return a.name.toLowerCase().localeCompare(b.name.toLowerCase());});
			for (var i = 0; i < itemsToBeAddedList.length; i++) {
				var rowHtml = "<tr><td>" + statUpdateUtils.escapeHtml(itemsToBeAddedList[i].name) + "</td>";
				for (var x = 0; x < newTableInfo.columnCount - 1; x++) {
					rowHtml += "<td>&nbsp;</td>";
				}
				rowHtml += "</tr>";

				newTableInfo.tableElement.append(rowHtml);
			}

			var headingElement = $('<h2><span class="mw-headline" id="Uncategorized_Items"> Uncategorized Items </span></h2>');
			tableInfoList[tableInfoList.length - 1].element.after(headingElement);
			headingElement.after(newTableInfo.tableElement);
		}
	}
};

displayLiveItemInfo.getBPLocationForItem = function(item) {
	var bpLoc = '';

	var craftingData = displayLiveItemInfo.getCraftingDataForItem(item);
	if (craftingData && craftingData.locations.length > 0) {
		var bpLoc = craftingData.locations[0];
		if (craftingData.items.length > 1) {
			var nameParts = displayLiveItemInfo.splitVarientAndName(item.name.trim());
			if (nameParts.varientIndex >= 0 && nameParts.varientIndex < craftingData.locations.length) {
				bpLoc = craftingData.locations[nameParts.varientIndex];

			} else if (nameParts.varientIndex >= 0) {
				//*** Missing blueprint location, probably not in game yet
				bpLoc = "N/A ";  //*** Keep space at the end for the string split below
			}
		}
		bpLoc = bpLoc.substring(0, bpLoc.indexOf(" "));
	}

	return bpLoc;
}
//*** End Utility Functions


//*** Begin Main Content Functions
displayLiveItemInfo.updateTableData = function(data, extData) {

	var debugLevel = statUpdateUtils.getDebugLevel();
	var replacementHtml = "";
	var updateStatElementDisplayOrig = null;

	if (debugLevel == 2) {
		console.log("Not replacing item table details. Showing original values. (Debug mode 2)");
		return;
	}

	var tableInfoList = statUpdateUtils.getDataTableInfoList();
	for (var idx in tableInfoList) {
		tableInfo = tableInfoList[idx];

		var replaceDataInTable = (false == statUpdateUtils.checkIfTableHasMoreRecentData(tableInfo));
		if (!replaceDataInTable) {
			updateStatElementDisplayOrig = statUpdateUtils.updateStatElementDisplay;
			statUpdateUtils.updateStatElementDisplay = statUpdateUtils.updateStatElementDisplayNoReplacement;
		}

		statUpdateUtils.removeRowSpanFromTable(tableInfo);

		tableInfo.element.find("tr").each(function(){
			var col = 0;
			var item = null;
			$(this).find("td").each(function(){
				var value = $(this).text().trim();
				if (col === 0 && value.toLowerCase() == tableInfo.headers[col]) {
					col++;
					return;
				}

				if (item === null && tableInfo.headers[col] === "name") {
					for (var idx2 in data) {
						if (data[idx2].name.trim().toLowerCase() == value.toLowerCase()) {
							item = data[idx2];
							// col++;
							// return;
						}
					}
				}

				if (item !== null) {

					var source = "";
					var sourceClass = "";
					if ("seasonal" in item && item.seasonal) {
						source = "Purchase (Seasonal)";
						sourceClass = "seasonalItem";
					} else if ("buyable" in item && item.buyable) {
						source = "Purchase";
						sourceClass = "storeItem";
					} else if ("race" in item && item.race <= 1) {
						source = "Craft";
						sourceClass = "craftedItem";
					} else if ("race" in item && item.race > 1) {
						source = "Rare Drop";
						sourceClass = "nprItem";
					}


					var isBeam = true;
					if ("initSpeed" in item && item.initSpeed > 0)  isBeam = false;
					if ("maxSpeed" in item && item.maxSpeed > 0)  isBeam = false;
					if ("fireRate" in item && item.fireRate > 0)  isBeam = false;
					if (!("guidance" in item) || item.guidance != 1)  isBeam = false;
					// if (isBeam)  console.log(item.name + " is a Beam weapon");

					switch (tableInfo.headers[col]) {
						case "name":
							if (sourceClass != "") {
								$(this).addClass(sourceClass);
							}
							if (typeof statUpdateUtils.addWikiLinkToPhrase === "function") {
								replacementHtml = $(this).html().trim();
								if (replacementHtml.replace("&nbsp;", "").trim() !== "" && replacementHtml.search(/href=/i) == -1) {
									replacementHtml = statUpdateUtils.addWikiLinkToPhrase(replacementHtml);
									statUpdateUtils.updateStatElementDisplay($(this), replacementHtml);
								}
							}
							break;
						case "image":
						case "img":
							if ("iconName" in item && item.iconName !== "" && $(this).html().replace("&nbsp;", "").trim() === "") {
								// var iconUrl = "http://www.starfighterinfinity.com/sf/sfinew/icons/Items/" + item.iconName + ".png";
								//*** Providing an image proxy from my personal website in order to work around a bad ssl cert on the official site
								var nameObj = displayLiveItemInfo.splitVarientAndName(item.name);
								var iconUrl = "https://mtmosier.com/sf/sfinew/icons/Items/" + item.iconName + ".png";
								var iconHtml = "<img src=\"" + iconUrl + "\" width=\"55\" height=\"55\" alt=\"" + statUpdateUtils.escapeHtml(nameObj.name) + "\" onError=\"this.onerror = '';this.style.visibility='hidden';\">";
								statUpdateUtils.updateStatElementDisplay($(this), iconHtml);
							}
							break;
						case "dph":
						case "dmg":
						case "damage":
							if ("damage" in item) {
								var dmgHtml = item.damage;
								if (isBeam)  dmgHtml += "/s";
								if (
									"amount" in item
									&& item.amount > 1
									// && tableInfo.headers.indexOf("amt") === -1
									// && tableInfo.headers.indexOf("volley") === -1
								) {
									dmgHtml += " x" + item.amount;
								}
								statUpdateUtils.updateStatElementDisplay($(this), dmgHtml);
							}
							break;
						case "obtain":
						case "obtaining":
						case "obtained":
						case "acquisition":
							if (source !== "") {
								statUpdateUtils.updateStatElementDisplay($(this), source);
							}
							if (sourceClass != "") {
								$(this).addClass(sourceClass);
							}
							break;
						case "trn":
						case "turn":
							if ("turning" in item) {
								var turning = statUpdateUtils.roundToDecPlaces(item.turning * 30, 2);
								statUpdateUtils.updateStatElementDisplay($(this), turning);
							}
							break;
						case "destination":
							if ("name" in item && item.name.toLowerCase().indexOf("micro gate") !== false) {
								var dest = displayLiveItemInfo.getItemDescription(item, true);
								dest = dest.replace(/^.*?to travel to the(.*?)star system.*$/, "$1").trim();
								var html = "<a href=\"" + mw.util.wikiGetlink(dest) + "\" title=\"" + dest + " Star System\">" + dest + "</a>";
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "rof":
							if ("fireRate" in item) {
								var fireRate = "";
								if (item.fireRate <= 1) {
									fireRate = statUpdateUtils.roundToDecPlaces(1 / item.fireRate, 1);
									fireRate += " per sec";
								} else {
									fireRate = "1 per ";
									fireRate += statUpdateUtils.roundToDecPlaces(item.fireRate, 1);
									fireRate += " sec";
								}
								statUpdateUtils.updateStatElementDisplay($(this), fireRate);
							}
							break;
						case "dps":
							if ("damage" in item && "fireRate" in item && item.fireRate > 0) {
								var dps = item.damage / item.fireRate;
								if ("amount" in item && item.amount > 0) {
									dps *= item.amount;
								}
								dps = statUpdateUtils.roundToDecPlaces(dps, 1);
								statUpdateUtils.updateStatElementDisplay($(this), dps);
							}
							break;
						case "amt":
						case "amount":
						case "volley":
							if ("amount" in item && item.amount > 0) {
								statUpdateUtils.updateStatElementDisplay($(this), item.amount);
							}
							break;
						case "lt":
						case "lifetime":
							if ("life" in item) {
								var life = statUpdateUtils.roundToDecPlaces(item.life, 1);
								statUpdateUtils.updateStatElementDisplay($(this), life + "s");
							}
							break;
						case "lifetime (s)":
							if ("life" in item) {
								var life = statUpdateUtils.roundToDecPlaces(item.life, 1);
								statUpdateUtils.updateStatElementDisplay($(this), life);
							}
							break;
						case "accuracy":
						case "acccuracy":
						case "acc":
							if ("accuracy" in item) {
								var accuracy = statUpdateUtils.roundToDecPlaces(item.accuracy, 2);
								statUpdateUtils.updateStatElementDisplay($(this), accuracy);
							}
							break;
						case "lrng":
						case "range":
						case "rng":
							if ("lockingRange" in item && item.lockingRange > 0) {
								var lockingRange = statUpdateUtils.roundToDecPlaces(displayLiveItemInfo.getItemRange(item), 2) +"su";
								statUpdateUtils.updateStatElementDisplay($(this), lockingRange);
							}
							break;
						case "rebuy cost":
						case "ammo cost":
							if ("price" in item && item.price > 0) {
								statUpdateUtils.updateStatElementDisplay($(this), item.price);
							}
							break;
						case "purchase cost":
						case "cost":
							if (sourceClass === "seasonalItem" || sourceClass === "storeItem") {
								if ("price" in item && item.price > 0) {
									var price = statUpdateUtils.roundToSignificantAmount(item.price * 1.175);
									statUpdateUtils.updateStatElementDisplay($(this), price);
								}
							} else {
								statUpdateUtils.updateStatElementDisplay($(this), source);
							}
							break;
						case "eu":
						case "energy":
						case "energy usage":
							if ("ammoOrEnergyUsage" in item && "energyBased" in item && item.energyBased) {
								if (isBeam)  statUpdateUtils.updateStatElementDisplay($(this), item.ammoOrEnergyUsage + "/s");
								else  statUpdateUtils.updateStatElementDisplay($(this), item.ammoOrEnergyUsage);
							}
							break;
						case "ar":
							if ("ammoOrEnergyUsage" in item && item.ammoOrEnergyUsage > 0 && "energyBased" in item && !item.energyBased) {
								if (item.weaponType != 5) {
									var html = item.ammoOrEnergyUsage * 5;
									statUpdateUtils.updateStatElementDisplay($(this), html);
								}
							}
							break;
						case "am":
						case "ammo":
						case "total ammo":
							if ("ammoOrEnergyUsage" in item && item.ammoOrEnergyUsage > 0 && "energyBased" in item && !item.energyBased) {
								var html = item.ammoOrEnergyUsage;
								if (item.weaponType != 5 && tableInfo.headers.indexOf("ar") === -1) {
									html += " ("+(item.ammoOrEnergyUsage * 5)+")";
								}
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "arm":
						case "arming time":
							if ("armingTime" in item) {
								statUpdateUtils.updateStatElementDisplay($(this), statUpdateUtils.roundToDecPlaces(item.armingTime, 2) + "s");
							}
							break;
						case "velocity":
						case "spd":
							if ("maxSpeed" in item) {
								statUpdateUtils.updateStatElementDisplay($(this), statUpdateUtils.roundToDecPlaces(item.maxSpeed, 2) + " su/s");
							}
							break;
						case "effects":
						case "effect":
						case "efect":
							if ("effect" in item && item.effect >= 0) {
								var html = constants.effects[item.effect].name;
								if (item.effectTime > 0 && tableInfo.headers.indexOf("et") === -1) {
									html += " (" + statUpdateUtils.roundToDecPlaces(item.effectTime, 0) + "s)";
								}
								statUpdateUtils.updateStatElementDisplay($(this), html);

							} else if (tableInfo.headers.indexOf("notes") === -1) {

								if (item.name.indexOf("Chain Laser") !== -1) {
									var desc = displayLiveItemInfo.getItemDescription(item);
									if (desc != "") {
										statUpdateUtils.updateStatElementDisplay($(this), desc);
									}
								}
							}
							break;
						case "et":
							if ("effect" in item && item.effect >= 0 && "effectTime" in item && item.effectTime > 0) {
								var html = statUpdateUtils.roundToDecPlaces(item.effectTime, 0) + "s";
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "dpe":
							if ("energyBased" in item && item.energyBased) {
								if ("damage" in item && "ammoOrEnergyUsage" in item && item.ammoOrEnergyUsage > 0) {
									var damage = item.damage;
									if ("amount" in item && item.amount > 0) {
										damage *= item.amount;
									}
									var dpe = damage / item.ammoOrEnergyUsage;
									dpe = statUpdateUtils.roundToDecPlaces(dpe, 2);
									statUpdateUtils.updateStatElementDisplay($(this), dpe);
								}
							}
							break;
						case "skill":
							if ("skillRequirement" in item && item.skillRequirement.skill >= 0) {
								var skill = "N/A";
								if (item.skillRequirement.level > 0) {
									skill = displayLiveItemInfo.shortenSkillName(constants.skills[item.skillRequirement.skill].name);
									skill += "&nbsp;" + item.skillRequirement.level;
								}
								statUpdateUtils.updateStatElementDisplay($(this), skill);
							}
							break;
						case "secondary effects":
							if (tableInfo.headers.indexOf("notes") !== -1) {
								break;
							}
						case "notes":
							var desc = displayLiveItemInfo.getItemDescription(item);
							if (desc != "") {
								statUpdateUtils.updateStatElementDisplay($(this), desc);
							}
							break;

						//*** TODO -- Add blueprint location data
						case "bp location":
							bpLoc = displayLiveItemInfo.getBPLocationForItem(item);
							if (bpLoc != "") {
								statUpdateUtils.updateStatElementDisplay($(this), bpLoc);
							}
							break;

						//*** Begin Shield Fields
						case "maximum charge multiplier":
							if ("maxModifier" in item && item.maxModifier > 0) {
								var html = "x" + statUpdateUtils.roundToDecPlaces(item.maxModifier, 4);
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "charge rate":
							if ("chargeModifier" in item && item.chargeModifier >= 0) {
								var html = "x" + statUpdateUtils.roundToDecPlaces(item.chargeModifier, 4);
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "charge delay":
							if ("chargeDelay" in item && item.chargeDelay >= 0) {
								var html = statUpdateUtils.roundToDecPlaces(item.chargeDelay, 4) + "s";
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						//*** End Shield Fields
						//*** Begin Engine Fields
						case "speed":
							if ("maxSpeedMod" in item && item.maxSpeedMod > 0) {
								var html = "x" + statUpdateUtils.roundToDecPlaces(item.maxSpeedMod, 4);
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "reverse":
							if ("reverseSpeedMod" in item && item.reverseSpeedMod > 0) {
								var html = statUpdateUtils.roundToDecPlaces(item.reverseSpeedMod * 100, 1) + "%";
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "acceleration":
							if ("accelMod" in item && item.accelMod > 0) {
								var html = "x" + statUpdateUtils.roundToDecPlaces(item.accelMod, 4);
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "turning":
							if ("turningMod" in item && item.turningMod > 0) {
								var html = "x" + statUpdateUtils.roundToDecPlaces(item.turningMod, 4);
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "propulsion":
							if ("propulsionEnhance" in item && item.propulsionEnhance > 0) {
								var html = "x" + statUpdateUtils.roundToDecPlaces(item.propulsionEnhance, 4);
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "pd":
						case "prop time":
							if ("propulsionEnhanceTime" in item && item.propulsionEnhanceTime > 0) {
								var html = statUpdateUtils.roundToDecPlaces(item.propulsionEnhanceTime, 4) + " sec";
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						case "autopilot":
							if ("autoPilotSpeedInc" in item && item.autoPilotSpeedInc > 0) {
								var html = "+" + statUpdateUtils.roundToDecPlaces(item.autoPilotSpeedInc, 4);
								statUpdateUtils.updateStatElementDisplay($(this), html);
							}
							break;
						//*** End Engine Fields
						//*** Begin NPR Page Fields
						case "type":
							replacementHtml = "";
							if (item.type == 3 && "weaponType" in item) {
								replacementHtml = constants.lookup.weaponType[item.weaponType];
								replacementHtml += " Secondary";
							} else {
								replacementHtml = constants.lookup.type[item.type];
							}
							replacementHtml = statUpdateUtils.titleCase(replacementHtml);
							statUpdateUtils.updateStatElementDisplay($(this), replacementHtml);
							break;
						//*** End NPR Page Fields
					}
				}

				col++;
			});
		});

		if (!replaceDataInTable) {
			statUpdateUtils.updateStatElementDisplay = updateStatElementDisplayOrig;
		}

		statUpdateUtils.restoreTableRowSpan(tableInfo);
	}
};


displayLiveItemInfo.loadItemDetails = function(itemName, data, extData) {

	var tableList = statUpdateUtils.getDataTableInfoList();
	var debugLevel = statUpdateUtils.getDebugLevel();
	itemName = itemName.trim();

	if (debugLevel == 2) {
		console.log("Not replacing item details. Showing original values. (Debug mode 2)");
		return;
	}

	if (itemName === "") {
		console.log("Item name not found.");
		return;
	}

	var nameObj = displayLiveItemInfo.splitVarientAndName(itemName);

	if (typeof data === 'object' && data !== null) {
		var itemVarientList = [];
		for (var prop in data) {
			item = data[prop];
			if (typeof item === 'object' && item !== null && "name" in item) {
				var loopNameObj = displayLiveItemInfo.splitVarientAndName(item.name.trim());
				if (loopNameObj.name.toLowerCase() == nameObj.name.toLowerCase()) {
					itemVarientList[item.level + 0] = item;
				}
			}
		}
	}

	//*** ITEM NOT FOUND
	if (itemVarientList.length === 0) {
		if (tableList.length > 0)  return displayLiveItemInfo.updateTableData(data, extData);

		console.log("No items with the name [" + nameObj.name + "] found in imported data.");
		return;
	}

	item = itemVarientList[0];

	console.log(item);
	if (itemVarientList.length > 1)
		console.log(itemVarientList);



	var valList = [];
	var replacementHtml = "";


	if ("weaponType" in item && item.weaponType >= 0) {
		replacementHtml = constants.lookup.weaponType[item.weaponType];
		replacementHtml = replacementHtml.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
		  return $1.toUpperCase();
		});
		statUpdateUtils.updateStatElementDisplay($('[data-source=weapon_type] div.pi-data-value'), replacementHtml);
	}


	var descHtml = displayLiveItemInfo.getVarientDescription(itemVarientList);
	if (descHtml != "") {
		var descriptionSection = $("h2 #Game_Description, h2 #In_Game_Description, h2 #Ingame_Description");
		descriptionSection.each(function(){
			var descElem = $(this).parent().next("p");
			while (descElem.length) {
				descElem.remove();
				descElem = $(this).parent().next("p");
			}
		});
		$(descHtml).insertAfter(descriptionSection.parent());
		if (debugLevel == 1 || debugLevel == 3) {
			$(".updatedDesc").addClass("updatedValue");
		}
	}

	if ("guidance" in item) {
		replacementHtml = "False";
		if (item.guidance == 1)
			replacementHtml = "True";
		statUpdateUtils.updateStatElementDisplay($('[data-source=requires_lock] div.pi-data-value'), replacementHtml);
	}



	if (tableList.length > 0)  return displayLiveItemInfo.updateTableData(data, extData);




	//*** MULTIPLE VARIENTS REQUIRE SPECIAL DISPLAY LOGIC
	valList = displayLiveItemInfo.getUniqueVarientValues("skillRequirement", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1].skill >= 0) {
		replacementHtml = constants.skills[item.skillRequirement.skill].name + " ";
		for (var idx in valList) {
			if (idx > 0) replacementHtml += " / ";
			replacementHtml += valList[idx].level;
		}
		statUpdateUtils.updateStatElementDisplay($('[data-source=required_skill] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("effect", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = "";
		for (var idx in valList) {
			if (idx > 0) replacementHtml += " / ";
			replacementHtml += constants.effects[item.effect].name;
		}
		statUpdateUtils.updateStatElementDisplay($('[data-source=effect] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("effectTime", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] > 0) {
		var replacementHtml = "";
		for (var idx in valList) {
			if (idx > 0) replacementHtml += " / ";
			if (idx == valList.length - 1) {
				replacementHtml += statUpdateUtils.secondsDisplay(valList[idx]);
			} else {
				replacementHtml += valList[idx];
			}
		}

		if (item.id == "vb") {
			statUpdateUtils.updateStatElementDisplay($('[data-source=lifetime] div.pi-data-value'), replacementHtml);
		} else {
			statUpdateUtils.updateStatElementDisplay($('[data-source=effect_time] div.pi-data-value'), replacementHtml);
		}
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("ammoOrEnergyUsage", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=ammo] div.pi-data-value'), replacementHtml);
		statUpdateUtils.updateStatElementDisplay($('[data-source=energy_usage] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("life", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] > 0) {
		replacementHtml = "";
		for (var idx in valList) {
			if (idx > 0) replacementHtml += " / ";
			if (idx == valList.length - 1) {
				replacementHtml += statUpdateUtils.secondsDisplay(valList[idx]);
			} else {
				replacementHtml += valList[idx];
			}
		}

		if (item.id == "pcb" || item.id == "vb") {
			statUpdateUtils.updateStatElementDisplay($('[data-source=arming_time] div.pi-data-value'), replacementHtml);
		} else {
			statUpdateUtils.updateStatElementDisplay($('[data-source=lifetime] div.pi-data-value'), replacementHtml);
		}
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("damage", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = valList.join(" / ");
		if (item.id == "tb") {
			replacementHtml += " (Continuous)";
		}
		statUpdateUtils.updateStatElementDisplay($('[data-source=damage_per_round] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("amount", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=volley] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("lockingRange", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return statUpdateUtils.roundToDecPlaces(i, 2);});
		replacementHtml = valList.join(" / ") + " su";
		statUpdateUtils.updateStatElementDisplay($('[data-source=locking_range] div.pi-data-value'), replacementHtml);
		//*** ODDLY ENOUGH, LOCKING RANGE DATA APPLIES TO DUMBFIRE RANGE AS WELL
		statUpdateUtils.updateStatElementDisplay($('[data-source=range] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("maxSpeed", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = valList.join(" / ") + " su/s";
		statUpdateUtils.updateStatElementDisplay($('[data-source=speed] div.pi-data-value'), replacementHtml);
		statUpdateUtils.updateStatElementDisplay($('[data-source=velocity] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("turning", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return i * 30;});
		replacementHtml = valList.join(" / ") + " degrees";
		statUpdateUtils.updateStatElementDisplay($('[data-source=turning] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("accuracy", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = valList.join(" / ") + " degrees";
		statUpdateUtils.updateStatElementDisplay($('[data-source=accuracy] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("armingTime", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] > 0) {
		replacementHtml = "";
		for (var idx in valList) {
			if (idx > 0) replacementHtml += " / ";
			if (idx == valList.length - 1) {
				replacementHtml += statUpdateUtils.secondsDisplay(valList[idx]);
			} else {
				replacementHtml += valList[idx];
			}
		}
		statUpdateUtils.updateStatElementDisplay($('[data-source=arming_time] div.pi-data-value'), replacementHtml);
	}

	valList = displayLiveItemInfo.getUniqueVarientValues("fireRate", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] > 0) {
		if (valList[valList.length - 1] > 1) {
			replacementHtml = "1 round per ";
			for (var idx in valList) {
				if (idx > 0) replacementHtml += " / ";
				var val = statUpdateUtils.roundToDecPlaces(valList[idx], 1);
				if (idx == valList.length - 1) {
					replacementHtml += statUpdateUtils.secondsDisplay(val);
				} else {
					replacementHtml += val;
				}
			}
		} else {
			valList = valList.map(function(i){return statUpdateUtils.roundToDecPlaces(1/i, 1);});
			replacementHtml = valList.join(" / ");
		}
		statUpdateUtils.updateStatElementDisplay($('[data-source=rounds_per_second] div.pi-data-value'), replacementHtml);
	}

	//*** DPS MUST BE CALCULATED
	var fireRateValList = displayLiveItemInfo.getUniqueVarientValues("fireRate", itemVarientList);
	var damageValList = displayLiveItemInfo.getUniqueVarientValues("damage", itemVarientList);
	var amountValList = displayLiveItemInfo.getUniqueVarientValues("amount", itemVarientList);
	valList = [];

	//*** ENSURE DAMAGE AND FIRE RATE ARRAY SIZES MATCH. IF NOT PAD OUT THE
	//*** SHORTER ONE WITH THE LAST VALUE GIVEN
	if (damageValList.length < fireRateValList.length) {
		for (idx = damageValList.length; idx < fireRateValList.length; idx++) {
			damageValList[damageValList.length] = damageValList[damageValList.length - 1];
		}
	}
	if (damageValList.length > fireRateValList.length) {
		for (idx = fireRateValList.length; idx < damageValList.length; idx++) {
			fireRateValList[fireRateValList.length] = fireRateValList[fireRateValList.length - 1];
		}
	}
	if (damageValList.length > amountValList.length) {
		if (amountValList.length == 0)  amountValList[0] = 1;
		for (idx = amountValList.length; idx < damageValList.length; idx++) {
			amountValList[amountValList.length] = amountValList[amountValList.length - 1];
		}
	}

	for (var idx in fireRateValList) {
		valList[idx] = (damageValList[idx] * amountValList[idx]) / fireRateValList[idx];
		valList[idx] = statUpdateUtils.roundToDecPlaces(valList[idx], 1);
	}

	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=damage_per_second] div.pi-data-value'), replacementHtml);

		replacementHtml = valList.join(" / ");
		replacementHtml += " dps";
		statUpdateUtils.updateStatElementDisplay($('[data-source=firepower] div.pi-data-value'), replacementHtml);
	}


	//*** EPS MUST BE CALCULATED
	var fireRateValList = displayLiveItemInfo.getUniqueVarientValues("fireRate", itemVarientList);
	var energyValList = displayLiveItemInfo.getUniqueVarientValues("ammoOrEnergyUsage", itemVarientList);
	valList = [];

	//*** ENSURE ENERGY AND FIRE RATE ARRAY SIZES MATCH. IF NOT PAD OUT THE
	//*** SHORTER ONE WITH THE LAST VALUE GIVEN
	if (energyValList.length < fireRateValList.length) {
		for (idx = energyValList.length; idx < fireRateValList.length; idx++) {
			energyValList[energyValList.length] = energyValList[energyValList.length - 1];
		}
	}
	if (energyValList.length > fireRateValList.length) {
		for (idx = fireRateValList.length; idx < energyValList.length; idx++) {
			fireRateValList[fireRateValList.length] = fireRateValList[fireRateValList.length - 1];
		}
	}
	for (var idx in fireRateValList) {
		valList[idx] = energyValList[idx] * fireRateValList[idx];
		valList[idx] = statUpdateUtils.roundToDecPlaces(valList[idx], 1);
	}

	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		replacementHtml = valList.join(" / ");
		replacementHtml += " energy/s";
		statUpdateUtils.updateStatElementDisplay($('[data-source=efficiency] div.pi-data-value'), replacementHtml);
	}


	//*** Begin Shield Fields
	valList = displayLiveItemInfo.getUniqueVarientValues("maxModifier", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return "x" + statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=maximum_charge] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("chargeModifier", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return "x" + statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=recharge_rate] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("chargeDelay", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		replacementHtml += " seconds";
		statUpdateUtils.updateStatElementDisplay($('[data-source=recharge_delay] div.pi-data-value'), replacementHtml);
	}
	//*** End Shield Fields

	//*** Begin Engine Fields
	valList = displayLiveItemInfo.getUniqueVarientValues("maxSpeedMod", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return "x" + statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=speed] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("reverseSpeedMod", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return statUpdateUtils.roundToDecPlaces(i * 100, 1) + "%";});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=reverse] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("accelMod", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return "x" + statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=acceleration] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("turningMod", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return "x" + statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=turning] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("propulsionEnhance", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return "x" + statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=propulsion] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("propulsionEnhanceTime", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		replacementHtml += " seconds";
		statUpdateUtils.updateStatElementDisplay($('[data-source=boost_duration] div.pi-data-value'), replacementHtml);
	}
	valList = displayLiveItemInfo.getUniqueVarientValues("autoPilotSpeedInc", itemVarientList);
	if (valList.length > 0 && valList[valList.length - 1] >= 0) {
		valList = valList.map(function(i){return "+" + statUpdateUtils.roundToDecPlaces(i, 4);});
		replacementHtml = valList.join(" / ");
		statUpdateUtils.updateStatElementDisplay($('[data-source=autopilot] div.pi-data-value'), replacementHtml);
	}
	//*** End Engine Fields
};

displayLiveItemInfo.performPageStatReplacements = function() {
	if (
		!$.isEmptyObject(displayLiveItemInfo.weaponData)
		&& !$.isEmptyObject(displayLiveItemInfo.weaponExtData)
		&& typeof constants !== 'undefined'
		&& constants !== null
		&& statUpdateUtils.isReady
		&& Array.isArray(itemsToSkipInUncategorizedList)
		&& Array.isArray(racesToSkipInUncategorizedList)
		&& statUpdateCacheUtils.dataDate !== false
	) {
		var pageName = statUpdateUtils.getPageName();
		var tableInfoList = statUpdateUtils.getDataTableInfoList();

		displayLiveItemInfo.initialize();
		displayLiveItemInfo.replaceNprDropTableWithDetailedTables(pageName);
		displayLiveItemInfo.replaceCraftedItemsTableWithDetailedTables(pageName);
		displayLiveItemInfo.populateUncategorizedItemsTable(pageName, tableInfoList);
		displayLiveItemInfo.loadItemDetails(pageName, displayLiveItemInfo.weaponData, displayLiveItemInfo.weaponExtData);
		displayLiveItemInfo.updateNprDropCount(pageName);

		//*** Do the item count replacement a second time after a delay because the TOC can take a moment to pop in
		setTimeout(function(){displayLiveItemInfo.updateNprDropCount(pageName);}, 350);
	} else {
		setTimeout(displayLiveItemInfo.performPageStatReplacements, 50);
	}
};
//*** End Main Content Functions


$( document ).ready(function() {
	displayLiveItemInfo.performPageStatReplacements();
});