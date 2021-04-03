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
        var imageUrl = 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/MapHKInteractive.png';
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
        var HKIcon36x40 = L.Icon.extend({
            options: {
                iconSize: [36, 40],
                iconAnchor: [18, 20]
            }
        });
        var iBeast = new HKIcon36x40({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Beast.png?width=36'}),
            iTeacher = new HKIcon36x40({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Teacher.png?width=36'}),
            iWatcher = new HKIcon36x40({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Watcher.png?width=36'});
 
 
 
        //одинаковые по размеру иконки
        var HKIcon32x32 = L.Icon.extend({
            options: {
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            }
        });
        var iGrub = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Grubmap.png?width=32'}),
            iBench = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Bench_green.png?width=32'}),
            iSly = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Sly.png?width=32'}),
            iIselda = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Iselda.png?width=32'}),
            iGrubdad = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Grubfather.png?width=32'}),
            iJiji = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Jiji.png?width=32'}),
            iSalubra = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Salubra.png?width=32'}),
            iHunter = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Hunter.png?width=32'}),
            iLegeater = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Leg_Eater.png?width=32'}),
            iBank = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Millibelle.png?width=32'}),
            iSmith = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Nailsmith.png?width=32'}),
            iLemm = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Lemm.png?width=32'}),
            iSeer = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Seer.png?width=32'}),
            iCol = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Colosseum.png?width=32'}),
            iGodseeker = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Godseeker.png?width=32'}),
            iStag = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Stag.png?width=32'}),
            iRoot = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Tree.png?width=32'}),
            iDreamwar = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Warriors_Grave.png?width=32'}),
            iCocoon = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Cocoon.png?width=32'}),
            iSpring =  new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Springs.png?width=32'}),
            iTram = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Tram.png?width=32'}),
            ikingidol = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Idolmap.png?width=32'}),
            iarcegg = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Arcanemap.png?width=32'}),
            iseal = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Sealmap.png?width=32'}),
            ijournal = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Journalmap.png?width=32'}),
            igrib = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Mushmap.png?width=32'}),
            icorn = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Cormap.png?width=32'}),
            ivesfrag = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Vesselmapi.png?width=32'}),
            imask = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Maskmap.png?width=32'}),
            iore = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Oremap.png?width=32'}),
            ioro = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Oromap.png?width=32'}),
            imato = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Matomap.png?width=32'}),
            isheo = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Sheomap.png?width=32'}),
            iquir = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Travmap.png?width=32'}),
            itiso = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Tisomap.png?width=32'}),
            ihornet = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Hornmap.png?width=32'}),
            icloth = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Clothmap.png?width=32'}),
            izote = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Zotemap.png?width=32'});
 
 
    //Одиночные иконки
        var iBlackegg = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Black_Egg.png?width=30',
            iconSize: [30, 36],
            iconAnchor: [15, 18]
        });
 
        //Амулеты
        var isoulcatcher = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Soul_Catcher.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var isouleater = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Soul_Eater.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var idashmaster = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Dashmaster.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ithorns = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Thorns_of_Agony.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ifury = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Fury_of_the_Fallen.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ispelltwister = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Spell_Twister.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var iquickslash = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Quick_Slash.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ipridemark = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Mark_of_Pride.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ibaldurshell = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Baldur_Shell.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var iflukenest = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Flukenest.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var idefcrest = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Defender%27s_Crest.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var iglowwomb = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Glowing_Womb.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ideepfocus = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Deep_Focus.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ilbcore = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Lifeblood_Core.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ijonibless= L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Joni%27s_Blessing.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ihiveblood = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Hiveblood.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var isporeshroom = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Spore_Shroom.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var isharpshadow = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Sharp_Shadow.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var iunncharm = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Shape_of_Unn.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var ikingsoul1 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Charm_KingSoul_Left.png',
            iconSize: [21, 32],
            iconAnchor: [10, 16]
        });
        var ikingsoul2 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Charm_KingSoul_Right.png',
            iconSize: [22, 32],
            iconAnchor: [11, 16]
        });
        var ivoidheart = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Void_Heart.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var idreamshield = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Dreamshield.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var iweaversong = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Weaversong.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
 
        //Способности
        var imothcloak = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Mothwing_Cloak.png',
            iconSize: [32, 29],
            iconAnchor: [16, 14]
        });
        var imantisclaw = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Mantis_Claw.png',
            iconSize: [32, 29],
            iconAnchor: [16, 14]
        });
        var icrystalheart = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Crystal_Heart.png',
            iconSize: [32, 29],
            iconAnchor: [16, 14]
        });
        var imonarchwings = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Monarch_Wings.png',
            iconSize: [32, 28],
            iconAnchor: [16, 14]
        });
        var ikingbrand = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Клеймо_Короля.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
        var ishadecloak = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Shade_Cloak.png',
            iconSize: [32, 30],
            iconAnchor: [16, 15]
        });
        var iismatear = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Isma%27s_Tear.png',
            iconSize: [29, 32],
            iconAnchor: [15, 16]
        });
 
        //Заклинания  
        var ifireball1 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Vengeful_Spirit.png',
            iconSize: [32, 20],
            iconAnchor: [16, 10]
        });
        var ifireball2 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Shade_Soul.png',
            iconSize: [32, 20],
            iconAnchor: [16, 10]
        });
        var ishriek1 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Howling_Wraiths.png',
            iconSize: [25, 32],
            iconAnchor: [12, 16]
        });
        var ishriek2 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Abyss_Shriek.png',
            iconSize: [25, 32],
            iconAnchor: [12, 16]
        });
        var idive1 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Desolate_Dive.png',
            iconSize: [32, 30],
            iconAnchor: [16, 15]
        });
        var idive2 = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Descending_Dark.png',
            iconSize: [32, 30],
            iconAnchor: [16, 15]
        });
        //Ключи
        var ikeyt = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Tram_Pass.png',
            iconSize: [32, 23],
            iconAnchor: [16, 12]
        });
        var ikeyl = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Love_Key.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
        var ikeyk= L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Shopkeeper%27s_Key.png',
            iconSize: [31, 32],
            iconAnchor: [15, 16]
        });
        var ikey = L.icon({
            iconUrl: 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/Simple_Key.png',
            iconSize: [32, 30],
            iconAnchor: [16, 15]
        });
 
 
 
        /*** Группы (ссылки в превью маркеров)
 
        ***/
        var gBeast = L.layerGroup().addTo(map),
            gAmul = L.layerGroup().addTo(map),
            gSpos = L.layerGroup().addTo(map),
            gZakl = L.layerGroup().addTo(map),
            gKeys = L.layerGroup().addTo(map),
            gBench = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Скамейка" target="_blank">Скамейка</a>').addTo(map),
            gGrub = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Гусенички" target="_blank">Гусеничка</a>').addTo(map),
            gNPC = L.layerGroup().addTo(map),
            gStag = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Быстрое_перемещение" target="_blank">Вокзал рогачей</a>').addTo(map),
            gRoot = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Шепчущий_корень" target="_blank">Шепчущий корень</a>').addTo(map),
            gDreamwar = L.layerGroup().addTo(map),
            gCocoon = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Кокон_живокрови" target="_blank">Кокон живокрови</a>').addTo(map),
            gSpr = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Горячий_ключ" target="_blank">Горячий ключ</a>').addTo(map),
            gTram = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Трамвай" target="_blank">Трамваи</a>').addTo(map),
            gKingidol = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Идол Короля" target="_blank">Идол Короля</a>').addTo(map),
            gArcegg = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Загадочное яйцо" target="_blank">Загадочное яйцо</a>').addTo(map),
            gSeal = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Печать Халлоунеста" target="_blank">Печать Халлоунеста</a>').addTo(map),
            gJournal = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Дневник странника" target="_blank">Дневник странника</a>').addTo(map),
            gGrib = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Господин Гриб" target="_blank">Господин Гриб</a>').addTo(map),
            gCorn = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Корнифер" target="_blank">Корнифер</a>').addTo(map),
            gVesfrag = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Черепок сосуда" target="_blank">Черепок сосуда</a>').addTo(map),
            gMask = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Осколок маски" target="_blank">Осколок маски</a>').addTo(map),
            gOre = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Бледная руда" target="_blank">Бледная руда</a>').addTo(map);
 
 
        /***Метки***/
        mBeast();
        mBench();
        mGrub();
        mNPC();
        mStag();
        mRoot();
        mDreamwar();
        mCocoon();
        mSpr();
        mTram();
        mKingidol();
        mArcegg();
        mSeal();
        mJournal();
        mGrib();
        mCorn();
        mVesfrag();
        mMask();
        mOre();
        mAmul();
        mSpos();
        mZakl();
        mKeys();
 
        /***Координаты меток и прямые ссылки одиночных***/
 
        //Грезящие
        function mBeast() {
            L.marker([964.0, 99.0], {icon: iBeast, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Херра Зверь">Херра Зверь</a>').openPopup().addTo(gBeast);
            L.marker([1600.0, 1372.0], {icon: iTeacher, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Мономона Наставница">Мономона Наставница</a>').openPopup().addTo(gBeast);
            L.marker([1700.0, 2820.0], {icon: iWatcher, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Лурьен Хранитель">Лурьен Хранитель</a>').openPopup().addTo(gBeast);
            L.marker([2130.0, 2012.0], {icon: iBlackegg, zIndexOffset: 1000}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Храм Чёрного Яйца">Храм Чёрного Яйца</a>').openPopup().addTo(gBeast);
        }
 
        //Скамейки
        function mBench() {
            /* тропа и сады */
            L.marker([1485.0, 911.0], {icon: iBench}).addTo(gBench);
            L.marker([1444.0, 633.0], {icon: iBench}).addTo(gBench);
            L.marker([1334.0, 487.0], {icon: iBench}).addTo(gBench);
            L.marker([2065.0, 1211.0], {icon: iBench}).addTo(gBench);
            L.marker([1807.0, 1330.0], {icon: iBench}).addTo(gBench);
            L.marker([2048.0, 363.0], {icon: iBench}).addTo(gBench);
            L.marker([1864.0, 268.0], {icon: iBench}).addTo(gBench);
            L.marker([1956.0, 846.0], {icon: iBench}).addTo(gBench);
            L.marker([2044.0, 694.0], {icon: iBench}).addTo(gBench);
            /* глуб гнездо */
            L.marker([1090.0, 1111.0], {icon: iBench}).addTo(gBench);
            L.marker([738.0, 1200.0], {icon: iBench}).addTo(gBench);
            L.marker([944.0, 100.0], {icon: iBench}).addTo(gBench);
            /* котлован */
            L.marker([560.0, 2400.0], {icon: iBench}).addTo(gBench);
            L.marker([581.0, 3017.0], {icon: iBench}).addTo(gBench);
            /* воющие скалы */
            L.marker([2420.0, 1171.0], {icon: iBench}).addTo(gBench);
            /* туманный каньон */
            L.marker([1582.0, 1358.0], {icon: iBench}).addTo(gBench);
            /* грибные пустоши */
            L.marker([1060.0, 1887.0], {icon: iBench}).addTo(gBench);
            L.marker([1356.0, 1281.0], {icon: iBench}).addTo(gBench);
            L.marker([1087.0, 1777.0], {icon: iBench}).addTo(gBench);
            L.marker([1620.0, 1857.0], {icon: iBench}).addTo(gBench);
            /* город слёз */
            L.marker([1550.0, 2213.0], {icon: iBench}).addTo(gBench);
            L.marker([1405.0, 2461.0], {icon: iBench}).addTo(gBench);
            L.marker([1229.0, 2251.0], {icon: iBench}).addTo(gBench);
            L.marker([1261.0, 2676.0], {icon: iBench}).addTo(gBench);
            L.marker([1447.0, 3062.0], {icon: iBench}).addTo(gBench);
            L.marker([1143.0, 3246.0], {icon: iBench}).addTo(gBench);
            /* кристальный пик */
            L.marker([1958.0, 2671.0], {icon: iBench}).addTo(gBench);
            L.marker([2288.0, 2625.0], {icon: iBench}).addTo(gBench);
            /* земли упокоения */
            L.marker([1865.0, 3471.0], {icon: iBench}).addTo(gBench);
            L.marker([1954.0, 3290.0], {icon: iBench}).addTo(gBench);
            /* край и улей */
            L.marker([697.0, 3380.0], {icon: iBench}).addTo(gBench);
            L.marker([968.0, 4082.0], {icon: iBench}).addTo(gBench);
            L.marker([1230.0, 3786.0], {icon: iBench}).addTo(gBench);
            L.marker([1538.0, 3456.0], {icon: iBench}).addTo(gBench);
            /* перепутье */
            L.marker([2184.0, 1788.0], {icon: iBench}).addTo(gBench);
            L.marker([1907.0, 2137.0], {icon: iBench}).addTo(gBench);
            L.marker([1797.0, 2460.0], {icon: iBench}).addTo(gBench);
            L.marker([1538.0, 3456.0], {icon: iBench}).addTo(gBench);
            L.marker([1896.0, 1933.0], {icon: iBench}).addTo(gBench);
            L.marker([1972.0, 1815.0], {icon: iBench}).addTo(gBench);
            /* стоки */
            L.marker([960.0, 2359.0], {icon: iBench}).addTo(gBench);
        }
        //Гусенички
        function mGrub() {
            /* тропа и сады */
            L.marker([2110.0, 800.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1666.0, 271.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1785.0, 619.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1395.0, 600.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1740.0, 870.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1842.0, 1322.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1941.0, 1390.0], {icon: iGrub}).addTo(gGrub);
            /* глуб гнездо */
            L.marker([972.0, 70.0], {icon: iGrub}).addTo(gGrub);
            L.marker([857.0, 631.0], {icon: iGrub}).addTo(gGrub);
            L.marker([714.0, 1022.0], {icon: iGrub}).addTo(gGrub);
            L.marker([921.0, 1058.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1191.0, 1388.0], {icon: iGrub}).addTo(gGrub);
            /* котлован */
            L.marker([635.0, 1990.0], {icon: iGrub}).addTo(gGrub);
            L.marker([687.0, 2340.0], {icon: iGrub}).addTo(gGrub);
            /* воющие скалы */
            L.marker([2234.0, 1074.0], {icon: iGrub}).addTo(gGrub);
            /* туманный каньон */
            L.marker([1609.0, 1330.0], {icon: iGrub}).addTo(gGrub);
            /* грибные пустоши */
            L.marker([1285.0, 1253.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1378.0, 1656.0], {icon: iGrub}).addTo(gGrub);
            /* город слёз */
            L.marker([1500.0, 2281.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1310.0, 2514.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1120.0, 3037.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1083.0, 3343.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1307.0, 3370.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1307.0, 3380.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1307.0, 3390.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1374.0, 2770.0], {icon: iGrub}).addTo(gGrub);
            /* кристальный пик */
            L.marker([2082.0, 3082.0], {icon: iGrub}).addTo(gGrub);
            L.marker([2215.0, 2830.0], {icon: iGrub}).addTo(gGrub);
            L.marker([2210.0, 2663.0], {icon: iGrub}).addTo(gGrub);
            L.marker([2380.0, 3166.0], {icon: iGrub}).addTo(gGrub);
            L.marker([2089.0, 2718.0], {icon: iGrub}).addTo(gGrub);
            L.marker([2119.0, 2585.0], {icon: iGrub}).addTo(gGrub);
            L.marker([2167.0, 2060.0], {icon: iGrub}).addTo(gGrub);
            /* земли упокоения */
            L.marker([1833.0, 3312.0], {icon: iGrub}).addTo(gGrub);
            /* край и улей */
            L.marker([875.0, 4154.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1096.0, 3774.0], {icon: iGrub}).addTo(gGrub);
            L.marker([897.0, 3332.0], {icon: iGrub}).addTo(gGrub);
            L.marker([897.0, 3677.0], {icon: iGrub}).addTo(gGrub);
            /* перепутье */
            L.marker([2111.0, 2339.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1914.0, 2219.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1978.0, 2168.0], {icon: iGrub}).addTo(gGrub);
            L.marker([2057.0, 1852.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1888.0, 1506.0], {icon: iGrub}).addTo(gGrub);
            /* стоки */
            L.marker([989.0, 2322.0], {icon: iGrub}).addTo(gGrub);
            L.marker([987.0, 3157.0], {icon: iGrub}).addTo(gGrub);
            L.marker([1046.0, 3157.0], {icon: iGrub}).addTo(gGrub);
        }
        //NPC
        function mNPC() {
            L.marker([2183.0, 1769.0], {icon: iSly}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Слай">Слай</a>').openPopup().addTo(gNPC);
            L.marker([2183.0, 1815.0], {icon: iIselda}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Изельда">Изельда</a>').openPopup().addTo(gNPC);
            L.marker([2179.0, 1971.0], {icon: iJiji}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Исповедница Джиджи">Исповедница Джиджи</a>').openPopup().addTo(gNPC);
            L.marker([2103.0, 1668.0], {icon: iGrubdad}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Отец гусеничек">Отец гусеничек</a>').openPopup().addTo(gNPC);
            L.marker([1796.0, 2448.0], {icon: iSalubra}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Салюбра">Салюбра</a>').openPopup().addTo(gNPC);
            L.marker([1620.0, 1886.0], {icon: iLegeater}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Пожиратель ног">Пожиратель ног</a>').openPopup().addTo(gNPC);
            L.marker([1875.0, 1440.0], {icon: iHunter}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Охотник">Охотник</a>').openPopup().addTo(gNPC);
            L.marker([1420.0, 1200.0], {icon: iBank}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Миллибель">Миллибель</a>').openPopup().addTo(gNPC);
            L.marker([1540.0, 3420.0], {icon: iCol}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Колизей глупцов">Колизей глупцов</a>').openPopup().addTo(gNPC);
            L.marker([2000.0, 3195.0], {icon: iSeer}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Провидица">Провидица</a>').openPopup().addTo(gNPC);
            L.marker([1140.0, 2512.0], {icon: iLemm}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Старьёвщик Лемм">Старьёвщик Лемм</a>').openPopup().addTo(gNPC);
            L.marker([1128.0, 1956.0], {icon: iSmith}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Кузнец гвоздей">Кузнец гвоздей</a>').openPopup().addTo(gNPC);
            L.marker([842.0, 1877.0], {icon: iGodseeker}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Богоискательница">Богоискательница</a>').openPopup().addTo(gNPC);
            L.marker([968.0, 4065.0], {icon: ioro}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Мастер гвоздя Оро">Мастер гвоздя Оро</a>').openPopup().addTo(gNPC);
            L.marker([2422.0, 1182.0], {icon: imato}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Мастер гвоздя Мато">Мастер гвоздя Мато</a>').openPopup().addTo(gNPC);
            L.marker([1863.0, 250.0], {icon: isheo}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Мастер гвоздя Шео">Мастер гвоздя Шео</a>').openPopup().addTo(gNPC);
         //Зот
            L.marker([2172.0, 761.0], {icon: izote}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Зот Могучий">Зот Могучий</a>').openPopup().addTo(gNPC);
            L.marker([1411.0, 2314.0], {icon: izote}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Зот Могучий">Зот Могучий</a>').openPopup().addTo(gNPC);
            L.marker([966.0, 1078.0], {icon: izote}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Зот Могучий">Зот Могучий</a>').openPopup().addTo(gNPC);
            L.marker([1939.0, 1770.0], {icon: izote}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Зот Могучий">Зот Могучий</a>').openPopup().addTo(gNPC);
        //Тряпочка
            L.marker([1089.0, 1096.0], {icon: icloth}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тряпочка">Тряпочка</a>').openPopup().addTo(gNPC);
            L.marker([1453.0, 1845.0], {icon: icloth}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тряпочка">Тряпочка</a>').openPopup().addTo(gNPC);
            L.marker([731.0, 2161.0], {icon: icloth}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тряпочка">Тряпочка</a>').openPopup().addTo(gNPC);
        	L.marker([1665.0, 493.0], {icon: icloth}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тряпочка">Тряпочка</a>').openPopup().addTo(gNPC);
        //Тисо
            L.marker([1908.0, 2150.0], {icon: itiso}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тисо">Тисо</a>').openPopup().addTo(gNPC);
            L.marker([1809.0, 2504.0], {icon: itiso}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тисо">Тисо</a>').openPopup().addTo(gNPC);
        	L.marker([1320.0, 3482.0], {icon: itiso}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тисо">Труп Тисо</a>').openPopup().addTo(gNPC);
        //Хорнет
            L.marker([2087.0, 566.0], {icon: ihornet}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Хорнет">Хорнет</a>').openPopup().addTo(gNPC);
            L.marker([464.0, 2451.0], {icon: ihornet}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Хорнет">Хорнет</a>').openPopup().addTo(gNPC);
        	L.marker([1120.0, 4106.0], {icon: ihornet}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Хорнет">Хорнет</a>').openPopup().addTo(gNPC);
        	L.marker([2109.0, 2023.0], {icon: ihornet}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Хорнет">Хорнет</a>').openPopup().addTo(gNPC);
        	L.marker([950.0, 112.0], {icon: ihornet}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Хорнет">Хорнет</a>').openPopup().addTo(gNPC);
        	L.marker([1109.0, 2595.0], {icon: ihornet}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Хорнет">Хорнет</a>').openPopup().addTo(gNPC);
        //Квиррел
            L.marker([2109.0, 2000.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([2048.0, 351.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([740.0, 1180.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([2386.0, 2552.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([1582.0, 1374.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([1804.0, 2835.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([1408.0, 1303.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([1155.0, 1758.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([1290.0, 2254.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
        }
        //Вокзалы
        function mStag() {
            L.marker([1954.0, 3314.0], {icon: iStag}).addTo(gStag);
            L.marker([2184.0, 1755.0], {icon: iStag}).addTo(gStag);
            L.marker([2506.0, 980.0], {icon: iStag}).addTo(gStag);
            L.marker([2043.0, 665.0], {icon: iStag}).addTo(gStag);
            L.marker([1446.0, 603.0], {icon: iStag}).addTo(gStag);
            L.marker([581.0, 2994.0], {icon: iStag}).addTo(gStag);
            L.marker([1143.0, 3277.0], {icon: iStag}).addTo(gStag);
            L.marker([1549.0, 2244.0], {icon: iStag}).addTo(gStag);
            L.marker([1907.0, 2102.0], {icon: iStag}).addTo(gStag);
            L.marker([1355.0, 1236.0], {icon: iStag}).addTo(gStag);
            L.marker([1007.0, 234.0], {icon: iStag}).addTo(gStag);
        }
        //Шепчущие корни
        function mRoot() {
            L.marker([2120.0, 1740.0], {icon: iRoot}).addTo(gRoot);
            L.marker([2250.0, 872.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1982.0, 1826.0], {icon: iRoot}).addTo(gRoot);
            L.marker([2379.0, 2963.0], {icon: iRoot}).addTo(gRoot);
            L.marker([2085.0, 3467.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1950.0, 3217.0], {icon: iRoot}).addTo(gRoot);
            L.marker([718.0, 3676.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1453.0, 2237.0], {icon: iRoot}).addTo(gRoot);
            L.marker([809.0, 2835.0], {icon: iRoot}).addTo(gRoot);
            L.marker([826.0, 508.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1627.0, 1694.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1216.0, 1646.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1744.0, 689.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1344.0, 943.0], {icon: iRoot}).addTo(gRoot);
            L.marker([1206.0, 3522.0], {icon: iRoot}).addTo(gRoot);
        }
        //Воины грёз
        function mDreamwar() {
            L.marker([1452.0, 2034.0], {icon: iDreamwar}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Старейшина Ху">Старейшина Ху</a>').openPopup().addTo(gDreamwar);
            L.marker([1780.0, 1441.0], {icon: iDreamwar}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Незрячая">Незрячая</a>').openPopup().addTo(gDreamwar);
            L.marker([1441.0, 453.0], {icon: iDreamwar}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Марму">Марму</a>').openPopup().addTo(gDreamwar);
            L.marker([962.0, 731.0], {icon: iDreamwar}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Гальен">Гальен</a>').openPopup().addTo(gDreamwar);
            L.marker([1030.0, 3880.0], {icon: iDreamwar}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Маркот">Маркот</a>').openPopup().addTo(gDreamwar);
            L.marker([1870.0, 2932.0], {icon: iDreamwar}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Ксеро">Ксеро</a>').openPopup().addTo(gDreamwar);
            L.marker([2465.0, 1064.0], {icon: iDreamwar}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Горб">Горб</a>').openPopup().addTo(gDreamwar);
        }
        //Коконы живокрови
        function mCocoon() {
            L.marker([2232.0, 1362.0], {icon: iCocoon}).addTo(gCocoon);
            L.marker([1971.0, 1842.0], {icon: iCocoon}).addTo(gCocoon);
            L.marker([2127.0, 858.0], {icon: iCocoon}).addTo(gCocoon);
            L.marker([1665.0, 1021.0], {icon: iCocoon}).addTo(gCocoon);
            L.marker([1113.0, 826.0], {icon: iCocoon}).addTo(gCocoon);
            L.marker([1008.0, 785.0], {icon: iCocoon}).addTo(gCocoon);
            L.marker([1004.0, 1589.0], {icon: iCocoon}).addTo(gCocoon);
            L.marker([1333.0, 3721.0], {icon: iCocoon}).addTo(gCocoon);
        }
       //Горячие ключи
       function mSpr() {
           L.marker([1897.0, 1914.0], {icon: iSpring}).addTo(gSpr);
           L.marker([739.0, 1190.0], {icon: iSpring}).addTo(gSpr);
           L.marker([1445.0, 3041.0], {icon: iSpring}).addTo(gSpr);
           L.marker([1537.0, 3441.0], {icon: iSpring}).addTo(gSpr);
       }
       //Трамваи
       function mTram() {
           L.marker([1883.0, 2422.0], {icon: iTram}).addTo(gTram);
           L.marker([1883.0, 2651.0], {icon: iTram}).addTo(gTram);
           L.marker([742.0, 2530.0], {icon: iTram}).addTo(gTram);
           L.marker([742.0, 3047.0], {icon: iTram}).addTo(gTram);
           L.marker([742.0, 1594.0], {icon: iTram}).addTo(gTram);
       }
       //Идолы Короля
       function mKingidol() {
        L.marker([2231.0, 793.0], {icon: ikingidol}).addTo(gKingidol);
        L.marker([2261.0, 2497.0], {icon: ikingidol}).addTo(gKingidol);
        L.marker([2020.0, 3480.0], {icon: ikingidol}).addTo(gKingidol);
        L.marker([1475.0, 3325.0], {icon: ikingidol}).addTo(gKingidol);
        L.marker([1430.0, 3959.0], {icon: ikingidol}).addTo(gKingidol);
        L.marker([968.0, 2765.0], {icon: ikingidol}).addTo(gKingidol);
        L.marker([955.0, 1024.0], {icon: ikingidol}).addTo(gKingidol);
       }
        //Загадочные яйца 
        function mArcegg() {  
        L.marker([151.0, 2306.0], {icon: iarcegg}).addTo(gArcegg);
        L.marker([7.0, 2427.0], {icon: iarcegg}).addTo(gArcegg);
        L.marker([58.0, 3345.0], {icon: iarcegg}).addTo(gArcegg);
        }
        //Печати Халлоунеста
        function mSeal() {  
        L.marker([2150.0, 1854.0], {icon: iseal}).addTo(gSeal);
        L.marker([1825.0, 3211.0], {icon: iseal}).addTo(gSeal);
        L.marker([1174.0, 3227.0], {icon: iseal}).addTo(gSeal);
        L.marker([1457.0, 2723.0], {icon: iseal}).addTo(gSeal);
        L.marker([1490.0, 2313.0], {icon: iseal}).addTo(gSeal);
        L.marker([1196.0, 2333.0], {icon: iseal}).addTo(gSeal);
        L.marker([1760.0, 1580.0], {icon: iseal}).addTo(gSeal);
        L.marker([1676.0, 1060.0], {icon: iseal}).addTo(gSeal);
        L.marker([1507.0, 1556.0], {icon: iseal}).addTo(gSeal);
        L.marker([1395.0, 1264.0], {icon: iseal}).addTo(gSeal);
        L.marker([1827.0, 887.0], {icon: iseal}).addTo(gSeal);
        L.marker([1105.0, 1744.0], {icon: iseal}).addTo(gSeal);
        L.marker([1049.0, 1341.0], {icon: iseal}).addTo(gSeal);
        L.marker([945.0, 80.0], {icon: iseal}).addTo(gSeal);
        L.marker([1528.0, 251.0], {icon: iseal}).addTo(gSeal);
        }
        //Дневники 
        function mJournal() {  
        L.marker([1810.0, 3518.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1233.0, 3805.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1113.0, 3728.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1157.0, 3447.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1234.0, 3200.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1294.0, 2990.0], {icon: ijournal}).addTo(gJournal);
        L.marker([2347.0, 2777.0], {icon: ijournal}).addTo(gJournal);
        L.marker([2270.0, 928.0], {icon: ijournal}).addTo(gJournal);
        L.marker([2044.0, 750.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1750.0, 1254.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1453.0, 1640.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1224.0, 1660.0], {icon: ijournal}).addTo(gJournal);
        L.marker([783.0, 2741.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1527.0, 2093.0], {icon: ijournal}).addTo(gJournal);
        }
         //Господин Гриб
        function mGrib() { 
        L.marker([2160.0, 1324.0], {icon: igrib}).addTo(gGrib);
        L.marker([1571.0, 872.0], {icon: igrib}).addTo(gGrib);
        L.marker([542.0, 1752.0], {icon: igrib}).addTo(gGrib);
        L.marker([2421.0, 1160.0], {icon: igrib}).addTo(gGrib);
        L.marker([958.0, 692.0], {icon: igrib}).addTo(gGrib);
        L.marker([849.0, 3216.0], {icon: igrib}).addTo(gGrib);
        L.marker([1355.0, 1438.0], {icon: igrib}).addTo(gGrib);
        }
        //Корнифер  
        function mCorn() {
        L.marker([2367.0, 963.0], {icon: icorn}).addTo(gCorn);
        L.marker([1918.0, 1385.0], {icon: icorn}).addTo(gCorn);
        L.marker([2241.0, 2485.0], {icon: icorn}).addTo(gCorn);
        L.marker([1939.0, 1770.0], {icon: icorn}).addTo(gCorn);
        L.marker([1475.0, 975.0], {icon: icorn}).addTo(gCorn);
        L.marker([1683.0, 1324.0], {icon: icorn}).addTo(gCorn);
        L.marker([1355.0, 1453.0], {icon: icorn}).addTo(gCorn);
        L.marker([957.0, 1428.0], {icon: icorn}).addTo(gCorn);
        L.marker([1022.0, 1850.0], {icon: icorn}).addTo(gCorn);
        L.marker([642.0, 2580.0], {icon: icorn}).addTo(gCorn);
        L.marker([1403.0, 2476.0], {icon: icorn}).addTo(gCorn);
        L.marker([1033.0, 3457.0], {icon: icorn}).addTo(gCorn);
        }
        //Черепки сосуда 
        function mVesfrag() {
        L.marker([642.0, 2590.0], {icon: ivesfrag}).addTo(gVesfrag);
        L.marker([834.0, 1597.0], {icon: ivesfrag}).addTo(gVesfrag);
        L.marker([2505.0, 992.0], {icon: ivesfrag}).addTo(gVesfrag);
        L.marker([1756.0, 805.0], {icon: ivesfrag}).addTo(gVesfrag);
        L.marker([1820.0, 1859.0], {icon: ivesfrag}).addTo(gVesfrag);
        L.marker([1333.0, 3222.0], {icon: ivesfrag}).addTo(gVesfrag);
        }
       //Осколки маски 
        function mMask() {
        L.marker([1941.0, 1681.0], {icon: imask}).addTo(gMask);
        L.marker([1872.0, 1895.0], {icon: imask}).addTo(gMask);
        L.marker([2182.0, 1836.0], {icon: imask}).addTo(gMask);
        L.marker([2329.0, 2606.0], {icon: imask}).addTo(gMask);
        L.marker([847.0, 3577.0], {icon: imask}).addTo(gMask);
        L.marker([995.0, 1933.0], {icon: imask}).addTo(gMask);
        L.marker([1781.0, 1453.0], {icon: imask}).addTo(gMask);
        L.marker([1392.0, 1378.0], {icon: imask}).addTo(gMask);
        L.marker([983.0, 1473.0], {icon: imask}).addTo(gMask);
        }
       //Бледная руда 
        function mOre() {
        L.marker([2706.0, 2892.0], {icon: iore}).addTo(gOre);
        L.marker([689.0, 2128.0], {icon: iore}).addTo(gOre);
        L.marker([682.0, 1322.0], {icon: iore}).addTo(gOre);
        }
       //Амулеты
        function mAmul() {
        L.marker([1967.0, 1827.0], {icon: isoulcatcher}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Ловец_душ">Ловец душ</a>').openPopup().addTo(gAmul);
        L.marker([1833.0, 3506.0], {icon: isouleater}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Пожиратель душ">Пожиратель душ</a>').openPopup().addTo(gAmul);
        L.marker([974.0, 1760.0], {icon: idashmaster}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Трюкач">Трюкач</a>').openPopup().addTo(gAmul);
        L.marker([1883.0, 1064.0], {icon: ithorns}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Колючки страданий">Колючки страданий</a>').openPopup().addTo(gAmul);
        L.marker([2157.0, 1494.0], {icon: ifury}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Ярость павшего">Ярость павшего</a>').openPopup().addTo(gAmul);
        L.marker([1605.0, 2593.0], {icon: ispelltwister}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Искажатель заклинаний">Искажатель заклинаний</a>').openPopup().addTo(gAmul);
        L.marker([910.0, 3990.0], {icon: iquickslash}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Быстрый удар">Быстрый удар</a>').openPopup().addTo(gAmul);
        L.marker([1103.0, 1761.0], {icon: ipridemark}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Метка гордости">Метка гордости</a>').openPopup().addTo(gAmul);
        L.marker([2170.0, 1076.0], {icon: ibaldurshell}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Панцирь бальдра">Панцирь бальдра</a>').openPopup().addTo(gAmul);
        L.marker([874.0, 2209.0], {icon: iflukenest}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тремогнездо">Тремогнездо</a>').openPopup().addTo(gAmul);
        L.marker([1010.0, 2722.0], {icon: idefcrest}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Герб защитника">Герб защитника</a>').openPopup().addTo(gAmul);
        L.marker([1998.0, 2103.0], {icon: iglowwomb}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Пылающее чрево">Пылающее чрево</a>').openPopup().addTo(gAmul);
        L.marker([2160.0, 2253.0], {icon: ideepfocus}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Глубокий фокус">Глубокий фокус</a>').openPopup().addTo(gAmul);
        L.marker([179.0, 2319.0], {icon: ilbcore}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Живительное ядро">Живительное ядро</a>').openPopup().addTo(gAmul);
        L.marker([2308.0, 1232.0], {icon: ijonibless}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Благословение Джони">Благословение Джони</a>').openPopup().addTo(gAmul);
        L.marker([825.0, 3845.0], {icon: ihiveblood}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Кровь Улья">Кровь Улья</a>').openPopup().addTo(gAmul);
        L.marker([1270.0, 1313.0], {icon: isporeshroom}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Споровый гриб">Споровый гриб</a>').openPopup().addTo(gAmul);
        L.marker([640.0, 1458.0], {icon: isharpshadow}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Пронизывающая тень">Пронизывающая тень</a>').openPopup().addTo(gAmul);
        L.marker([1906.0, 145.0], {icon: iunncharm}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Облик Унн">Облик Унн</a>').openPopup().addTo(gAmul);
        L.marker([1670.0, 322.0], {icon: ikingsoul1}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Душа Короля">Фрагмент Души Короля</a>').openPopup().addTo(gAmul);
        L.marker([588.0, 2810.0], {icon: ikingsoul2}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Душа Короля">Фрагмент Души Короля</a>').openPopup().addTo(gAmul);
        L.marker([15.0, 2465.0], {icon: ivoidheart}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Сердце пустоты">Сердце пустоты</a>').openPopup().addTo(gAmul);
        L.marker([1961.0, 3095.0], {icon: idreamshield}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Щит грёз">Щит грёз</a>').openPopup().addTo(gAmul);
        L.marker([865.0, 764.0], {icon: iweaversong}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Песнь ткача">Песнь ткача</a>').openPopup().addTo(gAmul);
        }
       //Способности
       function mSpos() {
        L.marker([2091.0, 587.0], {icon: imothcloak}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Накидка мотылька">Накидка мотылька</a>').openPopup().addTo(gSpos);
        L.marker([1169.0, 1583.0], {icon: imantisclaw}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Клешня богомола">Клешня богомола</a>').openPopup().addTo(gSpos);
        L.marker([2181.0, 3183.0], {icon: icrystalheart}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Кристальное сердце">Кристальное сердце</a>').openPopup().addTo(gSpos);
        L.marker([550.0, 1630.0], {icon: imonarchwings}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Монаршие крылья">Монаршие крылья</a>').openPopup().addTo(gSpos);
        L.marker([924.0, 3170.0], {icon: iismatear}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Слеза Измы">Слеза Измы</a>').openPopup().addTo(gSpos);
        L.marker([70.0, 3415.0], {icon: ishadecloak}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Теневая накидка">Теневая накидка</a>').openPopup().addTo(gSpos);
        L.marker([1076.0, 3997.0], {icon: ikingbrand}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Тавро Короля">Тавро Короля</a>').openPopup().addTo(gSpos);
       }
       //Заклинания
        function mZakl() {
        L.marker([1997.0, 1827.0], {icon: ifireball1}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Мстительный дух">Мстительный дух</a>').openPopup().addTo(gZakl);
        L.marker([1480.0, 2505.0], {icon: ifireball2}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Теневая душа">Теневая душа</a>').openPopup().addTo(gZakl);
        L.marker([1627.0, 863.0], {icon: ishriek1}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Воющие духи">Воющие духи</a>').openPopup().addTo(gZakl);
        L.marker([51.0, 2137.0], {icon: ishriek2}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Вопль Бездны">Вопль Бездны</a>').openPopup().addTo(gZakl);
        L.marker([1535.0, 2430.0], {icon: idive1}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Опустошающее пике">Опустошающее пике</a>').openPopup().addTo(gZakl);
        L.marker([2056.0, 3081.0], {icon: idive2}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Нисходящая тьма">Нисходящая тьма</a>').openPopup().addTo(gZakl);
        }
        //Ключи   
        function mKeys() {
        L.marker([1072.0, 665.0], {icon: ikeyt}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Проездной">Проездной</a>').openPopup().addTo(gKeys);
        L.marker([1336.0, 1116.0], {icon: ikeyl}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Ключ любви">Ключ любви</a>').openPopup().addTo(gKeys);
        L.marker([2319.0, 2577.0], {icon: ikeyk}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Ключ лавочника">Ключ лавочника</a>').openPopup().addTo(gKeys);
        L.marker([1486.0, 2237.0], {icon: ikey}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Простой_ключ">Простой ключ</a>').openPopup().addTo(gKeys);
        L.marker([439.0, 1910.0], {icon: ikey}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Простой_ключ">Простой ключ</a>').openPopup().addTo(gKeys);
        L.marker([1468.0, 3853.0], {icon: ikey}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Простой_ключ">Простой ключ</a>').openPopup().addTo(gKeys);
        }
 
 
 
        /***Фильтры***/
        L.control.layers(null, {
            '<img  src="https://hollowknight.fandom.com/ru/wiki/Special:Filepath/BEMap_filter.png?width=32" /> Грезящие': gBeast,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Bench_green.png?width=32" /> Скамейки': gBench,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Grubmap.png?width=32" /> Гусенички': gGrub,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Hunter.png?width=32" /> NPC': gNPC,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Stag.png?width=32" /> Вокзалы': gStag,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Tree.png?width=32" /> Шепчущие корни': gRoot,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Warriors_Grave.png?width=32" /> Воины грёз': gDreamwar,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Cocoon.png?width=32" /> Коконы живокрови': gCocoon,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Springs.png?width=32" /> Горячие ключи': gSpr,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Tram.png?width=32" /> Трамваи': gTram,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Idolmap.png?width=32" /> Идолы Короля': gKingidol,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Arcanemap.png?width=32" /> Загадочные яйца': gArcegg,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Sealmap.png?width=32" /> Печати Халлоунеста': gSeal,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Journalmap.png?width=32" /> Дневники странника': gJournal,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Mushmap.png?width=32" /> Господин Гриб': gGrib,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Cormap.png?width=32" /> Корнифер': gCorn,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Vesselmapi.png?width=32" /> Черепки сосуда': gVesfrag,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Maskmap.png?width=32" /> Осколки маски': gMask,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Oremap.png?width=32" /> Бледная руда': gOre,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Dreamshield.png?width=32" /> Амулеты': gAmul,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Клеймо_Короля.png?width=32" /> Способности': gSpos,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Icon HK Focus.png?width=32" /> Заклинания': gZakl,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/special:Filepath/Simple Key.png?width=32" /> Ключи': gKeys,
        }, {
            collapsed: false
        }).addTo(map);
 
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