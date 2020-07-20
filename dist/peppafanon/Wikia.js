// Tags
 
 function addMastheadTags() {
    var rights  = {},
        user    = "";

    rights["Osome_oli"]                     = ["MLG Noscoper","Bureaucrat","Admin"],
    rights["CreationBeTheWorld23"]          = ["Dead"],

    rights["Non-existent User"]             = ["Do not remove this line"];

 
    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }

    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
}

$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});