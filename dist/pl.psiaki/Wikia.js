/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Projektanci

  rights["FluttershyPets"]                  = ["Dorothy :3", "Dizzy the Beagle", "Założycielka", "♥ Dog ♥"],
 
 rights["Cleopatera"]                        = ["Biurokrata", "Technik", "Wilk Anurii"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
importScriptPage(' );
 
// </source>