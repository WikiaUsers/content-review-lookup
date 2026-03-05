/* --- Fonction cumule coût canonnière --- */
function calculerCumul() {
    var currentTotalCumul = 0;
    var currentTotalBase = 0; 
    var getRC = parseFloat($("#IDInputCanoReduc").val()) || 0;

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

function formatTime(totalMinutes) {
	if (totalMinutes <= 0 || isNaN(totalMinutes)) return "0s";
	var days = Math.floor(totalMinutes / 1440);
    var hours = Math.floor((totalMinutes % 1440) / 60);
    var mins = totalMinutes % 60;
    var result = "";
    if (days > 0) result += days + "j ";
    if (hours > 0) result += hours + "h ";
    if (mins > 0 && days === 0) result += mins + "m";
    return result.trim() || "0m";
}

// Template: StatueStatsForm
$(document).ready(function() {
	
	var inputStyle = 'text-align: right; width: 40px;';
    function roundNum(digit, num) {
        return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
    }

    $("span#InputSanté").html('<input type="text" value="0" id="IDInputSanté" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputDégâts").html('<input type="text" value="0" id="IDInputDégâts" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputVitesse").html('<input type="text" value="0" id="IDInputVitesse" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputUpgrade").html('<input type="text" value="0" id="IDInputUpgrade" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputDégâtsCano").html('<input type="text" value="0" id="IDInputDégâtsCano" class="bonusInput" style="' + inputStyle + '"></input>');
	$("span#InputCanoReduc").html('<input type="text" value="0" id="IDInputCanoReduc" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputDurée").html('<input type="text" value="0" id="IDInputDurée" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputSoin").html('<input type="text" value="0" id="IDInputSoin" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputGénération").html('<input type="text" value="0" id="IDInputGénération" class="bonusInput" style="' + inputStyle + '"></input>');
    $("span#InputProduction").html('<input type="text" value="0" id="IDInputProduction" class="bonusInput" style="' + inputStyle + '"></input>');
    $('#InputAmpli1').html(`<input type="number" id="IDInputAmpli1" class="bonusInput ampliInput" value="0" min="0" style="${inputStyle}">`);
    $('#InputAmpli2').html(`<input type="number" id="IDInputAmpli2" class="bonusInput ampliInput" value="0" min="0" style="${inputStyle}">`);
    $('#InputAmpli3').html(`<input type="number" id="IDInputAmpli3" class="bonusInput ampliInput" value="0" min="0" style="${inputStyle}">`);
    // Gravure Adrénaline dans Artéfacts.js
    // Gravure Artilleur dans Artéfacts.js
    // Ordre de bataille dans Artéfacts.js

    $(".StatueStat, .Santé, .TD, .TDA, .BD, .BDA, .AD, .Duration, .Soin, .Gen, .Production").each(function() {
	    var textValue = $(this).text().replace(/\s/g, "").replace(/,/g, ".");
	    var initialValue = parseFloat(textValue) || 0;
	    $(this).attr("data-base", initialValue); 
	    $(this).attr("title", initialValue);
	});
	calculerCumul();

    $("#changeBonusButton").click(function() {
        $(this).text("Update");

        var getTH = parseFloat($("#IDInputSanté").val()) || 0;
        var getTD = parseFloat($("#IDInputDégâts").val()) || 0;
        var getTS = parseFloat($("#IDInputVitesse").val()) || 0;
        var boLevel = $("#IDInputOrdreBataille").val();
        var getADRE = parseFloat($("#IDInputAdrenaline").val()) || 0;
        var getAD = parseFloat($("#IDInputDégâtsCano").val()) || 0;
        var getRC = parseFloat($("#IDInputCanoReduc").val()) || 0;
        var getDur = parseFloat($("#IDInputDurée").val()) || 0;
        var getSoin = parseFloat($("#IDInputSoin").val()) || 0;
        var getGen = parseFloat($("#IDInputGénération").val()) || 0;
        var getArti = parseFloat($("#IDInputArtilleur").val()) || 0;
        var getRT = parseFloat($("#IDInputUpgrade").val()) || 0;
        var getPR = parseFloat($("#IDInputProduction").val()) || 0;
        var coeffRT = 1 + (getRT / 100);
        var AmpliI = parseInt($('#IDInputAmpli1').val()) || 0;
        var AmpliII = parseInt($('#IDInputAmpli2').val()) || 0;
        var AmpliIII = parseInt($('#IDInputAmpli3').val()) || 0;
        var boDegats = 0; 
        var boVitesse = 0;
        if (boLevel == "1") { boDegats = 15; boVitesse = 40; }
        else if (boLevel == "2") { boDegats = 17; boVitesse = 42; }
        else if (boLevel == "3") { boDegats = 19; boVitesse = 45; }
        else if (boLevel == "4") { boDegats = 22; boVitesse = 47; }
        else if (boLevel == "5") { boDegats = 25; boVitesse = 50; }
        else if (boLevel == "6") { boDegats = 30; boVitesse = 60; }
		var totalAmpliBonus = (AmpliI * 50) + (AmpliII * 75) + (AmpliIII * 100);
		var totalBD = totalAmpliBonus + getTD;
		
		$('.BDA').each(function() {
		    var baseValue = parseFloat($(this).attr('data-base'));
		    if (!isNaN(baseValue)) {
		        // Le calcul du DPS (BDA) prend en compte le bonus de dégâts (totalBD) 
		        // ET le bonus de vitesse (getBS)
		        var totalBD = totalAmpliBonus + getTD; // getTD étant votre variable pour les statues de glace Dégâts
		        
		        // Formule : Base * (1 + BonusDégâts) * (1 + BonusVitesse)
		        var finalValue = Math.round(baseValue * (1 + totalBD / 100) * (1 + getTS / 100));
		        var bonusTotalValue = finalValue - baseValue;
		
		        $(this).html(
		            baseValue + 
		            ' <span style="color: #ff00ff;">+ ' + bonusTotalValue + '</span><br>' +
		            '<strong>' + finalValue + '</strong>'
		        );
		    }
		});	
		$('.BD').each(function() {
		    var baseValue = parseFloat($(this).attr('data-base')); // Utilisation de .attr pour être sûr
		    if (!isNaN(baseValue)) {
		        var bonusValue = Math.round(baseValue * (totalBD / 100));
		        var finalValue = baseValue + bonusValue;
		
		        $(this).html(
		            baseValue + 
		            ' <span style="color: #ff00ff;">+ ' + bonusValue + '</span><br>' +
		            '<strong>' + finalValue + '</strong>'
		        );
		    }
		});
        
        $(".TDA").each(function() {
            var base = parseFloat($(this).attr("title")) || 0;
            var multDegats = 1 + (getTD + boDegats) / 100;
            var multVitesse = 1 + (getADRE + boVitesse) / 100;
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

        $(".Santé").each(function() {
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

        $(".TS").each(function() {
		    var base = parseFloat($(this).attr("title")) || 0;
		    
		    var bonusVitesse = getADRE / 100;
		    
		    if (bonusVitesse > 0) {
		        var total = base / (1 + bonusVitesse);
		        var tion = base - total;
		
		        $(this).html(
		            base.toLocaleString(undefined, {minimumFractionDigits: 1}) + 's' + 
		            '<span style="color: #ff66cc;"> - ' + tion.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 2}) + 's</span><br><b>' + 
		            total.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 2}) + 's</b>'
		        );
		        $(this).addClass("StatModified");
		    } else {
		        $(this).text(base.toLocaleString(undefined, {minimumFractionDigits: 1}) + 's');
		        $(this).removeClass("StatModified");
		    }
		});
        
        $(".StatueStat.Temps").each(function() {
		    var self = $(this);
		    
		    var rawMinutes = self.attr("data-minutes"); 
		    var minBase = parseInt(rawMinutes);
		
		    if (isNaN(minBase)) {
		        console.error("Attribut data-minutes manquant sur cette ligne !");
		        return;
		    }
		
		    var getRT = parseFloat($("#IDInputUpgrade").val()) || 0;
		    var coeff = 1 - (Math.abs(getRT) / 100);
		    var nouvellesMinutes = Math.ceil(minBase * coeff);
		
		    if (typeof formatTime === "function") {
		        self.text(formatTime(nouvellesMinutes));
		    }
		
		    var instantCell = self.closest('tr').find('.StatueStat.Instant');
		    var instantBase = parseInt(instantCell.attr("data-minutes")) || 0;
		
		    if (window.estimerDiamants && instantBase > 0) {
		        
		        var diamantsTempsOriginal = window.estimerDiamants(minBase);
		        
		        var tionDiamants = diamantsTempsOriginal * (Math.abs(getRT) / 100);
		        
		        var nouveauTotal = instantBase - tionDiamants;
		
		        if (getRT !== 0 && !isNaN(nouveauTotal)) {
		            var htmlContent = '<span style="color: #999; font-size: 0.85em;"><s>' + instantBase.toLocaleString() + '</s></span><br>' +
		                              '<b style="color: #ff66cc;">' + Math.ceil(nouveauTotal).toLocaleString() + '</b>';
		            instantCell.html(htmlContent);
		            instantCell.addClass("StatModified");
		        } else {
		            instantCell.text(instantBase.toLocaleString());
		            instantCell.removeClass("StatModified");
		        }
		    }
		});
        
        $(".AD").each(function() {
            var base = parseFloat($(this).attr("title")) || 0;
            var totalGbeDmg = getAD + getArti; // bonus + Gravure Artilleur
            var total = Math.round(base * (1 + totalGbeDmg / 100));
            var bonus = total - base;
            $(this).html(base.toLocaleString() + (totalGbeDmg > 0 ? ' <span style="color: #ff66cc;">+' + bonus.toLocaleString() + '</span><br><b>' + total.toLocaleString() + '</b>' : ''));
        });
	
	    calculerCumul();

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
		
		$(".Soin").each(function() {
		    var base = parseFloat($(this).attr("title")) || 0;
		    var val = getSoin;
		    var unit = " PV"; 
		
		    var bonusTotal = roundNum(1, base * (val / 100));
		    var total = roundNum(1, base + bonusTotal);
		
		    if (val > 0) {
		        $(this).html(base.toLocaleString() + '<span style="color: #ff66cc;"> +' + bonusTotal.toLocaleString() + '</span><br><b>' + total.toLocaleString() + unit + '</b>');
		        $(this).addClass("StatModified");
		    } else {
		        $(this).text(base.toLocaleString() + unit);
		        $(this).removeClass("StatModified");
		    }
		});
		
		$(".Gen").each(function() {
		    var base = parseFloat($(this).attr("title")) || 0;
		    var val = getGen;
		    
		    var bonusTotal = Math.floor(base * (val / 100));
		    var total = Math.floor(base + bonusTotal);
		
		    if (val > 0) {
		        $(this).html(base.toLocaleString() + '<span style="color: #ff66cc;"> +' + bonusTotal.toLocaleString() + '</span><br><b>' + total.toLocaleString() + '</b>');
		        $(this).addClass("StatModified");
		    } else {
		        $(this).text(base.toLocaleString());
		        $(this).removeClass("StatModified");
		    }
		});
		
		$(".Production").each(function() {
		    var base = parseFloat($(this).attr("data-base")) || 0;
		    var bonus = Math.round(base * (getPR / 100));
		    var total = base + bonus;
		
		    if (getPR > 0) {
		        $(this).html(base.toLocaleString() + '<span style="color: #ff66cc;"> + ' + bonus.toLocaleString() + '</span><br><b>' + total.toLocaleString() + '</b>');
		        $(this).addClass("StatModified");
		    } else {
		        $(this).text(base.toLocaleString());
		        $(this).removeClass("StatModified");
		    }
		});
    });
});
    

    /* 4. BOUTON RESET */
	$("#resetBonusButton").click(function() {
	    $("#IDInputUpgrade, #IDInputVitesse, #IDInputSanté, #IDInputDégâts, #IDInputDégâtsCano, #IDInputCanoReduc, #IDInputDurée, #IDInputSoin, #IDInputGénération, #IDInputProduction").val(0);
	
	    $("#IDInputOrdreBataille, #IDInputAdrenaline, #IDInputArtilleur, #IDInputAmpli1, #IDInputAmpli2, #IDInputAmpli3").val("0");
	
	    $(".Santé, .TD, .TDA, .TS, .AD, .BDA, .BD, .BH, .Duration, .Soin, .Gen, .Production").each(function() {
	        var baseStat = $(this).attr("data-base");
	        if (baseStat) {
	            var unit = $(this).hasClass("Duration") ? " sec" : ($(this).hasClass("Soin") ? " PV" : "");
	            $(this).text(parseFloat(baseStat).toLocaleString() + unit);
	        }
	        $(this).removeClass("StatModified");
	    });
	
	    $(".StatueStat.Temps, .StatueStat.Instant").each(function() {
	        var base = $(this).attr("data-minutes");
	        if (base) {
	            if ($(this).hasClass("Temps")) {
	                $(this).text(formatTime(parseInt(base)));
	            } else {
	                $(this).text(parseInt(base).toLocaleString());
	            }
	        }
	        $(this).removeClass("StatModified");
	    });
		
	    calculerCumul();
	});