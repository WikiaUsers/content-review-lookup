/* Extra User Right tags */
function addMastheadTags() {
    var rights  = {},
        user    = "";
 
    // BEGIN LIST OF ACCOUNTS WITH RIGHTS
    rights["Cooksey"]                   = ["Former Wikia site Landlord/Possessor"];
    rights["Crazy Muzzarino"]           = ["DVD Database Owner", "Manager", "V.I.P Member"];
    rights["Cms13ca"]                   = ["DVD Database Owner", "Manager"];
    rights["TheDisneyGamer"]            = ["V.I.P member"];
    rights["DisgustWANLanders"]         = ["Local Assistant"];
    rights["RachelMack1992"]            = ["Fan-fictionist"]
    rights["RRabbit42"]                 = ["V.I.P member"];
    rights["Jennifer Doll"]             = ["V.I.P member"];
    rights["Additive Orb Switch Effect"]         = ["DVD Database Owner", "Manager", "V.I.P Member"];
    rights["LegalizeAnythingMuppets"]   = ["V.I.P member"];
    rights["Crazy Muzzarino (alternate)"]  = ["DVD Database Owner", "Muzzarino's backup account", "Manager", "V.I.P Member"];
    // END LIST OF ACCOUNTS WITH RIGHTS
 
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
 

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});