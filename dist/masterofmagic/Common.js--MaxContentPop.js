/*
This script is assigned to Max Content Population Table template:
http://masterofmagic.wikia.com/wiki/Template:MaxContentPop
http://masterofmagic.wikia.com/wiki/Unrest#Maximal_city_size
MaxContPop table shows maximal city size allowed without a single rebelling citizen.
Citizen unrest can be caused by many input factors,
such as racial culture, magic, politics and interracial relations.
Since this table is mostly used to compare pros and cons between various races,
both (vertical and horizontal) dimensions represent races.
Table also allows users to customize presentation of computed results.

Table of Contents:
1. Data              - imported from external script
2. User Interface    - constructors, input constraints
3. Graphic Support   - elementary formatting functions
4. Global Graphics   -
5. Content Graphics  - !CORE! full-body iterative procedures
6. Game Logic        - game rules and data
7. Support Functions - math, parsers, ...
8. Main              - launcher
*/


////////////////////////////////////////////////////////////
// 1. Data
////////////////////////////////////////////////////////////


// Game and graphics data.
importScript('MediaWiki:Common.js/MaxContentPop.js/UnrestData.js');


////////////////////////////////////////////////////////////
// 2. User Interface
////////////////////////////////////////////////////////////


// Table Object Constructor.
function MaxPopTable(id) {
	if (!id) id = "maxpop__";
	this.tableId = id;
	this.table = this;	// Hack - single event handler for parent and children.

	// Create radio inputs.
	// Switch between table modes:
	this.addRadio("sort", "table_type");
	this.addRadio("grid", "table_type");
	// Choose race icon:
	this.addRadio("inits", "race_link");
	this.addRadio("folk", "race_link");
	this.addRadio("unit", "race_link");
	// Set cell colours according to their:
	this.addRadio("value", "color_method");
	this.addRadio("position", "color_method");

	// Create checkboxes.
	[
		"limit"      ,	// City limit on/off.
		"sort_race"  ,	// Show race indicator inside cell of sorted table.
		"sort_size"  ,	// Show finite   city size inside cell of sorted table.
		"sort_inf"   ,	// Show infinite city size inside cell of sorted table.
		"grid_size"  ,	// Show finite   city size inside cell of grid table.
		"grid_inf"   ,	// Show infinite city size inside cell of grid table.
		"same_border",	// Highlight same race of row and column with border.
		"same_big"   ,	// Highlight same race of row and column with big font.
		"same_under" ,	// Highlight same race of row and column with underline.
		"same_ital" ,	// Highlight same race of row and column with italics.
		"bold",	// Show cell content as bold.
		// Game magical effects.
		"retort", "cause", "gaia", "ritual", "curse", "pestilence",
		"famine", "evil", "wasting", "armageddon", "nobuild"
	].forEach(this.addCheckbox, this);

	// Create number inputs.
	[
		"city",		// Maximal city size limit (can be turned on/off with checkbox).
		"units"		// Number of military units located in the city.
	].forEach(this.addNumberInput, this);
	this.city.maxLength = 2;
	this.units.maxLength = 2;
	this.city.max = 99;
	this.units.max = 99;

	// Create colour inputs.
	[
		"color",	// Text colour.
		"color1",	// Min value background.
		"color2",	// Medium value background.
		"color3"	// Max value background.
	].forEach(this.addColorInput, this);

	// Create select menus.
	// Switch vertical and horizontal dimensions of table.
	this.addSelectMenu("chosen", "Row header",
	["capital", "Capital Race", "citizen", "Citizen Race"]);
	// In game tax rate per citizen.
	this.addSelectMenu("tax", "Select Tax rate",
	[
		"0", "0&nbsp;&nbsp; ( 0% Unrest)",
		"0.5", "0.5 (10% Unrest)",
		"1", "1&nbsp;&nbsp; (20% Unrest)",
		"1.5", "1.5 (30% Unrest)",
		"2", "2&nbsp;&nbsp; (45% Unrest)",
		"2.5", "2.5 (60% Unrest)",
		"3", "3&nbsp;&nbsp; (75% Unrest)"
	]);	// TODO: Find better white-space preservation.

	// GUI data manipulation.
	this.city.addEventListener('change', this.refreshDataForNewCitySize);
	["units", "chosen", "tax"].forEach(function (input) {
		this[input].addEventListener('change', this.refreshData);
	}, this);
	[
		"sort", "grid", "limit",
		"retort", "cause", "gaia", "ritual", "curse", "pestilence",
		"famine", "evil", "wasting", "armageddon", "nobuild"
	].forEach(function (input) {
		this[input].addEventListener('click', this.refreshData);
	}, this);

	// GUI graphics manipulation.
	this.sort.addEventListener('click', this.updateColumnHeaders);
	this.grid.addEventListener('click', this.updateColumnHeaders);
	this.chosen.addEventListener('change', this.updateHorizontalTitle);
	this.chosen.addEventListener('change', this.updateHeaderRaceLinks);
	this.grid_size.addEventListener('click', this.showGridCellValues);
	this.grid_inf.addEventListener('click', this.showGridCellValues);
	this.sort_race.addEventListener('click', this.showSortCellValues);
	this.sort_size.addEventListener('click', this.showSortCellValues);
	this.sort_inf.addEventListener('click', this.showSortCellValues);
	this.same_border.addEventListener('click', this.highlightSameRaces);
	this.same_big.addEventListener('click', this.highlightSameRaces);
	this.same_under.addEventListener('click', this.highlightSameRaces);
	this.same_ital.addEventListener('click', this.highlightSameRaces);
	["inits", "folk", "unit"].forEach(function (input) {
		this[input].addEventListener('change', this.setCellRaceLinks);
		this[input].addEventListener('change', this.updateHeaderRaceLinks);
	}, this);
	this.bold.addEventListener('click', this.updateTableBold);
	this.color.addEventListener('change', this.updateTableColor);
	["color1", "color2", "color3"].forEach(function (input) {
		this[input].addEventListener('change', this.changeCellColors);
	}, this);
	this.value.addEventListener('click', this.changeCellColors);
	this.position.addEventListener('click', this.changeCellColors);
	for (var row = 0; row < raceCount; row++) {
		for (var col = 0; col < raceCount; col++) {
			var cell = this.getCell(row, col);
			cell.table = this;
			cell.addEventListener('mouseover', this.highLightCellHeaders);
			cell.addEventListener('mouseout', this.unHighLightCellHeaders);
		}
	}

	// Initialise table.
	this.maxCitySize = Number.POSITIVE_INFINITY;
	this.minCitySize = Number.NEGATIVE_INFINITY;
	this.rangeCitySize = this.maxCitySize - this.minCitySize;
	this.updateHorizontalTitle();
	this.updateColumnHeaders();
	this.updateTableBold();
	this.updateTableColor();
	this.updateHeaderRaceLinks();
}

