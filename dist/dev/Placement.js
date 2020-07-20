/**
 * @name            Placement
 * @version         v1.1
 * @author          TheGoldenPatrik1
 * @description     Library for script placement.
 */
;(function (window, $, mw) {
    window.dev = window.dev || {};
    window.dev.placement = window.dev.placement || {};
    if (window.dev.placement.loader !== undefined) {
        return;
    }
    var scriptName;
    var elements = {
        editdropdown: '.page-header__contribution-buttons .wds-dropdown__content .wds-list, .UserProfileActionButton .WikiaMenuElement',
        globalnav: '.wds-global-navigation__user-menu .wds-dropdown__content > .wds-list',
        toolbar: '#WikiaBar .toolbar .tools',
        tools: tools(),
        wikinav: '.wds-community-header__wiki-buttons .wds-dropdown__content .wds-list'        
    };
    /**
     * @method createToolsMenu
     * @description Re-creates the My Tools Menu
     * @returns {void}
     */
    function createToolsMenu () {
        var lang = mw.config.get('wgUserLanguage');
        var i18n = {
            "ab": "Мои инструменты",
            "ace": "Alat saya",
            "af": "My hulpmiddels",
            "als": "Werkzeugkasten",
            "an": "Mis herramientas",
            "ar": "أدواتي",
            "arn": "Mis herramientas",
            "arz": "أدواتي",
            "av": "Мои инструменты",
            "ay": "Mis herramientas",
            "ba": "Мои инструменты",
            "bar": "Werkzeugkasten",
            "bat-smg": "Mano įrankiai",
            "bcc": "ابزارهای من",
            "bg": "Моите инструменти",
            "bjn": "Alat saya",
            "bm": "Mes outils",
            "bqi": "ابزارهای من",
            "br": "Ma ostilhoù",
            "bug": "Alat saya",
            "ca": "Les meves Eines",
            "cbk-zam": "Mis herramientas",
            "ce": "Мои инструменты",
            "ckb": "ئامرازەکانم",
            "crh-cyrl": "Мои инструменты",
            "cs": "Moje nástroje",
            "csb": "Moje narzędzia",
            "cv": "Мои инструменты",
            "de": "Werkzeugkasten",
            "dsb": "Werkzeugkasten",
            "dtp": "Alatan Saya",
            "eml": "I miei strumenti",
            "el": "Τα εργαλεία μου",
            "en": "My Tools",
            "es": "Mis herramientas",
            "fa": "ابزارهای من",
            "ff": "Mes outils",
            "fi": "Omat työkalut",
            "fr": "Mes outils",
            "frp": "Mes outils",
            "frr": "Werkzeugkasten",
            "fur": "I miei strumenti",
            "gan": "我的工具",
            "gan-hans": "我的工具",
            "gan-hant": "我的工具",
            "gl": "As miñas ferramentas",
            "glk": "ابزارهای من",
            "gn": "Mis herramientas",
            "gsw": "Werkzeugkasten",
            "he": "הכלים שלי",
            "hsb": "Werkzeugkasten",
            "ht": "Mes outils",
            "hu": "Saját eszközök",
            "ia": "Mi utensiles",
            "id": "Alat saya",
            "ii": "我的工具",
            "inh": "Мои инструменты",
            "it": "I miei strumenti",
            "ja": "マイツール",
            "jv": "Alat saya",
            "ko": "내 도구",
            "ko-kp": "내 도구",
            "koi": "Мои инструменты",
            "krc": "Мои инструменты",
            "ksh": "Werkzeugkasten",
            "ku-arab": "ئامرازەکانم",
            "kv": "Мои инструменты",
            "lad": "Mis herramientas",
            "lb": "Werkzeugkasten",
            "lbe": "Мои инструменты",
            "lez": "Мои инструменты",
            "lij": "I miei strumenti",
            "lmo": "I miei strumenti",
            "ln": "Mes outils",
            "lt": "Mano įrankiai",
            "map-bms": "Alat saya",
            "mg": "Mes outils",
            "mhr": "Мои инструменты",
            "min": "Alat saya",
            "mk": "Мои алатки",
            "ml": "എന്റെ ഉപകരണങ്ങൾ",
            "mrj": "Мои инструменты",
            "ms": "Alatan Saya",
            "mwl": "Minhas ferramentas",
            "my": "ကိရိယာများ",
            "myv": "Мои инструменты",
            "mzn": "ابزارهای من",
            "nah": "Mis herramientas",
            "nap": "I miei strumenti",
            "nb": "Mine verktøy",
            "nds": "Werkzeugkasten",
            "no": "Mine verktøy",
            "os": "Мои инструменты",
            "pcd": "Mes outils",
            "pdc": "Werkzeugkasten",
            "pdt": "Werkzeugkasten",
            "pfl": "Werkzeugkasten",
            "pl": "Moje narzędzia",
            "pms": "I miei strumenti",
            "ps": "زما اوزارونه",
            "pt": "Minhas ferramentas",
            "pt-br": "Minhas ferramentas",
            "qu": "Mis herramientas",
            "qug": "Mis herramientas",
            "rgn": "I miei strumenti",
            "ru": "Мои инструменты",
            "rue": "Мої інструменти",
            "ruq-cyrl": "Мои алатки",
            "sah": "Мои инструменты",
            "scn": "I miei strumenti",
            "sg": "Mes outils",
            "sgs": "Mano įrankiai",
            "shi": "أدواتي",
            "sli": "Werkzeugkasten",
            "sr": "Алатке",
            "sr-ec": "Алатке",
            "stq": "Werkzeugkasten",
            "su": "Alat saya",
            "sv": "Mina Verktyg",
            "szl": "Moje narzędzia",
            "te": "నా పనిముట్లు",
            "tl": "Mga Kasangkapan Ko",
            "tr": "Araçlarım",
            "tt": "Минем коралларым",
            "tt-cyrl": "Минем коралларым",
            "ty": "Mes outils",
            "udm": "Мои инструменты",
            "uk": "Мої інструменти",
            "vec": "I miei strumenti",
            "vi": "Công cụ của tôi",
            "vmf": "Werkzeugkasten",
            "vot": "Omat työkalut",
            "wa": "Mes outils",
            "wo": "Mes outils",
            "wuu": "我的工具",
            "xal": "Мои инструменты",
            "yi": "הכלים שלי",
            "za": "我的工具",
            "zh": "我的工具",
            "zh-cn": "我的工具",
            "zh-hans": "我的工具",
            "zh-hant": "我的工具",
            "zh-hk": "我的工具",
            "zh-mo": "我的工具",
            "zh-my": "我的工具",
            "zh-sg": "我的工具",
            "zh-tw": "我的工具"
        };
        i18n = i18n[lang] || i18n[lang.split('-')[0]] || i18n.en;
        $('#WikiaBar .toolbar .tools').prepend(
            $('<li>', {
                'class': 'mytools menu'
            }).append(
                $('<span>', {
                    'class': 'arrow-icon-ctr'
                }).append(
                    $('<span>', {
                        'class': 'arrow-icon arrow-icon-single'
                    })
                ),
                $('<a>', {
                    href: '#',
                    text: i18n
                }),
                $('<ul>', {
                    'class': 'tools-menu',
                    id: 'my-tools-menu'
                })
            )
        );
        WikiaFooterApp.init();
    }
    /**
     * @method tools
     * @description Checks if the tools menu exists
     * @returns {string}
     */
    function tools () {
        var place = ' #WikiaBar #my-tools-menu';
        if ($(place).length === 0) {
            createToolsMenu();
        }
        return place;
    }
    /**
     * @method element
     * @description Returns an element selector
     * @param {String} name - The element name
     * @throws {Error} when no name is specified
     * @returns {string}
     */
    function element (name) {
        if (!name) {
            throw new Error('Please specify an element!');
        }
        var config = window.dev.placement[scriptName];
        if (config && config.element) {
            return elements[config.element] || config.element;
        }
        if (elements[name]) {
            return elements[name];
        } else {
            throw new Error('Element name not recognized!');
        }
    }
    /**
     * @method custom
     * @description Returns a custom element selector
     * @param {String} element - The element selector
     * @throws {Error} when no element is specified
     * @returns {string}
     */
    function custom (element) {
        if (!element) {
            throw new Error('Please specify an element!');
        }
        var config = window.dev.placement[scriptName];
        if (config && config.element) {
            return config.element;
        } else {
            return element;
        }
    }
    /**
     * @method type
     * @description Returns a type
     * @param {String} standard - The default value
     * @throws {Error} when type is specified
     * @returns {string}
     */
    function type (standard) {
        var config = window.dev.placement[scriptName];
        if (standard) {
            if (config && config.type) {
                return config.type;
            } else {
                return standard;
            }
        } else {
            throw new Error('Please specify a type!');
        }
    }
    /**
     * @method script
     * @description Allows script name-based customization
     * @param {String} name - The script name
     * @throws {Error} when no name is specified
     * @returns {void}
     */
    function script (name) {
        if (name) {
            scriptName = name;
        } else {
            throw new Error('Please specify a script name!');
        }
    }
    /**
     * @method util
     * @description All-in-one Placement method
     * @param {Object} ops - The parameters
     * @throws {Error} when a parameter is not specified
     * @returns {void}
     */
    function util (ops) {
        if (!ops.script || !ops.content || !ops.element || !ops.type) {
            throw new Error('Make sure to specify script, content, element, and type!');
        }
        if (
            $.isPlainObject(ops.content) &&
            typeof window.dev.ui === 'function'
        ) {
            ops.content = window.dev.ui(ops.content);
        } 
        scriptName = ops.script;
        var config = window.dev.placement[scriptName];
        $(
            config ?
            (elements[config.element] || config.element) :
            (elements[ops.element] || ops.element)
        )[
            config ?
            config.type :
            ops.type
        ](
            ops.content
        );
    }
    window.dev.placement.loader = {
        element: element,
        custom: custom,
        type: type,
        script: script,
        util: util
    };
    mw.hook('dev.placement').fire(window.dev.placement.loader);
})(this, jQuery, mediaWiki);