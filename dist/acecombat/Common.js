/* These codes are run on every page load for all users. */

// Smaller parenthetical in page titles
$(function(){
	if(wgCanonicalNamespace == ""){
		var pageTitle = "h1.page-header__title";
		if(!$(pageTitle).length){
			pageTitle = "#firstHeading";
			if(!$(pageTitle).length){
				pageTitle = "";
			}
		}
		if(pageTitle.length != 0){
			var res = $(pageTitle).text().split(" (");
			if(res[1]){
				var final = res[res.length-1].split(")");
				$(pageTitle).html(res[0] + " <span style='font-size:75%;opacity:0.75;'>(" + final[0] + ")</span>" + final[1]);
			}
		}
	}
});

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Founder', order:-1/0 },
		bureaucrat: { order:-8491, link:'Project:Bureaucrats' },
		sysop: { u:'Administrator', order:-1/0, link:'Project:Administrators' },
	}
};
UserTagsJS.modules.custom = {
	'Thunderhead': ['founder'],
	'SlyCooperFan1': ['sysop']
};

// Auto Update Recent Changes
// See http://dev.wikia.com/wiki/AjaxRC
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];


// Tooltip Configuration
var tooltips_config = {
	offsetX: 5,
	offsetY: 5,
}


// Poll hover emulation for Project:Polls
var tmpPoll;var elePoll;
$(".poll-table .pollAnswerVotes").hover(function(){
	elePoll = $(this).find(".poll-page-percent");
	tmpPoll = elePoll.text();
	elePoll.text(elePoll.attr("title"));
	elePoll.attr("title","").attr("poll-votes",tmpPoll);
}, function(){
	tmpPoll = elePoll.text();
	elePoll.text(elePoll.attr("poll-votes"));
	elePoll.attr("title",tmpPoll).attr("poll-votes","");
});



// Warnings to move to Discussions instead of Special:Forum
var slyforum=false;
if(window.location.href.indexOf("/wiki/Special:Forum") > -1 || window.location.href.indexOf("/wiki/Board:") > -1) {
	slyforum=true;
	var slyforum_big="#Forum";
} else if(window.location.href.indexOf("/wiki/Thread:") > -1 && $("#mw-content-text > .BreadCrumbs:eq(0) > a:eq(0)").text()=="Forum"){
	slyforum=true;
	var slyforum_big="#Wall";
}
if(slyforum){
	$(slyforum_big).before("<div style='margin-top:10px;border-top:1px dotted gray;border-bottom:1px dotted gray;padding-top:10px;padding-bottom:10px;'><span style='font-size:18px;'><strong style='color:red;'>This Forum will be replaced by <a href='/d/f/'>the new Discussions feature.</a></strong> Please refrain from using this Forum and migrate to <a href='/d/f/'>Discussions.</a></span><br/><br/><span style='font-size:16px;'>All Forum threads, replies, and Kudos will be converted into Discussions in the future. No timeline on the conversion is available, but using the Discussions feature now will prevent more hassle when converting.</span></div>");
}



// Infinity Credit Price Calculator
function getlvprice(x){ // return a proper Number for an aircraft's cost at Lv.x
	return Number($("#inf-lv"+x+"cost").text().replace(/[,–-]/g, ''));
}

function infcalculate(){ // Calculate the total cost of the specified levels
	var inftotal = 0;
	var infmin = Number($("#inf-startlv-in").val());
	var infmax = Number($("#inf-finallv-in").val());
	for(var i = infmin+1; i <= infmax; i++){
		inftotal += getlvprice(i);
	}
	if((document.getElementById("inf-nsu-check").checked) && (infmin < 6) && (infmax > 5)){
		inftotal -= getlvprice(6);
	}
	var strtotal = inftotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#inf-totalcost").text(strtotal);
}

$(function(){ // Main function - add the calculator to pages with Infinity stats
	if($("#inf-startlv-num").length){
		for(var j = 1; j <= 20; j++){ // Detect minimum level for aircraft awarded at a higher level
			if(getlvprice(j) != 0){
				break;
			}
		}
		var jmin = j-1;
		if(jmin > 0){
			$("#inf-startlv-num").text(jmin).css("color", "#99F");
			$("#inf-finallv-num").text(j).css("color", "#99F");
		}
		for(var k = 20; k >= j; k--){ // Detect maximum level that we have the price for
			if((getlvprice(k) == 0) && (getlvprice(k-1) != 0)){
				break;
			}
		}
		var kmin = k-2;
		var kmax = k-1;
		if(kmax > jmin){
			$("#inf-startlv-num2").text(kmin).css("color", "#F99");
			$("#inf-finallv-num2").text(kmax).css("color", "#F99");
		} else { // Failsafe to default for any edge cases
			kmin = 19;
			kmax = 20;
		}
		$("#inf-startlv").html("<input placeholder='##' type='number' id='inf-startlv-in' value='"+jmin+"' min='"+jmin+"' max='"+kmin+"' style='width:50px;' />");
		$("#inf-finallv").html("<input placeholder='##' type='number' id='inf-finallv-in' value='"+kmax+"' min='"+j+"' max='"+kmax+"' style='width:50px;' />");
		$("#inf-nsu").html("<input type='checkbox' id='inf-nsu-check' style='margin-top:-5px;' />");
		infcalculate();
		$("#inf-startlv, #inf-finallv").change(function(){
			infcalculate(); // On level input change, calculate the new price
		});
		$("#inf-nsu-check").click(function(){
			infcalculate(); // On NSU checkbox click, calculate the new price
		});
	}
});

// Toggle All button for ACZ
function toggleAllAR(){
	for(i=0; i<169; i++){
		if(i<100) i="0"+i;
		if(i<10) i="0"+i;
		$("#mw-customcollapsible-"+i).toggle();
	}
}
$(function(){
	$("#acz-toggleall").css("text-align","center").html("<button onclick='toggleAllAR()' style='width:200px;font-size:18pt;height:45px;'>Toggle All</button>");
});