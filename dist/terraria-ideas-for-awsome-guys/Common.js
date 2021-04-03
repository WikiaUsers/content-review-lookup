/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
    var rights = {};
 
    rights["Spyrothedragon2222"] = ["Founder", "Administrator", "Beta Tester", "Redigit"],
 
    rights["Arthurtilly"] = ["Administrator", "Yrimir", "Beta Tester", "Guide"],
 
    rights["Khajiiti Nerd"] = ["Chat Moderator", "The Twins"],

    right["Leroythe31st"] = ["Green Slime", "Beta Tester"],
 
    if (typeof rights[wgTitle] != "undefined") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});