/* Umieszczony tutaj kod JavaSc/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Dodatkowe funkcje adminów i oznaczenia innych userów
 
  rights["Urbanski97"]                      = ["Były administrator"],
  rights["Michnar"]                      = ["Biurokrata"],
  rights["Oola11"]                      = ["Były administrator"],
  rights["Jedyooo"]                      = ["Założyciel HPW"],
  rights["Wiking"]                      = ["Były administrator"],
  rights["R.A.B"]                      = ["Były administrator"],
  rights["Diveks"]                      = ["Były administrator"],
  rights["DeXart"]                      = ["Redaktor HPW WoK"],
  rights["Mrs.nobody"]                      = ["Były administrator"],
  rights["Notabene"]                      = ["Były administrator"];
  rights["Kamilb"]                      = ["Moderator"]
  rights["Addamek09"]                     = ["Moderator"]
 
 
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
ript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */