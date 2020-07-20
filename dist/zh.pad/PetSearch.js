var max_cost = 100;
var gacha_data = [];
var fdgacha_data = [];
var series_data = {};
function petSearch(){
	$("#loading").addClass("a-wood").text("載入已完成").delay(1000).slideUp();
	$("[data-group=order]:first-child").addClass("queryButtonActive");
	$(".queryButton").click(function(){
		if ($(this).hasClass("queryButtonActive")){
			if ($(this).data("group")!="order") $(this).removeClass("queryButtonActive");
		} else {
			if ($(this).data("group")=="order") $("[data-group="+$(this).data("group")+"]").removeClass("queryButtonActive");
			$(this).addClass("queryButtonActive");
		}
		if ($(this).data("group")=="order"){
			switch($(this).data("value")){
				case "cost":$(".filterIconText").each(function(){$(this).text($(this).parent().data("cost"))}); break;
				case "type":$(".filterIconText").each(function(){
					if ($(this).parent().data("type2")=="") $(this).text($(".queryButton[data-group=type][data-value="+$(this).parent().data("type")+"]").text());
					else $(this).html($(".queryButton[data-group=type][data-value="+$(this).parent().data("type")+"]").text()+"<br>"+$(".queryButton[data-group=type][data-value="+$(this).parent().data("type2")+"]").text());
				}); break;
				case "series":$(".filterIconText").each(function(){$(this).text($(".queryButton[data-group=series][data-value="+$(this).parent().data("series")+"]").text())}); break;
				case "hp":$(".filterIconText").each(function(){$(this).text($(this).parent().data("hp"))}); break;
				case "atk":$(".filterIconText").each(function(){$(this).text($(this).parent().data("atk"))}); break;
				case "rcv":$(".filterIconText").each(function(){$(this).text($(this).parent().data("rcv"))}); break;
				case "mixed":$(".filterIconText").each(function(){$(this).text($(this).parent().data("mixed"))}); break;
				default: $(".filterIconText").text("");
			}
			switch($(this).data("value")){
				case "cost": case "hp": case "atk": case "rcv": case "mixed": $("#queryList").isotope({sortBy:$(this).data("value"),sortAscending:false}); break;
				default: $("#queryList").isotope({sortBy:$(this).data("value"),sortAscending:true})
			}
		}else{
			$("#queryList").isotope({filter:filterCond()});
		}
	});
	$( "#cost-slider-range" ).slider({
		range: true,
		min: 1,
		max: max_cost,
		values: [1, max_cost],
		slide: function( event, ui ) {
			$("#cost-range-values").text( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		},
		change: function( event, ui ) {
			$("#queryList").isotope({filter:filterCond()});
		}
	});
	$("#queryList").isotope({
		layoutMode: "fitRows",
		itemSelector: ".filterIcon",
		getSortData:{
			no:function($e){return parseInt($e.data("no"), 10)},
			rare:function($e){return parseInt($e.data("rare"), 10)},
			cost:function($e){return parseInt($e.data("cost"), 10)},
			attr:function($e){return $e.data("attr")},
			subattr:function($e){return $e.data("subattr")},
			type:function($e){return $e.data("type")},
			type2:function($e){return $e.data("type2")},
			series:function($e){return $e.data("series")},
			hp:function($e){return parseInt($e.data("hp"), 10)},
			atk:function($e){return parseInt($e.data("atk"), 10)},
			rcv:function($e){return parseInt($e.data("rcv"), 10)},
			mixed:function($e){return parseFloat($e.data("mixed"))}
		},
		filter:"null"
	});
	$("#queryList").show();
}
function filterCond(){
	var c="";
	var s="";
	var t=[];
	var p=[];
	var a=new Object();
	$(".queryButtonActive").each(function(){
		if ($(this).data("group")!="order"){
			if ($(this).data("group")!=c){
				a[$(this).data("group")]=[$(this).data("value")];
				c=$(this).data("group");
			}else{
				a[$(this).data("group")].push($(this).data("value"));
			}
		}
	});
	var cr = $("#cost-slider-range").slider("values");
	var apply_cost_filter = true;
	if (cr[0] == 1) {
		if (cr[1] == max_cost) {
			apply_cost_filter = false;
		}
	}
	if (apply_cost_filter) {
		a["cost"] = [];
		for (var tc=cr[0];tc<=cr[1];tc++) {a["cost"].push(tc)}
	}
	for (var k in a){
		p=[];
		for (var i=0; i<a[k].length; i++){
			if (k == "awokenSkill") {
				c="[data-"+k+"*='|"+a[k][i]+"']";
			}else{
				c="[data-"+k+"="+a[k][i]+"]";
			}
			t=s.split(",");
			for (var j=0; j<t.length; j++){
				if (k=="type") t[j]=t[j]+c+","+t[j]+"[data-type2="+a[k][i]+"]";
				else t[j]+=c;
			}
			p.push(t.join(","));
		}
		s=p.join(",");
	}
	if (s=="") s="null";
	return s;
}
function getPetData(){
	$.get('https://www.padherder.com/api/monsters/', function(data){
		function null2blank(v){if (typeof(v) !== 'undefined') return v;return "";}
		var m, aa,aar, id;
		for (var i=0;i<data.length; i++){
			m = data[i];
			aa = {};
			for (var a=0;a<m.awoken_skills.length; a++){
				if (typeof(aa[m.awoken_skills[a]]) == "undefined") {
					aa[m.awoken_skills[a]] = "|"+m.awoken_skills[a];
				} else {
					aa[m.awoken_skills[a]] += "+";
				}
			}
			aar = [];
			for(var key in aa) {
				aar.push(aa[key]);
			}
			id = (m.id < 10)?"00"+m.id:((m.id < 100)? '0'+m.id:m.id);
			$('#queryList').append(
				$('<div class="filterIcon" data-series="'+(null2blank(series_data[m.id]))+'" data-fdgacha="'+((fdgacha_data.indexOf(m.id)==-1)?0:1)+'" data-gacha="'+((gacha_data.indexOf(m.id)==-1)?0:1)+'" data-no="'+id+'" data-type="'+m.type+'" data-type2="'+null2blank(m.type2)+'" data-attr="'+m.element+'" data-subattr="'+null2blank(m.element2)+'" data-rare="'+m.rarity+'" data-cost="'+m.team_cost+'" data-exptype="'+(m.xp_curve/10000)+'" data-hp="'+m.hp_max+'" data-atk="'+m.atk_max+'" data-rcv="'+m.rcv_max+'" data-mixed="'+(Math.round((m.hp_max/10+m.atk_max/5+m.rcv_max/3)*10)/10)+'" data-awokenSkill="'+aar.join("")+'">').
				append('<img src="https://www.padherder.com'+m.image60_href+'" width="60" height="60">').
				append('<div class="filterIconID">'+id+'</div>').
				append('<div class="filterIconText"></div>').
				append('<div class="filterIconStar">'+m.rarity+'★</div>').
				append($('<div style="position:absolute;top:5px;left:3px">').
					   append('<a href="/wiki/'+id+'" class="image image-thumbnail link-internal" title="No.'+id+'　'+m.name_jp+'"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="60" height=""60></a>')
				)
			);
		}
		petSearch();
	});
}
function getSeriesData(){
	ajaxWikiaAPI("Template:Monster/SeriesByID", function(data){data.split('\n').map(function(line){if(/^\|\d+=/.test(line)){series_data[parseInt(line.split("=")[0].substr(1))]=line.split("=")[1]}});getPetData();});
}
function getFdgachaData(){
	ajaxWikiaAPI("Template:Monster/FriendGachaByID", function(data){data.split('\n').map(function(line){if(/^\|\d+=1$/.test(line)){fdgacha_data.push(parseInt(line.split("=")[0].substr(1)))}});getSeriesData();});
}
function getGachaData(){
	ajaxWikiaAPI("Template:Monster/GachaByID", function(data){data.split('\n').map(function(line){if(/^\|\d+=1$/.test(line)){gacha_data.push(parseInt(line.split("=")[0].substr(1)))}});getFdgachaData();});
}

setTimeout(getGachaData, 2500);

document.getElementById("PetSearch").innerHTML="";