/*
    Simple but flexible javascript tabs
    v0.3
    Author: Abdullah A. Abduldayem
    Contact: https://zelda.gamepedia.com/User:Abdullah5599
    See https://zelda.gamepedia.com/MediaWiki_talk:Tabs.js for examples and documentation
*/

$(document).ready(function(){
  // When a tab is clicked
  $(".tab").not(".disabled").click(function () {
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
    var index = $(this).data("index");
    $content.children("[data-index="+index+"]").css("display","block");
  });    
});

/**
  Oxygen Not Included Overlay Tabs
  This should cause any tabs with the class "OniOverlayTab" to be toggle-able, switching back to the Default tab when clicked again.
**/

; (function ($) {
    $(".OniOverlayTab").data("active", false);
    $(".OniOverlayTabDefault").data("active", true);
    $(".OniOverlayTab").not(".disabled").click(function(){
        if($(this).data("active")) {
            if(!$(this).hasClass("OniOverlayTabDefault")) {
                $(this).siblings(".OniOverlayTabDefault").delay(100).click();
            }
        } else {
            $(this).siblings().data("active", false);
            $(this).data("active", true);
        }
    });
})(this.jQuery);