/* Any JavaScript here will be loaded for all users on every page load. */

require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
 
    var loc = location.hash.replace("#", "").replace(/\./g, "%");
    var hashes = location.hash.replace(/\./g, "%").replace(/\%23/g, "#").split('#');
 
    if (loc !== "") {
        var i;
        for (i = 1; i < hashes.length; i++) {
            $(".tabber .tabbernav a").filter(function() {
                return (mw.util.wikiUrlencode($(this).attr('title') ? $(this).attr('title') : $(this).attr('data-tabber-title')) == hashes[i]);
            }).click();
        }
 
        document.onreadystatechange = function () {
          if (document.readyState == "complete") {
                setTimeout(
            function() {
              location.hash = hashes[i - 1];
            }, 500);
          }
        }
    }
 
    $(".anchorLink > a").click(function(){
        var loc = $(this).attr('href').replace("#", "").replace(/\./g, "%");
        var hashes = $(this).attr('href').replace(/\./g, "%").replace(/\%23/g, "#").split('#');
        console.log(hashes);
 
        if (loc !== "") {
            var i;
            for (i = 1; i < hashes.length; i++) {
                $(".tabber .tabbernav a").filter(function() {
                    return (mw.util.wikiUrlencode($(this).attr('title') ? $(this).attr('title') : $(this).attr('data-tabber-title')) == hashes[i]);
                }).click();
            }
 
            setTimeout(
            function() {
              location.hash = hashes[i - 1];
            }, 100);
        }
    });
});