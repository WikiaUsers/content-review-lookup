/* Будь-який JavaScript тут завантажуватиметься для всіх користувачів під час кожного завантаження сторінки. */
// Шаблон: StatueStatsForm

$(document).ready(function() {
	/* Функція округлення числа до певної цифри. */
	function roundNum(digit, num) {
	    return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
	}
    /* Створіть вхідні дані */
    $("span#bonusInputBHHarness").html('<input type="text" value="0" id="bonusInputBH" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputDBDHarness").html('<input type="text" value="0" id="bonusInputDBD" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputGBEHarness").html('<input type="text" value="0" id="bonusInputGBE" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputRPHarness").html('<input type="text" value="0" id="bonusInputRP" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputRRHarness").html('<input type="text" value="0" id="bonusInputRR" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputTDHarness").html('<input type="text" value="0" id="bonusInputTD" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#bonusInputTHHarness").html('<input type="text" value="0" id="bonusInputTH" class="bonusInput" style="text-align: right; width: 40px;"></input>');
    $("span#ampOptionsHarness").html('<div id="ampOptions"> <div id="ampOptionsInner"> <div id="numOfAmpsOption"> Кількість підсилювачів шкоди, що впливають на захист: <select name="numOfAmps" id="numOfAmps"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> </div> <div id="firstAmpOption" style="display: none;"> <span id="firstAmpFirstWord" style="display: none;">First </span>Знак пошкодження\ підсилювача: <select name="firstAmp" id="firstAmp"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> <div id="secondAmpOption" style="display: none;"> Знак другого\ підсилювача пошкоджень: <select name="secondAmp" id="secondAmp"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> <div id="thirdAmpOption" style="display: none;"> Знак третього\ підсилювача пошкоджень: <select name="thirdAmp" id="thirdAmp"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> <div id="fourthAmpOption" style="display: none;"> Знак четвертого\ підсилювача пошкоджень: <select name="fourthAmp" id="fourthAmp"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> </div> </div> <center> <span id="showAmpOptions" class="ampOptionsTrigger">Показати параметри підсилювача пошкоджень</span> <span id="hideAmpOptions" class="ampOptionsTrigger ampOptionsTriggerHidden">Приховати параметри підсилювача пошкоджень</span> </center>');
    $("span#generatorOptionsHarness").html('<div id="generatorOptions"> <div id="generatorOptionsInner"> <div id="numOfGeneratorsOption"> Кількість генераторів щитів на базі: <select name="numOfGenerators" id="numOfGenerators"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> </div> <div id="firstGeneratorOption" style="display: none;"> <span id="firstGeneratorFirstWord" style="display: none;">First </span>Знак\ генератора щитів: <select name="firstGenerator" id="firstGenerator"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> <div id="secondGeneratorOption" style="display: none;"> Знак\ генератора другого щита: <select name="secondGenerator" id="secondGenerator"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> <div id="thirdGeneratorOption" style="display: none;"> Знак генератора\ третього щита: <select name="thirdGenerator" id="thirdGenerator"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> <div id="fourthGeneratorOption" style="display: none;"> Знак генератора\ четвертого щита: <select name="fourthGenerator" id="fourthGenerator"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div> </div> </div> <center> <span id="showGeneratorOptions" class="generatorOptionsTrigger">Показати параметри генератора щитів</span> <span id="hideGeneratorOptions" class="generatorOptionsTrigger generatorOptionsTriggerHidden">Приховати параметри генератора щитів</span> </center>');
    /* Видалити поле з автоматично створеного елемента p */
    $("span#ampOptionsHarness").parent("p").css({"margin": "0"});
    /* Get the initial cell values, remove commas, and 
       set the cell's title attribute to its original value. */
   $(".StatueStat").each(function() {
      var initialValue = $(this).text().replace(/,/g, "") * 1;
      $(this).attr("title", initialValue);
   });
   // When Submit button is pressed...
   $("#changeBonusButton").click(function() {
       // Change its text to "Update"
      $("#changeBonusButton").text("Оновити");
      // Get each input
      var getInputGBE = $("#bonusInputGBE").val() * 1;
      var getInputTH = $("#bonusInputTH").val() * 1;
      var getInputTD = $("#bonusInputTD").val() * 1;
      var getInputBH = $("#bonusInputBH").val() * 1;
      var getInputDBD = $("#bonusInputDBD").val() * 1;
      var getInputRP = $("#bonusInputRP").val() * 1;
      var getInputRR = $("#bonusInputRR").val() * 1;
      // Do the math and give each cell its new value
      // If cell values change, add styling to them
      $(".GBE").each(function() {
         var cellValueGBE = $(this).attr("title") * 1;
         var calcNewGBE = Math.ceil(roundNum(1,cellValueGBE * (1 + (getInputGBE / 100))));
         $(this).text(calcNewGBE.format("#,##0[.]###"));
        if (calcNewGBE === cellValueGBE) {
            $(".GBE").removeClass("StatModified");
        } else {
            $(".GBE").addClass("StatModified");
        }
      });
      $(".TH").each(function() {
         var cellValueTH = $(this).attr("title") * 1;
         var calcNewTH = Math.round(cellValueTH * (1 + (getInputTH / 100)));
         $(this).text(calcNewTH.format("#,##0[.]###"));
        if (calcNewTH === cellValueTH) {
            $(".TH").removeClass("StatModified");
        } else {
            $(".TH").addClass("StatModified");
        }
      });
      $(".TD").each(function() {
         var cellValueTD = $(this).attr("title") * 1;
         var calcNewTD = roundNum(2, cellValueTD * (1 + (getInputTD / 100)));
         $(this).text(calcNewTD.format("#,##0[.]###"));
        if (calcNewTD === cellValueTD) {
            $(".TD").removeClass("StatModified");
        } else {
            $(".TD").addClass("StatModified");
        }
      });
      $(".BH").each(function() {
        var cellValueBH = $(this).attr("title") * 1;
        var calcBoostedBH = Math.round(cellValueBH * (1 + (getInputBH / 100)));
        var firstGenerator = $("#firstGenerator").val() * 1;
        var secondGenerator = $("#secondGenerator").val() * 1;
        var thirdGenerator = $("#thirdGenerator").val() * 1;
        var fourthGenerator = $("#fourthGenerator").val() * 1;
        if ($("select#numOfGenerators").val() == 4) {
            var shieldBonusAmount = (calcBoostedBH * ((firstGenerator * 50) / 100)) + (calcBoostedBH * ((secondGenerator * 50) / 100)) + (calcBoostedBH * ((thirdGenerator * 50) / 100)) + (calcBoostedBH * ((fourthGenerator * 50) / 100));
        } else if ($("select#numOfGenerators").val() == 3) {
            var shieldBonusAmount = (calcBoostedBH * ((firstGenerator * 50) / 100)) + (calcBoostedBH * ((secondGenerator * 50) / 100)) + (calcBoostedBH * ((thirdGenerator * 50) / 100));
        } else if ($("select#numOfGenerators").val() == 2) {
            var shieldBonusAmount = (calcBoostedBH * ((firstGenerator * 50) / 100)) + (calcBoostedBH * ((secondGenerator * 50) / 100));
        } else if ($("select#numOfGenerators").val() == 1) {
            var shieldBonusAmount = (calcBoostedBH * ((firstGenerator * 50) / 100));
        } else {
            var shieldBonusAmount = 0;
        }
        var calcNewBH = Math.round((cellValueBH * (1 + (getInputBH / 100))) + shieldBonusAmount);
        $(this).text(calcNewBH.format("#,##0[.]###"));
        if (calcNewBH === cellValueBH) {
            $(".BH").removeClass("StatModified");
        } else {
            $(".BH").addClass("StatModified");
        }
        if (shieldBonusAmount > 0) {
            $(".BH").addClass("StatModifiedShield");
        } else {
            $(".BH").removeClass("StatModifiedShield");
        }
      });
      $(".DBD").each(function() {
        var cellValueDBD = $(this).attr("title") * 1;
        var firstAmp = $("#firstAmp").val() * 1;
        var secondAmp = $("#secondAmp").val() * 1;
        var thirdAmp = $("#thirdAmp").val() * 1;
        var fourthAmp = $("#fourthAmp").val() * 1;
        if ($("select#numOfAmps").val() == 4) {
            var ampBonusAmount = (cellValueDBD * (((firstAmp * 25) + 25) / 100)) + (cellValueDBD * (((secondAmp * 25) + 25) / 100)) + (cellValueDBD * (((thirdAmp * 25) + 25) / 100)) + (cellValueDBD * (((fourthAmp * 25) + 25) / 100));
        } else if ($("select#numOfAmps").val() == 3) {
            var ampBonusAmount = (cellValueDBD * (((firstAmp * 25) + 25) / 100)) + (cellValueDBD * (((secondAmp * 25) + 25) / 100)) + (cellValueDBD * (((thirdAmp * 25) + 25) / 100));
        } else if ($("select#numOfAmps").val() == 2) {
            var ampBonusAmount = (cellValueDBD * (((firstAmp * 25) + 25) / 100)) + (cellValueDBD * (((secondAmp * 25) + 25) / 100));
        } else if ($("select#numOfAmps").val() == 1) {
            var ampBonusAmount = (cellValueDBD * (((firstAmp * 25) + 25) / 100));
        } else {
            var ampBonusAmount = 0;
        }
        var calcNewDBD = roundNum(2, (cellValueDBD * (1 + (getInputDBD / 100))) + ampBonusAmount);
        $(this).text(calcNewDBD.format("#,##0[.]###"));
        if (calcNewDBD === cellValueDBD) {
            $(".DBD").removeClass("StatModified");
        } else {
            $(".DBD").addClass("StatModified");
        }
        if (ampBonusAmount > 0) {
            $(this).addClass("StatModifiedAmp");
        } else {
            $(this).removeClass("StatModifiedAmp");
        }
      });
      $(".RP").each(function() {
         var cellValueRP = $(this).attr("title") * 1;
         var calcNewRP = Math.round(cellValueRP * (1 + (getInputRP / 100)));
         $(this).text(calcNewRP.format("#,##0[.]###"));
        if (calcNewRP === cellValueRP) {
            $(".RP").removeClass("StatModified");
        } else {
            $(".RP").addClass("StatModified");
        }
      });
      $(".RR").each(function() {
         var cellValueRR = $(this).attr("title") * 1;
         var calcNewRR = Math.round(cellValueRR * (1 + (getInputRR / 100)));
         $(this).text(calcNewRR.format("#,##0[.]###"));
        if (calcNewRR === cellValueRR) {
            $(".RR").removeClass("StatModified");
        } else {
            $(".RR").addClass("StatModified");
        }
      });
    });
    // Показати перемикач параметрів підсилювача пошкоджень/генератора щитів
    $(".ampOptionsTrigger").click(function() {
        $(".ampOptionsTrigger").toggleClass("ampOptionsTriggerHidden");
        $("#ampOptions").slideToggle("1000");
    });
    $(".generatorOptionsTrigger").click(function() {
        $(".generatorOptionsTrigger").toggleClass("generatorOptionsTriggerHidden");
        $("#generatorOptions").slideToggle("1000");
    });
    /* Показати або приховати різні частини параметрів підсилювача/генератора залежно від значення першого спадного меню */
    $("#numOfAmps").change(function() {
        if ($("select#numOfAmps").val() == 4) {
            $("#firstAmpOption").css("display", "block");
            $("#secondAmpOption").css("display", "block");
            $("#thirdAmpOption").css("display", "block");
            $("#fourthAmpOption").css("display", "block");
            $("#firstAmpFirstWord").css("display", "inline");
        } else if ($("select#numOfAmps").val() == 3) {
            $("#firstAmpOption").css("display", "block");
            $("#secondAmpOption").css("display", "block");
            $("#thirdAmpOption").css("display", "block");
            $("#fourthAmpOption").css("display", "none");
            $("#firstAmpFirstWord").css("display", "inline");
        } else if ($("select#numOfAmps").val() == 2) {
            $("#firstAmpOption").css("display", "block");
            $("#secondAmpOption").css("display", "block");
            $("#thirdAmpOption").css("display", "none");
            $("#fourthAmpOption").css("display", "none");
            $("#firstAmpFirstWord").css("display", "inline");
        } else if ($("select#numOfAmps").val() == 1) {
            $("#firstAmpOption").css("display", "block");
            $("#secondAmpOption").css("display", "none");
            $("#thirdAmpOption").css("display", "none");
            $("#fourthAmpOption").css("display", "none");
            $("#firstAmpFirstWord").css("display", "none");
        } else {
            $("#firstAmpOption").css("display", "none");
            $("#secondAmpOption").css("display", "none");
            $("#thirdAmpOption").css("display", "none");
            $("#fourthAmpOption").css("display", "none");
            $("#firstAmpFirstWord").css("display", "none");
        }
    });
    $("#numOfGenerators").change(function() {
        if ($("select#numOfGenerators").val() == 4) {
            $("#firstGeneratorOption").css("display", "block");
            $("#secondGeneratorOption").css("display", "block");
            $("#thirdGeneratorOption").css("display", "block");
            $("#fourthGeneratorOption").css("display", "block");
            $("#firstGeneratorFirstWord").css("display", "inline");
        } else if ($("select#numOfGenerators").val() == 3) {
            $("#firstGeneratorOption").css("display", "block");
            $("#secondGeneratorOption").css("display", "block");
            $("#thirdGeneratorOption").css("display", "block");
            $("#fourthGeneratorOption").css("display", "none");
            $("#firstGeneratorFirstWord").css("display", "inline");
        } else if ($("select#numOfGenerators").val() == 2) {
            $("#firstGeneratorOption").css("display", "block");
            $("#secondGeneratorOption").css("display", "block");
            $("#thirdGeneratorOption").css("display", "none");
            $("#fourthGeneratorOption").css("display", "none");
            $("#firstGeneratorFirstWord").css("display", "inline");
        } else if ($("select#numOfGenerators").val() == 1) {
            $("#firstGeneratorOption").css("display", "block");
            $("#secondGeneratorOption").css("display", "none");
            $("#thirdGeneratorOption").css("display", "none");
            $("#fourthGeneratorOption").css("display", "none");
            $("#firstGeneratorFirstWord").css("display", "none");
        } else {
            $("#firstGeneratorOption").css("display", "none");
            $("#secondGeneratorOption").css("display", "none");
            $("#thirdGeneratorOption").css("display", "none");
            $("#fourthGeneratorOption").css("display", "none");
            $("#firstGeneratorFirstWord").css("display", "none");
        }
    });
    // Форма скидання при натисканні кнопки скидання
    $("#resetBonusButton").click(function() {
        $(".bonusInput").attr("value", "0");
        $("#changeBonusButton").text("Apply");
        $("#numOfAmps, #numOfGenerators").val("0").change();
        $(".StatueStat").each(function() {
            var returnInitial = $(this).attr("title") * 1;
            $(this).text(returnInitial.format("#,##0[.]###"));
            $(this).removeClass("StatModified");
            $(this).removeClass("StatModifiedAmp");
            $(this).removeClass("StatModifiedShield");
        });
    });
});