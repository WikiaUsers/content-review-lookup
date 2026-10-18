/* ##########################################################
   ##########################################################
   VALKENHEIM MAP — FINAL PRODUCTION SYSTEM
   FANDOM-COMPATIBLE VERSION
   Version: 2026-10-15 — political overlay
   ##########################################################
   ########################################################## */

(function () {

    'use strict';


    /* =========================================================
       ЗАЩИТА ОТ ПОВТОРНОЙ УСТАНОВКИ
       ========================================================= */

    if (
        window.ValkenheimMapFinal &&
        window.ValkenheimMapFinal.installed
    ) {
        return;
    }


    var STATE = {

        installed: true,

        version:
            '2026-10-15-political-overlay-042',

        map: null,

        customMarkers: [],

        imageSizeCache: {},

        applying: false,

        initialized: false,

        observer: null,

        interval: null,

        /* Political layer: separate from the 165 markers */
        politicalMap: null,

        politicalOverlay: null,

        politicalButton: null,

        politicalEnabled: false

    };


    window.ValkenheimMapFinal =
        STATE;



    /* =========================================================
       ОСНОВНЫЕ РАЗМЕРЫ
       ========================================================= */

    var EXPECTED_MARKERS =
        165;


    var SPECIAL_SIZE =
        46;


    var SETTLEMENT_SIZE =
        46;


    var REGIONAL_CAPITAL_HEIGHT =
        66;


    var KATTEGAT_HEIGHT =
        86;


    /* Confirmed user setting. Keep fixed. */
    var POLITICAL_OPACITY =
        0.42;

    var POLITICAL_ASSET =
        'Valkenheim_Political_Overlay.png';



    /* =========================================================
       URL ФАЙЛОВ FANDOM
       ========================================================= */

    function fileUrl(asset) {

        var filename =
            asset;


        if (
            !/\.[a-z0-9]+$/i.test(filename)
        ) {
            filename += '.png';
        }


        return (
            'https://timaon.fandom.com/ru/wiki/' +
            'Special:Redirect/file/' +
            encodeURIComponent(filename)
        );

    }



    /* =========================================================
       ВЕЛИКИЕ КЛАНЫ / РЕГИОНЫ
       ========================================================= */

    var REGIONS = [

        {
            min: 2,
            max: 12,
            key: 'Ulfarlingi',
            owner: 'Ульфарлинги'
        },

        {
            min: 13,
            max: 21,
            key: 'Skjoldingi',
            owner: 'Скьёлдинги'
        },

        {
            min: 22,
            max: 31,
            key: 'Hrafnlingi',
            owner: 'Храфнлинги'
        },

        {
            min: 33,
            max: 42,
            key: 'Skellingi',
            owner: 'Скеллинги'
        },

        {
            min: 43,
            max: 58,
            key: 'Jarnbjorlingi',
            owner: 'Ярнбьёрлинги'
        },

        {
            min: 59,
            max: 74,
            key: 'Sparfuglingi',
            owner: 'Спарфуглинги'
        },

        {
            min: 75,
            max: 104,
            key: 'Isagar',
            owner: 'Исагар'
        }

    ];


    function getRegion(id) {

        var n =
            Number(id);

        var i;


        for (
            i = 0;
            i < REGIONS.length;
            i++
        ) {

            if (
                n >= REGIONS[i].min &&
                n <= REGIONS[i].max
            ) {
                return REGIONS[i];
            }

        }


        return null;

    }



    /* =========================================================
       СТОЛИЦЫ ВЕЛИКИХ КЛАНОВ
       ========================================================= */

    var CAPITAL_IDS = {

        2: true,
        19: true,
        24: true,
        34: true,
        51: true,
        68: true,
        91: true

    };



    /* =========================================================
       МАЛЫЕ КЛАНЫ
       ID → КЛАН + ФАЙЛ ГЕРБА
       ========================================================= */

    var MINOR_CLANS = {


        /* УЛЬФЕНХЕЙМ */

        3: {
            key: 'Eiklingi',
            owner: 'Эйклинги',
            asset: 'Valkenheim_Eiklingi_Clan.png'
        },

        4: {
            key: 'Vardlingi',
            owner: 'Вардлинги',
            asset: 'Valkenheim_Vardlingi_Clan.png'
        },

        5: {
            key: 'Strondingi',
            owner: 'Строндинги',
            asset: 'Valkenheim_Strondingi_Clan.png'
        },

        10: {
            key: 'Eidr',
            owner: 'Эйдр',
            asset: 'Valkenheim_Eidr_Clan.png'
        },

        11: {
            key: 'Eidr',
            owner: 'Эйдр',
            asset: 'Valkenheim_Eidr_Clan.png'
        },

        12: {
            key: 'Kjolr',
            owner: 'Кьёльр',
            asset: 'Valkenheim_Kjolr_Clan.png'
        },


        /* СКЬЁЛЬДСТРАНД */

        13: {
            key: 'Grotlingi',
            owner: 'Грётлинги',
            asset: 'Valkenheim_Grotlingi_Clan.png'
        },

        15: {
            key: 'Falkr',
            owner: 'Фалькр',
            asset: 'Valkenheim_Falkr_Clan.png'
        },

        16: {
            key: 'Sundlingi',
            owner: 'Сундлинги',
            asset: 'Valkenheim_Sundlingi_Clan.png'
        },

        17: {
            key: 'Brimlingi',
            owner: 'Бримлинги',
            asset: 'Valkenheim_Brimlingi_Clan.png'
        },


        /* ХРАФНФЬОРД */

        22: {
            key: 'Mirklingi',
            owner: 'Мирклинги',
            asset: 'Valkenheim_Mirklingi_Clan.png'
        },

        26: {
            key: 'Tanglingi',
            owner: 'Танглинги',
            asset: 'Valkenheim_Tanglingi_Clan.png'
        },

        29: {
            key: 'Leydar',
            owner: 'Лейдар',
            asset: 'Valkenheim_Leydar_Clan.png'
        },

        30: {
            key: 'Hauglingi',
            owner: 'Хауглинги',
            asset: 'Valkenheim_Hauglingi_Clan.png'
        },


        /* СОЛЬВАНГ */

        33: {
            key: 'Naglfarlingi',
            owner: 'Нагльфарлинги',
            asset: 'Valkenheim_Naglfarlingi_Clan.png'
        },

        35: {
            key: 'Undreyar',
            owner: 'Ундреяр',
            asset: 'Valkenheim_Undreyar_Clan.png'
        },

        38: {
            key: 'Hjaldingi',
            owner: 'Хьяльдинги',
            asset: 'Valkenheim_Hjaldingi_Clan.png'
        },

        39: {
            key: 'Naglfarlingi',
            owner: 'Нагльфарлинги',
            asset: 'Valkenheim_Naglfarlingi_Clan.png'
        },

        40: {
            key: 'Ljoslingi',
            owner: 'Льослинги',
            asset: 'Valkenheim_Ljoslingi_Clan.png'
        },

        41: {
            key: 'Naglfarlingi',
            owner: 'Нагльфарлинги',
            asset: 'Valkenheim_Naglfarlingi_Clan.png'
        },


        /* ЯРНДАЛЬ */

        44: {
            key: 'Vargovingi',
            owner: 'Варговинги',
            asset: 'Valkenheim_Vargovingi_Clan.png'
        },

        46: {
            key: 'Skollungi',
            owner: 'Сколлунги',
            asset: 'Valkenheim_Skollungi_Clan.png'
        },

        47: {
            key: 'Skollungi',
            owner: 'Сколлунги',
            asset: 'Valkenheim_Skollungi_Clan.png'
        },

        53: {
            key: 'Tordingi',
            owner: 'Тординги',
            asset: 'Valkenheim_Tordingi_Clan.png'
        },

        54: {
            key: 'Tordingi',
            owner: 'Тординги',
            asset: 'Valkenheim_Tordingi_Clan.png'
        },

        57: {
            key: 'Skarlingi',
            owner: 'Скарлинги',
            asset: 'Valkenheim_Skarlingi_Clan.png'
        },

        58: {
            key: 'Tordingi',
            owner: 'Тординги',
            asset: 'Valkenheim_Tordingi_Clan.png'
        },


        /* НОРДХЕЙМ */

        59: {
            key: 'Svartr',
            owner: 'Свартр',
            asset: 'Valkenheim_Svartr_Clan.png'
        },

        60: {
            key: 'Veglingi',
            owner: 'Веглинги',
            asset: 'Valkenheim_Veglingi_Clan.png'
        },

        62: {
            key: 'Frostlingi',
            owner: 'Фростлинги',
            asset: 'Valkenheim_Frostlingi_Clan.png'
        },

        64: {
            key: 'Havnlingi',
            owner: 'Хавнлинги',
            asset: 'Valkenheim_Havnlingi_Clan.png'
        },

        70: {
            key: 'Svartr',
            owner: 'Свартр',
            asset: 'Valkenheim_Svartr_Clan.png'
        },


        /* ИМИРХЕЙМ — ИСОРВАР */

        75: {
            key: 'Isorvar',
            owner: 'Исорвар',
            asset: 'Valkenheim_Isorvar_Clan.png'
        },

        93: {
            key: 'Isorvar',
            owner: 'Исорвар',
            asset: 'Valkenheim_Isorvar_Clan.png'
        },

        94: {
            key: 'Isorvar',
            owner: 'Исорвар',
            asset: 'Valkenheim_Isorvar_Clan.png'
        },

        95: {
            key: 'Isorvar',
            owner: 'Исорвар',
            asset: 'Valkenheim_Isorvar_Clan.png'
        },


        /* ИМИРХЕЙМ — ДРАУГБАНАР */

        76: {
            key: 'Draugbanar',
            owner: 'Драугбанар',
            asset: 'Valkenheim_Draugbanar_Clan.png'
        },

        97: {
            key: 'Draugbanar',
            owner: 'Драугбанар',
            asset: 'Valkenheim_Draugbanar_Clan.png'
        },

        98: {
            key: 'Draugbanar',
            owner: 'Драугбанар',
            asset: 'Valkenheim_Draugbanar_Clan.png'
        },

        99: {
            key: 'Draugbanar',
            owner: 'Драугбанар',
            asset: 'Valkenheim_Draugbanar_Clan.png'
        },


        /* ИМИРХЕЙМ — ВАРНЛИНГИ */

        77: {
            key: 'Varnlingi',
            owner: 'Варнлинги',
            asset: 'Valkenheim_Varnlingi_Clan.png'
        },

        78: {
            key: 'Varnlingi',
            owner: 'Варнлинги',
            asset: 'Valkenheim_Varnlingi_Clan.png'
        },

        79: {
            key: 'Varnlingi',
            owner: 'Варнлинги',
            asset: 'Valkenheim_Varnlingi_Clan.png'
        },


        /* ИМИРХЕЙМ — САРЛИНГИ */

        82: {
            key: 'Sarlingi',
            owner: 'Сарлинги',
            asset: 'Valkenheim_Sarlingi_Clan.png'
        },

        83: {
            key: 'Sarlingi',
            owner: 'Сарлинги',
            asset: 'Valkenheim_Sarlingi_Clan.png'
        },

        85: {
            key: 'Sarlingi',
            owner: 'Сарлинги',
            asset: 'Valkenheim_Sarlingi_Clan.png'
        },

        96: {
            key: 'Sarlingi',
            owner: 'Сарлинги',
            asset: 'Valkenheim_Sarlingi_Clan.png'
        },


        /* ИМИРХЕЙМ — ЭИСЛИНГИ */

        84: {
            key: 'Eislingi',
            owner: 'Эислинги',
            asset: 'Valkenheim_Eislingi_Clan.png'
        },

        88: {
            key: 'Eislingi',
            owner: 'Эислинги',
            asset: 'Valkenheim_Eislingi_Clan.png'
        },

        89: {
            key: 'Eislingi',
            owner: 'Эислинги',
            asset: 'Valkenheim_Eislingi_Clan.png'
        },

        90: {
            key: 'Eislingi',
            owner: 'Эислинги',
            asset: 'Valkenheim_Eislingi_Clan.png'
        },


        /* ИМИРХЕЙМ — ХВИТВАРГИ */

        100: {
            key: 'Hvitvargi',
            owner: 'Хвитварги',
            asset: 'Valkenheim_Hvitvargi_Clan.png'
        },

        101: {
            key: 'Hvitvargi',
            owner: 'Хвитварги',
            asset: 'Valkenheim_Hvitvargi_Clan.png'
        },

        102: {
            key: 'Hvitvargi',
            owner: 'Хвитварги',
            asset: 'Valkenheim_Hvitvargi_Clan.png'
        },

        104: {
            key: 'Hvitvargi',
            owner: 'Хвитварги',
            asset: 'Valkenheim_Hvitvargi_Clan.png'
        }

    };



    /* =========================================================
       СПЕЦИАЛЬНЫЕ ИКОНКИ
       ========================================================= */

    function getSpecialAsset(id) {

        var n =
            Number(id);


        if (
            n >= 105 &&
            n <= 116
        ) {
            return 'Valkenheim_Cave_Icon';
        }


        if (
            n >= 117 &&
            n <= 124
        ) {
            return 'Valkenheim_Mengir_Icon';
        }


        if (
            n >= 125 &&
            n <= 134
        ) {
            return 'Valkenheim_Runic_Stone';
        }


        if (
            n >= 135 &&
            n <= 139
        ) {
            return 'Valkenheim_Runic_Book_Icon';
        }


        if (
            n >= 140 &&
            n <= 146
        ) {
            return 'Valkenheim_Trikvestr_Icon';
        }


        if (
            n >= 147 &&
            n <= 150
        ) {
            return 'Valkenheim_Odin_Face_Icon';
        }


        if (
            n === 45 ||
            n === 72 ||
            (
                n >= 151 &&
                n <= 156
            )
        ) {
            return 'Valkenheim_Burial_Mound_Icon';
        }


        if (
            n >= 157 &&
            n <= 162
        ) {
            return 'Valkenheim_Treausure_Chest_Icon';
        }


        if (
            n === 18 ||
            n === 42 ||
            n === 55 ||
            n === 61 ||
            (
                n >= 163 &&
                n <= 166
            )
        ) {
            return 'Valkenheim_Ruins_Icon';
        }


        if (
            n === 32 ||
            n === 49 ||
            n === 65
        ) {
            return 'Valkenheim_Altar_Icon';
        }


        return null;

    }



    /* =========================================================
       ПОИСК LEAFLET MAP ЧЕРЕЗ REACT FIBER
       ========================================================= */

    function findMapInFiber(container) {

        if (
            !container ||
            typeof L === 'undefined'
        ) {
            return null;
        }


        var keys =
            Object.keys(container);


        var reactKeys =
            [];


        var i;


        for (
            i = 0;
            i < keys.length;
            i++
        ) {

            if (
                keys[i].indexOf(
                    '__reactFiber$'
                ) === 0 ||
                keys[i].indexOf(
                    '__reactInternalInstance$'
                ) === 0
            ) {
                reactKeys.push(
                    keys[i]
                );
            }

        }


        var r;


        for (
            r = 0;
            r < reactKeys.length;
            r++
        ) {

            var root =
                container[
                    reactKeys[r]
                ];


            if (!root) {
                continue;
            }


            var queue =
                [root];


            var seen =
                [];


            var scanned =
                0;


            while (
                queue.length &&
                scanned < 12000
            ) {

                var node =
                    queue.shift();


                if (!node) {
                    continue;
                }


                if (
                    seen.indexOf(node) !== -1
                ) {
                    continue;
                }


                seen.push(node);

                scanned++;


                var candidate;


                if (
                    node.pendingProps &&
                    node.pendingProps.value &&
                    node.pendingProps.value.map
                ) {

                    candidate =
                        node.pendingProps.value.map;


                    if (
                        candidate instanceof L.Map
                    ) {
                        return candidate;
                    }

                }


                if (
                    node.memoizedProps &&
                    node.memoizedProps.value &&
                    node.memoizedProps.value.map
                ) {

                    candidate =
                        node.memoizedProps.value.map;


                    if (
                        candidate instanceof L.Map
                    ) {
                        return candidate;
                    }

                }


                if (
                    node.stateNode &&
                    node.stateNode instanceof L.Map
                ) {

                    return node.stateNode;

                }


                if (
                    node.memoizedState &&
                    node.memoizedState.map &&
                    node.memoizedState.map instanceof L.Map
                ) {

                    return node.memoizedState.map;

                }


                if (node.child) {
                    queue.push(
                        node.child
                    );
                }


                if (node.sibling) {
                    queue.push(
                        node.sibling
                    );
                }


                if (node.return) {
                    queue.push(
                        node.return
                    );
                }

            }

        }


        return null;

    }



    function getMap() {

        if (
            STATE.map &&
            typeof L !== 'undefined' &&
            STATE.map instanceof L.Map
        ) {

            var oldContainer =
                STATE.map.getContainer();


            if (
                oldContainer &&
                oldContainer.isConnected
            ) {
                return STATE.map;
            }

        }


        var containers =
            document.querySelectorAll(
                '.leaflet-container'
            );


        var i;


        for (
            i = 0;
            i < containers.length;
            i++
        ) {

            var map =
                findMapInFiber(
                    containers[i]
                );


            if (map) {
                return map;
            }

        }


        return null;

    }



    /* =========================================================
       ПОИСК ЖИВОГО CANVAS-СЛОЯ FANDOM
       ========================================================= */

    function getLiveMarkerLayer(map) {

        if (!map) {
            return null;
        }


        var canvases =
            document.querySelectorAll(
                'canvas.leaflet-canvas-layer'
            );


        var layerKeys =
            Object.keys(
                map._layers || {}
            );


        var i;
        var j;


        for (
            i = 0;
            i < canvases.length;
            i++
        ) {

            var canvas =
                canvases[i];


            if (
                !canvas.isConnected
            ) {
                continue;
            }


            for (
                j = 0;
                j < layerKeys.length;
                j++
            ) {

                var layer =
                    map._layers[
                        layerKeys[j]
                    ];


                if (
                    layer &&
                    layer._canvas === canvas &&
                    layer._canvas &&
                    layer._canvas.isConnected &&
                    Array.isArray(
                        layer._markers
                    )
                ) {
                    return layer;
                }

            }

        }


        return null;

    }



    /* =========================================================
       ПРОВЕРКА DATASET
       ========================================================= */

    function isValkenheimDataset(markers) {

        if (
            !Array.isArray(markers) ||
            markers.length !==
                EXPECTED_MARKERS
        ) {
            return false;
        }


        var hasKattegat =
            false;

        var hasCave =
            false;

        var hasFinalRuin =
            false;


        var i;


        for (
            i = 0;
            i < markers.length;
            i++
        ) {

            var marker =
                markers[i];

            var raw =
                marker &&
                marker.options
                    ? marker.options.raw
                    : null;

            var title =
                raw &&
                raw.popup
                    ? raw.popup.title
                    : null;


            if (
                title === 'Каттегат'
            ) {
                hasKattegat =
                    true;
            }


            if (
                title === 'Эйкхеллир'
            ) {
                hasCave =
                    true;
            }


            if (
                title === 'Форнхвелв'
            ) {
                hasFinalRuin =
                    true;
            }

        }


        return (
            hasKattegat &&
            hasCave &&
            hasFinalRuin
        );

    }



    /* =========================================================
       NATURAL SIZE
       ========================================================= */

    function getNaturalSize(url) {

        if (
            STATE.imageSizeCache[url]
        ) {

            return STATE
                .imageSizeCache[url];

        }


        var promise =
            new Promise(
                function (resolve) {

                    var img =
                        new Image();


                    var finished =
                        false;


                    function done(
                        width,
                        height
                    ) {

                        if (finished) {
                            return;
                        }


                        finished =
                            true;


                        resolve({

                            width:
                                width || 1,

                            height:
                                height || 1

                        });

                    }


                    img.onload =
                        function () {

                            done(
                                img.naturalWidth,
                                img.naturalHeight
                            );

                        };


                    img.onerror =
                        function () {

                            done(
                                1,
                                1
                            );

                        };


                    img.src =
                        url;


                    window.setTimeout(

                        function () {

                            done(
                                1,
                                1
                            );

                        },

                        5000

                    );

                }
            );


        STATE.imageSizeCache[url] =
            promise;


        return promise;

    }



    /* =========================================================
       ВЫБОР ИКОНКИ
       ========================================================= */

    function getRenderSpec(id) {

        var n =
            Number(id);


        var specialAsset =
            getSpecialAsset(n);


        if (
            specialAsset
        ) {

            return {

                kind:
                    'special',

                asset:
                    specialAsset,

                proportional:
                    false,

                width:
                    SPECIAL_SIZE,

                height:
                    SPECIAL_SIZE,

                zIndexOffset:
                    1000,

                owner:
                    null,

                clan:
                    null

            };

        }


        if (
            CAPITAL_IDS[n]
        ) {

            var capitalRegion =
                getRegion(n);


            if (
                !capitalRegion
            ) {
                return null;
            }


            return {

                kind:
                    'capital',

                asset:
                    'Valkenheim_' +
                    capitalRegion.key +
                    '_Capital_Icon',

                proportional:
                    true,

                targetHeight:
                    n === 2
                        ? KATTEGAT_HEIGHT
                        : REGIONAL_CAPITAL_HEIGHT,

                zIndexOffset:
                    1200,

                owner:
                    capitalRegion.owner,

                clan:
                    capitalRegion.key

            };

        }


        if (
            MINOR_CLANS[n]
        ) {

            var minor =
                MINOR_CLANS[n];


            return {

                kind:
                    'minor-clan',

                asset:
                    minor.asset,

                proportional:
                    true,

                targetHeight:
                    SETTLEMENT_SIZE,

                zIndexOffset:
                    1100,

                owner:
                    minor.owner,

                clan:
                    minor.key

            };

        }


        var region =
            getRegion(n);


        if (
            region
        ) {

            return {

                kind:
                    'settlement',

                asset:
                    'Valkenheim_' +
                    region.key +
                    '_Settlement_Icon',

                proportional:
                    false,

                width:
                    SETTLEMENT_SIZE,

                height:
                    SETTLEMENT_SIZE,

                zIndexOffset:
                    1100,

                owner:
                    region.owner,

                clan:
                    region.key

            };

        }


        return null;

    }



    /* =========================================================
       РАЗМЕРЫ ИКОНКИ
       ========================================================= */

    function resolveDimensions(spec) {

        if (
            !spec.proportional
        ) {

            return Promise.resolve({

                width:
                    spec.width,

                height:
                    spec.height

            });

        }


        var url =
            fileUrl(
                spec.asset
            );


        return getNaturalSize(url)
            .then(
                function (natural) {

                    var ratio =
                        natural.height
                            ? natural.width /
                              natural.height
                            : 1;


                    var height =
                        spec.targetHeight;


                    var width =
                        Math.max(

                            1,

                            Math.round(
                                height * ratio
                            )

                        );


                    return {

                        width:
                            width,

                        height:
                            height

                    };

                }
            );

    }



    /* =========================================================
       УДАЛЕНИЕ НАШИХ СТАРЫХ МАРКЕРОВ
       ========================================================= */

    function removeCustomMarkers() {

        var i;


        for (
            i = 0;
            i < STATE.customMarkers.length;
            i++
        ) {

            var marker =
                STATE.customMarkers[i];


            try {

                if (
                    marker &&
                    typeof marker.remove ===
                        'function'
                ) {

                    marker.remove();

                }

            } catch (error) {}

        }


        STATE.customMarkers =
            [];

    }



    /* =========================================================
       ПРОВЕРКА НАШЕГО СЛОЯ
       ========================================================= */

    function customLayerIsAlive(map) {

        if (
            STATE.customMarkers.length !==
            EXPECTED_MARKERS
        ) {
            return false;
        }


        var i;


        for (
            i = 0;
            i < STATE.customMarkers.length;
            i++
        ) {

            var marker =
                STATE.customMarkers[i];


            if (
                !marker ||
                marker._map !== map ||
                !map.hasLayer(marker)
            ) {
                return false;
            }

        }


        return true;

    }



    /* =========================================================
       СОЗДАНИЕ 165 DOM-МАРКЕРОВ
       ========================================================= */

    function buildCustomMarkers(
        map,
        sourceData
    ) {

        removeCustomMarkers();


        var preparedPromises =
            [];


        var i;


        for (
            i = 0;
            i < sourceData.length;
            i++
        ) {

            (function (source) {

                var spec =
                    getRenderSpec(
                        source.id
                    );


                if (!spec) {

                    preparedPromises.push(
                        Promise.resolve({

                            source:
                                source,

                            spec:
                                null,

                            dimensions:
                                null

                        })
                    );


                    return;

                }


                preparedPromises.push(

                    resolveDimensions(spec)
                        .then(
                            function (
                                dimensions
                            ) {

                                return {

                                    source:
                                        source,

                                    spec:
                                        spec,

                                    dimensions:
                                        dimensions

                                };

                            }
                        )

                );

            })(
                sourceData[i]
            );

        }


        return Promise
            .all(
                preparedPromises
            )
            .then(
                function (prepared) {

                    var j;


                    for (
                        j = 0;
                        j < prepared.length;
                        j++
                    ) {

                        if (
                            !prepared[j].spec ||
                            !prepared[j].dimensions
                        ) {

                            console.error(
                                '[VALKENHEIM MAP] Unknown marker configuration:',
                                prepared[j]
                            );


                            return false;

                        }

                    }


                    for (
                        j = 0;
                        j < prepared.length;
                        j++
                    ) {

                        var item =
                            prepared[j];


                        var source =
                            item.source;


                        var spec =
                            item.spec;


                        var dimensions =
                            item.dimensions;


                        var iconUrl =
                            fileUrl(
                                spec.asset
                            );


                        var icon =
                            L.icon({

                                iconUrl:
                                    iconUrl,

                                iconSize: [

                                    dimensions.width,

                                    dimensions.height

                                ],

                                iconAnchor: [

                                    dimensions.width / 2,

                                    dimensions.height / 2

                                ]

                            });


                        var marker =
                            L.marker(

                                source.latlng,

                                {

                                    icon:
                                        icon,

                                    interactive:
                                        true,

                                    bubblingMouseEvents:
                                        false,

                                    zIndexOffset:
                                        spec.zIndexOffset

                                }

                            );


                        marker.addTo(map);


                        /* -------------------------------------
                           TOOLTIP
                           ------------------------------------- */

                        var rawX =
                            500;


                        if (
                            Array.isArray(
                                source.position
                            )
                        ) {

                            rawX =
                                source.position[0];

                        }


                        var direction =
                            rawX < 200
                                ? 'right'
                                : 'left';


                        var distance;


                        if (
                            spec.kind ===
                            'special'
                        ) {

                            distance =
                                22;

                        } else if (
                            spec.kind ===
                            'settlement'
                        ) {

                            distance =
                                21;

                        } else {

                            distance =
                                Math.round(
                                    dimensions.width /
                                    2
                                ) + 2;

                        }


                        var offset;


                        if (
                            direction ===
                            'right'
                        ) {

                            offset = [
                                distance,
                                0
                            ];

                        } else {

                            offset = [
                                -distance,
                                0
                            ];

                        }


                        marker.bindTooltip(

                            source.title,

                            {

                                permanent:
                                    false,

                                direction:
                                    direction,

                                offset:
                                    offset,

                                opacity:
                                    1,

                                className:
                                    'valkenheim-fandom-tooltip'

                            }

                        );


                        marker.valkenheim = {

                            id:
                                source.id,

                            title:
                                source.title,

                            type:
                                spec.kind,

                            clan:
                                spec.clan,

                            ownerClan:
                                spec.owner,

                            asset:
                                spec.asset,

                            iconSize: {

                                width:
                                    dimensions.width,

                                height:
                                    dimensions.height

                            }

                        };


                        STATE.customMarkers.push(
                            marker
                        );

                    }


                    return (
                        STATE.customMarkers.length ===
                        EXPECTED_MARKERS
                    );

                }
            );

    }



    /* =========================================================
       POLITICAL OVERLAY — CLAN TERRITORIES
       L.ImageOverlay above the base image, below markers.
       Reconciled with Fandom React redraws.
       ========================================================= */

    function findFiltersControl(map) {

        var container = map.getContainer();
        var root = container;
        var level;
        var controls;
        var i;
        var label;

        /* Find the Fandom filter within this map's ancestors. */
        for (level = 0; root && level < 8; level++) {

            controls = root.querySelectorAll(
                'button, [role="button"]'
            );

            for (i = 0; i < controls.length; i++) {
                label = (controls[i].textContent || '')
                    .replace(/\s+/g, ' ')
                    .replace(/^\s+|\s+$/g, '');

                if (
                    label.length < 48 &&
                    /^FILTERS/i.test(label) &&
                    controls[i].isConnected
                ) {
                    return controls[i];
                }
            }

            root = root.parentElement;
        }

        return null;
    }


    function updatePoliticalButton() {

        var button = STATE.politicalButton;

        if (!button) {
            return;
        }

        button.textContent = STATE.politicalEnabled
            ? 'ТЕРРИТОРИИ КЛАНОВ: ВКЛ'
            : 'ТЕРРИТОРИИ КЛАНОВ: ВЫКЛ';

        button.setAttribute(
            'aria-pressed',
            STATE.politicalEnabled ? 'true' : 'false'
        );

        button.style.backgroundColor = STATE.politicalEnabled
            ? '#48b8bb' : '#26383d';

        button.style.color = STATE.politicalEnabled
            ? '#07151a' : '#d5e7e7';

        button.style.borderColor = STATE.politicalEnabled
            ? '#70ccce' : '#5b8588';
    }


    function ensurePoliticalButton(map) {

        var button = STATE.politicalButton;

        if (!button) {
            button = document.createElement('button');
            button.type = 'button';
            button.className = 'valkenheim-political-toggle';
            button.title = 'Показать или скрыть территории кланов';
            button.style.cssText =
                'display:inline-block;' +
                'vertical-align:middle;' +
                'margin-left:10px;' +
                'padding:9px 14px;' +
                'border:1px solid #5b8588;' +
                'border-radius:20px;' +
                'font:700 12px Arial,sans-serif;' +
                'letter-spacing:0.01em;' +
                'white-space:nowrap;' +
                'cursor:pointer;' +
                'box-shadow:0 2px 5px rgba(0,0,0,.25);';

            button.onclick = function (event) {
                event.preventDefault();
                event.stopPropagation();

                STATE.politicalEnabled =
                    !STATE.politicalEnabled;

                if (STATE.politicalOverlay) {
                    STATE.politicalOverlay.setOpacity(
                        STATE.politicalEnabled
                            ? POLITICAL_OPACITY : 0
                    );
                }

                updatePoliticalButton();
            };

            if (L.DomEvent && L.DomEvent.disableClickPropagation) {
                L.DomEvent.disableClickPropagation(button);
            }

            STATE.politicalButton = button;
            updatePoliticalButton();
        }

        var filterControl = findFiltersControl(map);
        var parent;

        if (filterControl && filterControl.parentNode) {
            parent = filterControl.parentNode;

            button.style.position = 'relative';
            button.style.top = 'auto';
            button.style.left = 'auto';
            button.style.zIndex = 'auto';

            /* An immediate sibling of FILTERS, outside map image. */
            if (
                button.parentNode !== parent ||
                button.previousSibling !== filterControl
            ) {
                parent.insertBefore(
                    button,
                    filterControl.nextSibling
                );
            }
        } else {
            /* Safety fallback if Fandom changes its toolbar DOM. */
            parent = map.getContainer();

            button.style.position = 'absolute';
            button.style.top = '12px';
            button.style.left = '12px';
            button.style.zIndex = '1000';
            button.style.marginLeft = '0';

            if (button.parentNode !== parent) {
                parent.appendChild(button);
            }
        }
    }


    function ensurePoliticalOverlay(map) {

        if (!map || typeof L === 'undefined') {
            return;
        }

        if (STATE.politicalMap !== map) {
            if (
                STATE.politicalMap &&
                STATE.politicalOverlay &&
                STATE.politicalMap.hasLayer(
                    STATE.politicalOverlay
                )
            ) {
                STATE.politicalMap.removeLayer(
                    STATE.politicalOverlay
                );
            }

            STATE.politicalOverlay = null;
            STATE.politicalMap = null;
        }

        if (!STATE.politicalOverlay) {
            var baseLayer = null;
            var url = fileUrl(POLITICAL_ASSET);

            map.eachLayer(function (layer) {
                if (
                    !baseLayer &&
                    layer._url &&
                    layer._url !== url &&
                    typeof layer.getBounds === 'function'
                ) {
                    baseLayer = layer;
                }
            });

            if (!baseLayer) {
                return;
            }

            /* Reuse the exact registered image bounds. */
            STATE.politicalOverlay = L.imageOverlay(
                url,
                baseLayer.getBounds(),
                {
                    opacity: STATE.politicalEnabled
                        ? POLITICAL_OPACITY : 0,
                    interactive: false,
                    className: 'valkenheim-political-overlay'
                }
            );

            STATE.politicalOverlay.on('error', function () {
                console.error(
                    '[VALKENHEIM MAP] Political overlay failed to load:',
                    url
                );
            });

            STATE.politicalMap = map;
        }

        if (!map.hasLayer(STATE.politicalOverlay)) {
            STATE.politicalOverlay.addTo(map);
        }

        ensurePoliticalButton(map);
    }


    /* =========================================================
       СБРОС ФЛАГА APPLYING
       ========================================================= */

    function releaseApplyLock() {

        STATE.applying =
            false;

    }



    /* =========================================================
       ОСНОВНАЯ СИНХРОНИЗАЦИЯ
       ========================================================= */

    function reconcile() {

        if (
            STATE.applying
        ) {
            return;
        }


        if (
            typeof L ===
            'undefined'
        ) {
            return;
        }


        STATE.applying =
            true;


        try {

            var map =
                getMap();


            if (!map) {

                releaseApplyLock();

                return;

            }


            var mapChanged =
                STATE.map !== map;


            STATE.map =
                map;


            var markerLayer =
                getLiveMarkerLayer(
                    map
                );


            if (!markerLayer) {

                releaseApplyLock();

                return;

            }


            var fandomMarkers =
                markerLayer._markers;


            if (
                !Array.isArray(
                    fandomMarkers
                )
            ) {

                releaseApplyLock();

                return;

            }


            /*
               Если Fandom canvas уже очищен,
               наши DOM-маркеры просто продолжают жить.
            */

            if (
                fandomMarkers.length ===
                0
            ) {

                if (customLayerIsAlive(map)) {
                    ensurePoliticalOverlay(map);
                }

                releaseApplyLock();

                return;

            }


            if (
                !isValkenheimDataset(
                    fandomMarkers
                )
            ) {

                releaseApplyLock();

                return;

            }


            /* -----------------------------------------------
               СОХРАНЯЕМ ИСХОДНЫЕ ДАННЫЕ
               ----------------------------------------------- */

            var sourceData =
                [];


            var i;


            for (
                i = 0;
                i < fandomMarkers.length;
                i++
            ) {

                var source =
                    fandomMarkers[i];


                var raw =
                    source &&
                    source.options
                        ? source.options.raw
                        : null;


                if (
                    !raw ||
                    !raw.id ||
                    !raw.popup ||
                    !raw.popup.title
                ) {
                    continue;
                }


                var latlng =
                    null;


                if (
                    typeof source.getLatLng ===
                    'function'
                ) {

                    latlng =
                        source.getLatLng();

                } else {

                    latlng =
                        source._latlng;

                }


                if (!latlng) {
                    continue;
                }


                sourceData.push({

                    id:
                        Number(raw.id),

                    title:
                        raw.popup.title,

                    position:
                        raw.position ||
                        null,

                    latlng:
                        latlng

                });

            }


            sourceData.sort(
                function (a, b) {

                    return (
                        a.id -
                        b.id
                    );

                }
            );


            if (
                sourceData.length !==
                EXPECTED_MARKERS
            ) {

                console.error(
                    '[VALKENHEIM MAP] Unexpected source marker count:',
                    sourceData.length
                );


                releaseApplyLock();

                return;

            }


            /* -----------------------------------------------
               УБИРАЕМ РОЗОВЫЕ FANDOM-МАРКЕРЫ
               ----------------------------------------------- */

            if (
                typeof markerLayer.setMarkers !==
                'function'
            ) {

                console.error(
                    '[VALKENHEIM MAP] setMarkers() unavailable'
                );


                releaseApplyLock();

                return;

            }


            markerLayer.setMarkers([]);


            markerLayer._map =
                map;


            if (
                typeof markerLayer._clearCanvas ===
                'function'
            ) {

                markerLayer._clearCanvas();

            }


            if (
                typeof markerLayer.redraw ===
                'function'
            ) {

                markerLayer.redraw();

            }


            /* -----------------------------------------------
               НУЖНО ЛИ ПЕРЕСОБИРАТЬ НАШ СЛОЙ
               ----------------------------------------------- */

            var needRebuild =

                mapChanged ||

                !customLayerIsAlive(
                    map
                );


            if (
                !needRebuild
            ) {

                STATE.initialized =
                    true;

                ensurePoliticalOverlay(map);

                releaseApplyLock();

                return;

            }


            buildCustomMarkers(
                map,
                sourceData
            )
            .then(
                function (success) {

                    if (!success) {

                        console.error(
                            '[VALKENHEIM MAP] Custom layer build failed'
                        );


                        releaseApplyLock();

                        return;

                    }


                    STATE.initialized =
                        true;

                    ensurePoliticalOverlay(map);

                    console.log(
                        '[VALKENHEIM MAP] FINAL LAYER ACTIVE',
                        {
                            version:
                                STATE.version,

                            markers:
                                STATE.customMarkers.length,

                            specialized:
                                71,

                            stockFandomMarkers:
                                0
                        }
                    );


                    releaseApplyLock();

                }
            )
            .catch(
                function (error) {

                    console.error(
                        '[VALKENHEIM MAP] build error:',
                        error
                    );


                    releaseApplyLock();

                }
            );

        } catch (error) {

            console.error(
                '[VALKENHEIM MAP] reconcile error:',
                error
            );


            releaseApplyLock();

        }

    }



    /* =========================================================
       DEBOUNCE
       ========================================================= */

    var reconcileTimer =
        null;


    function scheduleReconcile() {

        if (
            reconcileTimer
        ) {

            window.clearTimeout(
                reconcileTimer
            );

        }


        reconcileTimer =
            window.setTimeout(

                function () {

                    reconcile();

                },

                120

            );

    }



    /* =========================================================
       ЗАПУСК
       ========================================================= */

    function start() {

        scheduleReconcile();


        STATE.observer =
            new MutationObserver(
                function () {

                    scheduleReconcile();

                }
            );


        STATE.observer.observe(

            document.documentElement,

            {

                childList:
                    true,

                subtree:
                    true

            }

        );


        /*
           Страховочная проверка.
        */

        STATE.interval =
            window.setInterval(

                function () {

                    reconcile();

                },

                2000

            );


        var delays = [

            300,
            700,
            1200,
            2000,
            3500,
            6000

        ];


        var i;


        for (
            i = 0;
            i < delays.length;
            i++
        ) {

            (function (delay) {

                window.setTimeout(

                    function () {

                        reconcile();

                    },

                    delay

                );

            })(
                delays[i]
            );

        }

    }



    /* =========================================================
       DOM READY
       ========================================================= */

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(

            'DOMContentLoaded',

            function () {

                start();

            },

            {
                once: true
            }

        );

    } else {

        start();

    }

})();