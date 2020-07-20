/* touchicon (change ips icon w/o affecting monobook users) (experimental) */
            function touchIcon() {
                for(var i = 0; i < document.getElementsByTagName("link").length; i++) {
                    if(document.getElementsByTagName("link")[i].rel == 'apple-touch-icon') {
                        var orig = document.getElementsByTagName("link")[i];
                    }
                }
                document.getElementsByTagName("head")[0].removeChild(orig);
                var icon = document.createElement("link");
                icon.rel = "apple-touch-icon";
                icon.href = "https://images.wikia.nocookie.net/__cb20110401032707/shrek/images/archive/b/bc/20111029054549%21Wiki.png";
                document.getElementsByTagName("head")[0].appendChild(icon);
            }
            touchIcon();