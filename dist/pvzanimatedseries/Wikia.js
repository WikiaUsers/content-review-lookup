function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags
 
   rights["Itsleo20"]                     = ["Technician", "Council Member", "Director", "Wizard"],
   rights["ItsZee"]                       = ["Technician", "Council Member", "Director", "Wizard"],                   
   rights["Shroomy05"]                    = ["Technician", "Council Member", "Director", "Wizard"],                   
   rights["Mister Stay Puft"]             = ["Technician", "Council Member"],                    
   rights["Snapdragon717"]                = ["Technician", "Council Member"],
   rights["Chickenwrangler369"]           = ["Technician", "Council Member"],
   rights["Electric Plants"]              = ["Lawn Police"];                      
 
 
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
        $('' + rights[user][i] +
          ).appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});