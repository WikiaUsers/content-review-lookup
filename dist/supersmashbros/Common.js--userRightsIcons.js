// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
    var rights = {};

    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    // BUREAUCRATS

    rights["TheUltraman"]          = ["Bureaucrat", "Administrator"],
    rights["Plasmaster"]           = ["Bureaucrat", "Administrator"],

    // ADMINISTRATORS
    
    rights["AceFedora"]            = ["Administrator"],
    rights["Zmario"]               = ["Administrator"],

    // ROLLBACK

    rights["Nova Stopmonk"]        = ["Rollbacker"],
    rights["Oni Dark Link"]        = ["Rollbacker"],
    rights["Smasher51"]            = ["Rollbacker"],
    
    // BOTS
    
    rights["Niner-7"]              = ["Bot"];
 
    // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
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