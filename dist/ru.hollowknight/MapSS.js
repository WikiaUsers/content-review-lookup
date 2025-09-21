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
        var imageUrl = 'https://hollowknight.fandom.com/ru/wiki/special:Filepath/MapHKInteractiveSS.png';
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
        var iWatcher = new HKIcon36x40({iconUrl: 'https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Watcher.png?width=36'});
 
 
 
        //одинаковые по размеру иконки
        var HKIcon32x32 = L.Icon.extend({
            options: {
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            }
        });
        var iFlea = new HKIcon32x32({iconUrl: 'https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Grubmap.png?width=32'}),
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
            gFlea = L.featureGroup().bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Гусенички" target="_blank">Гусеничка</a>').addTo(map),
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
        mFlea();
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
            /* стоки */
            L.marker([960.0, 2359.0], {icon: iBench}).addTo(gBench);
        }
        //Гусенички
        function mFlea() {
            /* тропа и сады */
            L.marker([2110.0, 800.0], {icon: iFlea}).addTo(gFlea);
            L.marker([1046.0, 3157.0], {icon: iFlea}).addTo(gFlea);
        }
        //NPC
        function mNPC() {
            L.marker([2183.0, 1769.0], {icon: iSly}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Слай">Слай</a>').openPopup().addTo(gNPC);
            L.marker([1155.0, 1758.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
            L.marker([1290.0, 2254.0], {icon: iquir}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Квиррел">Квиррел</a>').openPopup().addTo(gNPC);
        }
        //Вокзалы
        function mStag() {
            L.marker([1954.0, 3314.0], {icon: iStag}).addTo(gStag);
            L.marker([1007.0, 234.0], {icon: iStag}).addTo(gStag);
        }
        //Шепчущие корни
        function mRoot() {
            L.marker([2120.0, 1740.0], {icon: iRoot}).addTo(gRoot);
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
        L.marker([1528.0, 251.0], {icon: iseal}).addTo(gSeal);
        }
        //Дневники 
        function mJournal() {  
        L.marker([1810.0, 3518.0], {icon: ijournal}).addTo(gJournal);
        L.marker([1527.0, 2093.0], {icon: ijournal}).addTo(gJournal);
        }
         //Господин Гриб
        function mGrib() { 
        L.marker([2160.0, 1324.0], {icon: igrib}).addTo(gGrib);
        L.marker([1355.0, 1438.0], {icon: igrib}).addTo(gGrib);
        }
        //Корнифер  
        function mCorn() {
        L.marker([2367.0, 963.0], {icon: icorn}).addTo(gCorn);
        L.marker([1033.0, 3457.0], {icon: icorn}).addTo(gCorn);
        }
        //Черепки сосуда 
        function mVesfrag() {
        L.marker([642.0, 2590.0], {icon: ivesfrag}).addTo(gVesfrag);
        L.marker([1333.0, 3222.0], {icon: ivesfrag}).addTo(gVesfrag);
        }
       //Осколки маски 
        function mMask() {
        L.marker([1941.0, 1681.0], {icon: imask}).addTo(gMask);
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
        L.marker([865.0, 764.0], {icon: iweaversong}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Песнь ткача">Песнь ткача</a>').openPopup().addTo(gAmul);
        }
       //Способности
       function mSpos() {
        L.marker([2091.0, 587.0], {icon: imothcloak}).bindPopup('<a href="https://hollowknight.fandom.com/ru/wiki/Накидка мотылька">Накидка мотылька</a>').openPopup().addTo(gSpos);
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
        }
 











 
 
        /***Фильтры***/
        L.control.layers(null, {
            '<img  src="https://hollowknight.fandom.com/ru/wiki/Special:Filepath/BEMap_filter.png?width=32" /> Грезящие': gBeast,
            '<img  src="https://hollowknight.fandom.com/wiki/Special:Filepath/Map_Pin_Bench_green.png?width=32" /> Скамейки': gBench,
            '<img  src="https://hollowknight.fandom.com/ru/wiki/Special:Filepath/Grubmap.png?width=32" /> Гусенички': gFlea,
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