/* Any JavaScript here will be loaded for all users on every page load. */

/** Username replace function ([[Template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').text(WgUserName); }
 addOnloadHook(UserNameReplace);