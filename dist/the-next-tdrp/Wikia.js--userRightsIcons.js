// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons

    rights["RiMiEg007"]                   = ["Founder","God","Active"]
    rights["Mr.Duncan007"]                   = ["Co-founder","Administrator","Inctive"]
    rights["AssyrianAsylum"]           = ["Administrator","Active"]
    rights["TheWalkingKen"]                = [""Administrator","Content Moderator","Active"]
    rights["BlooKaboom"]                = [""Administrator","Content Moderator","Active""]
    rights["Jakerz69"]                  = ["Bureaucrat","Active"]
    rights["Cody 2015"]           = ["Resident Weird Guy","Rollback","Active"]
    rights["LlewellynIsAwesome!"]           = ["Administrator","Inctive"]
    rights["The Villainous Vulture"]           = ["Administrator","Inactive"]
    rights["BoysCanLikeItToo"]           = ["Chat Moderator","Inactive"]
    rights["Teamdarkfan4"]           = ["Chat Moderator","Inactive"]
    // HA
 
    
    rights["Chwiis"]           = ["Banned"]
    rights["Ethan Oka"]           = ["Banned"]
    rights["ToasterSnifferBreadisGood"]           = ["Banned"]
    rights["CHWIISY"]           = ["Banned"]
    rights["SPAZ92"]           = ["Banned"]
    rights["JoFan33"]           = ["Banned"]
    rights["Ogrelord420"]           = ["Banned"]
    rights["Chwiis Sock"]           = ["Banned"]
    rights["Teamdarkfag4"]           = ["Banned"]
    rights["AqueerInfinity"]           = ["Banned"]
    rights["Darules"]           = ["Banned"]
    rights["RiMiEg007 Fan"]           = ["Banned"]
    rights["Chweer"]           = ["Banned"]
    rights["FAGeoff"]           = ["Banned"]
    rights["GOsama"]           = ["Banned"]
    rights["Cody 2016"]           = ["Banned"]
    rights["AquaInfinity"]           = ["Banned"]
    rights["AquaInfinity 2.0"]           = ["Banned"]
    rights["Heozaki"]           = ["Banned"]
    rights["ChunkyChipackers"]           = ["Banned"]
    rights["BatJarleyPatrickCher"]           = ["Banned"]
    rights["Heroic Hippos"]           = ["Banned"]
    rights["DestructiveMilkshake"]           = ["Banned"]
    rights["DerpyandDawn"]           = ["Banned"]
    rights["SammyNotSamey"]           = ["Banned"]
    rights["Drfizwuz997xlol"]           = ["Banned"]
    rights["Rocky LXIX"]           = ["Banned"]
    rights["WhatZoeyhasfans"]           = ["Banned"]
    rights["TDFan13"]           = ["Banned"]
    rights["Brajira Is Number 1"]           = ["Banned"]
    rights["ToddKauffmanOfficial"]           = ["Banned"]
    rights["ChunkyChipackers"]           = ["Banned"]
    rights["Blast sonic flash 0"]           = ["Banned"]
    rights["Superdawnfan"]           = ["Banned"]

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