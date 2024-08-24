$(function() {
    var rights = {};
/*Quelle: http://candybox.wikia.com/wiki/MediaWiki:Wikia.js */ 
    rights["LeConquérant"]           = ["Administrateur", "Bureaucrate", "Looney-créateur"],
    rights["GashomyWiki"]           = ["Administrateur", "Bureaucrate"];
 
     if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});