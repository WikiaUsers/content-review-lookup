/* --- Fonction cumule coût canonnière --- */
function calculerCumul() {
    var currentTotalCumul = 0;
    var currentTotalBase = 0; 
    var getRC = parseFloat($("#bonusInputRC").val()) || 0;

    $(".GBE_Cost").each(function() {
	    var base = parseFloat($(this).attr("title")) || 0;
	    
	    // Sécurité : le coût ne peut pas être inférieur à 0
	    var reduit = Math.max(0, Math.ceil(base * (1 - getRC / 100)));
	    
	    currentTotalBase += base;
	    currentTotalCumul += reduit;
	
	    // 1. AFFICHAGE COLONNE COÛT
	    if (getRC > 0) {
	        $(this).html(
	            '<span style="color: #999;"><s>' + base + '</s></span>' + 
	            '<br><span style="color: #ff66cc; font-weight: bold;">' + (reduit <= 0 ? "0 Pts" : reduit + " Pts") + '</span>'
	        );
	    } else {
	        $(this).html('<span style="font-weight: normal;">' + base + '</span>');
	    }
	
	    // 2. AFFICHAGE COLONNE CUMUL
	    if (getRC > 0) {
	        $(this).next(".GBE_Cumul").html(
	            '<span style="color: #999;"><s>' + currentTotalBase + '</s></span>' +
	            '<br><span style="color: #ff66cc; font-weight: bold;">' + currentTotalCumul + '</span>'
	        );
	    } else {
	        $(this).next(".GBE_Cumul").html('<span style="font-weight: normal;">' + currentTotalBase + '</span>');
	    }
	});
}

