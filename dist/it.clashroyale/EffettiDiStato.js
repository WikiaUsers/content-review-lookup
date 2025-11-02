/*

===== Pulsanti degli effetti di stato per le tabelle della sezione statistiche delle carte =====
      Creato da King Dragonhoff

    Manutenzione
    Questo file deve essere aggiornato solo se cambia la quantità
    con cui un effetto modifica una statistica, se viene aggiunto
    un nuovo effetto o se un effetto si applica a nuovi attributi
    delle carte.
    I nomi degli attributi nelle tabelle devono rimanere invariati.
    Questo script attualmente supporta truppe che generano un solo tipo
    di unità alla morte.
    
*/


(function() {
	
	if (window.loadedStatusEffectsJs) return;
	window.loadedStatusEffectsJs = true;
	
	// *********** Funzioni ***********
	function roundNum(digit, num) {
	    return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
	}
	// Funzione matematica dell'effetto furia per aumenti di statistica (non legati al tempo)
	function rageEffectUp(originalValue) {
	    // Il fattore è 135 poiché la furia aumenta del 35%
	    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) * (135/100))));
	}
		// Funzione matematica dell'effetto furia per riduzioni di statistica (legate al tempo)
		/*   Il valore viene convertito in millisecondi per il calcolo, poi riconvertito in secondi per l'output */
	function rageEffectDown(originalValue) {
	    // Il fattore è 135 poiché la furia riduce del 35%
	    return String(Math.floor(roundNum(1,(Number(originalValue.replace(",", "")) * 1000) / (135/100))) / 1000);
	}
	// Funzione matematica dell'effetto furia per aumenti del DPS
	function rageEffectDPS(originalValue) {
	    // Il fattore è 135 poiché la furia aumenta del 35%
	    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) * (135/100))));
	}
	// Funzione matematica dell'effetto rallentamento per riduzioni di statistica (non legate al tempo)
	function slowEffectDown(originalValue) {
	// Il fattore è 135 poiché il rallentamento riduce del 35%
	    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) / (135/100))));
	}
	// Funzione matematica dell'effetto rallentamento per aumenti di statistica (legate al tempo)
	/*   Il valore viene convertito in millisecondi per il calcolo, poi riconvertito in secondi per l'output */
	function slowEffectUp(originalValue) {
	// Il fattore è 135 poiché il rallentamento aumenta del 35%
	    return String(Math.floor(roundNum(1,(Number(originalValue.replace(",", "")) * 1000) * (135/100))) / 1000);
	}
	// Funzione matematica dell'effetto rallentamento per la riduzione del DPS
	function slowEffectDPS(originalValue) {
    // Il fattore è 135 poiché il rallentamento riduce del 35%
	    return String(Math.floor(roundNum(1,Number(originalValue.replace(",", "")) / (135/100))));
	}
	
	// ********** Inizio **********
	$(document).ready(function() {
	    var movementSpeedName, movementSpeedName2, movementSpeedName3, unitAttributeValues = [], unitAttributeValues2 = [], unitAttributeValues3 = [], unitDPSValues = [], unitDPSValues2 = [], unitDPSValues3 = [], loopHitCount;
	    $("#slowEffectButton").click(function() {
	        $(this).toggleClass("slowEffectButtonActive");
	    });
	    $("#rageEffectButton").click(function() {
	        $(this).toggleClass("rageEffectButtonActive");
	    });
	    // Quando un pulsante viene cliccato...
	    $("#rageEffectButton, #slowEffectButton").click(function() {
	        // Disattiva gli effetti sulle statistiche
	        var unitAttributesTableR1 = $("#unit-attributes-table tr:eq(1)");
	        var unitAttributesTable2R1 = $("#unit-attributes-table-secondary tr:eq(1)");
	        var unitAttributesTable3R1 = $("#unit-attributes-table-tertiary tr:eq(1)");
	        var attributeName, statName, b, c, d, e;
	        if ($("#rageEffectButton").hasClass("rageEffectButtonActive") && $("#slowEffectButton").hasClass("slowEffectButtonActive") === false) {
	            // Applica l'effetto furia e colora il testo interessato dopo aver salvato i valori iniziali
	            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[0-9()]/g, "").trim(); // Salva il nome della velocità di movimento ("Lenta", "Media", ecc...) in modo che possa essere ripristinata quando il pulsante furia è disattivato.
	                    unitAttributeValues[0] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectUp(unitAttributeValues[0])).addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues[1] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    unitAttributeValues[2] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    unitAttributeValues[3] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    unitAttributeValues[4] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(rageEffectDown(unitAttributeValues[4]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Ripeti l'operazione per una tabella delle statistiche secondarie (ad esempio per il golem).
	            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName2 = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[0-9()]/g, "").trim(); // Salva il nome della velocità di movimento ("Lenta", "Media", ecc...) in modo che possa essere ripristinata quando il pulsante furia è disattivato.
	                    unitAttributeValues2[0] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectUp(unitAttributeValues2[0])).addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues2[1] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    unitAttributeValues2[2] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    unitAttributeValues2[3] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    unitAttributeValues2[4] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(rageEffectDown(unitAttributeValues2[4]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Ripeti l'operazione per una tabella delle statistiche terziarie (ad esempio per il golem di elisir).
	            $('#unit-attributes-table-tertiary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName3 = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[0-9()]/g, "").trim(); // Salva il nome della velocità di movimento ("Lenta", "Media", ecc...) in modo che possa essere ripristinata quando il pulsante furia è disattivato.
	                    unitAttributeValues3[0] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectUp(unitAttributeValues3[0])).addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues3[1] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectDown(unitAttributeValues3[1]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    unitAttributeValues3[2] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectDown(unitAttributeValues3[2]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    unitAttributeValues3[3] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectDown(unitAttributeValues3[3]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    unitAttributeValues3[4] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(rageEffectDown(unitAttributeValues3[4]) + " sec").addClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Danni al secondo
	            loopHitCount = 0;
	            $('#unit-statistics-table tr:eq(0) th').each(function(c) {
	                statName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (statName.includes("danni/sec") === true && loopHitCount === 0) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        // Salva
	                        unitDPSValues.push($('td:eq(' + c + ')', this).text());
	                        // Furia
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
	                } else if (statName.includes("danni/sec") === true && loopHitCount === 1) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        // Salva
	                        unitDPSValues2.push($('td:eq(' + c + ')', this).text());
	                        // Furia
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
	                } else if (statName.includes("danni/sec") === true && loopHitCount === 2) {
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
	                    return false; // Fine del ciclo
	                }
	            });
	        } else if ($("#rageEffectButton").hasClass("rageEffectButtonActive") === false && $("#slowEffectButton").hasClass("slowEffectButtonActive")) {
	            // Applica un effetto lento e colora il testo interessato dopo aver salvato i valori iniziali
	            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[0-9()]/g, "").trim(); // Salva il nome della velocità di movimento ("Lenta", "Media", ecc...) in modo che possa essere ripristinata quando il pulsante furia è disattivato.
	                    unitAttributeValues[0] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectDown(unitAttributeValues[0])).removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues[1] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    unitAttributeValues[2] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    unitAttributeValues[3] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    unitAttributeValues[4] = $('td:eq(' + b + ')', unitAttributesTableR1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(slowEffectUp(unitAttributeValues[4]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                }
	            });
	            // Ripeti l'operazione per una tabella delle statistiche secondarie (ad esempio per il golem).
	            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName2 = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[0-9()]/g, "").trim(); // Salva il nome della velocità di movimento ("Lenta", "Media", ecc...) in modo che possa essere ripristinata quando il pulsante furia è disattivato.
	                    unitAttributeValues2[0] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectDown(unitAttributeValues2[0])).removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues2[1] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    unitAttributeValues2[2] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    unitAttributeValues2[3] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    unitAttributeValues2[4] = $('td:eq(' + e + ')', unitAttributesTable2R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(slowEffectUp(unitAttributeValues2[4]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                }
	            });
	            // Ripeti l'operazione per una tabella delle statistiche terziarie (ad esempio per il golem di elisir).
	            $('#unit-attributes-table-tertiary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    movementSpeedName3 = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[0-9()]/g, "").trim(); // Save movement speed name ("Slow", "Medium", etc.) so that it can be put back when the rage button is inactivated
	                    unitAttributeValues3[0] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectDown(unitAttributeValues3[0])).removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    unitAttributeValues3[1] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectUp(unitAttributeValues3[1]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    unitAttributeValues3[2] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectUp(unitAttributeValues3[2]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    unitAttributeValues3[3] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectUp(unitAttributeValues3[3]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    unitAttributeValues3[4] = $('td:eq(' + e + ')', unitAttributesTable3R1).text().replace(/[^0-9.]/g, "").trim();
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(slowEffectUp(unitAttributeValues3[4]) + " sec").removeClass("EnragedStat").addClass("SlowedStat");
	                }
	            });
	            // Danni al secondo
	            loopHitCount = 0;
	            $('#unit-statistics-table tr:eq(0) th').each(function(c) {
	                statName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (statName.includes("danni/sec") === true && loopHitCount === 0) {
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
	                } else if (statName.includes("danni/sec") === true && loopHitCount === 1) {
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
	                } else if (statName.includes("danni/sec") === true && loopHitCount === 2) {
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
	                    return false; // Fine del ciclo
	                }
	            });
	        } else { // Entrambi i pulsanti attivati o entrambi i pulsanti disattivati poiché si annullano a vicenda.
                // Rimuovere gli effetti e rimuove il colore dal testo interessato.
	            $('#unit-attributes-table tr:eq(0) th').each(function(b) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(movementSpeedName + " (" + unitAttributeValues[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    $('td:eq(' + b + ')', unitAttributesTableR1).text(unitAttributeValues[4] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Ripeti l'operazione per una tabella delle statistiche secondarie (ad esempio per il golem).
	            $('#unit-attributes-table-secondary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(movementSpeedName2 + " (" + unitAttributeValues2[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                }else if (attributeName === "velocità generazione") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    $('td:eq(' + e + ')', unitAttributesTable2R1).text(unitAttributeValues2[4] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Ripeti l'operazione per una tabella delle statistiche secondarie (ad esempio per il golem di elisir).
	            $('#unit-attributes-table-tertiary tr:eq(0) th').each(function(e) {
	                attributeName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (attributeName === "velocità") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(movementSpeedName3 + " (" + unitAttributeValues3[0] + ")").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità colpi") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(unitAttributeValues3[1] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità primo colpo") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(unitAttributeValues3[2] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità generazione") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(unitAttributeValues3[3] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                } else if (attributeName === "velocità produzione") {
	                    $('td:eq(' + e + ')', unitAttributesTable3R1).text(unitAttributeValues3[4] + " sec").removeClass("EnragedStat").removeClass("SlowedStat");
	                }
	            });
	            // Danni al secondo
	            loopHitCount = 0;
	            $('#unit-statistics-table tr:eq(0) th').each(function(c) {
	                statName = $(this).clone().children().remove().end().text().trim().toLowerCase();
	                if (statName.includes("danni/sec") === true && loopHitCount === 0) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        $('td:eq(' + c + ')', this).text(unitDPSValues[d]).removeClass("EnragedStat").removeClass("SlowedStat");
	                    });
	                    loopHitCount++;
	                } else if (statName.includes("danni/sec") === true && loopHitCount === 1) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        $('td:eq(' + c + ')', this).text(unitDPSValues2[d]).removeClass("EnragedStat").removeClass("SlowedStat");
	                    });
	                    loopHitCount++;
	                } else if (statName.includes("danni/sec") === true && loopHitCount === 2) {
	                    $('#unit-statistics-table tr').each(function(d) {
	                        $('td:eq(' + c + ')', this).text(unitDPSValues3[d]).removeClass("EnragedStat").removeClass("SlowedStat");
	                    });
	                    return false; // Fine del ciclo
	                }
	            });
	        }
	    });
	});
	
})();