// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
    var rights = {};
 
    /**********************************************************************/
    /******** BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS ********/
    /**********************************************************************/
 
    // ADMINISTRATORS
 
    rights["Lil' Trunks"]          = ["Administrator"],
    rights["Yuzura"]               = ["Founder", "Administrator", "Bureaucrat"],
 
    // CHAT MODERATORS
 
    rights["Disasterology"]        = ["Chat Moderator"],
    rights["XGlass Reflection"]    = ["Chat Moderator"],
 
    // ROLLBACK
 
    rights[" "]                    = ["Rollback"],
 
    // BOTS
 
    rights["WikiaBot"]             = ["Wikia Bot"],
    rights["Wikia"]                = ["Wikia Bot"],
    rights["Yuzubot"]              = ["Bot"],
 
    /**********************************************************************/
    /********* END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS *********/
    /**********************************************************************/
 
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
// </source>