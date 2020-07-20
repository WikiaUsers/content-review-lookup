/* Por [[w:User:Rappy 4187|Rappy 4187]] */
$(function() {
  var rights = {};
 
  rights["Benfutbol10"]      = ["Reversor"];
 
  if (typeof rights[wgTitle] != "undefined") {
     $('.UserProfileMasthead .masthead-info span.group').remove();
     for (var i=0, len=rights[wgTitle].length; i < len; i++) {
       $('<span class="group">' + rights[wgTitle][i] +
         '</span>').appendTo('.masthead-info hgroup');
      }
    }
});