/*Adds extra masthead entries for:
-Plaguemasters (sysops)
-Patrollers
-Forum Moderator
*/

// WRITTEN BY User:Ned1230.

$(function() {
 var rights = {};

   //BUREAUCRATS

 rights["Ned1230"]                    = ["Bureaucrat"];
 rights["Anemicne"]                   = ["Bureaucrat"];                                       
   //PATROLLERS
 rights["FoolOfATook"]                  = ["Patroller"];
 rights["Boomshadow"]                   = ["Patroller"];
 rights["Dan67"]                        = ["Patroller"];
 rights["Insertrandomnamehere"]         = ["Patroller"];

  //FORUM MODERATORS
 rights["PokeMageTech"]               = ["Forum Moderator"];
 rights["Grockstar124"]               = ["Forum Moderator"];
 rights["TheMindOfMadness"]           = ["Forum Moderator"];
   //MOTM (chronological)
 
 rights["Ned1230"]             = ["MOTM - January 2015"];

    //BOTS
 rights["Anemobot"]                  = ["Bot"];
 
  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      //$('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});