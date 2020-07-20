/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

function addMastheadTags() {
  var rights = {},
        user = "";
        
 // Plakietki 
 
  rights["Szlahta"]                               = ["Wielka Imperialistyczna Kronikarka"];
  rights["ImperialistycznyImperialista"]          = ["Wielki Imperialistyczny Kronikarz"];
  
  
  if (typeof rights[wgTitle] != "undefined") {
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
}
 
$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});