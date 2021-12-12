/*
	Simple but flexible javascript tabs
	v0.3
	Author: Abdullah A. Abduldayem
	Contact: http://www.zeldawiki.org/User:Abdullah
	See http://www.zeldawiki.org/MediaWiki_talk:Tabs.js for examples and documentation
*/

console.log('cachebreak');

$(function(){
  // When a tab is clicked
  $(".tab").click(function () {
    var $siblings= $(this).parent().children();
    var $alltabs = $(this).closest(".tabcontainer");
    var $content = $alltabs.parent().children(".tabcontents");

    // switch all tabs off
    $siblings.removeClass("active");
    $content.children().removeClass("content--active");

    // switch this tab on
    $(this).addClass("active");
    var index = $siblings.index(this);
    $content.children().eq(index).addClass("content--active");
  });	
});