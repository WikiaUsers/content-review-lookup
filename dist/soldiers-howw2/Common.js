/* Any JavaScript here will be loaded for all users on every page load. */

// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================

$(document).ready( function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});

// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================