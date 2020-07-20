/* Any JavaScript here will be loaded for all users on every page load. */
addOnloadHook(
    function () { 
         $("#icons").css("display", "inline").appendTo($(".firstHeading"));
    }
);

addOnloadHook(
    function () {
         $(".WikiaPageHeader details .categories").remove();
         $(".WikiaPageHeader details").append($("#icons"));
    }
);