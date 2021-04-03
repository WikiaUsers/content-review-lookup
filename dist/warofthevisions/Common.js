/* Any JavaScript here will be loaded for all users on every page load.                      */
/* JS placed here is optional and will force the equalization the main page layout columns   */
/*                                                                                           */
/* This section js has been moved to two different pages: MediaWiki:3colmainpage.js and      */
/* MediaWiki:2colmainpage.js                                                                 */
/* Wiki managers can either use one or the other for their wiki and overwrite this page with */
/* customized version, or use the import commands shown below                                */
/*                                                                                           */
/* The following is for the regular 2 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:2colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/*                                                                                           */
/* The following is for the regular 3 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:3colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/* ***************************************************************************************** */

/*mw.loader.load('/index.php?title=MediaWiki:CustomDiscordWidget.js&action=raw&ctype=text/javascript');*/


/* Required for Rangedz' 3d map script */

if(mw.config.get('wgCategories').indexOf("Loadable Map") > -1){
    var threeJs         = "https://thealchemistcode.gamepedia.com/index.php?title=MediaWiki:Three.js&action=raw&ctype=text/javascript";
    var alcCodeMapVisJs = "https://thealchemistcode.gamepedia.com/index.php?title=MediaWiki:AlcCodeMapVis.js&action=raw&ctype=text/javascript";
    var divUpdater = function(str){
        Array.from(document.getElementsByClassName("loadable-map")).forEach(function(domElement, index) {
            domElement.innerHTML = str;
        });
    };
    var loadMaps = function(){
        divUpdater("Fetching Three.js...");
         $.getScript(threeJs)
            .done(function(script, textStatus){
                console.log('Three.js loaded');
                divUpdater("Fetching map generator script...");
                $.getScript(alcCodeMapVisJs)
                    .done(function(script2, textStatus2){
                        //Things here run AFTER the script that was just loaded
                        console.log('AlcCodeMapVis.js loaded');
                        AlcCodeMapVis.loadMaps();
                    })
                    .fail(function(jqxhr, settings, exception){
                        divUpdater("Unable to fetch the map generator script, try to reload the page");
                        console.log("Unable to fetch "+alcCodeMapVisJs);
                        console.log("Exception: " + exception.stack);
                    });
            })
            .fail(function(jqxhr, settings, exception){
                divUpdater("Unable to fetch Three.js, try to reload the page");

                console.log("Unable to fetch "+threeJs);
                console.log("Exception: " + exception.stack);
        });
    };

    Array.from(document.getElementsByClassName("wikiButton")).forEach(function(domElement, index) {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = domElement.dataset.content;
        button.onclick = loadMaps;
        domElement.appendChild(button);
    });
}

/* Required for Rangedz' 3d map script */