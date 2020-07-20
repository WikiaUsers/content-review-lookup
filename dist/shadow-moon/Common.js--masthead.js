/*Adds extra masthead entries for:
-Administrators
-Controller
-Chat Moderator
-Bots
-Forum Moderator
*/
// WRITTEN BY User:Jarjarkine, used with permission.
$(function() {
 var rights = {};

   //BUREAUCRATS
rights["Emperor Jarjarkine"] = ["Bureaucrat"];
rights["Karr Skirata"] = ["Bureaucrat"];
 //ADMINISTRATORS + MOTM (chronological)
//ADMINISTRATORS
rights["Rage Ordo"]= ["Administrator"];
//Correctors
rights["PLPellegrini"]= ["Correctors"];
rights["Kostis20011"] = ["Correctors"];
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