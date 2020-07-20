/*Adds extra masthead entries for:
-Administrators
-Patrollers
-News Team
-Bots
-Members of various months 
*/

// WRITTEN BY User:Rappy_4187, used with permission.

$(function() {
 var rights = {};

   //BUREAUCRATS
// rights["Timeoin"]                    = ["Bureaucrat"];
   //BUREAUCRATS + MOTM (chronological)
// rights["Deyvid Petteys"]             = ["Bureaucrat","MOTM - January 2012"];
 
   //ADMINISTRATORS
   
// rights["TombRaiser"]                 = ["Administrator"];
   //ADMINISTRATORS + MOTM (chronological)
// rights["HaLo2FrEeEk"]                = ["Administrator","MOTM - February 2012"];
                                      
   //PATROLLERS
// rights["Mask2697"]                   = ["Patroller"];

   //PATROLLERS + MOTM (chronological)
// rights["Commander Faol"]             = ["Patroller","MOTM - September 2011"];
 
  //NEWS TEAM
// rights["The Milkman"]                = ["News Team"];
   
   //OTHER MOTM (chronological)
 rights["創造"]                   = ["MOTM - 2013年1月"];   
   
   //BOTS
 rights["Gurbot"]                     = ["Bot"];

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