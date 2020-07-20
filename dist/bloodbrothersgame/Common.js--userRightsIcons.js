/* Any JavaScript here will be loaded for all users on every page load. */

// Written by User:Rappy_4187, Aion Wiki
// Currently maintained by Trellar
// Last Updated May 4, 2013 (UTC)
// <source lang="JavaScript">

function addMastheadTags() {
    var rights = {};

    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

      // WIKI MODERATOR

    rights["Rhinecanthus"] = ["Wiki Moderator"],
    rights["Maikl21"] = ["Wiki Moderator"],
    rights["Nixtyle"] = ["Wiki Moderator"],
    rights["Fangoram "] = ["Wiki Moderator"],
    rights["TyRelish "] = ["Wiki Moderator"],
    rights["GammyGoulds"] = ["Wiki Moderator"],
    rights["BrandIsGrand"] = ["Wiki Moderator"],
    rights["Jareif"] = ["Wiki Moderator"],
    
    // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    if (wgCanonicalSpecialPageName == "Contributions") {
        var user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        var user = wgTitle;
    }

    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();

        for (var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
};

$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});

// </source>