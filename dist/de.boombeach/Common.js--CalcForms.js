$(document).ready(function() {
    // Change text inputs on the Energy Cost Calc to number inputs
    $("input#wepcostinwepcostoutartillery").before('<input type="number" name="wepcostinwepcostoutartillery" id="wepcostinwepcostoutartillery" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostoutflare").before('<input type="number" name="wepcostinwepcostoutflare" id="wepcostinwepcostoutflare" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostoutmedkit").before('<input type="number" name="wepcostinwepcostoutmedkit" id="wepcostinwepcostoutmedkit" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostoutshockbomb").before('<input type="number" name="wepcostinwepcostoutshockbomb" id="wepcostinwepcostoutshockbomb" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostoutbarrage").before('<input type="number" name="wepcostinwepcostoutbarrage" id="wepcostinwepcostoutbarrage" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostoutsmokescreen").before('<input type="number" name="wepcostinwepcostoutsmokescreen" id="wepcostinwepcostoutsmokescreen" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostoutcritters").before('<input type="number" name="wepcostinwepcostoutcritters" id="wepcostinwepcostoutcritters" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostouttank").before('<input type="number" name="wepcostinwepcostouttank" id="wepcostinwepcostouttank" value="0" min="0" step="1">').remove();
    $("input#wepcostinwepcostoutscorcher").before('<input type="number" name="wepcostinwepcostoutscorcher" id="wepcostinwepcostoutscorcher" value="0" min="0" step="1">').remove();
    // Change shield generator inputs on HQ Rush Calc to number inputs
    $("input#hqrushinhqrushoutmkishieldgens").before('<input type="number" name="hqrushinhqrushoutmkishieldgens" id="hqrushinhqrushoutmkishieldgens" value="0" min="0" step="1">').remove();
    $("input#hqrushinhqrushoutmkiishieldgens").before('<input type="number" name="hqrushinhqrushoutmkiishieldgens" id="hqrushinhqrushoutmkiishieldgens" value="0" min="0" step="1">').remove();
    $("input#hqrushinhqrushoutmkiiishieldgens").before('<input type="number" name="hqrushinhqrushoutmkiiishieldgens" id="hqrushinhqrushoutmkiiishieldgens" value="0" min="0" step="1">').remove();
    // Energy Cost Calc Auto-Submit
    $("#jcFormwepcostin td.jcSubmit input[type='submit']").after('<span id="wepcostautosubmit" class="button autosubmitbuttonmarginleft">Auto-Submit <span style="color: red;">OFF</span></span>');
    $("span#wepcostautosubmit").click(function () {
        $('#jcFormwepcostin td.jcSubmit input[type="submit"]').fadeToggle(0);
        $(this).toggleClass("autosubmitbuttonmarginleft");
        if ($(this).html() === 'Auto-Submit <span style="color: red;">OFF</span>') {
            $(this).html('Auto-Submit <span style="color: chartreuse;">ON</span>');
            $(this).parents("form").submit();
        } else {
            $(this).html('Auto-Submit <span style="color: red;">OFF</span>');
        }
    });
    $('#jcFormwepcostin input, #jcFormwepcostin select').change(function () {
        if ($("span#wepcostautosubmit").html() === 'Auto-Submit <span style="color: chartreuse;">ON</span>') {
            $(this).parents("form").submit();
        }
    });
    // HQ Rush Calc: Hide troop level options depending on troop type selected
    $("#hqrushinhqrushouttroop").change(function () {
        if (this.value === "Krieger") {
            $('#hqrushinhqrushoutlevel option').each(function () {
                if (this.value > findMaxTroopLevel("Warrior")) {$(this).prop("disabled", true).hide();} else {$(this).prop("disabled", false).show();}
            });
        } else {
            $('#hqrushinhqrushoutlevel option').prop("disabled", false).show();
        }
        /* Function on Auto-Fill.js resets troop level input whenever a new troop is selected if it cannot be auto-filled */
    });
    $("#hqrushinhqrushouttroop").change();
    // HQ Rush Calc target building form change
    $("#hqrushinhqrushouttarget").change(function () {
        // Show/hide Shield Generator inputs
        if (this.value === "Hauptquartier" || this.value === "Kraftkern") {
            $("#jcFormhqrushin th:contains('Schildgeneratoren')").parent().show();
            $("#jcFormhqrushin th:contains('Anzahl der Stufe I Generatoren'), #jcFormhqrushin th:contains('Anzahl der Stufe II Generatoren'), #jcFormhqrushin th:contains('Anzahl der Stufe III Generatoren')").parent().show();
        } else {
            $("#jcFormhqrushin th:contains('Schildgeneratoren')").parent().hide();
            $("#jcFormhqrushin th:contains('Anzahl der Stufe I Generatoren'), #jcFormhqrushin th:contains('Anzahl der Stufe II Generatoren'), #jcFormhqrushin th:contains('Anzahl der Stufe III Generatoren')").parent().hide();
        }
        // Hide Target Building Level options depending on building selected
        var targetBuildingSelection = this.value;
        $('#hqrushinhqrushoutenemyhqlevel option').each(function () {
            if (this.value > findMaxBuildingLevel(targetBuildingSelection)) {$(this).prop("disabled", true).hide();} else {$(this).prop("disabled", false).show();}
        });
        // Reset Target Building Level input whenever a new building is selected
        $('#hqrushinhqrushoutenemyhqlevel').val('1');
        // Hide Target Building Level input for Power Core
        if (this.value === "Kraftkern") {
            $("#jcFormhqrushin th:contains('Zielgebäude Level')").parent().hide();
        } else {
            $("#jcFormhqrushin th:contains('Zielgebäude Level')").parent().show();
        }
    });
    $("#hqrushinhqrushouttarget").change();
    // Bart Efficiency Calc: Change main input label depending on mode
    $("#jcFormbartefficiencyin #bartefficiencyinbartefficiencyoutmode").change(function () {
        if (this.value === "Damage Needed") {
            $("#jcFormbartefficiencyin label[for='bartefficiencyinbartefficiencyoutmain']").text("Damage Needed");
        } else if (this.value === "Energy Available") {
            $("#jcFormbartefficiencyin label[for='bartefficiencyinbartefficiencyoutmain']").text("Energy Available");
        }
    });
    // Artillery Hit-to-Kill Calculator: show/hide shield generator inputs
    $("#arthtkinarthtkoutBuilding").change(function () {
        if (this.value === "Headquarters" || this.value === "Power Core") {
            $("#jcFormarthtkin th:contains('Shield Generators')").parent().show();
            $("#jcFormarthtkin th:contains('Number of Mark I Generators'), #jcFormarthtkin th:contains('Number of Mark II Generators'), #jcFormarthtkin th:contains('Number of Mark III Generators')").parent().show();
        } else {
            $("#jcFormarthtkin th:contains('Shield Generators')").parent().hide();
            $("#jcFormarthtkin th:contains('Number of Mark I Generators'), #jcFormarthtkin th:contains('Number of Mark II Generators'), #jcFormarthtkin th:contains('Number of Mark III Generators')").parent().hide();
        }
    });
    $("#arthtkinarthtkoutBuilding").change();
    // Prevent statue equation inputs from having values less than zero
    $("input#armystatinarmystatoutthstatues, input#armystatinarmystatouttdstatues, input#hqrushinhqrushouttdstatues, input#hqrushinhqrushoutbhstatues, input#tlootintlootoutstatues, input#hqdmginhqdmgouthpboost, input#arthtkinarthtkoutBHBonus, input#autofillconfiginautofillconfigoutthstatues, input#autofillconfiginautofillconfigouttdstatues, input#autofillconfiginautofillconfigoutrrstatues").change(function() {
        if (eval(this.value) < 0) {
            $(this).val("0");
            alert("Dieser Eingang kann nicht einen Wert von weniger als Null haben.");
        }
    });
    // HQ Damage Calc main building form change
    $("#hqdmginhqdmgouttarget").change(function () {
        if (this.value === "Power Core") {
            $("#jcFormhqdmgin th:contains('Main Building Level')").parent().hide();
        } else {
            $("#jcFormhqdmgin th:contains('Main Building Level')").parent().show();
        }
    });
    $("#hqdmginhqdmgouttarget").change();
    // Artillery Hit-to-Kill Calc click table cell to see energy cost alert (define a callback if calc successfully displays anything)
	if ($('#arthtkout').length) {
		(window.jccalc = window.jccalc || {}).arthtkout = function () {
			$('table#ArtilleryHTKResult td').click(function () {
				var numOfShots = parseInt($(this).text());
				var	costOfShots = (2 * (numOfShots * ((numOfShots - 1) / 2))) + (numOfShots * 3);
				if (numOfShots == 1) {
                    var pluralShots = '';
				} else {
                    var pluralShots = 's';
				}
				alert(numOfShots + ' shot' + pluralShots + ' would cost ' + costOfShots + ' energy.');
			});
		}
	}
	// ******************** Auto-Fill Version 1 Input Hiding Code ********************
    // HQ Rush Calc Auto-Fill form change
    $("#hqrushinhqrushoutusername").change(function () {
        if (this.value === '') {
            $("#jcFormhqrushin th:contains('Troop Damage Bonus (Not Boosted)'), #jcFormhqrushin th:contains('Troop Level'), #jcFormhqrushin th:contains('Number of the Troop Type'), #jcFormhqrushin th:contains('Shock Bomb Level')").parent().show();
        } else {
            $("#jcFormhqrushin th:contains('Troop Damage Bonus (Not Boosted)'), #jcFormhqrushin th:contains('Troop Level'), #jcFormhqrushin th:contains('Number of the Troop Type'), #jcFormhqrushin th:contains('Shock Bomb Level')").parent().hide();
        }
    });
    $("#hqrushinhqrushoutusername").change();
    // Army Stat Calc Auto-Fill form change
    $("#armystatinarmystatoutusername").change(function () {
        if (this.value === '') {
            $("#jcFormarmystatin th:contains('Troop Levels'), #jcFormarmystatin th:contains('Rifleman Level'), #jcFormarmystatin th:contains('Heavy Level'), #jcFormarmystatin th:contains('Zooka Level'), #jcFormarmystatin th:contains('Warrior Level'), #jcFormarmystatin th:contains('Tank Level'), #jcFormarmystatin th:contains('Medic Level'), #jcFormarmystatin th:contains('Grenadier Level'), #jcFormarmystatin th:contains('Scorcher Level'), #jcFormarmystatin th:contains('Landing Craft #1 Level'), #jcFormarmystatin th:contains('Landing Craft #2 Level'), #jcFormarmystatin th:contains('Landing Craft #3 Level'), #jcFormarmystatin th:contains('Landing Craft #4 Level'), #jcFormarmystatin th:contains('Landing Craft #5 Level'), #jcFormarmystatin th:contains('Landing Craft #6 Level'), #jcFormarmystatin th:contains('Landing Craft #7 Level'), #jcFormarmystatin th:contains('Landing Craft #8 Level')").parent().show();
        } else {
            $("#jcFormarmystatin th:contains('Troop Levels'), #jcFormarmystatin th:contains('Rifleman Level'), #jcFormarmystatin th:contains('Heavy Level'), #jcFormarmystatin th:contains('Zooka Level'), #jcFormarmystatin th:contains('Warrior Level'), #jcFormarmystatin th:contains('Tank Level'), #jcFormarmystatin th:contains('Medic Level'), #jcFormarmystatin th:contains('Grenadier Level'), #jcFormarmystatin th:contains('Scorcher Level'), #jcFormarmystatin th:contains('Landing Craft #1 Level'), #jcFormarmystatin th:contains('Landing Craft #2 Level'), #jcFormarmystatin th:contains('Landing Craft #3 Level'), #jcFormarmystatin th:contains('Landing Craft #4 Level'), #jcFormarmystatin th:contains('Landing Craft #5 Level'), #jcFormarmystatin th:contains('Landing Craft #6 Level'), #jcFormarmystatin th:contains('Landing Craft #7 Level'), #jcFormarmystatin th:contains('Landing Craft #8 Level')").parent().hide();
        }
    });
    $("#armystatinarmystatoutusername").change();
});