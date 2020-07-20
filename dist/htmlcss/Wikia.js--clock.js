require(["wikia.window"], function(window){
    $(importArticle({
        type: "script",
        article: "u:carnage-test:MediaWiki:Clock.js"
    })).load(function(){
        var Clock = new Clock({
            target: $('.Clock')
        });

        Clock.formatTime();
        Clock.fire("hc.clock.start");
        Clock.init();
        window.HCClock = Clock;
    });
});