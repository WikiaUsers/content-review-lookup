/***Подложка для карты
 
***/
mw.hook('wikipage.content').add(function() {
    if (window.MapInvoked) {
        return;
    }
    window.MapInvoked = true;
 
    if ($('#noMap').length) {
        $('body').append('<div style="display:none" id="forMap">' + $('#noMap').wrap('<div/>').parent().html() + '</div>');
        $('#forMap #noMap').html('<div id="map1" style="width:100%;height:800px;"></div>');
 
        if (!$('#noMap').is('.hiddenMap')) {
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
            $('#forMap').attr({"style":"display:block"});
        }
 
        $('#forMap').on('click', function(e) {
            if (e.target.id == "forMap"){
                $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:none"});
                $('#forMap').attr({"style":"display:none"});
            }
        });
 
        $('#showMap').on('click', function(e) {
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
            $('#forMap').attr({"style":"display:block"});
        });
    }
    mw.hook('leaflet').add(function (L) {
/***Параметры карты
 
***/
        var imageUrl = 'https://hollowknight.fandom.com/ru/wiki/special  :Filepath/MapHKInteractiveSS.png';
        var bounds = [[0, 0], [2800, 4200]];
        var map = L.map('map1', {
            crs: L.CRS.Simple,
            minZoom: -2,
            maxZoom: 1,
            center : [1400, 2100]
        });
 
        L.imageOverlay(imageUrl, bounds).addTo(map);
        L.control.mousePosition().addTo(map);
        map.fitBounds(bounds);
 
/***Иконки
 
***/
        //три иконки с иным размером
 
        //одинаковые по размеру иконки
        var HKIcon32x32 = L.Icon.extend({
            options: {
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            }
        });
        var iFlea = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Блоха_иконка.png?width=32'}),
            iBench = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Скамейка_иконкаSS.png?width=32'}),
            iBellw = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Звонкий_путь.png?width=32'}),
            iVentr = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Артерио.png?width=32'}),
            iLocket = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Медальон_на_память.png?width=32'}),
            iSpool = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Обломок_катушки.png?width=32'}),
            iMask = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Обломок_маски.png?width=32'}),
            iMetal = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Ремесленный_металл.png?width=32'}),
            iPolip = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Сердце_полипа.png?width=32'}),
            iLife = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Плазмиум.png?width=32'}),
            iGrib = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Mushmap.png?width=32'}),
            iSholk = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Шелкоед.png?width=32'}),
            iShakra = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Шакра_иконка.png?width=32'}),
            iToolr = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Красный.png?width=32'}),
            iToolb = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Синий.png?width=32'}),
            iTooly = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Желтый.png?width=32'}),
            iPsalm1 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Псалмовый_цилиндр.png?width=32'}),
            iPsalm2 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Священный_цилиндр.png?width=32'}),
            
            iRelicScroll = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Костяной_свиток.png?width=32'}),
            iRelicWeaver = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Фигурка_Ткача.png?width=32'}),
            iRelicChoir = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Приказ_для_Хора.png?width=32'}),
            iRelicArpha = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Рунная_арфа.png?width=32'}),
            iRelicEgg = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Загадочное_яйцо.png?width=32'});
            
            //иконки умений
            iSkil1 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Шёлковое копьё.png?width=32'});
            iSkil2 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Буйство нитей.png?width=32'});
            iSkil3 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Поперечный стежок.png?width=32'});
            iSkil4 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Острожал.png?width=32'});
            iSkil5 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Ярость рун.png?width=32'});
            iSkil6 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Светлые коготки.png?width=32'});
            //иконки знаков
            iSign1 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Знак_жнец.png?width=32'});
            iSign2 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Знак_странница.png?width=32'});
            iSign3 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Знак_Зверя.png?width=32'});
            iSign4 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Архитектор.png?width=32'});
            iSign5 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Знак_Ведьмы.png?width=32'});
            iSign6 = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Шаманка.png?width=32'});
            
            
            
 
        /*** Группы (ссылки в превью маркеров)
 
        ***/

        
        
        var gTool = L.layerGroup().addTo(map), 
            gSkil = L.layerGroup().addTo(map),
            gSign = L.layerGroup().addTo(map),
            gPsalm = L.layerGroup().addTo(map),
            gRelic = L.layerGroup().addTo(map),
        	gBench = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Скамейка (Silksong)" target="_blank">Скамейка</a>').addTo(map),
            gFlea = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Блохи" target="_blank">Блоха</a>').addTo(map),
            gBellw = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Звонкий_путь" target="_blank">Звонкий путь</a>').addTo(map),
            gVentr = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Артерио" target="_blank">Артерио</a>').addTo(map),
            gLocket = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Медальон_на_память" target="_blank">Медальон на память</a>').addTo(map),
            gSpool = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Обломок_катушки" target="_blank">Обломок катушки</a>').addTo(map),
            gMask = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Обломок_маски" target="_blank">Обломок маски</a>').addTo(map),
            gMetal = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Ремесленный_металл" target="_blank">Ремесленный металл</a>').addTo(map),
            gPolip = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Сердце_полипа" target="_blank">Сердце полипа</a>').addTo(map);
            gLife = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Плазмиум" target="_blank">Плазмиум</a>').addTo(map);
            gGrib = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Господин Гриб" target="_blank">Господин Гриб</a>').addTo(map);
            gSholk = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Шелкоед" target="_blank">Шелкоед</a>').addTo(map);
            gShakra = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Шакра" target="_blank">Шакра</a>').addTo(map);
 
 //Инструменты
        function mTool() {
            L.marker([828.0, 1749.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Прямая булавка">Прямая булавка</a>').openPopup().addTo(gTool);
            L.marker([1283.0, 3283.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Тройная булавка">Тройная булавка</a>').openPopup().addTo(gTool);
            L.marker([690.0, 2315.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Осколок жала">Осколок жала</a>').openPopup().addTo(gTool);
            L.marker([1423.0, 2863.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Колючки">Колючки</a>').openPopup().addTo(gTool);
            L.marker([1122.0, 1659.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Длинная булавка">Длинная булавка</a>').openPopup().addTo(gTool);
            L.marker([994.0, 2309.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Загнутый коготь">Загнутый коготь</a>').openPopup().addTo(gTool);
            L.marker([2004.0, 3819.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Метательное кольцо">Метательное кольцо</a>').openPopup().addTo(gTool);
            L.marker([1301.0, 1962.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Бумдушка">Бумдушка</a>').openPopup().addTo(gTool);
            L.marker([1821.0, 330.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Ракушечный резак">Ракушечный резак</a>').openPopup().addTo(gTool);
            L.marker([2419.0, 909.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Шёлкострел">Шёлкострел Фей</a>').openPopup().addTo(gTool);
            L.marker([690.0, 2309.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Шёлкострел">Шёлкострел Кузни</a>').openPopup().addTo(gTool);
            L.marker([1648.0, 2168.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Шёлкострел">Шёлкострел Архитектора</a>').openPopup().addTo(gTool);
            L.marker([1405.0, 1659.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Бур копателя">Бур копателя</a>').openPopup().addTo(gTool);
            L.marker([1648.0, 2170.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Заводное колесо">Заводное колесо</a>').openPopup().addTo(gTool);
            L.marker([2280.0, 1870.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Заводная муха">Заводная муха</a>').openPopup().addTo(gTool);
            L.marker([2158.0, 1874.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Бусинная пушка">Бусинная пушка</a>').openPopup().addTo(gTool);
            L.marker([692.0, 2546.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Кремнёвая пластина">Кремнёвая пластина</a>').openPopup().addTo(gTool);
            L.marker([646.0, 1100.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Установщик ловушек">Установщик ловушек</a>').openPopup().addTo(gTool);
            L.marker([1093.0, 1989.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Блошиный отвар">Блошиный отвар</a>').openPopup().addTo(gTool);
            L.marker([1014.0, 478.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Сосуд с плазмиумом">Сосуд с плазмиумом</a>').openPopup().addTo(gTool);
            L.marker([2292.0, 2475.0], {icon: iToolr, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Вольт-шары">Вольт-шары</a>').openPopup().addTo(gTool);
            
            L.marker([935.0, 1160.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Око друида">Око друида</a>').openPopup().addTo(gTool);
            L.marker([690.0, 2311.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Магмовый колокольчик">Магмовый колокольчик</a>').openPopup().addTo(gTool);
            L.marker([699.0, 2815.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Охранный колокольчик">Охранный колокольчик</a>').openPopup().addTo(gTool);
            L.marker([1153.0, 1334.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Полиповый мешочек">Полиповый мешочек</a>').openPopup().addTo(gTool);
            L.marker([994.0, 2311.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Потрескавшаяся маска">Потрескавшаяся маска</a>').openPopup().addTo(gTool);
            L.marker([1092.0, 1763.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Мультисвязыватель">Мультисвязыватель</a>').openPopup().addTo(gTool);
            L.marker([585.0, 690.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Ткачесвет">Ткачесвет</a>').openPopup().addTo(gTool);
            L.marker([1648.0, 2172.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Зубчатый обод">Зубчатый обод</a>').openPopup().addTo(gTool);
            L.marker([1776.0, 2155.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Инъекторная повязка">Инъекторная повязка</a>').openPopup().addTo(gTool);
            L.marker([2099.0, 2573.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Удлинитель катушки">Удлинитель катушки</a>').openPopup().addTo(gTool);
            L.marker([2182.0, 2008.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Резерв для связывания">Резерв для связывания</a>').openPopup().addTo(gTool);
            L.marker([1883.0, 2408.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Когтистое зеркало">Когтистое зеркало</a>').openPopup().addTo(gTool);
            L.marker([1950.0, 410.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Кристалл памяти">Кристалл памяти</a>').openPopup().addTo(gTool);
            L.marker([1573.0, 625.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Доставатель">Доставатель</a>').openPopup().addTo(gTool);
            L.marker([1843.0, 688.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Вольт-жила">Вольт-жила</a>').openPopup().addTo(gTool);
            L.marker([1808.0, 3162.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Быстрая праща">Быстрая праща</a>').openPopup().addTo(gTool);
            L.marker([2117.0, 3370.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Венец чистоты">Венец чистоты</a>').openPopup().addTo(gTool);
            L.marker([2054.0, 2981.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Длинный коготь">Длинный коготь</a>').openPopup().addTo(gTool);
            L.marker([1407.0, 1749.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Трутовый фонарь">Трутовый фонарь</a>').openPopup().addTo(gTool);
            L.marker([2068.0, 3617.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Яйцо Блохалии">Яйцо Блохалии</a>').openPopup().addTo(gTool);
            L.marker([2261.0, 905.0], {icon: iToolb, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Значок с булавкой">Значок с булавкой</a>').openPopup().addTo(gTool);
            
            L.marker([837.0, 1336.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Осколочная подвеска">Осколочная подвеска</a>').openPopup().addTo(gTool);
            L.marker([753.0, 977.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Магнетитовая брошь">Магнетитовая брошь</a>').openPopup().addTo(gTool);
            L.marker([875.0, 2975.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Увесистая обвязка">Увесистая обвязка</a>').openPopup().addTo(gTool);
            L.marker([1275.0, 2918.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Колючий браслет">Колючий браслет</a>').openPopup().addTo(gTool);
            L.marker([1020.0, 675.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Кошелёк мёртвого жука">Кошелёк мёртвого жука</a>').openPopup().addTo(gTool);
            L.marker([1492.0, 486.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Магнетитовые кубики">Магнетитовые кубики</a>').openPopup().addTo(gTool);
            L.marker([1648.0, 2170.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Панцирный корсет">Панцирный корсет</a>').openPopup().addTo(gTool);
            L.marker([2099.0, 2575.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Зацеп скалолаза">Зацеп скалолаза</a>').openPopup().addTo(gTool);
            L.marker([2099.0, 2577.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Паучьи струны">Паучьи струны</a>').openPopup().addTo(gTool);
            L.marker([650.0, 3745.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Скорошёлковые анклеты">Скорошёлковые анклеты</a>').openPopup().addTo(gTool);
            L.marker([1573.0, 627.0], {icon: iTooly, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Метка вора">Метка вора</a>').openPopup().addTo(gTool);
        }
 
 
 //Умения 
 function mSkil() {
            L.marker([954.0, 1007.0], {icon: iSkil1, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Шёлковое_копьё">Шёлковое копьё</a>').openPopup().addTo(gSkil);
            L.marker([1362.0, 3232.0], {icon: iSkil2, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Буйство_нитей">Буйство_нитей</a>').openPopup().addTo(gSkil);
            L.marker([1547.0, 2671.0], {icon: iSkil3, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Поперечный_стежок">Поперечный стежок</a>').openPopup().addTo(gSkil);
            L.marker([930.0, 75.0], {icon: iSkil4, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Острожал">Острожал</a>').openPopup().addTo(gSkil);
            L.marker([1866.0, 1240.0], {icon: iSkil5, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Ярость_рун">Ярость рун</a>').openPopup().addTo(gSkil);
            L.marker([2664.0, 2102.0], {icon: iSkil6, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Светлые_коготки">Светлые коготки</a>').openPopup().addTo(gSkil);
 }
 
 
  function mSign() {
 L.marker([1174.0, 1998.0], {icon: iSign1, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Знаки">Знак Жнеца</a>').openPopup().addTo(gSign);
 L.marker([737.0, 437.0], {icon: iSign2, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Знаки">Знак Странницы</a>').openPopup().addTo(gSign);
 L.marker([926.0, 2733.0], {icon: iSign3, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Знаки">Знак Зверя</a>').openPopup().addTo(gSign);
 L.marker([1661.0, 2141.0], {icon: iSign4, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Знаки">Знак Архитектора</a>').openPopup().addTo(gSign);
 L.marker([1241.0, 1953.0], {icon: iSign5, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Знаки">Знак Ведьмы</a>').openPopup().addTo(gSign);
 L.marker([728.0, 657.0], {icon: iSign6, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Знаки">Знак Шаманки</a>').openPopup().addTo(gSign);
  }
 
  //Псалмовые цилиндры
        function mPsalm() {
            L.marker([1692.0, 1784.0], {icon: iPsalm1, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Псалмовый цилиндр">Псалмовый цилиндр</a>').openPopup().addTo(gPsalm);
            L.marker([2221.0, 1897.0], {icon: iPsalm1, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Псалмовый цилиндр">Псалмовый цилиндр</a>').openPopup().addTo(gPsalm);
            L.marker([2049.0, 2679.0], {icon: iPsalm1, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Псалмовый цилиндр">Псалмовый цилиндр</a>').openPopup().addTo(gPsalm);
            L.marker([2001.0, 2762.0], {icon: iPsalm1, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Псалмовый цилиндр">Псалмовый цилиндр</a>').openPopup().addTo(gPsalm);
            L.marker([1572.0, 624.0], {icon: iPsalm1, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Псалмовый цилиндр">Псалмовый цилиндр</a>').openPopup().addTo(gPsalm);
            L.marker([1838.0, 2672.0], {icon: iPsalm2, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Священный цилиндр">Священный цилиндр</a>').openPopup().addTo(gPsalm);
 
        }
 
 //Реликвии
        function mRelic() {
            L.marker([679.0, 3263.0], {icon: iRelicScroll, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Костяной свиток">Костяной свиток</a>').openPopup().addTo(gRelic);
            L.marker([1159.0, 2711.0], {icon: iRelicScroll, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Костяной свиток">Костяной свиток</a>').openPopup().addTo(gRelic);
            L.marker([1543.0, 1518.0], {icon: iRelicScroll, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Костяной свиток">Костяной свиток</a>').openPopup().addTo(gRelic);
            L.marker([1487.0, 2245.0], {icon: iRelicScroll, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Костяной свиток">Костяной свиток</a>').openPopup().addTo(gRelic);
            
            L.marker([821.0, 798.0], {icon: iRelicWeaver, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Фигурка Ткача">Фигурка Ткача</a>').openPopup().addTo(gRelic);
            L.marker([1064.0, 1612.0], {icon: iRelicWeaver, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Фигурка Ткача">Фигурка Ткача</a>').openPopup().addTo(gRelic);
            L.marker([1839.0, 1281.0], {icon: iRelicWeaver, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Фигурка Ткача">Фигурка Ткача</a>').openPopup().addTo(gRelic);
            
            L.marker([934.0, 875.0], {icon: iRelicChoir, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Приказ для Хора">Приказ для Хора</a>').openPopup().addTo(gRelic);
            L.marker([1793.0, 1793.0], {icon: iRelicChoir, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Приказ для Хора">Приказ для Хора</a>').openPopup().addTo(gRelic);
            L.marker([2098.0, 2578.0], {icon: iRelicChoir, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Приказ для Хора">Приказ для Хора</a>').openPopup().addTo(gRelic);
            L.marker([1824.0, 2173.0], {icon: iRelicChoir, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Приказ для Хора">Приказ для Хора</a>').openPopup().addTo(gRelic);
            
            L.marker([672.0, 1253.0], {icon: iRelicArpha, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Рунная арфа">Рунная арфа</a>').openPopup().addTo(gRelic);
            L.marker([618.0, 3657.0], {icon: iRelicArpha, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Рунная арфа">Рунная арфа</a>').openPopup().addTo(gRelic);
            L.marker([2156.0, 1683.0], {icon: iRelicArpha, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Рунная арфа">Рунная арфа</a>').openPopup().addTo(gRelic);
            
            L.marker([208.0, 1964.0], {icon: iRelicEgg, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/  Загадочное яйцо">Загадочное яйцо</a>').openPopup().addTo(gRelic);
        }
 
        /***Метки***/
        mSign();
        mTool();
        mSkil();
        mPsalm();
        mRelic();
        mBench();
        mFlea();
        mBellw();
        mVentr();
        mLocket();
        mSpool();
        mMask();
        mMetal();
        mPolip();
        mLife();
        mGrib();
        mSholk();
        mShakra();
 
        /***Координаты меток и прямые ссылки одиночных***/
 
        //Скамейки
        function mBench() {
            L.marker([1013.0, 475.0], {icon: iBench}).addTo(gBench);
            L.marker([723.0, 658.0], {icon: iBench}).addTo(gBench);
            L.marker([711.0, 758.0], {icon: iBench}).addTo(gBench);
            L.marker([752.0, 918.0], {icon: iBench}).addTo(gBench);
            L.marker([588.0, 1071.0], {icon: iBench}).addTo(gBench);
            L.marker([1106.0, 905.0], {icon: iBench}).addTo(gBench);
            L.marker([991.0, 1220.0], {icon: iBench}).addTo(gBench);
            L.marker([932.0, 1133.0], {icon: iBench}).addTo(gBench);
            L.marker([880.0, 1068.0], {icon: iBench}).addTo(gBench);
            L.marker([902.0, 1335.0], {icon: iBench}).addTo(gBench);
            L.marker([751.0, 1293.0], {icon: iBench}).addTo(gBench);
            L.marker([811.0, 1440.0], {icon: iBench}).addTo(gBench);
            L.marker([827.0, 1751.0], {icon: iBench}).addTo(gBench);
            L.marker([1230.0, 1044.0], {icon: iBench}).addTo(gBench);
            L.marker([1191.0, 1501.0], {icon: iBench}).addTo(gBench);
            L.marker([1281.0, 742.0], {icon: iBench}).addTo(gBench);
            L.marker([1425.0, 365.0], {icon: iBench}).addTo(gBench);
            L.marker([1513.0, 780.0], {icon: iBench}).addTo(gBench);
            L.marker([1598.0, 1141.0], {icon: iBench}).addTo(gBench);
            L.marker([1713.0, 1175.0], {icon: iBench}).addTo(gBench);
            L.marker([1817.0, 330.0], {icon: iBench}).addTo(gBench);
            L.marker([1980.0, 280.0], {icon: iBench}).addTo(gBench);
            L.marker([1887.0, 853.0], {icon: iBench}).addTo(gBench);
            L.marker([2164.0, 876.0], {icon: iBench}).addTo(gBench);
            L.marker([2418.0, 909.0], {icon: iBench}).addTo(gBench);
            L.marker([1889.0, 1105.0], {icon: iBench}).addTo(gBench);
            L.marker([2040.0, 1205.0], {icon: iBench}).addTo(gBench);
            L.marker([2121.0, 1072.0], {icon: iBench}).addTo(gBench);
            L.marker([2165.0, 1009.0], {icon: iBench}).addTo(gBench);
            L.marker([1467.0, 1495.0], {icon: iBench}).addTo(gBench);
            L.marker([1094.0, 1793.0], {icon: iBench}).addTo(gBench);
            L.marker([1127.0, 1793.0], {icon: iBench}).addTo(gBench);
            L.marker([1170.0, 1793.0], {icon: iBench}).addTo(gBench);
            L.marker([301.0, 2471.0], {icon: iBench}).addTo(gBench);
            L.marker([116.0, 2020.0], {icon: iBench}).addTo(gBench);
            L.marker([384.0, 2052.0], {icon: iBench}).addTo(gBench);
            L.marker([555.0, 2063.0], {icon: iBench}).addTo(gBench);
            L.marker([560.0, 2183.0], {icon: iBench}).addTo(gBench);
            L.marker([505.0, 2467.0], {icon: iBench}).addTo(gBench);
            L.marker([689.0, 2235.0], {icon: iBench}).addTo(gBench);
            L.marker([824.0, 2094.0], {icon: iBench}).addTo(gBench);
            L.marker([734.0, 2401.0], {icon: iBench}).addTo(gBench);
            L.marker([964.0, 2430.0], {icon: iBench}).addTo(gBench);
            L.marker([828.0, 2515.0], {icon: iBench}).addTo(gBench);
            L.marker([875.0, 2976.0], {icon: iBench}).addTo(gBench);
            L.marker([764.0, 2952.0], {icon: iBench}).addTo(gBench);
            L.marker([688.0, 3141.0], {icon: iBench}).addTo(gBench);
            L.marker([654.0, 3634.0], {icon: iBench}).addTo(gBench);
            L.marker([932.0, 3694.0], {icon: iBench}).addTo(gBench);
            L.marker([1049.0, 3249.0], {icon: iBench}).addTo(gBench);
            L.marker([1206.0, 3748.0], {icon: iBench}).addTo(gBench);
            L.marker([1178.0, 3011.0], {icon: iBench}).addTo(gBench);
            L.marker([1214.0, 2954.0], {icon: iBench}).addTo(gBench);
            L.marker([1199.0, 2456.0], {icon: iBench}).addTo(gBench);
            L.marker([1096.0, 2027.0], {icon: iBench}).addTo(gBench);
            L.marker([1367.0, 2209.0], {icon: iBench}).addTo(gBench);
            L.marker([1360.0, 3167.0], {icon: iBench}).addTo(gBench);
            L.marker([1393.0, 2658.0], {icon: iBench}).addTo(gBench);
            L.marker([1548.0, 2672.0], {icon: iBench}).addTo(gBench);
            L.marker([1548.0, 2884.0], {icon: iBench}).addTo(gBench);
            L.marker([1849.0, 3442.0], {icon: iBench}).addTo(gBench);
            L.marker([1990.0, 3190.0], {icon: iBench}).addTo(gBench);
            L.marker([2054.0, 2981.0], {icon: iBench}).addTo(gBench);
            L.marker([2179.0, 3202.0], {icon: iBench}).addTo(gBench);
            L.marker([2065.0, 3615.0], {icon: iBench}).addTo(gBench);
            L.marker([1548.0, 2884.0], {icon: iBench}).addTo(gBench);
            L.marker([1645.0, 1791.0], {icon: iBench}).addTo(gBench);
            L.marker([1636.0, 2160.0], {icon: iBench}).addTo(gBench);
            L.marker([1833.0, 2778.0], {icon: iBench}).addTo(gBench);
            L.marker([2000.0, 2679.0], {icon: iBench}).addTo(gBench);
            L.marker([1850.0, 2002.0], {icon: iBench}).addTo(gBench);
            L.marker([2478.0, 2253.0], {icon: iBench}).addTo(gBench);
            L.marker([2717.0, 2093.0], {icon: iBench}).addTo(gBench);
            L.marker([2149.0, 1982.0], {icon: iBench}).addTo(gBench);
            L.marker([2088.0, 2069.0], {icon: iBench}).addTo(gBench);
            L.marker([2158.0, 2313.0], {icon: iBench}).addTo(gBench);
            L.marker([2110.0, 1580.0], {icon: iBench}).addTo(gBench);
            L.marker([1935.0, 1674.0], {icon: iBench}).addTo(gBench);
            L.marker([1739.0, 1627.0], {icon: iBench}).addTo(gBench);
            L.marker([1963.0, 1943.0], {icon: iBench}).addTo(gBench);
            L.marker([1836.0, 2405.0], {icon: iBench}).addTo(gBench);
            L.marker([2099.0, 2561.0], {icon: iBench}).addTo(gBench);
            L.marker([2099.0, 2517.0], {icon: iBench}).addTo(gBench);
        }
        
        //Блохи
        function mFlea() {
            L.marker([2147.0, 554.0], {icon: iFlea}).addTo(gFlea);
            L.marker([2018.0, 1044.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1907.0, 1104.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1708.0, 757.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1640.0, 684.0], {icon: iFlea}).addTo(gFlea);
            L.marker([2014.0, 1753.0], {icon: iFlea}).addTo(gFlea);
            L.marker([2083.0, 1844.0], {icon: iFlea}).addTo(gFlea);
            L.marker([2340.0, 2334.0], {icon: iFlea}).addTo(gFlea);
            L.marker([2022.0, 2550.0], {icon: iFlea}).addTo(gFlea);
            L.marker([2112.0, 2812.0], {icon: iFlea}).addTo(gFlea);
            L.marker([2225.0, 3189.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1944.0, 3369.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1558.0, 3258.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1580.0, 2552.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1422.0, 3064.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1521.0, 1960.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1502.0, 1727.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1225.0, 3312.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1277.0, 2638.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1278.0, 2165.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1303.0, 1720.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1166.0, 1253.0], {icon: iFlea}).addTo(gFlea);
            L.marker([926.0, 697.0], {icon: iFlea}).addTo(gFlea);
            L.marker([989.0, 1359.0], {icon: iFlea}).addTo(gFlea);
            L.marker([933.0, 1978.0], {icon: iFlea}).addTo(gFlea);
            L.marker([850.0, 2156.0], {icon: iFlea}).addTo(gFlea);
            L.marker([726.0, 1991.0], {icon: iFlea}).addTo(gFlea);
            L.marker([797.0, 2788.0], {icon: iFlea}).addTo(gFlea);
            L.marker([877.0, 3124.0], {icon: iFlea}).addTo(gFlea);
            L.marker([648.0, 2742.0], {icon: iFlea}).addTo(gFlea);
        }
        
        //Звонкие пути
        function mBellw() {
            L.marker([2178.0, 3166.0], {icon: iBellw}).addTo(gBellw);
            L.marker([1887.0, 1032.0], {icon: iBellw}).addTo(gBellw);
            L.marker([1837.0, 2377.0], {icon: iBellw}).addTo(gBellw);
            L.marker([1547.0, 2910.0], {icon: iBellw}).addTo(gBellw);
            L.marker([1511.0, 728.0], {icon: iBellw}).addTo(gBellw);
            L.marker([1230.0, 1131.0], {icon: iBellw}).addTo(gBellw);
            L.marker([1100.0, 1813.0], {icon: iBellw}).addTo(gBellw);
            L.marker([1136.0, 2406.0], {icon: iBellw}).addTo(gBellw);
            L.marker([755.0, 974.0], {icon: iBellw}).addTo(gBellw);
            L.marker([901.0, 1246.0], {icon: iBellw}).addTo(gBellw);
            L.marker([710.0, 2011.0], {icon: iBellw}).addTo(gBellw);
            L.marker([761.0, 2985.0], {icon: iBellw}).addTo(gBellw);
        }
        
       //Артерио
       function mVentr() {
           L.marker([1595.0, 2021.0], {icon: iVentr}).addTo(gVentr);
           L.marker([1844.0, 1513.0], {icon: iVentr}).addTo(gVentr);
           L.marker([1839.0, 2401.0], {icon: iVentr}).addTo(gVentr);
           L.marker([2152.0, 2004.0], {icon: iVentr}).addTo(gVentr);
           L.marker([2137.0, 2497.0], {icon: iVentr}).addTo(gVentr);
           L.marker([2286.0, 2232.0], {icon: iVentr}).addTo(gVentr);
           L.marker([2478.0, 2231.0], {icon: iVentr}).addTo(gVentr);
       }
       
       //Медальоны на память
       function mLocket() {
           L.marker([2227.0, 2305.0], {icon: iLocket}).addTo(gLocket);
           L.marker([2003.0, 2782.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1845.0, 3420.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1668.0, 2706.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1645.0, 1790.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1949.0, 1180.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1616.0, 385.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1330.0, 754.0], {icon: iLocket}).addTo(gLocket);
           L.marker([831.0, 431.0], {icon: iLocket}).addTo(gLocket);
           L.marker([756.0, 962.0], {icon: iLocket}).addTo(gLocket);
           L.marker([981.0, 1442.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1098.0, 1762.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1119.0, 2294.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1208.0, 2430.0], {icon: iLocket}).addTo(gLocket);
           L.marker([895.0, 2682.0], {icon: iLocket}).addTo(gLocket);
           L.marker([877.0, 2975.0], {icon: iLocket}).addTo(gLocket);
           L.marker([469.0, 2179.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1851.0, 2424.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1004.0, 3470.0], {icon: iLocket}).addTo(gLocket);
           L.marker([1150.0, 1795.0], {icon: iLocket}).addTo(gLocket);
       }
       
       //Обломки катушки
       function mSpool() {
            L.marker([1571.0, 633.0], {icon: iSpool}).addTo(gSpool);
            L.marker([2024.0, 977.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1704.0, 1334.0], {icon: iSpool}).addTo(gSpool);
            L.marker([2425.0, 1786.0], {icon: iSpool}).addTo(gSpool);
            L.marker([2165.0, 2212.0], {icon: iSpool}).addTo(gSpool);
            L.marker([2105.0, 2600.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1934.0, 2245.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1740.0, 1968.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1774.0, 2185.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1543.0, 1968.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1527.0, 2375.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1319.0, 2980.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1093.0, 2020.0], {icon: iSpool}).addTo(gSpool);
            L.marker([1099.0, 1790.0], {icon: iSpool}).addTo(gSpool);
            L.marker([842.0, 1004.0], {icon: iSpool}).addTo(gSpool);
            L.marker([618.0, 969.0], {icon: iSpool}).addTo(gSpool);
            L.marker([626.0, 2246.0], {icon: iSpool}).addTo(gSpool);
            L.marker([636.0, 2803.0], {icon: iSpool}).addTo(gSpool);
        }
       
       // Обломки маски
       function mMask() {
            L.marker([1993.0, 207.0], {icon: iMask}).addTo(gMask);
            L.marker([2168.0, 762.0], {icon: iMask}).addTo(gMask);
            L.marker([2179.0, 1201.0], {icon: iMask}).addTo(gMask);
            L.marker([2061.0, 1924.0], {icon: iMask}).addTo(gMask);
            L.marker([2105.0, 2585.0], {icon: iMask}).addTo(gMask);
            L.marker([1955.0, 2668.0], {icon: iMask}).addTo(gMask);
            L.marker([1793.0, 3533.0], {icon: iMask}).addTo(gMask);
            L.marker([1416.0, 2458.0], {icon: iMask}).addTo(gMask);
            L.marker([929.0, 3694.0], {icon: iMask}).addTo(gMask);
            L.marker([678.0, 3450.0], {icon: iMask}).addTo(gMask);
            L.marker([727.0, 3034.0], {icon: iMask}).addTo(gMask);
            L.marker([773.0, 1977.0], {icon: iMask}).addTo(gMask);
            L.marker([1208.0, 1415.0], {icon: iMask}).addTo(gMask);
            L.marker([1347.0, 483.0], {icon: iMask}).addTo(gMask);
            L.marker([872.0, 589.0], {icon: iMask}).addTo(gMask);
            L.marker([758.0, 948.0], {icon: iMask}).addTo(gMask);
            L.marker([646.0, 1377.0], {icon: iMask}).addTo(gMask);
            L.marker([1104.0, 1782.0], {icon: iMask}).addTo(gMask);
            L.marker([1104.0, 1778.0], {icon: iMask}).addTo(gMask);
            L.marker([1104.0, 1775.0], {icon: iMask}).addTo(gMask);
        }
       
       // Ремесленнный металл
       function mMetal() {
            L.marker([2066.0, 3880.0], {icon: iMetal}).addTo(gMetal);
            L.marker([2105.0, 2565.0], {icon: iMetal}).addTo(gMetal);
            L.marker([1544.0, 2123.0], {icon: iMetal}).addTo(gMetal);
            L.marker([1472.0, 2034.0], {icon: iMetal}).addTo(gMetal);
            L.marker([670.0, 2640.0], {icon: iMetal}).addTo(gMetal);
            L.marker([875.0, 1631.0], {icon: iMetal}).addTo(gMetal);
            L.marker([1508.0, 975.0], {icon: iMetal}).addTo(gMetal);
            L.marker([763.0, 948.0], {icon: iMetal}).addTo(gMetal);
            
       }
       
	   // Сердца полипа
	   function mPolip() {
            L.marker([1172.0, 1590.0], {icon: iPolip}).addTo(gPolip);
            L.marker([1183.0, 1469.0], {icon: iPolip}).addTo(gPolip);
            L.marker([1218.0, 1552.0], {icon: iPolip}).addTo(gPolip);
            L.marker([1248.0, 1410.0], {icon: iPolip}).addTo(gPolip);
            L.marker([1364.0, 1404.0], {icon: iPolip}).addTo(gPolip);
            L.marker([1237.0, 1279.0], {icon: iPolip}).addTo(gPolip);
            
       }
        
        
       // Плазмиум
       function mLife() {
            L.marker([846.0, 555.0], {icon: iLife}).addTo(gLife);
            L.marker([951.0, 476.0], {icon: iLife}).addTo(gLife);
            L.marker([841.0, 332.0], {icon: iLife}).addTo(gLife);
            
       }
       
       // Господин Гриб
       function mGrib() {
            L.marker([655.0, 3511.0], {icon: iGrib}).addTo(gGrib);
            L.marker([727.0, 704.0], {icon: iGrib}).addTo(gGrib);
            L.marker([788.0, 981.0], {icon: iGrib}).addTo(gGrib);
            L.marker([1330.0, 2151.0], {icon: iGrib}).addTo(gGrib);
            L.marker([2464.0, 913.0], {icon: iGrib}).addTo(gGrib);
            L.marker([1858.0, 1223.0], {icon: iGrib}).addTo(gGrib);
            L.marker([2717.0, 2092.0], {icon: iGrib}).addTo(gGrib);
       }
       
       // Шелкоеды
       function mSholk() {
            L.marker([549.0, 2268.0], {icon: iSholk}).addTo(gSholk);
            L.marker([1377.0, 1019.0], {icon: iSholk}).addTo(gSholk);
            L.marker([1338.0, 2359.0], {icon: iSholk}).addTo(gSholk);
            L.marker([1367.0, 3151.0], {icon: iSholk}).addTo(gSholk);
            L.marker([1564.0, 2656.0], {icon: iSholk}).addTo(gSholk);
            L.marker([1806.0, 2060.0], {icon: iSholk}).addTo(gSholk);
            L.marker([1847.0, 2307.0], {icon: iSholk}).addTo(gSholk);
            L.marker([2004.0, 2032.0], {icon: iSholk}).addTo(gSholk);
            L.marker([2025.0, 2705.0], {icon: iSholk}).addTo(gSholk);
            L.marker([2454.0, 2181.0], {icon: iSholk}).addTo(gSholk);
       }
       
       // Шакра
       function mShakra() {
            L.marker([785.0, 989.0], {icon: iShakra}).addTo(gShakra);
            L.marker([877.0, 1118.0], {icon: iShakra}).addTo(gShakra);
            L.marker([983.0, 653.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1110.0, 1324.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1344.0, 962.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1682.0, 621.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1888.0, 842.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1109.0, 1831.0], {icon: iShakra}).addTo(gShakra);
            L.marker([733.0, 2133.0], {icon: iShakra}).addTo(gShakra);
            L.marker([894.0, 2594.0], {icon: iShakra}).addTo(gShakra);
            L.marker([722.0, 2906.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1174.0, 3006.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1392.0, 2652.0], {icon: iShakra}).addTo(gShakra);
            L.marker([1659.0, 3156.0], {icon: iShakra}).addTo(gShakra);
       }
       
        
       //Бледное масло

 
        //Ключи   
 

 
        /***Фильтры***/
        // Создаем объект, связывающий "чистые" названия с группами слоев
        const layerGroupsForCount = {
            'Знаки': gSign,
            'Умения': gSkil,
            'Инструменты': gTool,
            'Цилиндры': gPsalm,
            'Реликвии': gRelic,
            'Скамейки': gBench,
            'Блохи': gFlea,
            'Звонкие пути': gBellw,
            'Артерио': gVentr,
            'Медальоны': gLocket,
            'Обломки катушки': gSpool,
            'Обломки маски': gMask,
            'Ремесленный металл': gMetal,
            'Сердца полипа': gPolip,
            'Плазмиум': gLife,
            'Господин Гриб': gGrib,
            'Шелкоеды': gSholk,
            'Шакра': gShakra,
        };

        // Создаем объект для базовых (чистых) названий с иконками
        const baseLayerNames = {
            'Знаки': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Охотница 1.png?width=32" /> Знаки',
            'Умения': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Буйство нитей.png?width=32" /> Умения',
            'Инструменты': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Инструменты_иконка.png?width=32" /> Инструменты',
            'Цилиндры': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Псалмовый_цилиндр.png?width=32" /> Цилиндры',
            'Реликвии': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Костяной_свиток.png?width=32" /> Реликвии',
            'Скамейки': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Скамейка_иконкаSS.png?width=32" /> Скамейки',
            'Блохи': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Блоха_иконка.png?width=32" /> Блохи',
            'Звонкие пути': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Звонкий_путь.png?width=32" /> Звонкие пути',
            'Артерио': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Артерио.png?width=32" /> Артерио',
            'Медальоны': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Медальон_на_память.png?width=32" /> Медальоны',
            'Обломки катушки': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Обломок_катушки.png?width=32" /> Обломки катушки',
            'Обломки маски': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Обломок_маски.png?width=32" /> Обломки маски',
            'Ремесленный металл': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Ремесленный_металл.png?width=32" /> Ремесленный металл',
            'Сердца полипа': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Сердце_полипа.png?width=32" /> Сердца полипа',
            'Плазмиум': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Плазмиум.png?width=32" /> Плазмиум',
            'Господин Гриб': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Mushmap.png?width=32" /> Господин Гриб',
            'Шелкоеды': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Шелкоед.png?width=32" /> Шелкоеды',
            'Шакра': '<img  src="https://hollowknight.fandom.com/ru/wiki/Special  :Filepath/Шакра_иконка.png?width=32" /> Шакра',
        };

        // Создаем объект overlays для L.control.layers
        const overlays = {};
        for (let key in baseLayerNames) {
            overlays[baseLayerNames[key]] = layerGroupsForCount[key];
        }

        // Создаем контрол слоев
        const layerControl = L.control.layers(null, overlays, {
            collapsed: false
        }).addTo(map);

        // Функция для поиска элемента label по "чистому" тексту
        function findLabelSpanByBaseText(baseText) {
            const labels = document.querySelectorAll('.leaflet-control-layers-overlays label');
            for (let label of labels) {
                const span = label.querySelector('span');
                if (span && span.textContent.trim().includes(baseText)) {
                    return span;
                }
            }
            return null;
        }

        // Функция для обновления меток, добавляя количество маркеров
        function updateLayerControlLabels() {
            for (let baseLabel in layerGroupsForCount) {
                let group = layerGroupsForCount[baseLabel];
                let count = group.getLayers().length;
                let newLabel = `${baseLayerNames[baseLabel]} (${count})`;

                let labelSpan = findLabelSpanByBaseText(baseLabel);
                if (labelSpan) {
                    labelSpan.innerHTML = newLabel; // Используем innerHTML, чтобы сохранить <img>
                }
            }
        }

        // Вызываем функцию обновления сразу после создания контрола
        updateLayerControlLabels();

        // Добавляем кнопку "Скрыть все"
        $('.leaflet-control-layers-overlays').prepend('<a class="hk-filter-all">Скрыть все</a>');
        $('.hk-filter-all').click(function() {
            if ( $('.hk-filter-all').text() === "Скрыть все" ) {
                $('.leaflet-control-layers-selector').prop('checked', true);
                $('.leaflet-control-layers-selector').trigger('click');
                $('.hk-filter-all').text('Показать все');
            } else {
                $('.leaflet-control-layers-selector').prop('checked', false);
                $('.leaflet-control-layers-selector').trigger('click');
                $('.hk-filter-all').text('Скрыть все');
            }
            // Опционально: обновить счетчики, если вы хотите, чтобы они отражали только видимые маркеры.
            // В текущей реализации они показывают общее количество.
            // updateLayerControlLabels();
        });
    });
 
    importArticles({
        type: 'script',
        article: 'MediaWiki:Map.js' 
    }, { 
        type: 'style',
        article: 'MediaWiki:Map.css'
    });
});