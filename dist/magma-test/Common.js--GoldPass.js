$(document).ready(function() {
/* Create inputs */
	$("span#builderBoostHarness").html('<div id="builderBoostMenu">Builder Boost: <select name="builderBoost" id="builderBoost"> <option value="0">0</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> </select> </div>');
/* Get the initial cell values, remove commas, and
set the cell's title attribute to its original value. */
	$(".GoldPass").each(function() {
	var initialValue = $(this).text().replace(/,/g, "") * 1;
	$(this).attr("title", initialValue);
	});
// When Submit button is pressed...
	$("#changeBonusButton").click(function() {
// Change its text to "Update"
		$("#changeBonusButton").text("Update");

		$(".bCost").each(function() {
			var cellValueCost = $(this).attr("title") * 1;
			alert(cellValueCost);
			var boostPercent = $("#builderBoost").val() * 1;
			var calcNewCost = Math.round(cellValueCost * (1-(boostPercent/100)));
			$(this).text(calcNewCost.format("#,##0[.]###"));
			if (calcNewCost === cellValueCost) {
				$(".bCost").removeClass("StatModified");
			} else {
				$(".bCost").addClass("StatModified");
			}
		});
  	});
	$("#resetBonusButton").click(function() {
		$("#changeBonusButton").text("Apply");
		$("#builderBoost").val("0").change();
		$(".GoldPass").each(function() {
			var returnInitial = $(this).attr("title") * 1;
			$(this).text(returnInitial.format("#,##0[.]###"));
			$(this).removeClass("StatModified");
		});
		$(".GoldStr").each(function() {
			var returnInitial = $(this).attr("title");
			$(this).text(returnInitial);
			$(this).removeClass("StatModified");
		});
	});
});