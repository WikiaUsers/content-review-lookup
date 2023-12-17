// WRITTEN BY USER:RAPPY_4187
 
function addMastheadTags() {
    var rights  = {},
        user    = "";
        
    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
    rights["Example"]       = ["Founder","Bureaucrat","Administrator"];
 
    // BUREAUCRATS
    rights["Example"]       = ["Bureaucrat","Administrator"];
 
    // ADMINISTRATORS
    rights["Example"]       = ["Administrator"];
 
    // ROLLBACK
    rights["Example"]       = ["Rollback"];
 
    // CHATMODS
    rights["PawzFan"]       = ["Javascript master"];
 
    // TEST ACCTS, BOTS, & AWB
    rights["WikiaBot"]      = ["Wikia Bot"]; 
    rights["Wikia"]         = ["Wikia Bot"];
    rights["Example Bot"]   = ["Bot"];
    rights["Gale is nothing other than the boss"]   = ["Underaged user","autoconfirmed user"]
    // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
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