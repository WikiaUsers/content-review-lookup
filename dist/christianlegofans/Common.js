/** Username replace function ([[Template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').html(wgUserName); }
 addOnloadHook(UserNameReplace);