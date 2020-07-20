/* Any JavaScript here will be loaded for all users on every page load. */
/* Special thanks to User:Ohmystar
   for figuring out how to put different customized ratings on wikis! */

(function(d, t, e, m){
 
    // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){
 
        RW.init("00753f0423a8ed7fdcc7bf6ad97cff49");
 
        RW.initClass( 'flame', {
            "advanced": {
                "layout": {
                    "align": {
                        "hor": "center",
                        "ver": "top"
                    },
                    "lineHeight": "10px"
                },
                "star": {
                    "stars": 10
                },
                "font": {
                    "size": "8px"
                },
                "text": {
                    rateThis: "Rate this article"
                }
            },
            "size": "medium",
            "style": "flames"
        });
 
        RW.initClass( 'mask', {
            "advanced": {
                "layout": {
                    "lineHeight": "20px"
                },
                "font": {
                    "size": "8px"
                },
                "text": {
                    rateThis: "Love the subject?"
                }
            },
            "size": "large",
            "type": "nero",
            "style": "masks"
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