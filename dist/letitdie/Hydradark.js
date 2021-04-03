/* Any JavaScript here will be loaded for users using the Hydra Dark skin */
/*
	Simple but flexible javascript tabs
	v0.3
	Author: Abdullah A. Abduldayem
	Contact: https://zelda.gamepedia.com/User:Abdullah5599
	See https://zelda.gamepedia.com/MediaWiki_talk:Tabs.js for examples and documentation
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

/**
  Related to Let it Die Wiki Hover Tabs
  Enabling this scripts allows tab selectors identified by LIDWHoverTabSelector css class to be pinned by   clicking the tab selector in them, identified by LIDWHoverTabDefault css class.
  Clicking an item with LIDWHoverTabSelector class changes adds LIDWHoverTabDefault class to it, and removes it from its siblings.
**/


; (function ($) {
    $(".LIDWHoverTab").click(function(){
        $(this).siblings(".LIDWHoverTabDefault").removeClass("LIDWHoverTabDefault");
        $(this).addClass("LIDWHoverTabDefault");
    });
})(this.jQuery);