// Allows graphic changes without javascript modification.
function inheritGraphics(element) {
	// Uses inherited graphics from wikipedia template wrapper
	// instead of hard-coded javascript graphics.
	element.style.width = "inherit";
	element.style.height = "inherit";
	element.style.color = "inherit";
	element.style.background = element.parentNode.style.background;	// Special!
	element.style.borderColor = "inherit";
}

// Support constructor methods.

MaxPopTable.prototype.addCheckbox = function(inputId) {
	var wrapper = document.getElementById(this.tableId + inputId);
	if (!wrapper) { this[inputId] = {}; return this[inputId]; }
	var defaultValue = wrapper.textContent;
	wrapper.innerHTML = '<input name=' + inputId + ' type=checkbox>';
	this[inputId] = wrapper.firstChild;
	this[inputId].table = this;
	this[inputId].checked = defaultValue;
	return this[inputId];
};
MaxPopTable.prototype.addRadio = function(inputId, inputGroup) {
	var wrapper = document.getElementById(this.tableId + inputId);
	if (!wrapper) { this[inputId] = {}; return this[inputId]; }
	var defaultValue = wrapper.textContent;
	wrapper.innerHTML = '<input name=' + inputGroup + ' type=radio>';
	this[inputId] = wrapper.firstChild;
	this[inputId].table = this;
	this[inputId].checked = defaultValue;
	return this[inputId];
};
MaxPopTable.prototype.addNumberInput = function(inputId) {
	var wrapper = document.getElementById(this.tableId + inputId);
	if (!wrapper) { this[inputId] = {}; return this[inputId]; }
	var defaultValue = wrapper.textContent;
	wrapper.innerHTML = '<input name=' + inputId + '>';
	this[inputId] = wrapper.firstChild;
	this[inputId].table = this;
	this[inputId].type = "number";
	// this[inputId].type = "text";
	this[inputId].inputMode = "numeric";
	this[inputId].pattern = "[0-9]*";
	this[inputId].step = 1;
	this[inputId].min = 0;
	this[inputId].value = defaultValue;
	inheritGraphics(this[inputId]);
	return this[inputId];
};
MaxPopTable.prototype.addColorInput = function(inputId) {
	var wrapper = document.getElementById(this.tableId + inputId);
	if (!wrapper) { this[inputId] = {}; return this[inputId]; }
	var defaultValue = wrapper.textContent;
	wrapper.innerHTML = '<input name=' + inputId + ' type=color>';
	this[inputId] = wrapper.firstChild;
	this[inputId].table = this;
	this[inputId].value = defaultValue;
	inheritGraphics(this[inputId]);
	this[inputId].style.border = "0px none transparent";
	this[inputId].style.padding = "0px";
	return this[inputId];
};
MaxPopTable.prototype.addSelectMenu = function(inputId, title, options) {
	var wrapper = document.getElementById(this.tableId + inputId);
	if (!wrapper) { this[inputId] = {}; return this[inputId]; }
	var defaultValue = wrapper.textContent;
	// Create select menu contents.
	var i; var count = options.length;
	var body = [
		'<select name=', inputId, '>',
		// Optgroup is used as menu_title.
		'<optgroup label="', title, '">'
	];
	// [ option1_value, option1_presentation, option2_value, ... ]
	for (i = 1; i < count; i += 2) {
		body.push(
			'<option value=', options[i - 1],
			' style="font-family:monospace;">',
			options[i],
			'</option>'
		);
	}
	body.push(
		'</optgroup>',
		'</select>'
	);
	wrapper.innerHTML = body.join('');
	this[inputId] = wrapper.firstChild;
	this[inputId].table = this;
	this[inputId].value = defaultValue;
	inheritGraphics(this[inputId]);
	// Compatibility - Chrome, Opera:
	var optgroup = this[inputId].firstChild;
	inheritGraphics(optgroup);
	// Compatibility - Firefox:
	optgroup.style.width = "";
	optgroup.style.height = "";
	var color = parseRgbColor(optgroup.style.backgroundColor);
	color.r++; color.g++; color.b++;
	optgroup.style.background = toHex6Color(color);
	return this[inputId];
};


