importScriptPage('ShowHide/code.js','dev');
importScriptPage('AjaxRC/code.js','dev');

addOnloadHook(
    function () { 
         $("#rw").css("display", "inline").appendTo($(".firstHeading"));
    }
);

addOnloadHook(
    function () {
         $(".WikiaPageHeader details .categories").remove();
         $(".WikiaPageHeader details").append($("#rw"));
    }
);