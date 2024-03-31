/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */
// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function () {
    var rights = {};
    var admin = "Admin of this Wiki";
    var bureaucrat = "Gold Helper";
    var staff = "<a href='http://community.wikia.com/wiki/Community Central:Staff'>Staff</a>";
    var vstf = "<a href='http://community.wikia.com/wiki/Help:SpamTaskForce'>VSTF</a>";
    var rollback = "Rollback";
    var adore = "MC Adore Fanboy"
    var carkle = "Admin Animatronic"
    var mii = "The Person who protects MC Adore, this wiki, alies with megaman...IGOR THE MII!"
    var freddy = "Freddy's Friend"
 var braixen = "Braixen"
 var otter = "Sophie the Otter"
 var megaman = "MegaMan"
 var pbf = "Preston's GF"
 var pbj = "PB&J Otter"
 var austimadmin = "Admin with Autism"
 var luna = "Luna Fanboy"
 var psycho = "Psychopath"
 var bigcheese = "Big Cheese"
 var shrekship = "Shrek Worshipper"
 var ebolamaster = "Ebola Master"
 var southpark = "South Park Dude"
 var disney = "Disneyist" 
 var marvel = "Marvelites"
 var adore = "Igor's Girlfriend"
 var butyou = "All About you!"
 var rp = "Roleplay Account"
 var scout = "The Scout"
 var kool = "The Kool User"
 var jerk = "Jerk who got us out of GoAnimate Extended Wiki"
 var pc = "Painis Cupcake"
 var owner = "This User is Igor the Mii AKA The Founder"
 
    // Begin list of accounts given extra user rights icons
    //
    // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
 
   //Administrator
 
    rights['Someone is an admin']          = [admin],
    rights['Someone else is an admin']     = [admin],
 
 
   //Bureaucrat and VSTF
 
    rights["Jr Mime"]                     = [bureaucrat, vstf],
 
   //Bureaucrat
 
    rights["Ozuzanna"]                    = [bureaucrat],
 
 
   //Staff
 
    rights["Rappy 4197"]                  = [staff],
 
   //Rollback
 
    rights["Igor the Mii"]                      = [owner, pc, scout]
    rights["Carkle the Animatronic"]                      = [admin, carkle, freddy, southpark, scout]
    rights["PB&Jotterisnumber1"]                      = [admin, otter, rollback, pbf, pbj, austimadmin]
    rights["PB&Jotterisnumber1"]                      = [admin, otter, rollback, pbf, pbj, austimadmin] 
    rights["INTELLEGENTATHIEST"]                      = [admin,  bureaucrat, luna, bigcheese, shrekship, psycho, ebolamaster]
    rights["MC Adore"]                      = [butyou, adore, rp]
    rights["KingKool720"]                             = [admin, kool]
    rights["RobbiePwns135"]                               = [admin, bureaucrat, carkle, freddy, austimadmin];
   //
 
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

importScriptPage("User:Monchoman45/ChatHacks.js","c"); // Put this on your MediaWiki:Common.js
importScriptPage('User:Monchoman45/ChatHacks.js', 'c');