////////////////////////////////////////////////////////////
// 3. Graphic Support
////////////////////////////////////////////////////////////


// Table cell getters.
MaxPopTable.prototype.getColHeader = function(column) {
	return document.getElementById(this.tableId + "x_" + column);
};
MaxPopTable.prototype.getRowHeader = function(row) {
	return document.getElementById(this.tableId + row + "_x");
};
MaxPopTable.prototype.getCell = function(row, column) {
	return document.getElementById(this.tableId + row + "_" + column);
};

// Used for cells where capital and citizen races are equal.
MaxPopTable.prototype.highLightCellRace = function(cell, show) {
	var table = this.table; if (!table) return;
	cell.style.border = "";
	cell.style.textDecoration = "";
	cell.style.fontSize = "";
	cell.style.fontWeight = "";
	cell.style.fontStyle = "";
	if (show) {
		if (table.same_border.checked) cell.style.border = "1px solid";
		if (table.same_under.checked) cell.style.textDecoration = "underline";
		if (table.same_big.checked) {
			cell.style.fontSize = "120%";
			cell.style.fontWeight = "900";
		}
		if (table.same_ital.checked) cell.style.fontStyle = "italic";
	}
};

// Highlights row and column headers of cell pointed to by mouse.
MaxPopTable.prototype.highLightCellHeaders = function() {
	var table = this.table; if (!table) return;
	var colRace = -1; var rowRace = -1;
	// Find table dimensions.
	if (table.chosen.value == "citizen") {
		rowRace = this.race;
		colRace = this.ruler;
	} else if (table.chosen.value == "capital") {
		rowRace = this.ruler;
		colRace = this.race;
	}
	// Highlight headers.
	table.getRowHeader(rowRace).style.filter = "brightness(140%)";
	table.getColHeader(colRace).style.filter = "brightness(140%)";
	// Show pointed [race / city size] in top header of sorted table.
	if (table.sort.checked) {
		document.getElementById(table.tableId + "header_sort_race")
		.textContent = raceArray[colRace].name;
		document.getElementById(table.tableId + "header_sort_size")
		.textContent = this.citizens;
	}
};

// Highlights row and column headers of cell pointed to by mouse.
MaxPopTable.prototype.unHighLightCellHeaders = function() {
	var table = this.table; if (!table) return;
	var colRace = -1; var rowRace = -1;
	// Find table dimensions.
	if (table.chosen.value == "citizen") {
		rowRace = this.race;
		colRace = this.ruler;
	} else if (table.chosen.value == "capital") {
		rowRace = this.ruler;
		colRace = this.race;
	}
	// Darken headers.
	table.getRowHeader(rowRace).style.filter = "";
	table.getColHeader(colRace).style.filter = "";
};

