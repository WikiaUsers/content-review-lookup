/* Any JavaScript here will be loaded for all users on every page load. */
/*Adds extra masthead entries for:
-Founder
-Rollback
-Bot
*/

// WRITTEN BY User:Rappy_4187, used with permission.

$(function() {
 var rights = {};

   //FOUNDER
 rights["TombRaiser"]                 = ["Founder"];
                                      
   //TESTER
 rights["Kaithaa"]                    = ["Tester"];
   
   //BOT
 rights["DwemerBot"]                  = ["Bot"];
 
  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});