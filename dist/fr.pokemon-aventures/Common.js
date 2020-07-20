/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Import [[MediaWiki:Onlyifuploading.js]] 
if (wgCanonicalSpecialPageName == "Upload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

// ============================================================
// BEGIN import Onlyifediting-functions
// SEE ALSO [[MediaWiki:Onlyifediting.js]]

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
    document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

// END import Onlyifediting-functions
// ============================================================


/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: { opacity: 'toggle', duration: 100 } });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});
/* Notation articles */
for (i = 0; i < wgCategories.length; i++) {
    if (wgCategories[i] == "Talent") {
        (function(d, t, e, m) {
            // Async Rating-Widget initialization.
            window.RW_Async_Init = function() {

                RW.init({
                    huid: "210335",
                    uid: "a5a26897bf255c20d62eaf2a667fde46",
                    source: "website",
                    options: {
                        "advanced": {
                            "font": {
                                "size": "18px",
                                "type": "\"Comic Sans MS\""
                            },
                            "text": {
                                "like": "Je vous veux!",
                                "dislike": "Je ne me retourne pas!"
                            }
                        },
                        "size": "medium",
                        "type": "nero",
                        "lng": "fr",
                        "style": "thumbs2"
                    }
                });
                RW.render();
            };
            // Append Rating-Widget JavaScript library.
            var rw, s = d.getElementsByTagName(e)[0],
                id = "rw-js",
                l = d.location,
                ck = "Y" + t.getFullYear() +
                "M" + t.getMonth() + "D" + t.getDate(),
                p = l.protocol,
                f = ((l.search.indexOf("DBG=") > -1) ? "" : ".min"),
                a = ("https:" == p ? "secure." + m + "js/" : "js." + m);
            if (d.getElementById(id)) return;
            rw = d.createElement(e);
            rw.id = id;
            rw.async = true;
            rw.type = "text/javascript";
            rw.src = p + "//" + a + "external" + f + ".js?ck=" + ck;
            s.parentNode.insertBefore(rw, s);
        }(document, new Date(), "script", "rating-widget.com/"));

        if (wgTransactionContext.namespace == 0)
            $(".WikiaMainContent").prepend('<div class="rw-ui-container"></div>');
    }
}