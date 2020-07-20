var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'dark',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');

// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function () {
    var rights = {};
    var admin = "Admin";
    var bureaucrat = "Bureaucrat";
    var chatmoderator = "Chat Moderator";
    var rollback = "Rollback"
    var wikiastar = "Wikia Star"
 
    // Begin list of accounts given extra user rights icons
    //
    // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
 
    //Rollback + ChatMod

     

    //Administrator
 
  
    rights['Mostapha Myth hunter']           = [Administrator],
 
   //Bureaucrat
 
    
  rights["SuperMythGangsta"]             = [Founder];
 
    // End list of accounts given extra user rights icons
 
 
    if (wgPageName.indexOf("Special:Contributions") != -1) {
        newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
        unfinishedTitle = newTitle;
 
        while (unfinishedTitle.search("_") > 0) {
            unfinishedTitle = unfinishedTitle.replace("_", " ");
        }
 
        userName = unfinishedTitle;
 
    } else {
        userName = wgTitle;
        userName.replace("User:", "");
    }
 
    if (typeof rights[userName] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[userName].length; i < len; i++) {
            // add new rights
            $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});

importScriptPage('MediaWiki:Wikia.js/snow.js', 'watchdogs');
$('.Chat').not('.Chat:first').css('background', 'url(http://cdn.slashgear.com/wp-content/uploads/2013/02/china_flag_digital.jpg)');