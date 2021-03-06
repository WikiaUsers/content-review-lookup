// <source lang="JavaScript">
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

function addMastheadTags() {
    var rights = {},
        user;

    // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    // STAFF

    // BUREAUCRATS
 
    rights["Princess Diva"]          = ["It Girl"];
    rights["Thenchick"]         = ["Bureaucrat"];
    

    // ADMINS
 
    rights["GossipGirlBot"]        = ["Bot"];  

    // BOT
 
    // TRANSCRIPT TEAM

    // IMAGE WIZARDS

    // ROLLBACK MODS

    // ROLLBACKS

    // CHAT MODERATORS
 
    // END List of Accounts Given Extra User Rights Icons

    // BEGIN Script to Remove Old Rights Icons & Insert New

    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { user = wgTitle; }

    if (typeof rights[user] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for( var i=0, len=rights[user].length; i < len; i++) {
            // add new rights
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
    // END Script to Remove Old Rights Icons & Insert New
};
 
$(function() {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
// </source>