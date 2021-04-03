/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    var rights = {};
 
    rights["GforGolden"] = [ "Golden Security Guard"],
 
    rights["Weegeespider"] = ["Administrator", "Human Bonnie"],
 
   if (typeof rights[wgTitle] != "founder") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});