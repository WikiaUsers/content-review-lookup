function addMastheadTags() {
    var rights  = {},
        user    = "";
 
    rights["Ppeckc"]        = ["High Commander", "Code Monkey", "Founder", "Eashan", "Ppeckc", "Retired"],
    
    rights["StarWarsTiger"] = ["High Commander", "Super Commander", "Admin", "Eashan", "Bureaucrat"],
 
    rights["HapySong"] = ["Mod", "Awesomeness"],

    rights["Non-existent User"] = ["Do not remove this line"];
 
   if (wgCanonicalSpecialPageName == "Contributions") {
       user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
}
 
$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});
 
 