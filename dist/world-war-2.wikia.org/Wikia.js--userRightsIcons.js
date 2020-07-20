// 04:08, January 12, 2013 (UTC)
// <source lang="JavaScript">

// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

function addMastheadTags() {
  var rights = {};

  // BEGIN List of Accounts Given Extra User Rights Icons

    rights["Corkeyandpals"]   = ["Warrant Officer","Seasoned Veteran"]
    rights["Fargo84"]         = ["General of the Air Force","Intelligence Officer"],
    rights["Crazy Frog Fish"]  = ["Corporal", "Battle Hardened"]
    rights["MadMarek"]  = ["Naval Engineer"]
    rights["Nelfen"]          = ["Fleet Admiral"],
    rights["Sascha Kreiger"]  = ["Colonel","Head of Military Police"],
    rights["SENIRAM"]         = ["Senior Airman","Seasoned Veteran"]
    rights["SpikeToronto"]    = ["Military Advisor"],
    rights["Vapor Snake"]     = ["General of the Army"],
    rights["MachtyJangles"]   = ["Logistics Officer"],
    rights["Sean4333"]        = ["Technical Sergeant"],
    rights["UM98"]            = ["Sergeant"],
    rights["Unknown User 18"] = ["Petty Officer 1st Class"],
    rights["PanzerKnacker"]   = ["Professional Tank Killer", "Bot"];

  // END List of Accounts Given Extra User Rights Icons

  // BEGIN Script to Remove Old Rights Icons & Insert New

    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
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