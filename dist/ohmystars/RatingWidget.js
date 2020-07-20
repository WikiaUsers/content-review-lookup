(function(d, t, e, m){
    
    // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){

        RW.init("701b5382cd621c0efb621a2034e1f766");
        
        RW.initClass( '1', {
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
        
        RW.initClass( '2', {
            "advanced": {
                "layout": {
                    "align": {
                        "hor": "center",
                        "ver": "bottom"
                    },
                    "lineHeight": "10px"
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