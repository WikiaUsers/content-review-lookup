/* Any JavaScript here will be loaded for all users on every page load. */
/*Adds extra masthead entries for:
-Administrators
-Patrollers
-News Team
-Bots
-Forum Moderator
-Members of various months 
*/

// WRITTEN BY User:Rappy_4187, used with permission.

$(function() {
 var rights = {};

   //BUREAUCRATS
 rights["J Andres"]                   = ["Bureaucrat"];
 rights["Lol pie"]                    = ["Bureaucrat"];
 rights["Bobogoobo"]                  = ["Bureaucrat"];
 rights["Aido2002"]                   = ["Bureaucrat"];
 rights["Treehugger"]                 = ["Bureaucrat","Founder"];

   //ADMINISTRATORS
 rights["RogalDorn"]                  = ["Administrator"];
 rights["Alphacow"]                   = ["Administrator"];
 rights["Azu-nyan"]                   = ["Administrator"];
 rights["Dynasty1"]                   = ["Administrator"];
 rights["Mason11987"]                 = ["Administrator"];
 rights["Stefanmg"]                   = ["Administrator"];
 rights["Whisperer"]                  = ["Administrator"];

   //ROLLBACKERS
 rights["Nascar8FanGA"]               = ["Rollbacker"];
 rights["Kurdanak"]                   = ["Rollbacker"];
 rights["Michael von Preußen"]        = ["Rollbacker"];
 rights["Tiagoroth"]                  = ["Rollbacker"];
 rights["Baltus7"]                    = ["Rollbacker"];

   //BOTS
 rights["林眞"]                        = ["Bot"];
 rights["RogalBot"]                    = ["Bot"];
 rights["Lyra Botstrings"]             = ["Bot"];
 
  if (typeof rights[mw.config.get('wgTitle')] != "undefined") {
 
      // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        $('.masthead-info hgroup span.tag').remove();

      for( var i=0, len=rights[mw.config.get('wgTitle')].length; i < len; i++) {
 
      // add new rights
        $('<span class="tag">' + rights[mw.config.get('wgTitle')][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});