// User can turn on/off indication of city size & race inside cell.
MaxPopTable.prototype.createCellContent = function(cell) {
	var table = this.table; if (!table) return;
	var displayRace = "";	// Column race in sorted table.
	var displaySize = cell.citizens;
	// Choose content of sorted table.
	if (table.sort.checked) {
		if (isFinite(displaySize)) {
			if (!table.sort_size.checked) displaySize = "";
		} else {
			if (!table.sort_inf.checked)  displaySize = "";
		}
		if (table.sort_race.checked) {
			if (table.chosen.value == "citizen") {
				displayRace = cell.ruler;
			}
			if (table.chosen.value == "capital") {
				displayRace = cell.race;
			}
			displayRace = '<span class="maxpop-race-' + displayRace + '"></span>';
			// Race is then filled by setCellRaceLinks() funtion.
		}
	}
	// Choose content of grid table.
	if (table.grid.checked) {
		if (isFinite(displaySize)) {
			if (!table.grid_size.checked) displaySize = "";
		} else {
			if (!table.grid_inf.checked)  displaySize = "";
		}
	}
	// Create content and fit it inside cell.
	if (displayRace && (displaySize || displaySize === 0)) {
		cell.innerHTML =
			displayRace +
			"<br/><small><small>" +
			displaySize +
			"</small></small>";
	} else if (!isFinite(displaySize)) {
		cell.innerHTML =
			"<small><small>" +
			displaySize +
			"</small></small>";
	} else {
		// Either one of values or empty cell.
		cell.innerHTML = displayRace + displaySize;
	}
};

// Colour cell according to its value.
MaxPopTable.prototype.colorCell = function(cell) {
	var table = this.table; if (!table) return;
	var color = table.sizeColor[cell.citizens].color;
	if (!color) return;
	cell.style.backgroundColor = toHex6Color(color);
};


////////////////////////////////////////////////////////////
// 4. Global Graphics
////////////////////////////////////////////////////////////


// Updates text and border colours of table.
MaxPopTable.prototype.updateTableColor = function() {
	var table = this.table; if (!table) return;
	var tableElement = document.getElementById(table.tableId);
	if (!tableElement) return;
	tableElement.style.color = table.color.value;
};

// Turns bold text on/off for entire table.
MaxPopTable.prototype.updateTableBold = function() {
	var table = this.table; if (!table) return;
	var tableElement = document.getElementById(table.tableId);
	if (!tableElement) return;
	if (table.bold.checked) {
		tableElement.style.fontWeight = "bold";
	} else {
		tableElement.style.fontWeight = "";
	}
};

// User can swap horizontal and vertical dimensions of table.
var RacesLink = '<a href="/wiki/Race#Racial_Politics"' +
		'title="Race" class="mw-redirect">Race</a>';
MaxPopTable.prototype.updateHorizontalTitle = function() {
	var table = this.table; if (!table) return;
	var vertical = document.getElementById(table.tableId + "header_chosen");
	var horizontal = document.getElementById(table.tableId + "header_others");
	if (!(vertical && horizontal)) return;
	if (table.chosen.value == "capital") {
		//vertical.innerHTML = "Capital " + RacesLink;
		horizontal.innerHTML = "Citizen " + RacesLink;
	}
	if (table.chosen.value == "citizen") {
		//vertical.innerHTML = "Citizen " + RacesLink;
		horizontal.innerHTML = "Capital " + RacesLink;
	}
};

// User can sort rows of table.
// Column racial headers appear only in grid (unsorted) mode.
// Sorted mode header shows mouse-pointed-to values.
MaxPopTable.prototype.updateColumnHeaders = function() {
	var table = this.table; if (!table) return;
	var races = document.getElementById(table.tableId + "header_grid_row");
	var pointed = document.getElementById(table.tableId + "header_sort_row");
	if (!races || !pointed) return;
	if (table.sort.checked) {
		races.style.display = "none";
		pointed.style.display = "table-row";
	}
	if (table.grid.checked) {
		races.style.display = "table-row";
		pointed.style.display = "none";
	}
};

// Racial headers can be displayed as text or images.
// See also setCellRaceLinks() function.
MaxPopTable.prototype.updateHeaderRaceLinks = function() {
	var table = this.table; if (!table) return;
	// Choose link style.
	var rowHeaderLinkType, colHeaderLinkType;
	if (table.folk.checked) {
		if (table.chosen.value == "capital") {
			rowHeaderLinkType = "worker";
			colHeaderLinkType = "rebel";
		}
		if (table.chosen.value == "citizen") {
			rowHeaderLinkType = "rebel";
			colHeaderLinkType = "worker";
		}
	} else if (table.unit.checked) {
		rowHeaderLinkType = "unit";
		colHeaderLinkType = "unit";
	} else if (table.inits.checked) {
		rowHeaderLinkType = "_empty_";	// Should return undefined.
		colHeaderLinkType = "initials";
	} else return;
	// Fill header links.
	for (var raceIndex = 0; raceIndex < raceCount; raceIndex++) {
		// Row header;
		$('table#' + table.tableId
		+ ' th#' + table.tableId + raceIndex + '_x'
		+ ' .maxpop-race-' + raceIndex)
		.each(function(index, rowLinkWrapper) {
			rowLinkWrapper.innerHTML = raceArray[raceIndex][rowHeaderLinkType] || "";
		});
		// Column header.
		var colLinkWrapper = table.getColHeader(raceIndex);
		colLinkWrapper.innerHTML = raceArray[raceIndex][colHeaderLinkType] || "";
		colLinkWrapper.firstChild.style.color = "";	// Remove 'inherit' colour.
	}
};


