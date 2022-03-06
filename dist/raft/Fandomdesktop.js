/* ComponentsTabs 
 *
 * This system powers the desktop version of Module:ComponentsTabs (used in Template:Infobox/componentsTabs)
 *
 */
var tab = 1
var $th1 = $(".th1");
var $th2 = $(".th2");
var $th3 = $(".th3");
var $th4 = $(".th4");

$(function () {
	$(document.getElementById("th1")).click(function() { // Actions after tab 1 is clicked
		tab = 1;
		$th1.addClass("selectedTab");
		$th2.removeClass("selectedTab");
		$th3.removeClass("selectedTab");
		$th4.removeClass("selectedTab");		
	});
	$(document.getElementById("th2")).click(function() { // Actions after tab 2 is clicked
		tab = 2;
		$th1.removeClass("selectedTab");
		$th2.addClass("selectedTab");
		$th3.removeClass("selectedTab");
		$th4.removeClass("selectedTab");
	});
	$(document.getElementById("th3")).click(function() { // Actions after tab 3 is clicked
		tab = 3;
		$th1.removeClass("selectedTab");
		$th2.removeClass("selectedTab");
		$th3.addClass("selectedTab");
		$th4.removeClass("selectedTab");
	});
	$(document.getElementById("th4")).click(function() { // Actions after tab 4 is clicked
		tab = 4;
		$th1.removeClass("selectedTab");
		$th2.removeClass("selectedTab");
		$th3.removeClass("selectedTab");
		$th4.addClass("selectedTab");
	});
});