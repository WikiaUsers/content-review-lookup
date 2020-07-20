/******************************************************************************/
/******************Infobox tabber script by SmiledMoon. V.2.2******************/
/******************************************************************************/
$(document).ready (function() {
    var activePosition = [];
    var numberOfInfoboxCharacter = $(".ib1_infoboxCharacter").length;
    for (i=1;i<=numberOfInfoboxCharacter;i++) {
        $(".ib1_infoboxCharacter:eq("+(i-1)+")").attr("id","infoboxCharacter"+i);
        var numberOfInfButton = $("#infoboxCharacter"+i+" .infButton").length;
        var numberOfInfBlock = $("#infoboxCharacter"+i+" .infBlock").length;
        for (j=1;j<=numberOfInfButton;j++) {
            $("#infoboxCharacter"+i+" .infButton:eq("+(j-1)+")").attr("id","ibut"+i+"-"+j);
        }
        for (j=1;j<=numberOfInfBlock;j++) {
            $("#infoboxCharacter"+i+" .infBlock:eq("+(j-1)+")").attr("id","iblock"+i+"-"+j);
        }
        $("[id^='infbut"+i+"'][id!='infbut"+i+"-1']").addClass("butunhold");
        $("#infbut"+i+"-1").addClass("buthold");
        activePosition.push(1);
    }
    $("[id^='ibut']").click(function(event) {
        var n = event.target.id.match(/(\d+)-/);
        var k = event.target.id.match(/-(\d+)/);
        $("#ibut"+n[1]+k[0]).addClass("buthold").removeClass("butunhold");
        $("#ibut"+n[0]+activePosition[n[1]-1]).addClass("butunhold").removeClass("buthold");
        $("#iblock"+n[0]+activePosition[n[1]-1]).hide();
        $("#iblock"+n[1]+k[0]).show();
        activePosition[n[1]-1] = +k[1];
    });
});