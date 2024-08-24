/*
 
===== Pulsanti di stato nella tabella Statistiche delle Carte =====
    Ringraziamo King Dragonhoff - Clash Royale Wiki (EN)
 
Manutenzione
    Si prega di aggiornare lo script, se vengono aggiornate
    eventuali statistiche delle Carte da parte della SUPERCELL.
    
N.B: Per motivi di diritti, lo script � digitato in versione inglese e non va assolutamente tradotto, salvo, ovviamente, le parole che permettono a tale di funzionare correttamente su questa Wiki.
 
*/
// *********** Functions ***********
// Rage Effect Math Function for increases in the stat (non-time)
function rageEffectUp(originalValue) {
    // Factor is 135 since Rage boosts by 35%
    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) * (135/100))));
}
// Rage Effect Math Function for decreases in the stat (time)
/*   Value is converted to milliseconds for calculation then back to seconds for output */
function rageEffectDown(originalValue) {
    // Factor is 135 since Rage decreases by 35%
    return String(Math.floor(roundNum(1,(Number(originalValue.replace(",", "")) * 1000) / (135/100))) / 1000);
}
// Rage Effect Math Function for increases to DPS
function rageEffectDPS(originalValue) {
    // Factor is 65 since Rage boosts by 35%
    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) / (65/100))));
}
// Slow Effect Math Function for decreases in the stat (non-time)
function slowEffectDown(originalValue) {
    // Factor is 135 since Slow decreases by 35%
    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) / (135/100))));
}
// Slow Effect Math Function for increases in the stat (time)
/*   Value is converted to milliseconds for calculation then back to seconds for output */
function slowEffectUp(originalValue) {
    // Factor is 135 since Slow increases by 35%
    return String(Math.floor(roundNum(1,(Number(originalValue.replace(",", "")) * 1000) * (135/100))) / 1000);
}
// Slow Effect Math Function for decreases to DPS
function slowEffectDPS(originalValue) {
    // Factor is 65 since Slow decreases by 35%
    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) * (65/100))));
}
// ********** Get Started **********
$(document).ready(function() {
    var movementSpeedName, movementSpeedName2, unitAttributeValues = [], unitAttributeValues2 = [], unitDPSValues = [], unitDPSValues2 = [], loopHitCount;
    $("#slowEffectButton").click(function() {
        $(this).toggleClass("slowEffectButtonActive");
    });
    $("#rageEffectButton").click(function() {
        $(this).toggleClass("rageEffectButtonActive");
    });
    // When a button is clicked...
    $("#rageEffectButton, #slowEffectButton").click(function() {
        // Toggle the effects on the statistics
        var unitAttributesTableR1 = $("#unit-attributes-table tr:eq(1)");
        var unitAttributesTable2R1 = $("#unit-attributes-table-secondary tr:eq(1)");
        var attributeName, statName, b, c, d, e;
        if ($("#rageEffectButton").hasClass("rageEffectButtonActive") && $("#slowEffectButton").hasClass("slowEffectButtonActive") === false) {
            // Apply rage effect and color the text affected after saving initial values
            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (attributeName === "velocit�") {
                    movementSpeedName = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
                    unitAttributeValues[0] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectUp(unitAttributeValues[0])).addClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� colpi") {
                    unitAttributeValues[1] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� generazione") {
                    unitAttributeValues[2] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� produzione") {
                    unitAttributeValues[3] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
                }
            });
            // Repeat for a secondary attributes table (e.g. Golem)
            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (attributeName === "speed") {
                    movementSpeedName2 = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
                    unitAttributeValues2[0] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectUp(unitAttributeValues2[0])).addClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� colpi") {
                    unitAttributeValues2[1] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� generazione") {
                    unitAttributeValues2[2] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� produzione") {
                    unitAttributeValues2[3] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
                }
            });
            // Damage per second
            loopHitCount = 0;
            $('#unit-statistics-table tr:eq(0) th').each(function(c) {
                statName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (statName.includes("danni al secondo") === true && loopHitCount === 0) {
                    $('#unit-statistics-table tr').each(function(d) {
                        // Save
                        unitDPSValues.push($('td:eq(' + c + ')', this).text());
                        // Enrage
                        if (unitDPSValues[d].includes("-") === true) {
                            var rangeOfDPS = unitDPSValues[d].split("-");
                            $('td:eq(' + c + ')', this).text(rageEffectDPS(rangeOfDPS[0]) + "-" + rageEffectDPS(rangeOfDPS[1])).addClass("EnragedStat").removeClass("SlowedStat");
                        } else if (unitDPSValues[d].includes("x2") === true) {
                            $('td:eq(' + c + ')', this).text(rageEffectDPS(unitDPSValues[d].replace(" x2", ""))).append(" x2").addClass("EnragedStat").removeClass("SlowedStat");
                        } else {
                            $('td:eq(' + c + ')', this).text(rageEffectDPS(unitDPSValues[d])).addClass("EnragedStat").removeClass("SlowedStat");
                        }
                    });
                    loopHitCount++;
                } else if (statName.includes("danni al secondo") === true && loopHitCount === 1) {
                    $('#unit-statistics-table tr').each(function(d) {
                        // Save
                        unitDPSValues2.push($('td:eq(' + c + ')', this).text());
                        // Enrage
                        if (unitDPSValues2[d].includes("-") === true) {
                            var rangeOfDPS = unitDPSValues2[d].split("-");
                            $('td:eq(' + c + ')', this).text(rageEffectDPS(rangeOfDPS[0]) + "-" + rageEffectDPS(rangeOfDPS[1])).addClass("EnragedStat").removeClass("SlowedStat");
                        } else if (unitDPSValues2[d].includes("x2") === true) {
                            $('td:eq(' + c + ')', this).text(rageEffectDPS(unitDPSValues2[d].replace(" x2", ""))).append(" x2").addClass("EnragedStat").removeClass("SlowedStat");
                        } else {
                            $('td:eq(' + c + ')', this).text(rageEffectDPS(unitDPSValues2[d])).addClass("EnragedStat").removeClass("SlowedStat");
                        }
                    });
                    return false; // End the each loop
                }
            });
        } else if ($("#rageEffectButton").hasClass("rageEffectButtonActive") === false && $("#slowEffectButton").hasClass("slowEffectButtonActive")) {
            // Apply slow effect and color the text affected after saving initial values
            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (attributeName === "velocit�") {
                    movementSpeedName = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the slow button is inactivated
                    unitAttributeValues[0] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectDown(unitAttributeValues[0])).removeClass("EnragedStat").addClass("SlowedStat");
                } else if (attributeName === "velocit� colpi") {
                    unitAttributeValues[1] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
                } else if (attributeName === "velocit� generazione") {
                    unitAttributeValues[2] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
                } else if (attributeName === "velocit� produzione") {
                    unitAttributeValues[3] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
                }
            });
            // Repeat for a secondary attributes table (e.g. Golem)
            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (attributeName === "velocit�") {
                    movementSpeedName2 = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
                    unitAttributeValues2[0] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectDown(unitAttributeValues2[0])).removeClass("EnragedStat").addClass("SlowedStat");
                } else if (attributeName === "velocit� colpi") {
                    unitAttributeValues2[1] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
                } else if (attributeName === "velocit� generazione") {
                    unitAttributeValues2[2] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
                } else if (attributeName === "velocit� produzione") {
                    unitAttributeValues2[3] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
                }
            });
            // Damage per second
            loopHitCount = 0;
            $('#unit-statistics-table tr:eq(0) th').each(function(c) {
                statName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (statName.includes("danni al secondo") === true && loopHitCount === 0) {
                    $('#unit-statistics-table tr').each(function(d) {
                        // Save
                        unitDPSValues.push($('td:eq(' + c + ')', this).text());
                        // Slow
                        if (unitDPSValues[d].includes("-") === true) {
                            var rangeOfDPS = unitDPSValues[d].split("-");
                            $('td:eq(' + c + ')', this).text(slowEffectDPS(rangeOfDPS[0]) + "-" + slowEffectDPS(rangeOfDPS[1])).removeClass("EnragedStat").addClass("SlowedStat");
                        } else if (unitDPSValues[d].includes("x2") === true) {
                            $('td:eq(' + c + ')', this).text(slowEffectDPS(unitDPSValues[d].replace(" x2", ""))).append(" x2").removeClass("EnragedStat").addClass("SlowedStat");
                        } else {
                            $('td:eq(' + c + ')', this).text(slowEffectDPS(unitDPSValues[d])).removeClass("EnragedStat").addClass("SlowedStat");
                        }
                    });
                    loopHitCount++;
                } else if (statName.includes("danni al secondo") === true && loopHitCount === 1) {
                    $('#unit-statistics-table tr').each(function(d) {
                        // Save
                        unitDPSValues2.push($('td:eq(' + c + ')', this).text());
                        // Slow
                        if (unitDPSValues2[d].includes("-") === true) {
                            var rangeOfDPS = unitDPSValues2[d].split("-");
                            $('td:eq(' + c + ')', this).text(slowEffectDPS(rangeOfDPS[0]) + "-" + slowEffectDPS(rangeOfDPS[1])).removeClass("EnragedStat").addClass("SlowedStat");
                        } else if (unitDPSValues2[d].includes("x2") === true) {
                            $('td:eq(' + c + ')', this).text(slowEffectDPS(unitDPSValues2[d].replace(" x2", ""))).append(" x2").removeClass("EnragedStat").addClass("SlowedStat");
                        } else {
                            $('td:eq(' + c + ')', this).text(slowEffectDPS(unitDPSValues2[d])).removeClass("EnragedStat").addClass("SlowedStat");
                        }
                    });
                    return false; // End the each loop
                }
            });
        } else { // Both buttons on or both buttons off since they cancel out
            // Remove effects and remove the color from the text affected
            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (attributeName === "velocit�") {
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(movementSpeedName + " (" + unitAttributeValues[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� colpi") {
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� generazione") {
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� produzione") {
                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
                }
            });
            // Repeat for a secondary attributes table (e.g. Golem)
            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (attributeName === "speed") {
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(movementSpeedName2 + " (" + unitAttributeValues2[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� colpi") {
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� generazione") {
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
                } else if (attributeName === "velocit� produzione") {
                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
                }
            });
            // Damage per second
            loopHitCount = 0;
            $('#unit-statistics-table tr:eq(0) th').each(function(c) {
                statName = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (statName.includes("danni al secondo") === true && loopHitCount === 0) {
                    $('#unit-statistics-table tr').each(function(d) {
                        $('td:eq(' + c + ')', this).text(unitDPSValues[d]).removeClass("EnragedStat").removeClass("SlowedStat");
                    });
                    loopHitCount++;
                } else if (statName.includes("danni al secondo") === true && loopHitCount === 1) {
                    $('#unit-statistics-table tr').each(function(d) {
                        $('td:eq(' + c + ')', this).text(unitDPSValues2[d]).removeClass("EnragedStat").removeClass("SlowedStat");
                    });
                    return false; // End the each loop
                }
            });
        }
    });
});