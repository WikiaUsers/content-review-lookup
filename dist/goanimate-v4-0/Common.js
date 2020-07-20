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
    var adore = "MC Adore Fanboy";
    var carkle = "Admin Animatronic";
    var mii = "The Person who protects MC Adore, this wiki, alies with megaman...IGOR THE MII!";
    var freddy = "Freddy's Friend";
 var braixen = "Braixen";
 var otter = "Sophie the Otter";
 var megaman = "MegaMan";
 var pbf = "Preston's GF";
 var pbj = "PB&J Otter";
 var austimadmin = "Admin with Autism";
 var luna = "Luna Fanboy";
 var psycho = "Psychopath";
 var bigcheese = "Big Cheese";
 var shrekship = "Shrek Worshipper";
 var ebolamaster = "Ebola Master";
 var southpark = "South Park Dude";
 var disney = "Disneyist"; 
 var marvel = "Marvelites";
 var adore = "Igor's Girlfriend";
 var butyou = "All About you!";
 var rp = "Roleplay Account";
 var scout = "The Scout";
 var kool = "The Kool User";
 var founder = "Creator of this Wiki";
 var renkofanboy = "Renko Usami Fanboy/Fangirl";
 var mrloremaker = "Mr. Lore Maker";
 var painiscupcake = "I am Painis Cupcake. I will eat you";
 var bannedfromwikia = "Banned from Wikia";
 var mrdriller = "Mr. Driller Fan";
 var agk = "Angry German Kid Fan";
 var luckystar = "Lucky Star Fan";
 var avgn = "AVGN Fan";
 var marisa = "Marisa Kirisame Fan";
 var sanae = "Sanae Kochiya Fan";
 
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
 
    rights["Igor the Mii"]                      = [founder, marisa, sanae, mrloremaker, mrdriller]
    rights["Carkle the Animatronic"]                      = [admin, carkle, freddy, southpark, scout]
    rights["PB&Jotterisnumber1"]                      = [admin, otter, rollback, pbf, pbj, austimadmin]
    rights["PB&Jotterisnumber1"]                      = [admin, otter, rollback, pbf, pbj, austimadmin] 
    rights["INTELLEGENTATHIEST"]                      = [admin,  bureaucrat, luna, bigcheese, shrekship, psycho, ebolamaster]
    rights["MC Adore"]                      = [butyou, adore, rp]
    rights["KingKool720"]                             = [admin, kool]
    rights["RobbiePwns135"]                               = [admin, bureaucrat, carkle, freddy, austimadmin];
    rights["CoolGamer23"]                      = [agk, luckystar, mrdriller, avgn];
   //
   
   //Globalled users
   rights["KowarsKid83"]                     = [bannedfromwikia];
   rights["Cyborg001"]                     = [bannedfromwikia];
 
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

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/******************** Level system ********************/
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        if ($("#UserProfileMasthead").size()) {
            editRanks = {
                1:"LEVEL 1",
                5:"LEVEL 2",
                15:"LEVEL 3",
                30:"LEVEL 4",
                50:"LEVEL 5",
                75:"LEVEL 6",
                105:"LEVEL 7",
                140:"LEVEL 8",
                180:"LEVEL 9",
                225:"LEVEL 10",
                275:"LEVEL 11",
                330:"LEVEL 12",
                390:"LEVEL 13",
                455:"LEVEL 14",
                525:"LEVEL 15",
                600:"LEVEL 16",
                680:"LEVEL 17",
                765:"LEVEL 18",
                855:"LEVEL 19",
                950:"LEVEL 20",
                1050:"LEVEL 21",
                1155:"LEVEL 22",
                1265:"LEVEL 23",
                1380:"LEVEL 24",
                1500:"LEVEL 25",
                1625:"LEVEL 26",
                1755:"LEVEL 27",
                1890:"LEVEL 28",
                2030:"LEVEL 29",
                2175:"LEVEL 30",
                2325:"LEVEL 31",
                2480:"LEVEL 32",
                2640:"LEVEL 33",
                2805:"LEVEL 34",
                2975:"LEVEL 35",
                };
            editCount = $("#UserProfileMasthead .tally em").html().replace(",","");
            if (editCount) {
                for(i in editRanks) if (editCount >= parseInt(i)) editRank = editRanks[i];
                $("#UserProfileMasthead hgroup").append($("<span>").addClass("tag").html(editRank));
            }
        }
    }
}

/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:Yew_Grove", "Forum:Clan_Chat", "RuneScape:Page_maintenance", "Special:AbuseLog", "Special:NewFiles"];
 
var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxrefresh.js');
 
/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsetables.js');
 
/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');
 
/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');
 
/* Display Timer */
importScript('MediaWiki:Common.js/displaytimer.js');
 
/* Dynamic Navigation Bars (experimental) */
importScript('MediaWiki:Common.js/Nav.js');
 
/* Other */ 
importScript('MediaWiki:Common.js/other.js');


/**
  * Function to easily embed SWF files
  * Place the following where you want to embed some file:
  * <div class="flash-wrapper">http://path/to/your/file</div>
  * Flash files from untrusted sources can be dangerous. Use caution.
*/
 
(function(){
	var flashobjects, i, url, embed;	
	
	// Enumerate over the files that need to be embedded
	flashobjects = document.getElementsByClassName( "flash-wrapper" ) || [];
	
	for ( i = 0; i < flashobjects.length; i++ ) {	
		url = flashobjects[i].textContent;
		
		if ( url.indexOf( "http" ) !== 0 ) {
			// If it's not a valid http(s) URL, continue, and log the error
			console.log( "Lightning: Skipped the" + ( i + 1 ) +
				"th Flash video - " + url + " is not a well-formed HTTP(S) URL" );
			continue;
			
		} else {
			// Otherwise, embed
			flashobjects[i].textContent = "";
			embed = document.createElement( "embed" );
			embed.src = url;
			embed.type = "application/x-shockwave-flash";
			flashobjects[i].appendChild( embed );
		}
	}
}());