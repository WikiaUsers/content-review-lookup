mw.loader.using("jquery", function () {
    if (mw.config.get("wgPageName") === "User:QuirkyBurger") { 
        function createBurger() {
            var burger = $("<img>")
                .attr("src", "https://static.wikia.nocookie.net/doawk/images/9/91/Burgertransparent.png/revision/latest?cb=20251001040700") 
                .css({
                    position: "fixed",
                    top: "-100px",
                    left: Math.random() * $(window).width() + "px",
                    width: (40 + Math.random() * 40) + "px",
                    zIndex: 9999,
                    pointerEvents: "none",
                    transition: "transform 4s linear"
                });
            
            $("body").append(burger);

            setTimeout(function () {
                burger.css("transform", "translateY(" + (window.innerHeight + 200) + "px) rotate(" + (360 + Math.random() * 720) + "deg)");
            }, 50);

            setTimeout(function () {
                burger.remove();
            }, 5000);
        }

        // spawn multiple burgers per wave
        setInterval(function () {
            for (var i = 0; i < 5; i++) {
                createBurger();
            }
        }, 700);
    }
});
mw.loader.using("jquery", function () {
    if (mw.config.get("wgPageName") === "User:RandomStuff460") { 
        function createDurian() {
            var burger = $("<img>")
                .attr("src", "durian.png") 
                .css({
                    position: "fixed",
                    top: "-100px",
                    left: Math.random() * $(window).width() + "px",
                    width: (40 + Math.random() * 40) + "px",
                    zIndex: 9999,
                    pointerEvents: "none",
                    transition: "transform 4s linear"
                });
            
            $("body").append(durian);

            setTimeout(function () {
                burger.css("transform", "translateY(" + (window.innerHeight + 200) + "px) rotate(" + (360 + Math.random() * 720) + "deg)");
            }, 50);

            setTimeout(function () {
                durian.remove();
            }, 5000);
        }

        // spawn multiple durians per wave
        setInterval(function () {
            for (var i = 0; i < 5; i++) {
                createDurian();
            }
        }, 700);
    }
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Status/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});