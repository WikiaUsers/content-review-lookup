// <source lang="JavaScript">
 
// WRITTEN BY USER:COOLKARIM
 
$(function() {
    var rights = {};

    // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
    
    // FOUNDER
    
    rights["Cheetos8089"]          = ["Founder", "Bureaucrat", "Administrator"];

    // BUREAUCRATS

    rights["CoolKarim"]            = ["Bureaucrat", "Administrator"],
    rights["Bestgamerever"]        = ["Bureaucrat", "Administrator"],

    // ADMINISTRATORS
    
    rights["Amir999990"]           = ["Administrator"],
    rights["Brainpop"]             = ["Administrator"],
    rights["Cannoncool234"]        = ["Administrator"],
    rights["CaptainAmericaBoy24"]  = ["Administrator"],
    rights["CheeseRoxTheWorld"]    = ["Administrator"],
    rights["FireFlows"]            = ["Administrator"],
    rights["Golfpecks256"]            = ["Administrator"],
    rights["I love Wii party"]     = ["Administrator"],
    rights["Minxbunnymayotte"]     = ["Administrator"],
    rights["Neon1Umbreon"]         = ["Administrator"],
    rights["Waybig101"]            = ["Administrator"],
    rights["White44Tree"]          = ["Administrator"],

    // ROLLBACK
    
    // BOTS

    rights["Default"]              = ["Bot"];

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