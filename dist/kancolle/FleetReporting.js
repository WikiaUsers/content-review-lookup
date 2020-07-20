(function($){
	"use strict";
	console.log("Fleet Reporting v014");
	
	var routes = {};
	var routeName = "";
	var compoName = "";
	var thisRoute = [];
	var thisFleet = [];
	var fleetIndexer = "";
	var CompilationString = "";
	
	$(document).ready(function(){
		if($(".FleetCompilation").length > 0){
			$(".FleetReport").each(function(){
				thisRoute = $(this).data("route").replace(/\W+/g, "");
				thisFleet = [ $(this).data("ship1"), $(this).data("ship2"), $(this).data("ship3"), $(this).data("ship4"), $(this).data("ship5"), $(this).data("ship6"), ];
				thisFleet.sort();
				fleetIndexer = thisFleet.join("-");
				if(typeof routes[thisRoute] == "undefined"){
					routes[thisRoute] = {};
				}
				if(typeof routes[thisRoute][fleetIndexer] == "undefined"){
					routes[thisRoute][fleetIndexer] = 0;
				}
				routes[thisRoute][fleetIndexer]++;
			});
			
			CompilationString = "";
			for(routeName in routes){
				CompilationString += "<div style='margin:0px 10px 10px; background:#fff; border:1px solid #ccc;'>";
				CompilationString += "<div style='padding:5px 10px;'>";
				CompilationString += "<div style='font-size:16px; font-weight:bold;'>"+routeName+"</div>";
				for(compoName in routes[routeName]){
					CompilationString += "<div style='margin:0px 0px 5px 0px;'><div style='width:200px; font-size:14px; font-weight:bold; float:left;'>"+compoName+"</div><div style='width:200px; height:16px; border:1px solid #000; background:#444; float:left; margin:0px 10px 0px 0px;'><div style='width:"+routes[routeName][compoName]+"px; height:16px; background:#0f0;'></div></div><div style='width:100px; float:left; font-weight:bold;'>"+routes[routeName][compoName]+"</div><div style='clear:both;'></div></div>";
				}
				CompilationString += "</div></div>";
			}
			$(".FleetCompilation").append(CompilationString);
			console.log(routes);
		}
	});

}(jQuery));