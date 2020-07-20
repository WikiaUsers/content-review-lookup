(function(d, t, e, m){
    // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){
        RW.init({
            huid: "150370",
            uid: "e84ce396f9f582e577d9b07b182bc3d1",
            source: "website",
            options: {
                "advanced": {
                    "layout": {
                        "align": {
                            "hor": "center",
                            "ver": "top"
                        }
                    },
                    "star": {
                        "stars": 10
                    },
                    "font": {
                        "italic": true,
                        "type": "\"Lucida Console\""
                    },
                    "text": {
                        "rateGood": "Bon"
                    }
                },
                "style": "oxygen",
                "lng": "fr"
            } 
        });
        RW.render();
    };

    // Append Rating-Widget JavaScript library.
    var rw, s = d.getElementsByTagName(e)[0], id = "rw-js",
        p = d.location.protocol, a = ("https:" == p ? "secure." + 
        m + "js/" : "js." + m), ck = "Y" + t.getFullYear() + "M" + 
        t.getMonth() + "D" + t.getDate();
    if (d.getElementById(id)) return;              
    rw = d.createElement(e);
    rw.id = id; rw.async = true; rw.type = "text/javascript";
    rw.src = p + "//" + a + "external.min.js?ck=" + ck;
    s.parentNode.insertBefore(rw, s);
}(document, new Date(), "script", "rating-widget.com/"));