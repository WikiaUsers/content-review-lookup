/*Label*/
function addMastheadTags() {
    var rights  = {},
        user    = "";
        
    // Quelle: http://candybox.wikia.com/wiki/MediaWiki:Wikia.js
    rights["AmonFatalis"]             = ["Admin-Mentor"];
 
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