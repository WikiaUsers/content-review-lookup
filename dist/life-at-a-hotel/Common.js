/* Any JavaScript here will be loaded for all users on every page load. */
/* NON-ADMINS AND PEOPLE WHO DON'T KNOW HOW JAVASCRIPT WORKS, DO NOT TOUCH.
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
    var admin = "Staff";
    var bureaucrat = "Golden Helper aka Brucecat aka Bureaucrat";
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
 var austimadmin = "Admin with Autsim"
 var luna = "Luna Fanboy"
 var psycho = "Psychopath"
 var bigcheese = "Big Cheese"
 var shrekship = "Shrek Worshipper"
 var ebolamaster = "Ebola Master"
 var southpark = "South Park Dude"
 var disney = "Disneyist" 
 var marvel = "Marvelites"
 var rapperguy = "MC Adore 'n PaRappa"
 var founder = "Manager"
 var tomodachi = "Tomodachi Life Fan"
 var tbonnie = "Toy Bonnie" 
 var allaboutyou = "All About You!"
 var adore = "Igor's Girlfriend"
 var rp = "Ropeplay Account"
 var poptecr = "POPTECR Member"
 var poptecrlead = "POPTECR Leader"
 
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
 
    rights["Igor the Mii"]                      = [founder, rapperguy, megaman, poptecr, poptecrlead]
    rights["Carkle the Animatronic"]                      = [admin, carkle, freddy, southpark]
    rights["PB&Jotterisnumber1"]                      = [admin, otter, rollback, pbf, pbj, austimadmin, poptecr]
    rights["INTELLEGENTATHIEST"]                      = [admin,  bureaucrat, luna, bigcheese, shrekship, psycho, ebolamaster] 
 rights["Yong feng"]                      = [admin,  bureaucrat, tbonnie] 
 rights["MC Adore"]                      = [admin, adore, allaboutyou, rp];
 
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