/*For use on the following page: Card Search*/

var attribute = ["水", "火", "木", "光", "暗"]; 
var race = ["人類", "獸類", "妖精類", "龍類", "神族", "進化素材", "強化素材", "魔族", "", "機械族"]; 

var activeFilters = {};
$(".queryButton").each(function() {
    activeFilters[$(this).data("group")] = [];
});

function filterCards() {
    $("#monsterData > div").each(function() {
        var isVisible = false;
        for (var filterType in activeFilters) {
            var filterValues = activeFilters[filterType];
            if (filterValues.length) {
                var matchFound = false;
 
                var cardValues = $(this).attr("data-" + filterType).split(",");
                for (var i = 0; i < filterValues.length; i++) {
                    if (cardValues.includes(filterValues[i])) {
                        matchFound = true;
                        break;
                    }
                }
                if (!matchFound) {
                    isVisible = false;
                    break;
                } else {
                    isVisible = true;
                }
            }
        }
                
        $(this).toggle(isVisible);
    });
}

function sortCards(sortBy) {
    var sortOrder = -1;
    if (sortBy == "monsterid" || sortBy == "attribute" || sortBy == "racialtype") {
        sortOrder = 1;
    }
    
    $("#monsterData > div").each(function() {
        var value = $(this).attr("data-" + sortBy);
        var order = (parseInt(value) * 10000 + parseInt($(this).attr("data-monsterid"))) * sortOrder;
        $(this).css("order", order.toString());
        
        var displayText = value;
        
        if (sortBy == "attribute") {
            displayText = attribute[parseInt(value) - 1];
        } else if (sortBy == "racialtype") {
            displayText = race[parseInt(value) - 1];
        } else if (sortBy == "monsterid") {
            displayText = "No. " + value;
        } else if (sortBy == "star") {
            displayText = value + "★";
        }
        
        $(this).find(".monsterLv").text(displayText);
    });
}

$(".queryButton[data-group=order]").filter("[data-value=monsterid]").addClass("queryButtonActive");
$(".queryButton").click(function(){
    if ($(this).data("group") == "order") {
        $(".queryButton[data-group=order]").removeClass("queryButtonActive");
        $(this).toggleClass("queryButtonActive");
 
        var sortBy = $(this).attr("data-value");
        sortCards(sortBy);
    } else if ($(this).data("group") == "reset") {
        var filterToClear = $(this).attr("data-value");
        if (filterToClear == "all" || filterToClear == "") {
            $(".queryButtonActive").not("[data-group=order]").removeClass("queryButtonActive");
            for (var filterType in activeFilters) {
                activeFilters[filterType] = [];
            }
        } else {
            $(".queryButtonActive").filter("[data-group=" + filterToClear + "]").removeClass("queryButtonActive");
            activeFilters[filterToClear] = [];
        }
        filterCards();
    } else {
        $(this).toggleClass("queryButtonActive");
 
        var selectedFilterType = $(this).attr("data-group");
        activeFilters[selectedFilterType] = [];
        $(".queryButtonActive").filter("[data-group=" + selectedFilterType + "]").each(function(){
            var selectedFilterValues = $(this).attr("data-value").split(",");
            activeFilters[selectedFilterType] = activeFilters[selectedFilterType].concat(selectedFilterValues);
        });
        filterCards();
    }
});