// <source lang="JavaScript">
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDER
 
  rights["LucianMaster39"]        = ["Αρχηγος Κειχιλ"],
 
   // BUREAUCRAT
 
  rights["Katerinayoda"]          = ["Λουσιαν Γραφειοκρατης"],

   // ADMINISTRATOR

  rights["I.N.S."]                = ["Λουσιαν Παραγων"]
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>