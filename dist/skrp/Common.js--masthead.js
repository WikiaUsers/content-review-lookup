/* Any JavaScript here will be loaded for all users on every page load. */
/*Adds extra masthead entries for:
-Administrators
-Patrollers
-News Team
-Bots
-Forum Moderator
-Members of various months 
*/

// WRITTEN BY User:Rappy_4187, used with permission from CN Wiki.

$(function() {
 var rights = {};

   //BUREAUCRATS
 rights["Bobogoobo"]                       = ["Bureaucrat"];

   //ADMINISTRATORS
 rights["Rudolph_Komnenos"]           = ["Administrator"];
 rights["Brooklyn666"]                = ["Administrator"];
 rights["Azu-nyan"]                   = ["Administrator"];
 rights["Dynasty1"]                   = ["Administrator"];
 rights["Mason11987"]                 = ["Administrator"];
 rights["Stefanmg"]                   = ["Administrator"];
 rights["Whisperer"]                  = ["Administrator"];

   //ROLLBACKERS


   //BOTS

 
  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        $('.masthead-info hgroup span.tag').remove();

      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
      // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});