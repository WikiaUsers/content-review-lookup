/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
mw.loader.using(['mediawiki.util', 'jquery.client'], function() {
    /* Begin of mw.loader.using callback */

    /**
     * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
     * @rev 5
     */
    // CSS
    var extraCSS = mw.util.getParamValue('withCSS');
    if (extraCSS) {
        if (extraCSS.match(/^MediaWiki:[^&<>=%#]*\.css$/)) {
            importStylesheet(extraCSS);
        } else {
            alert('Only pages from the MediaWiki namespace are allowed.');
            //mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
        }
    }

    // JS
    var extraJS = mw.util.getParamValue('withJS');
    if (extraJS) {
        if (extraJS.match(/^MediaWiki:[^&<>=%#]*\.js$/)) {
            importScript(extraJS);
        } else {
            alert('Only pages from the MediaWiki namespace are allowed.');
            //mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
        }
    }

    // From http://dragonage.wikia.com/wiki/MediaWiki:Common.js
    // Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
    // Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
    // function reference has been declared, and if it has not, it creates it. Backwards compatibility
    // for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
    if (typeof WikiaScriptLoader === 'undefined') {
        var WikiaScriptLoader = WikiaScriptLoader ? WikiaScriptLoader : function() {
            var b = navigator.userAgent.toLowerCase();
            this.useDOMInjection = b.indexOf("opera") != -1 || b.indexOf("firefox") != -1 && b.indexOf("/4.0b") == -1;
            this.isIE = b.indexOf("opera") == -1 && b.indexOf("msie") != -1;
            this.headNode = document.getElementsByTagName("HEAD")[0]
        };
        WikiaScriptLoader.prototype = {
            loadScript: function(b, c) {
                this.useDOMInjection ? this.loadScriptDOMInjection(b, c) : this.loadScriptDocumentWrite(b, c)
            },
            loadScriptDOMInjection: function(b, c) {
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.src = b;
                var d = function() {
                    a.onloadDone = true;
                    typeof c == "function" && c()
                };
                a.onloadDone = false;
                a.onload = d;
                a.onreadystatechange = function() {
                    a.readyState == "loaded" && !a.onloadDone && d()
                };
                this.headNode.appendChild(a)
            },
            loadScriptDocumentWrite: function(b, c) {
                document.write('<script src="' + b + '" type="text/javascript"><\/script>');
                var a = function() {
                    typeof c == "function" && c()
                };
                typeof c == "function" && this.addHandler(window, "load", a)
            },
            loadScriptAjax: function(b, c) {
                var a = this,
                    d = this.getXHRObject();
                d.onreadystatechange = function() {
                    if (d.readyState == 4) {
                        var e = d.responseText;
                        if (a.isIE) eval(e);
                        else {
                            var f = document.createElement("script");
                            f.type = "text/javascript";
                            f.text = e;
                            a.headNode.appendChild(f)
                        }
                        typeof c == "function" && c()
                    }
                };
                d.open("GET", b, true);
                d.send("")
            },
            loadCSS: function(b, c) {
                var a = document.createElement("link");
                a.rel = "stylesheet";
                a.type = "text/css";
                a.media = c || "";
                a.href = b;
                this.headNode.appendChild(a)
            },
            addHandler: function(b, c, a) {
                if (window.addEventListener) window.addEventListener(c, a, false);
                else window.attachEvent && window.attachEvent("on" + c, a)
            },
            getXHRObject: function() {
                var b = false;
                try {
                    b = new XMLHttpRequest
                } catch (c) {
                    for (var a = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"], d = a.length, e = 0; e < d; e++) {
                        try {
                            b = new ActiveXObject(a[e])
                        } catch (f) {
                            continue
                        }
                        break
                    }
                }
                return b
            }
        };
        window.wsl = new WikiaScriptLoader;
    }

    /* Auto updating recent changes opt-in
     * See w:c:dev:AjaxRC for info & attribution 
     */
    AjaxRCRefreshText = 'Auto-refresh';
    AjaxRCRefreshHoverText = 'Automatically refresh the page';
    ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

    importArticles({
        type: 'script',
        articles: [
            'MediaWiki:common.js/levelselect.js', //Levelselect on Champion pages
            'MediaWiki:common.js/tabviewenhancements.js', //TabView enhancements
            'u:dev:AjaxBatchDelete/code.js',
            'u:dev:AjaxRC/code.js',
            'u:dev:CollapsibleInfobox/code.js',
            'u:dev:ExternalImageLoader/code.js',
            'u:dev:OggPlayer.js',
            'u:dev:RevealAnonIP/code.js', //Reveal Anonymous User IP
            'u:dev:ShowHide/code.js',
            'u:dev:Tooltips.js'
        ]
    });

    /***********************************************************/
    /* Sliders using jquery by User:Tierrie in Dragon Age Wiki */
    /***********************************************************/
    mw.loader.using(['jquery.ui.tabs'], function() {
        $(function() {
            var $tabs = $("#portal_slider").tabs({
                fx: {
                    opacity: 'toggle',
                    duration: 100
                }
            });
            $("[class^=portal_sliderlink]").click(function() { // bind click event to link
                $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
                return false;
            });
            $('#portal_next').click(function() {
                $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
                return false;
            });
            $('#portal_prev').click(function() { // bind click event to link
                $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
                return false;
            });
        });
    });

    /** Username replace function ([[Template:USERNAME]]) 
     * Inserts user name into <span class="insertusername"></span>
     * Originally by User:Splarka
     * New version by User:Spang
     * Fixed with JS provided by User:Grunny, thanks!
     */
    $(function() {
        if (typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
        $("span.insertusername").text(mw.config.get('wgUserName'));
    });

    /* End of mw.loader.using callback */
});

/* Loads MathJax (http://mathjax.org) */
(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js";

    var config = 'MathJax.Hub.Config({' +
        'extensions: ["tex2jax.js"],' +
        'jax: ["input/TeX","output/HTML-CSS"]' +
        '});' +
        'MathJax.Hub.Startup.onload();';

    if (window.opera) {
        script.innerHTML = config
    } else {
        script.text = config
    }

    document.getElementsByTagName("head")[0].appendChild(script);
})();

/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [{
    classname: 'character_icon',
    parse: '{' + '{Tooltip/Champion|<#character#>|<#skin#>}}',
}, {
    classname: 'cc-tooltip',
    parse: '{' + '{Crowd_control_info|<#type#>}}',
}, {
    classname: 'skin-icon',
    parse: '{' + '{Tooltip/Skin|<#param#>}}',
}, {
    classname: 'skinloading-icon',
    parse: '{' + '{Tooltip/Skin/Loading|<#param#>}}',
}, {
    classname: 'item-icon',
    parse: '{' + '{Tooltip/Item|<#param#>}}',
}, {
    classname: 'spell-icon',
    parse: '{' + '{Tooltip/Spell|<#param#>}}',
}, {
    classname: 'passive-progression',
    parse: '{' + '{Tooltip/Progression|<#size#>|<#values#>|<#levels#>|type=<#type#>|formula=<#formula#>}}',
}, {
    classname: 'tooltip-sandbox',
    parse: '{' + '{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>}}',
}];

var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};

/*** Flip Text ***/
$(document).ready(function() {
    $(".flipText2").hide();
    $(".flipText1, .flipText2").click(function() {
        $(".flipText1, .flipText2").toggle();
    });
});

/* ĐỪNG THÊM BẤT KÌ CODE NÀO DƯỚI DÒNG NÀY */