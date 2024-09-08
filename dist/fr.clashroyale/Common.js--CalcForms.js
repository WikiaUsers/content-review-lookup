$(document).ready(function() {
    // Card Chance Calc
    $("#cardchanceincardchanceoutChest, #cardchanceincardchanceoutRarity").change(function () {
        var CChanceChest = $("#cardchanceincardchanceoutChest").val();
        var CChanceRarity = $("#cardchanceincardchanceoutRarity").val();
        if (CChanceChest === "Clan" || CChanceChest === "Classique" || CChanceChest === "Super") {
            $("#jcFormcardchancein th:contains('Palier/Nb victoires')").parent().show();
        } else {
            $("#jcFormcardchancein th:contains('Palier/Nb victoires')").parent().hide();
        }
        if (CChanceChest === "Tirage") {
            $("#jcFormcardchancein th:contains('Ligue')").parent().show();
        } else {
            $("#jcFormcardchancein th:contains('Ligue')").parent().hide();
        }
        if (CChanceChest === "Tournoi") {
            $("#jcFormcardchancein th:contains('Nombre de Cartes')").parent().show();
        } else {
            $("#jcFormcardchancein th:contains('Nombre de Cartes')").parent().hide();
        }
        if (((CChanceChest === "Clan" || CChanceChest === "Classique" || CChanceChest === "Super" || CChanceChest === "Tournoi") && (CChanceRarity !== "Légendaire")) || CChanceChest === "Tirage") {
            $("#jcFormcardchancein th:contains('Arène')").parent().hide();
        } else {
            $("#jcFormcardchancein th:contains('Arène')").parent().show();
        }
        if (CChanceChest === "Clan") {
            $("#cardchanceincardchanceoutTier option:eq(0), #cardchanceincardchanceoutTier option:eq(11), #cardchanceincardchanceoutTier option:eq(12)").prop("disabled", true).hide();
            $("#cardchanceincardchanceoutTier").val("1");
        } else {
            $("#cardchanceincardchanceoutTier option:eq(0), #cardchanceincardchanceoutTier option:eq(11), #cardchanceincardchanceoutTier option:eq(12)").prop("disabled", false).show();
        }
    });
    $("#cardchanceincardchanceoutChest, #cardchanceincardchanceoutRarity").change();
});