/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */



/* Code modèle "USERNAME" de Mihawk Moha */ 
$(function () {
if (window.disableUsernameReplace ||
mw.config.get('wgUserName') === null) return;
$('span.insertusername').html(mw.config.get('wgUserName'));
});

/* Notation articles */

(function(d, t, e, m){
        // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){
 
        RW.init({
            huid: "210335",
            uid: "a5a26897bf255c20d62eaf2a667fde46",
            source: "website",
            options: {
                "size": "medium",
                "style": "oxygen"
            } 
        });
        RW.render();
    };
        // Append Rating-Widget JavaScript library.
    var rw, s = d.getElementsByTagName(e)[0], id = "rw-js",
        l = d.location, ck = "Y" + t.getFullYear() + 
        "M" + t.getMonth() + "D" + t.getDate(), p = l.protocol,
        f = ((l.search.indexOf("DBG=") > -1) ? "" : ".min"),
        a = ("https:" == p ? "secure." + m + "js/" : "js." + m);
    if (d.getElementById(id)) return;              
    rw = d.createElement(e);
    rw.id = id; rw.async = true; rw.type = "text/javascript";
    rw.src = p + "//" + a + "external" + f + ".js?ck=" + ck;
    s.parentNode.insertBefore(rw, s);
    }(document, new Date(), "script", "rating-widget.com/"));
 
if ( wgTransactionContext.namespace == 0 )
$(".WikiaMainContent").prepend('<div class="rw-ui-container"></div>');