// Template: StatueStatsForm
$(document).ready(function() {
	
	var inputStyle = 'text-align: right; width: 40px;';
    /* Fonction d'arrondi */
    function roundNum(digit, num) {
        return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
    }

    /* 1. CRÉATION DES INPUTS UNIQUEMENT (TH, TD, TS + OB) */
    $("span#bonusInputTHHarness").html('<input type="text" value="0" id="bonusInputTH" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputTDHarness").html('<input type="text" value="0" id="bonusInputTD" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputTSHarness").html('<input type="text" value="0" id="bonusInputTS" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusadrenaline").html('<select id="bonusInputAdre" class="bonusInput"> \
    	<option value="0" selected>Aucun</option> \
        <option value="5">Niveau 1</option> \
        <option value="6">Niveau 2</option> \
        <option value="7">Niveau 3</option> \
        <option value="8">Niveau 4</option> \
        <option value="9">Niveau 5</option> \
        <option value="10">Niveau 6</option> \
        <option value="11">Niveau 7</option> \
        <option value="12">Niveau 8</option> \
        <option value="13">Niveau 9</option> \
        <option value="14">Niveau 10</option> \
        <option value="15">Niveau 11</option> \
        <option value="16">Niveau 12</option> \
        <option value="17">Niveau 13</option> \
        <option value="18">Niveau 14</option> \
        <option value="19">Niveau 15</option> \
        <option value="20">Niveau 16</option> \
    </select>');
    
    $("span#bonusOrdreBataille").html('<select id="battleOrdersLevel" class="bonusInput"> \
        <option value="0">Aucun</option> \
        <option value="1">Niveau 1</option> \
        <option value="2">Niveau 2</option> \
        <option value="3">Niveau 3</option> \
        <option value="4">Niveau 4</option> \
        <option value="5">Niveau 5</option> \
        <option value="6">Niveau 6</option> \
    </select>');
    
    $("span#bonusInputADHarness").html('<input type="text" value="0" id="bonusInputAD" class="bonusInput" style="' + inputStyle + '"></input>');
	$("span#bonusInputRCHarness").html('<input type="text" value="0" id="bonusInputRC" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#bonusInputDurHarness").html('<input type="text" value="0" id="bonusInputDur" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#bonusInputSoinHarness").html('<input type="text" value="0" id="bonusInputSoin" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#bonusInputGenHarness").html('<input type="text" value="0" id="bonusInputGen" class="bonusInput" style="' + inputStyle + '"></input>');
    
    $("span#bonusartilleur").html('<select id="bonusInputArti" class="bonusInput"> \
        <option value="0" selected>Aucun</option>\
        <option value="10">Niveau 1</option>\
        <option value="11">Niveau 2</option>\
        <option value="12">Niveau 3</option>\
        <option value="13">Niveau 4</option>\
        <option value="14">Niveau 5</option>\
        <option value="15">Niveau 6</option>\
        <option value="16">Niveau 7</option>\
        <option value="17">Niveau 8</option>\
        <option value="18">Niveau 9</option>\
        <option value="19">Niveau 10</option>\
        <option value="20">Niveau 11</option>\
        <option value="21">Niveau 12</option>\
        <option value="22">Niveau 13</option>\
        <option value="23">Niveau 14</option>\
        <option value="24">Niveau 15</option>\
        <option value="25">Niveau 16</option>\
        <option value="26">Niveau 17</option>\
        <option value="27">Niveau 18</option>\
        <option value="28">Niveau 19</option>\
        <option value="29">Niveau 20</option>\
        <option value="30">Niveau 21</option>\
    </select>');

    /* 2. INITIALISATION DES VALEURS DE BASE */
    $(".StatueStat").each(function() {
        var textValue = $(this).text().replace(/\s/g, "").replace(/,/g, ".");
        var initialValue = parseFloat(textValue) || 0;
        $(this).attr("title", initialValue);
    });
    calculerCumul();

    /* 3. CALCULS AU CLIC SUR LE BOUTON UPDATE */
    $("#changeBonusButton").click(function() {
        $(this).text("Update");

        // Récupération des valeurs
        var getTH = parseFloat($("#bonusInputTH").val()) || 0;
        var getTD = parseFloat($("#bonusInputTD").val()) || 0;
        var getTS = parseFloat($("#bonusInputTS").val()) || 0;
        var boLevel = $("#battleOrdersLevel").val();
        var getADRE = parseFloat($("#bonusInputTS").val()) || 0;
        var getAD = parseFloat($("#bonusInputAD").val()) || 0;
        var getRC = parseFloat($("#bonusInputRC").val()) || 0;
        var getDur = parseFloat($("#bonusInputDur").val()) || 0;
        var getSoin = parseFloat($("#bonusInputSoin").val()) || 0;
        var getGen = parseFloat($("#bonusInputGen").val()) || 0;
        var getArti = parseFloat($("#bonusInputArti").val()) || 0;

        // Table de correspondance Ordre de Bataille
        var boDegats = 0; 
        var boVitesse = 0;
        if (boLevel == "1") { boDegats = 15; boVitesse = 40; }
        else if (boLevel == "2") { boDegats = 17; boVitesse = 44; }
        else if (boLevel == "3") { boDegats = 19; boVitesse = 48; }
        else if (boLevel == "4") { boDegats = 22; boVitesse = 52; }
        else if (boLevel == "5") { boDegats = 25; boVitesse = 56; }
        else if (boLevel == "6") { boDegats = 30; boVitesse = 60; }
        
        // --- CALCUL TDA (Dégâts/sec) : Multiplicatif (Dégâts x Vitesse) ---
        $(".TDA").each(function() {
            var base = parseFloat($(this).attr("title")) || 0;
            // Formule : Base * (1 + %Dégâts) * (1 + %Vitesse)
            var multDegats = 1 + (getTD + boDegats) / 100;
            var multVitesse = 1 + (getTS + getADRE + boVitesse) / 100;
            var total = Math.round(base * multDegats * multVitesse);
            var bonus = total - base;

            if (bonus > 0) {
                $(this).html(base.toLocaleString() + '<span style="color: #ff66cc;"> + ' + bonus.toLocaleString() + '</span><br><b>' + total.toLocaleString() + '</b>');
                $(this).addClass("StatModified");
            } else {
                $(this).text(base.toLocaleString());
                $(this).removeClass("StatModified");
            }
        });

        // --- CALCUL TD (Dégâts par tir) : Statue + OB (SANS Vitesse) ---
        $(".TD").each(function() {
            var base = parseFloat($(this).attr("title")) || 0;
            var totalPercentTD = getTD + boDegats;
            var bonus = roundNum(1, base * (totalPercentTD / 100));
            var total = roundNum(1, base + bonus);

            if (totalPercentTD > 0) {
                $(this).html(base.toLocaleString() + '<span style="color: #ff66cc;"> + ' + bonus.toLocaleString() + '</span><br><b>' + total.toLocaleString() + '</b>');
                $(this).addClass("StatModified");
            } else {
                $(this).text(base.toLocaleString());
                $(this).removeClass("StatModified");
            }
        });

        // --- CALCUL TH (Santé) : Statue uniquement ---
        $(".TH").each(function() {
            var base = parseFloat($(this).attr("title")) || 0;
            var bonus = Math.round(base * (getTH / 100));
            var total = base + bonus;

            if (getTH > 0) {
                $(this).html(base.toLocaleString() + '<span style="color: #ff66cc;"> + ' + bonus.toLocaleString() + '</span><br><b>' + total.toLocaleString() + '</b>');
                $(this).addClass("StatModified");
            } else {
                $(this).text(base.toLocaleString());
                $(this).removeClass("StatModified");
            }
        });
        
        // --- CALCULS CAPACITÉS CANONNIÈRE ---
        $(".AD").each(function() {
            var base = parseFloat($(this).attr("title")) || 0;
            var totalGbeDmg = getAD + getArti; // bonus + Gravure Artilleur
            var total = Math.round(base * (1 + totalGbeDmg / 100));
            var bonus = total - base;
            $(this).html(base.toLocaleString() + (totalGbeDmg > 0 ? ' <span style="color: #ff66cc;">+' + bonus.toLocaleString() + '</span><br><b>' + total.toLocaleString() + '</b>' : ''));
        });
	
	    /* --- INITIALISATION AU CHARGEMENT DE LA PAGE --- */
	    // On lance le calcul une première fois pour remplir le tableau de base
	    calculerCumul();
	
	    /* --- CALCULS AU CLIC SUR LE BOUTON UPDATE --- */
	    $("#changeBonusButton").click(function() {
	        $(this).text("Update");
	        
	        // ... (tes autres calculs TH, TD, TDA ici) ...
	
	        // On appelle la fonction pour mettre à jour le cumul avec les nouveaux bonus
	        calculerCumul(); 
	    });

		// --- CALCULS AUTRES (DURÉE) ---
		$(".Duration").each(function() {
		    var base = parseFloat($(this).attr("title")) || 0;
		    var val = getDur; // Simplifié car on cible uniquement .Duration ici
		    var bonusTotal = roundNum(1, base * (val / 100));
		    var total = roundNum(1, base + bonusTotal);
		    
		    if (val > 0) {
		        $(this).html(base.toLocaleString() + ' <span style="color: #ff66cc;">+' + bonusTotal.toLocaleString() + '</span><br><b>' + total.toLocaleString() + ' sec</b>');
		    } else {
		        $(this).text(base.toLocaleString() + ' sec');
		    }
		});
		
		// --- CALCULS AUTRES (SOINS ET GÉNÉRATEUR) ---
		$(".Soin, .Gen").each(function() {
		    var base = parseFloat($(this).attr("title")) || 0;
		    var isHealing = $(this).hasClass("Soin");
		    var val = isHealing ? getSoin : getGen;
		    var unit = isHealing ? " PV" : ""; // Adapte l'unité selon la statistique
		    
		    var bonusTotal = roundNum(1, base * (val / 100));
		    var total = roundNum(1, base + bonusTotal);
		    
		    if (val > 0) {
		        $(this).html(base.toLocaleString() + ' <span style="color: #ff66cc;">+' + bonusTotal.toLocaleString() + '</span><br><b>' + total.toLocaleString() + unit + '</b>');
		    } else {
		        $(this).text(base.toLocaleString() + unit);
		    }
		});
    });

    /* 4. BOUTON RESET */
    $("#resetBonusButton").click(function() {
        $(".bonusInput").val("0");
        $("#battleOrdersLevel, #bonusInputAdre, #bonusInputArti").val("0");
        $("#changeBonusButton").text("Appliquer");
        $(".StatueStat").each(function() {
            var base = parseFloat($(this).attr("title"));
            $(this).text(base.toLocaleString());
            $(this).removeClass("StatModified");
            
            setTimeout(calculerCumul, 50);
        });
    });
});