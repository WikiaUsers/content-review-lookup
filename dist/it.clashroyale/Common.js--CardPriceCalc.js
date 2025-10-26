$(document).ready(function() {
    // Aggiungi elementi
    $('table#cardPricesCalc td#cardPricesCalcRarity').html('<select id="cpcRarity" name="cpcRarity"><option value="Common" selected>Common</option><option value="Rare">Rare</option><option value="Epic">Epic</option><option value="Legendary">Legendary</option></select>');
    $('table#cardPricesCalc td#cardPricesCalcNum').html('<input type="number" id="cpcNum" name="cpcNum" value="1" min="0" max="100" step="1" style="width: 30px;">');
    // Calcolatore
    $('table#cardPricesCalc input, table#cardPricesCalc select').change(function() {
        var cardRarity = $("table#cardPricesCalc select#cpcRarity").val();
        var rarityFactor;
        switch(cardRarity) {
            case "Common":
                rarityFactor = 2;
                $("input#cpcNum").attr("max", "100");
                if ($("input#cpcNum").val() > 100) {
                    $("input#cpcNum").val("100");
                } else if ($("input#cpcNum").val() < 0) {
                    $("input#cpcNum").val("0");
                }
                break;
            case "Rare":
                rarityFactor = 20;
                $("input#cpcNum").attr("max", "50");
                if ($("input#cpcNum").val() > 50) {
                    $("input#cpcNum").val("50");
                } else if ($("input#cpcNum").val() < 0) {
                    $("input#cpcNum").val("0");
                }
                break;
            case "Epic":
                rarityFactor = 1000;
                $("input#cpcNum").attr("max", "10");
                if ($("input#cpcNum").val() > 10) {
                    $("input#cpcNum").val("10");
                } else if ($("input#cpcNum").val() < 0) {
                    $("input#cpcNum").val("0");
                }
                break;
            case "Legendary":
                rarityFactor = 40000;
                $("input#cpcNum").attr("max", "3");
                if ($("input#cpcNum").val() > 3) {
                    $("input#cpcNum").val("3");
                } else if ($("input#cpcNum").val() < 0) {
                    $("input#cpcNum").val("0");
                }
                break;
            default:
                rarityFactor = 2;
        }
        var cardNum = $("table#cardPricesCalc input#cpcNum").val() * 1;
        var cpcResult = rarityFactor * ((cardNum * (cardNum + 1)) / 2);
        $("table#cardPricesCalc td#cardPricesCalcResult").text(cpcResult.format("#,##0"));
    });
    $('table#cardPricesCalc input, table#cardPricesCalc select').change();
});