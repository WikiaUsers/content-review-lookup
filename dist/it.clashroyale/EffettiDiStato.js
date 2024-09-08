/*

===== Status Effect buttons for Statistics section tables =====
    by King Dragonhoff

Maintenance
    This file should only need to be updated if the amount that
    an effect modifies a stat by is changed, a new effect is added,
    or an effect applies to new attributes of cards. 
    The names of the attributes in the tables must remain the same.
    This script currently supports troops that spawn 1 type of
    unit on death.
    
*/

(function() {
	
	if (window.loadedStatusEffectsJs) return;
	window.loadedStatusEffectsJs = true;
	
	// *********** Functions ***********
	function roundNum(digit, num) {
	    return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
	}
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
	    // Factor is 135 since Rage boosts by 35%
	    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) * (135/100))));
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
	    // Factor is 135 since Slow decreases by 35%
	    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) / (135/100))));
	}
	
	// ********** Get Started **********
	$(document).ready(function() {
	    var movementSpeedName, movementSpeedName2, movementSpeedName3, unitAttributeValues = [], unitAttributeValues2 = [], unitAttributeValues3 = [], unitDPSValues = [], unitDPSValues2 = [], unitDPSValues3 = [], loopHitCount;
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
	        var unitAttributesTable3R1 = $("#unit-attributes-table-tertiary tr:eq(1)");
	        var attributeName, statName, b, c, d, e;
	        if ($("#rageEffectButton").hasClass("rageEffectButtonActive") && $("#slowEffectButton").hasClass("slowEffectButtonActive") === false) {
	            // Apply rage effect and color the text affected after saving initial values
	            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
	                    unitAttributeValues[0] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectUp(unitAttributeValues[0])).addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues[1] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    unitAttributeValues[2] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    unitAttributeValues[3] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Repeat for a secondary attributes table (e.g. Golem)
	            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName2 = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
	                    unitAttributeValues2[0] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectUp(unitAttributeValues2[0])).addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues2[1] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    unitAttributeValues2[2] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    unitAttributeValues2[3] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Repeat for a tertiary attributes table (e.g. Elixir Golem)
	            $('#unit-attributes-table-tertiary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName3 = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
	                    unitAttributeValues3[0] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectUp(unitAttributeValues3[0])).addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues3[1] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectDown(unitAttributeValues3[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    unitAttributeValues3[2] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectDown(unitAttributeValues3[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    unitAttributeValues3[3] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectDown(unitAttributeValues3[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
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
	                    loopHitCount++;
	                } else if (statName.includes("danni al secondo") === true && loopHitCount === 2) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        // Save
	                        unitDPSValues3.push($('td:eq(' + c + ')', this).text());
	                        // Enrage
	                        if (unitDPSValues3[d].includes("-") === true) {
	                            var rangeOfDPS = unitDPSValues3[d].split("-");
	                            $('td:eq(' + c + ')', this).text(rageEffectDPS(rangeOfDPS[0]) + "-" + rageEffectDPS(rangeOfDPS[1])).addClass("EnragedStat").removeClass("SlowedStat");
	                        } else if (unitDPSValues3[d].includes("x2") === true) {
	                            $('td:eq(' + c + ')', this).text(rageEffectDPS(unitDPSValues3[d].replace(" x2", ""))).append(" x2").addClass("EnragedStat").removeClass("SlowedStat");
	                        } else {
	                            $('td:eq(' + c + ')', this).text(rageEffectDPS(unitDPSValues3[d])).addClass("EnragedStat").removeClass("SlowedStat");
	                        }
	                    });
	                    return false; // End the each loop
	                }
	            });
	        } else if ($("#rageEffectButton").hasClass("rageEffectButtonActive") === false && $("#slowEffectButton").hasClass("slowEffectButtonActive")) {
	            // Apply slow effect and color the text affected after saving initial values
	            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the slow button is inactivated
	                    unitAttributeValues[0] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectDown(unitAttributeValues[0])).removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues[1] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    unitAttributeValues[2] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    unitAttributeValues[3] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                }
	            });
	            // Repeat for a secondary attributes table (e.g. Golem)
	            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName2 = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
	                    unitAttributeValues2[0] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectDown(unitAttributeValues2[0])).removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues2[1] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    unitAttributeValues2[2] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    unitAttributeValues2[3] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                }
	            });
	            // Repeat for a tertiary attributes table (e.g. Elixir Golem)
	            $('#unit-attributes-table-tertiary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName3 = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
	                    unitAttributeValues3[0] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectDown(unitAttributeValues3[0])).removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues3[1] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectUp(unitAttributeValues3[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    unitAttributeValues3[2] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectUp(unitAttributeValues3[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    unitAttributeValues3[3] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectUp(unitAttributeValues3[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
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
	                    loopHitCount++;
	                } else if (statName.includes("danni al secondo") === true && loopHitCount === 2) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        // Save
	                        unitDPSValues3.push($('td:eq(' + c + ')', this).text());
	                        // Slow
	                        if (unitDPSValues3[d].includes("-") === true) {
	                            var rangeOfDPS = unitDPSValues3[d].split("-");
	                            $('td:eq(' + c + ')', this).text(slowEffectDPS(rangeOfDPS[0]) + "-" + slowEffectDPS(rangeOfDPS[1])).removeClass("EnragedStat").addClass("SlowedStat");
	                        } else if (unitDPSValues3[d].includes("x2") === true) {
	                            $('td:eq(' + c + ')', this).text(slowEffectDPS(unitDPSValues3[d].replace(" x2", ""))).append(" x2").removeClass("EnragedStat").addClass("SlowedStat");
	                        } else {
	                            $('td:eq(' + c + ')', this).text(slowEffectDPS(unitDPSValues3[d])).removeClass("EnragedStat").addClass("SlowedStat");
	                        }
	                    });
	                    return false; // End the each loop
	                }
	            });
	        } else { // Both buttons on or both buttons off since they cancel out
	            // Remove effects and remove the color from the text affected
	            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(movementSpeedName + " (" + unitAttributeValues[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Repeat for a secondary attributes table (e.g. Golem)
	            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(movementSpeedName2 + " (" + unitAttributeValues2[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Repeat for a tertiary attributes table (e.g. Elixir Golem)
	            $('#unit-attributes-table-tertiary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(movementSpeedName3 + " (" + unitAttributeValues3[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(unitAttributeValues3[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "spawn speed") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(unitAttributeValues3[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "production speed") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(unitAttributeValues3[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
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
	                    loopHitCount++;
	                } else if (statName.includes("danni al secondo") === true && loopHitCount === 2) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        $('td:eq(' + c + ')', this).text(unitDPSValues3[d]).removeClass("EnragedStat").removeClass("SlowedStat");
	                    });
	                    return false; // End the each loop
	                }
	            });
	        }
	    });
	});
	
})();