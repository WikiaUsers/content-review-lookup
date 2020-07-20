$(document).ready(function() {
    $(".EDPSBox input").keyup(function() {
        var MinDmg = $("#MinDmg").val();
        var MaxDmg = $("#MaxDmg").val();
        var Agi = $("#Agi").val();
        var Acc = $("#Acc").val();
        var Rel = $("#Rel").val();
        var Cap = $("#Cap").val();
        var ADMG = (parseFloat(MinDmg) + parseFloat(MaxDmg)) / 2;
        var DPM = ADMG * Cap;
        var DPMA = (DPM * Acc) / 100;
        var TTE = (1 / Agi) * Cap;
        var TTER = parseFloat(TTE) + parseFloat(Rel)
        var EDPS = DPMA / TTER;
        $("#ADMG").val(ADMG);
        $("#DPM").val(DPM);
        $("#DPMA").val(Math.round(DPMA*100)/100);
        $("#TTE").val(Math.round(TTE*100)/100);
        $("#TTER").val(Math.round(TTER*100)/100);
        $("#EDPS").val(Math.round(EDPS*100)/100);
    });
});