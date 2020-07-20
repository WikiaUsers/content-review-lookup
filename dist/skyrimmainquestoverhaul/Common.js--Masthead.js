// ====================================================================
// Adds extra masthead entries for users with special rights or titles.
// Keep the list per sub-list chronological.
// 
// Written by User:Rappy_4187, WoWWiki
// Taken from Elder Scrolls Wiki (MediaWiki:Common.js/masthead.js)
// ====================================================================

$(function() {
 // Initialize new rights array.
 var rights = {};
 
 // Set (fictional) rights for each user (as array).
   //Special
 rights["Half Goat Studios"]          = ["Project Lead","Supportive Bureaucrat"];
 rights["JibstaMan"]                  = ["Founding Bureaucrat"];

   //Bureaucrats
 
   //Project Team members

  if (typeof rights[wgTitle] != "undefined") {
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for(var i=0, len=rights[wgTitle].length; i < len; i++) {
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
});