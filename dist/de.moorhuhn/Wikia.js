var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "bottom", 
	colorScheme: "light",
	buttonSize: "25px",
	wikiTwitterAccount: "wikia_de"
};
importScriptPage('SocialIcons/code.js','dev');

$(function() {
    var rights = {};
/*Rechte*/ 
    rights["Helge pheno"]           = ["Offiziell"];



     if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});