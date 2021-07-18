/* Code for Artworks */
$(document).ready(function () {
	var number = 0;
	var current;
	
	// Set the first .view to display: block;
	$("td.views > div").each(function (index) {
		number = number + 1;
		if (index === 0) {
			$(this).css("display", "block");
			current = 0;
		}
	});
	
	// Bind functions to the left/right keys
	$("body").keyup(function (event) {
		if(event.keyCode == 37) {
			backone();
		}
		if(event.keyCode == 39) {
			forwardone();
		}
	});
	
	// Bind functions to the buttons
	$(".backone").click(function () {
		backone();
	});
	$(".forwardone").click(function () {
		forwardone();
	});
	
	function backone() {
		current--;
		if (current < 0) {
			current = number - 1;
		}
		current2 = current + 1;
		$("td.views > div").css("display", "none");
		$("td.views > div:nth-child(" + current2 + ")").css("display", "block");
		console.log(current);
	}
	
	function forwardone() {
		current++;
		if (current > number - 1) {
			current = 0;
		}
		current2 = current + 1;
		$("td.views > div").css("display", "none");
		$("td.views > div:nth-child(" + current2 + ")").css("display", "block");
		console.log(current);
	}
});