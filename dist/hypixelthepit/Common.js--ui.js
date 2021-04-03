// Code to allow making {{Slot}} clickable to show different content
$(function(){
    if(!$(".sbw-ui-tabber").length) { return; }
    // .hidden works on mobile, but not on desktop
    $(".sbw-ui-tab-content.hidden").hide();
    
    $(".sbw-ui-tabber .invslot").each(function(){
        var classes = Array.from(
                $(this)[0].classList
            ).filter(
                function(c) {
                    return(
                        c.indexOf("goto-") === 0 
                        || c.indexOf("ui-") === 0
                    );
                });
    
        if(classes.length) {
            var className = classes[(classes.length)-1]
                .replace("goto-", "")
                .replace("ui-", "");
                
            $(this).click(function() {
                clickTab(className);
            });
        }
    });
    
    $(".sbw-ui-tabber .sbw-ui-tab").click(function(){
        var id = $(this).data("tab");
        if(id) { clickTab(id); }
    });
    
    function clickTab(id) {
        id = "ui-"+id;
        if(!$("#"+id).length) { console.warn("No such tab ID"); return; }
        $(".sbw-ui-tab-content").addClass("hidden").hide();
        $(".sbw-ui-tab-content#"+id).removeClass("hidden").show();
        // Since images don't load on hidden tabs, force them to load
        $(".sbw-ui-tab-content#"+id+" .lzy[onload]").load();
    }
});