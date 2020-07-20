/*For use on the following page: Card Drops Search*/

$(".queryIcon").click(function(){
    $(this).toggleClass("iconOn");
    $(this).toggleClass("iconOff");
 
    selected = []
    $(".iconOn").each(function(){
        selected.push($(this).data("id").toString());
    });
 
    $(".dropsTable tr:gt(0)").each(function(){
        var row_drops = $(this).data("drops").split(",");
        $(this).hide();
        var i;
        for (i = 0; i < selected.length; i++) {
            if (row_drops.includes(selected[i])) {
                $(this).show();
                break;
            }
        }
    });
});