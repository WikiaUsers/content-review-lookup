// Template: StatueStatsForm
$(document).ready(function() {
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

    /* 2. INITIALISATION DES VALEURS DE BASE */
    $(".StatueStat").each(function() {
        var textValue = $(this).text().replace(/\s/g, "").replace(/,/g, ".");
        var initialValue = parseFloat(textValue) || 0;
        $(this).attr("title", initialValue);
    });

    /* 3. CALCULS AU CLIC SUR LE BOUTON UPDATE */
    $("#changeBonusButton").click(function() {
        $(this).text("Update");

        // Récupération des valeurs
        var getTH = parseFloat($("#bonusInputTH").val()) || 0;
        var getTD = parseFloat($("#bonusInputTD").val()) || 0;
        var getTS = parseFloat($("#bonusInputTS").val()) || 0;
        var boLevel = $("#battleOrdersLevel").val();
        var getAd = parseFloat($("#bonusInputAdre").val()) || 0;

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
            var multVitesse = 1 + (getTS + getAd + boVitesse) / 100;
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
    });

    /* 4. BOUTON RESET */
    $("#resetBonusButton").click(function() {
        $(".bonusInput").val("0");
        $("#battleOrdersLevel").val("0");
        $("#changeBonusButton").text("Apply");
        $(".StatueStat").each(function() {
            var base = parseFloat($(this).attr("title"));
            $(this).text(base.toLocaleString());
            $(this).removeClass("StatModified");
        });
    });
});