////////////////////////////////////////////////////////////
// 5. Content Graphics
////////////////////////////////////////////////////////////


// City size limit has value (city:integer) and state (limit:boolean).
// Change of value should make effect only when limit is turned on.
MaxPopTable.prototype.refreshDataForNewCitySize = function() {
	var table = this.table; if (!table) return;
	if (table.limit.checked) {
		table.refreshData();
	}
};

// Table body generation.
// This function is responsible for collecting all data and organizing them.
// In the end calls graphic formatting function to display data.
MaxPopTable.prototype.refreshData = function() {
	var table = this.table; if (!table) return;
	var row, col, cell;
	var citySize, cityRace, rulerRace;
	var citySizes = [];	// All existing city sizes. Used for global sorting.
	var maxCitySize = Number.NEGATIVE_INFINITY;	// Found boundaries.
	var minCitySize = Number.POSITIVE_INFINITY;
	var gameLimitForCitySize;	// May be limited or infinite (table.limit = false).
	if (table.limit.checked) gameLimitForCitySize = parseInt(table.city.value, 10);
	var globalIntegerU = table.getGlobalIntegerUnrest();
	var globalRelativeU = table.getGlobalRelativeUnrest();
	var racialIntegerU, racialRelativeU;
	// Compute cell values.
	for (row = 0; row < raceCount; row++) {
		var rowResults = [];	// Temporary storage for sorting row results.
		for (col = 0; col < raceCount; col++) {
			// Gather racial data.
			racialRelativeU = table.getRacialRelativeUnrest(col, row);
			if (table.chosen.value == "capital") {
				rulerRace = row; cityRace = col;
			}
			if (table.chosen.value == "citizen") {
				cityRace = row; rulerRace = col;
			}
			racialIntegerU = table.getRacialIntegerUnrest(cityRace);
			// Compute maximal city size allowed without rebels.
			var relativeCityUnrest = globalRelativeU + racialRelativeU;
			var integerCityUnrest = globalIntegerU + racialIntegerU;
			citySize = computeCitySizeForRebels(
				integerCityUnrest, relativeCityUnrest);
			if (table.limit.checked && gameLimitForCitySize < citySize) {
				citySize = gameLimitForCitySize;
			}
			// Save results.
			citySizes.push(citySize);
			if (citySize > maxCitySize && Number.isFinite(citySize)) {
				maxCitySize = citySize;
			}
			if (citySize < minCitySize && Number.isFinite(citySize)) {
				minCitySize = citySize;
			}
			if (table.sort.checked) {
				// Save in temporary array for row sorting.
				rowResults[col] = {
					citizens : citySize,
					race     : cityRace,
					ruler    : rulerRace
				};
			}
			if (table.grid.checked) {
				// Save directly to cell without sorting the row.
				cell = table.getCell(row, col);
				cell.citizens = citySize;
				cell.race = cityRace;
				cell.ruler = rulerRace;
			}
		}
		// Sort results in row.
		if (table.grid.checked) continue;
		if (table.sort.checked) {
			rowResults.sort(compareCities);
			for (col = 0; col < raceCount; col++) {
				cell = table.getCell(row, col);
				cell.citizens = rowResults[col].citizens;
				cell.race = rowResults[col].race;
				cell.ruler = rowResults[col].ruler;
			}
		}
	}
	// Create ladder of city sizes (used later for coloring).
	table.sizeColor = {};
	var rangeCitySize = maxCitySize - minCitySize;
	citySizes = citySizes.sort(compareNumbersAsc).filter(onlyUniqueFilter);
	var citySizesCount = citySizes.length;
	// Special case with 1 array length. Error : (0 / 0).
	var size = citySizes[0];
	table.sizeColor[size] = {};
	table.sizeColor[size].position = 0;
	table.sizeColor[size].ratio    = 0;
	// All other cases.
	for (var i = 1; i < citySizesCount; i++) {
		size = citySizes[i];
		table.sizeColor[size] = {};
		// Coloring by position - position is in <0,1>.
		table.sizeColor[size].position = i / (citySizesCount - 1);
		// Coloring by value - ratio is in <0,1>.
		table.sizeColor[size].ratio = findPosition(
			minCitySize, maxCitySize, size, rangeCitySize);
	}
	// Save found boundaries.
	table.minCitySize = minCitySize;
	table.maxCitySize = maxCitySize;
	table.rangeCitySize = rangeCitySize;
	// Run formatting.
	table.formatAll();
};

