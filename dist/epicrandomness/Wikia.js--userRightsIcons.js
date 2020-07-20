NOTE: These are all from [http://music.wikia.com/wiki/Music_Wiki Music Wiki]


 <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDER - ~ilovepeeta~
 
    // MANAGEMENT/BUREAUCRATS
 
  rights["~ilovepeeta~"]      = ["Epic Officer","Administrator","Random Person","Recognized user"],
 
    // ADMINISTRATORS
 
  rights["iluvgale"]     = ["Administrator","Recognized user"],
  rights["PeetaSucks"]           = ["Administrator"],
 
    // ROLLBACKERS AND CHAT MODERATORS
 
  //rights["iluvgale"]           = ["Rollbacker","Chat moderator"],
  //rights["PeetaSucks"]           = ["Rollbacker","Chat moderator"],
  //rights["~ilovepeeta~"]           = ["Rollbacker","Chat moderator"],

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>