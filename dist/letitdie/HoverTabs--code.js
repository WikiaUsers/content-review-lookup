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