// Full reformatting of all cells according to their values.
MaxPopTable.prototype.formatAll = function() {
	var table = this.table; if (!table) return;
	var row, col, cell;
	table.preComputeColors();
	for (row = 0; row < raceCount; row++) {
		for (col = 0; col < raceCount; col++) {
			cell = table.getCell(row, col);
			// Create cell content.
			table.createCellContent(cell);
			// Highlight same race for better orientation.
			if (cell.race == cell.ruler) {
				table.highLightCellRace(cell, true);
			} else {
				table.highLightCellRace(cell, false);
			}
			// Colour cells according to their values. 
			table.colorCell(cell);
		}
	}
	table.setCellRaceLinks();
};

// Shows/Hides values inside cells according to display options.
MaxPopTable.prototype.showCellValues = function() {
	var table = this.table; if (!table) return;
	var row, col, cell;
	for (row = 0; row < raceCount; row++) {
		for (col = 0; col < raceCount; col++) {
			table.createCellContent(table.getCell(row, col));
		}
	}
};
// Change of grid display options should take effect only in grid mode.
MaxPopTable.prototype.showGridCellValues = function() {
	var table = this.table; if (!table) return;
	if (!table.grid.checked) return;
	table.showCellValues();
};
// Change of sort display options should take effect only in sort mode.
MaxPopTable.prototype.showSortCellValues = function() {
	var table = this.table; if (!table) return;
	if (!table.sort.checked) return;
	table.showCellValues();
	table.setCellRaceLinks();
};

// Sort view can show races inside table body cells
// as race initials or images.
// See also updateHeaderRaceLinks().
MaxPopTable.prototype.setCellRaceLinks = function() {
	var table = this.table; if (!table) return;
	if (!table.sort.checked) return;
	for (var raceIndex = 0; raceIndex < raceCount; raceIndex++) {
		var raceLink;
		if (table.folk.checked) {
			if (table.chosen.value == "capital")
				raceLink = raceArray[raceIndex].rebel;
			if (table.chosen.value == "citizen")
				raceLink = raceArray[raceIndex].worker;
		} else if (table.unit.checked) {
			raceLink = raceArray[raceIndex].unit;
		} else if (table.inits.checked) {
			raceLink = raceArray[raceIndex].initials;
		}
		$('table#' + table.tableId + ' td span.maxpop-race-' + raceIndex)
		.each(function(index, linkWrapper) {
			linkWrapper.innerHTML = raceLink;
		});
	}
};

// Highlights cells where row and column races are equal.
MaxPopTable.prototype.highlightSameRaces = function() {
	var table = this.table; if (!table) return;
	var row, col, cell;
	for (row = 0; row < raceCount; row++) {
		for (col = 0; col < raceCount; col++) {
			cell = table.getCell(row, col);
			if (cell.race == cell.ruler) {
				table.highLightCellRace(cell, true);
			} else {
				table.highLightCellRace(cell, false);
			}
		}
	}
};

// Pre-computes cell colours for each possible city size
// according to chosen boundary colours and coloring style.
// TODO: Add predefined colour profiles.
MaxPopTable.prototype.preComputeColors = function() {
	var table = this.table; if (!table) return;
	var minColor = parseHex6Color(table.color1.value);
	var medColor = parseHex6Color(table.color2.value);
	var maxColor = parseHex6Color(table.color3.value);
	if (!minColor || !medColor || !maxColor) return;
	var size;
	if (table.value.checked) {
		for (size in table.sizeColor) {
			table.sizeColor[size].color = interColor3(
				minColor, medColor, maxColor,
				table.sizeColor[size].ratio);
		}
	}
	if (table.position.checked) {
		for (size in table.sizeColor) {
			table.sizeColor[size].color = interColor3(
				minColor, medColor, maxColor,
				table.sizeColor[size].position);
		}
	}
};

// Colours all cell backgrounds according to their values.
MaxPopTable.prototype.changeCellColors = function() {
	var table = this.table; if (!table) return;
	table.preComputeColors();
	for (var row = 0; row < raceCount; row++) {
		for (var col = 0; col < raceCount; col++) {
			table.colorCell(table.getCell(row, col));
		}
	}
};


////////////////////////////////////////////////////////////
// 6. Game Logic
////////////////////////////////////////////////////////////


