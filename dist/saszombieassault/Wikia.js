// <source lang="JavaScript">
 
// WRITTEN BY RAPPY_4187
 
$(function() {
    var rights = {};
 
    /**********************************************************************/
    /******** BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS ********/
    /**********************************************************************/
 
    rights["Aqdevy"]                  = ["Founder"],
    rights["Bing445"]                 = ["Administrator"],
    rights["Deus Gladiorum"]          = ["Administrator"],
    rights["Ghostwolf18"]             = ["Administrator"],
    rights["GoldenApple NB"]          = ["Administrator", "Bureaucrat"],
    rights["Lady Blue"]               = ["Administrator"],
    rights["Rapid Fire Productions"]  = ["Administrator"],
    rights["Sbin2"]                   = ["Administrator", "Bureaucrat"],
    rights["Super Saiyan 7 Somebody"] = ["Administrator", "Bureaucrat"],
    rights["Zombie pls"]              = ["Administrator", "Bureaucrat"];
 
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