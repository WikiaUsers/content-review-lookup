/* Any JavaScript here will be loaded for all users on every page load. */
 /*
  * Used to fix the "create a fanon mainpage" inputbox for [[Avatar Wiki:Create fanon page]]
  * By [[User:KettleMeetPot|KettleMeetPot]]
  */

// <nowiki>

$(document).ready(function createMainPage() {
  if ( window.location.search == "?action=edit&preload=Avatar%20Indonesia%20Wiki:Buat%20halaman%20fanon/Halaman%20utama&editintro=&section=" ) {
    $("#wpTextbox1").append("[[Kategori:" + wgUserName + " (fanon)]]");
  }
});

//</nowiki>