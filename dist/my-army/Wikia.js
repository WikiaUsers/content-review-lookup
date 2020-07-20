// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
    var rights = {};
 
    // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Legoclones"]             = ["Marshal Commander","Commanding Officer"],
    rights["Blyndblitz"]             = ["Battalion Commander","Commanding Officer","Kotep Squad Leader"],
    rights["Jep Do Tenko"]           = ["Sergeant","Nerra Squad Leader"],
    rights["Nitrodax"]               = ["Corporal","Nerra Squad Trooper"],
    rights["TheGoldenPatrik"]        = ["Corporal"],
    rights["Blitzcomet1213"]         = ["Corporal"],
    rights["Clonetrooper3434"]      = ["Corporal"],
    rights["Keplers"]                = ["Corporal"],
    rights["TreshersliderOfficial"]  = ["Private"],
    rights["Code red2002"]           = ["Private"],
    rights["Colbyjames2"]            = ["Private"],
    rights["TreshersliderFilms"]     = ["Private"],
    rights["FivesARC"]               = ["Private"],
    rights["Rex55555"]               = ["Private"],
 
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