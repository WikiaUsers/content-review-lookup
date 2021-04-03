/* These codes are run on every page load for all users. */

// AddRailModule configuration
window.AddRailModule = [
	{page: 'Template:Discord', prepend: true}
];

// Tooltip Configuration
window.tooltips_config = {
	offsetX: 5,
	offsetY: 5,
};

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

// Add upload images button to Special:NewFiles
$(function(){
	if($("body.page-Special_NewFiles").length){
		$(".page-header__contribution-buttons").append("<a class='wds-button' href='/wiki/Special:Upload'><svg class='wds-icon wds-icon-small'><use xlink:href='#wds-icons-image'></use></svg><span>Add new image</span></a>");
	}
});