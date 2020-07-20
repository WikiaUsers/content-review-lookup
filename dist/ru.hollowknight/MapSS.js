mw.hook('wikipage.content').add(function() {
    
    /* map map */
    if ($('#noMap').length) {
        $('body').append('<div style="display:none" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
        if (!$('#noMap').is('.hiddenMap')) { //Отображает её, если требуется
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
            $('#forMap').attr({"style":"display:block"});
        }
 
        $('#forMap').on('click', function(e) { //Скрывает карту при нажатии на пустое место
            if (e.target.id == "forMap"){
                $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:none"});
                $('#forMap').attr({"style":"display:none"});
            }
        });
 
        $('#showMap').on('click', function(e){ //отображает карту при нажатии на кнопку
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
            $('#forMap').attr({"style":"display:block"});
        });
    }
 
    mw.hook('leaflet').add(function (L) {
        var map = L.map('map', { crs: L.CRS.Simple, minZoom: -2, maxZoom: 1, animate : false, center : [1400,2100] }); 
        var imageUrl = 'https://i.imgur.com/Qwjv8Nc.png'; 
        var bounds = [[0,0], [2800,4200]]; 
 
        L.imageOverlay(imageUrl, bounds).addTo(map); 
        map.fitBounds(bounds);
        L.control.mousePosition().addTo(map);
 
  /*Стили меток*/ 
        var igrub = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Grubmap.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var imask = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Maskmap.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var iamul = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Amumap.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var icorn = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Cormap.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ibench = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Bench_green.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var isly = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Sly.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var iiselda = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Iselda.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var igrubdad = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Grubfather.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ijiji = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Jiji.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var isalubra = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Salubra.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ihunter = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Hunter.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ilegeater = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Leg_Eater.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ibank = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Millibelle.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ismith = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Nailsmith.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ilemm = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Lemm.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var iseer = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Seer.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var icol = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Colosseum.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var igodseeker = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Godseeker.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ibeast = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Beast.png',
            iconSize: [36, 40],
            iconAnchor: [12, 12]
        });
        var iteacher = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Teacher.png',
            iconSize: [36, 40],
            iconAnchor: [12, 12]
        });
        var iwatcher = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Watcher.png',
            iconSize: [36, 40],
            iconAnchor: [12, 12]
        });
        var iblackegg = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Black_Egg.png',
            iconSize: [30, 36],
            iconAnchor: [12, 12]
        });
        var istag = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Stag.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var iroot = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Tree.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var idreamwar = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Warriors_Grave.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var icocoon = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Cocoon.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var ispring = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Springs.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        var itram = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Tram.png',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
 
 /*Все метки*/
     /*Метки скамеек*/
           /*тропа и сады*/
        var group1 = L.layerGroup().addTo(map);
        var benchPopup = '<a href="https://hollowknight.fandom.com/ru/wiki/Скамейка" target="_blank">Скамейка</a>';
 
        L.marker([1485.0, 911.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1444.0, 633.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1334.0, 487.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([2065.0, 1211.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1807.0, 1330.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([2048.0, 363.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1864.0, 268.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1956.0, 846.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([2044.0, 694.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
           /*глуб гнездо*/
        L.marker([1090.0, 1111.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([738.0, 1200.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([944.0, 100.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
           /*котлован*/
        L.marker([560.0, 2400.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([581.0, 3017.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);  
           /*воющие скалы*/
        L.marker([2420.0, 1171.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
           /*туманный каньон*/
        L.marker([1582.0, 1358.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
           /*грибные пустоши*/
        L.marker([1060.0, 1887.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1356.0, 1281.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1087.0, 1777.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1620.0, 1857.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
           /*город слёз*/
        L.marker([1550.0, 2213.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1405.0, 2461.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1229.0, 2251.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1261.0, 2676.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1447.0, 3062.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1143.0, 3246.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1); 
           /*кристальный пик*/
        L.marker([1958.0, 2671.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([2288.0, 2625.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);   
           /*земли упокоения*/
        L.marker([1865.0, 3471.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1954.0, 3290.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1); 
           /*край и улей*/
        L.marker([697.0, 3380.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([968.0, 4082.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1230.0, 3786.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1538.0, 3456.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
           /*перепутье*/
        L.marker([2184.0, 1788.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1907.0, 2137.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1797.0, 2460.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1538.0, 3456.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1896.0, 1933.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
        L.marker([1972.0, 1815.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1); 
           /*стоки*/
        L.marker([960.0, 2359.0], {icon: ibench}).bindPopup(benchPopup).openPopup().addTo(group1);
 
 
 
     /*Метки гусеничек*/
           /*тропа и сады*/
        var group2 = L.layerGroup().addTo(map);
        var trackPopup = '<a href="https://hollowknight.fandom.com/ru/wiki/Гусенички" target="_blank">Гусеничка</a>';
 
        L.marker([2110.0, 800.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1666.0, 271.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1785.0, 619.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1395.0, 600.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1740.0, 870.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1842.0, 1322.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1941.0, 1390.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*глуб гнездо*/
        L.marker([972.0, 70.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([857.0, 631.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([714.0, 1022.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([921.0, 1058.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1191.0, 1388.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*котлован*/
        L.marker([635.0, 1990.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([687.0, 2340.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*воющие скалы*/
        L.marker([2234.0, 1074.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*туманный каньон*/
        L.marker([1609.0, 1330.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*грибные пустоши*/
        L.marker([1285.0, 1253.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1378.0, 1656.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*город слёз*/
        L.marker([1500.0, 2281.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1310.0, 2514.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1120.0, 3037.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1083.0, 3343.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1307.0, 3370.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1307.0, 3380.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1307.0, 3390.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1374.0, 2770.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*кристальный пик*/
        L.marker([2082.0, 3082.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([2215.0, 2830.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([2210.0, 2663.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([2380.0, 3166.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([2089.0, 2718.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([2119.0, 2585.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([2167.0, 2060.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*земли упокоения*/
        L.marker([1833.0, 3312.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*край и улей*/
        L.marker([875.0, 4154.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1096.0, 3774.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([897.0, 3332.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([897.0, 3677.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*перепутье*/
        L.marker([2111.0, 2339.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1914.0, 2219.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1978.0, 2168.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([2057.0, 1852.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1888.0, 1506.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
           /*стоки*/
        L.marker([989.0, 2322.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([987.0, 3157.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
        L.marker([1046.0, 3157.0], {icon: igrub}).bindPopup(trackPopup).openPopup().addTo(group2);
 
 
 
 
     /*NPC*/
        L.marker([2183.0, 1769.0], {icon: isly}).addTo(map);
        L.marker([2183.0, 1815.0], {icon: iiselda}).addTo(map);
        L.marker([2179.0, 1971.0], {icon: ijiji}).addTo(map);
        L.marker([2103.0, 1668.0], {icon: igrubdad}).addTo(map);
        L.marker([1796.0, 2448.0], {icon: isalubra}).addTo(map);
        L.marker([1620.0, 1886.0], {icon: ilegeater}).addTo(map);
        L.marker([1875.0, 1440.0], {icon: ihunter}).addTo(map);
        L.marker([1420.0, 1200.0], {icon: ibank}).addTo(map);
        L.marker([1540.0, 3420.0], {icon: icol}).addTo(map);
        L.marker([2000.0, 3195.0], {icon: iseer}).addTo(map);
        L.marker([1140.0, 2512.0], {icon: ilemm}).addTo(map);
        L.marker([1128.0, 1956.0], {icon: ismith}).addTo(map);
        L.marker([842.0, 1877.0], {icon: igodseeker}).addTo(map);
 
     /*Грезящие*/
        L.marker([964.0, 99.0], {icon: ibeast}).addTo(map);
        L.marker([1600.0, 1372.0], {icon: iteacher}).addTo(map);
        L.marker([1700.0, 2820.0], {icon: iwatcher}).addTo(map);
        L.marker([2130.0, 2012.0], {icon: iblackegg}).addTo(map);
 
     /*Вокзалы*/
        var movePopup = '<a href="https://hollowknight.fandom.com/ru/wiki/Быстрое перемещение" target="_blank">Вокзал рогачей</a>';
 
        L.marker([1954.0, 3314.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([2184.0, 1755.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([2506.0, 980.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([2043.0, 665.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([1446.0, 603.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([581.0, 2994.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([1143.0, 3277.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([1549.0, 2244.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([1907.0, 2102.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([1355.0, 1236.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
        L.marker([1007.0, 234.0], {icon: istag}).bindPopup(movePopup).openPopup().addTo(map);
 
      /*Шепчущие корни*/
        L.marker([2120.0, 1740.0], {icon: iroot}).addTo(map);
        L.marker([2250.0, 872.0], {icon: iroot}).addTo(map);
        L.marker([1982.0, 1826.0], {icon: iroot}).addTo(map);
        L.marker([2379.0, 2963.0], {icon: iroot}).addTo(map);
        L.marker([2085.0, 3467.0], {icon: iroot}).addTo(map);
        L.marker([1950.0, 3217.0], {icon: iroot}).addTo(map);
        L.marker([718.0, 3676.0], {icon: iroot}).addTo(map);
        L.marker([1453.0, 2237.0], {icon: iroot}).addTo(map);
        L.marker([809.0, 2835.0], {icon: iroot}).addTo(map);
        L.marker([826.0, 508.0], {icon: iroot}).addTo(map);
        L.marker([1627.0, 1694.0], {icon: iroot}).addTo(map);
        L.marker([1216.0, 1646.0], {icon: iroot}).addTo(map);
        L.marker([1744.0, 689.0], {icon: iroot}).addTo(map);
        L.marker([1344.0, 943.0], {icon: iroot}).addTo(map);
        L.marker([1206.0, 3522.0], {icon: iroot}).addTo(map);
 
       /*Воины грёз*/
        L.marker([1452.0, 2034.0], {icon: idreamwar}).addTo(map);
        L.marker([1780.0, 1441.0], {icon: idreamwar}).addTo(map);
        L.marker([1441.0, 453.0], {icon: idreamwar}).addTo(map);
        L.marker([962.0, 731.0], {icon: idreamwar}).addTo(map);
        L.marker([1030.0, 3880.0], {icon: idreamwar}).addTo(map);
        L.marker([1870.0, 2932.0], {icon: idreamwar}).addTo(map);
        L.marker([2465.0, 1064.0], {icon: idreamwar}).addTo(map);
        
       /*Коконы живокрови*/
        L.marker([2232.0, 1362.0], {icon: icocoon}).addTo(map);
        L.marker([1971.0, 1842.0], {icon: icocoon}).addTo(map);
        L.marker([2127.0, 858.0], {icon: icocoon}).addTo(map);
        L.marker([1665.0, 1021.0], {icon: icocoon}).addTo(map);
        L.marker([1113.0, 826.0], {icon: icocoon}).addTo(map);
        L.marker([1008.0, 785.0], {icon: icocoon}).addTo(map);
        L.marker([1004.0, 1589.0], {icon: icocoon}).addTo(map);
        L.marker([1333.0, 3721.0], {icon: icocoon}).addTo(map);
        
       /*Горячие ключи*/
        L.marker([1897.0, 1914.0], {icon: ispring}).addTo(map);
        L.marker([739.0, 1190.0], {icon: ispring}).addTo(map);
        L.marker([1445.0, 3041.0], {icon: ispring}).addTo(map);
        L.marker([1537.0, 3441.0], {icon: ispring}).addTo(map);
        
       /*Трамваи*/
        L.marker([1883.0, 2422.0], {icon: itram}).addTo(map);
        L.marker([1883.0, 2651.0], {icon: itram}).addTo(map);
        L.marker([742.0, 2530.0], {icon: itram}).addTo(map);
        L.marker([742.0, 3047.0], {icon: itram}).addTo(map);
        L.marker([742.0, 1594.0], {icon: itram}).addTo(map);
 
 
 
                L.control.layers(null, {
            '<img height="30" width="30" src="https://hollowknight.fandom.com/wiki/special:Filepath/Map_Pin_Bench_green.png" /> Скамейки': group1,
            '<img height="30" width="30" src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Grubmap.png" /> Гусенички': group2
        }, {
            collapsed: false
        }).addTo(map);
 
 
 
 
 
 
 
    });
 
    importArticle({ type: 'script', article: 'Map.js' });
    importArticle({ type: 'style', article: 'MediaWIki:Map.css' });
});