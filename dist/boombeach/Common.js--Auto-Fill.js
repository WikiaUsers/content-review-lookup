$(document).ready(function() {
    // ************************** Add Auto-Fill to Calcs **********************
    $("form#jcFormhqrushin td.jcSubmit, form#jcFormarmystatin td.jcSubmit, form#jcFormwepcostin td.jcSubmit, form#jcFormbartefficiencyin td.jcSubmit, form#jcFormtlootin td.jcSubmit").append('<div id="autoFillButtons" style="display: inline-block; background-color: #EEEEEE; padding: 3px; border-radius: 5px; margin: 2px; margin-left: 15px;"><a href="http://boombeach.wikia.com/wiki/Boom_Beach_Wiki:Calculator_Auto-Fill">Auto-Fill</a>: <span class="button" id="applyAutoFillButton">Fill</span> <span class="button" id="saveAutoFillButton">Save</span></div>');
    // Make Auto-Fill inputs glow while user hovers over buttons
    $("#autoFillButtons").mouseenter(function() {
        $("#hqrushinhqrushoutlevel, #hqrushinhqrushoutnumber, #hqrushinhqrushoutshockbomblevel, #hqrushinhqrushouttdstatues, #armystatinarmystatoutriflemanlvl, #armystatinarmystatoutheavylvl, #armystatinarmystatoutzookalvl, #armystatinarmystatoutwarriorlvl, #armystatinarmystatouttanklvl, #armystatinarmystatoutmediclvl, #armystatinarmystatoutgrenadierlvl, #armystatinarmystatoutscorcherlvl, #armystatinarmystatoutcryoneerlvl, #armystatinarmystatoutlclevel1, #armystatinarmystatoutlclevel2, #armystatinarmystatoutlclevel3, #armystatinarmystatoutlclevel4, #armystatinarmystatoutlclevel5, #armystatinarmystatoutlclevel6, #armystatinarmystatoutlclevel7, #armystatinarmystatoutlclevel8, #armystatinarmystatoutthstatues, #armystatinarmystatouttdstatues, #wepcostinwepcostoutartlvl, #wepcostinwepcostoutbarlvl, #bartefficiencyinbartefficiencyoutartlvl, #bartefficiencyinbartefficiencyoutbarlvl, #tlootintlootoutstatues").addClass("autoFillInputGlow");
    });
    $("#autoFillButtons").mouseleave(function() {
        $(".autoFillInputGlow").removeClass("autoFillInputGlow");
    });
    // *************************** Get Auto-Fill Values ***********************
    // ************ Headquarters Rush Calc ************
    // Troop Number Fill Function
    function autofillTroopNumber() {
        if (localStorage.getItem("autofillLC1Lvl") === null && localStorage.getItem("autofillLC2Lvl") === null && localStorage.getItem("autofillLC3Lvl") === null && localStorage.getItem("autofillLC4Lvl") === null && localStorage.getItem("autofillLC5Lvl") === null && localStorage.getItem("autofillLC6Lvl") === null && localStorage.getItem("autofillLC7Lvl") === null && localStorage.getItem("autofillLC8Lvl") === null) {
            // If all Landing Craft values are null, see if value saved from HQRushCalc form can be used. If not, do nothing
            var hqRushTroop = $("#hqrushinhqrushouttroop").val();
            if (hqRushTroop == "Warrior") {
                if (localStorage.getItem("autofillWarriorNum") !== null) {$("#hqrushinhqrushoutnumber").val(localStorage.getItem("autofillWarriorNum")).addClass("autoFillApplied");}
            } else {
                if (localStorage.getItem("autofillZookaNum") !== null) {$("#hqrushinhqrushoutnumber").val(localStorage.getItem("autofillZookaNum")).addClass("autoFillApplied");}
            }
        } else {
            // If atleast one Landing Craft value is saved, fill troop number
            var hqRushTroop = $("#hqrushinhqrushouttroop").val();
            if (localStorage.getItem("autofillLC1Lvl") > 0) {
                var hqRushLC1 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC1Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC1 = 0;}
            if (localStorage.getItem("autofillLC2Lvl") > 0) {
                var hqRushLC2 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC2Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC2 = 0;}
            if (localStorage.getItem("autofillLC3Lvl") > 0) {
                var hqRushLC3 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC3Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC3 = 0;}
            if (localStorage.getItem("autofillLC4Lvl") > 0) {
                var hqRushLC4 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC4Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC4 = 0;}
            if (localStorage.getItem("autofillLC5Lvl") > 0) {
                var hqRushLC5 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC5Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC5 = 0;}
            if (localStorage.getItem("autofillLC6Lvl") > 0) {
                var hqRushLC6 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC6Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC6 = 0;}
            if (localStorage.getItem("autofillLC7Lvl") > 0) {
                var hqRushLC7 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC7Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC7 = 0;}
            if (localStorage.getItem("autofillLC8Lvl") > 0) {
                var hqRushLC8 = Math.floor(roundNum(1,((localStorage.getItem("autofillLC8Lvl") * 1) + 4) / findTroopSize(hqRushTroop)));
            } else {var hqRushLC8 = 0;}
            $("#hqrushinhqrushoutnumber").val(hqRushLC1 + hqRushLC2 + hqRushLC3 + hqRushLC4 + hqRushLC5 + hqRushLC6 + hqRushLC7 + hqRushLC8).addClass("autoFillApplied");
        }
    }
    // Fill HQ Rush Calc Form
    $("form#jcFormhqrushin #applyAutoFillButton").click(function() {
        if (typeof(Storage) == "undefined") {
            alert("Sorry, your browser does not support Web Storage.");
        } else if (localStorage.getItem("autofillShockBombLvl") === null && localStorage.getItem("autofillTDstatues") === null && localStorage.getItem("autofillZookaLvl") === null && localStorage.getItem("autofillWarriorLvl") === null) {
            alert("You have not saved any information for this calculator.");
        } else {
            // Shock Bomb Level
            if (localStorage.getItem("autofillShockBombLvl") !== null) {$("#hqrushinhqrushoutshockbomblevel").val(localStorage.getItem("autofillShockBombLvl")).addClass("autoFillApplied")}
            // Troop Damage Statues
            if (localStorage.getItem("autofillTDstatues") !== null) {$("#hqrushinhqrushouttdstatues").val(localStorage.getItem("autofillTDstatues")).addClass("autoFillApplied")}
            // Troop Level
            if ($("#hqrushinhqrushouttroop").val() == "Zooka") {
                if (localStorage.getItem("autofillZookaLvl") !== null) {$("#hqrushinhqrushoutlevel").val(localStorage.getItem("autofillZookaLvl")).addClass("autoFillApplied")}
            } else {
                if (localStorage.getItem("autofillWarriorLvl") !== null) {$("#hqrushinhqrushoutlevel").val(localStorage.getItem("autofillWarriorLvl")).addClass("autoFillApplied")}
            }
            // Troop Number
            autofillTroopNumber();
        }
    });
    $("#hqrushinhqrushouttroop").change(function() {
        // If troop level is filled and troop selection changes, re-fill troop level
        if ($("#hqrushinhqrushoutlevel").hasClass("autoFillApplied") === true && typeof(Storage) !== "undefined") {
            if ($("#hqrushinhqrushouttroop").val() == "Zooka") {
                if (localStorage.getItem("autofillZookaLvl") !== null) {$("#hqrushinhqrushoutlevel").val(localStorage.getItem("autofillZookaLvl")).addClass("autoFillApplied")}
            } else {
                if (localStorage.getItem("autofillWarriorLvl") !== null) {$("#hqrushinhqrushoutlevel").val(localStorage.getItem("autofillWarriorLvl")).addClass("autoFillApplied")}
            }
        } else {
            $('#hqrushinhqrushoutlevel').val('1');
        }
        // If troop number is filled and troop selection changes, re-fill troop number
        if ($("#hqrushinhqrushoutnumber").hasClass("autoFillApplied") === true && typeof(Storage) !== "undefined") {
            autofillTroopNumber();
        } else {
            $('#hqrushinhqrushoutnumber').val('1');
        }
    });
    // ************ Army Statistics Calc *************
    $("form#jcFormarmystatin #applyAutoFillButton").click(function() {
        if (typeof(Storage) == "undefined") {
            alert("Sorry, your browser does not support Web Storage.");
        } else if (localStorage.getItem("autofillRiflemanLvl") === null && localStorage.getItem("autofillHeavyLvl") === null && localStorage.getItem("autofillZookaLvl") === null && localStorage.getItem("autofillWarriorLvl") === null && localStorage.getItem("autofillTankLvl") === null && localStorage.getItem("autofillMedicLvl") === null && localStorage.getItem("autofillGrenadierLvl") === null && localStorage.getItem("autofillScorcherLvl") === null && localStorage.getItem("autofillCryoneerLvl") === null && localStorage.getItem("autofillLC1Lvl") === null && localStorage.getItem("autofillLC2Lvl") === null && localStorage.getItem("autofillLC3Lvl") === null && localStorage.getItem("autofillLC4Lvl") === null && localStorage.getItem("autofillLC5Lvl") === null && localStorage.getItem("autofillLC6Lvl") === null && localStorage.getItem("autofillLC7Lvl") === null && localStorage.getItem("autofillLC8Lvl") === null && localStorage.getItem("autofillTHstatues") === null && localStorage.getItem("autofillTDstatues") === null) {
            alert("You have not saved any information for this calculator.");
        } else {
            // Troop Levels
            if (localStorage.getItem("autofillRiflemanLvl") !== null) {$("#armystatinarmystatoutriflemanlvl").val(localStorage.getItem("autofillRiflemanLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillHeavyLvl") !== null) {$("#armystatinarmystatoutheavylvl").val(localStorage.getItem("autofillHeavyLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillZookaLvl") !== null) {$("#armystatinarmystatoutzookalvl").val(localStorage.getItem("autofillZookaLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillWarriorLvl") !== null) {$("#armystatinarmystatoutwarriorlvl").val(localStorage.getItem("autofillWarriorLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillTankLvl") !== null) {$("#armystatinarmystatouttanklvl").val(localStorage.getItem("autofillTankLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillMedicLvl") !== null) {$("#armystatinarmystatoutmediclvl").val(localStorage.getItem("autofillMedicLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillGrenadierLvl") !== null) {$("#armystatinarmystatoutgrenadierlvl").val(localStorage.getItem("autofillGrenadierLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillScorcherLvl") !== null) {$("#armystatinarmystatoutscorcherlvl").val(localStorage.getItem("autofillScorcherLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillCryoneerLvl") !== null) {$("#armystatinarmystatoutcryoneerlvl").val(localStorage.getItem("autofillCryoneerLvl")).addClass("autoFillApplied")}
            // Landing Craft Levels
            if (localStorage.getItem("autofillLC1Lvl") !== null) {$("#armystatinarmystatoutlclevel1").val(localStorage.getItem("autofillLC1Lvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillLC2Lvl") !== null) {$("#armystatinarmystatoutlclevel2").val(localStorage.getItem("autofillLC2Lvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillLC3Lvl") !== null) {$("#armystatinarmystatoutlclevel3").val(localStorage.getItem("autofillLC3Lvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillLC4Lvl") !== null) {$("#armystatinarmystatoutlclevel4").val(localStorage.getItem("autofillLC4Lvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillLC5Lvl") !== null) {$("#armystatinarmystatoutlclevel5").val(localStorage.getItem("autofillLC5Lvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillLC6Lvl") !== null) {$("#armystatinarmystatoutlclevel6").val(localStorage.getItem("autofillLC6Lvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillLC7Lvl") !== null) {$("#armystatinarmystatoutlclevel7").val(localStorage.getItem("autofillLC7Lvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillLC8Lvl") !== null) {$("#armystatinarmystatoutlclevel8").val(localStorage.getItem("autofillLC8Lvl")).addClass("autoFillApplied")}
            // Statues
            if (localStorage.getItem("autofillTHstatues") !== null) {$("#armystatinarmystatoutthstatues").val(localStorage.getItem("autofillTHstatues")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillTDstatues") !== null) {$("#armystatinarmystatouttdstatues").val(localStorage.getItem("autofillTDstatues")).addClass("autoFillApplied")}
        }
    });
    // ************** Energy Cost Calc ***************
    $("form#jcFormwepcostin #applyAutoFillButton").click(function() {
        if (typeof(Storage) == "undefined") {
            alert("Sorry, your browser does not support Web Storage.");
        } else if (localStorage.getItem("autofillArtilleryLvl") === null && localStorage.getItem("autofillBarrageLvl") === null) {
            alert("You have not saved any information for this calculator.");
        } else {
            if (localStorage.getItem("autofillArtilleryLvl") !== null) {$("#wepcostinwepcostoutartlvl").val(localStorage.getItem("autofillArtilleryLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillBarrageLvl") !== null) {$("#wepcostinwepcostoutbarlvl").val(localStorage.getItem("autofillBarrageLvl")).addClass("autoFillApplied")}
        }
    });
    // ************ Bart Efficiency Calc *************
    $("form#jcFormbartefficiencyin #applyAutoFillButton").click(function() {
        if (typeof(Storage) == "undefined") {
            alert("Sorry, your browser does not support Web Storage.");
        } else if (localStorage.getItem("autofillArtilleryLvl") === null && localStorage.getItem("autofillBarrageLvl") === null) {
            alert("You have not saved any information for this calculator.");
        } else {
            if (localStorage.getItem("autofillArtilleryLvl") !== null) {$("#bartefficiencyinbartefficiencyoutartlvl").val(localStorage.getItem("autofillArtilleryLvl")).addClass("autoFillApplied")}
            if (localStorage.getItem("autofillBarrageLvl") !== null) {$("#bartefficiencyinbartefficiencyoutbarlvl").val(localStorage.getItem("autofillBarrageLvl")).addClass("autoFillApplied")}
        }
    });
    // ************** Dr. T Loot Calc ****************
    $("form#jcFormtlootin #applyAutoFillButton").click(function() {
        if (typeof(Storage) == "undefined") {
            alert("Sorry, your browser does not support Web Storage.");
        } else if (localStorage.getItem("autofillRRstatues") === null) {
            alert("You have not saved any information for this calculator.");
        } else {
            if (localStorage.getItem("autofillRRstatues") !== null) {$("#tlootintlootoutstatues").val(localStorage.getItem("autofillRRstatues")).addClass("autoFillApplied")}
        }
    });
    // ***** Remove yellow background styling if filled value is changed *****
    $("form#jcFormhqrushin input, form#jcFormhqrushin select, form#jcFormarmystatin input, form#jcFormarmystatin select, form#jcFormwepcostin input, form#jcFormwepcostin select, form#jcFormbartefficiencyin input, form#jcFormbartefficiencyin select, form#jcFormtlootin input, form#jcFormtlootin select").change(function() {
        $(this).removeClass("autoFillApplied");
    });
    // ************ Auto-Fill Config form ************
    if (typeof(Storage) !== "undefined") {
        $("select#autofillconfiginautofillconfigoutriflemanlvl").val(localStorage.getItem("autofillRiflemanLvl"));
        $("select#autofillconfiginautofillconfigoutheavylvl").val(localStorage.getItem("autofillHeavyLvl"));
        $("select#autofillconfiginautofillconfigoutzookalvl").val(localStorage.getItem("autofillZookaLvl"));
        $("select#autofillconfiginautofillconfigoutwarriorlvl").val(localStorage.getItem("autofillWarriorLvl"));
        $("select#autofillconfiginautofillconfigouttanklvl").val(localStorage.getItem("autofillTankLvl"));
        $("select#autofillconfiginautofillconfigoutmediclvl").val(localStorage.getItem("autofillMedicLvl"));
        $("select#autofillconfiginautofillconfigoutgrenadierlvl").val(localStorage.getItem("autofillGrenadierLvl"));
        $("select#autofillconfiginautofillconfigoutscorcherlvl").val(localStorage.getItem("autofillScorcherLvl"));
        $("select#autofillconfiginautofillconfigoutcryoneerlvl").val(localStorage.getItem("autofillCryoneerLvl"));
        $("select#autofillconfiginautofillconfigoutlclevel1").val(localStorage.getItem("autofillLC1Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutlclevel2").val(localStorage.getItem("autofillLC2Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutlclevel3").val(localStorage.getItem("autofillLC3Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutlclevel4").val(localStorage.getItem("autofillLC4Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutlclevel5").val(localStorage.getItem("autofillLC5Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutlclevel6").val(localStorage.getItem("autofillLC6Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutlclevel7").val(localStorage.getItem("autofillLC7Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutlclevel8").val(localStorage.getItem("autofillLC8Lvl")).addClass("LCAutoFillConfig");
        $("select#autofillconfiginautofillconfigoutartillerylvl").val(localStorage.getItem("autofillArtilleryLvl"));
        $("select#autofillconfiginautofillconfigoutshockbomblevel").val(localStorage.getItem("autofillShockBombLvl"));
        $("select#autofillconfiginautofillconfigoutbarragelvl").val(localStorage.getItem("autofillBarrageLvl"));
        if (localStorage.getItem("autofillTHstatues") !== null) {$("input#autofillconfiginautofillconfigoutthstatues").val(localStorage.getItem("autofillTHstatues"))}
        if (localStorage.getItem("autofillTDstatues") !== null) {$("input#autofillconfiginautofillconfigouttdstatues").val(localStorage.getItem("autofillTDstatues"))}
        if (localStorage.getItem("autofillRRstatues") !== null) {$("input#autofillconfiginautofillconfigoutrrstatues").val(localStorage.getItem("autofillRRstatues"))}
    }
    // ************************** Save Auto-Fill Values ***********************
    // HQ Rush Calc
    $("form#jcFormhqrushin td.jcSubmit #saveAutoFillButton").click(function() {
        if (typeof(Storage) !== "undefined") {
            if ($("#hqrushinhqrushouttroop").val() == "Zooka") {
                localStorage.setItem("autofillZookaLvl", $("#hqrushinhqrushoutlevel").val());
                localStorage.setItem("autofillZookaNum", $("#hqrushinhqrushoutnumber").val());
            } else if ($("#hqrushinhqrushouttroop").val() == "Warrior") {
                localStorage.setItem("autofillWarriorLvl", $("#hqrushinhqrushoutlevel").val());
                localStorage.setItem("autofillWarriorNum", $("#hqrushinhqrushoutnumber").val());
            }
            localStorage.setItem("autofillShockBombLvl", $("#hqrushinhqrushoutshockbomblevel").val());
            localStorage.setItem("autofillTDstatues", $("#hqrushinhqrushouttdstatues").val());
            alert("Your Auto-Fill information has been saved to your browser!");
        } else {
            alert("Sorry, your browser does not support Web Storage.");
        }
    });
    // Army Statistics Calc
    $("form#jcFormarmystatin td.jcSubmit #saveAutoFillButton").click(function() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("autofillRiflemanLvl", $("#armystatinarmystatoutriflemanlvl").val());
            localStorage.setItem("autofillHeavyLvl", $("#armystatinarmystatoutheavylvl").val());
            localStorage.setItem("autofillZookaLvl", $("#armystatinarmystatoutzookalvl").val());
            localStorage.setItem("autofillWarriorLvl", $("#armystatinarmystatoutwarriorlvl").val());
            localStorage.setItem("autofillTankLvl", $("#armystatinarmystatouttanklvl").val());
            localStorage.setItem("autofillMedicLvl", $("#armystatinarmystatoutmediclvl").val());
            localStorage.setItem("autofillGrenadierLvl", $("#armystatinarmystatoutgrenadierlvl").val());
            localStorage.setItem("autofillScorcherLvl", $("#armystatinarmystatoutscorcherlvl").val());
            localStorage.setItem("autofillCryoneerLvl", $("#armystatinarmystatoutcryoneerlvl").val());
            localStorage.setItem("autofillLC1Lvl", $("#armystatinarmystatoutlclevel1").val());
            localStorage.setItem("autofillLC2Lvl", $("#armystatinarmystatoutlclevel2").val());
            localStorage.setItem("autofillLC3Lvl", $("#armystatinarmystatoutlclevel3").val());
            localStorage.setItem("autofillLC4Lvl", $("#armystatinarmystatoutlclevel4").val());
            localStorage.setItem("autofillLC5Lvl", $("#armystatinarmystatoutlclevel5").val());
            localStorage.setItem("autofillLC6Lvl", $("#armystatinarmystatoutlclevel6").val());
            localStorage.setItem("autofillLC7Lvl", $("#armystatinarmystatoutlclevel7").val());
            localStorage.setItem("autofillLC8Lvl", $("#armystatinarmystatoutlclevel8").val());
            localStorage.setItem("autofillTHstatues", $("#armystatinarmystatoutthstatues").val());
            localStorage.setItem("autofillTDstatues", $("#armystatinarmystatouttdstatues").val());
            alert("Your Auto-Fill information has been saved to your browser!");
        } else {
            alert("Sorry, your browser does not support Web Storage.");
        }
    });
    // Energy Cost Calc
    $("form#jcFormwepcostin td.jcSubmit #saveAutoFillButton").click(function() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("autofillArtilleryLvl", $("#wepcostinwepcostoutartlvl").val());
            localStorage.setItem("autofillBarrageLvl", $("#wepcostinwepcostoutbarlvl").val());
            alert("Your Auto-Fill information has been saved to your browser!");
        } else {
            alert("Sorry, your browser does not support Web Storage.");
        }
    });
    // Bart Efficiency Calc
    $("form#jcFormbartefficiencyin td.jcSubmit #saveAutoFillButton").click(function() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("autofillArtilleryLvl", $("#bartefficiencyinbartefficiencyoutartlvl").val());
            localStorage.setItem("autofillBarrageLvl", $("#bartefficiencyinbartefficiencyoutbarlvl").val());
            alert("Your Auto-Fill information has been saved to your browser!");
        } else {
            alert("Sorry, your browser does not support Web Storage.");
        }
    });
    // Dr. T Loot Calc
    $("form#jcFormtlootin td.jcSubmit #saveAutoFillButton").click(function() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("autofillRRstatues", $("#tlootintlootoutstatues").val());
            alert("Your Auto-Fill information has been saved to your browser!");
        } else {
            alert("Sorry, your browser does not support Web Storage.");
        }
    });
    // Auto-Fill Config form
    $("form#jcFormautofillconfigin").submit(function() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("autofillRiflemanLvl", $("select#autofillconfiginautofillconfigoutriflemanlvl").val());
            localStorage.setItem("autofillHeavyLvl", $("select#autofillconfiginautofillconfigoutheavylvl").val());
            localStorage.setItem("autofillZookaLvl", $("select#autofillconfiginautofillconfigoutzookalvl").val());
            localStorage.setItem("autofillWarriorLvl", $("select#autofillconfiginautofillconfigoutwarriorlvl").val());
            localStorage.setItem("autofillTankLvl", $("select#autofillconfiginautofillconfigouttanklvl").val());
            localStorage.setItem("autofillMedicLvl", $("select#autofillconfiginautofillconfigoutmediclvl").val());
            localStorage.setItem("autofillGrenadierLvl", $("select#autofillconfiginautofillconfigoutgrenadierlvl").val());
            localStorage.setItem("autofillScorcherLvl", $("select#autofillconfiginautofillconfigoutscorcherlvl").val());
            localStorage.setItem("autofillCryoneerLvl", $("select#autofillconfiginautofillconfigoutcryoneerlvl").val());
            localStorage.setItem("autofillLC1Lvl", $("select#autofillconfiginautofillconfigoutlclevel1").val());
            localStorage.setItem("autofillLC2Lvl", $("select#autofillconfiginautofillconfigoutlclevel2").val());
            localStorage.setItem("autofillLC3Lvl", $("select#autofillconfiginautofillconfigoutlclevel3").val());
            localStorage.setItem("autofillLC4Lvl", $("select#autofillconfiginautofillconfigoutlclevel4").val());
            localStorage.setItem("autofillLC5Lvl", $("select#autofillconfiginautofillconfigoutlclevel5").val());
            localStorage.setItem("autofillLC6Lvl", $("select#autofillconfiginautofillconfigoutlclevel6").val());
            localStorage.setItem("autofillLC7Lvl", $("select#autofillconfiginautofillconfigoutlclevel7").val());
            localStorage.setItem("autofillLC8Lvl", $("select#autofillconfiginautofillconfigoutlclevel8").val());
            localStorage.setItem("autofillArtilleryLvl", $("select#autofillconfiginautofillconfigoutartillerylvl").val());
            localStorage.setItem("autofillShockBombLvl", $("select#autofillconfiginautofillconfigoutshockbomblevel").val());
            localStorage.setItem("autofillBarrageLvl", $("select#autofillconfiginautofillconfigoutbarragelvl").val());
            localStorage.setItem("autofillTHstatues", $("input#autofillconfiginautofillconfigoutthstatues").val());
            localStorage.setItem("autofillTDstatues", $("input#autofillconfiginautofillconfigouttdstatues").val());
            localStorage.setItem("autofillRRstatues", $("input#autofillconfiginautofillconfigoutrrstatues").val());
            alert("Your Auto-Fill information has been saved to your browser!");
        } else {
            alert("Sorry, your browser does not support Web Storage.");
        }
    });
    // ************************ Build AutoFillConfig Table ********************
    // Add first row
    $("#jcFormautofillconfigin table.jcTable tbody").prepend("<tr><th>Input Name</th><th>Edit Value</th><th>Current Value</th></tr>");
    // Make dividing rows
    $("#jcFormautofillconfigin th:contains('Troops'), #jcFormautofillconfigin th:contains('Landing Craft'):first, #jcFormautofillconfigin th:contains('Gunboat Weaponry'), #jcFormautofillconfigin th:contains('Statues')").attr("colspan", "3").addClass("autofillConfigDividingRow").siblings("td").remove();
    // Other visual changes
    $("#jcFormautofillconfigin td.jcSubmit").attr("colspan", "3");
    $("#jcFormautofillconfigin #autofillconfiginautofillconfigoutthstatues, #jcFormautofillconfigin #autofillconfiginautofillconfigouttdstatues, #jcFormautofillconfigin #autofillconfiginautofillconfigoutrrstatues").parent().addClass("jcCalcPercentInput");
    // Add "Current Value" cells
    $("#jcFormautofillconfigin th:contains('Rifleman Level')").parent().append("<td id='checkLocalStorage-autofillRiflemanLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Heavy Level')").parent().append("<td id='checkLocalStorage-autofillHeavyLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Zooka Level')").parent().append("<td id='checkLocalStorage-autofillZookaLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Warrior Level')").parent().append("<td id='checkLocalStorage-autofillWarriorLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Tank Level')").parent().append("<td id='checkLocalStorage-autofillTankLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Medic Level')").parent().append("<td id='checkLocalStorage-autofillMedicLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Grenadier Level')").parent().append("<td id='checkLocalStorage-autofillGrenadierLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Scorcher Level')").parent().append("<td id='checkLocalStorage-autofillScorcherLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Cryoneer Level')").parent().append("<td id='checkLocalStorage-autofillCryoneerLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #1 Level')").parent().append("<td id='checkLocalStorage-autofillLC1Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #2 Level')").parent().append("<td id='checkLocalStorage-autofillLC2Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #3 Level')").parent().append("<td id='checkLocalStorage-autofillLC3Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #4 Level')").parent().append("<td id='checkLocalStorage-autofillLC4Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #5 Level')").parent().append("<td id='checkLocalStorage-autofillLC5Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #6 Level')").parent().append("<td id='checkLocalStorage-autofillLC6Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #7 Level')").parent().append("<td id='checkLocalStorage-autofillLC7Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Landing Craft #8 Level')").parent().append("<td id='checkLocalStorage-autofillLC8Lvl'></td>");
    $("#jcFormautofillconfigin th:contains('Artillery Level')").parent().append("<td id='checkLocalStorage-autofillArtilleryLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Shock Bomb Level')").parent().append("<td id='checkLocalStorage-autofillShockBombLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Barrage Level')").parent().append("<td id='checkLocalStorage-autofillBarrageLvl'></td>");
    $("#jcFormautofillconfigin th:contains('Total Troop Health Bonus')").parent().append("<td id='checkLocalStorage-autofillTHstatues'></td>");
    $("#jcFormautofillconfigin th:contains('Total Troop Damage Bonus')").parent().append("<td id='checkLocalStorage-autofillTDstatues'></td>");
    $("#jcFormautofillconfigin th:contains('Total Resource Reward Bonus')").parent().append("<td id='checkLocalStorage-autofillRRstatues'></td>");
    // ************************* Display Auto-Fill Values *********************
    function refreshAutoFillText() {
        $("#checkLocalStorage-autofillUsername").text(localStorage.getItem("autofillUsername"));
        $("#checkLocalStorage-autofillRiflemanLvl").text(localStorage.getItem("autofillRiflemanLvl"));
        $("#checkLocalStorage-autofillHeavyLvl").text(localStorage.getItem("autofillHeavyLvl"));
        $("#checkLocalStorage-autofillZookaLvl").text(localStorage.getItem("autofillZookaLvl"));
        $("#checkLocalStorage-autofillWarriorLvl").text(localStorage.getItem("autofillWarriorLvl"));
        $("#checkLocalStorage-autofillTankLvl").text(localStorage.getItem("autofillTankLvl"));
        $("#checkLocalStorage-autofillMedicLvl").text(localStorage.getItem("autofillMedicLvl"));
        $("#checkLocalStorage-autofillGrenadierLvl").text(localStorage.getItem("autofillGrenadierLvl"));
        $("#checkLocalStorage-autofillScorcherLvl").text(localStorage.getItem("autofillScorcherLvl"));
        $("#checkLocalStorage-autofillCryoneerLvl").text(localStorage.getItem("autofillCryoneerLvl"));
        $("#checkLocalStorage-autofillLC1Lvl").text(localStorage.getItem("autofillLC1Lvl"));
        $("#checkLocalStorage-autofillLC2Lvl").text(localStorage.getItem("autofillLC2Lvl"));
        $("#checkLocalStorage-autofillLC3Lvl").text(localStorage.getItem("autofillLC3Lvl"));
        $("#checkLocalStorage-autofillLC4Lvl").text(localStorage.getItem("autofillLC4Lvl"));
        $("#checkLocalStorage-autofillLC5Lvl").text(localStorage.getItem("autofillLC5Lvl"));
        $("#checkLocalStorage-autofillLC6Lvl").text(localStorage.getItem("autofillLC6Lvl"));
        $("#checkLocalStorage-autofillLC7Lvl").text(localStorage.getItem("autofillLC7Lvl"));
        $("#checkLocalStorage-autofillLC8Lvl").text(localStorage.getItem("autofillLC8Lvl"));
        $("#checkLocalStorage-autofillArtilleryLvl").text(localStorage.getItem("autofillArtilleryLvl"));
        $("#checkLocalStorage-autofillShockBombLvl").text(localStorage.getItem("autofillShockBombLvl"));
        $("#checkLocalStorage-autofillBarrageLvl").text(localStorage.getItem("autofillBarrageLvl"));
        $("#checkLocalStorage-autofillTHstatues").text(localStorage.getItem("autofillTHstatues"));
        $("#checkLocalStorage-autofillTDstatues").text(localStorage.getItem("autofillTDstatues"));
        $("#checkLocalStorage-autofillRRstatues").text(localStorage.getItem("autofillRRstatues"));
        $("#checkLocalStorage-autofillWarriorNum").text(localStorage.getItem("autofillWarriorNum"));
        $("#checkLocalStorage-autofillZookaNum").text(localStorage.getItem("autofillZookaNum"));
        return;
    }
    refreshAutoFillText();
    // Refresh on form submit
    $("form#jcFormautofillconfigin").submit(function() {
        refreshAutoFillText();
    });
    // ************************* Removing Auto-Fill Values ********************
    $("form#jcFormautofillconfigin td.jcSubmit").append('<span class="button resetAutoFillLocalStorage" style="margin-left: 15px;">Reset</span><span class="button resetAutoFillLocalStorageConfirm" style="margin-left: 15px; display: none;">Confirm Reset</span>');
    $(".resetAutoFillLocalStorage").click(function() {
        $(this).hide();
        $(".resetAutoFillLocalStorageConfirm").show();
    });
    $(".resetAutoFillLocalStorageConfirm").click(function() {
        localStorage.removeItem("autofillRiflemanLvl");
        localStorage.removeItem("autofillHeavyLvl");
        localStorage.removeItem("autofillZookaLvl");
        localStorage.removeItem("autofillWarriorLvl");
        localStorage.removeItem("autofillTankLvl");
        localStorage.removeItem("autofillMedicLvl");
        localStorage.removeItem("autofillGrenadierLvl");
        localStorage.removeItem("autofillScorcherLvl");
        localStorage.removeItem("autofillCryoneerLvl");
        localStorage.removeItem("autofillLC1Lvl");
        localStorage.removeItem("autofillLC2Lvl");
        localStorage.removeItem("autofillLC3Lvl");
        localStorage.removeItem("autofillLC4Lvl");
        localStorage.removeItem("autofillLC5Lvl");
        localStorage.removeItem("autofillLC6Lvl");
        localStorage.removeItem("autofillLC7Lvl");
        localStorage.removeItem("autofillLC8Lvl");
        localStorage.removeItem("autofillArtilleryLvl");
        localStorage.removeItem("autofillShockBombLvl");
        localStorage.removeItem("autofillBarrageLvl");
        localStorage.removeItem("autofillTHstatues");
        localStorage.removeItem("autofillTDstatues");
        localStorage.removeItem("autofillRRstatues");
        localStorage.removeItem("autofillWarriorNum");
        localStorage.removeItem("autofillZookaNum");
        $("form#jcFormautofillconfigin input[type=text]").val("0");
        $("form#jcFormautofillconfigin select:not(.LCAutoFillConfig)").val("1");
        $("form#jcFormautofillconfigin select.LCAutoFillConfig").val("0");
        refreshAutoFillText();
        alert("All of your saved Auto-Fill information has been cleared.");
        $(this).hide();
        $(".resetAutoFillLocalStorage").show();
    });
});