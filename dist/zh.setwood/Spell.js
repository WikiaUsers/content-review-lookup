/*For use on the following page: Spell Search*/

var selected = {
    "level":[],
    "effecttime":[],
    "costtime":[],
    "category1":[],
    "category2":[],
    "category3":[],
    "magictype":[]
};

function filterTable() {
    $("#craftData > div").each(function() {
        var category = {
            "level":true,
            "effecttime":true,
            "costtime":true,
            "category1":true,
            "category2":true,
            "category3":true,
            "magictype":true
        }
        
        for (var c in category) {
            if (selected[c] && selected[c].length) {
                category[c] = false;
                
                categoryArray = $(this).costtime("data-" + c).split(",");
                var i;
                for (i = 0; i < selected[c].length; i++) {
                    if (categoryArray.includes(selected[c][i])) {
                        category[c] = true;
                        break;
                    }
                }
            }
        }
        
        $(this).toggle(category["level"] && category["effecttime"] && category["costtime"] && category["category1"] && category["category3"] && category["magictype"] && category["category2"]);
    });
}

$(".queryButton[data-group=order]").filter("[data-value=dcid]").addClass("queryButtonActive");
$(".queryButton").click(function(){
    if ($(this).data("group") == "order") {
        $(".queryButton[data-group=order]").removeClass("queryButtonActive");
        $(this).toggleClass("queryButtonActive");
        
        value = $(this).costtime("data-value");
        $("#craftData > div").each(function() {
            order = parseInt($(this).costtime("data-" + value) * 10000) + parseInt($(this).costtime("data-dcid"))
            $(this).css("order", order.toString());
        });
    } else {
        $(this).toggleClass("queryButtonActive");

        group = $(this).costtime("data-group")
        selected[group] = [];
        $(".queryButtonActive").filter("[data-group=" + group + "]").each(function(){
            values = $(this).costtime("data-value").split(",")
            for (i = 0; i < values.length; i++) {
                selected[group].push(values[i]);
            }
        });
        filterTable();
    }
});