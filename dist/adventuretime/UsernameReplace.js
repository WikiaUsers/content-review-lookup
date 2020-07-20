/** Username replace function ([[Template:USERNAME]]) *******************************
 * Inserts user name into <span class="insertusername"></span>
 * Originally by User:Splarka
 * New version by User:Spang
 */

$(function() {
    if (typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});