$(function () {
	"use strict";
	if(!mw.config.get('wgPageName').startsWith('Love_And_War'))
		return;
		
	var valves = [
		[4, 1, 3],
		[0, 2, 3],
		[1, 5, 4],
		[5, 0, 1],
		[5, 2, 0],
		[3, 4, 2]
	];
	
	$("#gorod-krovi-valves-table td:not(.gorod-krovi-valves-results)").click(function () {
		var column = $(this).parents("table").find("tr td:nth-child(" + ($(this).index() + 1) +")");
		column.removeClass("checked");
		if(1 - $(this).index()) {
			column.next().removeClass("disabled");
			$(this).next().addClass("disabled");
			if($(this).next().hasClass("checked"))
				$(this).next().removeClass("checked");
		}
		else {
			column.prev().removeClass("disabled");
			$(this).prev().addClass("disabled");
			if($(this).prev().hasClass("checked"))
				$(this).prev().removeClass("checked");
		}
		$(this).addClass("checked");
		
		var checkedValves = $("#gorod-krovi-valves-table td.checked");
		
		if(checkedValves.length == 2) {
			var vStart, vCylinder;
			vStart = $("#gorod-krovi-valves-table td:nth-child(1).checked").parent("tr").index() - 1;
			vCylinder = $("#gorod-krovi-valves-table td:nth-child(2).checked").parent("tr").index() - 1;
			
			if(vStart == -1 || vCylinder == -1 || vStart == vCylinder)
				return 0;
			
			var valvesList = [[-1, vStart]];
			findValves(vStart, vCylinder, valvesList);
			
			var vResultsTd = $("#gorod-krovi-valves-table td.gorod-krovi-valves-results");
			vResultsTd.empty();
			
			for(var i = 0; i < 6; i++) {
				var tempText = "";
				var tdIndex = 0;
				var names = $("#gorod-krovi-valves-table td:first-child");
				
				tempText += names.eq(valvesList[i][1]).text();

				if(i < 5)
					tempText += " - " + (valvesList[i + 1][0] + 1);
				else
					tempText += " - Walec kodów";
				
				if(i >= 3)
					tdIndex = 1;
				
				vResultsTd.eq(tdIndex).append($("<p>").text(tempText));
			}
		}
	});
	
	function findValves(start, end, valvesList) {
		for(var i = 0; i < valvesList.length - 1; i++)
			if(start == valvesList[i][1])
				return 0;
		
		if(start == end && valvesList.length == 6)
			return 1;
		else if(valvesList.length == 6)
			return 0;
		
		for(var i = 0; i < 3; i++) {
			valvesList.push([i, valves[start][i]]);
			if(findValves(valves[start][i], end, valvesList))
				return 1;
			valvesList.pop();
		}
	}
});