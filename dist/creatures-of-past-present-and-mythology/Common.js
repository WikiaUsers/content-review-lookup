$(function() {
    var rights = {};
 
    rights["Daniel.gormley.77"]   = ["Founder"],
    rights["Dross_2001"]   = ["Backup Account"],
    rights["JustAnIng"]   = ["Big Cat", "Semi-active"]
 
 
    if (typeof rights[wgTitle] != "undefined") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});