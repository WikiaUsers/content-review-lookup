/*
	Simple but flexible javascript tabs
	v0.3
	Author: Abdullah A. Abduldayem
	Contact: http://www.zeldawiki.org/User:Abdullah
	See https://zelda.gamepedia.com/MediaWiki_talk:Gadget-Tabs.js for examples and documentation
*/

$(document).ready(function(){
  // When a tab is clicked
  $(".tab").click(function () {
    var $siblings= $(this).parent().children();
    var $alltabs = $(this).closest(".tabcontainer");
    var $content = $alltabs.parent().children(".tabcontents");

    // switch all tabs off
    $siblings.removeClass("active");

    // switch this tab on
    $(this).addClass("active");

    // hide all content
    $content.children(".content").css("display","none");

    // show content corresponding to the tab
    var index = $siblings.index(this);
    $content.children().eq(index).css("display","block");
  });	
});