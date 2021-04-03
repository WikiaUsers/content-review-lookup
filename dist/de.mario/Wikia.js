/*Titel*/
$(function() {
    var rights = {};
/*Quelle: http://candybox.wikia.com/wiki/MediaWiki:Wikia.js */ 
    rights["Gameheld"]             = ["Admin", "Bürokrat", "Held der Games"],
    rights["GameBot"]              = ["Bot", "piep-piep!"],
    rights["Yoshi 1-Up"]           = ["Suchti"],
    rights["Wunderluma"]           = ["Luma-Liebhaber"],
    rights["General grievous36"]   = ["Bowser-Fan", "Wario-Hasser"],
    rights["Rieke Hain"]           = ["Gründer"],
    rights["Wikia"]                = ["Wikia-Bot"],
    rights["MarioWiki Bot"]        = ["Bot"],
    rights["BotStar"]              = ["Bot"],
    rights["BossoBot"]             = ["Bot"];
    rights["ThaumicBot"]             = ["Bot"];

     if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});

importScriptPage('MediaWiki:Wikia.js/editCount.js','rhf');