// Unrest rules.
// Unrest is divided to:
// Integer <-> Relative (percentage of city size)
// Global  <->   Racial

MaxPopTable.prototype.getGlobalIntegerUnrest = function() {
	var unrest = 0;
	unrest -= (this.units.value / 2) | 0;	// Conversion to integer.
	unrest += (this.cause.checked ? integerUnrest.cause : 0);
	unrest += (this.gaia.checked ? integerUnrest.gaia : 0);
	unrest += (this.ritual.checked ? integerUnrest.ritual : 0);
	unrest += (this.curse.checked ? integerUnrest.curse : 0);
	unrest += (this.pestilence.checked ? integerUnrest.pestilence : 0);
	// Armageddon overrides Great Wasting with a bigger value;
	if (this.armageddon.checked) {
		unrest += integerUnrest.armageddon;
	} else if (this.wasting.checked) {
		unrest += integerUnrest.wasting;
	}
	unrest |= 0;	// Conversion to integer.
	return unrest;
};

MaxPopTable.prototype.getGlobalRelativeUnrest = function() {
	var unrest = 0;
	taxes = relativeUnrest[parseFloat(this.tax.value)];
	unrest += (taxes || taxes === 0 ? taxes : relativeUnrest[1]);
	// ^^^ Default tax '1' is more practical input than '0'.
	unrest += (this.famine.checked ? relativeUnrest.famine : 0);
	return unrest;
};

MaxPopTable.prototype.getRacialIntegerUnrest = function(raceIndex) {
// Great Wasting and Armageddon nullify building effects in bugged version.
	if (this.nobuild.checked	// Patched version: nobuild == false
		&&
		(this.armageddon.checked || this.wasting.checked)
	) {
		return 0;
	}
	var race = raceUnrestArray[raceIndex];
	var pacification = 0;	// Opposite of unrest (unrest suppression).
	pacification += race.buildOther;
	if (!(this.evil.checked)) {	// Evil presence nullifies religion effects.
		pacification += race.buildReligion;
		pacification += (this.retort.checked ? race.retort : 0);
	}
	pacification |= 0;	// Conversion to integer.
	return (-pacification);
};

// Relative unrest between 2 different races. Order does not matter.
MaxPopTable.prototype.getRacialRelativeUnrest = function(raceIndex1, raceIndex2) {
	return raceUnrestArray[raceIndex1].unrest[raceIndex2];
};

// Unused function. It is here only for informational value.
// This formula is used in game. In table we want opposite formula.
// Computes amount of rebelling citizens for given city size and unrest effects.
// NOTE: Total amount of rebels can be higher that city size.
// Negative input values represent pacifying effects instead of rebelling.
// relativeUnrest : percentage of rebelling citizens
// integerUnrest  : additional rebels
// TODO: Create other version of table: (city_size x effects) -> loyal_size.
function computeRebelsForCitySize(integerUnrest, relativeUnrest, citySize) {
	// Rebels from city size + other rebels == Total rebels.
	return Math.trunc(citySize * relativeUnrest) + Math.trunc(integerUnrest);
	
}

// Main logic. This is inverse function to computeRebelsForCitySize().
// Computes maximal possible city size without rebels for given unrest effects.
// Negative input values represent pacifying effects instead of rebelling.
// relativeUnrest : percentage of rebelling citizens
// integerUnrest  : additional rebels
function computeCitySizeForRebels(integerUnrest, relativeUnrest) {
//Math.ceil(N   / relativeUnrest)   == City size from which the Nth rebel appears.
//Math.ceil(N+1 / relativeUnrest)   == City size from which the N+1th rebel appears.
//Math.ceil(N+1 / relativeUnrest)-1 == Maximal city size with N rebels allowed.
	integerUnrest = Math.trunc(integerUnrest);
	// There are 2 inputs and each of them can be positive or negative.
	// That means 4 possible combinations together.
	// 1) Both pacifying effects.
	if (relativeUnrest <= 0 && integerUnrest <= 0) return Number.POSITIVE_INFINITY;
	// 2) Both rebelling effects.
	if (relativeUnrest >= 0 && integerUnrest >  0) return Number.NEGATIVE_INFINITY;
	// 3) Integer pacified, relative rebelling (bigger city = more unrest).
	if (integerUnrest <= 0) {	// && relativeUnrest > 0
		return Math.ceil((-integerUnrest + 1) / relativeUnrest) - 1;
		// Returns positive value - MAXimal city size possible with no rebels.
	}
	// 4) Integer rebels, relative pacifying (bigger city = less unrest).
	if (integerUnrest > 0) {	// && relativeUnrest < 0
		return Math.floor(integerUnrest / relativeUnrest);
		// Returns negative value - MINimal city size required for no rebels.
	}
	return NaN;
}


