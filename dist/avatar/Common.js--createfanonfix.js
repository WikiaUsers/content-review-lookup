 /*
  * Used to fix the "create a fanon mainpage" inputbox for [[Avatar Wiki:Create fanon page]]
  * By [[User:KettleMeetPot|KettleMeetPot]]
  */

// <nowiki>

$(document).ready(function createMainPage() {
  if ( window.location.search == "?action=edit&preload=Avatar%20Wiki:Create%20fanon%20page/Main%20page&editintro=&section=" ) {
    $("#wpTextbox1").append("[[Category:" + wgUserName + " (fanon)]]");
  }
});

//</nowiki>