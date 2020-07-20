/* Any JavaScript here will be loaded for all users on every page load. */
// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
// Caveats: Does not work on Special:Contributions/username
 
$(function() {
  var rights = {};

// FOUNDERS

rights["Simple.PlanNER"]         = ["Founder","Bureaucrat","Le Sexy", "Chat Mod"],

// BUREAUCRATS

rights["Svwiki99"]      = ["Bureaucrat","Co-Second Admin", "Chat Mod"],
rights["Gleek4life353"]           = ["Bureaucrat","Co-Second Admin", "Chat Mod"],
rights["Ixii'"]          = ["Bureaucrat","Admin","Chat Mod"],
      
    
    

// END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
if (typeof rights[wgTitle] != "undefined") 
{
// remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) }
{
// add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
});
 
// </source>