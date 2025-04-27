/* ComponentsTabs 
 *
 * This system powers the desktop version of Module:ComponentsTabs (used in Template:Infobox/componentsTabs)
 *
 */

var page = 1; // allow more tabs

var $th1 = $(".tabHeader1");
var $th2 = $(".tabHeader2");
var $th3 = $(".tabHeader3");
var $th4 = $(".tabHeader4");
var $tb1 = $(".tabBody1");
var $tb2 = $(".tabBody2");
var $tb3 = $(".tabBody3");
var $tb4 = $(".tabBody4");

/* function to remove selected tab class from every tab header and body */
function resetSelectedTab() {
	$th1.removeClass('selectedTab');
	$th2.removeClass("selectedTab");
	$th3.removeClass("selectedTab");
	$th4.removeClass("selectedTab");
	$tb1.removeClass('selectedTab');
	$tb2.removeClass("selectedTab");
	$tb3.removeClass("selectedTab");
	$tb4.removeClass("selectedTab");
}

/* function should work only after DOM is initialized */
$(function () {
	$(document.querySelectorAll("#th1")).click(function() { // Actions after tab 1 is clicked
		resetSelectedTab();
		$th1.addClass('selectedTab');
		$tb1.addClass('selectedTab');
	});
	$(document.querySelectorAll("#th2")).click(function() { // Actions after tab 2 is clicked
		resetSelectedTab();
		$th2.addClass('selectedTab');
		$tb2.addClass('selectedTab');
	});
	$(document.querySelectorAll("#th3")).click(function() { // Actions after tab 3 is clicked
		resetSelectedTab();
		$th3.addClass('selectedTab');
		$tb3.addClass('selectedTab');
	});
	$(document.querySelectorAll("#th4")).click(function() { // Actions after tab 4 is clicked
		resetSelectedTab();
		$th4.addClass('selectedTab');
		$tb4.addClass('selectedTab');
	});
	
	/*
	Page switches 
	$(document.getElementById("rightBtn")).click(function() { // switch to page 2
		page = 2
		resetSelectedTab()
		$th1.addClass('selectedTab');
		$tb1.addClass('selectedTab');
	});
	
	$(document.getElementById("leftBtn")).click(function() { // switch to page 1
		page = 1
		resetSelectedTab()
		$th1.addClass('selectedTab');
		$tb1.addClass('selectedTab');
	});
	*/
});