////////////////////////////////////////////////////////////
// 7. Support Functions
////////////////////////////////////////////////////////////

function onlyUniqueFilter(value, index, self) { 
    return self.indexOf(value) === index;
}

// Sorts also infinite and error values (infinite > finite > error)
function compareNumbersAsc(a, b) {
	if (a == b) return 0;
	else if (a < b) return -1;
	else if (b < a) return 1;
	if (!a && a !== 0) a = -1; else a = 1;
	if (!b && b !== 0) b = -1; else b = 1;
	return a - b;
}
function compareNumbersDesc(a, b) {
	if (a == b) return 0;
	else if (a < b) return 1;
	else if (b < a) return -1;
	if (!a && a !== 0) a = -1; else a = 1;
	if (!b && b !== 0) b = -1; else b = 1;
	return b - a;
}

// First compare city sizes and then economical indexes of their races.
function compareCities(cityDataA, cityDataB) {
/*cityData : {
	citizens : integer,
	race     : integer
}*/
	var comparison = compareNumbersDesc(
		cityDataA.citizens,
		cityDataB.citizens
	);
	if (comparison) return comparison;
	comparison = compareNumbersDesc(
		raceArray[cityDataA.race].economyIndex,
		raceArray[cityDataB.race].economyIndex
	);
	if (comparison) return comparison;
	comparison = compareNumbersDesc(
		raceArray[cityDataA.ruler].economyIndex,
		raceArray[cityDataB.ruler].economyIndex
	);
	return comparison;
}

// Returns numeric value on specific position between 2 numbers.
// Position should be float number from interval <0,1>.
// Should work for finite integers and floats.
function linearInterpolation(sourceNumber, targetNumber, position) {
	return sourceNumber * (1 - position) + targetNumber * (position);
}
// Finds position of value relative to min & max value;
function findPosition(min, max, value, range) {
	if (!range) range = max - min;
	if (!value || value <= min) {
		return 0;
	} else if (value >= max) {
		return 1;
	} else {
		return (value - min) / range;
	}
}

// Linear interpolation between 2 colours where position should be from interval
// Position should be float number from interval <0,1>.
function interColor2(color1, color2, position) {
	var r = linearInterpolation(color1.r, color2.r, position);
	var g = linearInterpolation(color1.g, color2.g, position);
	var b = linearInterpolation(color1.b, color2.b, position);
	return { "r" : r, "g" : g, "b" : b };
}

// Linear interpolation between 3 colours, where position 0.5 is for medium colour.
function interColor3(minColor, medColor, maxColor, position) {
	position *= 2;	// <0,1> --> <0,2>
	if (position <= 1)
		return interColor2(minColor, medColor, position);
	else
		return interColor2(medColor, maxColor, position - 1);
}

// Colour conversion functions.
function parseHex6Color(hex6Color) {	// #000000 -> object
	var r   = parseInt(hex6Color.substring(1,3), 16);
	var g = parseInt(hex6Color.substring(3,5), 16);
	var b  = parseInt(hex6Color.substring(5,7), 16);
	return { "r" : r, "g" : g, "b" : b };
}
function parseRgbColor(rgbColor) {	// (0,0,0) -> object
	m = rgbColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
	if (m) return { "r" : m[1], "g" : m[2], "b" : m[3] };
	else   return { "r" : 0,    "g" : 0,    "b" : 0    };
}
function toHex6Color(objColor) {	// object -> #000000
	var r = ("0" + (objColor.r | 0).toString(16)).slice(-2);
	var g = ("0" + (objColor.g | 0).toString(16)).slice(-2);
	var b = ("0" + (objColor.b | 0).toString(16)).slice(-2);
	return '#' + r + g + b;
}


////////////////////////////////////////////////////////////
// 8. Main
////////////////////////////////////////////////////////////

var maxContPopTables = [];
var maxContPopTableCount = 0;
function createMaxContPopTables() {
	var maxContPopHtmlTables = document.getElementsByClassName("maxpop-table");
	maxContPopTableCount = maxContPopHtmlTables.length;
	var i;
	for (i = 0; i < maxContPopTableCount; i++) {
		maxContPopTables[i] = new MaxPopTable(maxContPopHtmlTables[i].id);
	}
}
function fillMaxContPopTables() {
	maxContPopTables.forEach(function(table) {
		table.refreshData();
	});
}

var maxContPopFinished = false;
setTimeout(function() {	// Wait on data import.
	if (maxContPopFinished) return;
	if (raceUnrestArray) {
		maxContPopFinished = true;
		createMaxContPopTables();
		fillMaxContPopTables();
	}
}, 5000);	// TODO: Find more modern solution for script dependencies.