/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載
*/
window.addPortletLink = mw.util.addPortletLink;
window.getParamValue = mw.util.getParamValue;

(function ($, mw) {
    /* Search Engine variant hack */
    if (/\.google\./.test(document.referrer) && /\.wikipedia\.org\/zh(-[^/]+)?\//.test(document.location.href)) {
        document.location = document.location.href.replace(/\.wikipedia\.org\/zh(-[^/]+)?\//, ".wikipedia.org/wiki/");
    }

    /* Cookies */
    window.setCookie = function (cookieName, cookieValue, expiryDay) {
        $.cookie(cookieName, cookieValue, {
            expires: expiryDay,
            path: '/'
        });
    };

    window.getCookie = function (cookieName) {
        return $.cookie(cookieName);
    };

    window.deleteCookie = function (cookieName) {
        $.cookie(cookieName, null);
    };

    /* overwrite the original script loaders with mw.loader.load 
    window.importScript = function (page) {
        mw.loader.load(wgServer + wgScript + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript');
    };

    window.importScriptURI = function (url) {
        mw.loader.load(url);
    };

    window.importStylesheet = function (page) {
        mw.loader.load(wgServer + wgScript + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/css', 'text/css');
    };

    window.importStylesheetURI = function (url) {
        mw.loader.load(url, 'text/css');
    };*/

    window.importScriptCallback = function (page, ready) {
        importScriptURICallback(wgServer + wgScript + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript', ready);
    };

    window.importScriptURICallback = function (url, ready) {
        $.ajax({
            'url': url,
            'cache': true,
            'dataType': 'script',
            'success': ready
        });
    };

    /* 中文處理 */
    /* 1. 设置中文语言页 */
    $('html').attr('lang', wgUserVariant).attr('xml:lang', wgUserVariant);

    /* 2. 返回繁簡字串 */
    var wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
        var ret = {
            'zh': zh || hans || hant || cn || tw || hk || sg || mo || my,
            'zh-hans': hans || cn || sg || my,
            'zh-hant': hant || tw || hk || mo,
            'zh-cn': cn || hans || sg || my,
            'zh-sg': sg || hans || cn || my,
            'zh-tw': tw || hant || hk || mo,
            'zh-hk': hk || hant || tw || mo
        }
        return ret[wg] || zh || hans || hant || cn || tw || hk || sg || mo || my; //保證每一語言有值
    }

    window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
        return wgUXS(wgUserLanguage, hans, hant, cn, tw, hk, sg, zh, mo, my);
    };

    window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
        return wgUXS(wgUserVariant, hans, hant, cn, tw, hk, sg, zh, mo, my);
    };

    /* 當需要時載入對應的 scripts */
    if (wgAction == "edit" || wgAction == "submit" || wgCanonicalSpecialPageName == 'Search') { //scripts specific to editing pages
        importScript('MediaWiki:Common.js/edit.js');
    }

    /* 辅助处理 */
    /* 1. 功能設定 */
    window.JSConfig = window.JSconfig || {};
    window.JSConfig.collapseText = wgULS('隐藏▲', '隱藏▲'); //指示折叠收缩的默认文字
    window.JSConfig.expandText = wgULS('显示▼', '顯示▼'); //指示折叠展开的默认文字
    window.JSConfig.autoCollapse = 2; //文章少于 autoCollapse 个折叠块时，不自动折叠
    // window.JSConfig.SpecialSearchEnhancedDisabled=false; //是否禁止增加其它搜索引擎
    /* 2. 用jQuery实现的getElementsByClassName（需不需要返回DOM对象？） */
    window.getElementsByClassName = function (elm, tag, className) {
        return $(tag + '.' + className, elm);
    };

    /* 3. 遍历 */
    window.applyEach = function (callback, array) {
        var i = 0,
            j = array.length;
        while (i < j) {
            callback(array[i++]);
        }
    };

    /* 4. 移動元素 */
    window.elementMoveto = function (node, refNode, pos) { //默认位置为refNode前
        if (node && refNode) {
            if (pos && pos == 'after') {
                $(refNode).after(node);
            } else {
                $(refNode).before(node);
            }
        }
    };

    /* 5. 创建元素 */
    window.createElement = function (tag, children, props) {
        var element = document.createElement(tag);
        if (!(children instanceof Array)) {
            children = [children];
        }
        applyEach(function (child) {
            if (typeof child == 'string') {
                child = document.createTextNode(child);
            }
            if (child) {
                element.appendChild(child);
            }
        }, children);
        if (typeof props == 'object') {
            for (var k in props) {
                switch (k) {
                case 'styles':
                    var styles = props.styles;
                    for (var s in styles) {
                        element.style[s] = styles[s];
                    }
                    break;
                case 'events':
                    var events = props.events;
                    for (var e in events) {
                        addHandler(element, e, events[e]);
                    }
                    break;
                case 'class':
                    element.className = props[k];
                    break;
                default:
                    element.setAttribute(k, props[k]);
                }
            }
        }
        return element;
    };

    //wiki URL
    window.wgProjectURL = {
        en: 'http://en.wikipedia.org',
        de: 'http://de.wikipedia.org',
        fr: 'http://fr.wikipedia.org',
        pl: 'http://pl.wikipedia.org',
        ja: 'http://ja.wikipedia.org',
        it: 'http://it.wikipedia.org',
        nl: 'http://nl.wikipedia.org',
        pt: 'http://pt.wikipedia.org',
        es: 'http://es.wikipedia.org',
        sv: 'http://sv.wikipedia.org',
        //僅列前十名其它語言百科
        m: 'http://meta.wikimedia.org',
        b: 'http://zh.wikibooks.org',
        q: 'http://zh.wikiquote.org',
        n: 'http://zh.wikinews.org',
        wikt: 'http://zh.wiktionary.org',
        mw: 'http://www.mediawiki.org',
        commons: 'http://commons.wikimedia.org'
    };
    /**
     * 将页面名称转换为URL
     *
     * @param page 页面名称
     * @param paras 附加后缀对象，用空对象{}做参数可以取得源码
     */
    window.getWikiPath = function (page, paras) {
        var reg = /^[a-z]+:/;
        var pre = page.match(reg);
        pre = pre && wgProjectURL[pre[0].replace(/:$/, '').toLowerCase()];
        if (pre) {
            page = page.replace(reg, '');
        } else {
            pre = wgServer;
        } //保障没有相对路径，以照顾在线代理。
        var url = pre + wgScript + '?title=' + encodeURI(page.replace(' ', '_'));
        if (typeof paras == 'object') {
            paras.ctype = paras.ctype || 'text';
            paras.dontcountme = paras.dontcountme || 's';
            paras.action = paras.action || 'raw';
            for (var k in paras) {
                url += '&' + k + '=' + paras[k];
            }
        }
        return url;
    };

    //引入[[Special:Gadgets]]要求的腳本和樣式
    if (window.requireScripts instanceof Array) {
        applyEach(importScript, requireScripts);
    }
    if (window.requireStylesheets instanceof Array) {
        applyEach(importStylesheet, requireStylesheets);
    }
    window.requireScripts = [];
    window.requireScripts.push = function (script) {
        importScript(script);
    };
    window.requireStylesheets = [];
    window.requireStylesheets.push = function (style) {
        importStylesheet(style);
    };

    /* 测试元素中是否含有指定的样式 */
    window.hasClass = function (elem, cls) {
        return $(elem).hasClass(cls);
    };

/*
== IE兼容性修正 ==
*/
    if ($.browser.msie) {
        /** Internet Explorer bug fix **************************************************
         *
         *  Description: Fixes IE horizontal scrollbar bug
         *  Maintainers: [[User:fdcn]]
         */
        var oldWidth;
        var docEl = document.documentElement;

        function fixIEScroll() {
            if (!oldWidth || docEl.clientWidth > oldWidth) {
                doFixIEScroll();
            } else {
                setTimeout(doFixIEScroll, 1);
            }
            oldWidth = docEl.clientWidth;
        }

        function doFixIEScroll() {
            docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
        }

        document.attachEvent("onreadystatechange", fixIEScroll);
        attachEvent("onresize", fixIEScroll);

        //Import scripts specific to Internet Explorer 6
        if (navigator.appVersion.substr(22, 1) == "6") {
            importScript("MediaWiki:Common.js/IE60Fixes.js")
        }
    }

/*
== 特色條目優良與條目鏈接顯示==
*/

    $(function () {
        $('#p-lang li').each(function () {
            if ($('#' + this.className + '-fa').length) {
                this.className += " FA"
                this.title = wgULS("此条目在此语言版本中为特色条目", "此條目在此語言版本中為特色條目");
            } else if ($('#' + this.className + '-ga').length) {
                this.className += " GA"
                this.title = wgULS("此条目在此语言版本中为优良条目", "此條目在此語言版本中為優良條目");
            }
        });
    });

/*

== 增加摺疊功能 ==
*/
    /** 摺疊 div table *****************************
     *  Description: 实现div.NavFrame和table.collapsible的可折叠性。
     *  JSConfig的collapseText、expandText、autoCollapse属性定义默认文字和默认最少自动折叠块
     *  Maintainers: User:fdcn
     */

    function cancelBubble(e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    function createToggleButton(head) {
        var parent = head;
        if (head.tagName.toLowerCase() == 'tr') { //对表格特别处理
            if (head.getElementsByTagName("th").length) {
                parent = head.cells[parent.cells.length - 1];
            } else {
                return;
            }
        }
        var textS, textH, button = getElementsByClassName(head, "span", "NavToggle")[0];
        if (button) {
            parent = button.parentNode;
        } else {
            textS = createElement("span", [JSConfig.expandText], {
                'class': 'toggleShow'
            });
            textH = createElement("span", [JSConfig.collapseText], {
                'class': 'toggleHide'
            });
            button = createElement("span", [textS, textH], {
                'class': 'NavToggle',
                styles: {
                    'width': "6em"
                }
            });
        }
        button.style.display = "inline";
        head.className += " uncollapse toggleHotspot";
        parent.insertBefore(button, parent.childNodes[0]);
    }
    window.wgCollapse = function (head, container, defaultCollapse) {
        if (head) {
            createToggleButton(head);
        }
        var self = this;
        this.state = 0;
        this.container = container;
        applyEach(function (h) {
            if (h.nodeType == 1 && !hasClass(h, "uncollapse") && !hasClass(h, "toggleShow") && !hasClass(h, "toggleHide")) {
                h.className += " toggleHide";
            }
        }, defaultCollapse); //预设的隐藏元素


        function getArray(clsname) {
            var r = [],
                i = 0,
                e, ea = getElementsByClassName(container, "*", clsname);
            while (e = ea[i++]) {
                var parent = e.parentNode;
                while (!hasClass(parent, 'NavFrame') && !hasClass(parent, 'collapsible')) {
                    parent = parent.parentNode;
                }
                if (parent == container) {
                    r.push(e);
                }
            }
            return r;
        }
        var toggleA = getArray("toggleShow");
        var toggleB = getArray("toggleHide");
        var hotspots = getArray("toggleHotspot");

        function _toggle(list, state) {
            var i = 0,
                e;
            while (e = list[i++]) {
                e.style.display = state ? e.showStyle || '' : 'none';
            }
        }
        this.toggle = function (state) {
            self.state = (typeof state == 'undefined') ? 1 - self.state : state;
            _toggle(toggleA, self.state);
            _toggle(toggleB, 1 - self.state);
        }
        var i = 0,
            h;
        while (h = hotspots[i++]) {
            applyEach(function (link) {
                addClickHandler(link, cancelBubble);
            }, h.getElementsByTagName("A"));
            h.style.cursor = "pointer";
            $(h).attr('tabindex', '0').keydown(function (event) {
                if (event.which == 13) { // Enter
                    self.toggle();
                }
            });
            addClickHandler(h, function () {
                self.toggle();
            });
        }
    };

    $(function () {
        if (!window.disableCollapse) {
            //init
            var items = [];
            applyEach(function (NavFrame) {
                var i = 0,
                    child = NavFrame.childNodes,
                    head;
                while (head = child[i++]) {
                    if (head.className && hasClass(head, "NavHead")) {
                        break;
                    }
                }
                items.push(new wgCollapse(head, NavFrame, NavFrame.childNodes));
            }, getElementsByClassName(document, "div", "NavFrame"));
            applyEach(function (table) {
                var rows = table.rows;
                items.push(new wgCollapse(rows[0], table, rows));
            }, getElementsByClassName(document, "table", "collapsible"));
            var item, i = 0,
                count = items.length;
            while (item = items[i++]) {
                item.toggle(
                hasClass(item.container, "collapsed") || (count >= JSConfig.autoCollapse && hasClass(item.container, "autocollapse")));
            }
        }
    });
    //修正摺疊後定位變化
    hookEvent("load", function () {
        if (location.hash) {
            location.href = location.hash;
        }
    });

/*

== 取消討論頁的[+]按鈕 ==
*/

    $(function () {
        if ($('#no-newsection').length) {
            $('#ca-addsection').css('display', 'none');
        }
    });

/*

==WikiMiniAtlas世界地圖==
*/
    /** WikiMiniAtlas *******************************************************
     *
     *  描述：WikiMiniAtlas是一個popup而可點選與拖曳的世界地圖。
     *               這個腳本將會讓所有的經緯度標示中顯示WikiMiniAtlas的popup開啟按鈕。
     *               由於被許多計畫使用，因此腳本放置在元維基中。
     *               更多資訊請詳見[[Meta:WikiMiniAtlas]]。
     *  創建者：[[:en:User:Dschwen]]
     */

    var metaBase = 'http://meta.wikimedia.org';
    if (mw.config.get('wgServer') == 'https://secure.wikimedia.org') {
        var metaBase = 'https://secure.wikimedia.org/wikipedia/meta';
    }
    mw.loader.load(metaBase + '/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400');

/*
==保護選項校正==
*/

    if (wgAction == "protect") {

        $(function () {
            var pform = document.getElementById("mw-Protect-Form");
            var timeoptions;

            timeoptions = pform["wpProtectExpirySelection-edit"].options;
            if (timeoptions[0].value != "existing") {
                timeoptions[timeoptions.length - 1].selected = true;
                ProtectionForm.updateExpiryList(pform["wpProtectExpirySelection-edit"]);
            }

            timeoptions = pform["wpProtectExpirySelection-move"].options;
            if (timeoptions[0].value != "existing") {
                timeoptions[timeoptions.length - 1].selected = true;
                ProtectionForm.updateExpiryList(pform["wpProtectExpirySelection-move"]);
            }

        });

    }

/*
==擷取選單文字按鈕==
*/

    $(function () {

        var addGetMenuTextButton = function (id, srcMenu, targetText, tiptext, afterSelIdx) {
            var btnAdd = createElement("input", "", {
                'id': id,
                'type': 'button',
                'value': ((!tiptext) ? "(+)" : tiptext)
            });

            btnAdd.srcMenu = srcMenu;
            btnAdd.targetText = targetText;
            btnAdd.afterSelIdx = (!afterSelIdx || isNaN(afterSelIdx)) ? 0 : afterSelIdx;

            addHandler(btnAdd, "click", function () {
                this.targetText.value += this.srcMenu.options[this.srcMenu.selectedIndex].value;
                this.srcMenu.selectedIndex = this.afterSelIdx;
            });

            elementMoveto(btnAdd, srcMenu, "after");
        }

        var useForm;

        if (wgAction == "protect" || wgAction == "unprotect") { //保護理由
            useForm = document.getElementById("mw-Protect-Form");
            addGetMenuTextButton("wpProtectReasonSelectionAdd", useForm.wpProtectReasonSelection, useForm["mwProtect-reason"], "加到附加的理由", 0);

        } else if (("" + wgCanonicalSpecialPageName).toLowerCase() == "blockip") { //封禁理由
            useForm = document.getElementById("blockip");
            addGetMenuTextButton("wpBlockReasonListAdd", useForm.wpBlockReasonList, useForm.wpBlockReason, wgULS("加到附带原因", "加到附帶原因"), 0);

        }

    });

/*

==避免在主條目中出現捲軸框==

*/

    if (!wgCanonicalNamespace) $(function () {

        var disableDivOverflowScroll = function (obj) {
            var targetdiv;

            for (var i = obj.children.length; i-- > 0;) if (obj.children[i].tagName.toLowerCase() == "div") {
                targetdiv = obj.children[i];

                if (targetdiv.className.indexOf("noprint") == -1 && targetdiv.className.indexOf("thumb") == -1) {
                    if ( !! (targetdiv.style.overflow) || !! (targetdiv.style.overflowY)) with(targetdiv.style) {
                        overflowY = "visible";
                        padding = "";
                        border = "";
                        height = "";
                    }

                    disableDivOverflowScroll(targetdiv);
                }

            }
        }

        disableDivOverflowScroll(document.getElementsByTagName("body")[0]);
    });

/* 
== metaBox ==

HERE STARTS THE WORKING-CODE OF "METABOXES"*/

/* Funcionament de la Plantilla:Metacaixa
 Implementat per: Usuari:Peleguer.
 Actualitzat per Joanjoc seguint les indicacions d'en Martorell
 */

    function MetaCaixaInit() {
        //S'executa al carregar-se la pàgina, si hi ha metacaixes,
        // s'assignen els esdeveniments als botons
        //alert("MetaCaixaInit");
        var i = 0 //Inicialitzem comptador de caixes
        for (i = 0; i <= 9; i++) {
            var vMc = document.getElementById("mc" + i);
            if (!vMc) break;
            //alert("MetaCaixaInit, trobada Metacaixa mc"+i);
            var j = 1 //Inicialitzem comptador de botons dins de la caixa
            var vPsIni = 0 //Pestanya visible inicial
            for (j = 1; j <= 9; j++) {
                var vBt = document.getElementById("mc" + i + "bt" + j);
                if (!vBt) break;
                //alert("MetaCaixaInit, trobat botó mc"+i+"bt"+j);
                vBt.onclick = MetaCaixaMostraPestanya; //A cada botó assignem l'esdeveniment onclick
                //alert (vBt.className);
                if (vBt.className == "mcBotoSel") vPsIni = j; //Si tenim un botó seleccionat, en guardem l'index
            }
            //alert ("mc="+i+", ps="+j+", psini="+vPsIni );
            if (vPsIni == 0) { //Si no tenim cap botó seleccionat, n'agafem un aleatòriament
                vPsIni = 1 + Math.floor((j - 1) * Math.random());
                //alert ("Activant Pestanya a l'atzar; _mc"+i+"bt"+vPsIni +"_");
                document.getElementById("mc" + i + "ps" + vPsIni).style.display = "block";
                document.getElementById("mc" + i + "ps" + vPsIni).style.visibility = "visible";
                document.getElementById("mc" + i + "bt" + vPsIni).className = "mcBotoSel";
            }
        }
    }

    function MetaCaixaMostraPestanya() {
        //S'executa al clicar una pestanya,
        //aquella es fa visible i les altres s'oculten
        var vMcNom = this.id.substr(0, 3); //A partir del nom del botó, deduïm el nom de la caixa
        var vIndex = this.id.substr(5, 1); //I l'index
        var i = 1
        for (i = 1; i <= 9; i++) { //busquem totes les pestanyes d'aquella caixa
            //alert(vMcNom+"ps"+i);
            var vPsElem = document.getElementById(vMcNom + "ps" + i);
            if (!vPsElem) break;
            if (vIndex == i) { //Si és la pestanya bona la mostrem i canviem la classe de botó
                vPsElem.style.display = "block";
                vPsElem.style.visibility = "visible";
                document.getElementById(vMcNom + "bt" + i).className = "mcBotoSel";
            } else { //Sinó, l'ocultem i canviem la classe de botó
                vPsElem.style.display = "none";
                vPsElem.style.visibility = "hidden";
                document.getElementById(vMcNom + "bt" + i).className = "mcBoto";
            }
        }
        return false; //evitem la recàrrega de la pàgina
    }

    addOnloadHook(MetaCaixaInit);

    /*HERE FINISHES THE WORKING-CODE OF "METABOXES"*/

/*
== 智能讨论页编辑（新建） ==

*/

    $(function () {
        var catalk = $('#ca-talk');
        if (catalk.hasClass('new') && wgNamespaceNumber != 2) {
            var a = $('a:first', catalk);
            a.attr('href', a.attr('href') + '&section=new');
        }
    });
    //
    /** Magic editintros ****************************************************
     *
     *  Description: Adds editintros on disambiguation pages and BLP pages.
     *  Maintainers: [[:en:User:RockMFR]], [[User:PhiLiP]]
     */

    var addEditIntro = function (name) {
        $('#ca-edit,.editsection').each(function () {
            $('a', this).attr('href', $('a', this).attr('href') + '&editintro=' + name);
        });
    };

    if (wgNamespaceNumber == 0) {
        $(function () {
            if ($('#disambig').length || $('#disambigbox').length) {
                addEditIntro('Template:Disambig_editintro');
            }
        });

        $(function () {
            if ($.inArray('在世人物', wgCategories) !== -1) {
                addEditIntro('Template:BLP_editintro');
            }
        });
    }


    // Top icon: [[Template:Topicon]]
    $(function () {
        // nostalgia, standard and cologneblue use .pagetitle
        // what's the problem on modern?
        $('<div />').css('float', 'right').append($('.topicon').css({
            'float': 'right',
            'position': 'static'
        }).show()).prependTo('#firstHeading, .pagetitle');
    });

/*
== 引用錯誤標籤名字解碼 ==
*/

    $(function () {
        $('.anchordecodeme').each(function () {
            $(this).text(decodeURIComponent($(this).text().replace(/\.([0-9A-F]{2})/g, '%$1')));
        });
    });

    /** extract a URL parameter from the current URL **********
     * From [[en:User:Lupin/autoedit.js]]
     *
     * paramName  : the name of the parameter to extract
     *
     * Local Maintainer: [[User:Dschwen]]
     */

    function getParamValue(paramName, url) {
        if (typeof(url) == 'undefined') url = document.location.href;
        var cmdRe = RegExp('[&?]' + paramName + '=([^&]*)');
        var m = cmdRe.exec(url);
        if (m) {
            try {
                return decodeURIComponent(m[1]);
            } catch (someError) {}
        }
        return null;
    }
    /** &withJS= URL parameter *******
     * Allow to try custom scripts on the MediaWiki namespace without
     * editing [[Special:Mypage/monobook.js]]
     *
     * Maintainer: [[User:Platonides]]
     * [[User:PhiLiP]]移植自Commons
     */
    {
        var extraJS = getParamValue("withJS");
        if (extraJS) if (extraJS.match("^MediaWiki:[^&<>=%]*\.js$")) importScript(extraJS);
        else
        alert(extraJS + " javascript not allowed to be loaded.");
    }

    /** Advanced Site Notices ********
     * Allow to custom dynamic site notices
     * Maintainer: [[User:PhiLiP]]
     */
    if (typeof(window.closeASNForever) == 'undefined') {
        window.closeASNForever = false;
    }
    if (typeof(window.customASNInterval) == 'undefined') {
        window.customASNInterval = 15;
    }
    $(function () {
        $('#mw-dismissable-notice').css('display', 'none');
        if (closeASNForever || wgAction == 'edit' || wgAction == 'submit') {
            return;
        }

        var ln = $('#siteNotice');
        if (!ln.length) {
            return;
        }
        var cname = 'dismissASN';
        var cval = getCookie(cname);
        if (cval == '') {
            cval = 0;
        }
        var rev = 0;
        var toid = null;

        var tb = $('<table id="asn-dismissable-notice" width="100%" style="background: transparent;"/>');
        var ct = $('<div id="advancedSiteNotices"/>');
        var sd = $('<a href="#">' + wgUVS('关闭', '關閉') + '</a>');
        tb.append($('<tr/>').append($('<td/>').append(ct)).append($('<td/>').append('[').append(sd).append(']')));
        var nts = null;

        sd.click(function () {
            setCookie(cname, rev, 30);
            clearTimeout(toid);
            tb.remove();
            return false;
        });

        var getAttrs = function (nt) {
            var only = {
                sysop: nt.hasClass('only_sysop'),
                logged: nt.hasClass('only_logged'),
                anon: nt.hasClass('only_anon'),
                zh: nt.hasClass('only_zh')
            };
            only['usr'] = only['sysop'] || only['logged'] || only['anon'];
            only['vrt'] = only['zh'];
            var vrt = ['hans', 'hant', 'cn', 'hk', 'sg', 'tw']
            for (var i = 0; i < 6; i++) {
                v = 'zh-' + vrt[i];
                only[v] = nt.hasClass('only_zh_' + vrt[i]);
                only['vrt'] = only['vrt'] || only[v];
            }
            return only;
        };

        var loadNotices = function (pos) {
            if (!tb.length) {
                return;
            }
            var l = nts.length;
            var nt = null;
            var rt = 0;
            while (!nt || nt.attr('class')) {
                if (nt) {
                    var only = getAttrs(nt);
                    if ((!only['vrt'] || (only['vrt'] && only[wgUserVariant])) && (!only['usr'] || ($.inArray('sysop', wgUserGroups) && only['sysop']) || (wgUserName && only['logged']) || (!wgUserName && only['anon']))) {
                        break;
                    }
                }
                pos = pos % l;
                nt = $(nts[pos++]);
                rt++;
                if (rt == l) {
                    return;
                }
            }
            nt = nt.html();
            if (ct.html()) {
                ct.stop().fadeOut(function () {
                    ct.html(nt).fadeIn();
                });
            } else if (rev == cval) {
                return;
            } else {
                tb.appendTo(ln);
                ct.html(nt).fadeIn();
            }
            toid = setTimeout(function () {
                loadNotices(pos)
            }, customASNInterval * 1000);
        };

        $.get(wgScript, {
            title: 'Template:AdvancedSiteNotices',
            variant: wgUserVariant,
            printable: 'yes'
        }, function (d) {
            nts = $('ul.sitents li', d);
            rev = parseInt($('.nts_revision', d).text());
            var l = nts.length;
            loadNotices(Math.ceil(Math.random() * l));
        });
    });

    /* 维基百科语言列表 */
    if (wgPageName == 'Wikipedia:首页' || wgPageName == 'Wikipedia_talk:首页' || wgPageName.indexOf("Wikipedia:首頁/自訂首頁設計/") == 0) {
        $(function () {
            mw.util.addPortletLink('p-lang', wgScriptPath + '/index.php?title=Wikipedia:维基百科语言列表', wgULS('维基百科语言列表', '維基百科語言列表'), 'interwiki-completelist', wgULS('维基百科的完整各语言列表', '維基百科的完整各語言列表'));
            var nstab = document.getElementById('ca-nstab-project');
            if (nstab && wgUserLanguage.indexOf("zh") > -1) {
                while (nstab.firstChild) nstab = nstab.firstChild
                nstab.nodeValue = wgULS('首页', '首頁')
            }
            //            nstab.firstChild.firstChild.nodeValue = wgULS('首页','首頁');
        });
    }

    /**
     * Workaround for bug 26117, flood flag
     * 
     * Special:Userrights
     */
    $(function () {
        if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Userrights" && wgUserGroups.indexOf("sysop") != -1 && $("input#username").val().replace(/_/g, " ") == wgUserName) {
            $("label[for=wpGroup-flood]").text($("label[for=wpGroup-flood]").text().replace("*", ""));
            if ($("input#wpGroup-flood").attr("disabled")) {
                $("input#wpGroup-flood").attr("disabled", false);
                var oldhtml = $("input#wpGroup-flood").parent().html();
                $("input#wpGroup-flood").parent().remove();
                $("table.mw-userrights-groups tbody tr:nth-child(2) td:nth-child(2)").append(oldhtml);
            }
        }
    });

    /**
     * 简单的API读写实现，避免重复使用代码
     *
     * Maintainer: [[User:PhiLiP]]
     */
    mw.api = { /* cache */
        cache: {},

        pass: function () {},

        normalized: {},

        /**
         * Send an API request to server and retrieve the result
         *
         * @param query: the query to be sent
         * @param ready: optional, callback function when API response is ready for using
         */
        request: function (method, query, ready) {
            if (typeof method != 'string' || !$.inArray(method, ['get', 'post'])) {
                ready = query;
                query = method;
                method = 'get';
            }
            ready = ready || mw.api.pass;
            query.format = 'json';
            $[method](wgScriptPath + '/api.php', query, ready, 'json');
        },

        /**
         * Get raw text of pages
         *
         * @param pages: require page(s), string or array
         * @param ready: optional, callback function receive raw content
         * @param purge: purge the cache? boolean
         */
        raw: function (pages, ready, purge) {
            if (typeof pages == 'string') {
                pages = [pages];
            }
            if (typeof ready == 'boolean') {
                purge = ready;
                ready = mw.api.pass;
            }
            ready = ready || mw.api.pass;
            purge = purge || false;

            var _raw_from_cache = function (pages) {
                var ret = {};
                var pagelen = pages.length;
                for (var id = 0; id < pagelen; id++) {
                    var page = pages[id];
                    var title = mw.api.normalized[page] || page;
                    if (typeof mw.api.cache[title] == 'object') {
                        ret[page] = mw.api.cache[title]['*'];
                    }
                }
                return ret;
            }

            var ready_data = {};
            var titles = [];

            if (!purge) {
                $.extend(ready_data, _raw_from_cache(pages));
                var pagelen = pages.length;
                for (var id = 0; id < pagelen; id++) {
                    var page = pages[id];
                    if (!ready_data[page]) {
                        titles.push(page);
                    }
                }
            } else {
                titles = pages;
            }

            if (titles.length) {
                mw.api.request({
                    'action': 'query',
                    'prop': 'revisions',
                    'titles': titles.join('|'),
                    'rvprop': 'timestamp|content'
                }, function (data) {
                    if (data.query.normalized) {
                        normlen = data.query.normalized.length;
                        for (var normid = 0; normid < normlen; normid++) {
                            var norm = data.query.normalized[normid];
                            mw.api.normalized[norm.from] = norm.to;
                        }
                    }
                    for (var pageid in data.query.pages) {
                        var page = data.query.pages[pageid];
                        var cache = mw.api.cache[page.title] = {};
                        cache.missing = pageid < 0;
                        if (cache.missing) {
                            cache.timestamp = null;
                            cache['*'] = null;
                        } else {
                            $.extend(cache, page.revisions[0]);
                        }
                    }

                    $.extend(ready_data, _raw_from_cache(titles));
                    ready(ready_data);
                });
            } else {
                ready(ready_data);
            }
        },

        /**
         * Edit a page with content
         */
        edit: function (page, text, summary, ready) {
            page = mw.api.normalized[page] || page;

            if (typeof summary == 'function') {
                ready = summary;
                summary = '';
            } else {
                summary = summary || '';
                ready = ready || mw.api.pass;
            }

            // request an edit token
            mw.api.request({
                'action': 'query',
                'prop': 'info',
                'intoken': 'edit',
                'titles': page
            }, function (data) {
                var token = '';
                var starttimestamp = '';
                for (var pageid in data.query.pages) {
                    token = data.query.pages[pageid].edittoken;
                    starttimestamp = data.query.pages[pageid].starttimestamp;
                }

                var query = {
                    'action': 'edit',
                    'title': page,
                    'starttimestamp': starttimestamp,
                    'summary': summary,
                    'text': text,
                    'token': token
                };
                if (mw.api.cache[page]) {
                    // use basetimestamp to prevent edit conflict
                    query.basetimestamp = mw.api.cache[page].timestamp;
                }

                mw.api.request('post', query, ready);
            });
        },

        /**
         * Parse a page content
         */
        parse: function (page, variant, ready) {
            if (typeof variant == 'function') {
                ready = variant;
                variant = window.wgUserVariant || false;
            } else {
                ready = ready || mw.api.pass;
                variant = variant || window.wgUserVariant || false;
            }

            var query = {
                'action': 'parse',
                'page': page
            }
            if (variant) {
                query.variant = variant;
            }
            mw.api.request(query, function (data) {
                ready(data.parse.text['*'], data.parse.displaytitle, data.parse.links);
            });
        }
    };

})(jQuery, mediaWiki);