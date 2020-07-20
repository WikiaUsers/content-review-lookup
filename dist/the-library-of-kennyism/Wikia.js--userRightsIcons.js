// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
    var rights = {};
 
    // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["SCP-012"]           = ["Pope"],
    rights["Bloxxasourus"]           = ["High Priest"],
    rights["InsaneHippo"]        = ["Priest"],
    rights["KatieTheAndreaFan"]    = ["Priest"],
    rights["TheCaulkingDead"]    = ["Disciple"],
    rights["Paul ''Jesus'' Monroe"]    = ["Disciple"],
    rights["GhostWolf716"]    = ["Elite Disciple"],
    rights["Lizzie Samuels"]    = ["Elite Disciple"],
    rights["ZoraLink10nLink"]    = ["Disciple"],
    rights["SilentGlaive"]    = ["Elite Disciple"],
    rights["Negan"]    = ["Disciple"],
    rights["GRANDMASTA"]    = ["Disciple"], 
    rights["Negan TWD"]    = ["Disciple"],
    rights["TheBigSwingingDick"]    = ["Disciple"],
    rights["Corkeyandpals"]    = ["Disciple"],
    rights["MuffinWeirdo"]    = ["Disciple"],
    rights["Tyreese"]    = ["Disciple"],
    rights["Thewalkingdead123"]    = ["Disciple"],
    rights["Daniel123Shaw123"]    = ["Disciple"],
    rights["The Pale Man"]    = ["Disciple"],
    rights["Killerskull2"]    = ["Disciple"],
    rights["DominicT22"]    = ["Disciple"],
    rights["WalkerMaimer"]    = ["Disciple"],
    rights["TheFlyingDutchman"]    = ["Disciple"],
    rights["PawsomePerry"]    = ["Disciple"],
    rights["Phazon8058"]    = ["Disciple"],
    rights["Lee Dixon"]    = ["Expelled"],
    rights["DarkShadow667"]    = ["Elite Disciple"],

    // END List of Accounts Given Extra User Rights Icons

    rights["Non-existent User"]  = ["Do not remove this line"];
 
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
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>