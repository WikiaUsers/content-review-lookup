console.log("works0")
var rawPrice;
console.log("works1")
$("#updateGEPriceButton button").remove();
$("#updateGEPriceButton").append('<button onclick="updatePriceFunction()">Update price</button>');
console.log("works2")
function updatePriceFunction() {
	console.log("works3")
	$(document).ready(function(){
		$.ajax({
			url: 'http://services.runescape.com/m=itemdb_rs/viewitem.ws?obj=5315',
			dataType: 'JSONP',
			crossDomain: true,
			jsonpCallback: 'getPrice'
		});
	})
			
	console.log("works4")
}

function getPrice(data) {
	$("<p>").html(data);
	//console.log(String(data))
}