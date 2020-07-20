// <source lang="JavaScript">

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

function addMastheadTags() {
    var rights  = {},
        user    = "";

    // BEGIN List of Accounts Given Extra User Rights Icons

    // STARK INDUSTRIES STAFF
    rights["Hail Storms Wrath"] = ["Stark Industries CEO", "Director Storm", "Hyper Active"],
    rights["Ermac270"]          = ["Stark Industries Head of Security"],
    rights["Killer365"]         = ["Stark Industries CEO", "Dark Knight", "Butternut"],
    rights["Rappy 4187"]        = ["Testing user"],
    

    // TEST ACCTS, BOTS, & AWB
    rights["WikiaBot"]          = ["Wikia Bot"],
    rights["Wikia"]             = ["Wikia Bot"],

    rights["Non-existent User"] = ["Do not remove this line"];

    // END List of Accounts Given Extra User Rights Icons

    // BEGIN Script to Remove Old Rights Icons & Insert New

    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }

    if (typeof rights[user] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[user].length; i < len; i++) {
            // add new rights
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
    // END Script to Remove Old Rights Icons & Insert New
}

$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});

// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

// </source>