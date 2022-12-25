var max_cost = 100;
function petAdvSearch(){
	$("#loading").addClass("a-wood").text("載入已完成").delay(1000).slideUp();
	$(".filterIcon").each(function(){
		$(this).attr("data-mixed", Math.round((parseInt($(this).data("hp"),10)/10+parseInt($(this).data("atk"),10)/5+parseInt($(this).data("rcv"),10)/3)*10)/10);
	});
	$("[data-group=order]:first-child").addClass("queryButtonActive");
	$(".queryButton").click(function(){
		if ($(this).data("group")=="awokenSkill") {
			if ($(this).parents("#selectedAwokenSkill").length==0) $(this).clone().addClass("queryButtonActive").one('click',function(){$(this).remove();$("#queryList").isotope({filter:filterCond()});}).appendTo("#selectedAwokenSkill");
		} else {
			if ($(this).hasClass("queryButtonActive")){
				if ($(this).data("group")!="order") $(this).removeClass("queryButtonActive");
			} else {
				$("[data-group="+$(this).data("group")+"]").removeClass("queryButtonActive");
				$(this).addClass("queryButtonActive");
			}
		}
		if ($(this).data("group")=="order"){
			switch($(this).data("value")){
				case "cost":$(".filterIconText").each(function(){$(this).text($(this).parent().data("cost"))}); break;
				case "type":$(".filterIconText").each(function(){$(this).text($(this).parent().data("type"))}); break;
				case "type2":$(".filterIconText").each(function(){$(this).text($(this).parent().data("type2"))}); break;
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
	var aws=new Object();
	var awsv = "";
	$(".queryButtonActive:not([data-group=awokenSkill])").each(function(){
		if ($(this).data("group")!="order"){
			if ($(this).data("group")!=c){
				a[$(this).data("group")]=[$(this).data("value")];
				c=$(this).data("group");
			}else{
				a[$(this).data("group")].push($(this).data("value"));
			}
		}
	});
	$(".queryButtonActive[data-group=awokenSkill]").each(function(){
		if (typeof aws[$(this).data("value")] == "undefined") {
			aws[$(this).data("value")] = "|"+$(this).data("value");
		} else {
			aws[$(this).data("value")] += "+";
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
			c="[data-"+k+"="+a[k][i]+"]";
			t=s.split(",");
			for (var j=0; j<t.length; j++){
				t[j]+=c;
			}
			p.push(t.join(","));
		}
		s=p.join(",");
	}
	for(var key in aws) {
		s += "[data-awokenSkill*='"+aws[key]+"']";
	}
	if (s=="") s="null";
	return s;
}
function petAdvSearchProxy(){
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
				$('<div class="filterIcon" data-series="" data-fdgacha="0" data-gacha="0" data-no="'+id+'" data-type="'+m.type+'" data-type2="'+null2blank(m.type2)+'" data-attr="'+m.element+'" data-subattr="'+null2blank(m.element2)+'" data-rare="'+m.rarity+'" data-cost="'+m.team_cost+'" data-exptype="'+(m.xp_curve/10000)+'" data-hp="'+m.hp_max+'" data-atk="'+m.atk_max+'" data-rcv="'+m.rcv_max+'" data-mixed="'+(Math.round((m.hp_max/10+m.atk_max/5+m.rcv_max/3)*10)/10)+'" data-awokenSkill="'+aar.join("")+'">').
				append('<img src="https://www.padherder.com'+m.image60_href+'" width="60" height="60">').
				append('<div class="filterIconID">'+id+'</div>').
				append('<div class="filterIconText"></div>').
				append('<div class="filterIconStar">'+m.rarity+'★</div>').
				append($('<div style="position:absolute;top:5px;left:3px">').
					   append('<a href="/wiki/'+id+'" class="image image-thumbnail link-internal" title="No.'+id+'　'+m.name_jp+'"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="60" height=""60></a>')
				)
			);
		}
		petAdvSearch();
	});
}

setTimeout(petAdvSearchProxy, 2500);

document.getElementById("PetAdvSearch").innerHTML="";