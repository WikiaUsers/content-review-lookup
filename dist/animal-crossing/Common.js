(function() { "use strict";
    
window.MessageWallUserTags = {
    users: {
        'Taliseth': 'Viscount'
    },
    tagColor: 'orange',
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
    ]
});

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

})();