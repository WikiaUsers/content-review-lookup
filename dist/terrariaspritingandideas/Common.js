/*User Tags*/

$(function() {
    var rights = {};
 
    rights["Anthony_Plays"]   = ["Founder", "Bureaucat"];
    
    rights["AEG:Terraria_Lover"]   = ["Bureaucat"];

if (typeof rights[wgTitle] != "undefined") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});