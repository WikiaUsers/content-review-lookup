(function() { "use strict";

// Turnip price calculator

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.sellTurnips = function() {
	var buyPrice = $("#turnip-buy-price").val();
	var sellPrice = $("#turnip-sell-price").val();
	var turnipQuantity = $("#turnip-quantity").val();
	
	var turnipRevenue = turnipQuantity * sellPrice;
	var turnipExpenditure = turnipQuantity * buyPrice;
	var turnipProfit = turnipRevenue - turnipExpenditure;
	
	$("#turnip-revenue").html(numberWithCommas(turnipRevenue));
	$("#turnip-expenditure").html(numberWithCommas(turnipExpenditure));
	$("#turnip-profit").html(numberWithCommas(turnipProfit));
	
}

$("#turnip-loader").html('<div id="turnip-form" style="max-width:400px;"> <table style="width:100%;"><tr><td>Price of turnips from Joan</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="turnip-buy-price"></td><tr></tr><td>Number of turnips bought</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="turnip-quantity"></td><tr></tr><td>Price of turnips from Reese</td><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="turnip-sell-price"></td></td><tr><td colspan="2" style="text-align:center; padding: 5px;"><button id="sell-turnip-button" onClick="sellTurnips();">Sell my turnips!</button></td></tr><tr> <td>Revenue</td><td style="text-align: right; color:blue;"><b><span id="turnip-revenue">0</span> Bells</b></td></tr><tr> <td>Expenditure</td><td style="text-align: right; color:red;"><b><span id="turnip-expenditure">0</span> Bells</b></td></tr><tr> <td>Profit</td><td style="text-align: right; color:green;"><b><span id="turnip-profit">0</span> Bells</b></td></tr></table> </div>');

// profile tags are located at MediaWiki:ProfileTags
// imports are located at MediaWiki:ImportJS

window.InactiveUsers = { months: 4 };

// Time to automate the season change tbh

var currentSeason;
switch((new Date()).getMonth() + 1) {
    case 12:
    case 1:
    case 2:
        currentSeason = "winter";
        break;
    case 3:
    case 4:
    case 5:
        currentSeason = "spring";
        break;
    case 6:
    case 7:
    case 8:
        currentSeason = "summer";
        break;
    case 9:
    case 10:
    case 11:
        currentSeason = "autumn";
        break;
    default:
        currentSeason = "summer";
        break;
}

var seasonStyle = {
	spring: {
		hover: "#337800",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c4/Grass_spring.png/revision/latest"
	},
	summer: {
		hover: "#337800",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/8/8f/Grass_summer.png/revision/latest"
	},
	autumn: {
		hover: "#A15B26",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/5/5b/Grass_autumn.png/revision/latest"
	},
	winter: {
		hover: "#04049E",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/f/f3/Grass_snow.png/revision/latest"
	}
};

mw.util.addCSS("a:hover { text-shadow: 0 0 1em "+seasonStyle[currentSeason].hover+", 0 0 0.2em "+seasonStyle[currentSeason].hover+"; color:white !important; } \
a.topiclink:hover { text-shadow: 0 0 1em "+seasonStyle[currentSeason].hover+", 0 0 0.2em "+seasonStyle[currentSeason].hover+"; color:white !important; } \
:root { --custom-season-background-image:url('"+seasonStyle[currentSeason].url+"'); }");

})();