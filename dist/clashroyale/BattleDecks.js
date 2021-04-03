/*

===== Battle Deck DPL Table Filters ====
    By King Dragonhoff
    
    This script makes the filters placed on 
    the Battle Decks page by Template: BDFilters work.
    
    This script's only dependency is the Card template
    and the templates that it depends on. This script
    should not require updating after a game update.

*/

var arenasInOrder = [];
function arrayIntersection(array1,array2) {
    return array1.some(function(v) {
        return array2.indexOf(v) != -1; 
    });
}
$(document).ready(function() {
    // Show/hide filters area when button is clicked
    $("#BattleDeckNav #bd-filters-button").click(function() {
        $("#BattleDeckNav #bd-filters").slideToggle();
    });
    // Change card button appearance to show toggle state
    $("#BattleDeckNav #bd-filters-cards .cr-display-card").click(function() {
        $(this).toggleClass("bd-card-filtered");
    });
    // Assign numbers to the Arena Required cells
    $("#BattleDeckNav #bd-filters-arena option").each(function(i) {
        arenasInOrder[i] = $(this).text().trim();
    });
    $("#Battle-Deck-DPL-Table tr:not(:eq(0))").each(function() {
        var thisCellArena = $("td:eq(1)", this).text().trim();
        var thisCellArenaNum = String(arenasInOrder.indexOf(thisCellArena));
        $("td:eq(1)", this).attr("data-arena-number", thisCellArenaNum);
    });
    // Toggle card buttons because of related inputs
    $("#BattleDeckNav #bd-filters-arena").change(function() {
        $("#BattleDeckNav #bd-filters-cards .cr-display-card").each(function() {
            if (Number($(this).attr("data-card-arena")) > Number($("#BattleDeckNav #bd-filters-arena").val())) {
                $(this).addClass("bd-card-filtered");
            } else {
                if ($("#BattleDeckNav #bd-filters-" + $(this).attr("data-card-rarity").toLowerCase()).prop("checked") === true) {
                    $(this).removeClass("bd-card-filtered");
                }
            }
        });
    });
    $("#BattleDeckNav #bd-filters-common, #BattleDeckNav #bd-filters-rare, #BattleDeckNav #bd-filters-epic, #BattleDeckNav #bd-filters-legendary").change(function() {
        var checkboxRarity = this.value;
        var rarityChecked = $(this).prop("checked");
        $("#BattleDeckNav #bd-filters-cards .cr-display-card").each(function() {
            if ($(this).attr("data-card-rarity") == checkboxRarity) {
                if (rarityChecked === false) {
                    $(this).addClass("bd-card-filtered");
                } else {
                    if (Number($(this).attr("data-card-arena")) <= $("#BattleDeckNav #bd-filters-arena").val()) {
                        $(this).removeClass("bd-card-filtered");
                    }
                }
            }
        });
    });
    // Check XP level inputs
    $("#BattleDeckNav #bd-filters-xp-min").change(function() {
        $("#BattleDeckNav #bd-filters-xp-max option").each(function() {
            if (Number(this.value) < Number($("#BattleDeckNav #bd-filters-xp-min").val())) {
                $(this).prop("disabled", true);
            } else {
                $(this).prop("disabled", false);
            }
        });
        if (Number(this.value) > Number($("#BattleDeckNav #bd-filters-xp-max").val())) {
            $(this).val($("#BattleDeckNav #bd-filters-xp-max").val());
        }
    });
    $("#BattleDeckNav #bd-filters-xp-max").change(function() {
        $("#BattleDeckNav #bd-filters-xp-min option").each(function() {
            if (Number(this.value) > Number($("#BattleDeckNav #bd-filters-xp-max").val())) {
                $(this).prop("disabled", true);
            } else {
                $(this).prop("disabled", false);
            }
        });
        if (Number(this.value) < Number($("#BattleDeckNav #bd-filters-xp-min").val())) {
            $(this).val($("#BattleDeckNav #bd-filters-xp-min").val());
        }
    });
    // ********** Submit form (Hide rows that do not match the filters) **********
    $("#BattleDeckNav #bd-filters-apply").click(function() {
        // Show all rows
        $("#Battle-Deck-DPL-Table tr").show();
        // Remove the "No Results" row
        $("#Battle-Deck-DPL-Table tbody #bd-no-results").remove();
        // Inputs
        var deckNameFilter = $("#BattleDeckNav #bd-filters-name").val().toLowerCase(),
            //highestArenaFilter = $("#BattleDeckNav #bd-filters-arena").val(),
            //includeCommonFilter = $("#BattleDeckNav #bd-filters-common").val(),
            //includeRareFilter = $("#BattleDeckNav #bd-filters-rare").val(),
            //includeEpicFilter = $("#BattleDeckNav #bd-filters-epic").val(),
            //includeLegendaryFilter = $("#BattleDeckNav #bd-filters-legendary").val(),
            minXPFilter = Number($("#BattleDeckNav #bd-filters-xp-min").val()),
            maxXPFilter = Number($("#BattleDeckNav #bd-filters-xp-max").val()),
            authorFilter = $("#BattleDeckNav #bd-filters-author").val().toLowerCase();
        var disallowedCards = [];
        $("#BattleDeckNav #bd-filters-cards .cr-display-card").each(function() {
            var thisCardName = $(this).attr("data-card-name").trim();
            if ($(this).hasClass("bd-card-filtered") === true) {
                disallowedCards.push(thisCardName);
            }
        });
        $("#Battle-Deck-DPL-Table tr:not(:eq(0))").each(function() {
            // Deck Name filter
            var deckName = $("td:eq(0)", this).text().toLowerCase();
            if (deckName.includes(deckNameFilter) === false) {
                $(this).hide();
            }
            // XP filter
            var deckKingLvls = $("td:eq(2)", this).text().replace(/" "/g, "").trim().split("-");
            if ((minXPFilter <= Number(deckKingLvls[0]) && maxXPFilter >= Number(deckKingLvls[1])) || (minXPFilter >= Number(deckKingLvls[0]) && maxXPFilter <= Number(deckKingLvls[1])) || (minXPFilter >= Number(deckKingLvls[0]) && minXPFilter <= Number(deckKingLvls[1])) || (maxXPFilter >= Number(deckKingLvls[0]) && maxXPFilter <= Number(deckKingLvls[1]))) {} else {
                $(this).hide();
            }
            // Author filter
            var deckAuthor = $("td:eq(4)", this).text().toLowerCase();
            if (deckAuthor.includes(authorFilter) === false) {
                $(this).hide();
            }
            // Cards/Arena filter
            var thisDeckCards = [], a;
            for (a = 5; a < 13; a++) {
                thisDeckCards[a] = $("td:eq(" + a + ")", this).text().trim();
            }
            if (arrayIntersection(thisDeckCards,disallowedCards) === true) {
                $(this).hide();
            }
        });
        // If all rows are hidden, say that there are no results
        if (!$("#Battle-Deck-DPL-Table tr:not(:eq(0)):visible").length) {
            $("#Battle-Deck-DPL-Table tbody").append('<tr id="bd-no-results"><td colspan="13" style="font-size: 110%; font-style: italic; text-align: center;">No Results</td></tr>');
        }
    });
    // ************************** Reset form **************************
    $("#BattleDeckNav #bd-filters-reset").click(function() {
        // Name and author textboxes
        $("#BattleDeckNav #bd-filters-name, #BattleDeckNav #bd-filters-author").val("");
        // Reset all drop-downs
        $('#BattleDeckNav option').prop('selected', function() {
            return this.defaultSelected;
        });
        $("#BattleDeckNav #bd-filters-arena").change();
        $("#BattleDeckNav #bd-filters-xp-min").change();
        $("#BattleDeckNav #bd-filters-xp-max").change();
        // Rarity checkboxes
        $("#BattleDeckNav #bd-filters-common").prop("checked", true).change();
        $("#BattleDeckNav #bd-filters-rare").prop("checked", true).change();
        $("#BattleDeckNav #bd-filters-epic").prop("checked", true).change();
        $("#BattleDeckNav #bd-filters-legendary").prop("checked", true).change();
        // Card buttons
        $("#BattleDeckNav #bd-filters-cards .cr-display-card").removeClass("bd-card-filtered");
        // Show all rows
        $("#Battle-Deck-DPL-Table tr").show();
        // Remove the "No Results" row
        $("#Battle-Deck-DPL-Table tbody #bd-no-results").remove();
    });
});