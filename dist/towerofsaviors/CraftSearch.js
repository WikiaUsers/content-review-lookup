/*For use on the following page: Craft Search*/

var selected = {
    "star":[],
    "race":[],
    "attr":[],
    "mode":[],
    "type":[],
    "charge":[],
    "skill":[]
};

function filterTable() {
    $("#craftData > div").each(function() {
        var category = {
            "star":true,
            "race":true,
            "attr":true,
            "mode":true,
            "type":true,
            "charge":true,
            "skill":true
        }
        
        for (var c in category) {
            if (selected[c] && selected[c].length) {
                category[c] = false;
                
                categoryArray = $(this).attr("data-" + c).split(",");
                var i;
                for (i = 0; i < selected[c].length; i++) {
                    if (categoryArray.includes(selected[c][i])) {
                        category[c] = true;
                        break;
                    }
                }
            }
        }
        
        $(this).toggle(category["star"] && category["race"] && category["attr"] && category["mode"] && category["charge"] && category["skill"] && category["type"]);
    });
}

$(".queryButton[data-group=order]").filter("[data-value=dcid]").addClass("queryButtonActive");
$(".queryButton").click(function(){
    if ($(this).data("group") == "order") {
        $(".queryButton[data-group=order]").removeClass("queryButtonActive");
        $(this).toggleClass("queryButtonActive");
        
        value = $(this).attr("data-value");
        $("#craftData > div").each(function() {
            order = parseInt($(this).attr("data-" + value) * 10000) + parseInt($(this).attr("data-dcid"))
            $(this).css("order", order.toString());
        });
    } else {
        $(this).toggleClass("queryButtonActive");

        group = $(this).attr("data-group")
        selected[group] = [];
        $(".queryButtonActive").filter("[data-group=" + group + "]").each(function(){
            values = $(this).attr("data-value").split(",")
            for (i = 0; i < values.length; i++) {
                selected[group].push(values[i]);
            }
        });
        filterTable();
    }
});