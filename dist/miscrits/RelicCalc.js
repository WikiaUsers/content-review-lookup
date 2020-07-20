$(".submit2").live("click", function () {
    var hp2 = Number($(".hp2").val());
    var sp2 = Number($(".sp2").val());
    var ea2 = Number($(".ea2").val());
    var pa2 = Number($(".pa2").val());
    var ed2 = Number($(".ed2").val());
    var pd2 = Number($(".pd2").val());
    var mcoincheck = document.getElementById('mcoincheck').checked;
    var fcoincheck = document.getElementById('fcoincheck').checked;
    var quartcheck = document.getElementById('quartcheck').checked;
    var airkecheck = document.getElementById('airkecheck').checked;
    var forgecheck = document.getElementById('forgecheck').checked;
    var frostcheck = document.getElementById('frostcheck').checked;
    var geotecheck = document.getElementById('geotecheck').checked;
    var calogcheck = document.getElementById('calogcheck').checked;
    var nanascheck = document.getElementById('nanascheck').checked;
    var cagedcheck = document.getElementById('cagedcheck').checked;
    var forescheck = document.getElementById('forescheck').checked;
    var volcacheck = document.getElementById('volcacheck').checked;
    var mtgemcheck = document.getElementById('mtgemcheck').checked;
    var monkmcheck = document.getElementById('monkmcheck').checked;
    var ssguacheck = document.getElementById('ssguacheck').checked;
    var junglcheck = document.getElementById('junglcheck').checked;
    var charccheck = document.getElementById('charccheck').checked;
    var monkrcheck = document.getElementById('monkrcheck').checked;
    var noxnicheck = document.getElementById('noxnicheck').checked;
    var mysticheck = document.getElementById('mysticheck').checked;
    var moonrcheck = document.getElementById('moonrcheck').checked;
    //hp,sp,ea,pa,ed,pd
    var stats = [hp2, sp2, ea2, pa2, ed2, pd2];
    var mcoin = [0, 0, 11, 11, 17, 17];
    var fcoin = [0, 0, 17, 17, 11, 11];
    var quart = [0,0,-11,-11,0,0];
    var airke = [0,0,0,0,-11,-11];
    var forge = [0,0,-11,-11,0,0];
    var frost = [0,0,0,0,-11,-11];
    var geote = [10,-5,-14,20,5,5];
    var calog = [-15,0,0,0,18,18];
    var nanas = [20,-10,20,,0-5,-5];
    var caged = [0,-20,0,0,20,15];
    var fores = [0,0,5,-5,25,-5];
    var volca = [12,0,-5,-5,12,12];
    var mtgem = [-10,15,0,-5,10,15];
    var monkm = [25,0,-10,20,-5,-5];
    var ssgua = [7,7,-15,7,7,7];
    var jungl = [7,7,7,-15,7,7];
    var charc = [0,-5,20,-14,5,5];
    var monkr = [25,0,20,-10,-5,-5];
    var noxni = [15,-10,15,15,-10,-10];
    var mysti = [-10,10,20,0,0,0];
    var moonr = [30,-15,-15,-15,10,10];

    function Add(relic, check) {
        var total = [];
        if (check === true) {
            for (var i = 0; i < stats.length; i++) {
                total.push(stats[i] + relic[i]);
            }
            stats = total;
            total = [];
        }
    }
    Add(mcoin, mcoincheck);
    Add(fcoin, fcoincheck);
    Add(quart, quartcheck);
    Add(airke, airkecheck);
    Add(forge, forgecheck);
    Add(frost, frostcheck);
    Add(geote, geotecheck);
    Add(calog, calogcheck);
    Add(nanas, nanascheck);
    Add(caged, cagedcheck);
    Add(fores, forescheck);
    Add(volca, volcacheck);
    Add(mtgem, mtgemcheck);
    Add(monkm, monkmcheck);
    Add(ssgua, ssguacheck);
    Add(jungl, junglcheck);
    Add(charc, charccheck);
    Add(monkr, monkrcheck);
    Add(noxni, noxnicheck);
    Add(mysti, mysticheck);
    Add(moonr, moonrcheck);

    var print1 = "HP is ";
    var print2 = "Speed is ";
    var print3 = "EA is ";
    var print4 = "PA is ";
    var print5 = "ED is ";
    var print6 = "PD is ";

    document.getElementById('result2').innerHTML = print1 + stats[0] + "<br />" + print2 + stats[1] + "<br />" + print3 + stats[2] + "<br />" + print4 + stats[3] + "<br />" + print5 + stats[4] + "<br />" + print6 + stats[5];

});