/* ComponentsTabs 
 *
 * This system powers the desktop version of Module:ComponentsTabs (used in Template:Infobox/componentsTabs)
 *
 */
var page = 1;
var tab = 1;
var $th1 = $(".th1");
var $th2 = $(".th2");
var $th3 = $(".th3");
var $th4 = $(".th4");
var $th5 = $(".th5");
var $th6 = $(".th6");
var $th7 = $(".th7");
var $th8 = $(".th8");

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
	
	$(document.getElementById("rightBtn")).click(function() { // switch to page 2
		page = 2
		$th1.removeClass("selectedTab");
		$th2.removeClass("selectedTab");
		$th3.removeClass("selectedTab");
		$th4.removeClass("selectedTab");
		$th5.addClass("selectedTab");
	});
	
	$(document.getElementById("leftBtn")).click(function() { // switch to page 1
		page = 1
		$th5.removeClass("selectedTab");
		$th6.removeClass("selectedTab");
		$th7.removeClass("selectedTab");
		$th8.removeClass("selectedTab");
		$th1.addClass("selectedTab");
	});
	
	$(document.getElementById("th5")).click(function() { // Actions after tab 5 is clicked
		tab = 5;
		$th5.addClass("selectedTab");
		$th6.removeClass("selectedTab");
		$th7.removeClass("selectedTab");
		$th8.removeClass("selectedTab");		
	});
	$(document.getElementById("th6")).click(function() { // Actions after tab 6 is clicked
		tab = 6;
		$th5.removeClass("selectedTab");
		$th6.addClass("selectedTab");
		$th7.removeClass("selectedTab");
		$th8.removeClass("selectedTab");
	});
	$(document.getElementById("th7")).click(function() { // Actions after tab 7 is clicked
		tab = 7;
		$th5.removeClass("selectedTab");
		$th6.removeClass("selectedTab");
		$th7.addClass("selectedTab");
		$th8.removeClass("selectedTab");
	});
	$(document.getElementById("th8")).click(function() { // Actions after tab 8 is clicked
		tab = 8;
		$th5.removeClass("selectedTab");
		$th6.removeClass("selectedTab");
		$th7.removeClass("selectedTab");
		$th8.addClass("selectedTab");
	});
});