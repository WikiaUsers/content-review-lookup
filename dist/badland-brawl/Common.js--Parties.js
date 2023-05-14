/*

===== Party DPL Table Filters ====
    Based on King Dragonhoff code
    
    This script makes the filters placed on 
    the Parties page by Template: BDFilters work.
    
    This script's only dependency is the Clone template
    and the templates that it depends on. This script
    should not require updating after a game update.

*/

var landsInOrder = [];
function arrayIntersection(array1,array2) {
    return array1.some(function(v) {
        return array2.indexOf(v) != -1; 
    });
}
$(document).ready(function() {
    // Show/hide filters area when button is clicked
    $("#PartyNav #bd-filters-button").click(function() {
        $("#PartyNav #bd-filters").slideToggle();
    });
    // Change clone button appearance to show toggle state
    $("#PartyNav #bd-filters-cards .cr-display-clone").click(function() {
        $(this).toggleClass("bd-clone-filtered");
    });
    // Assign numbers to the Land Required cells
    $("#PartyNav #bd-filters-land option").each(function(i) {
        landsInOrder[i] = $(this).text().trim();
    });
    $("#Party-DPL-Table tr:not(:eq(0))").each(function() {
        var thisCellLand = $("td:eq(1)", this).text().trim();
        var thisCellLandNum = String(landsInOrder.indexOf(thisCellLand));
        $("td:eq(1)", this).attr("data-land-number", thisCellLandNum);
    });
    // Toggle clone buttons because of related inputs
    $("#PartyNav #bd-filters-party").change(function() {
        $("#PartyNav #bd-filters-clones .cr-display-clone").each(function() {
            if (Number($(this).attr("data-clone-land")) > Number($("#PartyNav #bd-filters-land").val())) {
                $(this).addClass("bd-clone-filtered");
            } else {
                if ($("#PartyNav #bd-filters-" + $(this).attr("data-clone-rarity").toLowerCase()).prop("checked") === true) {
                    $(this).removeClass("bd-clone-filtered");
                }
            }
        });
    });
    $("#PartyNav #bd-filters-primal, #PartyNav #bd-filters-evolved, #PartyNav #bd-filters-mythical, #PartyNav #bd-filters-unreal").change(function() {
        var checkboxRarity = this.value;
        var rarityChecked = $(this).prop("checked");
        $("#PartyNav #bd-filters-clones .cr-display-clone").each(function() {
            if ($(this).attr("data-clone-rarity") == checkboxRarity) {
                if (rarityChecked === false) {
                    $(this).addClass("bd-clone-filtered");
                } else {
                    if (Number($(this).attr("data-clone-land")) <= $("#PartyNav #bd-filters-land").val()) {
                        $(this).removeClass("bd-clone-filtered");
                    }
                }
            }
        });
    });
    // Check XP level inputs
    $("#PartyNav #bd-filters-xp-min").change(function() {
        $("#PartyNav #bd-filters-xp-max option").each(function() {
            if (Number(this.value) < Number($("#PartyNav #bd-filters-xp-min").val())) {
                $(this).prop("disabled", true);
            } else {
                $(this).prop("disabled", false);
            }
        });
        if (Number(this.value) > Number($("#PartyNav #bd-filters-xp-max").val())) {
            $(this).val($("#PartyNav #bd-filters-xp-max").val());
        }
    });
    $("#PartyNav #bd-filters-xp-max").change(function() {
        $("#PartyNav #bd-filters-xp-min option").each(function() {
            if (Number(this.value) > Number($("#PartyNav #bd-filters-xp-max").val())) {
                $(this).prop("disabled", true);
            } else {
                $(this).prop("disabled", false);
            }
        });
        if (Number(this.value) < Number($("#PartyNav #bd-filters-xp-min").val())) {
            $(this).val($("#PartyNav #bd-filters-xp-min").val());
        }
    });
    // ********** Submit form (Hide rows that do not match the filters) **********
    $("#PartyNav #bd-filters-apply").click(function() {
        // Show all rows
        $("#Party-DPL-Table tr").show();
        // Remove the "No Results" row
        $("#Party-DPL-Table tbody #bd-no-results").remove();
        // Inputs
        var deckNameFilter = $("#PartyNav #bd-filters-name").val().toLowerCase(),
            //highestLandFilter = $("#PartyNav #bd-filters-land").val(),
            //includePrimalFilter = $("#PartyNav #bd-filters-primal").val(),
            //includeEvolvedFilter = $("#PartyNav #bd-filters-evolved").val(),
            //includeMythicalFilter = $("#PartyNav #bd-filters-mythical").val(),
            //includeUnrealFilter = $("#PartyNav #bd-filters-unreal").val(),
            minXPFilter = Number($("#PartyNav #bd-filters-xp-min").val()),
            maxXPFilter = Number($("#PartyNav #bd-filters-xp-max").val()),
            authorFilter = $("#PartyNav #bd-filters-author").val().toLowerCase();
        var disallowedClones = [];
        $("#PartyNav #bd-filters-clones .cr-display-clone").each(function() {
            var thisCloneName = $(this).attr("data-clone-name").trim();
            if ($(this).hasClass("bd-clone-filtered") === true) {
                disallowedClones.push(thisCloneName);
            }
        });
        $("#Party-DPL-Table tr:not(:eq(0))").each(function() {
            // Party Name filter
            var partyName = $("td:eq(0)", this).text().toLowerCase();
            if (partyName.includes(partyNameFilter) === false) {
                $(this).hide();
            }
            // XP filter
            var partyKingLvls = $("td:eq(2)", this).text().replace(/" "/g, "").trim().split("-");
            if ((minXPFilter <= Number(partyKingLvls[0]) && maxXPFilter >= Number(partyKingLvls[1])) || (minXPFilter >= Number(partyKingLvls[0]) && maxXPFilter <= Number(partyKingLvls[1])) || (minXPFilter >= Number(partyKingLvls[0]) && minXPFilter <= Number(partyKingLvls[1])) || (maxXPFilter >= Number(partyKingLvls[0]) && maxXPFilter <= Number(partyKingLvls[1]))) {} else {
                $(this).hide();
            }
            // Author filter
            var partyAuthor = $("td:eq(4)", this).text().toLowerCase();
            if (partyAuthor.includes(authorFilter) === false) {
                $(this).hide();
            }
            // Clones/Land filter
            var thisPartyClones = [], a;
            for (a = 5; a < 13; a++) {
                thisPartyClones[a] = $("td:eq(" + a + ")", this).text().trim();
            }
            if (arrayIntersection(thisPartyClones,disallowedClones) === true) {
                $(this).hide();
            }
        });
        // If all rows are hidden, say that there are no results
        if (!$("#Party-DPL-Table tr:not(:eq(0)):visible").length) {
            $("#Party-DPL-Table tbody").append('<tr id="bd-no-results"><td colspan="13" style="font-size: 110%; font-style: italic; text-align: center;">No Results</td></tr>');
        }
    });
    // ************************** Reset form **************************
    $("#PartyNav #bd-filters-reset").click(function() {
        // Name and author textboxes
        $("#PartyNav #bd-filters-name, #PartyNav #bd-filters-author").val("");
        // Reset all drop-downs
        $('#PartyNav option').prop('selected', function() {
            return this.defaultSelected;
        });
        $("#PartyNav #bd-filters-land").change();
        $("#PartyNav #bd-filters-xp-min").change();
        $("#PartyNav #bd-filters-xp-max").change();
        // Rarity checkboxes
        $("#PartyNav #bd-filters-primal").prop("checked", true).change();
        $("#PartyNav #bd-filters-evolved").prop("checked", true).change();
        $("#PartyNav #bd-filters-mythical").prop("checked", true).change();
        $("#PartyNav #bd-filters-unreal").prop("checked", true).change();
        // Clone buttons
        $("#PartyNav #bd-filters-clones .cr-display-clone").removeClass("bd-clone-filtered");
        // Show all rows
        $("#Party-DPL-Table tr").show();
        // Remove the "No Results" row
        $("#Party-DPL-Table tbody #bd-no-results").remove();
    });
});