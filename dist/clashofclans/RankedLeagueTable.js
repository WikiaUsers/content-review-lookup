// Mini-script to toggle visibility of rows of league loot table using a button
$(document).ready(function() {
	var visible = true;
	$(".toggle-underfloor-button").click(function(){
		$("tr.underfloor-league").toggle();
		visible = !visible;
		if (visible) {
			$(this).text("Hide Inaccessible Leagues");
		} else {
			$(this).text("Show Inaccessible Leagues");
		}
	});
});