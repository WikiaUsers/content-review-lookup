/**
  Related to Don't Starve Wiki Hover Tabs
  Enabling this scripts allows tab selectors identified by DSWHoverTabSelector css class to be pinned by   clicking the tab selector in them, identified by DSWHoverTabDefault css class.
  Clicking an item with DSWHoverTabSelector class changes adds DSWHoverTabDefault class to it, and removes it from its siblings.
**/


; (function ($) {
    $(".DSWHoverTab").click(function(){
        $(this).siblings(".DSWHoverTabDefault").removeClass("DSWHoverTabDefault");
        $(this).addClass("DSWHoverTabDefault");
    });
})(this.jQuery);